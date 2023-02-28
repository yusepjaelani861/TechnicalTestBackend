import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const customer = await prisma.customer.create({
    data: {
      customer_name: "Customer 1",
    },
  });

  const customer_address = await prisma.customer_address.create({
    data: {
      customer_id: customer.id,
      address: "Jl. Raya Cibubur No. 1",
    },
  });

  const products = await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        price: 10000,
      },
      {
        name: "Product 2",
        price: 20000,
      },
      {
        name: "Product 3",
        price: 30000,
      },
      {
        name: "Product 4",
        price: 40000,
      },
      {
        name: "Product 5",
        price: 50000,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
