import { connectDB } from "./db.js";
import { Brand } from "./models/brands-schema.js";

const MIN_YEAR = 1600;
const MIN_LOCATIONS = 1;

const FIELDS_TO_BE_REMOVED = {
  yearCreated: 1,
  yearsFounded: 1,
  brand: 1,
  hqAddress: 1
};

const getBrandName = (doc: any): string | void => {
  if (doc.brandName) return doc.brandName;
  if (doc.brand?.name) return doc.brand.name;
  if (typeof doc.brand === "string" && doc.brand.trim() !== "")
    return doc.brand;
};

const getHeadquarters = (doc: any): string | void => {
  if (doc.headquarters) return doc.headquarters;
  if (doc.hqAddress) return doc.hqAddress;
};

const getNumberOfLocations = (doc: any): number => {
  const locations = doc.numberOfLocations;
  if (typeof locations === "number" && !isNaN(locations)) {
    return locations;
  }
  const parsedLocationsNumber = Number(locations);

  return isNaN(parsedLocationsNumber) ? MIN_LOCATIONS : parsedLocationsNumber;
};

const transformBrands = async () => {
  await connectDB();

  const brands = await Brand.find();

  for (const brand of brands) {
    const doc = brand.toObject() as any;
    const updatedFields: any = {};

    updatedFields.brandName = getBrandName(doc);
    updatedFields.headquarters = getHeadquarters(doc);
    updatedFields.numberOfLocations = getNumberOfLocations(doc);

    try {
      const result = await Brand.updateOne(
        { _id: doc._id },
        {
          $set: updatedFields,
          $unset: FIELDS_TO_BE_REMOVED
        },
        { strict: false }
      );
      console.log(`Transformed: ${result.modifiedCount}`);
    } catch (err: any) {
      console.error(`Failed for ${doc._id}:`, err.message);
    }
  }

  console.log("Transformation complete!");
  process.exit();
};

transformBrands();
