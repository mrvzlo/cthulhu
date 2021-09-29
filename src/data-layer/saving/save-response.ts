export default class SaveResponse<T> {
   result: T;
   status: boolean;

   constructor(result: T, status: boolean) {
      this.status = status;
      this.result = result;
   }
}
