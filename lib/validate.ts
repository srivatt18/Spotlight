import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be 3 or more characters" }).refine((name) => !name.includes(' '), { message: 'Usernames must not contain spaces' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must 8 characters or longer' }).max(25, { message: 'Password must shorter than 26 characters' }),
});


export const addMediaSchema = z.object({
    title: z.string().min(1, { message: "Title must be 1 or more characters" }),
    age_rating: z.string().min(1, { message: "Age rating must be 1 or more characters" }),
    genre: z.string().min(1, { message: "Genre must be 1 or more characters" }),
    lang: z.string().length(3, { message: "Language must be 3 characters according to ISO 639-3" }),
    is_movie: z.boolean(),
});
