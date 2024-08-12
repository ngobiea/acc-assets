import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';

const Declaration = () => {
  return (
    <Card>
      <CardHeader>
        <Typography variant='h1' color='blue-gray'>
          Declarations
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant='h2' color='blue-gray'>
          Declarations
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

export default Declaration;
