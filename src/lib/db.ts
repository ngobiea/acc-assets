import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const {
  user,
  citizenship,
  acquisition,
  cashAtHand,
  cashDeposit,
  contact,
  declaration,
  employment,
  family,
  familyEmployment,
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
} = db;
