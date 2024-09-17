import { Declaration, CashAtHand } from '@prisma/client';
// import { DeclarationData } from '@/types/declaration';
import { declaration } from '@/lib/db';
import type { DeclarationData } from '@/utils/declaration';
import { nanoid } from '@/utils/declarations/id-generator';

class DeclarationService {
  static async createDeclaration(
    newDeclaration: DeclarationForm
  ): Promise<Declaration> {
    try {
      const { place, reason, userId } = newDeclaration;
      const createdDeclaration = await declaration.create({
        data: {
          id: nanoid(),
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
  static async getDeclaration(
    declarationId: string
  ): Promise<DeclarationData | null> {
    const foundDeclaration = await declaration.findUnique({
      where: {
        id: declarationId,
      },
      select: {
        id: true,
        place: true,
        reason: true,
        status: true,
        cashAtHand: true,
        cashDeposits: true,
        employments: {
          include: {
            mda: true,
          },
        },
        families: true,
        immovableAssets: true,
        movableAssets: true,
        liabilities: true,
        otherAssets: true,
        pastEmployments: true,
        securities: true,
        contact: true,
        personal: true,
        userId: true,
      },
    });
    return foundDeclaration;
  }
  static async getDeclarations(userId: string): Promise<Declaration[]> {
    try {
      const declarations = await declaration.findMany({
        where: {
          userId,
        },
      });

      // console.log(declaration);
      return declarations;
    } catch (error) {
      console.error('Error getting declarations:', error);
      throw error;
    }
  }

  static async getLastDeclaration(
    userId: string
  ): Promise<DeclarationData | null> {
    try {
      const lastDeclaration = await declaration.findFirst({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          place: true,
          reason: true,
          status: true,
          cashAtHand: true,
          cashDeposits: true,
          employments: {
            include: {
              mda: true,
            },
          },
          families: true,
          immovableAssets: true,
          movableAssets: true,
          liabilities: true,
          otherAssets: true,
          pastEmployments: true,
          securities: true,
          contact: true,
          personal: true,
          userId: true,
        },
      });

      return lastDeclaration;
    } catch (error) {
      console.error('Error getting last declaration:', error);
      throw error;
    }
  }
  static async createFromLastDeclaration(userId: string): Promise<Declaration> {
    try {
      const lastDeclaration = await this.getLastDeclaration(userId);
      if (!lastDeclaration) {
        throw new Error('No previous declaration found');
      }
      const createdDeclaration = await declaration.create({
        data: {
          reason: lastDeclaration.reason,
          place: lastDeclaration.place,
          userId: lastDeclaration.userId,
          employments: {
            create: lastDeclaration.employments.map((employment) => ({
              annualSalary: employment.annualSalary,
              contractEndDate: employment.contractEndDate,
              contractStartDate: employment.contractStartDate,
              contractType: employment.contractType,
              currency: employment.currency,
              designation: employment.designation,
              employeeCategory: employment.employeeCategory,
              employeeId: employment.employeeId,
              mda: {
                create: {
                  abbreviation: employment.mda.abbreviation,
                  name: employment.mda.name,
                },
              },
              rank: employment.rank,
              status: employment.status,
              allowances: employment.allowances,
              allowancesCurrency: employment.allowancesCurrency,
              allowancesDescription: employment.allowancesDescription,
              employeePin: employment.employeePin,
              establishmentRegNo: employment.establishmentRegNo,
              sourceOfIncome: employment.sourceOfIncome,
              SSNo: employment.SSNo,
              posting: employment.posting,
            })),
          },
          cashAtHand: lastDeclaration.cashAtHand
            ? {
                create: {
                  amount: lastDeclaration.cashAtHand?.amount,
                  currency: lastDeclaration.cashAtHand?.currency,
                  details: lastDeclaration.cashAtHand?.details,
                  jointIncome: lastDeclaration.cashAtHand?.jointIncome,
                },
              }
            : undefined,
          cashDeposits: {
            create: lastDeclaration.cashDeposits.map((cashDeposit) => ({
              accountBalance: cashDeposit.accountBalance,
              accountNo: cashDeposit.accountNo,
              currency: cashDeposit.currency,
              institutionOrBank: cashDeposit.institutionOrBank,
              location: cashDeposit.location,
              ownerName: cashDeposit.ownerName,
              type: cashDeposit.type,
              registerOwner: cashDeposit.registerOwner,
              relation: cashDeposit.relation,
              source: cashDeposit.source,
            })),
          },
          families: {
            create: lastDeclaration.families.map((family) => ({
              address: family.address,
              dateOfBirth: family.dateOfBirth,
              email: family.email,
              firstName: family.firstName,
              gender: family.gender,
              relation: family.relation,
              surname: family.surname,
              phoneNumber: family.phoneNumber,
              businessName: family.businessName,
              designation: family.designation,
              institution: family.institution,
              category: family.category,
              employeeNo: family.employeeNo,
              middleName: family.middleName,
              mobile: family.mobile,
              nationality: family.nationality,
              pinCode: family.pinCode,
              SSNo: family.SSNo,
            })),
          },
          immovableAssets: {
            create: lastDeclaration.immovableAssets.map((immovableAsset) => ({
              assetType: immovableAsset.assetType,
              currency: immovableAsset.currency,
              estimatedValue: immovableAsset.estimatedValue,
              financeSource: immovableAsset.financeSource,
              location: immovableAsset.location,
              ownerName: immovableAsset.ownerName,
              registerOwner: immovableAsset.registerOwner,
              relation: immovableAsset.relation,
              plotNo: immovableAsset.plotNo,
              size: immovableAsset.size,
              acquisitionCost: immovableAsset.acquisitionCost,
              acquisitionCurrency: immovableAsset.acquisitionCurrency,
              acquisitionMode: immovableAsset.acquisitionMode,
              acquisitionYear: immovableAsset.acquisitionYear,
            })),
          },
          liabilities: {
            create: lastDeclaration.liabilities.map((liability) => ({
              creditor: liability.creditor,
              currency: liability.currency,
              currencyOutstanding: liability.currencyOutstanding,
              debtorName: liability.debtorName,
              loanAmount: liability.loanAmount,
              loanOutstanding: liability.loanOutstanding,
              loanPurpose: liability.loanPurpose,
              loanRepayment: liability.loanRepayment,
              paymentPeriod: liability.paymentPeriod,
              relation: liability.relation,
              creditorAddress: liability.creditorAddress,
              maturityDate: liability.maturityDate,
              remarks: liability.remarks,
              yearContracted: liability.yearContracted,
            })),
          },
          movableAssets: {
            create: lastDeclaration.movableAssets.map((movableAsset) => ({
              assetType: movableAsset.assetType,
              currency: movableAsset.currency,
              estimatedValue: movableAsset.estimatedValue,
              financeSource: movableAsset.financeSource,
              ownerName: movableAsset.ownerName,
              purpose: movableAsset.purpose,
              registerOwner: movableAsset.registerOwner,
              registrationNo: movableAsset.registrationNo,
              relation: movableAsset.relation,
              description: movableAsset.description,
              location: movableAsset.location,
              acquisitionCost: movableAsset.acquisitionCost,
              acquisitionCurrency: movableAsset.acquisitionCurrency,
              acquisitionMode: movableAsset.acquisitionMode,
              acquisitionYear: movableAsset.acquisitionYear,
            })),
          },
          otherAssets: {
            create: lastDeclaration.otherAssets.map((otherAsset) => ({
              ownerName: otherAsset.ownerName,
              assetType: otherAsset.assetType,
              currency: otherAsset.currency,
              estimatedValue: otherAsset.estimatedValue,
              financeSource: otherAsset.financeSource,
              relation: otherAsset.relation,
              registerOwner: otherAsset.registerOwner,
              location: otherAsset.location,
              remarks: otherAsset.remarks,
              acquisitionCost: otherAsset.acquisitionCost,
              acquisitionCurrency: otherAsset.acquisitionCurrency,
              acquisitionMode: otherAsset.acquisitionMode,
              acquisitionYear: otherAsset.acquisitionYear,
            })),
          },
          pastEmployments: {
            create: lastDeclaration.pastEmployments.map((pastEmployments) => ({
              annualSalary: pastEmployments.annualSalary,
              contractEndDate: pastEmployments.contractEndDate,
              contractStartDate: pastEmployments.contractStartDate,
              currency: pastEmployments.currency,
              designation: pastEmployments.designation,
              rank: pastEmployments.rank,
              allowances: pastEmployments.allowances,
              allowancesCurrency: pastEmployments.allowancesCurrency,
              allowancesDescription: pastEmployments.allowancesDescription,
              employerName: pastEmployments.employerName,
              sourceOfIncome: pastEmployments.sourceOfIncome,
            })),
          },
          securities: {
            create: lastDeclaration.securities.map((security) => ({
              acquisitionCost: security.acquisitionCost,
              acquisitionCurrency: security.acquisitionCurrency,
              acquisitionMode: security.acquisitionMode,
              acquisitionYear: security.acquisitionYear,
              certificateNo: security.certificateNo,
              company: security.company,
              currency: security.currency,
              currentMarketValue: security.currentMarketValue,
              financeSource: security.financeSource,
              ownerName: security.ownerName,
              registerOwner: security.registerOwner,
              relation: security.relation,
              type: security.type,
              name: security.name,
              natureOfShares: security.natureOfShares,
              numberOfShares: security.numberOfShares,
              yearlyInterest: security.yearlyInterest,
            })),
          },
          personal: lastDeclaration.personal
            ? {
                create: {
                  country: lastDeclaration.personal.country,
                  acquireBy: lastDeclaration.personal.acquireBy,
                  dateOfBirth: lastDeclaration.personal.dateOfBirth,
                  firstName: lastDeclaration.personal.firstName,
                  gender: lastDeclaration.personal.gender,
                  idType: lastDeclaration.personal.idType,
                  maritalStatus: lastDeclaration.personal.maritalStatus,
                  pid: lastDeclaration.personal.pid,
                  surname: lastDeclaration.personal.surname,
                  title: lastDeclaration.personal.title,
                  aliases: lastDeclaration.personal.aliases,
                  middleName: lastDeclaration.personal.middleName,
                },
              }
            : undefined,
          contact: lastDeclaration.contact
            ? {
                create: {
                  permanentAddress: lastDeclaration.contact.permanentAddress,
                  permanentDistrict: lastDeclaration.contact.permanentDistrict,
                  mobile: lastDeclaration.contact.mobile,
                  presentAddress: lastDeclaration.contact.presentAddress,
                  presentDistrict: lastDeclaration.contact.presentDistrict,
                  telephone: lastDeclaration.contact.telephone,
                },
              }
            : undefined,
        },
      });
      return createdDeclaration;
    } catch (error) {
      console.error('Error creating declaration:', error);
      throw error;
    }
  }
}

export default DeclarationService;
