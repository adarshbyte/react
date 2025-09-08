import {configureStore} from '@reduxjs/toolkit';
import toastsReducer from './toastSlice';

const store = configureStore({
    reducer: {
        toasts: toastsReducer
    }
})
export default store;