import {prisma} from "@repo/db/prisma_client";


export default async function SeedDatabaseTest() {

  const currentdate = new Date();

  const guest = await prisma.guestUserSession.create({
    data: {
        expiresAt: currentdate
    }
  });

  if(!guest) {
    console.log("seeding has failed!");
  }
  else {
    console.log("seeding has succeded \n");
    console.log(guest);
  }
}
