export default class HtmlService {

  constructor(marketService){
    console.log('Serviço HTML instanciado');
    
    this.marketService = marketService;
    this.bindFormEvent();
    this.listTasks();
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

  async listTasks(){
    const tasks = await this.marketService.getAll();
    console.log(tasks); 
  }

}
