import fs from "fs";
import path from "path";

import Listing from "../../src/models/listing";

const rootDirectory = "cmd/scraper/data";

export default async function seed() {
  try {
    const platforms = fs.readdirSync(rootDirectory);
    const dateNow = Date.now();

    for (const platform of platforms) {
      const platformDirectory = path.join(
        rootDirectory,
        platform,
        "4.formattedData"
      );
      if (fs.statSync(platformDirectory).isDirectory()) {
        const categories = fs.readdirSync(platformDirectory);
        for (const category of categories) {
          const categoryFilePath = path.join(platformDirectory, category);
          if (
            fs.statSync(categoryFilePath).isFile() &&
            categoryFilePath.endsWith(".json")
          ) {
            const jsonData = JSON.parse(
              fs.readFileSync(categoryFilePath, "utf8")
            );

            for (const item of jsonData) {
              const creationDate = new Date(
                dateNow - Math.floor(Math.random() * 10000000)
              );

              await Listing.create({
                title: item.title,
                description: item.description,
                source: item.source,

                categories: item.categories,
                price: item.price,
                platform: item.platform,
                purchaseUrl: item.purchaseUrl,
                isAvailable: true,

                createdAt: creationDate,
                updatedAt: creationDate,
              }).catch((error) => {
                console.log(
                  "Error inserting",
                  platform,
                  category,
                  item.title,
                  error
                );
                throw error;
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing files: ${error}`);
  }
}
