// slice tanımlama

import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions/translateActions";
const initialState = {
    isLoading: false,
    isError: false,
    text: "",
};

const translateSlice = createSlice({
    name: 'translate',
    initialState,
    //senkron aksiyonları tanımladık
    reducers: {
        //payload değerini text e aktar
        updateText: (state, action) => { state.text = action.payload },
    },

    //asenkron aksiyonları  tanımladık
    extraReducers: (builder) => {
        builder.addCase(translateText.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(translateText.rejected, (state, action) => {
            alert('isşem gerçekleşirken bir hata oluştui, daha sonra tekrar deneyiniz');
            state.isLoading = false;
            state.isError = action.error;
        });

        builder.addCase(translateText.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.text = action.payload;
        });

    },
});

export default translateSlice.reducer;
export const { updateText } = translateSlice.actions;