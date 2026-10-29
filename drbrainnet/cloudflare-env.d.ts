declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    INQUIRY_ADMIN_EMAIL?: string;
    RESEND_API_KEY?: string;
    INQUIRY_FROM_EMAIL?: string;
    INQUIRY_NOTIFY_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
