import { employment } from '@/lib/db';
import type { Employment } from '@prisma/client';

class EmploymentService {
  static async createEmployment(
    newEmployment: EmploymentClientForm
  ): Promise<string> {
    try {
      const createdEmployment = await employment.create({
        data: {
          annualSalary: newEmployment.annualSalary,
          contractStartDate: new Date(newEmployment.contractStartDate),
          contractType: newEmployment.contractType,
          currency: newEmployment.currency,
          designation: newEmployment.designation,
          employeeCategory: newEmployment.employeeCategory,
          employeeId: newEmployment.employeeId,
          rank: newEmployment.rank,
          allowances: newEmployment.allowances,
          allowancesCurrency: newEmployment.allowancesCurrency,
          allowancesDescription: newEmployment.allowancesDescription,
          contractEndDate: newEmployment.contractEndDate
            ? new Date(newEmployment.contractEndDate)
            : null,
          declarationId: newEmployment.declarationId,
          mdaId: newEmployment.mdaId,
          SSNo: newEmployment.SSNo,
          posting: newEmployment.posting,
          sourceOfIncome:
            newEmployment.sourceOfIncome === 'Other'
              ? newEmployment.otherSourceOfIncome
              : newEmployment.sourceOfIncome,
          establishmentRegNo: newEmployment.establishmentRegNo,
          employeeNo: newEmployment.employeeNo,
        },
      });
      return createdEmployment.id;
    } catch (error) {
      console.error('Error creating employment:', error);
      throw error;
    }
  }
  static async deleteEmployment(id: string): Promise<Employment> {
    try {
      const deletedEmployment = await employment.delete({
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

export default EmploymentService;
