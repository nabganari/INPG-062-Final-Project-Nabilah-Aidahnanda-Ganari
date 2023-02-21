
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
        htmlCode += `<div class="d-relative row ">
        <div class="col-4"></div>
        <div class=" col-6 mt-4 justify-content-center border border-secondary rounded"
            style="width: 500px; height: 40px;">
            <p class=" p-2" style=" color: black;">${list}</p>
        </div>
        <div class="col-2 px-5 mt-4 d-flex justify-content-center">
            <button class=" btn btn-outline-secondary ms-2 px-5" style=" background-color: #069662; color: white;"
                onclick='edit(${ind})' type="button">Edit</button>
            <button class="btn btn-outline-secondary ms-2 px-4" style="background-color: #CC4242;color: white;"
                onclick='deleteTodo(${ind})' type=" button">Delete</button>
        </div>
        <div class="col-1"></div>
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


