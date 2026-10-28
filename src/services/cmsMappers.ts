import type { BlogItem, PortfolioItem } from '@/types/cms';
import profile from '@/data/profile';

function getCell(row: Record<string, unknown>, columnName: string): unknown {
  const key = Object.keys(row).find(
    (candidate) => candidate.toLowerCase().trim() === columnName.toLowerCase().trim()
  );

  return key ? row[key] : undefined;
}

function getString(row: Record<string, unknown>, columnName: string): string {
  const value = getCell(row, columnName);

  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function parseVisible(value: unknown): boolean {
  if (value === true || value === 1) {
    return true;
  }

  if (
    value === false ||
    value === 0 ||
    value === null ||
    value === undefined
  ) {
    return false;
  }

  const normalized = String(value).trim().toLowerCase();

  return (
    normalized === 'true' ||
    normalized === 'yes' ||
    normalized === '1'
  );
}

function parseDisplayOrder(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed)
    ? parsed
    : Number.MAX_SAFE_INTEGER;
}

function sortByDisplayOrder<T extends { displayOrder: number }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

function buildImagePath(
  folder: 'portfolio' | 'blogs',
  image: string
): string | undefined {
  const filename = image.trim();

  if (!filename) {
    return undefined;
  }

  if (filename.startsWith('/')) {
    return filename;
  }

  if (filename.includes('/')) {
    return `/${filename}`;
  }

  return `/${folder}/${filename}`;
}

export function mapPortfolioRows(
  rows: Record<string, unknown>[]
): PortfolioItem[] {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const image = getString(row, 'Image');

      return {
        title: getString(row, 'Title'),
        description: getString(row, 'Description'),
        imageUrl: buildImagePath('portfolio', image),
        driveLink: getString(row, 'DriveLink') || undefined,
        displayOrder: parseDisplayOrder(
          getCell(row, 'DisplayOrder')
        ),
      };
    })
    .filter((item) => item.title.length > 0);

  return sortByDisplayOrder(items);
}

export function mapBlogRows(
  rows: Record<string, unknown>[]
): BlogItem[] {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const image = getString(row, 'Image');

      return {
        title: getString(row, 'Title'),
        description: getString(row, 'Description'),
        imageUrl: buildImagePath('blogs', image),
        linkedInUrl:
          getString(row, 'LinkedInURL') || undefined,
        displayOrder: parseDisplayOrder(
          getCell(row, 'DisplayOrder')
        ),
      };
    })
    .filter((item) => item.title.length > 0);

  return sortByDisplayOrder(items);
}

// ================= WEBSITE GENERAL / BASICS =================
export function mapGeneralRows(rows: Record<string, unknown>[]): Partial<typeof profile.basics & { contact: typeof profile.contact }> {
  const result: Record<string, any> = {};
  for (const row of rows) {
    const key = getString(row, 'Key').toLowerCase();
    const val = getString(row, 'Value');
    if (key && val) {
      result[key] = val;
    }
  }

  return {
    ...(result.name ? { name: result.name } : {}),
    ...(result.title ? { title: result.title } : {}),
    ...(result.herotagline ? { heroTagline: result.herotagline } : {}),
    ...(result.heroroles ? { heroRoles: result.heroroles.split('\n').map((s: string) => s.trim()).filter(Boolean) } : {}),
    ...(result.herocredentials ? { heroCredentials: result.herocredentials } : {}),
    ...(result.summary ? { summary: result.summary } : {}),
    ...(result.email ? { email: result.email } : {}),
    ...(result.phone ? { phone: result.phone } : {}),
    ...(result.location ? { location: result.location } : {}),
    ...(result.linkedin ? { links: [{ label: 'LinkedIn', url: result.linkedin }] } : {}),
  };
}

// ================= WEBSITE EXPERIENCE =================
export function mapExperienceRows(rows: Record<string, unknown>[]): typeof profile.experience {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const bulletsRaw = getString(row, 'Bullets');
      const bullets = bulletsRaw
        ? bulletsRaw.split('\n').map((b) => b.trim()).filter(Boolean)
        : [];

      return {
        role: getString(row, 'Role'),
        company: getString(row, 'Company'),
        location: getString(row, 'Location'),
        start: getString(row, 'Start'),
        end: getString(row, 'End'),
        bullets,
        displayOrder: parseDisplayOrder(getCell(row, 'DisplayOrder')),
      };
    })
    .filter((item) => item.company.length > 0);

  return sortByDisplayOrder(items).map(({ displayOrder, ...rest }) => rest);
}

// ================= WEBSITE SKILLS =================
export function mapSkillsRows(rows: Record<string, unknown>[]): typeof profile.skills {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const level = Number(getCell(row, 'LevelPercentage')) || 80;
      return {
        name: getString(row, 'SkillName'),
        level,
        displayOrder: parseDisplayOrder(getCell(row, 'DisplayOrder')),
      };
    })
    .filter((item) => item.name.length > 0);

  return sortByDisplayOrder(items).map(({ displayOrder, ...rest }) => rest);
}

// ================= WEBSITE EDUCATION =================
export function mapEducationRows(rows: Record<string, unknown>[]): typeof profile.education {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      return {
        institution: getString(row, 'Institution'),
        degree: getString(row, 'Degree'),
        field: getString(row, 'Field'),
        start: getString(row, 'Start'),
        end: getString(row, 'End'),
        location: getString(row, 'Location') || undefined,
        gpa: getString(row, 'GPA') || undefined,
        displayOrder: parseDisplayOrder(getCell(row, 'DisplayOrder')),
      };
    })
    .filter((item) => item.institution.length > 0);

  return sortByDisplayOrder(items).map(({ displayOrder, ...rest }) => rest);
}

// ================= WEBSITE ACHIEVEMENTS =================
export function mapAchievementsRows(rows: Record<string, unknown>[]): typeof profile.achievements {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      return {
        title: getString(row, 'Title'),
        date: getString(row, 'Date'),
        issuer: getString(row, 'Issuer') || undefined,
        description: getString(row, 'Description') || undefined,
        displayOrder: parseDisplayOrder(getCell(row, 'DisplayOrder')),
      };
    })
    .filter((item) => item.title.length > 0);

  return sortByDisplayOrder(items).map(({ displayOrder, ...rest }) => rest);
}

// ================= WEBSITE EXTRACURRICULAR =================
export function mapExtracurricularRows(rows: Record<string, unknown>[]): typeof profile.extracurricular {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      return {
        organization: getString(row, 'Organization'),
        role: getString(row, 'Role'),
        start: getString(row, 'Start'),
        end: getString(row, 'End'),
        description: getString(row, 'Description'),
        displayOrder: parseDisplayOrder(getCell(row, 'DisplayOrder')),
      };
    })
    .filter((item) => item.organization.length > 0);

  return sortByDisplayOrder(items).map(({ displayOrder, ...rest }) => rest);
}

// ================= WEBSITE PORTFOLIO SECTION =================
export interface LivePortfolioFiller {
  title: string;
  headline: string;
  description: string;
  highlights: string[];
  buttonText: string;
  buttonUrl: string;
}

export function mapPortfolioFillerRows(rows: Record<string, unknown>[]): LivePortfolioFiller | null {
  const active = rows.find((row) => parseVisible(getCell(row, 'Visible')));
  if (!active) return null;

  const rawHighlights = getString(active, 'Highlights');
  const highlights = rawHighlights
    ? rawHighlights.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    title: getString(active, 'Title') || 'Portfolio',
    headline: getString(active, 'Headline') || 'Turning the Unnoticed into Unforgettable',
    description: getString(active, 'Description'),
    highlights,
    buttonText: getString(active, 'ButtonText') || 'View Full Portfolio Showcase',
    buttonUrl: getString(active, 'ButtonURL') || '/portfolio-showcase.html',
  };
}
