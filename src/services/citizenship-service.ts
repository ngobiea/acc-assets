import { citizenship } from '@/lib/db';
import { type Citizenship } from '@prisma/client';
class CitizenshipService {
  static async createCitizenship(
    newCitizenship: CitizenshipForm
  ): Promise<Citizenship> {
    try {
      const { country, acquireBy, userId } = newCitizenship;

      const createdCitizenship = await citizenship.create({
        data: {
          country,
          acquireBy,
          userId,
        },
      });
      return createdCitizenship;
    } catch (error) {
      console.error('Error creating citizenship:', error);
      throw error;
    }
  }
  static async deleteCitizenship(id: string): Promise<Citizenship> {
    try {
      const isDeleted = await citizenship.delete({
        where: {
          id,
        },
      });
      return isDeleted;
    } catch (error) {
      console.error('Error deleting citizenship:', error);
      throw error;
    }
  }
  static async getCitizenships(
    userId: string
  ): Promise<Citizenship[]> {
    try {
      const citizenships = await citizenship.findMany({
        where: {
          userId,
        },
      });
      return citizenships;
    } catch (error) {
      console.error('Error fetching citizenships:', error);
      throw error;
    }
  }
  static async isCitizenshipExist(
    country: string,
    userId: string
  ): Promise<Citizenship | null> {
    try {
      const foundCitizenship = await citizenship.findFirst({
        where: {
          country,
          userId,
        },
      });
      return foundCitizenship;
    } catch (error) {
      console.error('Error checking citizenship existence:', error);
      throw error;
    }
  }
}

export default CitizenshipService;
