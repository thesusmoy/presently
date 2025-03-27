import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./features/UserSlice.js";
import PresentationSlice from "./features/PresentationSlice.js";

export const store = configureStore({
    reducer: {
        user: UserSlice,
        presentation: PresentationSlice
    },
})