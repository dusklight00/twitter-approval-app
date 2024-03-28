/*
  Warnings:

  - Added the required column `is_approved` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "is_approved" BOOLEAN NOT NULL;
