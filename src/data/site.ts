import type { TranslationKey } from '@/utils/translations';

export const siteInfo = {
  name: 'Daniel Manrique, M.D.',
  shortName: 'DM',
  phones: ['+1 (407) 777-9866', '(407) 732-3232'] as const,
  email: 'danielmanriquemd@yahoo.com',
  location: 'Orlando, Florida',
  socials: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
} as const;

export type StatItem = {
  id: string;
  value: string;
  key: TranslationKey;
};

export const stats: StatItem[] = [
  { id: 'surgeries', value: '4,538+', key: 'statSurgeries' },
  { id: 'patients', value: '6,278+', key: 'statPatients' },
  { id: 'referrals', value: '1,130+', key: 'statReferrals' },
];

export type AdvantageItem = {
  id: string;
  key: TranslationKey;
  descKey: TranslationKey;
};

export const advantages: AdvantageItem[] = [
  { id: 'quality', key: 'advQuality', descKey: 'advQualityDesc' },
  { id: 'comfort', key: 'advComfort', descKey: 'advComfortDesc' },
  { id: 'education', key: 'advEducation', descKey: 'advEducationDesc' },
  { id: 'personal', key: 'advPersonal', descKey: 'advPersonalDesc' },
];
