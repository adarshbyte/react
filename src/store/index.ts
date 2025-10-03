import {configureStore} from '@reduxjs/toolkit';
import toastsReducer from './toastSlice';
import dataSetsReducer from './datasets';
const store = configureStore({
    reducer: {
        toasts: toastsReducer,
        datasets: dataSetsReducer
    }
})
export default store;

export type TypeStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;