import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYsIm5hbWUiOiJCUkVOTyBBTkRSQURFLlRFU1RFUyIsImFkbWluIjp0cnVlLCJpYXQiOjE1OTkwMDMyMjksImV4cCI6MTkxNDM2MzIyOX0.McbpQl0FxBjTffhhBaLNOw6nEM5iD91kyOjWNLRNS4I'
    }
});

export const syncData = async (dados) => {
    let respostaCriptografa = await axios({
        method: 'post',
        url: 'http://127.0.0.1:4002/criptbody',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": TOKEN_MINHA_API
        },
        data: dados
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log((error));
        return error;

    });
    let resposta = axios({
        method: 'post',
        url: 'http://localhost:3000/dev/syncdata',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': MXAPIKEY
        },
        data: {
            "valor": respostaCriptografa.valor
        }
    }).then(async function (response) {
        return response.data.dados;
    }).catch(function (error) {
        console.log((error));
        return error;
    });
    return resposta;
}

export default api;