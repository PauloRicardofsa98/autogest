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
    phone: "9999999999",
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

const generateSuppliers = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const dados: Prisma.SupplierCreateInput[] = Array.from(
    { length: generate },
    () => {
      const name = faker.company.name();
      return {
        name: name,
        fantasyName: name,
        email: faker.internet.email(),
        phone: "9999999999",
        address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state()}, Brasil`,
        cpfCnpj: faker.string.numeric(14),
        uf: "GO",
        observations: faker.lorem.sentence(),
        zipCode: faker.address.zipCode(),
      };
    },
  );

  await prisma.supplier.createMany({
    data: dados,
  });
};
const generateProducts = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const dados: Prisma.ProductCreateInput[] = Array.from(
    { length: generate },
    () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      maximumStock: faker.number.int({ min: 1, max: 100 }),
      minimumStock: faker.number.int({ min: 1, max: 100 }),
      sku: faker.commerce.isbn(10),
      stock: faker.number.int({ min: 1, max: 100 }),
      unit: "UN",
      barcode: faker.commerce.isbn(13),
    }),
  );

  await prisma.product.createMany({
    data: dados,
  });
};

async function main() {
  console.log("Start seeding...");
  // generateClients();
  // generateCategoryProducts();
  // generateSuppliers();
  // generateProducts();

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
