import { PayloadAction } from "@reduxjs/toolkit";

import { talentsThunk, getOneTalentThunk, deleteImage,addReview} from "./thunks";
import { createSlice } from "@reduxjs/toolkit";

type Image = {
  id: number;
  source: string;
};

type User = {
  id: number;
  name: string;
  profilePic: string;
};

type Review = {
  title: string;
  comment: string;
  id: number;
  upddatedAt: Date;
  authorReview: User;
  rating: number | string;
};

type UserRole = {
  yearsOfExperience: number;
};

type Role = {
  name: string;
  id: number;
  userRoles: UserRole;
};

type Talet = {
  name: string;
  email: string;
  images: Image[] | [];
  id: number;
  intro: string;
  profilePic: string;
  reviews: Review[];
  roles: Role[];
};

type InitialStateObj = {
  talents: Talet[] | [];
  talent: Talet;
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialStateObj = {
  talents: [],
  talent: {
    name: "",
    email: "",
    images: [],
    id: 0,
    intro: "",
    profilePic: "",
    reviews: [],
    roles: [],
  },
  isLoading: false,
  isError: false,
};

export const talentSlice = createSlice({
  name: "talents",
  initialState,
  reducers: {
    deleteImg: (state, action) => {
      const newImgs = [...state.talent.images].filter(
        (el) => el.id !== action.payload
      );
      state.talent.images = newImgs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(talentsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      talentsThunk.fulfilled,
      (state, action: PayloadAction<Talet[]>) => {
        state.isLoading = false;
        state.talents = action.payload;
      }
    );
    builder.addCase(talentsThunk.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getOneTalentThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getOneTalentThunk.fulfilled,
      (state, action: PayloadAction<Talet>) => {
        state.isLoading = false;
        state.talent = action.payload;
      }
    );
    builder.addCase(getOneTalentThunk.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(addReview.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
      const newReviews = [action.payload, ...state.talent.reviews];
      state.talent.reviews = newReviews;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(addReview.rejected, state => {
      state.isError = true;
      state.isLoading = false;
    });
    
  },
});

export const { deleteImg } = talentSlice.actions;
export default talentSlice.reducer;
