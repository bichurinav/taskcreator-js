export class TaskCreator {
    constructor(selector, options) {
        this.$app = document.querySelector(selector)
        this.className = options.className
        this.list = [];
        this.count = '0';

        this.init();
        this.addEventListener();
    }

    template() {
        return `
        <div class="${this.className}">
          <div class="container">
            <div class="${this.className}__count"></div>
            <form class="${this.className}__form">
                <input class="${this.className}__form-input"/>
                <button class="${this.className}__add-task">Создать</button>
                <button class="${this.className}__del-tasks">Удалить все задачи</button>
            </form>
            <div class="${this.className}__list">
            
            </div>
          </div>  
        </div>
        `
    }

    init(){
        this.renderTemplate();
        this.renderTasks();
    }

    renderTemplate() {
        this.$app.innerHTML = this.template();
        this.$input = document.querySelector(`.${this.className}__form-input`);
        this.$list = document.querySelector(`.${this.className}__list`);
        this.$form = document.querySelector(`.${this.className}__form`);
        this.$delAllBtn = document.querySelector(`.${this.className}__del-tasks`);
        this.$count = document.querySelector(`.${this.className}__count`);
    }

    addEventListener(){
        this.$form.addEventListener('submit', this.addTask.bind(this));
        this.$delAllBtn.addEventListener('click', this.delAllTask.bind(this));
    }

    delAllTask(event) {
        event.preventDefault()
        let list = [...this.list]
        list = []
        this.list = list
        this.renderTasks()
    }

    addTask(event) {
        event.preventDefault()
        if (this.$input.value !== '') {

            const list = [...this.list]
            const isEqualTask = list.filter((task) => task.value === this.$input.value).length

            if (!isEqualTask)  {
                list.push({value: this.$input.value})
                this.list = list
                this.renderTasks()
                this.$input.value = ''
            }

        }
    }

    renderCount() {
        this.count = String(this.list.length)
        this.$count.innerHTML = `Кол-во задач: <b>${this.count}</b>`
    }

    renderTasks() {
        this.$list.innerHTML = this.list.map((task, index) => {
            let numberTask = index + 1;
            return `
            <div class="${this.className}__item">
                ${numberTask}. <span class="${this.className}__item-name">${task.value}</span>
                <button class="${this.className}__item-btnDel">X</button>
            </div>
            `
        }).join('')

        this.renderCount()

        if (document.querySelectorAll(`.${this.className}__item-btnDel`)) {
            this.$delButtons = document.querySelectorAll(`.${this.className}__item-btnDel`)
            this.$delButtons.forEach(btn => btn.addEventListener('click', this.delTask.bind(this)))
        }

    }

    delTask(event) {
        const btn = event.target
        const taskName = btn.parentNode.querySelector(`.${this.className}__item-name`)

        const list = this.list.filter(function(task) {
            return task.value !== taskName.textContent
        });

        this.list = list;
        this.renderTasks();
    }

}
