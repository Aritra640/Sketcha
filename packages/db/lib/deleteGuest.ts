import { prisma } from "./prisma";

export async function DeleteAllGuests(): Promise<boolean> {
  try {
    const result = await prisma.guestUser.deleteMany({});
    if (!result) {
      console.log("Data could not be freed in deleting all guests from db\n");
      console.log("Guests deleted: \n");
      console.log(result);
      console.log("\n");
      return false;
    }
    console.log("All guests deleted from db\n");
    return true;
  } catch (e) {
    console.log("Error deleteing all from guests : ", e);
    return false;
  }
}

