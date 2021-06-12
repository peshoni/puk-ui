import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import User from '../services/user';

const inst = axios.create({
    baseURL: 'http://localhost:8082/api',
});

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}

inst.interceptors.request.use(request => {
    request.headers['Authorization'] = `bearer ${getAccessToken()}`;
    return request;
});
// Add a 401 response interceptor
inst.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {

        // handle error: inform user, go to login, etc
        // go go -> to login page
        User.id = 0;
        localStorage.clear();
        window.location.href = '/';
    } else {
        return Promise.reject(error);
    }
});

const refreshAuthLogic = failedRequest => {
    const refresh = axios.create({
        baseURL: 'http://localhost:8082',
        auth: {
            username: 'admin',
            password: 'admin'
        }
    });
    return refresh.post(`/oauth/token?grant_type=refresh_token&refresh_token=${getRefreshToken()}`)
        .then(tokenRefreshResponse => {

            localStorage.setItem('access_token', tokenRefreshResponse.data.access_token);
            localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh_token);
            failedRequest.response.config.headers['Authorization'] = 'bearer ' + tokenRefreshResponse.data.access_token;

            return Promise.resolve();
        });
};

// export const login = (u, p, redirectTo) => {

//     console.log(u, p, redirectTo);
//     return; 
//     const api = axios.create({
//         baseURL: 'http://localhost:8082',
//         auth: {
//             username: 'admin',
//             password: 'admin'
//         }
//     }); 
//     const form = new FormData();
//     form.append('username', u);
//     form.append('password', p);

//     api.post('/oauth/token?grant_type=password', form, { headers: { "Content-Type": "multipart/form-data" } })
//         .then(function (response) {
//             localStorage.setItem('access_token', response.data.access_token);
//             localStorage.setItem('refresh_token', response.data.refresh_token);
//             window.location.href = redirectTo;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

// }




// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(inst, refreshAuthLogic);

export default inst;