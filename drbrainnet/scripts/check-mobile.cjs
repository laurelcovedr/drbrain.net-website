/* Run against the complete 81-route site. Never submits an inquiry. */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const allRoutes = require("./mobile-routes.json");
const routes = process.env.QA_FOCUSED
  ? allRoutes.filter(
      (r) =>
        /^(\/(zh|es))?(\/products\/(dr-brain|realnow|autismshield|forcus)|\/evidence(\/(dr-brain|realnow|autismshield|forcus))?|\/contact|\/reports\/brain-health)?$/.test(
          r,
        ) || r === "/",
    )
  : allRoutes;
const base = process.env.BASE_URL || "http://127.0.0.1:3100";
const output =
  process.env.QA_OUTPUT || "asset-notes/mobile-qa-2026-10-22/after";
const widths = process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(",").map(Number) : [360, 375, 390, 768];
const results = {
  base,
  widths,
  source: process.env.QA_SOURCE_SHA || null,
  runtime: "Next.js 16.3.4 local development preview",
  mobile: true,
  touch: true,
  pages: [],
  interactions: [],
  errors: [],
};
fs.mkdirSync(output, { recursive: true });
const screenshot = async (p, name) =>
  p.screenshot({
    path: path.join(output, name + ".jpg"),
    type: "jpeg",
    quality: 65,
    animations: "disabled",
  });
async function test(name, fn) {
  if (process.env.QA_CASE && !new RegExp(process.env.QA_CASE).test(name)) return;
  try {
    await fn();
    results.interactions.push({ name, passed: true });
  } catch (e) {
    results.interactions.push({ name, passed: false, error: e.message });
    console.log("FAIL", name, e.message.slice(0, 180));
  }
}
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  results.browser = browser.version();
  try {
    const runWidth = async (width) => {
      const context = await browser.newContext({
        viewport: { width, height: width === 768 ? 1024 : 844 },
        isMobile: true,
        hasTouch: true,
      });
      // Block outgoing mail and mutation requests even if a future test accidentally submits.
      await context.route("**/*", (r) =>
        /^(POST|PUT|PATCH|DELETE)$/.test(r.request().method()) ||
        r.request().url().startsWith("mailto:")
          ? r.abort()
          : r.continue(),
      );
      async function freshPage(){
        const page=await context.newPage();
        page.setDefaultTimeout(15000);
        page.setDefaultNavigationTimeout(25000);
        page.on("pageerror",e=>results.errors.push({width,url:page.url(),message:e.message}));
        return page;
      }
      let p=await freshPage();
      async function go(url) {
        await p.goto(base + url, { waitUntil: "networkidle" });
        await p.locator("h1").first().waitFor();
        await p.evaluate(() => document.fonts.ready);
        // Native HTML is visible before React hydration; wait for the header ref commit.
        await p.waitForFunction(()=>{const h=document.querySelector('.site-header');return h&&Object.keys(h).some(k=>k.startsWith('__reactFiber$')&&h[k].ref?.current===h)});
        await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      }
      for (const url of process.env.QA_SKIP_PAGES ? [] : routes) {
        await p.close();p=await freshPage();
        try {
          await go(url);
          const state = await p.evaluate(() => {
            const w = document.documentElement.clientWidth;
            const visible = (e) => {
              const r = e.getBoundingClientRect();
              return (
                r.width &&
                r.height &&
                getComputedStyle(e).visibility !== "hidden"
              );
            };
            return {
              lang: document.documentElement.lang,
              h1: document.querySelector("h1")?.textContent,
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: w,
              overflow: [...document.querySelectorAll("main *")]
                .filter((e) => {
                  if (!visible(e)) return false;
                  const r = e.getBoundingClientRect();
                  return (
                    r.right > w + 1 &&
                    getComputedStyle(e).position !== "absolute" &&
                    !e.closest('[class*="scroll"],.source-report-thumbnails')
                  );
                })
                .slice(0, 8)
                .map((e) => ({
                  tag: e.tagName,
                  class: e.className,
                  text: e.textContent.slice(0, 90),
                })),
              clippedText: [
                ...document.querySelectorAll("main h1,main h2,main button"),
              ]
                .filter(
                  (e) =>
                    visible(e) &&
                    e.clientWidth > 0 &&
                    (e.scrollWidth > e.clientWidth + 1 ||
                      e.scrollHeight > e.clientHeight + 1) &&
                    ["hidden", "clip"].includes(getComputedStyle(e).overflow),
                )
                .map((e) => ({
                  tag: e.tagName,
                  class: e.className,
                  text: e.textContent.slice(0, 90),
                })),
              brokenImages: [...document.images]
                .filter(
                  (i) =>
                    i.complete &&
                    !i.naturalWidth &&
                    i.getBoundingClientRect().top < innerHeight,
                )
                .map((i) => i.getAttribute("src")),
            };
          });
          const lang = url.startsWith("/zh")
            ? "zh-CN"
            : url.startsWith("/es")
              ? "es"
              : "en";
          results.pages.push({
            url,
            width,
            ...state,
            passed:
              state.scrollWidth <= width + 1 &&
              !!state.h1 &&
              state.lang === lang &&
              !state.brokenImages.length,
          });
          if (state.scrollWidth > width + 1)
            console.log(
              "OVERFLOW",
              width,
              url,
              state.scrollWidth,
              JSON.stringify(state.overflow).slice(0, 300),
            );
          if (["/", "/zh", "/es", "/es/products/forcus"].includes(url))
            await screenshot(
              p,
              `${lang}-${width}-${url.includes("products") ? "product" : "home"}`,
            );
        } catch (e) {
          results.pages.push({ url, width, passed: false, error: e.message });
          console.log("PAGE FAIL", width, url, e.message.slice(0, 100));
        }
      }
      for (const lang of ["en", "zh", "es"]) {
        await p.close();p=await freshPage();
        const prefix = lang === "en" ? "" : "/" + lang;
        const label = `${lang}-${width}`;
        await test(label + " navigation", async () => {
          await go(prefix || "/");
          await p.locator(".menu-toggle").click();
          await p.locator(".native-mobile-panel").waitFor({ state: "visible" });
          await screenshot(p, label + "-menu");
          const contact = p.locator(
            '.native-mobile-panel a[href="' + prefix + '/contact"]',
          );
          await contact.click();
          await p.waitForURL(base + prefix + "/contact");
          await p.waitForLoadState("networkidle");
          assert.equal(
            await p.locator(".native-mobile-navigation").getAttribute("open"),
            null,
            "navigation must close after selecting a link",
          );
          await p.locator(".menu-toggle").click();
          await p.keyboard.press("Escape");
          await p.locator(".native-mobile-navigation[open]").waitFor({state:"detached"});
          assert.equal(
            await p.locator(".native-mobile-navigation").getAttribute("open"),
            null,
          );
        });
        await test(label + " language switching preserves route", async () => {
          await go(prefix + "/products/forcus");
          await p.locator(".language-menu>summary").click();
          const next = lang === "en" ? "zh" : lang === "zh" ? "es" : "en";
          await p
            .locator(
              '.language-menu a[hreflang="' +
                (next === "zh" ? "zh-CN" : next) +
                '"]',
            )
            .click();
          await p.waitForURL(
            base + (next === "en" ? "" : "/" + next) + "/products/forcus",
          );
          await p.waitForLoadState("networkidle");
          assert.equal(
            await p.locator("html").getAttribute("lang"),
            next === "zh" ? "zh-CN" : next,
          );
        });
        await test(label + " search and dialog", async () => {
          await go(prefix + "/evidence");
          const search = p.locator(".search-field input");
          await search.fill(
            { en: "dementia", zh: "痴呆", es: "demencia" }[lang],
          );
          assert.ok((await p.locator(".article-row:visible").count()) > 0);
          await search.fill("zzzz-no-study");
          await p.locator(".empty-state").waitFor();
          assert.equal(await p.locator(".article-row:visible").count(), 0);
          await p.locator(".search-field button").click();
          await p.locator(".article-title").first().click();
          const d = p.locator(".study-dialog[role=dialog]");
          await d.waitFor();
          await screenshot(p, label + "-dialog");
          const box = await d.boundingBox();
          assert.ok(
            box.x >= 0 && box.x + box.width <= width + 1,
            "dialog must fit width",
          );
          assert.ok(
            box.y >= 0 &&
              box.y + box.height <= (width === 768 ? 1024 : 844) + 1,
            "dialog must fit height",
          );
          await d.evaluate((e) => {
            const body = e.querySelector(".study-dialog-body");
            const scroller =
              body && getComputedStyle(body).display !== "contents" ? body : e;
            scroller.scrollTop = scroller.scrollHeight;
          });
          await screenshot(p, label + "-dialog-scrolled");
          const closeVisible = await p
            .locator("[data-slot=dialog-close]")
            .evaluate((e) => {
              const r = e.getBoundingClientRect();
              const hit = document.elementFromPoint(
                r.x + r.width / 2,
                r.y + r.height / 2,
              );
              return (
                r.top >= 0 &&
                r.bottom <= innerHeight &&
                !!hit &&
                e.contains(hit)
              );
            });
          assert.ok(
            closeVisible,
            "close button must remain reachable after scrolling the study",
          );
          await p.locator("[data-slot=dialog-close]").click({ timeout: 4000 });
          await d.waitFor({ state: "hidden" });
          await p.locator(".article-title").first().click();
          await d.waitFor({state:"visible"});
          await p.keyboard.press("Escape");
          await d.waitFor({ state: "hidden" });
        });
        await test(label + " four product buttons and FAQ", async () => {
          for (const slug of [
            "dr-brain",
            "realnow",
            "autismshield",
            "forcus",
          ]) {
            await go(prefix + "/products/" + slug);
            await p
              .locator('.product-page-anchors a[href="#questions"]')
              .click();
            await p.locator("#questions").scrollIntoViewIfNeeded();
            assert.equal(
              await p.locator(".product-question-grid article").count(),
              4,
            );
            assert.ok(
              await p
                .locator(".product-question-grid article p")
                .first()
                .isVisible(),
            );
            const cta = p.locator(
              '.product-hero a[href="' + prefix + '/contact"]',
            );
            await cta.click();
            await p.waitForURL(base + prefix + "/contact");
          }
        });
        await test(
          label + " contact fields and tabs (no submission)",
          async () => {
            await go(prefix + "/contact");
            await p.locator(".contact-tabs [role=tab]").nth(1).click();
            const form = p.locator("form:visible");
            await form.locator("[name=name]").fill("QA only");
            await form.locator("[name=email]").fill("invalid");
            await form
              .locator("[name=message]")
              .fill("Automated QA — do not send");
            assert.equal(await form.evaluate((f) => f.checkValidity()), false);
            await form.locator("[name=email]").fill("qa@example.invalid");
            assert.equal(await form.evaluate((f) => f.checkValidity()), true);
            await form.locator("[role=combobox]").click();
            await p
              .locator("[role=option]")
              .filter({ hasText: "AutismShield" })
              .click();
            assert.match(
              await form.locator("[role=combobox]").innerText(),
              /AutismShield/,
            );
            await screenshot(p, label + "-contact");
            const controls = await form
              .locator("input,textarea,button")
              .evaluateAll((es) =>
                es.map((e) => {
                  const r = e.getBoundingClientRect();
                  return {
                    tag: e.tagName,
                    left: r.left,
                    right: r.right,
                    width: r.width,
                  };
                }),
              );
            assert.ok(
              controls.every((r) => r.left >= 0 && r.right <= width + 1),
              "form controls must fit viewport",
            );
          },
        );
        await test(label + " report pagination", async () => {
          await go(prefix + "/reports/brain-health");
          const buttons = p.locator(".source-reader-pagination button");
          assert.equal(await buttons.first().isDisabled(), true);
          await buttons.last().click();
          await p.waitForFunction(n=>new RegExp('^'+n+'\\s*/').test(document.querySelector('.source-reader-pagination>span')?.textContent||''),2);
          assert.match(
            await p.locator(".source-reader-pagination>span").innerText(),
            /^2\s*\//,
          );
          await p.locator(".source-page-select").click();
          await p.locator("[role=option]").nth(6).click();
          await p.waitForFunction(n=>new RegExp('^'+n+'\\s*/').test(document.querySelector('.source-reader-pagination>span')?.textContent||''),7);
          assert.match(
            await p.locator(".source-reader-pagination>span").innerText(),
            /^7\s*\//,
          );
          await p.locator(".source-reader-pagination").scrollIntoViewIfNeeded();
          await screenshot(p, label + "-report");
          assert.equal(await buttons.last().isVisible(), true);
          const fits = await p
            .locator(".source-reader-pagination")
            .evaluate((e) => {
              const r = e.getBoundingClientRect();
              return [...e.children].every((c) => {
                const b = c.getBoundingClientRect();
                return (
                  b.left >= r.left &&
                  b.right <= r.right &&
                  c.scrollWidth <= c.clientWidth + 1
                );
              });
            });
          assert.ok(
            fits,
            "report pagination text and buttons must fit the reader",
          );
          await buttons.first().click();
          await p.waitForFunction(n=>new RegExp('^'+n+'\\s*/').test(document.querySelector('.source-reader-pagination>span')?.textContent||''),6);
          assert.match(
            await p.locator(".source-reader-pagination>span").innerText(),
            /^6\s*\//,
          );
        });
      }
      await context.close();
      console.log("DONE WIDTH", width);
    };
    for(let offset=0;offset<widths.length;offset+=2)await Promise.all(widths.slice(offset,offset+2).map(runWidth));
  } finally {
    await browser.close();
    fs.writeFileSync(
      path.join(output, "results.json"),
      JSON.stringify(results, null, 2),
    );
  }
  const failed =
    results.pages.filter((x) => !x.passed).length +
    results.interactions.filter((x) => !x.passed).length +
    results.errors.length;
  console.log(
    JSON.stringify({
      pages: results.pages.length,
      pageFailures: results.pages.filter((x) => !x.passed).length,
      interactions: results.interactions.length,
      interactionFailures: results.interactions.filter((x) => !x.passed).length,
      pageErrors: results.errors.length,
    }),
  );
  process.exitCode = failed ? 1 : 0;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
