"use strict";

const todo_container = document.getElementById("card-container");
// ----------------------------------
function AddList(todo) {
  const input = todo.querySelector("input");

  const todo_task = input.value;

  if (todo_task != null && todo_task.length > 0) {
    input.value = "";
    InsertCard(todo, todo_task);
  }
}

// --------------------------------

const InsertTodo = (todo_name, lists = null) => {
  const card = `
        <div class="header flex">
          <h2 class="list-name">${todo_name}</h2>
          <div class="add" id="add">
            <input
              type="text"
              placeholder="Add todo"
              autocomplete="off"
            />
           
          </div>
        </div>
        <div class="lists">
          <ul id="list-container"></ul>
        </div>

	`;

  const card_container = document.createElement("div");
  card_container.className = "card";
  card_container.innerHTML = card;
  card_container.scrollIntoView({ behavior: "smooth", inline: "end" });

  const add = card_container.querySelector(".add");
  const add_button = document.createElement("div");
  add_button.className = "add-btn";
  add_button.dataset.todo_name = todo_name;

  add_button.innerHTML = `<i class="fa-solid fa-plus"></i>`;

  add_button.addEventListener("click", function () {
    AddList(this.parentNode.parentNode.parentNode);
  });

  add.appendChild(add_button);

  const card_delete_btn = document.createElement("div");
  card_delete_btn.className = "card-delete-btn";
  card_delete_btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;

  card_delete_btn.addEventListener("click", function () {
    RemoveTask(this.parentNode);
  });
  card_container.appendChild(card_delete_btn);

  todo_container.appendChild(card_container);

  if (lists != null) {
    lists.forEach((element) => {
      InsertCard(card_container, element);
    });
  }
};

// -----------------------------------
function CompleteTask(obj) {
  obj.classList.toggle("complete");
}
// -----------------------------------
function RemoveTask(obj) {
  obj.remove();
}
// -----------------------------
const InsertCard = (todo, todo_list) => {
  const list_container = todo.querySelector("#list-container");

  //   const card = `
  //   	<span class="todo complete" onclick="CompleteTask()">
  // 		${todo_list}
  // 	</span>
  //     <div class="btn">
  //     	<i class="fa-solid fa-xmark"></i>
  //     </div>
  // `;
  const cardElement = document.createElement("li");
  cardElement.className = "list";

  const task = document.createElement("span");
  task.className = "todo";
  task.textContent = todo_list;
  task.addEventListener("click", function () {
    CompleteTask(this);
  });
  cardElement.appendChild(task);

  const delete_btn = document.createElement("div");
  delete_btn.className = "btn";
  delete_btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  cardElement.appendChild(delete_btn);
  delete_btn.addEventListener("click", function () {
    RemoveTask(cardElement);
  });

  list_container.appendChild(cardElement);
};

// ------------------------------------

const shopping_list = ["buy an apple", "buy coconut oil"];
InsertTodo("Shopping", shopping_list);

const daily_list = ["wake up 5AM", "WorkOut at 5PM"];
InsertTodo("habits", daily_list);

// -----------------------------------

document.getElementById("add-card-btn").addEventListener("click", function () {
  const input = this.parentNode.querySelector("input");
  const todo = input.value;
  if (todo != null && todo.length > 0) {
    InsertTodo(todo);
    input.value = "";
  }
});
