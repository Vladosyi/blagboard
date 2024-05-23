const { makeAutoObservable } = require("mobx");

export default class BasketDeviceStore {
  constructor() {
    this._deviceInBasket = [];
    makeAutoObservable(this)
  }
  setDeviceInBasket(devices){
    this._deviceInBasket = devices;

  }
  get deviceInbasket(){
    return this._deviceInBasket;
  }
}
