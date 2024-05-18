let input = document.querySelector(".writeText");
let btnAdd = document.querySelector(".btnAdd");

let task = document.querySelector(".tasks");
// добавление клик на кнопку
btnAdd.addEventListener("click", function () {
  addTasks();
});
input.addEventListener("keypress", function (event) {
  if (event.code === "Enter") {
    addTasks();
  }
});
//  функция добавления задачи из импута 
function addTasks() {
  if (input.value === "") {
    alert("Введите задачу для выполнения");
  } else {
    let newtask = document.createElement("div");
    newtask.innerHTML = `
        ${input.value}
        <img class="imgDel" src="./img/Trash Icon.png" alt="">
        <img class='imgDid' src="./img/pngwing.com (1).png" width="40px" alt="">
      `;
    newtask.classList.add("task");
    task.appendChild(newtask);
    saveData();
  }
  input.value = "";
//  функция удаления задачи 
  let allDel = document.querySelectorAll(".imgDel");
  allDel.forEach((elem) => {
    elem.addEventListener("click", function () {
      console.log("+");
      elem.parentNode.remove();
    });
  });
//  функция "задача выполнена"
  let allDid = document.querySelectorAll(".imgDid");
  allDid.forEach((elem) => {
    elem.addEventListener("click", function () {
      elem.parentNode.classList.add("didIt");
    });
  });
}

// фунция сохранения массива в localStorage
function saveData() {
  const items = Array.from(task.children).map((elem) => elem.innerHTML);
  console.log(items);
  localStorage.setItem("todoitems", JSON.stringify(items));
}

// вынимаем из localStorage и добавляем на страницу, добавляем удаление и выполнение 
function loadData() {
  const savedItems = JSON.parse(localStorage.getItem("todoitems")) || [];
  savedItems.forEach((items) => {
    let newtask = document.createElement("div");
    newtask.innerHTML = items;
    newtask.classList.add("task");
    task.appendChild(newtask);

    let allDel = document.querySelectorAll(".imgDel");
    allDel.forEach((elem) => {
      elem.addEventListener("click", function () {
        console.log("+");
        elem.parentNode.remove();
        saveData()
      });
    });

    let allDid = document.querySelectorAll(".imgDid");
    allDid.forEach((elem) => {
      elem.addEventListener("click", function () {
        elem.parentNode.classList.add("didIt");
        console.log('did');
        saveData()
      });
    });
  });
}

loadData();
