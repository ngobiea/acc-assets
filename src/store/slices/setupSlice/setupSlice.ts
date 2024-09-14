import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: SetupState = {
  isLastProfileStep: false,
  isFirstProfileStep: false,
  activeProfileStep: 0,
  isSameAsPermanent: false,
  isOtherCitizen: false,
  isPassportExist: false,
  isNationalCardExist: false,
  isIDType: false,
  idType: 'NIN',
  isSubmittingCitizenship: false,
  isDeletingCitizenship: false,
  isSubmittingPassport: false,
  isDeletingPassport: false,
  isSubmittingNationalCard: false,
  isDeletingNationalCard: false,
  user: null,
  isLoadingUser: true,
  isShowPersonalUpdateForm: false,
  isShowEmploymentUpdateForm: false,
  isShowContactUpdateForm: false,
  isShowCitizenshipUpdateForm: false,
  isShowPassportUpdateForm: false,
  isShowNationalCardUpdateForm: false,
};

const setupSlice = createSlice({
  initialState,
  name: 'setup',
  reducers: {
    setLastProfileStep(state, action: PayloadAction<boolean>) {
      state.isLastProfileStep = action.payload;
    },
    setFirstProfileStep(state, action: PayloadAction<boolean>) {
      state.isFirstProfileStep = action.payload;
    },
    setActiveProfileStep(state, action: PayloadAction<number>) {
      state.activeProfileStep = action.payload;
    },
    setIsSameAsPermanent(state, action: PayloadAction<boolean>) {
      state.isSameAsPermanent = action.payload;
    },
    setIsOtherCitizen(state, action: PayloadAction<boolean>) {
      state.isOtherCitizen = action.payload;
    },
    setIsPassportExist(state, action: PayloadAction<boolean>) {
      state.isPassportExist = action.payload;
    },
    setIsNationalCardExist(state, action: PayloadAction<boolean>) {
      state.isNationalCardExist = action.payload;
    },
    setIsIDType(state, action: PayloadAction<boolean>) {
      state.isIDType = action.payload;
    },
    setIdType(state, action: PayloadAction<'NIN' | 'Passport'>) {
      state.idType = action.payload;
    },
    setIsSubmittingCitizenship(state, action: PayloadAction<boolean>) {
      state.isSubmittingCitizenship = action.payload;
    },
    setIsDeletingCitizenship(state, action: PayloadAction<boolean>) {
      state.isDeletingCitizenship = action.payload;
    },
    setIsSubmittingPassport(state, action: PayloadAction<boolean>) {
      state.isSubmittingPassport = action.payload;
    },
    setIsDeletingPassport(state, action: PayloadAction<boolean>) {
      state.isDeletingPassport = action.payload;
    },
    setIsSubmittingNationalCard(state, action: PayloadAction<boolean>) {
      state.isSubmittingNationalCard = action.payload;
    },
    setIsDeletingNationalCard(state, action: PayloadAction<boolean>) {
      state.isDeletingNationalCard = action.payload;
    },
    handleNextSetupStep(state) {
      if (!state.isLastProfileStep) {
        state.activeProfileStep = state.activeProfileStep + 1;
      }
    },
    handlePrevSetupStep(state) {
      if (!state.isFirstProfileStep) {
        state.activeProfileStep = state.activeProfileStep - 1;
      }
    },
    setIsLoadingUser(state, action: PayloadAction<boolean>) {
      state.isLoadingUser = action.payload;
    },
    setIsShowPersonalUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowPersonalUpdateForm = action.payload;
    },
    setIsShowEmploymentUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowEmploymentUpdateForm = action.payload;
    },
    setIsShowContactUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowContactUpdateForm = action.payload
    },
    setIsShowCitizenshipUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowCitizenshipUpdateForm = action.payload;
    },
    setIsShowPassportUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowPassportUpdateForm = action.payload;
    },
    setIsShowNationalCardUpdateForm(state, action: PayloadAction<boolean>) {
      state.isShowNationalCardUpdateForm = action.payload;
    },
  },
});

export const {
  setLastProfileStep,
  setFirstProfileStep,
  setActiveProfileStep,
  setIsSameAsPermanent,
  setIsNationalCardExist,
  setIsOtherCitizen,
  setIsPassportExist,
  setIdType,
  setIsIDType,
  setIsSubmittingCitizenship,
  setIsDeletingCitizenship,
  setIsDeletingNationalCard,
  setIsDeletingPassport,
  setIsSubmittingNationalCard,
  setIsSubmittingPassport,
  handleNextSetupStep,
  handlePrevSetupStep,
  setIsLoadingUser,
  setIsShowPersonalUpdateForm,
  setIsShowEmploymentUpdateForm,
  setIsShowContactUpdateForm,
  setIsShowCitizenshipUpdateForm,
  setIsShowNationalCardUpdateForm,
  setIsShowPassportUpdateForm,
   
} = setupSlice.actions;
export const setupReducer = setupSlice.reducer;
