import { validateRequest } from '@/lib/verify-auth';
import UserService from '@/services/user-service';
import MDAService from '@/services/mda-service';
import routes from '@/utils/routes';
import { notFound, redirect } from 'next/navigation';
import ProfilePersonalPage from '@/components/profile/personal/personal-card';
import ProfileEmploymentPage from '@/components/profile/user-employment/user-employment-card';
import ProfileContactPage from '@/components/profile/contact/contact-card';
import PersonalUpdateForm from '@/components/profile/personal/update-personal';
import UserEmploymentUpdateForm from '@/components/profile/user-employment/update-user-employment';
import ProfileNationalTable from '@/components/profile/nationalId/nationalCardTable';
import ProfilePassportTable from '@/components/profile/passport/passportTable';
import ProfileCitizenshipTable from '@/components/profile/nationality/citizenshipTable';
import ContactUpdateForm from '@/components/profile/contact/update-contact';
import NationalCardUpdateForm from '@/components/profile/nationalId/add-nationalCard';
import CitizenUpdateForm from '@/components/profile/nationality/add-citizen-form';
import PassportUpdateForm from '@/components/profile/passport/add-passport-button';
export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }

  const profile = await UserService.getUserSetup(user.id);
  const mdas = await MDAService.getMDAs();
  if (
    !profile ||
    !profile.personal ||
    !profile.userEmployment ||
    !profile.contact
  ) {
    redirect(routes.setup);
  }


  return (
    <>
      <PersonalUpdateForm personal={profile.personal} />
      <UserEmploymentUpdateForm employment={profile.userEmployment} mdas={mdas} />
      <ContactUpdateForm contact={profile.contact} />
      <NationalCardUpdateForm />
      <CitizenUpdateForm />
      <PassportUpdateForm />
      <section>
        <ProfilePersonalPage personal={profile.personal} />
        <ProfileEmploymentPage employment={profile.userEmployment} />
        <ProfileContactPage contact={profile.contact} email={profile.email} />
        <ProfileCitizenshipTable citizenships={profile.citizenships} />
        <ProfilePassportTable passports={profile.passports} />
        <ProfileNationalTable nationalCards={profile.nationalCards} />
      </section>
    </>
  );
}
