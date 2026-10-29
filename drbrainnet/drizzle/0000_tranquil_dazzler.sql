CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text NOT NULL,
	`role` text NOT NULL,
	`country` text NOT NULL,
	`message` text NOT NULL,
	`purpose` text NOT NULL,
	`solution` text NOT NULL,
	`care_setting` text NOT NULL,
	`locale` text NOT NULL,
	`rate_key` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiries_rate_time` ON `inquiries` (`rate_key`,`created_at`);