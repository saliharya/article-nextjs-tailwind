import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/slices/authSlice'
import articleReducer from '@/store/slices/articleSlice'
import categoryReducer from '@/store/slices/categorySlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer: authReducer,
            articleReducer: articleReducer,
            categoryReducer: categoryReducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']