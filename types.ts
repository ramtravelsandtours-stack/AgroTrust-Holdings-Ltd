
export type Language = 'BN' | 'EN';

export interface ContentItem {
  bn: string;
  en: string;
}

export interface ProfilePageProps {
  lang: Language;
}
