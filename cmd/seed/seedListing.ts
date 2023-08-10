import fs from "fs";
import path from "path";

import Listing from "../../src/models/listing";

const rootDirectory = "cmd/scraper/data";

export default async function seed() {
  try {
    const platforms = fs.readdirSync(rootDirectory);

    for (const platform of platforms) {
      const platformDirectory = path.join(
        rootDirectory,
        platform,
        "refinedData"
      );
      if (fs.statSync(platformDirectory).isDirectory()) {
        const categories = fs.readdirSync(platformDirectory);

        for (const category of categories) {
          const categoryDirectory = path.join(platformDirectory, category);
          if (fs.statSync(categoryDirectory).isDirectory()) {
            const pageNumbers = fs.readdirSync(categoryDirectory);
            for (const pageNumber of pageNumbers) {
              const pageNumberDirectory = path.join(
                categoryDirectory,
                pageNumber
              );

              if (fs.statSync(pageNumberDirectory).isDirectory()) {
                const filePath = path.join(pageNumberDirectory, "refined.json");
                const rawData = fs.readFileSync(filePath, "utf8");
                const refinedData = JSON.parse(rawData);

                for (const item of refinedData.results) {
                  await Listing.create({
                    title: item.title,
                    description: item.description,
                    source: item.image,
                    categories: [category],
                    price: item.price / 100000,
                    platform: platform,
                    purchaseUrl: item.path,
                    isAvailable: true,
                  });
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing files: ${error}`);
  }
}
