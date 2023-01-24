
// Initialize arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

getSavedColumns();
updateSavedColumns();

// Set localStorage arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
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

