import { movableAsset } from '@/lib/db';
import { MovableAsset } from '@prisma/client';

export default class MovableAssetService {
  static async createMovableAsset(
    newMovableAsset: MovableAssetClientForm
  ): Promise<MovableAsset> {
    try {
      const createdMovableAsset = await movableAsset.create({
        data: {
          declarationId: newMovableAsset.declarationId,
          acquisitionCost: newMovableAsset.acquisitionCost,
          acquisitionCurrency: newMovableAsset.acquisitionCurrency,
          acquisitionMode: newMovableAsset.acquisitionMode,
          acquisitionYear: Number(newMovableAsset.acquisitionYear),
          assetType: newMovableAsset.assetType,
          currency: newMovableAsset.currency,
          estimatedValue: newMovableAsset.estimatedValue,
          location: newMovableAsset.location,
          ownerName: newMovableAsset.ownerName,
          registerOwner: newMovableAsset.registerOwner,
          relation:
            newMovableAsset.relation === 'Other'
              ? newMovableAsset.otherRelation
              : newMovableAsset.relation,
          financeSource:
            newMovableAsset.financeSource === 'Other'
              ? newMovableAsset.otherFinanceSource
              : newMovableAsset.financeSource,
          registrationNo: newMovableAsset.registrationNo,
          purpose: newMovableAsset.purpose,
          description: newMovableAsset.description,
        },
      });
      return createdMovableAsset;
    } catch (error) {
      console.error('Error creating movable asset:', error);
      throw error;
    }
  }
  static async deleteMovableAsset(id: string): Promise<MovableAsset> {
    try {
      const deletedMovableAsset = await movableAsset.delete({
        where: {
          id,
        },
      });
      return deletedMovableAsset;
    } catch (error) {
      console.error('Error deleting movable asset:', error);
      throw error;
    }
  }
}
