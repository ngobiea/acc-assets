// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// class UserService {
//   static async createUser(user: UserAttributes): Promise<UserAttributes> {
//     try {
//       const newUser = await User.create(user);
//       return newUser.toJSON();
//     } catch (error) {
//       throw error;
//     }
//   }
//   static async isUserExist({
//     email,
//     pid,
//   }: {
//     email: string;
//     pid: string;
//   }): Promise<UserAttributes | null> {
//     try {
//       const user = await User.findOne({
//         where: {
//           email,
//           pid,
//         },
//       });
//       return user ? user.toJSON() : null;
//     } catch (error) {
//       throw error;
//     }
//   }
//   static async encryptUserPassword(password: string): Promise<string> {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       return await bcrypt.hash(password, salt);
//     } catch (error) {
//       throw error;
//     }
//   }
//   static async isValidUserPassword(
//     password: string,
//     hash: string
//   ): Promise<boolean> {
//     try {
//       return await bcrypt.compare(password, hash);
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default UserService;

// services/UserService.ts
// import { initDB } from '@/models';
import { initDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { Op } from 'sequelize';

class UserService {
  static async createUser({
    idType,
    pid,
    title,
    surname,
    firstName,
    middleName,
    email,
    password,
    passwordRepeat,
  }: {
    idType: string;
    pid: string;
    title: string;
    surname: string;
    firstName: string;
    middleName: string;
    email: string;
    password: string;
    passwordRepeat: string;
  }): Promise<UserAttributes> {
    try {
      await initDatabase(); // Ensure the database connection is established
      // const newUser = await User.create(user);

      const newUser = await User.create({
        idType,
        pid,
        title,
        surname,
        firstName,
        middleName,
        email,
        password,
        passwordRepeat,
      });
      return newUser.toJSON();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async isUserExist({
    email,
    pid,
  }: {
    email?: string;
    pid?: string;
  }): Promise<UserAttributes | null> {
    try {
      await initDatabase(); // Ensure the database connection is established

      const whereClause: any = {};

      if (email) {
        whereClause.email = email;
      }

      if (pid) {
        whereClause.pid = pid;
      }

      // If neither email nor pid is provided, return null
      if (Object.keys(whereClause).length === 0) {
        return null;
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [whereClause],
        },
      });

      return user ? user.toJSON() : null;
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

  static async crateUserSession(userId: string) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
}

export default UserService;
