import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

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
