import {
  Button,
  Card,
  CardBody,
  Typography,
  Chip,
} from '@/components/materialTailwind';
import type { DeclarationData } from '@/utils/declaration';

export default function DeclarationPreviewGridTable({
  declaration,
}: {
  declaration: DeclarationData;
}) {
  return (
    <Card className='bg-blue-50/50 border border-blue-500 my-8'>
      <CardBody className=''>
        <div className='flex w-full justify-between'>
          <Typography variant='h4' className='mb-5'>
            Declaration
          </Typography>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              ID:
            </Typography>
            <Typography>{declaration?.id}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Status:
            </Typography>

            <Typography className=''>{`${declaration.status}`}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Place:
            </Typography>
            <Typography>{declaration?.place || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Reason:
            </Typography>
            <Typography>{`${declaration.reason}`}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
