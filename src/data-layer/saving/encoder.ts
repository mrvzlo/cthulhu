import LZUTF8 from 'lzutf8/build/production/lzutf8';

export default class Encoder<T> {
   encode256(src: T): string {
      const string = JSON.stringify(src);
      const binary = LZUTF8.encodeUTF8(string);
      const encoded = LZUTF8.encodeStorageBinaryString(binary);
      return encoded;
   }

   decode256(src: string, parentObject: any) {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string = LZUTF8.decodeUTF8(binary);
      const data = JSON.parse(string);
      const parsed = this.parse(data, parentObject);
      return parsed;
   }

   parse(source: any, destination: any): any {
      if (typeof source !== 'object' || source === null) return source;

      Object.keys(source).forEach((key) => {
         if (source[key] == null && !destination[key]) return;
         destination[key] = this.parse(source[key], destination[key]);
      });
      return destination;
   }
}
