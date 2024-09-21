import { PastEmployment } from '@prisma/client';
import { pastEmployment } from '@/lib/db';

class PastEmploymentService {
  static async createEmployment(
    newEmployment: PastEmploymentClientForm
  ): Promise<string> {
    const createdEmployment = await pastEmployment.create({
      data: {
        annualSalary: newEmployment.annualSalary,
        contractEndDate: newEmployment.contractEndDate,
        contractStartDate: new Date(newEmployment.contractStartDate),
        currency: newEmployment.currency,
        designation: newEmployment.designation,
        rank: newEmployment.rank,
        allowances: newEmployment.allowances,
        allowancesCurrency: newEmployment.allowancesCurrency,
        allowancesDescription: newEmployment.allowancesDescription,
        employerName: newEmployment.employerName,
        declarationId: newEmployment.declarationId,
        sourceOfIncome:
          newEmployment.sourceOfIncome === 'Other'
            ? newEmployment.otherSourceOfIncome
            : newEmployment.sourceOfIncome,
      },
    });
    return createdEmployment.id;
  }
  static async deleteEmployment(id: string): Promise<PastEmployment> {
    try {
      const deletedEmployment = await pastEmployment.delete({
        where: {
          id,
        },
      });
      return deletedEmployment;
    } catch (error) {
      console.error('Error deleting employment:', error);
      throw error;
    }
  }
}

export default PastEmploymentService;
