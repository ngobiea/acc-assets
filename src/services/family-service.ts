import { family } from '@/lib/db';
import type { Family } from '@prisma/client';

export default class FamilyService {
  static async crateFamily(newFamily: Family): Promise<string> {
    try {
      const createdFamily = await family.create({
        data: {
          surname: newFamily.surname,
          firstName: newFamily.firstName,
          middleName: newFamily.middleName,
          relation: newFamily.relation,
          address: newFamily.address,
          dateOfBirth: new Date(newFamily.dateOfBirth),
          gender: newFamily.gender,
          nationality: newFamily.nationality,
          employeeNo: newFamily.employeeNo,
          category: newFamily.category,
          institution: newFamily.institution,
          SSNo: newFamily.SSNo,
          pinCode: newFamily.pinCode,
          designation: newFamily.designation,
          businessName: newFamily.businessName,
          mobile: newFamily.mobile,
          phoneNumber: newFamily.phoneNumber,
          declarationId: newFamily.declarationId,
          email: newFamily.email,
        },
      });
      return createdFamily.id;
    } catch (error) {
      console.error('Error creating family:', error);
      throw error;
    }
  }
  static async deleteFamily(id: string): Promise<Family> {
    try {
      const deletedFamily = await family.delete({
        where: {
          id,
        },
      });
      return deletedFamily;
    } catch (error) {
      console.error('Error deleting family:', error);
      throw error;
    }
  }
}
