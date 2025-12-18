import { prisma } from "../lib/prisma";

async function seed() {
  try {
    const guest = await prisma.guestUser.create({});
    if (!guest) {
      console.log("Seeding has failed\n");
    } else {
      console.log("Seeding was successfull! \n");
      console.log("removng seed data...\n");

      const result = await prisma.guestUser.delete({
        where: {
          id: guest.id,
        },
      });

      if(!result) {
        console.log("failed to delete the seed data!");
      }else{
        console.log("seed data sucessfully deleted \n");
      }
    }
  } catch (e) {
    console.log("Seeding error: ", e);
  }
}

seed()
  .then(() => {
    console.log("Database connection successfull! \n");
  })
  .catch(() => {
    process.exit(1);
  })
  .finally(() => {
    console.log("Hello from db/seed \n");
  });
