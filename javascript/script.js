const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const validateInput = () => {
    return inputElement.value.trim().length > 0
}


console.log(validateInput())