const organizationData = {
  ABC: 'Attitudinal & Behavorial Change',
  ACC: 'Anti-Corruption Commission',
  ADG: 'Administrator & Registrar General',
  AGD: "Accountant General's Department",
  APRM: 'African Peer Review Mechanism',
  ASL: 'Audit Sierra Leone',
  AWC: 'Aberdeen Women Centre',
  BCC: 'Bo City Council',
  BDC: 'Bo District Council',
  BDC1: 'Bonthe District Council',
  BDC2: 'Bombali District Council',
  BDS: 'Births And Deaths Department',
  BMC: 'Bonthe Municipal Council',
  BSL: 'Bank of Sierra Leone',
  CAA: 'Civil Aviation Authority',
  CAC: 'Corporate Affairs Commission',
  CH: 'Connaught Hospital',
  CISU: 'Central Intelligence and Security Agency',
  CM: 'Cabinet Ministers',
  COLE: 'Council of Legal Education',
  COMAHS: 'College of Medicine & Allied Health Sciences',
  CS: 'Cabinet Secretariat',
  CSTC: 'Civil Service Training College',
  CTF: 'Conservation Trust Fund',
  DoC: 'Department of Cooperative',
  DS: 'Decentralization Secretariat',
  EBKU: 'Ernest Bai Koroma University',
  ECSL: 'Electoral Commission Sierra Leone',
  EDSA: 'Electricity Distribution and Supply Authority',
  EGTC: 'Electricity Generating Transmission Company',
  EP: 'Eastern Polytechnic',
  EPA: 'Environmental Protection Agency',
  ETU: 'Eastern Technical University',
  FBC: 'Fourah Bay College',
  FCC: 'Freetown City Council',
  FDC: 'Falaba District Council',
  FIS: 'Faris International Services',
  FIU: 'Financial Intelligence Unit',
  FTP: 'Freetown Polytechnic',
  GPD: 'Government Printing Department',
  GS: 'Geological Surveys',
  GTI: 'Government Technical Institute',
  GVWC: 'Guma Valley Water Company Ltd.',
  'HIV/AIDS': 'HIV/AIDS Secretariat',
  HOP: 'House of Parliament (MP)',
  HRCSL: 'Human Right Commission of Sierra Leone',
  HRMO: 'Human Resource Management Office',
  ICPNC: 'Independent Commission For Peace & National Cohesion',
  ID: 'Immigration Department',
  IMC: 'Independent Media Commission',
  IPAM: 'Institute of Public Administration & Management',
  IPCB: 'Independent Police Complaint Board',
  IPRP: 'Independent Procurement Review Panel',
  ITBOACS: 'Income Tax Board of Appellate Board',
  JLSC: 'Judicial & Legal Service Commission',
  JSCO: 'Justice Sector Coordination Office',
  KCC: 'Kenema City Council',
  KDC: 'Koinadugu District Council',
  KDC1: 'Kenema District Council',
  KDC2: 'Karene District Council',
  KDC3: 'Kambia District Council',
  KDC4: 'Kono District Council',
  KDC5: 'Kailahun District Council',
  KNSCC: 'Koidu New Sembehun City Council',
  LGC: 'Local Government Commission',
  LRC: 'The Law Reform Commission',
  M004: 'Ministry of Agriculture Food Security & Forestry',
  M011: 'Ministy of Health and Sanitation',
  M014: 'Ministry of Justice and Attorney - General',
  M019: 'Ministry of Political and Public Affairs',
  M020: 'Ministry of Social Welfare',
  M021: 'Ministy of  Sports',
  M026: 'Minitry of Youth Affairs',
  MAFFS: 'Ministry of Agriculture Forestry and Food Security',
  MBSSE: 'MINISTRY OF BASIC AND SENIOR SECONDARY EDUCATION',
  MCC: 'Makeni City Council',
  MDC: 'Moyamba District Council',
  ME: 'Min. Of Environment',
  MEP: 'Ministry of Energy & Power',
  MEST: 'Ministry of Education Science and Technology',
  MGSCo: 'Mining and General Service CO (SL) Ltd.',
  MMTU: 'Milton Margai Technical University',
  MoD: 'Ministry of Defence',
  MoE: 'Ministry of Energy',
  MOF: 'Ministry of Finance',
  MoFAIC: 'Ministry of Foreign Affairs and International Co-operation',
  MoFMR: 'Ministry of Fisheries and Marine Resources',
  MOGCA: "Ministry Of Gender & Children's Affairs",
  MoHS: 'Ministry of Health and Sanitation',
  MoIA: 'Ministry of Internal Affairs',
  MOIC: 'Ministry of Information & Civic Education',
  MoII: 'Min. of Communication & Technology',
  MOLG: 'Ministry of Local Government',
  MoLHCP: 'Ministry of Lands Housing & Country Planning ',
  MoLSS: 'Ministry of Labour and Social Security',
  MoMMR: 'Ministry of Mines and Mineral Resources',
  MOPED: 'Ministry Of Planning & Economic Development',
  MoPPA: 'Ministry of Political and Public Affairs',
  MoS: 'Ministry of Sport',
  MoTA: 'Ministry of Transport and Aviation',
  MoTCA: 'Ministry of Tourism and Cultural Affairs',
  MoTI: 'Ministry of Trade and Industry',
  MoWHID: 'Ministry of Works Housing and Infrastructural Development',
  MoWR: 'Ministry of Water Resources',
  MoYA: 'Ministry of Youth Affairs',
  MRC: 'Monuments and Relics Commission',
  MS: 'Medical Stores',
  MSU: 'Mechanical Service Unit',
  MT: 'Meteorological Department',
  MTHE: 'MINISTRY OF TERTIARY AND HIGHER EDUCATION',
  MWR: 'Ministry Of Western Region',
  NACOVERC: 'National COVID Emergency Response Centre',
  NaCSA: 'National Commission for Social Action',
  NAGPC: 'National Asset and Government Property Commission',
  NaMED: 'National Monitoring and Evaluation Directorate',
  NAO: 'National Authorizing Office',
  NaSSIT: 'National Social Security and Insurance Trust',
  NATCOM: 'National Telecommunications Authority',
  NC3: 'National Cybersecurity Coordination Centre',
  NCB: 'National Development Bank Limited Company',
  NCC: 'National Commission for Children',
  NCCED: 'National Council For Civic Education & Development',
  NCD: 'National Commission for Democracy',
  NCDB: 'National Co-operative Development Bank',
  NCFPD: 'National Commission For People With Disability',
  NCP: 'National Commission for Privatization',
  NCRA: 'National Civil Registration Authority',
  NCT: 'NCTVA',
  NDLEA: 'National Drug Law Enforcement Agency',
  NDMA: 'National Disaster Management Agency',
  NEWRMC: 'National Early Warning & Response Mechanism Coordinating Centre',
  NFF: 'National Fire Force',
  NFRA: 'National Fertilizer Regulatory Agency',
  NHAS: 'National HIV/AIDS Secretariat',
  NIB: 'National Investment Board',
  NIC: 'National Insurance Company Limited',
  NMA: 'NATIONAL MINERAL AGENCY',
  NMSA: 'National Medical Supplies Agency',
  NPAA: 'National Protected Area Authority',
  NPPA: 'National Public Procurement Authority',
  NRA: 'National Revenue Authority',
  NSA: 'National Sports Authority',
  NSC: 'National Sport Council',
  NSRPA: 'Nuclear Safety & Radiation Protection Authority',
  NTB: 'National Tourism Board',
  NU: 'Njala University - Njala Campus',
  NWRMA: 'National Water Resources Management Agency',
  NYC: 'National Youth Commission',
  NYS: 'National Youth Service',
  O006: 'Open Government Initiative (OGI) Waterloo',
  OAGMJ: 'Office of the Attorney General and Minister of Justice',
  OARG: 'Office of Administrator and Registrar General',
  OCCHO: 'Office of Chief CHO',
  OCM: 'Office Of The Chief Minister',
  OCS: 'Office Of Chief Of Staff',
  OD: 'Office of the Diaspora',
  OGI: 'Open Government Initiative',
  OMDS: "Ombudsman's Office",
  ONS: 'Office of National Security',
  OP: 'Office Of The President',
  OVP: 'Office Of The Vice President',
  P002: 'Peace Mission Training Centre',
  P005: 'Public Sector Reform Unit (PRSU)',
  PB: 'Pharmacy Board',
  PCC: 'Port Loko City Council',
  PD: 'Petroleum Directorate',
  PDC: 'Pujehun District Council',
  PHU: 'Primary Health Unit',
  PLDC: 'Port Loko District Council',
  PMB: 'PRODUCE MONITORING BOARD',
  PMTC: 'Peace Mission Training Center',
  PPP: 'Public Private Partnership',
  PPRC: 'Political Parties Registration Commission',
  PRA: 'Petroleum Regulatory Agency',
  PSC: 'Public Service Commission',
  PSCSS: 'Public Sector Commission Sierra Leone',
  PSS: 'Parliament of Sierra Leone',
  RAIC: 'Right to Access Information Commission',
  RCB: 'Rokel Commercial Bank Limited',
  RMF: 'Road Maintenance Fund',
  RSLAF: 'Republic of Sierra Leone Armed Force',
  S003: 'Sierra Leone Extractive Industries Transparency Initiative',
  S004: 'Sierra Leone Housing Corporation',
  SALCAB: 'Sierra Leone Cable Network',
  SALPOST: 'Sierra Leone Postal Services Ltd.',
  SALWACO: 'Sierra Leone Water Company',
  SAM: 'Small Arms Commission',
  SIERRATEL: 'Sierra Leone Telecommunications Company Limited',
  SLAA: 'Sierra Leone Airport Authority',
  SLARI: 'Sierra Leone Agriculture Research Institute',
  SLBC: 'Sierra Leone Broadcasting Corporation',
  SLCAA: 'Sierra Leone Civil Aviation Authority',
  SLCB: 'Sierra Leone Commercial Bank Limited Company',
  SLCS: 'SIERRA LEONE CORRECTIONAL SERVICE',
  SLDMC: 'Sierra Leone Daily Mail Company',
  SLeSCA: 'Sierra Leone Seed Certification Agency',
  SLEWRC: 'S/L Electricity & Water Regulatory Commission',
  SLFA: 'Sierra Leone Football Association',
  SLHSC: 'Sierra Leone Health Service Commission',
  SLICOM: 'SIERRA LEONE INSURANCE COMMISSION',
  SLIEPA: 'Sierra Leone Investment and Export Promotion Agencies',
  SLJ: 'Sierra Leone Judiciary',
  SLLB: 'Sierra Leone Library Board',
  SLLCA: 'Sierra Leone Local Content Agency',
  SLMA: 'Sierra Leone Maritime Administration',
  SLMCCU: 'Sierra Leone Millennium Challenge Coordinating Unit',
  SLNM: 'Sierra Leone National Museum',
  SLNSC: 'Sierra Leone National Shipping Company Co. (SLNSC) Limited',
  SLOAN: 'Sierra Leone Students Loan Scheme',
  SLP: 'The Sierra Leone Police',
  SLPA: 'Sierra Leone Ports Authority',
  SLPMC: 'Sierra Leone Produce Marketing Company',
  SLPOSB: 'Sierra Leone Post Office Savings Bank',
  SLRA: 'SIERRA LEONE ROADS AUTHORITY',
  SLRSA: 'SIERRA LEONE ROAD SAFETY AUTHORITY',
  SLRTC: 'Sierra Leone Road Transport Corporation  ',
  SLSB: 'Sierra Leone Standards Bureau',
  SLSL: 'Sierra Leone State Lottery',
  SM: 'Stadium Management',
  SMEDA: 'Small & Medium Enterprises Development Agency',
  SNA: 'Sierra  National Airlines Limited',
  SOP: 'House of Parliament (Staff)',
  SSL: 'Statistics Sierra Leone',
  T001: 'The Disaster Management Department (DMD)',
  TDC: 'Tonkolili District Council',
  TEC: 'Tertiary Education Commission',
  TRC: 'Truth and Reconciliation Commission',
  TSC: 'Teaching Service Commission',
  UADF: 'UNIVERSAL ACCESS DEVELOPMENT FUND',
  USL: 'University of Sierra Leone',
  USLTH: 'UNIVERSITY OF SIERRA LEONE TEACHING HOSPITAL COMPLEX',
  WARDC: 'Western Area Rural District Council',
};

export const titleData = [
  { id: 'Amb.', value: 'Amb.' },
  { id: 'Adv.', value: 'Adv.' },
  { id: 'CA.', value: 'CA.' },
  { id: 'Capt.', value: 'Capt.' },
  { id: 'Cmdr.', value: 'Cmdr.' },
  { id: 'Dr.', value: 'Dr.' },
  { id: 'Gen.', value: 'Gen.' },
  { id: 'H/Comm.', value: 'Hon.' },
  { id: 'Hon.', value: 'Hon.' },
  { id: 'Lady.', value: 'Lady.' },
  { id: 'Major.', value: 'Major.' },
  { id: 'Minister.', value: 'Minister.' },
  { id: 'Ms.', value: 'Ms.' },
  { id: 'Mr.', value: 'Mr.' },
  { id: 'Mrs.', value: 'Mrs.' },
  { id: 'Miss.', value: 'Miss.' },
  { id: 'Prof.', value: 'Prof.' },
  { id: 'Sqd.Ldr.', value: 'Sqd.Ldr.' },
];
export const SLDistricts = {
  Kailahun: 'Eastern Province',
  Kenema: 'Eastern Province',
  Kono: 'Eastern Province',
  Kambia: 'North-West Region',
  Karene: 'North-West Region',
  PortLoko: 'North-West Region',
  Bombali: 'Northern Region (North-East)',
  Falaba: 'Northern Region (North-East)',
  Koinadugu: 'Northern Region (North-East)',
  Tonkolili: 'Northern Region (North-East)',
  Bo: 'Southern Province',
  Bonthe: 'Southern Province',
  Moyamba: 'Southern Province',
  Pujehun: 'Southern Province',
  'Western Rural': 'Western Area Rural',
  'Western Urban': 'Western Area Urban',
};

export const personalIds = [
  { id: 'NIN', value: 'NIN' },
  { id: 'Passport', value: 'Passport' },
];
