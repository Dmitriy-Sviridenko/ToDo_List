const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

//добавление задачи
form.addEventListener("submit", addTask);

//удаление задач
tasksList.addEventListener("click", deleteTask);

//отмечаем задачу завершенной
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

  //Формируем CSS класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title"

  //формирование разметки для новой задачи
  const taskHtml = `
  <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
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

  //Очищаем поле ввода и возвращаем в него фокус
  taskInput.value = "";
  taskInput.focus();

  //скрываем блок "список пуст"
  if (tasksList.children.length > 1){
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  //проверяем если клик был не по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;
  
  const parentNode = event.target.closest("li");

  //определяем  ID задачи
  const id = Number(parentNode.id);

  //находим индекс задачи в массиве
  const index = tasks.findIndex((task) => task.id === id);

  //удаляем задачу из массива с задачами
  tasks.splice(index, 1);

  //удаляем задачу из разметки
  parentNode.remove();

  if (tasksList.children.length === 1){
    emptyList.classList.remove("none");
  };
};

function doneTask(event){
  if (event.target.dataset.action !== "done") return

  //проверяем клик по кнопке "задача выполнена"
  const parentNode = event.target.closest("li");
  const taskTitle = parentNode.querySelector(".task-title")
  taskTitle.classList.toggle("task-title--done")
}

