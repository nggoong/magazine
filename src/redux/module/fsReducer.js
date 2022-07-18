import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastVisible:null
}


const fsSlice = createSlice({
    name:'fs',
    initialState,
    reducers: {
        setLastVisible: (state, action) => {
            state.lastVisible = action.payload;
        },
        setDefaultLastVisible:(state)=> {
            state.lastVisible = null
        }
    },

})

const fsActions = fsSlice.actions;
export { fsActions };

export default fsSlice.reducer;