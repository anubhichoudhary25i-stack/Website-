import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CMS_CONFIG, isCmsConfigured } from '@/config/cms';
import { fetchPublicSheetTab } from '@/services/googleSheets';
import {
  mapGeneralRows,
  mapExperienceRows,
  mapSkillsRows,
  mapEducationRows,
  mapAchievementsRows,
  mapExtracurricularRows,
  mapPortfolioFillerRows,
  LivePortfolioFiller
} from '@/services/cmsMappers';
import defaultProfile from '@/data/profile';

export function useLiveProfile() {
  const enabled = isCmsConfigured();

  useEffect(() => {
    if (CMS_CONFIG.sheetId) {
      try {
        localStorage.setItem('website_sheet_id', CMS_CONFIG.sheetId);
      } catch {}
    }
  }, []);

  // General / Basics
  const generalQuery = useQuery({
    queryKey: ['cms', 'general'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.general);
      return mapGeneralRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Experience
  const experienceQuery = useQuery({
    queryKey: ['cms', 'experience'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.experience);
      return mapExperienceRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Skills
  const skillsQuery = useQuery({
    queryKey: ['cms', 'skills'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.skills);
      return mapSkillsRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Education
  const educationQuery = useQuery({
    queryKey: ['cms', 'education'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.education);
      return mapEducationRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Achievements
  const achievementsQuery = useQuery({
    queryKey: ['cms', 'achievements'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.achievements);
      return mapAchievementsRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Extracurricular
  const extracurricularQuery = useQuery({
    queryKey: ['cms', 'extracurricular'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.extracurricular);
      return mapExtracurricularRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Portfolio Filler
  const portfolioQuery = useQuery({
    queryKey: ['cms', 'portfolio_filler'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.portfolio);
      return mapPortfolioFillerRows(rows);
    },
    enabled,
    staleTime: CMS_CONFIG.staleTime,
  });

  // Merge live data on top of defaultProfile
  const profile = {
    ...defaultProfile,
    basics: {
      ...defaultProfile.basics,
      ...(generalQuery.data || {}),
    },
    experience: experienceQuery.data && experienceQuery.data.length > 0
      ? experienceQuery.data
      : defaultProfile.experience,
    skills: skillsQuery.data && skillsQuery.data.length > 0
      ? skillsQuery.data
      : defaultProfile.skills,
    education: educationQuery.data && educationQuery.data.length > 0
      ? educationQuery.data
      : defaultProfile.education,
    achievements: achievementsQuery.data && achievementsQuery.data.length > 0
      ? achievementsQuery.data
      : defaultProfile.achievements,
    extracurricular: extracurricularQuery.data && extracurricularQuery.data.length > 0
      ? extracurricularQuery.data
      : defaultProfile.extracurricular,
  };

  const portfolioFiller: LivePortfolioFiller | null = portfolioQuery.data || null;

  return {
    profile,
    portfolioFiller,
    isLoading: generalQuery.isLoading || experienceQuery.isLoading,
    isCmsLive: enabled,
  };
}
