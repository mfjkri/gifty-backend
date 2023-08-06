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
  for (const listing of listings) {
    for (const category of listing.categories) {
      categories.add(category);
    }
    await Listing.create(listing);
  }

  console.log("Categories:", categories);
}
