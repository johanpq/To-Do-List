const buttons = document.querySelectorAll('button')

const addBtn = buttons[0]
const editBtn = buttons[1]
const removeBtn = buttons[2]

const completedTasks = document.querySelector('.svgs')

const result = document.querySelector('.results')

const time = document.querySelector('.time')

let divContainer, divContent, textInput, btnSubmit, closeBtn

let cont

// Manipula o contador para não substituir valores no localStorage
const getCont = localStorage.getItem("cont")
console.log(getCont)

if(getCont !== null) {
    cont = getCont
} else {
    cont = 0
}


let controller = false

function Task() {
    this.task = []
    this.completedTask = []
}

Task.prototype.addTask = function(task, id) {
    this.task.push({task, id})
}

Task.prototype.addCompletedTask = function(task, id) {
    const completedId = id + "completed"
    this.completedTask.push({task, completedId})
    localStorage.setItem(completedId, task)
}

Task.prototype.editTask = function(newTask, divId) {
    this.task.forEach((el) => {
        if (divId === el.id) {
            el.task = newTask
            const taskKey = el.id
            localStorage.setItem(taskKey, newTask)
        }
    })
    this.updateScreen()
}

Task.prototype.removeTask = function(id) {
    const index = this.task.findIndex((el) => el.id === id)
    
    // Remover do array de tarefas
    if (index !== -1) {
        this.task.splice(index, 1)
    }

    // Remover do localStorage
    localStorage.removeItem(id)
    
    // Verifica se o localStorage só tem o contador
    if (localStorage.length === 1 && localStorage.key(0) === "cont") {
        localStorage.clear()
    }
    
    this.updateScreen()  // Atualiza a tela após a remoção
}


Task.prototype.showAllTasks = function() {
    return this.task.map(({task, id}) => {
        return {task, id} // Retorna um array de objetos
    })
}

Task.prototype.showElements = function(value) {
    result.innerHTML = ''

    this.PutElementslocalStorage(value)
    const pickTasks = this.showAllTasks()

    if (value !== '' && value !== undefined) {
        pickTasks.map(({task, id}) => {
            const containerElements = document.createElement('div')
            containerElements.classList.add('container-elements')
            containerElements.setAttribute('data-container-id', id)
            const divElement = document.createElement('div')
            const doneImg = document.createElement('img')
            doneImg.setAttribute('src', 'assets/images/done_FILL0_wght400_GRAD0_opsz24.png')
            doneImg.setAttribute('data-id-doneImg', id);
            doneImg.classList.add('imgDone')

            doneImg.addEventListener("click", (event) => {
                const getValue = event.target
                const getValueAttr = getValue.getAttribute('data-id-doneImg')
                
                this.addCompletedTask(task, getValueAttr)
                this.removeTask(id)  // Remove a tarefa depois de adicionar a tarefa concluída
                
                this.updateScreen()  // Atualiza a tela para refletir a remoção
            })
            
            divElement.innerHTML = task
            
            result.appendChild(containerElements)
            containerElements.appendChild(divElement)
            containerElements.appendChild(doneImg)
        });
    }
}

Task.prototype.showCompletedElements = function() {
    divContent.innerHTML = ''; // Limpar o conteúdo atual do modal

    // Recarregar todas as tarefas concluídas do localStorage
    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i)

        if (key.includes("completed")) {
            const task = localStorage.getItem(key)

            const contents = document.createElement('div')
            contents.classList.add('contents')
            contents.setAttribute('id-contents', key)

            const img = document.createElement('img')
            img.setAttribute('src', 'assets/images/close_FILL0_wght400_GRAD0_opsz24.png')
            img.setAttribute('data-remove-id', key) // Ajusta aqui para pegar o ID correto
            img.classList.add('icons')
            
            // Pegar data-remove-id IMG and Contents Container
            img.addEventListener('click', (imgEvent) => {
                const pickContainerContents = imgEvent.target.parentElement
                
                const pickImgId = imgEvent.target.getAttribute('data-remove-id')
                pickContainerContents.remove()
                newTask.removeTask(pickImgId)
                newTask.updateScreen()
            })
         
            const divElement = document.createElement('div')
            divElement.classList.add('task')
            divElement.textContent = task
            
            contents.appendChild(divElement)
            contents.appendChild(img);
            
            divContent.appendChild(contents) 
        }
    }
}

Task.prototype.PutElementslocalStorage = function(value) {
    localStorage.setItem("cont", ++cont)

    const pickTasksStorage = value
    const pickIdStorage = "task" + cont

    localStorage.setItem(pickIdStorage, pickTasksStorage)

    // Limpa as tarefas anteriores para evitar duplicação
    this.task = []

    for (let i = 0; i < localStorage.length; i++) {
        const pickIdStorage = localStorage.key(i)
        const pickValueStorage = localStorage.getItem(pickIdStorage)

        if (pickIdStorage !== "cont" && !(pickIdStorage.includes("completed"))) {
            this.addTask(pickValueStorage, pickIdStorage)
            console.log(this.task)
        }
    }
}

Task.prototype.updateScreen = function() {
    result.innerHTML = '' // Limpar o conteúdo atual da tela principal

    const pickTasks = this.showAllTasks()

    pickTasks.forEach(({task, id}) => {
        if (!id.includes("completed")) {
            const containerElements = document.createElement('div')
            containerElements.classList.add('container-elements')
            containerElements.setAttribute('data-container-id', id)

            const divElement = document.createElement('div')
            const doneImg = document.createElement('img')
            doneImg.setAttribute('src', 'assets/images/done_FILL0_wght400_GRAD0_opsz24.png')
            doneImg.setAttribute('data-id-doneImg', id)
            doneImg.classList.add('imgDone')

            doneImg.addEventListener("click", (event) => {
                const getValue = event.target
                const getValueAttr = getValue.getAttribute('data-id-doneImg')
                this.addCompletedTask(task, getValueAttr)
                this.removeTask(id) 
                this.updateScreen()  // Atualiza a tela após a remoção
            });

            divElement.innerHTML = task

            result.appendChild(containerElements)
            containerElements.appendChild(divElement)
            containerElements.appendChild(doneImg)
        }
    });
}


// Criação de uma instância de Task
let newTask = new Task();

document.addEventListener('DOMContentLoaded', () => {
    newTask.task = []
    newTask.completedTask = []
    console.log(newTask.completedTask)
    for (let i = 0; i < localStorage.length; i++) {
        const pickIdStorage = localStorage.key(i)
        const pickValueStorage = localStorage.getItem(pickIdStorage)

        if (pickIdStorage !== "cont" && !pickIdStorage.includes("completed")) {
            newTask.addTask(pickValueStorage, pickIdStorage)
        } else if (pickIdStorage.includes("completed")) {
            // Limpar array para não duplicar
            const cleanedId = pickIdStorage.replace('completed', '') 
            // Carregar tarefas concluídas
            newTask.addCompletedTask(pickValueStorage, cleanedId)
        }
    }
    newTask.updateScreen();
});

const addElements = addBtn.addEventListener('click', () => {
    createAddElements()

    btnSubmit.addEventListener('click', () => {
        newTask.showElements(textInput.value)
    })

    closeBtn.addEventListener('click', () => divContainer.remove())
    
})

const editElements = editBtn.addEventListener('click' , () => {
    const isThere = isThereElement()
    if(!isThere) {
        return
    }
    
    CreateEditElements()
    
    const pickTasks = newTask.showAllTasks()
    pickTasks.map(({task, id}) => {
        if(!(id.includes("completed"))) {
            const contents = document.createElement('div')
            contents.classList.add('contents')
            contents.setAttribute('id-contents', id)
            divContent.appendChild(contents)
    
            const divElement = document.createElement('div')
            divElement.setAttribute('data-div-id', id)
            divElement.classList.add('DivElement')
    
            const img = document.createElement('img')
            img.setAttribute('src', 'assets/images/edit_FILL0_wght400_GRAD0_opsz24 (1).png')
            img.setAttribute('data-edit-id', id)
            img.classList.add('icons')
    
            // Pegar data-edit-id IMG and Contents Container
            img.addEventListener('click' ,(img) => {
                const pickDivElement = img.target.previousElementSibling
    
                const pickDivElementId = pickDivElement.getAttribute('data-div-id')
                
                pickDivElement.setAttribute('contenteditable', 'true')
    
                const previousElement = pickDivElement.textContent
    
                // Limpa o conteúdo e reatribui para reposicionar o cursor
                pickDivElement.innerText = '' // Limpa o conteúdo do elemento
                const originalText = previousElement // Salva o texto original
                pickDivElement.innerText = originalText // Adiciona o texto de volta ao elemento
                            
                // Seleciona o texto e move o cursor para o final
                const selection = window.getSelection()
                const range = document.createRange()
                range.selectNodeContents(pickDivElement)
                range.collapse(false) // Move o cursor para o final
                selection.removeAllRanges()
                selection.addRange(range)
    
                const doneImg = document.createElement('img')
                doneImg.setAttribute('src', 'assets/images/done_FILL0_wght400_GRAD0_opsz24.png')
                doneImg.classList.add('icons')
                doneImg.addEventListener('click', () => {
                    newTask.editTask(pickDivElement.textContent, pickDivElementId)
                    
                    contents.removeChild(doneImg)
                    contents.removeChild(closeImg)
                    pickDivElement.setAttribute('contenteditable', 'false')
                    img.target.style.display = 'block'
                })
    
                closeImg.addEventListener('click', () => {
                    contents.removeChild(doneImg)
                    contents.removeChild(closeImg)
                    pickDivElement.innerHTML = previousElement
                    pickDivElement.setAttribute('contenteditable', 'false')
                    img.target.style.display = 'block'
                })
                
                img.target.style.display = 'none'
                contents.appendChild(doneImg)
                contents.appendChild(closeImg)
            })
    
    
            divElement.innerHTML = task
    
            contents.appendChild(divElement)
            contents.appendChild(img)
            
        }
    })
})

const removeElements = removeBtn.addEventListener('click', () => {
    const isThere = isThereElement()
    if(!isThere) {
        return
    }

    createRemoveElements()
    
    const pickTasks = newTask.showAllTasks()
    pickTasks.map(({task, id}) => {
        if(!(id.includes("completed"))) {
            const contents = document.createElement('div')
            contents.classList.add('contents')
            contents.setAttribute('id-contents', id)
            divContent.appendChild(contents)
    
            const divElement = document.createElement('div')
            divElement.classList.add('DivElement')
    
            const img = document.createElement('img')
            img.setAttribute('src', 'assets/images/close_FILL0_wght400_GRAD0_opsz24.png')
            img.setAttribute('data-remove-id', id)
            img.classList.add('icons')
            
            // Pegar data-remove-id IMG and Contents Container
            img.addEventListener('click' ,(img) => {
                const pickContainerContents = img.target.parentElement
                
                const pickImg = img.target
                const pickImgId = pickImg.getAttribute('data-remove-id')
                pickContainerContents.remove()
                newTask.removeTask(pickImgId)
                newTask.updateScreen()
            })
         
            divElement.innerHTML = task
    
            contents.appendChild(divElement)
            contents.appendChild(img)

        }
    })
    
    closeBtn.addEventListener('click', () => divContainer.remove())
})


const createCompletedTasks = completedTasks.addEventListener('click', () => {
    const isThere = isThereElement()
    if(!isThere) {
        return
    }
    CreateEditElements()
    newTask.updateScreen()
    newTask.showCompletedElements();
})


// Cria modal para o btn de adicionar
function createAddElements() {
    divContainer = document.createElement('div')
    divContainer.classList.add('modal')

    divContent = document.createElement('div')
    divContent.classList.add('modal-content')
    
    textInput = document.createElement('input')
    textInput.setAttribute('type', 'text')
    textInput.setAttribute('placeholder', 'Task')
    textInput.classList.add('TextInput')

    btnSubmit = document.createElement('button')
    btnSubmit.classList.add('SubmitInput')

    btnSubmit.innerHTML = "Submit"

    closeBtn = document.createElement('button')
    closeBtn.classList.add('close')

    closeBtn.innerHTML = "Close"

    document.body.appendChild(divContainer)
    divContainer.appendChild(divContent)
    divContent.appendChild(textInput)
    divContent.appendChild(btnSubmit)
    divContent.appendChild(closeBtn)
    textInput.focus()
}

// Cria o modal para o btn de editar
function CreateEditElements() {
    divContainer = document.createElement('div')
    divContainer.classList.add('ModalContainerWithElements')

    divContent = document.createElement('div')
    divContent.classList.add('BtnModalContent')
    divContainer.appendChild(divContent)

    closeImg = document.createElement('img')
    closeImg.setAttribute('src', 'assets/images/close_FILL0_wght400_GRAD0_opsz24.png')
    closeImg.classList.add('icons')

    closeBtn = document.createElement('button')
    closeBtn.classList.add('closeEditModal')
    closeBtn.innerHTML = "Close"
    closeBtn.addEventListener('click', () => divContainer.remove())
    divContainer.appendChild(closeBtn)


    document.body.appendChild(divContainer)
}

// Cria o modal para o btn de remover
function createRemoveElements() {
    divContainer = document.createElement('div')
    divContainer.classList.add('ModalContainerWithElements')

    divContent = document.createElement('div')
    divContent.classList.add('BtnModalContent')
    divContainer.appendChild(divContent)


    closeBtn = document.createElement('button')
    closeBtn.classList.add('closeEditModal')
    closeBtn.innerHTML = "Close"

    divContainer.appendChild(closeBtn)

    document.body.appendChild(divContainer)
}

// Checa se há elementos no localStorage
function isThereElement() {
    if(localStorage.length > 0) {
        return true;
    }
}

// Atualiza a hora a cada 1s
const UpdateHour = () => {
    const NewTime = new Date();
    let Hour = NewTime.getHours();
    let Minutes = NewTime.getMinutes();

    Hour = Hour < 10 ? '0' + Hour : Hour;
    Minutes = Minutes < 10 ? '0' + Minutes : Minutes;

    time.innerHTML = Hour + ":" + Minutes;
}
setInterval(UpdateHour, 1000); /* Update the hour 1 to 1 sec */
UpdateHour();
