
set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."restaurants" (
  "restaurantId"        serial,
  "restaurantName"      text            not null,
  "createdAt"           timestamptz(6)  not null default now(),
  primary key ("restaurantId"),
  unique("restaurantName")
);

create table "public"."reservations" (
  "reservationId"       serial,
  "customerName"        text           not null,
  "partySize"           integer        not null,
  "restaurantId"        integer        not null,
  "uniqueCode"          text           not null,
  "createdAt"           timestamptz(6) not null default now(),
  primary key ("reservationId"),
  foreign key ("restaurantId") REFERENCES restaurants("restaurantId")

)
