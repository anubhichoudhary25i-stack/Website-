import { CMS_CONFIG } from '@/config/cms';

interface GvizCell {
  v: string | number | boolean | null;
}

interface GvizRow {
  c: (GvizCell | null)[];
}

interface GvizTable {
  cols: Array<{ label?: string; id?: string }>;
  rows: GvizRow[];
}

interface GvizResponse {
  table: GvizTable;
}

function parseGvizResponse(rawText: string): GvizResponse {
  const match = rawText.match(
    /google\.visualization\.Query\.setResponse\(([\s\S]*)\);/
  );

  if (!match?.[1]) {
    throw new Error('Unexpected Google Sheets response format.');
  }

  return JSON.parse(match[1]) as GvizResponse;
}

function rowsToObjects(table: GvizTable): Record<string, unknown>[] {
  const labels = table.cols.map((col, index) => 
    (col.label && col.label.trim()) || col.id || String.fromCharCode(65 + index)
  );

  return table.rows.map((row) => {
    const record: Record<string, unknown> = {};

    row.c.forEach((cell, index) => {
      const label = labels[index];
      if (label) {
        record[label] = cell?.v ?? null;
      }
    });

    return record;
  });
}

/**
 * Fetches a tab from a publicly shared Google Spreadsheet via the gviz endpoint.
 * No API key or Google Cloud project required.
 */
export async function fetchPublicSheetTab(
  tabName: string
): Promise<Record<string, unknown>[]> {
  if (!CMS_CONFIG.sheetId) {
    return [];
  }

  const url =
    `https://docs.google.com/spreadsheets/d/${CMS_CONFIG.sheetId}/gviz/tq` +
    `?tqx=out:json&sheet=${encodeURIComponent(tabName)}&headers=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to load "${tabName}" tab (HTTP ${response.status}). ` +
        'Ensure the spreadsheet is shared as "Anyone with the link can view".'
    );
  }

  const rawText = await response.text();
  const parsed = parseGvizResponse(rawText);

  return rowsToObjects(parsed.table);
}
