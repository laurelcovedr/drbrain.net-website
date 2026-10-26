// Isolated local preview; does not read or change deployment configuration.
const { spawn } = require("node:child_process");
const port = process.env.QA_PORT || "3100";
const base = `http://127.0.0.1:${port}`;
(async () => {
  const server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "dev",
      "--webpack",
      "--hostname",
      "127.0.0.1",
      "--port",
      port,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  let stopped = false;
  server.on("exit", () => (stopped = true));
  try {
    let ready = false;
    for (let i = 0; i < 120; i++) {
      if (stopped) throw Error("Local preview exited before readiness");
      try {
        const r = await fetch(base, { signal: AbortSignal.timeout(5000) });
        if (r.ok) {
          ready = true;
          break;
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 500));
    }
    if (!ready) throw Error("Local preview did not become ready");
    const test = spawn(process.execPath, ["scripts/check-mobile.cjs"], {
      stdio: "inherit",
      env: { ...process.env, BASE_URL: base },
    });
    process.exitCode = await new Promise((resolve) =>
      test.on("exit", (code) => resolve(code ?? 1)),
    );
  } finally {
    server.kill("SIGTERM");
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
