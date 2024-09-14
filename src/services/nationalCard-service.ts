import { nationalCard } from '@/lib/db';
import { type NationalCard } from '@prisma/client';
class NationalCardService {
  static async createNationalCard(
    newNationalCard: NationalCardForm
  ): Promise<NationalCard> {
    try {
      const { nationalId, issueDate, expiryDate, country, userId } =
        newNationalCard;
      const createdNationalCard = await nationalCard.create({
        data: {
          issueDate,
          expiryDate,
          userId,
          country,
          nationalId,
        },
      });
      return createdNationalCard;
    } catch (error) {
      console.error('Error creating national card:', error);
      throw error;
    }
  }
  static async deleteNationalCard(id: string): Promise<NationalCard> {
    try {
      const deletedNationalCard = await nationalCard.delete({
        where: {
          id,
        },
      });
      return deletedNationalCard;
    } catch (error) {
      console.error('Error deleting national card:', error);
      throw error;
    }
  }
  static async getNationalCards(userId: string): Promise<NationalCard[]> {
    try {
      const nationalCards = await nationalCard.findMany({
        where: {
          userId,
        },
      });
      return nationalCards;
    } catch (error) {
      console.error('Error fetching national cards:', error);
      throw error;
    }
  }
  static async isNationalCardIdExist(
    nationalId: string,
    userId: string
  ): Promise<NationalCard | null> {
    try {
      const foundNationalCard = await nationalCard.findFirst({
        where: {
          nationalId,
          userId,
        },
      });
      return foundNationalCard;
    } catch (error) {
      console.error('Error checking national card:', error);
      throw error;
    }
  }
  static async isNationalCardCountryExist(
    country: string,
    userId: string
  ): Promise<NationalCard | null> {
    try {
      const foundNationalCard = await nationalCard.findFirst({
        where: {
          country,
          userId,
        },
      });
      return foundNationalCard;
    } catch (error) {
      console.error('Error checking national card:', error);
      throw error;
    }
  }
}

export default NationalCardService;
