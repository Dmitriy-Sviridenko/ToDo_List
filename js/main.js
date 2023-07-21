const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

//проверяем наличие заполненного Storage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask (task));
};
ckeckEmptyList();
form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask)


//функции
function addTask (event) {
  event.preventDefault(); //отменяем отправку формы

  //получаем текст задачи из поля ввода
  const taskText = taskInput.value;

  //описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //добавлеяем задачу в массив с задачами
  tasks.push(newTask);

  renderTask (newTask);

  //Очищаем поле ввода и возвращаем в него фокус
  taskInput.value = "";
  taskInput.focus();
  ckeckEmptyList();
  saveToLocalStoarge ();
}

function deleteTask(event) {
  //проверяем если клик был не по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;
  
  const parentNode = event.target.closest("li");

  //определяем  ID задачи
  const id = Number(parentNode.id);

  //находим индекс задачи в массиве
  //! const index = tasks.findIndex((task) => task.id === id);
  //удаляем задачу из массива с задачами
  //! tasks.splice(index, 1);

  //Удалениче задачи через фильтрацию массива
  tasks = tasks.filter((task) => task.id !== id)

  //удаляем задачу из разметки
  parentNode.remove();
  ckeckEmptyList();
  saveToLocalStoarge ();
};

function doneTask(event){
  //проверяем клик не по кнопке
  if (event.target.dataset.action !== "done") return

  //проверяем клик по кнопке "задача выполнена"
  const parentNode = event.target.closest("li");

  const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id)
  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".task-title")
  taskTitle.classList.toggle("task-title--done")
  saveToLocalStoarge ();
}

function ckeckEmptyList () {
  if (tasks.length === 0) {
    const emptyListElement = `
    <li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Список дел пуст</div>
    </li>`

    tasksList.insertAdjacentHTML("afterbegin", emptyListElement);
  } else {
    const emptyListEl = document.querySelector("#emptyList")
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStoarge () {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTask (task) {
      //Формируем CSS класс
      const cssClass = task.done ? "task-title task-title--done" : "task-title"

      //формирование разметки для новой задачи
      const taskHtml = `
      <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
        </div>
      </li>`;
    
      //добавить задачу на страницу
      tasksList.insertAdjacentHTML("beforeend", taskHtml);
}