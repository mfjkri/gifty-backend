const models = ["user", "person", "listing", "savedListing", "giftedListing"];

export default async function migrateModels() {
  for (const model of models) {
    const modelDefiner = require(`./${model}`);
    await modelDefiner.init();
  }
}
