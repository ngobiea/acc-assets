import User from './User';
import Session from './Session';
import Personal from './Personal';
import Citizenship from './Citizenship';
import Passport from './Passport';
import UserEmployment from './UserEmployment';
import Contact from './Contact';
import Declaration from './Declaration';
import Employment from './Employment';
import PastEmployment from './PastEmployment';
import Family from './Family';
import FamilyEmployment from './FamilyEmployment';
import CashAtHand from './CashAtHand';
import CashDeposit from './CashDeposit';
import Acquisition from './Acquisition';
import ImmovableAsset from './ImmovableAsset';
import MovableAsset from './MovableAsset';
import Security from './Security';
import OtherAsset from './OtherAsset';
import Liabilities from './Liabilities';

// User Personal Association
User.hasOne(Personal, {
  foreignKey: 'userId',
});
Personal.belongsTo(User, {
  foreignKey: 'userId',
});

// User Session Association
User.hasMany(Session, {
  foreignKey: 'user_id',
});

Session.belongsTo(User, {
  foreignKey: 'user_id',
});

// User Citizenship Association
User.hasMany(Citizenship, {
  foreignKey: 'userId',
});
Citizenship.belongsTo(User, {
  foreignKey: 'userId',
});

// User Passport Association
User.hasMany(Passport, {
  foreignKey: 'userId',
});
Passport.belongsTo(User, {
  foreignKey: 'userId',
});

// User Employment Association
User.hasOne(UserEmployment, {
  foreignKey: 'userId',
});
UserEmployment.belongsTo(User, {
  foreignKey: 'userId',
});

// User Past Employment Association
User.hasMany(PastEmployment, {
  foreignKey: 'userId',
});
PastEmployment.belongsTo(User, {
  foreignKey: 'userId',
});

// User Contact Association
User.hasOne(Contact, {
  foreignKey: 'userId',
});
Contact.belongsTo(User, {
  foreignKey: 'userId',
});

// User Declaration Association
User.hasMany(Declaration, {
  foreignKey: 'userId',
});
Declaration.belongsTo(User, {
  foreignKey: 'userId',
});

// Declaration Employment Association
Declaration.hasMany(Employment, {
  foreignKey: 'declarationId',
});
Employment.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Declaration Family Association
Declaration.hasMany(Family, {
  foreignKey: 'declarationId',
});
Family.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Family Employment Association
Family.hasOne(FamilyEmployment, {
  foreignKey: 'familyId',
});
FamilyEmployment.belongsTo(Family, {
  foreignKey: 'familyId',
});


// Declaration CashAtHand Association
Declaration.hasMany(CashAtHand, {
  foreignKey: 'declarationId',
});
CashAtHand.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Declaration CashDeposit Association
Declaration.hasMany(CashDeposit, {
  foreignKey: 'declarationId',
});
CashDeposit.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Immovable Acquisition Association
Acquisition.hasOne(ImmovableAsset, {
  foreignKey: 'acquisitionId',
});
ImmovableAsset.belongsTo(Acquisition, {
  foreignKey: 'acquisitionId',
});

// Declaration Immovable Association
Declaration.hasMany(ImmovableAsset, {
  foreignKey: 'declarationId',
});
ImmovableAsset.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Movable Acquisition Association
Acquisition.hasOne(MovableAsset, {
  foreignKey: 'acquisitionId',
});
MovableAsset.belongsTo(Acquisition, {
  foreignKey: 'acquisitionId',
});

// Declaration Movable Association
Declaration.hasMany(MovableAsset, {
  foreignKey: 'declarationId',
});
MovableAsset.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Security Acquisition Association
Acquisition.hasOne(Security, {
  foreignKey: 'acquisitionId',
});
Security.belongsTo(Acquisition, {
  foreignKey: 'acquisitionId',
});

// Declaration Security Association
Declaration.hasMany(Security, {
  foreignKey: 'declarationId',
});
Security.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Other Acquisition Association
Acquisition.hasOne(OtherAsset, {
  foreignKey: 'acquisitionId',
});
OtherAsset.belongsTo(Acquisition, {
  foreignKey: 'acquisitionId',
});

// Declaration Other Association
Declaration.hasMany(OtherAsset, {
  foreignKey: 'declarationId',
});

OtherAsset.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});

// Declaration Liabilities Association
Declaration.hasMany(Liabilities, {
  foreignKey: 'declarationId',
});
Liabilities.belongsTo(Declaration, {
  foreignKey: 'declarationId',
});