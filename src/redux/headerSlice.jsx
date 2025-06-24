import {createSlice} from '@reduxjs/toolkit'

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        activeModalTask: false,
    },
    reducers: {
        setActiveModalTask(state, action) {
            state.activeModalTask = action.payload
        },
    },
});

export const { setActiveModalTask } = headerSlice.actions;
export default headerSlice.reducer;
