import {
  Avatar,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import PersonalUpdateButton from './button-update';

export default async function ProfilePersonalPage({
  personal,
}: {
  personal: PersonalSetupAttributes;
}) {
  return (
    <section className='mt-8'>
      <Card>
        <CardBody>
          <div className='flex w-full justify-between'>
            <Typography variant='h4' className='mb-5'>
              Personal Info
            </Typography>

            <PersonalUpdateButton />
          </div>
          <div className=' pb-5'>
            <Avatar
              src='https://accsl-declaration.s3.eu-north-1.amazonaws.com/PROFILE.jpeg'
              alt='avatar'
              size='xxl'
              variant='rounded'
              className='object-fill'
            />
          </div>

          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Title:
              </Typography>
              <Typography>{personal?.title}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                {personal?.idType === 'NIN' ? 'NIN:' : 'Passport:'}
              </Typography>
              <Typography>{personal?.pid}</Typography>
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Surname Name:
              </Typography>
              <Typography>{personal?.surname}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                First Name:
              </Typography>
              <Typography>{personal?.firstName}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Middle Name:
              </Typography>
              <Typography>{personal?.middleName}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Previous Name/Aliases:
              </Typography>
              <Typography>{personal?.aliases}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Date of Birth:
              </Typography>
              <Typography>
                {personal?.dateOfBirth.toLocaleDateString()}
              </Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Marital Status:
              </Typography>
              <Typography>{personal?.maritalStatus}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Gender:
              </Typography>
              <Typography>{personal?.gender}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Present Citizenship:
              </Typography>
              <Typography>{personal?.country}</Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
