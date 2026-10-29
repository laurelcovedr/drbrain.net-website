ALTER TABLE `inquiries` ADD `status` text DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `assignee` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `notes` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `notification_status` text DEFAULT 'pending' NOT NULL;