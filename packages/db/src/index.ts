import { prisma } from "../lib/prisma";
import { DeleteAllGuests } from "../lib/deleteGuest";

console.log("Hello from db")

export { prisma };
export { DeleteAllGuests };
