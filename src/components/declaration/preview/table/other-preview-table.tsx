import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import { type OtherAssetData } from '@/utils/declaration';

export default function OtherPreviewGridTable({ other }: { other: OtherAssetData }) {
  return (
    <Card id={other.id} className=''>
      <CardBody className='border-t border-blue-400 bg-blue-50/50'>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{other?.ownerName}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{other?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registered Owner:
            </Typography>
            <Typography>{other?.registerOwner}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Asset Type:
            </Typography>
            <Typography>{other?.assetType}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Location:
            </Typography>
            <Typography>{other?.location || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Estimated Current Market Value:
            </Typography>
            <Typography>{other?.currency + other?.estimatedValue}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Finance Source:
            </Typography>
            <Typography>{other?.financeSource}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Mode:
            </Typography>
            <Typography>{other?.acquisitionMode || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Cost:
            </Typography>
            <Typography>
              {other?.acquisitionCurrency + other?.acquisitionCost}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Year:
            </Typography>
            <Typography>{other?.acquisitionYear || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Remarks:
            </Typography>
            <Typography>{other?.remarks || 'N/A'}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
