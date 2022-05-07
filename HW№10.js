// У нас есть инпут и конпка
// Вводим текст в инпут, нажимаем на кнопку - появляется новая задачка в контейнере
// Задача в контейнере имеет текст введенный в инпуте, имеет крестик в вархнем правом углу, так же появляется с желтым фоном, что означает - задача не выполнена
// Нажимаем на задачу один раз, бекграунд меняется на зеленый - задача выполнена, нажимаем второй раз - меняет цвет ообратно на желтый.
// Нажимаем на крест - задача удаляется из контейнера.


// Обязательно используем делегирование, и по возможности разбиваем все на функции
const inpTextE = document.getElementById("inp-text");
const btnE = document.getElementById("btn");
const errorE = document.querySelector(".error-container");
const contE = document.querySelector(".container")

inpTextE.addEventListener("keyup", validateTodo);
btnE.addEventListener("click", onAddTodo);
contE.addEventListener("click", onTodoClick);
btnE.disabled = true;
function onAddTodo() {
 const element = `<div name="todo" class="item">
 <span name="delete" class="delete">x</span>
 ${inpTextE.value}
 </div>`;

 contE.innerHTML += element;
}


function onTodoClick(e){
  [...e.target.attributes].forEach((el) => {
    if(el.value === "delete"){
      deleteTodo(e.target);
    }
    if(el.value === "todo"){
      compliteTodo(e.target);
    }
  });
}
 
function deleteTodo(elem){
  elem.closest(".item").remove();
}

function compliteTodo(elem){
  elem.classList.toggle("complite");
}

function validateTodo(e){

  if(!e.target.value.trim()){
    errorE.innerText = "";
    btnE.disabled = true;
    return;
  } 
  if(e.target.value.trim().length <= 7){
errorE.innerText = "Error, length should be < 7";
return;
  }
  if(e.keyCode === 13){
    onAddTodo();
  }
  errorE.innerText = "";
  btnE.disabled = false;
}