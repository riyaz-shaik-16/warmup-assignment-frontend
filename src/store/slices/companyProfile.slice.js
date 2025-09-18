import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  company_logo_url: "",
  company_banner_url: "",
  company_name: "",
  about_company: "",
  organizations_type: "",
  industry_type: "",
  team_size: "",
  year_of_establishment: "",
  company_website: "",
  company_app_link: "",
  company_vision: "",
  headquarter_phone_no: "",
  social_links: {},
  map_location_url: "",
  careers_link: "",
  created_at: "",
  updated_at: "",
  owner_id: null,
  is_claimed: false,
  headquarter_mail_id: "",
};

const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    setCompanyProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetCompanyProfile: () => initialState,
  },
});

export const { setCompanyProfile, updateField, resetCompanyProfile } =
  companyProfileSlice.actions;

export default companyProfileSlice.reducer;
