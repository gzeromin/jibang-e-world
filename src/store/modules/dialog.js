import { makeAutoObservable } from 'mobx';

class dialog {
  //types
  SUCCESS = 'success';
  DANGER = 'danger';
  WARNING = 'warning';
  INFO = 'info';
  CONFIRM = 'confirm';

  show = false;
  type = this.SUCCESS;
  message = '';
  subMessage = '';
  result = false;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = (type, message, subMessage) => {
    this.show = true;
    this.type = type;
    this.message = message;
    this.subMessage = subMessage;
    return new Promise((resolve, reject) => {
      this.result = resolve;
    })
  }

  closeDialog = (result) => {
    this.show = false;
    this.result(result);
  }

  get title() {
    switch (this.type) {
      case this.SUCCESS :
        return 'success';
      case this.DANGER :
        return 'error';
      case this.WARNING :
        return 'warning';
      case this.INFO :
        return 'info';
      case this.CONFIRM :
        return 'confirm';
      default :
        return null;
    }
  }
}

export default dialog;