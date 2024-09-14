import { type Passport } from '@prisma/client';
import { passport } from '@/lib/db';
class PassportService {
  static async createPassport(
    newPassport: PassportForm
  ): Promise<Passport> {
    try {
      const { passportNumber, issueDate, expiryDate, country, userId } =
        newPassport;
      const createdPassport = await passport.create({
        data: {
          issueDate,
          expiryDate,
          userId,
          country,
          passportNumber,
        },
      });
      return createdPassport;
    } catch (error) {
      console.error('Error creating passport:', error);
      throw error;
    }
  }
  static async deletePassport(id: string): Promise<Passport> {
    try {
      const deletedPassport = await passport.delete({
        where: {
          id,
        },
      });
      return deletedPassport;
    } catch (error) {
      console.error('Error deleting passport:', error);
      throw error;
    }
  }
  static async getPassports(userId: string): Promise<Passport[]> {
    try {
      const passports = await passport.findMany({
        where: {
          userId,
        },
      });
      return passports;
    } catch (error) {
      console.error('Error fetching passports:', error);
      throw error;
    }
  }
  static async isPassportNumberExist(
    passportNumber: string,
    userId: string
  ): Promise<Passport | null> {
    try {
      const foundPassport = await passport.findFirst({
        where: {
          passportNumber,
          userId,
        },
      });
      return foundPassport;
    } catch (error) {
      console.error('Error checking passport existence:', error);
      throw error;
    }
  }
  static async isPassportCountryExist(
    country: string,
    userId: string
  ): Promise<Passport | null> {
    try {
      const foundPassport = await passport.findFirst({
        where: {
          country,
          userId,
        },
      });
      return foundPassport;
    } catch (error) {
      console.error('Error checking passport existence:', error);
      throw error;
    }
  }
}

export default PassportService;
