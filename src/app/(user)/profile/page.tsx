import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import ProfileStepper from '@/components/user/application/profile-step';
const UserProfile = () => {
  return (
    <Card>
      <CardHeader>
        <Typography variant='h1' color='blue-gray'>
          User Profile
              </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant='h2' color='blue-gray'>
          User Profile
        </Typography>
      </CardBody>
      <CardFooter>
        <Typography variant='h3' color='blue-gray'>
          User Profile
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
