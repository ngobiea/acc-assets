import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import type { ImmovableAssetData } from '@/utils/declaration';

export default function ImmovablePreviewGridTable({
  immovable,
}: {
  immovable: ImmovableAssetData;
}) {
  return (
    <Card id={immovable.id} className=''>
      <CardBody className='border-t border-blue-400 bg-blue-50/50 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{immovable?.ownerName}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{immovable?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registered Owner:
            </Typography>
            <Typography>{immovable?.registerOwner}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Type of Asset:
            </Typography>
            <Typography>{immovable?.assetType}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Location:
            </Typography>
            <Typography>{immovable?.location}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Plot No.:
            </Typography>
            <Typography>{immovable?.plotNo || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Size / Acre:
            </Typography>
            <Typography>{immovable?.size || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Estimated Current Market Value:
            </Typography>
            <Typography>
              {immovable?.currency + immovable?.estimatedValue}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Mode:
            </Typography>
            <Typography>{immovable?.acquisitionMode || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Cost:
            </Typography>
            <Typography>
              {immovable?.acquisitionCurrency +
                ' ' +
                immovable?.acquisitionCost}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Year:
            </Typography>
            <Typography>{immovable?.acquisitionYear || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Finance Source:
            </Typography>
            <Typography>{immovable?.financeSource}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
