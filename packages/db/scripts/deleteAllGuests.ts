import { DeleteAllGuests } from "../src";

DeleteAllGuests()
  .then(() => {
    console.log("All guests deleted!");
  })
  .catch((e) => {
    console.log("Error deleteing all guests: ", e);
  })
  .finally(() => {
    console.log("Hi from delete all script!");
  });
