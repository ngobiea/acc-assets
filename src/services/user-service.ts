import bcrypt from 'bcryptjs';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { user } from '@/lib/db';
import { type User } from '@prisma/client';

class UserService {
  static async createUser(newUser: UserForm): Promise<AppResponse<User>> {
    try {
      const { email, password, code } = newUser;
      const createdUser = await user.create({
        data: {
          email,
          password,
          code,
        },
      });
      return {
        data: createdUser,
        message: 'User created successfully',
        status: 'success',
      };
    } catch (error) {
      return {
        message: 'Error creating user',
        status: 'error',
        data: null,
      };
    }
  }

  static async isUserExist({
    email,
  }: {
    email: string;
  }): Promise<AppResponse<User>> {
    try {
      const isExist = await user.findFirst({
        where: {
          email,
        },
      });

      return {
        data: isExist,
        message: 'A user with this email already exists, please login',
        status: 'success',
      };
    } catch (error) {
      return {
        message: 'Error checking user',
        status: 'error',
        data: null,
      };
    }
  }

  static async encryptUserPassword(password: string): Promise<string | null> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      return null;
    }
  }

  static async isValidUserPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      return false;
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
  ): Promise<AppResponse<UserSetupAttributes>> {
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
      return {
        data: foundUser,
        message: 'User found',
        status: 'success',
      };
    } catch (error) {
      return {
        message: 'Error fetching user',
        status: 'error',
        data: null,
      };
    }
  }

  static async verifyEmail({
    email,
  }: {
    email: string;
  }): Promise<AppResponse<User>> {
    try {
      const foundUser = await user.update({
        where: {
          email,
        },
        data: {
          isVerified: true,
        },
      });
      return {
        data: foundUser,
        message: 'Email verified',
        status: 'success',
      };
    } catch (error) {
      return {
        message: 'Error verifying email',
        status: 'error',
        data: null,
      };
    }
  }

  static async updateCode({
    email,
    code,
  }: {
    email: string;
    code: string | null;
  }): Promise<AppResponse<User>> {
    try {
      const updatedUser = await user.update({
        where: {
          email,
        },
        data: {
          code,
        },
      });
      return {
        data: updatedUser,
        message: 'Code updated',
        status: 'success',
      };
    } catch (error) {
      return {
        message: 'Error updating code',
        status: 'error',
        data: null,
      };
    }
  }
}

export default UserService;
