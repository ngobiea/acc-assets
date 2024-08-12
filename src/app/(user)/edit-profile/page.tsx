import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import ProfileStepper from '@/components/user/application/profile-step';
import ProfileStepButton from '@/components/user/application/profile-step-button';
import PersonalForm from '@/components/user/form/personal';
import EmploymentForm from '@/components/user/form/employment';
import ContactForm from '@/components/user/form/contact';
const ProfileEdit = () => {
  return (
    <div className='mx-auto w-full py-12'>
      <Card className=' w-full'>
        <CardHeader className=' h-20'>
          <ProfileStepper />
        </CardHeader>
        <CardBody>

       <PersonalForm />
        </CardBody>
        <CardFooter>
          <ProfileStepButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileEdit;
