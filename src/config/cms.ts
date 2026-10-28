export const CMS_CONFIG = {
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID ?? '',
  tabs: {
    general: 'General',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    achievements: 'Achievements',
    extracurricular: 'Extracurricular',
    blogs: 'Blogs',
    portfolio: 'Portfolio',
  },
  /** Cache sheet data for 5 minutes; refetch in background so edits appear without redeploying. */
  staleTime: 5 * 60 * 1000,
  refetchInterval: 10 * 60 * 1000,
} as const;

export function isCmsConfigured(): boolean {
  return Boolean(CMS_CONFIG.sheetId && CMS_CONFIG.sheetId.trim().length > 0);
}
