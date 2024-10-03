
import {
  Avatar,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { DPersonal } from '@prisma/client';

export default  function PersonalPreview({
  personal,
}: {
  personal: DPersonal | null;
}) {
  return (
    <Card className='bg-blue-50/50 border border-blue-500 my-8'>
      <CardBody>
        <div className='flex w-full justify-between'>
          <Typography variant='h4' className='mb-5'>
            Personal Info
          </Typography>
        </div>
        <div className='pb-5'>
          <Avatar
            src='https://accsl-declaration.s3.eu-north-1.amazonaws.com/PROFILE.jpeg'
            alt='avatar'
            size='xxl'
            variant='rounded'
            className='object-fill'
          />
        </div>

        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Title:
            </Typography>
            <Typography>{personal?.title || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              {personal?.idType === 'NIN' ? 'NIN:' : 'Passport:'}
            </Typography>
            <Typography>{personal?.pid || 'N/A'}</Typography>
          </div>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Surname Name:
            </Typography>
            <Typography>{personal?.surname || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              First Name:
            </Typography>
            <Typography>{personal?.firstName || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Middle Name:
            </Typography>
            <Typography>{personal?.middleName || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Previous Name/Aliases:
            </Typography>
            <Typography>{personal?.aliases || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Date of Birth:
            </Typography>
            <Typography>
              {personal?.dateOfBirth.toLocaleDateString() || 'N/A'}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Marital Status:
            </Typography>
            <Typography>{personal?.maritalStatus || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Gender:
            </Typography>
            <Typography>{personal?.gender || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Present Citizenship:
            </Typography>
            <Typography>{personal?.country || 'N/A'}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
