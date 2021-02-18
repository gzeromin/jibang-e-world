import { makeAutoObservable } from "mobx";

class dialog {
  show = false;
  type = "success";
  message = "";
  subMessage = "";
  ok = "ok";
  cancel = "cancel";
  result = false;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = () => {
    this.show = true;
  }

  closeDialog = () => {
    this.show = false;
  }
  
}

export default dialog;