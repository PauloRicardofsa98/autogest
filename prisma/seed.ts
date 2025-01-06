/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateClients = async () => {
  // Quantidade de clientes para gerar
  const clientsToGenerate = 50;

  const clients = Array.from({ length: clientsToGenerate }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: "61999029634",
    address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state()}, Brasil`,
    cpfCnpj: faker.string.numeric(11),
    observations: faker.lorem.sentence(),
  }));

  await prisma.client.createMany({
    data: clients,
  });
};
const generateCategoryProducts = async () => {
  // Quantidade de clientes para gerar
  const generate = 10;

  const dados: Prisma.CategoryProductCreateInput[] = Array.from(
    { length: generate },
    () => ({
      name: faker.commerce.department(),
    }),
  );

  await prisma.categoryProduct.createMany({
    data: dados,
  });
};

async function main() {
  console.log("Start seeding...");
  // generateClients();
  generateCategoryProducts();

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
