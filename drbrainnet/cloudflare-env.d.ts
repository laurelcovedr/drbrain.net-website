declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    INQUIRY_ADMIN_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
