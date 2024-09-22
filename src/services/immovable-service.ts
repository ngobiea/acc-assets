import { ImmovableAsset } from '@prisma/client';
import { immovableAsset } from '@/lib/db';

export default class ImmovableAssetService { 
    static async createImmovableAsset(
        newImmovableAsset: ImmovableAsset
    ): Promise<ImmovableAsset> {
        try {
        const createdImmovableAsset = await immovableAsset.create({
            data: {
            
                declarationId: newImmovableAsset.declarationId,
                acquisitionCost: newImmovableAsset.acquisitionCost,
                acquisitionCurrency: newImmovableAsset.acquisitionCurrency,
                acquisitionMode: newImmovableAsset.acquisitionMode,
                acquisitionYear: newImmovableAsset.acquisitionYear,
                assetType: newImmovableAsset.assetType,
                currency: newImmovableAsset.currency,
                estimatedValue: newImmovableAsset.estimatedValue,
                location: newImmovableAsset.location,
                ownerName: newImmovableAsset.ownerName,
                registerOwner: newImmovableAsset.registerOwner,
                relation: newImmovableAsset.relation,
                financeSource: newImmovableAsset.financeSource,
                plotNo: newImmovableAsset.plotNo,
                size: newImmovableAsset.size,
            },
        });
        return createdImmovableAsset;
        } catch (error) {
        console.error('Error creating immovable asset:', error);
        throw error;
        }
    }
    static async deleteImmovableAsset(id: string): Promise<ImmovableAsset> {
        try {
        const deletedImmovableAsset = await immovableAsset.delete({
            where: {
            id,
            },
        });
        return deletedImmovableAsset;
        } catch (error) {
        console.error('Error deleting immovable asset:', error);
        throw error;
        }
    }
 
}