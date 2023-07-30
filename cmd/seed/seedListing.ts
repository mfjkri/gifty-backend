import Listing from "../../src/models/listing";

const listings = [
  {
    title: "Listing 1",
    description: "Description 1",
    source: "Source 1",
    types: ["Type 1", "Type 2"],

    price: 100,
    platform: "Platform 1",
    purchaseUrl: "Purchase URL 1",
    isAvailable: true,

    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Listing 2",
    description: "Description 2",
    source: "Source 2",
    types: ["Type 2", "Type 3"],

    price: 200,
    platform: "Platform 2",
    purchaseUrl: "Purchase URL 2",
    isAvailable: true,

    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Listing 3",
    description: "Description 3",
    source: "Source 3",
    types: ["Type 1", "Type 2", "Type 3"],

    price: 300,
    platform: "Platform 3",
    purchaseUrl: "Purchase URL 3",
    isAvailable: true,
  },
];

export default async function seed() {
  for (const listing of listings) {
    await Listing.create(listing);
  }
}
