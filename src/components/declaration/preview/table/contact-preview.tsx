import { Card, CardBody, Typography } from '@/components/materialTailwind';
import type { DContact } from '@prisma/client';


export default function ContactPreview({
  contact,
  email,
}: {
  email: string;
  contact: DContact | null;
}) {
  return (
    <Card className='bg-blue-50/50 border border-blue-500 mb-8'>
      <CardBody>
        <div className='flex w-full justify-between'>
          <Typography variant='h4' className='mb-5'>
            Contact
          </Typography>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Mobile:
            </Typography>
            <Typography>{contact?.mobile}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Telephone
            </Typography>
            <Typography>{contact?.telephone}</Typography>
          </div>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Permanent Address:
            </Typography>
            <Typography>{contact?.permanentAddress}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Permanent District:
            </Typography>
            <Typography>{contact?.permanentDistrict}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Present Address:
            </Typography>
            <Typography>{contact?.presentAddress}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Present District:
            </Typography>
            <Typography>{contact?.presentDistrict}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Email
            </Typography>
            <Typography>{email}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
