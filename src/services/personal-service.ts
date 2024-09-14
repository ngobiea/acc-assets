import type { Personal } from '@prisma/client';
import { personal } from '@/lib/db';
class PersonalService {
  static async createPersonal(newPersonal: PersonalForm): Promise<Personal> {
    try {
      const {
        userId,
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
      const createdPersonal = await personal.create({
        data: {
          userId,
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
  static async deletePersonal(userId: string): Promise<Personal> {
    try {
      const deletedPersonal = await personal.delete({
        where: {
          userId,
        },
      });
      return deletedPersonal;
    } catch (error) {
      console.error('Error deleting personal:', error);
      throw error;
    }
  }
  static async getPersonal(userId: string): Promise<Personal | null> {
    try {
      const foundPersonal = await personal.findFirst({
        where: {
          userId,
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
      const foundPersonal = await personal.findFirst({
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
    userId,
  }: {
    userId: string;
    currentPersonal: PersonalForm;
  }): Promise<Personal> {
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
      const updatedPersonal = await personal.update({
        where: {
          userId,
        },
        data: {
          userId,
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

export default PersonalService;
