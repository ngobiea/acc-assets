'use server';

import { redirect } from 'next/navigation';
import UserService from '@/services/user-service';
import routes from '@/utils/routes';
import { validateRequest } from '@/lib/verify-auth';

export const getUser = async (): Promise<UserSetupAttributes | null> => {
  try {
    
  // await new Promise((resolve) => setTimeout(resolve, 5000));

    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const validUSer = await UserService.getUserSetup(user.id);
    return validUSer;
  } catch (error) {
    console.log('Error getting user:', error);
    throw error;
  }
};
