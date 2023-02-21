
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let todoArray = [];

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    todoArray = (todo === null) ? todoArray = [] : todoArray = JSON.parse(todo)
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    console.log(todoArray);
    displayTodo();
});

function displayTodo() {
    let todo = localStorage.getItem("todo");
    todoArray = (todo === null) ? todoArray = [] : todoArray = JSON.parse(todo)

    let htmlCode = "";
    todoArray.forEach((list, ind) => {
        htmlCode += `<div>
        <p>${list}</p>
        <button class="btn btn-outline-secondary" onclick='edit(${ind})' type="button">Edit</button>
        <button class="btn btn-outline-secondary" onclick='deleteTodo(${ind})' type="button">Delete</button>
    </div>`;
    });
    listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
}

function edit(ind) { 
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
}

saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray)); 
    displayTodo();
    });


