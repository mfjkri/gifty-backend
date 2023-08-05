import seedListing from "./seedListing";
import seedUser from "./seedUser";

export default async function seed() {
  await seedListing();
  await seedUser();
}
