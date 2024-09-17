import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const {
  user,
  citizenship,
  cashAtHand,
  cashDeposit,
  contact,
  declaration,
  employment,
  family,
  immovableAsset,
  liability,
  mDA,
  movableAsset,
  nationalCard,
  otherAsset,
  passport,
  pastEmployment,
  personal,
  security,
  userEmployment,
  session,
  dContact,
  dPersonal,
  
} = db;
