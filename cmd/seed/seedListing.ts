import Listing from "../../src/models/listing";
import listingsJSON from "./seedData/listing.json";

type ListingData = {
  title: string;
  description: string;
  source: string;
  categories: Array<string>;

  price: number;
  platform: string;
  purchaseUrl: string;
  isAvailable: boolean;
};

export default async function seed() {
  const categories = new Set<string>();
  const listings: ListingData[] = listingsJSON;
  let index = 0;
  for (const listing of listings) {
    listing.source = `https://picsum.photos/id/${index}/200/200`;
    index += Math.floor(5 + Math.random() * 100);

    for (const category of listing.categories) {
      categories.add(category);
    }
    await Listing.create(listing);
  }

  console.log("Categories:", categories);
}
