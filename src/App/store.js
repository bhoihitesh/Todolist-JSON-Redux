import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import AddUserSlice from '../Features/AddUserSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { ApiCall } from '../Features/ApiCall'
// import apiCall from '../Features/ApiCall'
export const store = configureStore({
    reducer: {
        [ApiCall.reducerPath]: ApiCall.reducer,
        Newsuser: AddUserSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ApiCall.middleware)
})

setupListeners(store.dispatch)