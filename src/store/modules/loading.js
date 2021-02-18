import { makeAutoObservable } from "mobx";

class loading {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(state) {
    this.isLoading = state;
  }
}

export default loading;