import {configureStore} from '@reduxjs/toolkit'
import headerReducer from './headerSlice'
import sidebarReducer from './sidebarSlice'
import contentReducer from './contentSlice'

const store = configureStore({
    reducer: {
        header: headerReducer,
        sidebar: sidebarReducer,
        content: contentReducer,
    },
});

export default store;