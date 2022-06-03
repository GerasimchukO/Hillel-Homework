"https://api.github.com/users/";
const inpE = document.getElementById("inp-login");
const containerE = document.querySelector(".container");
const btnE = document.getElementById("btn");
const errE = document.querySelector(".error-container");
let user = null;

const git = new GitHab();

inpE.addEventListener("keyup", validateTodo);
btnE.addEventListener("click", onFind);
const ERROR_MSG = {
  404: "Not found",
  500: "Server is unavailable",
};

function onFind(e) {
  git
    .getUser(inpE.value)
    .then((u) => {
      console.log(u);

      user = u;
      console.log(u);
      renderDate(user);
    })
    .catch((e) => {
      renderError(e);
    });
  clearValue(inpE);
}

function clearValue(inpE) {
  inpE.value = "";
}

function validateTodo(event) {
  if (!event.target.value.trim()) {
    errE.innerText = "";
    containerE.innerText = "";
    btnE.disabled = true;
    return;
  }
  if (event.keyCode === 13) {
    onFind();
  }

  deleteAll(e);
}

function deleteAll(event) {
  if (event.shiftKey) {
    inpE.value = "";
  }
}

function renderDate(date) {
  containerE.innerHTML = `
  <img src="${date.avatar_url}"></img> 
  <li>Repositories : ${date.public_repos}</li>
  <li>Followers : ${date.followers}</li> 
  <li>Following : ${date.following}</li>`;
}
function renderError(errorCode) {
  errE.innerHTML = ERROR_MSG[errorCode];
}

// bardankl
