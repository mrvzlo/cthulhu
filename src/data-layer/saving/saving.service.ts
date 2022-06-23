import Encoder from './encoder';
import SaveResponse from './save-response';

export default class SaveService<T> {
   encoder = new Encoder();

   constructor(private key: string) {}

   getData(parentObject: T): SaveResponse<T> {
      try {
         const saved = localStorage.getItem(this.key) ?? '';
         const decoded = this.encoder.decode256(saved, parentObject);
         if (!decoded) throw 'No data decoded';
         return new SaveResponse(decoded, true);
      } catch {
         return new SaveResponse(parentObject, false);
      }
   }

   setData(obj: T) {
      const encoded = this.encoder.encode256(obj);
      localStorage.setItem(this.key, encoded);
   }

   deleteSave() {
      localStorage.removeItem(this.key);
   }
}
