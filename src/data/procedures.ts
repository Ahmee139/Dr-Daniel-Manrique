import type { TranslationKey } from '@/utils/translations';

export type ProcedureItem = {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
};

export type ProcedureCategory = {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  items: ProcedureItem[];
};

export const procedureCategories: ProcedureCategory[] = [
  {
    id: 'cosmetic',
    titleKey: 'catCosmetic',
    descKey: 'catCosmeticDesc',
    items: [
      {
        id: 'rhinoplasty',
        titleKey: 'procRhinoplasty',
        descKey: 'procRhinoplastyDesc',
      },
      {
        id: 'blepharoplasty',
        titleKey: 'procBlepharoplasty',
        descKey: 'procBlepharoplastyDesc',
      },
      {
        id: 'chin',
        titleKey: 'procChin',
        descKey: 'procChinDesc',
      },
      {
        id: 'bichectomy',
        titleKey: 'procBichectomy',
        descKey: 'procBichectomyDesc',
      },
    ],
  },
  {
    id: 'functional',
    titleKey: 'catFunctional',
    descKey: 'catFunctionalDesc',
    items: [
      {
        id: 'septoplasty',
        titleKey: 'procSeptoplasty',
        descKey: 'procSeptoplastyDesc',
      },
      {
        id: 'sinus',
        titleKey: 'procSinus',
        descKey: 'procSinusDesc',
      },
    ],
  },
  {
    id: 'reconstructive',
    titleKey: 'catReconstructive',
    descKey: 'catReconstructiveDesc',
    items: [
      {
        id: 'trauma',
        titleKey: 'procTrauma',
        descKey: 'procTraumaDesc',
      },
      {
        id: 'scar',
        titleKey: 'procScar',
        descKey: 'procScarDesc',
      },
    ],
  },
  {
    id: 'integrative',
    titleKey: 'catIntegrative',
    descKey: 'catIntegrativeDesc',
    items: [
      {
        id: 'laser',
        titleKey: 'procLaser',
        descKey: 'procLaserDesc',
      },
      {
        id: 'injectables',
        titleKey: 'procInjectables',
        descKey: 'procInjectablesDesc',
      },
    ],
  },
];

export const featuredProcedures = [
  'rhinoplasty',
  'blepharoplasty',
  'chin',
  'bichectomy',
] as const;
