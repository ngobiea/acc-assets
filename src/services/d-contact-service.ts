import { dContact } from '@/lib/db';
import type { DContact } from '@prisma/client';
class DContactService {
  static async createContact(newContact: DContactForm): Promise<DContact> {
    try {
      const {
        declarationId,
        permanentAddress,
        permanentDistrict,
        presentAddress,
        presentDistrict,
        mobile,
        telephone,
      } = newContact;
      const createdContact = await dContact.create({
        data: {
          declarationId,
          permanentAddress,
          permanentDistrict,
          presentAddress,
          presentDistrict,
          mobile,
          telephone,
        },
      });
      return createdContact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
  static async deleteContact(declarationId: string): Promise<DContact> {
    try {
      const deletedContact = await dContact.delete({
        where: {
          declarationId,
        },
      });
      return deletedContact;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
  static async getContact(declarationId: string): Promise<DContact | null> {
    try {
      const foundContact = await dContact.findFirst({
        where: {
          declarationId,
        },
      });
      return foundContact;
    } catch (error) {
      console.error('Error checking contact existence:', error);
      throw new Error('An error occurs');
    }
  }

  static async updateContact({
    newContact,
    declarationId,
  }: {
    declarationId: string;
    newContact: ContactForm;
  }): Promise<DContact> {
    try {
      const {
        permanentAddress,
        permanentDistrict,
        presentAddress,
        presentDistrict,
        mobile,
        telephone,
      } = newContact;
      const updatedContact = await dContact.update({
        where: {
          declarationId,
        },
        data: {
          permanentAddress,
          permanentDistrict,
          presentAddress,
          presentDistrict,
          mobile,
          telephone,
        },
      });
      return updatedContact;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }
}

export default DContactService;
