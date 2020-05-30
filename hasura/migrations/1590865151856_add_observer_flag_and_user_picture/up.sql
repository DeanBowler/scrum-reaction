
ALTER TABLE "public"."users" ADD COLUMN "default_picture" text NULL;
ALTER TABLE "public"."poker_user_session" ADD COLUMN "is_observer" boolean NOT NULL DEFAULT false;