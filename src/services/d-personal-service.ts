import type { Personal, DPersonal } from '@prisma/client';
import { dPersonal, personal } from '@/lib/db';
class DPersonalService {
  static async createPersonal(newPersonal: DPersonalForm): Promise<DPersonal> {
    try {
      const {
        declarationId,
        firstName,
        middleName,
        surname,
        idType,
        pid,
        title,
        aliases,
        dateOfBirth,
        gender,
        maritalStatus,
        acquireBy,
        country,
      } = newPersonal;
      const createdPersonal = await dPersonal.create({
        data: {
          declarationId,
          firstName,
          middleName,
          surname,
          gender,
          maritalStatus,
          idType,
          pid,
          title,
          aliases,
          dateOfBirth,
          acquireBy,
          country,
        },
      });
      return createdPersonal;
    } catch (error) {
      console.error('Error creating personal:', error);
      throw error;
    }
  }
  static async deletePersonal(declarationId: string): Promise<DPersonal> {
    try {
      const deletedPersonal = await dPersonal.delete({
        where: {
          declarationId,
        },
      });
      return deletedPersonal;
    } catch (error) {
      console.error('Error deleting personal:', error);
      throw error;
    }
  }
  static async getPersonal(declarationId: string): Promise<DPersonal | null> {
    try {
      const foundPersonal = await dPersonal.findFirst({
        where: {
          declarationId,
        },
      });
      return foundPersonal;
    } catch (error) {
      console.error('Error fetching personal:', error);
      throw error;
    }
  }

  static async isPidExist({
    pid,
    idType,
  }: {
    pid: string;
    idType: string;
  }): Promise<{ id: string; pid: string; idType: string } | null> {
    try {
      const foundPersonal = await dPersonal.findFirst({
        where: {
          pid,
          idType,
        },
        select: {
          id: true,
          pid: true,
          idType: true,
        },
      });
      return foundPersonal;
    } catch (error) {
      console.error('Error fetching personal:', error);
      throw error;
    }
  }

  static async updatePersonal({
    currentPersonal,
    declarationId,
  }: {
    declarationId: string;
    currentPersonal: DPersonalForm;
  }): Promise<DPersonal> {
    try {
      const {
        firstName,
        middleName,
        surname,
        idType,
        pid,
        title,
        aliases,
        dateOfBirth,
        gender,
        maritalStatus,
        acquireBy,
        country,
      } = currentPersonal;
      const updatedPersonal = await dPersonal.update({
        where: {
          declarationId,
        },
        data: {
          declarationId,
          firstName,
          middleName,
          surname,
          gender,
          maritalStatus,
          idType,
          pid,
          title,
          aliases,
          dateOfBirth,
          acquireBy,
          country,
        },
      });
      return updatedPersonal;
    } catch (error) {
      console.error('Error updating personal:', error);
      throw error;
    }
  }
}

export default DPersonalService;
