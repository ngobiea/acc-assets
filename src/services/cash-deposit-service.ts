import { CashDeposit } from '@prisma/client';
import { cashDeposit } from '@/lib/db';

export default class CashDepositService {
  static async createCashDeposit(
    newCashDeposit: CashDeposit
  ): Promise<CashDeposit> {
    try {
      const createdCashDeposit = await cashDeposit.create({
        data: {
          accountBalance: newCashDeposit.accountBalance,
          accountNo: newCashDeposit.accountNo,
          currency: newCashDeposit.currency,
          institutionOrBank: newCashDeposit.institutionOrBank,
          location: newCashDeposit.location,
          ownerName: newCashDeposit.ownerName,
          registerOwner: newCashDeposit.registerOwner,
          relation: newCashDeposit.relation,
          source: newCashDeposit.source,
          type: newCashDeposit.type,
          declarationId: newCashDeposit.declarationId,
        },
      });
      return createdCashDeposit;
    } catch (error) {
      console.error('Error creating cash deposit:', error);
      throw error;
    }
  }
  static async deleteCashDeposit(id: string): Promise<CashDeposit> {
    try {
      const deletedCashDeposit = await cashDeposit.delete({
        where: {
          id,
        },
      });
      return deletedCashDeposit;
    } catch (error) {
      console.error('Error deleting cash deposit:', error);
      throw error;
    }
  }
}
