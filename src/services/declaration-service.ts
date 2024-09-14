import type {
  Declaration,
  CashAtHand,
  Acquisition,
  CashDeposit,
  Employment,
  Citizenship,
  Contact,
  Family,
  FamilyEmployment,
  ImmovableAsset,
  Liability,
} from '@prisma/client';
import { declaration } from '@/lib/db';

class DeclarationService {
  static async createDeclaration(
    newDeclaration: DeclarationForm
  ): Promise<Declaration> {
    try {
      const { place, reason, userId } = newDeclaration;
      const createdDeclaration = await declaration.create({
        data: {
          place,
          reason,
          userId,
        },
      });
      return createdDeclaration;
    } catch (error) {
      console.error('Error creating declaration:', error);
      throw error;
    }
  }
  static getDeclaration(
    declarationId: string
  ): Promise<DeclarationData | null> {
    const foundDeclaration = declaration.findUnique({
      where: {
        id: declarationId,
      },
      select: {
        place: true,
        id: true,
        reason: true,
        status: true,
        userId: true,
        cashAtHand: true,
        cashDeposits: true,
        employments: true,
        families: true,
        immovableAssets: true,
        movableAssets: true,
        liabilities: true,
        otherAssets: true,
        pastEmployments: true,
        securities: true,
        // user: {
        //   select: {
        //     personal: true,
        //     contact: true,
        //     email: true,
        //   },
        // },
      },
    });
    return foundDeclaration;
  }
}

export default DeclarationService;
