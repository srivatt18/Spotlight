import m from '@/assets/movies.json'; 
import { jsonDbSchema } from '@/lib/validate';

const media = jsonDbSchema.parse(m);
export default media;