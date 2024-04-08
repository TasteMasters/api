import 'dotenv/config'
import { readdir, readFile } from "node:fs/promises"
import { Client } from "./database.service.js"

async function runMigrations() {
  const files = await readdir("./database/migrations/")

  for await (let file of files) {
    const sql = (await readFile(`./database/migrations/${file}`)).toString()
    
    await new Promise((resolve, reject) => {
      Client.query(sql, (err, result) => {
        if (err) {
          throw err
        }else {
          console.log(file);
          resolve()
        }
      })
    })
  }

  process.exit(0)
}

runMigrations()