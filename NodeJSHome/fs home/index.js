const fs = require("fs");
const path = require("path");

// Read and write
const filePath = "../../example.md";
const FileName = path.parse(filePath).name;

const SourceDirName = path.dirname("../SampleMDs");

const copySourceDir = fs.readdirSync(SourceDirName, "utf-8");

const createDir = fs.mkdirSync(`../${copySourceDir}`);

console.log(copySourceDir);

// console.log(DirName[0]);

const DirImport = fs.readdirSync("../SampleMDs", "utf-8");

// const DirWrite = fs.mkdirSync(DirImport, );

// console.log();

const SourceData = fs.readFileSync(filePath, "utf-8", (err, data) => {
  if (err) throw err;

  console.log(data);
  return data;
});

fs.writeFileSync(filePath, `---\nid: "${FileName}"\n---\n`, (err) => {
  if (err) throw err;
});

fs.appendFileSync(filePath, SourceData, (err, data) => {
  if (err) throw err;

  console.log(data);
});
