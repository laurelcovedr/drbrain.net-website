# Inquiry operations

Use /inquiries with the existing Site owner account. Status values: new, assigned, contacted, closed. Record assignee and follow-up notes; save persists them. This does not grant additional staff access.

Notifications use Resend over HTTPS. Configure these runtime secrets in Sites, never in source or chat:
- RESEND_API_KEY: email-send permission for a verified sender domain
- INQUIRY_FROM_EMAIL: verified sender mailbox
- INQUIRY_NOTIFY_EMAIL: internal receiving mailbox
- INQUIRY_ADMIN_EMAIL: existing owner-only inbox access setting; preserve it

Redeploy after environment updates. Submit one approved test, confirm accepted status in inbox, then verify actual mailbox delivery. Provider acceptance is not proof of delivery. No visitor confirmation email is sent. Notification contains only the inquiry reference and protected inbox link, not the customer's message or contact details.

Without all three send settings, notifications stay pending. Submission still persists. Failed notifications can be retried from the inbox. This release has no unattended retry scheduler; review pending/failed items in the inbox. Notifications already accepted are not re-sent. Resend idempotency key: inquiry/<record-id>.

The current environment has only INQUIRY_ADMIN_EMAIL configured. Automatic delivery is NOT enabled or verified.
