import { writeFile } from "fs"

console.log("O que a migration vai fazer:");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
  const name = d.toString().trim()
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_");

    const fileName = `${Date.now()}_${name}.sql`;

  writeFile(`./database/migrations/${fileName}`, '', function (err, file) {
    if(err) {
      throw err
    } else {
      console.log(`Migration criada com sucesso! \n${fileName}`);
      process.exit(0)
    }
  })
});