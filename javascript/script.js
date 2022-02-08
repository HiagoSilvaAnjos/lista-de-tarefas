const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const tasksContainer = document.querySelector('.task-list');


// VALIDAÇÃO DO INPUT

/*

Essa constante vai receber uma função que vai verificar se o valor do input é maior que 0 caracteres
Se for maior, retorna true
Se não retorna, false

*/
const validateInput = () => inputElement.value.trim().length > 0;


const handleAddTask = () => {
    const inputIsvalid = validateInput();

    if (!inputIsvalid) {
        return inputElement.classList.add('error');
    }

    // Criando div 
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    // Criando parágrafo
    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    // Criando o íconi de lixeira
    const deleteItem = document.createElement('i');
    deleteItem.classList.add("bx");
    deleteItem.classList.add("bxs-trash");

    // Juntando tudo na div criada
    /*
    <div>
    <p></p>
    <i></i>
    </div>
    */
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
 
    // Adicionando a div taskItemContainer em tasksContainer
    tasksContainer.appendChild(taskItemContainer);
 
    // Após a tarefa ser criada o campo input vai ser limpo
    inputElement.value = "";


    // Concluir tarefa
    /*
    Ao clicar no taskContent (parágrafo), vai executar uma função anônima que vai executar a função handleClick()
    passando como parâmetro o próprio elemento clicado
    */
    taskContent.addEventListener('click', () => handleClick(taskContent));

    // Excluir tarefa
    /*
    Ao clicar no deleteItem (íconi), vai executar uma função anônima que vai executar a função handleDeleteClick()
    passando como parâmetro o próprio elemento clicado
    */
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    // Atualizar local storage
    updateLocalStorage();

}

/*
A função handleClick vai ter uma constante que vai receber todos os elementos filhos de tasksContainer (todas as tarefas adicionadas)
Vai entrar num loop que vai comparar o primeiro nó do elemento
se esse primeiro ele for igual ao elemento clicado, vai alterar a classe
*/
const handleClick = (taskContent) => {

    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const curretTaskIsBeingClicked = task.firstChild === taskContent
        if (curretTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed')
        }
    }

    updateLocalStorage();
}

/*
A função handleDeleteClick vai ter uma constante que vai receber todos os elementos filhos de tasksContainer (todas as tarefas adicionadas)
Vai entrar num loop que vai comparar o primeiro nó do elemento
se esse primeiro ele for igual ao elemento clicado, vai excluir a div
*/
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const curretTaskIsBeingClicked = task.firstChild === taskContent
        if (curretTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}



// Remover mensagem de erro
const handleInputChange = () => {
    const inputIsvalid = validateInput();

    if (inputIsvalid) {
        return inputElement.classList.remove('error');
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
  
    const localStorageTasks = [...tasks].map((task) => {
      const content = task.firstChild;
      const isCompleted = content.classList.contains("completed");
    
      return { description: content.innerText, isCompleted };
    });
    console.log(JSON.stringify(localStorageTasks))
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  };
  
  const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasksFromLocalStorage)

    if (!tasksFromLocalStorage) return;
  
    for (const task of tasksFromLocalStorage) {
      const taskItemContainer = document.createElement("div");
      taskItemContainer.classList.add("task-item");
  
      const taskContent = document.createElement("p");
      taskContent.innerText = task.description;
  
      if (task.isCompleted) {
        taskContent.classList.add("completed");
      }
  
      const deleteItem = document.createElement("i");
      deleteItem.classList.add("bx");
      deleteItem.classList.add("bx-trash");
      
      
      taskItemContainer.appendChild(taskContent);
      taskItemContainer.appendChild(deleteItem);
      
      tasksContainer.appendChild(taskItemContainer);
      
      taskContent.addEventListener("click", () => handleClick(taskContent));

      deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent)
      );
    }
  };
  
  refreshTasksUsingLocalStorage();



addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());