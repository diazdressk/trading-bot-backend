import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const publicBots = [
    {
      name: 'BTC/USDT DCA Pro',
      symbol: 'BTCUSDT',
      deposit: 15000,
      profit_percentage: 1.2,
      num_orders: 15,
      grid_length: 8.0,
      status: 'ACTIVE' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 247,
        deposit_usdt: 15000,
        profit_usdt: 4250.75,
        profit_percentage: 28.34,
      }
    },
    {
      name: 'ETH/USDT Grid Master',
      symbol: 'ETHUSDT',
      deposit: 8500,
      profit_percentage: 0.8,
      num_orders: 12,
      grid_length: 6.5,
      status: 'ACTIVE' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 189,
        deposit_usdt: 8500,
        profit_usdt: 1785.40,
        profit_percentage: 21.01,
      }
    },
    {
      name: 'SOL/USDT Momentum',
      symbol: 'SOLUSDT',
      deposit: 6000,
      profit_percentage: 1.8,
      num_orders: 14,
      grid_length: 10.0,
      status: 'ACTIVE' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 134,
        deposit_usdt: 6000,
        profit_usdt: 1890.20,
        profit_percentage: 31.50,
      }
    },
    {
      name: 'BNB/USDT Conservative',
      symbol: 'BNBUSDT',
      deposit: 4000,
      profit_percentage: 0.5,
      num_orders: 10,
      grid_length: 4.0,
      status: 'PAUSE' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 89,
        deposit_usdt: 4000,
        profit_usdt: 520.80,
        profit_percentage: 13.02,
      }
    },
    {
      name: 'ADA/USDT Scalper',
      symbol: 'ADAUSDT',
      deposit: 3500,
      profit_percentage: 2.0,
      num_orders: 20,
      grid_length: 12.0,
      status: 'ERROR' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 45,
        deposit_usdt: 3500,
        profit_usdt: -287.50,
        profit_percentage: -8.21,
      }
    },
    {
      name: 'MATIC/USDT Quick Profit',
      symbol: 'MATICUSDT',
      deposit: 2200,
      profit_percentage: 2.5,
      num_orders: 25,
      grid_length: 7.5,
      status: 'ACTIVE' as const,
      isPublic: true,
      userId: null,
      statistics: {
        cycles_completed: 456,
        deposit_usdt: 2200,
        profit_usdt: 374.60,
        profit_percentage: 17.03,
      }
    }
  ];

  for (const botData of publicBots) {
    const { statistics, ...botInfo } = botData;

    const bot = await prisma.bot.create({
      data: botInfo,
    });

    await prisma.botStatistic.create({
      data: {
        botId: bot.id,
        cycles_completed: statistics.cycles_completed,
        deposit_usdt: statistics.deposit_usdt,
        profit_usdt: statistics.profit_usdt,
        profit_percentage: statistics.profit_percentage,
      },
    });

    const profitEmoji = statistics.profit_usdt >= 0 ? '📈' : '📉';
    console.log(`✅ Created public bot: ${bot.name} ${profitEmoji} ${statistics.profit_percentage.toFixed(2)}%`);
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const testUser = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      password: hashedPassword,
    },
  });

  console.log(`✅ Created test user: ${testUser.username}`);

  const additionalUsers = [
    { username: 'trader_pro', password: 'trader123' },
    { username: 'crypto_master', password: 'crypto123' },
  ];

  for (const userData of additionalUsers) {
    const hashedPass = await bcrypt.hash(userData.password, 10);

    await prisma.user.upsert({
      where: { username: userData.username },
      update: {},
      create: {
        username: userData.username,
        password: hashedPass,
      },
    });

    console.log(`✅ Created additional user: ${userData.username}`);
  }

  console.log('🎉 Seeding completed!');
  console.log(`📊 Created ${publicBots.length} public bots with realistic trading statistics`);
  console.log('💡 Statistics include both profitable and loss-making bots for realism');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 