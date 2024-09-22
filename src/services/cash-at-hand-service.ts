import { CashAtHand } from '@prisma/client';
import { cashAtHand } from '@/lib/db';
export default class CashAtHandService {
  static async createCashAtHand(
    newCashAtHand: CashAtHand
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
