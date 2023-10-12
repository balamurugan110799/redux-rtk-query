import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { CRUD_API } from "../services/api";

export const store = configureStore({
    reducer: {
        [CRUD_API.reducerPath]: CRUD_API.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(CRUD_API.middleware)
})