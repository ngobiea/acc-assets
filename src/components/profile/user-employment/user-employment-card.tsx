import { Card, CardBody, IconButton, Tooltip, Typography } from '@/components/materialTailwind';
import { FaUserEdit } from 'react-icons/fa';
import UserEmploymentUpdateButton from './button-employment-update';


export default async function ProfileEmploymentPage({employment}: {
  employment: UserEmploymentSetupAttributes;
}) {
  return (
    <section className='mt-8'>
      <Card>
        <CardBody>
          <div className='flex w-full justify-between'>
            <Typography variant='h4' className='mb-5'>
              Employment Info
            </Typography>
            <UserEmploymentUpdateButton />
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                MDA:
              </Typography>
              <Typography>{employment?.mda?.name}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Employee Category:
              </Typography>
              <Typography>{employment?.employeeCategory}</Typography>
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Current Posting:
              </Typography>
              <Typography>{employment?.currentPosting}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Designation:
              </Typography>
              <Typography>{employment?.designation}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Rank/Grade:
              </Typography>
              <Typography>{employment?.rankOrGrade}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Employee Pin No:
              </Typography>
              <Typography>{employment?.employeePin}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Establishment Registration No:
              </Typography>
              <Typography>{employment?.establishmentRegNo}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Source of Income:
              </Typography>
              <Typography>{employment?.sourceOfIncome}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Administrative Responsibility:
              </Typography>
              <Typography>
                {employment?.isAdministrative ? 'Yes' : 'No'}
              </Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Financial Responsibility:
              </Typography>
              <Typography>{employment?.isFinancial ? 'Yes' : 'No'}</Typography>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Political Responsibility:
              </Typography>
              <Typography>{employment?.isPolitical ? 'Yes' : 'No'}</Typography>
            </div>
            <div className='grid grid-cols-2'>
              <Typography color='gray' className=' font-bold'>
                Professional Responsibility:
              </Typography>
              <Typography>
                {employment?.isProfessional ? 'Yes' : 'No'}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
