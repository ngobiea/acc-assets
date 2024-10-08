import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import type { MovableAssetData } from '@/utils/declaration';
import { useFormState } from 'react-dom';
import { deleteMovableAsset } from '@/actions/declaration/movable';

export default function MovableGridTable({
  movable,
}: {
  movable: MovableAssetData;
}) {
  const [formState, formAction] = useFormState(
    deleteMovableAsset.bind(null, {
      declarationId: movable.declarationId,
      id: movable.id,
    }),
    { errors: {} }
  );
  return (
    <Card id={movable.id} className=''>
      <CardBody className='border-t border-blue-400 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{movable?.ownerName}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{movable?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registered Owner:
            </Typography>
            <Typography>{movable?.registerOwner}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Asset Type:
            </Typography>
            <Typography>{movable?.assetType}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Description:
            </Typography>
            <Typography>{movable?.description || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registration No.:
            </Typography>
            <Typography>{movable?.registrationNo || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Location:
            </Typography>
            <Typography>{movable?.location || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Purpose:
            </Typography>
            <Typography>{movable?.purpose}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Estimated Current Market Value:
            </Typography>
            <Typography>
              {movable?.currency + ' ' + movable?.estimatedValue}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Finance Source:
            </Typography>
            <Typography>{movable?.financeSource}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Mode:
            </Typography>
            <Typography>{movable?.acquisitionMode || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Cost:
            </Typography>
            <Typography>
              {movable?.acquisitionCurrency + movable?.acquisitionCost}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Year:
            </Typography>
            <Typography>{movable?.acquisitionYear || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-3 mb-2'>
          <div></div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Action:
            </Typography>
            <form className='' action={formAction}>
              <Button
                variant='gradient'
                color='red'
                className=''
                size='sm'
                type='submit'
              >
                Remove
              </Button>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
