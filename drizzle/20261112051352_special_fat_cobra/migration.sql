CREATE TABLE "meetings" (
	"id" serial PRIMARY KEY,
	"date" date NOT NULL UNIQUE,
	"meeting_type" varchar(20) NOT NULL,
	"presiding" varchar(255) NOT NULL,
	"conducting" varchar(255) NOT NULL,
	"announcements" text[] DEFAULT '{}'::text[],
	"opening_hymn" jsonb NOT NULL,
	"opening_prayer" varchar(255) NOT NULL,
	"ward_business" jsonb DEFAULT '[]',
	"stake_business" boolean DEFAULT false,
	"sacrament_hymn" jsonb NOT NULL,
	"speakers" jsonb DEFAULT '[]',
	"closing_hymn" jsonb NOT NULL,
	"closing_prayer" varchar(255) NOT NULL,
	CONSTRAINT "meetings_type_check" CHECK ("meeting_type" in ('testimony','regular','stake','general','special'))
);
