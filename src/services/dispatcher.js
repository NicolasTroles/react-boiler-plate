// Api
import { Api } from '../utils/api';

class DispatcherService {
    static getCompanies() {
        return Api.get(`/companies`)
    }
}

export default DispatcherService;