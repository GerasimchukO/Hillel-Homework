// Берем тудулист с прошлого занятия

// И апгрейдим его :)

// Добавляем валидацию на лету - то естьЮ валидируем прям во время ввода текста
// Добавляем возможность отправлять сообщения по нажатию на ENTER
// при нажатии комбинации SHIFT а потом backspace должны полностью стереть весь текст в инпуте

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

function validateTodo(event){

  if(!event.target.value.trim()){
    errorE.innerText = "";
    btnE.disabled = true;
    return;
  } 
  if(event.target.value.trim().length <= 7){
errorE.innerText = "Error, length should be < 7";
return;
  }
  if(event.keyCode === 13){
    onAddTodo();
  }
  
  errorE.innerText = "";
  btnE.disabled = false;

  deleteAll(e);
}


// function clearValue(inpTextE){
//     if(shiftKey === true && e.keyCode === 8){
//         inpTextE.value = "";
//       }
// }


function deleteAll(event){
    if(event.shiftKey ===true && event.keyCode === 8){
        inpTextE.value = "";
    }
}
