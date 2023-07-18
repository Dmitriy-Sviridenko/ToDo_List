const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

//добавление задачи
form.addEventListener("submit", addTask);

//удаление задач
tasksList.addEventListener("click", deleteTask);

//отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask)

if (localStorage.getItem("tasksHTML")) {
  tasksList.innerHTML = localStorage.getItem("tasksHTML");
};

//функции
function addTask (event) {
  event.preventDefault(); //отменяем отправку формы

  //получаем текст задачи из поля ввода
  const taskText = taskInput.value;

  //формирование разметки для новой задачи
  const taskHtml = `
  <li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span>
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

  saveHTMLtoLS();
}

function deleteTask(event) {
  //проверяем если клик был не по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;
  
  const parentNode = event.target.closest("li");
  parentNode.remove();

  if (tasksList.children.length === 1){
    emptyList.classList.remove("none");
  };

  saveHTMLtoLS();
};

function doneTask(event){
  if (event.target.dataset.action !== "done") return

  //проверяем клик по кнопке "задача выполнена"
  const parentNode = event.target.closest("li");
  const taskTitle = parentNode.querySelector(".task-title")
  taskTitle.classList.toggle("task-title--done")

  saveHTMLtoLS();
}

function saveHTMLtoLS() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML)
}