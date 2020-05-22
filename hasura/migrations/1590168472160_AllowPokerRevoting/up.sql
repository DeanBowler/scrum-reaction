
ALTER TABLE "public"."poker_session" ADD COLUMN "allow_revotes" boolean NOT NULL DEFAULT false;
ALTER TABLE "public"."poker_user_session" ADD COLUMN "current_revote" text NULL;