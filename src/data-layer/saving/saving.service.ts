import Encoder from './encoder';
import SaveData from './save-data';
import SaveResponse from './save-response';

export default class SaveService<T> {
   encoder = new Encoder();

   async getAll(count: number): Promise<SaveData[]> {
      const list = [];
      for (let i = 0; i < count; i++) {
         list.push(new SaveData(i));
         await list[i].fillFields();
      }
      return list;
   }

   import(input: string, parentObject: T): SaveResponse<T> {
      try {
         const decoded = this.encoder.decode256(input, parentObject);
         return new SaveResponse(decoded, true);
      } catch {
         return new SaveResponse(parentObject, false);
      }
   }

   makeSave(obj: T, name: string, id: number) {
      const encoded = this.encoder.encode256(obj);
      new SaveData(id).setData(encoded, name);
   }

   deleteSave(id: number) {
      new SaveData(id).deleteFile();
   }

   async getSaveData(id: number): Promise<string> {
      return await new SaveData(id).getEncoded();
   }
}
