'use client';
import {
  Typography,
  CardBody,
  Card,
} from '@/components/materialTailwind';
import { MdOutlineContactPhone } from 'react-icons/md';
import ContactForm from './form';
import type { DContact } from '@prisma/client';

export default function ContactAccordion({ contact }: { contact: DContact }) {
  return (
    <Card className='border-blue-400 relative border my-5'>
      <div className='bg-blue-100 px-5 py-5 rounded-t-xl'>
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineContactPhone className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Contact
          </Typography>
        </div>
      </div>
      <CardBody className='border-t border-blue-400'>
        <ContactForm contact={contact} />
      </CardBody>
    </Card>
  );
}
