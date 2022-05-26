import { create } from 'axios';

const api = create({
    baseURL: window.origin === 'http://localhost:3000' ? 'http://localhost:5000/api/v1' : window.origin + '/api/v1'
});

const ApiService = {
    get(route) {
        return api.get(route);
    },
    post(route, data) {
        return api.post(route, data);
    },
    put(route, data) {
        return api.put(route, data);
    },
    delete(route) {
        return api.delete(route);
    }
};
export default ApiService;