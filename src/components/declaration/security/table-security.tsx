import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import { SecurityData } from '@/utils/declaration';

export default function SecurityGridTable({
  security,
}: {
  security: SecurityData;
}) {
  return (
    <Card id={security.id} className=''>
      <CardBody className='border-t border-blue-400'>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{security?.ownerName}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{security?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Registered Owner:
            </Typography>
            <Typography>{security?.registerOwner}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Security Name:
            </Typography>
            <Typography>{security?.name || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Security Type:
            </Typography>
            <Typography>{security?.type}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Certificate No.:
            </Typography>
            <Typography>{security?.certificateNo}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Number of Shares & Stocks:
            </Typography>
            <Typography>{security?.numberOfShares || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Company / Business / Bank Name:
            </Typography>
            <Typography>{security?.company}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Shares Yearly Interest
            </Typography>
            <Typography>{security?.yearlyInterest || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Nature of Shares:
            </Typography>
            <Typography>{security?.natureOfShares || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Current Market Value:
            </Typography>
            <Typography>
              {security?.currency + security.currentMarketValue}
            </Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Cost:
            </Typography>
            <Typography>
              {security.acquisitionCurrency + security.acquisitionCost}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Mode:
            </Typography>
            <Typography>{security?.acquisitionMode}</Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Acquisition Year:
            </Typography>
            <Typography>{security.acquisitionYear}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Finance Source:
            </Typography>
            <Typography>{security?.financeSource}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div></div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Action:
            </Typography>
            <form className='' action={''}>
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
