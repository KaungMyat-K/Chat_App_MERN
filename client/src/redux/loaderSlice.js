const { createSlice } = require("@reduxjs/toolkit");

const loaderSlice = createSlice({
    name : 'loader',
    initialState : false,
    reducers: {
        showLoader : (state)=>{
            state.loader = true
        },
        hiddenLoader : (state)=>{
            state.loader = false
        }
    }
});

export const {showLoader,hiddenLoader} = loaderSlice
export default loaderSlice.reducer
