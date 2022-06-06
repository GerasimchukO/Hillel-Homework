class Contact {
  static url = "contacts";
  #contacts = [];
  #currentContact = null;
  #currentContactE = null;
  #EContContainer = null;
  #http = null;
  #editE = null;
  #editNameE = null;
  #editLastNameE = null;
  #editPhoneE = null;

  #CLASSES = {
    contactComplete: "contact-complete",
    itemActive: "item-active",
    showEdit: "show-edit",
    hideComplBut: "hide-element",
    close: "close",
    complete: "complete",
    itemName: "item-name",
    itemLastName: "item-last_name",
    itemPhone: "item-phone",
  };

  constructor(el, editEl) {
    this.#EContContainer = el;
    this.#editE = editEl;
    this.init();
  }

  init() {
    this.#http = new Http(Contact.url);
    this.addListeners();
    this.#editNameE = this.#editE.querySelector(".edit-name");
    this.#editLastNameE = this.#editE.querySelector(".edit-last_name");
    this.#editPhoneE = this.#editE.querySelector(".edit-phone");
    this.#editE.querySelector(".save");
    this.getContacts();
  }

  addListeners() {
    this.#EContContainer.addEventListener("click", this.onContactClick);
    this.#editE.querySelector(".save").addEventListener("click", this.onSave);
  }
  
  getContacts() {
    this.#http.getAll().then((d) => {
      this.#contacts = d;
      this.renderContacts(this.#contacts);
    });
  }

  renderContacts(contacts) {
    const content = contacts.map((c) => this.createContactElement(c)).join("");
    this.#EContContainer.innerHTML = content;
  }

  createContactElement(contact) {
    return `    <div class="item ${
      contact.isComplete ? this.#CLASSES.contactComplete : ""
    }" id="${contact.id}">
    <div class="item-content">
      <div>
        <div class="item-name"> ${contact.name}</div>
        <div class="item-last_name"> ${contact.lastName}</div>
        <div class="item-phone"> ${contact.phone}</div>
      </div>
    </div>
    <div class="item-actions">
      <div class="close">x</div>
      <button class="complete ${
        contact.isComplete ? this.#CLASSES.hideComplBut : ""
      }">Complete</button>
    </div>
  </div>`;
  }
  onContactClick = (e) => {
    const target = e.target;
    this.#currentContactE = e.target.closest(".item");
    if (this.#currentContactE) {
      this.#currentContact = this.#contacts.find(
        (e) => e.id === this.#currentContactE.id
      );
    }
    if (e.target.classList.contains(this.#CLASSES.close)) {
      this.removeContacts(this.#currentContact.id);
      return;
    }
    if (e.target.classList.contains(this.#CLASSES.complete)) {
      this.completeContact(this.#currentContact);
      return;
    }
    if (
      e.target.classList.contains(this.#CLASSES.itemName) ||
      e.target.classList.contains(this.#CLASSES.itemLastName) ||
      e.target.classList.contains(this.#CLASSES.itemPhone)
    ) {
      this.editContact();
      return;
    }
  };

  removeContacts(id) {
    this.#http.delete(id).then((r) => {
      if (r.deletedCount >= 1) {
        this.#contacts = this.#contacts.filter((c) => c.id !== id);
        this.#currentContactE.remove();
        this.clearData();
      }
    });
  }

  editContact() {
    this.#editE.classList.add(this.#CLASSES.showEdit);
    this.#currentContactE.classList.add(this.#CLASSES.itemActive);
    this.#editNameE.value = this.#currentContact.name;
    this.#editLastNameE.value = this.#currentContact.lastName;
    this.#editPhoneE.value = this.#currentContact.phone;
  }

  completeContact(contact) {
    contact.isComplete = true;
    this.#http.update(contact.id, contact).then((r) => {
      if (r && r.id) {
        this.#currentContactE.classList.add(this.#CLASSES.contactComplete);
        this.clearData();
      }
    });
  }

  createContact(name, lastName, phone) {
    const contact = {
      name,
      lastName,
      phone,
      isComplete: false,
    };
    this.#http.create(contact).then((r) => {
      if (r && r.id) {
        this.#contacts.unshift(r);
        const content = this.createContactElement(r);
        this.#EContContainer.insertAdjacentHTML("afterbegin", content);
      }
    });
  }

  clearData() {
    this.#currentContact = null;
    this.#currentContactE = null;
  }

  onSave = () => {
    this.#currentContact.name = this.#editNameE.value;
    this.#currentContact.lastName = this.#editLastNameE.value;
    this.#currentContact.phone = this.#editPhoneE.value;
    this.#http.update(this.#currentContact.id, this.#currentContact).then((r) => {
      if (r && r.id) {
        this.#currentContactE.querySelector(".item-name").innerHTML = r.name;
        this.#currentContactE.querySelector(".item-last_name").innerHTML = r.lastName;
        this.#currentContactE.querySelector(".item-phone").innerHTML = r.phone;
        this.#editE.classList.remove(this.#CLASSES.showEdit);
        this.#currentContactE.classList.remove(this.#CLASSES.itemActive);
        this.clearData();
      }
    });
  };
}
