import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";



//asenkron thunk akstyionları
export const getLanguages = createAsyncThunk("language/getLanguages", async () => {
    // apiden dil verilerini al
    const res = await axios.request(languageOptions);
    // console.log(res.data.data.languages);

    //aksiyonun payloadını belirle
    return res.data.data.languages;
})

//api nin çeviri uç noktasına istek at
export const translateText = createAsyncThunk('translate/translateText', async (action_params) => {
    //aksiyonu dispatch ederken gönderilen parametrelere erişme
    const { sourceLang, targetLang, text } = action_params;
    // console.log(param1);
    //gönderilecek parametreleri belirle

    const params = new URLSearchParams();
    params.set('source_language', sourceLang.value);
    params.set('target_language', targetLang.value);
    params.set('text', text);
    //axios aistek ayarlarını belirle
    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-key': '60d9e600a3msh1475c4a4c947c1fp1c3d62jsn6b4dee0347c6',
            'x-rapidapi-host': 'text-translator2.p.rapidapi.com',

        },
        data: params,
    };
    // istek at
    const res = await axios.request(options);
    console.log(res.data.data.translatedText);

    return res.data.data.translatedText;

})
