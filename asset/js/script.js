const category = document.querySelector("#category");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const date = document.querySelector("#date");
const idInput = document.querySelector("#idInput");
const cardContainerUnc = document.querySelector(".card__containerUnc");
const cardContainerCom = document.querySelector(".card__containerCom");
const totalTaskUnc = document.querySelector("#totalBlogUnc");
const totalTaskCom = document.querySelector("#totalBlogCom");
const addButton = document.querySelector(".addButton");
const form = document.querySelector("form");

// UNCOMPLETED
// Read a Data
const LOCALSTORAGE = "TODO_APP";
let dataTask;

readData();
function readData() {
  let storageData = JSON.parse(localStorage.getItem(LOCALSTORAGE));
  if (storageData != null) {
    dataTask = storageData;
    showData(storageData);
  } else {
    dataTask = [];
  }
}

// Create template for data
function showData(data) {
  let cardData = "";
  totalTaskUnc.innerHTML = data.length;
  if (data.length > 0) {
    data.forEach((task, index) => {
      cardData += `<div class="card">
      <input type="hidden" value="${index}" id="idValue" />
            <div class="card__main">
              <h4 class="card__category">${task.category}</h4>
              <h3 class="card__title">${task.title}</h3>
              <p class="card__desc">
              ${task.desc}
              </p>
            </div>
            <hr />
            <div class="card__identitas">
              <div class="card__img">
                <img src="asset/images/lupi.jpg" alt="Luffy" />
                <small>NoerraCode.</small>
              </div>
              <small class="card__date">${task.date}</small>
            </div>
    
            <div class="tooltip">
              <div class="tooltip__content">
                <a href="#addtask" onclick="editData(${index})">Edit</a>
                <a href="#" onclick="deleteData(${index})">Hapus</a>
              </div>
              <div class="tooltip__hover">
                <span></span>
              </div>
            </div>

            <a href="#" class="checked" onclick="clickChecked(${index})">
             <i class="bi bi-check2-all"></i>
            </a>
          </div>`;
    });
  } else {
    cardData += `<p class="danger">Add new blog!</p>`;
  }

  cardContainerUnc.innerHTML = cardData;
}

// Add task
let isUpdate = false;
form.addEventListener("submit", addData);
function addData(e) {
  e.preventDefault();

  const categoryValue = category.value.trim();
  const titleValue = title.value.trim();
  const descValue = desc.value.trim();
  const dateValue = formatDate(new Date(), new Date().toLocaleTimeString());
  const idValue = idInput.value;

  const task = {
    category: categoryValue,
    title: titleValue,
    desc: descValue,
    date: dateValue,
  };

  if (isUpdate) {
    updateStorage(LOCALSTORAGE, idValue, task);
    alertMessage("Updated Data!");
  } else if (isUpdateCompleted) {
    updateStorageCompleted(LOCALSTORAGECOMPLETED, idValue, task);
    alertMessage("Updated Data!");
  } else {
    addStorage(LOCALSTORAGE, task);
    alertMessage("Added Data!");
  }

  resetForm();
}

// Delete Card
function deleteData(id) {
  const task = JSON.parse(localStorage.getItem(LOCALSTORAGE));
  task.splice(id, 1);
  localStorage.setItem(LOCALSTORAGE, JSON.stringify(task));
  readData();
  alertMessage("Deleted Data!");
}

// Delete all Card
const removeAll = document.querySelector(".removeAll");
removeAll.addEventListener("click", removeAllData);
function removeAllData(e) {
  e.preventDefault();

  const confirmUser = confirm("yakin?");

  if (!confirmUser) return false;

  dataTask = [];
  localStorage.setItem(LOCALSTORAGE, JSON.stringify(dataTask));
  readData();
  alertMessage("Deleted All Data!");
}

// if Click the button edit, will do update the form, change isUpdate, and change the button
function editData(id) {
  isUpdate = true;

  const task = JSON.parse(localStorage.getItem(LOCALSTORAGE))[id];

  idInput.value = id;
  category.value = task.category;
  title.value = task.title;
  desc.value = task.desc;

  addButton.textContent = "Update Task";
}

// if click the addTask button, change the var isUpdate, resetForm, and textContent
const addTask = document.querySelector("#addTask");
addTask.addEventListener("click", function (e) {
  isUpdate = false;
  isUpdateCompleted = false;
  resetForm();

  addButton.textContent = "Add Task";
});

// Reset the form
function resetForm() {
  category.value = "";
  title.value = "";
  desc.value = "";
  document.location.href = "#";
}

// Reset field
const close = document.querySelector(".close");
close.addEventListener("click", function () {
  isUpdate = false;
});

// UpdateStorage
function updateStorage(key, index, value) {
  const array = JSON.parse(localStorage.getItem(key));
  array[index] = value;

  localStorage.setItem(key, JSON.stringify(array));
  readData();
}

function updateStorageCompleted(key, index, value) {
  const array = JSON.parse(localStorage.getItem(key));
  array[index] = value;

  localStorage.setItem(key, JSON.stringify(array));
  readDataCompleted();
}

function addStorage(key, value) {
  dataTask.unshift(value);
  localStorage.setItem(key, JSON.stringify(dataTask));
  readData();
}

// Get Data Format
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "July",
  "Augustus",
  "September",
  "October",
  "November",
  "December",
];

// Call Date
const formatDate = (date, time) => {
  let formatted_date = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} | ${time}`;
  return formatted_date;
};

function alertMessage(message) {
  const alert = document.querySelector(".container__alert");
  const closeAlert = document.querySelector(".alert__close a");
  const alertContent = document.querySelector(".alert__main p");
  alert.classList.add("active");
  alertContent.textContent = `Success: ${message}`;

  closeAlert.addEventListener("click", function (e) {
    e.preventDefault();
    alert.classList.remove("active");
  });

  setTimeout(() => {
    alert.classList.remove("active");
  }, 2000);
}

// COMPLETED
const LOCALSTORAGECOMPLETED = "TODO_APP_COMPPLETED";
let isUpdateCompleted = false;
let dataTaskCompleted;
readDataCompleted();
function readDataCompleted() {
  const storageCompleted = JSON.parse(
    localStorage.getItem(LOCALSTORAGECOMPLETED)
  );

  if (storageCompleted == null) {
    dataTaskCompleted = [];
  } else {
    dataTaskCompleted = storageCompleted;
    showDataCompleted(storageCompleted);
  }
}

function showDataCompleted(data) {
  let cardData = "";
  totalTaskCom.innerHTML = data.length;
  if (data.length > 0) {
    data.forEach((task, index) => {
      cardData += `<div class="card">
            <div class="card__main">
              <h4 class="card__category">${task.category}</h4>
              <h3 class="card__title">${task.title}</h3>
              <p class="card__desc">
              ${task.desc}
              </p>
            </div>
            <hr />
            <div class="card__identitas">
              <div class="card__img">
                <img src="asset/images/lupi.jpg" alt="Luffy" />
                <small>NoerraCode.</small>
              </div>
              <small class="card__date">${task.date}</small>
            </div>
    
            <div class="tooltip">
              <div class="tooltip__content">
                <a href="#addtask" onclick="editDataCompleted(${index})">Edit</a>
                <a href="#" onclick="deleteDataCompleted(${index})">Hapus</a>
              </div>
              <div class="tooltip__hover">
                <span></span>
              </div>
            </div>
          </div>`;
    });
  } else {
    cardData += `<p class="danger">Yuk Blog Uncompletednya di Selesain!</p>`;
  }

  cardContainerCom.innerHTML = cardData;
}

function clickChecked(id) {
  const taskUnc = JSON.parse(localStorage.getItem(LOCALSTORAGE));
  let newTask = taskUnc[id];

  // // Add data to new LocalStorage
  dataTaskCompleted.unshift(newTask);
  localStorage.setItem(
    LOCALSTORAGECOMPLETED,
    JSON.stringify(dataTaskCompleted)
  );
  readDataCompleted();

  // // deleteData and remove
  taskUnc.splice(id, 1);
  localStorage.setItem(LOCALSTORAGE, JSON.stringify(taskUnc));
  readData();
}

// Delete cardCompleted
function deleteDataCompleted(id) {
  const task = JSON.parse(localStorage.getItem(LOCALSTORAGECOMPLETED));
  task.splice(id, 1);
  localStorage.setItem(LOCALSTORAGECOMPLETED, JSON.stringify(task));
  readDataCompleted();
  alertMessage("Deleted Data!");
}

// DeleteAll CardCompleted

const removeAllCompleted = document.querySelector(".removeAllCompleted");
removeAllCompleted.addEventListener("click", deleteAllDataCompleted);
function deleteAllDataCompleted(e) {
  e.preventDefault();

  const confirmUser = confirm("yakin?");

  if (!confirmUser) return false;

  dataTaskCompleted = [];

  localStorage.setItem(
    LOCALSTORAGECOMPLETED,
    JSON.stringify(dataTaskCompleted)
  );
  readDataCompleted();
  alertMessage("Deleted All Data!");
}
function editDataCompleted(id) {
  isUpdateCompleted = true;

  const task = JSON.parse(localStorage.getItem(LOCALSTORAGECOMPLETED))[id];

  idInput.value = id;
  category.value = task.category;
  title.value = task.title;
  desc.value = task.desc;

  addButton.textContent = "Update Task";
}
