export class CaughtError extends Error{
  constructor(public message:string, parent:Error = new Error(), public code:number = 0, public key?:string){
    super(message);
    this.stack = parent.stack
    this.name = "CaughtError"
  }
}

