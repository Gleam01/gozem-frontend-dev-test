export interface ILanguage {
  id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  title: string;
  icon_url: string;
  slug: string;
  num_exercises?: number;
}
