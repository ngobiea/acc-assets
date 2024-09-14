import { contact } from '@/lib/db';
import type { Contact } from '@prisma/client';
class ContactService {
  static async createContact(newContact: ContactForm): Promise<Contact> {
    try {
      const {
        userId,
        permanentAddress,
        permanentDistrict,
        presentAddress,
        presentDistrict,
        mobile,
        telephone,
      } = newContact;
      const createdContact = await contact.create({
        data: {
          userId,
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
  static async deleteContact(userId: string): Promise<Contact> {
    try {
      const deletedContact = await contact.delete({
        where: {
          userId,
        },
      });
      return deletedContact;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
  static async getContact(userId: string): Promise<Contact | null> {
    try {
      const foundContact = await contact.findFirst({
        where: {
          userId,
        },
      });
      return foundContact;
    } catch (error) {
      console.error('Error checking contact existence:', error);
      throw new Error('An error occurs');
    }
  }

  static async updateContact(
    {newContact, userId}:
   { userId: string,
    newContact: ContactForm}
  ): Promise<Contact> {
    try {
      const {
        permanentAddress,
        permanentDistrict,
        presentAddress,
        presentDistrict,
        mobile,
        telephone,
      } = newContact;
      const updatedContact = await contact.update({
        where: {
          userId,
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

export default ContactService;
