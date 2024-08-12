import { initDB } from '@/models';
import '../models/associations';

export const initDatabase = async () => {
  await initDB();
};
