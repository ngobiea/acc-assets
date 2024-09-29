import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import type { MovableAssetData } from '@/utils/declaration';

export default function MovablePreviewGridTable({
  movable,
}: {
  movable: MovableAssetData;
}) {
  return (
    <Card id={movable.id} className=''>
      <CardBody className='border-t border-blue-400 bg-blue-50/50 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{movable?.ownerName}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{movable?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registered Owner:
            </Typography>
            <Typography>{movable?.registerOwner}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Asset Type:
            </Typography>
            <Typography>{movable?.assetType}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Description:
            </Typography>
            <Typography>{movable?.description || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registration No.:
            </Typography>
            <Typography>{movable?.registrationNo || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Location:
            </Typography>
            <Typography>{movable?.location || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Purpose:
            </Typography>
            <Typography>{movable?.purpose}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Estimated Current Market Value:
            </Typography>
            <Typography>
              {movable?.currency + movable?.estimatedValue}
            </Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Finance Source:
            </Typography>
            <Typography>{movable?.financeSource}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Mode:
            </Typography>
            <Typography>{movable?.acquisitionMode || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Cost:
            </Typography>
            <Typography>
              {movable?.acquisitionCurrency + movable?.acquisitionCost}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Year:
            </Typography>
            <Typography>{movable?.acquisitionYear || 'N/A'}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
