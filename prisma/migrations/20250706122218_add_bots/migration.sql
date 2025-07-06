-- CreateEnum
CREATE TYPE "BotStatus" AS ENUM ('ACTIVE', 'PAUSE', 'ERROR');

-- CreateTable
CREATE TABLE "bots" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "BotStatus" NOT NULL DEFAULT 'PAUSE',
    "symbol" TEXT NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "profit_percentage" DOUBLE PRECISION NOT NULL,
    "num_orders" INTEGER NOT NULL,
    "grid_length" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "bots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot_statistics" (
    "id" TEXT NOT NULL,
    "cycles_completed" INTEGER NOT NULL DEFAULT 0,
    "deposit_usdt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profit_usdt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profit_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "botId" TEXT NOT NULL,

    CONSTRAINT "bot_statistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_statistics" ADD CONSTRAINT "bot_statistics_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
