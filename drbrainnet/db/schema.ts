import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const inquiries=sqliteTable('inquiries',{
 id:text('id').primaryKey(),createdAt:integer('created_at').notNull(),name:text('name').notNull(),email:text('email').notNull(),organization:text('organization').notNull(),role:text('role').notNull(),country:text('country').notNull(),message:text('message').notNull(),purpose:text('purpose').notNull(),solution:text('solution').notNull(),careSetting:text('care_setting').notNull(),locale:text('locale').notNull(),rateKey:text('rate_key').notNull()
},t=>[index('inquiries_rate_time').on(t.rateKey,t.createdAt)]);
