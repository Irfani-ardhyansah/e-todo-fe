import {createSlice} from '@reduxjs/toolkit'

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        timerRunStatus: false,
        timerIdRedux: 0,
        timerTitleRedux: null,
    },
    reducers: {
        setTimerRunStatus(state, action) {
            state.timerRunStatus = action.payload
        },

        setTimerIdRedux(state, action) {
            state.timerIdRedux = action.payload
        },

        setTimerTitleRedux(state, action) {
            state.timerTitleRedux = action.payload
        }
    },
});

export const { setTimerRunStatus, setTimerIdRedux, setTimerTitleRedux } = contentSlice.actions;
export default contentSlice.reducer;
