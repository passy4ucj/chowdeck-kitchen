import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const vendors = [];
  
  for (let i = 1; i <= 5; i++) {
    const vendor = await prisma.vendor.create({
      data: {
        name: `Vendor ${i}`,
      },
    });

    for (let j = 1; j <= 3; j++) {
      await prisma.menu.create({
        data: {
          meal: `Meal ${j} for Vendor ${i}`,
          content: `Content for Meal ${j} of Vendor ${i}`,
          vendorId: vendor.id,
        },
      });
    }

    vendors.push(vendor);
  }

  console.log({ vendors });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

