// Item lists
const listColumns = document.querySelectorAll('.drag-item-list');


// Item lists
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Initialize arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

// Drag functionality
let draggedItem;
let currentColumn;

// Items
let updatedOnLoad = false;

getSavedColumns();
updateSavedColumns();

// Set localStorage arrays
function updateSavedColumns() {
  arrayNames.forEach((item, index) => {
    localStorage.setItem(`${item}Item`, JSON.stringify(listArrays[index]));
  });
}

// Get arrays from localStorage if avalable, set default if not
function getSavedColumns() {
  backlogListArray = localStorage.getItem('backlogItems') ? JSON.parse(localStorage.backlogItems) : ['Release the course', 'Sit back and relax'];
  progressListArray = localStorage.getItem('backlogItems') ? JSON.parse(localStorage.progressItems) : progressListArray = ['Work on projects', 'Listen to music'];
  completeListArray = localStorage.getItem('backlogItems') ? JSON.parse(localStorage.completeItems) : completeListArray = ['Being cool', 'Getting stuff done'];
  onHoldListArray = localStorage.getItem('backlogItems') ? JSON.parse(localStorage.onHoldItems) : onHoldListArray = ['Being uncool'];
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
}

// On load
updateDOM();