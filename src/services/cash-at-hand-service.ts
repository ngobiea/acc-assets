import { CashAtHand } from '@prisma/client';
import { cashAtHand } from '@/lib/db';
import { CashAtHandData } from '@/utils/declaration';
export default class CashAtHandService {
  static async createCashAtHand(
    newCashAtHand: CashAtHandClientForm
  ): Promise<CashAtHand> {
    try {
      const createdCashAtHand = await cashAtHand.create({
        data: {
          amount: newCashAtHand.amount,
          currency: newCashAtHand.currency,
          declarationId: newCashAtHand.declarationId,
          details: newCashAtHand.details,
          jointIncome: newCashAtHand.jointIncome,
        },
      });
      return createdCashAtHand;
    } catch (error) {
      console.error('Error creating cash at hand:', error);
      throw error;
    }
  }
  static async isCashAtHandExist(
    declarationId: string
  ): Promise<CashAtHandData | null> {
    try {
      const data = await cashAtHand.findUnique({
        where: {
          declarationId,
        },
      });
      return data
        ? {
            ...data,
            amount: new Intl.NumberFormat().format(data.amount.toNumber()),
          }
        : null;
    } catch (error) {
      console.error('Error getting cash at hand by id:', error);
      throw error;
    }
  }
  static async deleteCashAtHand(id: string): Promise<CashAtHand> {
    try {
      const deletedCashAtHand = await cashAtHand.delete({
        where: {
          id,
        },
      });
      return deletedCashAtHand;
    } catch (error) {
      console.error('Error deleting cash at hand:', error);
      throw error;
    }
  }
  static async updateCashAtHand(
    id: string,
    updatedCashAtHand: CashAtHand
  ): Promise<CashAtHand> {
    try {
      const updatedCash = await cashAtHand.update({
        where: {
          id,
        },
        data: {
          amount: updatedCashAtHand.amount,
          currency: updatedCashAtHand.currency,
          declarationId: updatedCashAtHand.declarationId,
          details: updatedCashAtHand.details,
          jointIncome: updatedCashAtHand.jointIncome,
        },
      });
      return updatedCash;
    } catch (error) {
      console.error('Error updating cash at hand:', error);
      throw error;
    }
  }
}
