import axios from "axios";

let api = axios.create({});

api.interceptors.request.use(
    config => {
        config.headers['Pragma'] = 'no-cache';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['x-api-key'] = "EgF9anqVIK4vYj2FaVPq05FAlPurBdOn2213DyG1";

        return config;
    },
    error => Promise.reject(error)
);

let PATH = 'https://acc-dialog-manager.softinova.com.br';

class Api {
    static get(uri) {
        return api.get(`${PATH}${uri}`);
    }

    static post(uri, data) {
        return api.post(`${PATH}${uri}`, data);
    }

    static put(uri, data) {
        return api.put(`${PATH}${uri}`, data);
    }

    static patch(uri, data) {
        return api.patch(`${PATH}${uri}`, data);
    }

    static delete(uri) {
        return api.delete(`${PATH}${uri}`);
    }
}

export { Api }