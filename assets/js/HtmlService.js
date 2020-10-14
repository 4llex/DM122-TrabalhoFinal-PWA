export default class HtmlService {

  constructor(){
    console.log('Serviço HTML instanciado');
    this.bindFormEvent();
  }
  // constructor() {
  //   this.bindFormEvent();
  // }

  bindFormEvent() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(form.item.value);
      form.reset();
    })
  }
}
