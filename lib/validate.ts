import { z } from 'zod';

export type MediaType = z.infer<typeof mediaSchema>;
export type MovieHistoryType = z.infer<typeof movieHistorySchema>

export const mediaSchema = z.object({
  names: z.string(),
  date_x: z.string().nullable(),
  score: z.number().nullable(),
  genre: z.string().nullable(),
  overview: z.string().nullable(),
  crew: z.string().nullable(),
  orig_title: z.string().nullable(),
  status: z.string().nullable(),
  orig_lang: z.string().nullable(),
  budget_x: z.number().nullable(),
  revenue: z.number().nullable(),
  country: z.string().nullable(),
});

export const movieHistorySchema = z.object({
  title: z.string(),
  rating: z.number()
})

export const watchlistSchema = z.array(mediaSchema)
export const watchedMoviesSchema = z.array(movieHistorySchema);

export const jsonDbSchema = z.array(mediaSchema);

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be 3 or more characters" }).refine((name) => !name.includes(' '), { message: 'Usernames must not contain spaces' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must 8 characters or longer' }).max(25, { message: 'Password must shorter than 26 characters' }),
});

export const addWatchlistSchema = z.object({
  title: z.string().min(1, { message: "Title must be 1 or more characters" }),
  isPublic: z.boolean()
});

export const addMediaSchema = z.object({
    title: z.string().min(1, { message: "Title must be 1 or more characters" }),
    age_rating: z.string().min(1, { message: "Age rating must be 1 or more characters" }),
    genre: z.string().min(1, { message: "Genre must be 1 or more characters" }),
    lang: z.string().length(3, { message: "Language must be 3 characters according to ISO 639-3" }),
    is_movie: z.boolean(),
});
