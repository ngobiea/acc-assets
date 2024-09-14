import { userEmployment } from '@/lib/db';
import type { UserEmployment } from '@prisma/client';

class UserEmploymentService {
  static async createUserEmployment(
    newUserEmployment: UserEmploymentForm
  ): Promise<UserEmployment> {
    try {
      const {
        userId,
        designation,
        employeeCategory,
        isAdministrative,
        isFinancial,
        isPolitical,
        isProfessional,
        currentPosting,
        employeePin,
        establishmentRegNo,
        rankOrGrade,
        sourceOfIncome,
        mdaId,
      } = newUserEmployment;

      const createdUserEmployment = await userEmployment.create({
        data: {
          designation,
          employeeCategory,
          isAdministrative,
          isFinancial,
          isPolitical,
          isProfessional,
          mdaId,
          rankOrGrade,
          establishmentRegNo,
          sourceOfIncome,
          currentPosting,
          employeePin,
          userId,
        },
      });
      return createdUserEmployment;
    } catch (error) {
      console.error('Error creating user employment:', error);
      throw error;
    }
  }

  static async deleteUserEmployment(userId: string): Promise<UserEmployment> {
    try {
      const deletedUser = await userEmployment.delete({
        where: {
          userId,
        },
      });
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user employment:', error);
      throw error;
    }
  }

  static async getUserEmployment(
    userId: string
  ): Promise<UserEmploymentWithMDS | null> {
    try {
      const foundUserEmployment = await userEmployment.findFirst({
        where: {
          userId,
        },
        include: {
          mda: true,
        },
      });
      console.log(foundUserEmployment?.mda);
      return foundUserEmployment;
    } catch (error) {
      console.error('Error fetching user employment:', error);
      throw error;
    }
  }

  static async updateUserEmployment({
    currentUserEmployment,
    userId,
  }: {
    userId: string;
    currentUserEmployment: UserEmploymentForm;
  }): Promise<UserEmployment> {
    try {
      const {
        designation,
        employeeCategory,
        isAdministrative,
        isFinancial,
        isPolitical,
        isProfessional,
        currentPosting,
        employeePin,
        establishmentRegNo,
        rankOrGrade,
        sourceOfIncome,
        mdaId,
      } = currentUserEmployment;

      const updatedUserEmployment = await userEmployment.update({
        where: {
          userId,
        },
        data: {
          currentPosting,
          designation,
          employeeCategory,
          employeePin,
          establishmentRegNo,
          isAdministrative,
          isFinancial,
          isPolitical,
          isProfessional,
          mdaId,
          rankOrGrade,
          sourceOfIncome,
          userId,
        },
      });
      return updatedUserEmployment;
    } catch (error) {
      console.error('Error updating user employment:', error);
      throw error;
    }
  }
}

export default UserEmploymentService;
