import { otherAsset } from '@/lib/db';
import { OtherAsset } from '@prisma/client';

export default class OtherAssetService {
  static async createOtherAsset(
    newOtherAsset: OtherAssetClientForm
  ): Promise<OtherAsset> {
    try {
      const createdOtherAsset = await otherAsset.create({
        data: {
          assetType: newOtherAsset.assetType,
          estimatedValue: newOtherAsset.estimatedValue,
          ownerName: newOtherAsset.ownerName,
          relation: newOtherAsset.relation === 'Other' ? newOtherAsset.otherRelation : newOtherAsset.relation,
          declarationId: newOtherAsset.declarationId,
          acquisitionCost: newOtherAsset.acquisitionCost,
          acquisitionCurrency: newOtherAsset.acquisitionCurrency,
          acquisitionMode: newOtherAsset.acquisitionMode,
          acquisitionYear: Number(newOtherAsset.acquisitionYear),
          currency: newOtherAsset.currency,
          financeSource: newOtherAsset.financeSource === 'Other' ? newOtherAsset.otherFinanceSource : newOtherAsset.financeSource,
          registerOwner: newOtherAsset.registerOwner,
          location: newOtherAsset.location,
          remarks: newOtherAsset.remarks,
        },
      });
      return createdOtherAsset;
    } catch (error) {
      console.error('Error creating other asset:', error);
      throw error;
    }
  }

  static async deleteOtherAsset(id: string): Promise<OtherAsset> {
    try {
      const deletedOtherAsset = await otherAsset.delete({
        where: {
          id,
        },
      });
      return deletedOtherAsset;
    } catch (error) {
      console.error('Error deleting other asset:', error);
      throw error;
    }
  }
}
