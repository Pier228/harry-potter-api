-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'book',
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "dedication" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "wiki" TEXT NOT NULL,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'character',
    "slug" TEXT NOT NULL,
    "animagus" TEXT,
    "blood_status" TEXT,
    "boggart" TEXT,
    "born" TIMESTAMP(3),
    "died" TIMESTAMP(3),
    "eye_color" TEXT,
    "family_members" TEXT[],
    "gender" TEXT,
    "hair_color" TEXT,
    "height" DOUBLE PRECISION,
    "house" TEXT,
    "image" TEXT,
    "jobs" TEXT[],
    "marital_status" TEXT,
    "name" TEXT NOT NULL,
    "nationality" TEXT,
    "patronus" TEXT,
    "romances" TEXT[],
    "skin_color" TEXT,
    "species" TEXT,
    "titles" TEXT[],
    "wands" TEXT[],
    "weight" DOUBLE PRECISION,
    "wiki" TEXT,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'movie',
    "slug" TEXT NOT NULL,
    "box_office" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "cinematographers" TEXT[],
    "directors" TEXT[],
    "distributors" TEXT[],
    "editors" TEXT[],
    "music_composers" TEXT[],
    "poster" TEXT NOT NULL,
    "producers" TEXT[],
    "rating" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "running_time" TEXT NOT NULL,
    "screenwriters" TEXT[],
    "summary" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "wiki" TEXT NOT NULL,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "potions" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'potion',
    "slug" TEXT NOT NULL,
    "characteristics" TEXT,
    "difficulty" TEXT,
    "effect" TEXT,
    "image" TEXT,
    "inventors" TEXT,
    "ingredients" TEXT,
    "manufacturers" TEXT,
    "name" TEXT NOT NULL,
    "side_effects" TEXT,
    "time" TEXT,
    "wiki" TEXT,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "potions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spells" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'spell',
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "creator" TEXT,
    "effect" TEXT,
    "hand" TEXT,
    "image" TEXT,
    "incantation" TEXT,
    "light" TEXT,
    "name" TEXT,
    "wiki" TEXT,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "characters_slug_key" ON "characters"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "potions_slug_key" ON "potions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "spells_slug_key" ON "spells"("slug");
