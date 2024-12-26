import {configureStore} from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import contentReducer from './contentSlice'

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        content: contentReducer,
    },
});

export default store;