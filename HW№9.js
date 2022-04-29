const todoContainer = document.getElementById("list-container");
const btnE = document.getElementById("btn");
const inpFirstE = document.getElementById("inp-first-name");
const inpSecondE = document.getElementById("inp-second-name");
const inpPhoneE = document.getElementById("inp-phone");

btnE.addEventListener("click", onAddTodo);

const templateE = document.getElementById("template");

function onAddTodo() {
  const firstName = inpFirstE.value;
  const secondName = inpSecondE.value;
  const phone = inpPhoneE.value;

  if (!firstName.trim() || !secondName.trim() || !phone.trim()) {
    alert("Pleas add some text ");
    return;
  }
  const el = createTodoE(firstName, secondName, phone);
  addElement(el, todoContainer);
  clearValue(inpFirstE);
  clearValue(inpSecondE);
  clearValue(inpPhoneE);

}

function createTodoE(firstName, secondName, phone){
  const el = templateE.innerHTML
  .replace("{{firstName}}", firstName)
  .replace("{{secondName}}", secondName)
  .replace("{{phone}}", phone)

  return el;
}

function createElement(tag) {
  return document.createElement(tag);
}

function addElement(element, container){
  container.innerHTML += element;
}

console.log(addElement());

function clearValue(inpEl){
  inpEl.value = "";
}