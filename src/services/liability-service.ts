import { Liability } from '@prisma/client';
import { liability } from '@/lib/db';

export default class LiabilityService {
  static async createLiability(
    newLiability: LiabilityClientForm
  ): Promise<Liability> {
    try {
      const createdLiability = await liability.create({
        data: {
          declarationId: newLiability.declarationId,
          creditor: newLiability.creditor,
          currency: newLiability.currency,
          currencyOutstanding: newLiability.currencyOutstanding,
          debtorName: newLiability.debtorName,
          loanAmount: newLiability.loanAmount,
          loanOutstanding: newLiability.loanOutstanding,
          loanPurpose: newLiability.loanPurpose,
          loanRepayment: newLiability.loanRepayment,
          paymentPeriod: Number(newLiability.paymentPeriod),
          relation:
            newLiability.relation === 'Other'
              ? newLiability.otherRelation
              : newLiability.relation,
          creditorAddress: newLiability.creditorAddress,
          maturityDate: newLiability.maturityDate,
          remarks: newLiability.remarks,
          yearContracted: Number(newLiability.yearContracted),
        },
      });
      return createdLiability;
    } catch (error) {
      console.error('Error creating liability:', error);
      throw error;
    }
  }
  static async deleteLiability(id: string): Promise<Liability> {
    try {
      const deletedLiability = await liability.delete({
        where: {
          id,
        },
      });
      return deletedLiability;
    } catch (error) {
      console.error('Error deleting liability:', error);
      throw error;
    }
  }
}
