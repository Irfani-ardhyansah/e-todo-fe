import {createSlice} from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        activeTaskId: null,
        shouldRefreshTask: false,
    },
    reducers: {
        setActiveTaskId(state, action) {
            state.activeTaskId = action.payload
        },
        triggerRefreshTask: (state) => {
            state.shouldRefreshTask = true;
        },
        clearRefreshTask: (state) => {
            state.shouldRefreshTask = false;
        },
    },
});

export const { setActiveTaskId, triggerRefreshTask, clearRefreshTask } = sidebarSlice.actions;
export default sidebarSlice.reducer;
