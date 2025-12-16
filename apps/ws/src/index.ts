import SeedDatabaseTest from "./seed.js"

SeedDatabaseTest().finally(() => {
  console.log("\nHello from ws")
})

