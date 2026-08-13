const FORMULA_PREFIX = /^[\t\r ]*[=+\-@]/;

export function escapeCsvCell(value: unknown) {
  let text = String(value ?? "");
  if (FORMULA_PREFIX.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

export function rowsToCsv(rows: unknown[][]) {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}
