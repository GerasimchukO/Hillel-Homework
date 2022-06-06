const contact = new Contact (
  document.querySelector(".list"),
  document.querySelector(".edit-container")
);
const nameE = document.querySelector(".name");
const lastNameE = document.querySelector(".last_name");
const phoneE = document.querySelector(".phone");
document
  .querySelector(".create")
  .addEventListener("click", () => contact.createContact(nameE.value, lastNameE.value, phoneE.value));
