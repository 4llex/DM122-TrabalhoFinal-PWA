const DONE = 'done';

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
      this.addTask(form.item.value);
      form.reset();
    })
  }

  async addTask(description) {
    const task = { description, done: false};
    const taskId = await this.marketService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
  }

  async listTasks(){
    const tasks = await this.marketService.getAll();
    tasks.forEach(task => this.addToHtmlList(task)); 
  }

  async saveTask(taskId, isDone){
    const task = await this.marketService.get(taskId);
    task.done = isDone;
    this.marketService.save(task);
  }

  toggleTask(li){
    const taskId = +li.getAttribute('data-item-id');
    li.classList.toggle(DONE);
    const isDone = li.classList.contains(DONE);
    // Salvar info
    this.saveTask(taskId, isDone);
  }

  addToHtmlList(task){
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.setAttribute('data-item-id', task.id);
    li.addEventListener('click', () => this.toggleTask(li));

    span.textContent = task.description;

    button.textContent = 'x';

    if(task.done){
      li.classList.add(DONE);
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

  }

}
