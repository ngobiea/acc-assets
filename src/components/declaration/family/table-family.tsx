import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { FamilyData } from '@/utils/declaration';

export default function FamilyGridTable({ family }: { family: FamilyData }) {
  return (
    <Card id={family.id} className=''>
      <CardBody className='border border-blue-400 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Surname:
            </Typography>
            <Typography>{family?.surname}</Typography>
          </div>
          <div className='grid grid-cols-2  '>
            <Typography color='gray' className=' font-bold'>
              First Name:
            </Typography>
            <Typography>{family?.firstName}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Middle Name:
            </Typography>
            <Typography>
              {family?.middleName ? family.middleName : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{family?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Address:
            </Typography>
            <Typography>{family?.address}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              DOB <sup>(mm/dd/yyyy)</sup>
            </Typography>
            <Typography>{family?.dateOfBirth.toLocaleDateString()}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Gender:
            </Typography>
            <Typography>{family?.gender || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Nationality:
            </Typography>
            <Typography>
              {family?.nationality ? family.nationality : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employee No:
            </Typography>
            <Typography>
              {family?.employeeNo || 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employment Category:
            </Typography>
            <Typography>
              {family?.category ? family.category : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employment Institution:
            </Typography>
            <Typography>
              {family.institution ? family.institution : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employment SSNo:
            </Typography>
            <Typography>{family?.SSNo ? family.SSNo : 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employment PIN Code:
            </Typography>
            <Typography>{family?.pinCode || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employment Designation:
            </Typography>
            <Typography>{family?.designation || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Business Name:
            </Typography>
            <Typography>{family?.businessName || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Email:
            </Typography>
            <Typography>{family?.email || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Phone:
            </Typography>
            <Typography>{family?.phoneNumber || 'N/A'}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Mobile:
            </Typography>
            <Typography>{family?.mobile || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-3 mb-2'>
          <div></div>
          <div className='grid grid-cols-2'>
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
