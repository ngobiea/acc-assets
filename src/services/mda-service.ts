import { mdaData } from '@/utils/selectOptions';
import { mDA } from '@/lib/db';
import type { MDA } from '@prisma/client';
class MDAService {
  static async createMDA(newMDA: MDAAttributes): Promise<MDA> {
    try {
      const { abbreviation, name } = newMDA;
      const createdMDA = await mDA.create({ data: { abbreviation, name } });
      return createdMDA;
    } catch (error) {
      console.error('Error creating MDA:', error);
      throw error;
    }
  }
  static async deleteMDA(id: string): Promise<MDA> {
    try {
      const deletedMDA = await mDA.delete({
        where: {
          id,
        },
      });
      return deletedMDA;
    } catch (error) {
      console.error('Error deleting MDA:', error);
      throw error;
    }
  }
  static async createBulkMDA(): Promise<void> {
    try {
      await mDA.createMany({
        data: mdaData,
      });
    } catch (error) {
      console.error('Error creating MDA:', error);
      throw error;
    }
  }
  static async getMDAs(): Promise<MDAAttributes[]> {
    try {
      const mdas = await mDA.findMany();
      return mdas;
    } catch (error) {
      console.error('Error fetching MDAs:', error);
      throw error;
    }
  }
}

export default MDAService;
