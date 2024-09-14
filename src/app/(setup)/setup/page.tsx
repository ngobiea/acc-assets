import { Card } from '@/components/materialTailwind';
import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import {  redirect } from 'next/navigation';

import Setup from '@/components/setup/stepper/setup';
import UserService from '@/services/user-service';
import MDAService from '@/services/mda-service';


export default async function ProfileSetup() {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }
  const profile = await UserService.getUserSetup(user.id);
  if (
    profile &&
    profile.personal &&
    profile.userEmployment &&
    profile.contact
  ) {
    redirect(routes.profile);
  }
  const mdas = await MDAService.getMDAs();
  

  return (
    <main className='mx-auto w-10/12 py-12'>
      <Card className=''>
        <Setup user={profile as UserSetupAttributes} mdas={mdas} />
        {/* <div>Setup Page</div> */}
      </Card>
    </main>
  );
}
