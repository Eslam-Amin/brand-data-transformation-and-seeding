import { faker } from "@faker-js/faker";
import { connectDB } from "./db.js";
import { Brand } from "./models/brands-schema.js";

const seedBrands = async () => {
  await connectDB();

  const newBrands = Array.from({ length: 10 }).map(() => ({
    brandName: faker.company.name(),
    yearFounded: faker.number.int({ min: 1600, max: new Date().getFullYear() }),
    headquarters: faker.location.city(),
    numberOfLocations: faker.number.int({ min: 1, max: 10000 })
  }));

  await Brand.insertMany(newBrands);

  console.log("Seeded 10 new brands.");

  process.exit();
};

seedBrands();
