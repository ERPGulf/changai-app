import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  employeeCode?: string;
  [key: string]: any;
}

interface UserState {
  username: string | null;
  fullname: string | null;
  userDetails: UserDetails | null;
  baseUrl: string | null;
  fileId: string | null;
  isWfh: boolean;
  employees: any[];
}

const initialState: UserState = {
  username: null,
  fullname: null,
  userDetails: null,
  baseUrl: null,
  fileId: null,
  isWfh: false,
  employees: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },

    setFullname: (state, action: PayloadAction<string | null>) => {
      state.fullname = action.payload;
    },

    setUserDetails: (
      state,
      action: PayloadAction<UserDetails | null>
    ) => {
      state.userDetails = action.payload;
    },

    setBaseUrl: (state, action: PayloadAction<string | null>) => {
      state.baseUrl = action.payload;
    },

    setFileid: (state, action: PayloadAction<string | null>) => {
      state.fileId = action.payload;
    },

    setIsWfh: (state, action: PayloadAction<boolean>) => {
      state.isWfh = action.payload;
    },

    setEmployees: (state, action: PayloadAction<any[]>) => {
      state.employees = action.payload;
    },

    setEmployeeCode: (state, action: PayloadAction<string>) => {
      state.userDetails = state.userDetails || {};
      state.userDetails.employeeCode = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder.addCase("REVERT_ALL" as any, () => initialState),
});

// Actions
export const {
  setUsername,
  setFullname,
  setUserDetails,
  setBaseUrl,
  setFileid,
  setIsWfh,
  setEmployees,
  setEmployeeCode,
} = UserSlice.actions;

// RootState should come from your store
export interface RootState {
  user: UserState;
}

// Selectors
export const selectBaseUrl = (state: RootState) => state.user.baseUrl;

export const selectFileid = (state: RootState) => state.user.fileId;

export const selectIsWfh = (state: RootState) => state.user.isWfh;

export const selectName = (state: RootState) => state.user.fullname;

export const selectUserDetails = (state: RootState) =>
  state.user.userDetails;

export const selectEmployeeCode = (state: RootState) =>
  state.user.userDetails?.employeeCode ?? null;

export const selectEmployees = (state: RootState) =>
  state.user.employees;

export default UserSlice.reducer;