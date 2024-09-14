'use server';
import { validateRequest } from '@/lib/verify-auth';
import MDAService from '@/services/mda-service';
import routes from '@/utils/routes';
import type { MDA } from '@prisma/client';
import { redirect } from 'next/navigation';

export const getMDAs = async (): Promise<MDA[]> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
      return [];
    }
    return await MDAService.getMDAs();
  } catch (error) {
    console.log('Error fetching MDAs:', error);
    return [];
  }
};
