import { ILanguage } from './ilanguage.model';

export interface ITestimonial {
  id: string;
  created_at: Date;
  language: ILanguage;
  exercise: IExercise;
  content: string;
  mentor: string;
}

export interface IExercise {
  title: string;
  icon_url: string;
  slug: string;
}
