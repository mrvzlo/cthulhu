export default class SettingsService {
   getCached = () => localStorage.getItem('cached');
   setCached = (value: string) => localStorage.setItem('cached', value);
}
