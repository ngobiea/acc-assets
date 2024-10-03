import {
  Button,
  Card,
  CardBody,
  Typography,
  Chip,
  Tooltip,
} from '@/components/materialTailwind';
import type { Declaration } from '@prisma/client';
import { MdDeleteForever, MdOutlinePreview } from 'react-icons/md';
import { GrCopy } from 'react-icons/gr';
import routes from '@/utils/routes';
import ActionForm from './buttons/action-form';

export default function DeclarationGridTable({
  declaration,
}: {
  declaration: Declaration;
}) {
  return (
    <Card className='bg-blue-50/50 border-t border-blue-500 rounded-none'>
      <CardBody className=''>
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

            <Chip
              color={declaration.status === 'PENDING' ? 'orange' : 'green'}
              className={`text-white text-center w-1/2`}
              size='sm'
              variant='gradient'
              value={`${declaration.status}`}
            />
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
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Date:
            </Typography>
            <Typography>
              {declaration?.createdAt.toLocaleDateString() || 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid sm:grid-cols-3 md:gap-3 mb-2 space-y-1 sm:space-y-0'>
          <Typography color='gray' className=' font-bold py-2'>
            Actions:
          </Typography>
          <a
            href={
              declaration.status === 'DECLARED'
                ? routes.previewDeclaration(declaration.id)
                : routes.declarationId(declaration.id)
            }
            className='justify-self-start'
          >
            <Tooltip
              content={
                declaration.status === 'DECLARED'
                  ? 'View Declaration'
                  : 'Continue Declaration'
              }
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              className='bg-blue-500'
            >
              <Button
                variant='text'
                color='blue'
                className='flex items-center gap-1 px-1 hover:animate-bounce'
              >
                <MdOutlinePreview className='h-4 w-4' />
                {declaration.status === 'DECLARED' ? 'View' : 'Continue'}
              </Button>
            </Tooltip>
          </a>
          <ActionForm status={declaration.status} id={declaration.id} />
        </div>
      </CardBody>
    </Card>
  );
}
