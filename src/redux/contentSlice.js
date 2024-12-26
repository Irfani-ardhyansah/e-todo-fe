import {createSlice} from '@reduxjs/toolkit'

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        timerRunStatus: false,
    },
    reducers: {
        setTimerRunStatus(state, action) {
            state.timerRunStatus = action.payload
        },
    },
});

export const { setTimerRunStatus } = contentSlice.actions;
export default contentSlice.reducer;
