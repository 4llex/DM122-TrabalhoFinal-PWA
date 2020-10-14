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
    tasks.forEach(task => this.addToHtmlList(task)); 
  }

  addToHtmlList(task){
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.setAttribute('data-item-id', task.id);
    span.textContent = task.description;
    button.textContent = 'x';

    if(task.done){
      li.classList.add('done');
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

  }

}
