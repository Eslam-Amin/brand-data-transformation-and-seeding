import { faker } from "@faker-js/faker";
import { connectDB } from "./db.js";
import { Brand } from "./models/brands-schema.js";
import XLSX from "xlsx";

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

  // Document seed data in Excel
  const ws = XLSX.utils.json_to_sheet(newBrands);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SeededBrandsSheet");
  XLSX.writeFile(wb, "seeded-brands.xlsx");

  console.log("Documented in seeded-brands.xlsx");
  process.exit();
};

seedBrands();
