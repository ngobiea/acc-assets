import bcrypt from 'bcryptjs';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { user } from '@/lib/db';
import { type User } from '@prisma/client';

class UserService {
  static async createUser(newUser: UserForm): Promise<User> {
    try {
      const { email, password, code } = newUser;
      const createdUser = await user.create({
        data: {
          email,
          password,
          code,
        },
      });
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async isUserExist({ email }: { email: string }): Promise<User | null> {
    try {
      const isExist = await user.findFirst({
        where: {
          email,
        },
      });

      return isExist;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  }

  static async encryptUserPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error('Error encrypting password:', error);
      throw error;
    }
  }

  static async isValidUserPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Error validating password:', error);
      throw error;
    }
  }
  // static async getUserEmail()

  static async crateUserSession(userId: string) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  static async getUserSetup(
    userId: string
  ): Promise<UserSetupAttributes | null> {
    try {
      const foundUser = await user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          id: true,
          personal: true,
          userEmployment: {
            include: {
              mda: true,
            },
          },
          contact: true,
          citizenships: true,
          passports: true,
          nationalCards: true,
        },
      });
      return foundUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async getUserPersonalCitizenship(
    userId: string
  ): Promise<UserPersonalCitizenship | null> {
    try {
      const foundUser = await user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          personal: true,
          citizenships: true,
        },
      });
      return foundUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async getUserContactPassportNationalCard(
    userId: string
  ): Promise<UserContactPassportNationalCard | null> {
    try {
      const foundUser = await user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          contact: true,
          passports: true,
          nationalCards: true,
        },
      });
      return foundUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async verifyEmail({ email }: { email: string }): Promise<User | null> {
    try {
      const foundUser = await user.update({
        where: {
          email,
        },
        data: {
          isVerified: true,
        },
      });
      return foundUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async updateCode({
    email,
    code,
  }: {
    email: string;
    code: string | null;
  }) {
    try {
      const updatedUser = await user.update({
        where: {
          email,
        },
        data: {
          code,
        },
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating code:', error);
      throw error;
    }
  }
}

export default UserService;
