/*
  Warnings:

  - You are about to drop the column `created-at` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `potions` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `potions` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `spells` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `spells` table. All the data in the column will be lost.
  - You are about to drop the column `created-at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated-at` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `potions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `spells` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "potions" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "spells" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created-at",
DROP COLUMN "updated-at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
