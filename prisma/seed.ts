// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.product.createMany({
    data: [
      {
        name: "Banderines de colores",
        description: "Pack de 10 banderines de papel brillante",
        price: 1500,
        stock: 25,
        imageUrl: "https://example.com/banderines.jpg",
      },
      {
        name: "Sombreros de fiesta",
        description: "Sombreros de cartón con diseños divertidos",
        price: 800,
        stock: 40,
        imageUrl: "https://example.com/sombreros.jpg",
      },
      {
        name: "Coronitas luminosas",
        description: "Coronitas con luces LED para animar la fiesta",
        price: 2500,
        stock: 15,
        imageUrl: "https://example.com/coronas.jpg",
      },
      {
        name: "Serpentinas metalizadas",
        description: "Rollos de serpentinas brillantes",
        price: 600,
        stock: 50,
        imageUrl: "https://example.com/serpentinas.jpg",
      },
      {
        name: "Antifaces de colores",
        description: "Antifaces plásticos surtidos",
        price: 1200,
        stock: 30,
        imageUrl: "https://example.com/antifaces.jpg",
      },
    ],
  });

  console.log('✅ Seeding completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
