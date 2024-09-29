import { Security } from '@prisma/client';
import { security } from '@/lib/db';

export default class SecurityService {
  static async createSecurity(
    newSecurity: SecurityClientForm
  ): Promise<Security> {
    try {
      const createdSecurity = await security.create({
        data: {
          acquisitionCost: newSecurity.acquisitionCost,
          acquisitionCurrency: newSecurity.acquisitionCurrency,
          acquisitionMode: newSecurity.acquisitionMode,
          acquisitionYear: Number(newSecurity.acquisitionYear),
          certificateNo: newSecurity.certificateNo,
          company: newSecurity.company,
          currency: newSecurity.currency,
          currentMarketValue: newSecurity.currentMarketValue,
          financeSource:
            newSecurity.financeSource === 'Other'
              ? newSecurity.otherFinanceSource
              : newSecurity.financeSource,
          ownerName: newSecurity.ownerName,
          registerOwner: newSecurity.registerOwner,
          relation:
            newSecurity.relation === 'Other'
              ? newSecurity.otherRelation
              : newSecurity.relation,
          type: newSecurity.type,
          declarationId: newSecurity.declarationId,
          name: newSecurity.name,
          natureOfShares: newSecurity.natureOfShares,
          numberOfShares: newSecurity.numberOfShares,
          yearlyInterest: newSecurity.yearlyInterest,
        },
      });
      return createdSecurity;
    } catch (error) {
      console.error('Error creating security:', error);
      throw error;
    }
  }
  static async deleteSecurity(id: string): Promise<Security> {
    try {
      const deletedSecurity = await security.delete({
        where: {
          id,
        },
      });
      return deletedSecurity;
    } catch (error) {
      console.error('Error deleting security:', error);
      throw error;
    }
  }
}
