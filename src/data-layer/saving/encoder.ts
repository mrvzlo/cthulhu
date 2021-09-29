import LZUTF8 from 'lzutf8/build/production/lzutf8';

export default class Encoder {
   encode256(src: any): string {
      const binary = LZUTF8.encodeUTF8(src);
      const encoded = LZUTF8.encodeStorageBinaryString(binary);
      return encoded;
   }

   decode256(src: string, parentObject: any) {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string: any = LZUTF8.decodeUTF8(binary);
      const parsed = this.parse(string, parentObject);
      return parsed;
   }

   parse(data: any, object: any): any {
      if (typeof data !== 'object' || data === null) {
         return data;
      }

      while (Array.isArray(data) && object.length < data.length) {
         object.pushNew();
      }

      Object.keys(data).forEach((key) => {
         if (key == 'ctor') return;
         object[key] = this.parse(data[key], object[key]);
      });
      return object;
   }
}
