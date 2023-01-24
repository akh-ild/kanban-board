// Item lists
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');

// Item lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Initialize arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag functionality
let draggedItem;
let currentColumn;

// Items
let updatedOnLoad = false;

getSavedColumns();
updateSavedColumns();

// Get arrays from localStorage if avalable, set default if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
}

// Update columns in DOM - reset HTML, filter array, update localStorage
function updateDOM() {
  // Check localStorege once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog list
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem) => {
    createItemEl(backlogList, backlogItem);
  });

  // Progress list
  progressList.textContent = '';
  progressListArray.forEach((progressItem) => {
    createItemEl(progressList, progressItem);
  });

  // Complete list
  completeList.textContent = '';
  completeListArray.forEach((completeItem) => {
    createItemEl(completeList, completeItem);
  });

  // OnHold list
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem) => {
    createItemEl(onHoldList, onHoldItem);
  });

  // Run getSavedColumns only once, update local storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Allows arrays to reflect drag and drop items
function rebuildArrays() {
  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}

// Create DOM elements for each list item
function createItemEl(columnEl, item) {
  // List item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  // Append
  columnEl.appendChild(listEl);
}

// When item starts dragging
function drag(e) {
  draggedItem = e.target;
}

// Column allow for item to drop
function allowDrop(e) {
  e.preventDefault();
}

// When item enters column area
function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// Dropping item in column
function drop(e) {
 e.preventDefault();
 // Remove backgroud color/padding
 listColumns.forEach((column) => {
  column.classList.remove('over');
 });
 // Add item to column
 const parent = listColumns[currentColumn];
 parent.appendChild(draggedItem);
 rebuildArrays();
}

// Show add item input box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// Hide item input box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// Add to column list, reset textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();
}

// On load
updateDOM();