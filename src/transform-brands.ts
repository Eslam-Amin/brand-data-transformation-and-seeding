import { connectDB } from "./db.js";
import { Brand } from "./models/brands-schema.js";

const transformBrands = async () => {
  await connectDB();

  const brands = await Brand.find();

  for (const brand of brands) {
    const doc = brand.toObject() as any;
    const updatedFields: any = {};
    let year = doc.yearFounded;

    if (!doc.brandName) {
      if (doc.brand?.name) updatedFields.brandName = doc.brand.name;
      else if (typeof doc.brand === "string" && doc.brand.trim() !== "")
        updatedFields.brandName = doc.brand;
    }

    try {
      const result = await Brand.updateOne(
        { _id: doc._id },
        {
          $set: updatedFields,
          $unset: {
            yearCreated: 1,
            yearsFounded: 1,
            brand: 1,
            hqAddress: 1
          }
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
