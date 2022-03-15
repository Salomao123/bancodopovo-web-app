import { environment } from '../../environments/environment';

export class Utils {
    static getUrlBackend() {
        return environment.baseUrl;
    }

    static getDefaultLanguage() {
        return 'pt';
    }

}
