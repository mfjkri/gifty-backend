import Person from "../../src/models/person";
import User from "../../src/models/user";

const users = [
  {
    username: "johnny",
    password: "123",
    email: "johnny@gmail.com",
    birthday: new Date(),
  },
  {
    username: "test1",
    password: "123",
    email: "test1@gmail.com",
    birthday: new Date(),
  },
  {
    username: "test2",
    password: "123",
    email: "test2@gmail.com",
    birthday: new Date(),
  },
];

export default async function seed() {
  for (const user of users) {
    const newUser = await User.create(user);
    await Person.create({
      ownerId: newUser.id,
      name: newUser.username,
      userId: newUser.id,
      selfOwned: true,
    });
  }
}
