import {createSlice} from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        activeTaskId: null,
    },
    reducers: {
        setActiveTaskId(state, action) {
            state.activeTaskId = action.payload
        },
    },
});

export const { setActiveTaskId } = sidebarSlice.actions;
export default sidebarSlice.reducer;
