const fs = require("fs");
const path = require("path");

const root = process.cwd();
const inputArg = process.argv[2] || path.join("docs", "project3_portfolio_interview_guide.md");
const outputArg = process.argv[3] || inputArg.replace(/\.(md|txt)$/i, ".pdf");

const inputPath = path.isAbsolute(inputArg) ? inputArg : path.join(root, inputArg);
const outputPath = path.isAbsolute(outputArg) ? outputArg : path.join(root, outputArg);

const source = fs.readFileSync(inputPath, "utf8").replace(/\r\n/g, "\n");

const cleanText = source
  .replace(/^```[\s\S]*?^```$/gm, (block) =>
    block
      .replace(/^```[^\n]*\n?/, "")
      .replace(/\n```$/, "")
      .split("\n")
      .map((line) => `    ${line}`)
      .join("\n")
  )
  .replace(/^---$/gm, "")
  .replace(/^# (.*)$/gm, (_, t) => `${t.toUpperCase()}`)
  .replace(/^## (.*)$/gm, (_, t) => `\n${t}`)
  .replace(/^### (.*)$/gm, (_, t) => `\n${t}`)
  .replace(/`([^`]+)`/g, "$1");

const lines = [];
const wrapWidth = 92;

for (const rawLine of cleanText.split("\n")) {
  const line = rawLine.replace(/\t/g, "    ").trimEnd();
  if (!line.trim()) {
    lines.push("");
    continue;
  }

  const indentMatch = rawLine.match(/^(\s+)/);
  const indent = indentMatch ? indentMatch[1] : "";
  const content = line.trimStart();

  if (content.length <= wrapWidth) {
    lines.push(indent + content);
    continue;
  }

  let current = "";
  for (const word of content.split(/\s+/)) {
    const test = current ? `${current} ${word}` : word;
    if ((indent + test).length > wrapWidth) {
      lines.push(indent + current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(indent + current);
}

const pageWidth = 595;
const pageHeight = 842;
const marginLeft = 45;
const marginTop = 45;
const fontSize = 10;
const leading = 14;
const maxLinesPerPage = Math.floor((pageHeight - marginTop * 2) / leading);

const pages = [];
for (let i = 0; i < lines.length; i += maxLinesPerPage) {
  pages.push(lines.slice(i, i + maxLinesPerPage));
}

const escapePdfText = (text) =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const objects = [];

const addObject = (content) => {
  objects.push(content);
  return objects.length;
};

const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

const pageIds = [];
const contentIds = [];

for (const pageLines of pages) {
  const textLines = [];
  textLines.push("BT");
  textLines.push(`/F1 ${fontSize} Tf`);
  textLines.push(`${leading} TL`);
  textLines.push(`1 0 0 1 ${marginLeft} ${pageHeight - marginTop} Tm`);
  let firstLine = true;
  for (const line of pageLines) {
    const escaped = escapePdfText(line);
    if (firstLine) {
      textLines.push(`(${escaped}) Tj`);
      firstLine = false;
    } else {
      textLines.push(`T* (${escaped}) Tj`);
    }
  }
  textLines.push("ET");
  const stream = textLines.join("\n");
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`);
  contentIds.push(contentId);
  pageIds.push(null);
}

const pagesRootPlaceholderIndex = objects.length;
objects.push("");

for (let i = 0; i < pages.length; i++) {
  const pageObj = `<< /Type /Page /Parent ${pagesRootPlaceholderIndex + 1} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`;
  const pageId = addObject(pageObj);
  pageIds[i] = pageId;
}

objects[pagesRootPlaceholderIndex] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds
  .map((id) => `${id} 0 R`)
  .join(" ")}] >>`;

const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesRootPlaceholderIndex + 1} 0 R >>`);

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i < offsets.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

fs.writeFileSync(outputPath, pdf, "utf8");
console.log(`PDF generated: ${outputPath}`);
