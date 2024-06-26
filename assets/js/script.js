const Main = document.querySelector('main');
console.log(Main);
const Btn = document.querySelectorAll('button');
const AddBtn = Btn[0];
const EditBtn = Btn[1];
const RemoveBtn = Btn[2];
const Result = document.querySelector('.results');
const Time = document.querySelector('div.time');

const modal = document.getElementById('myModal');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.close');

const SubmitInput = document.createElement('input');

let List = [];

//console.log(List);

AddBtn.addEventListener('click', () => {
    const Div = document.createElement('div');
    Div.classList.add('modal');
    
    const ModalContent = document.createElement('div');
    ModalContent.classList.add('modal-content');

    const Overlay = document.createElement('div');
    Overlay.classList.add('overlay');

    const textInput = addTextInput();
    
    const submitInput = addSubmitInput();

    submitInput.addEventListener('click', () => {
        if(textInput.value.trim() !== "") {
            List.push(textInput.value.trim());
            Result.innerHTML = "";
            Print();
        }
    })
    

    const CloseModal = document.createElement('button');
    CloseModal.classList.add('close');
    CloseModal.innerHTML = "Close";

    CloseModal.addEventListener('click', () => closeModal(Div, CloseModal, Overlay));

    Main.appendChild(Div);
    Div.appendChild(ModalContent);
    ModalContent.appendChild(textInput);
    ModalContent.appendChild(submitInput);
    ModalContent.appendChild(CloseModal);
    Main.appendChild(Overlay);

    textInput.focus();
})

function addTextInput() {
    const TextInput = document.createElement('input');

    TextInput.setAttribute('type', 'text');
    TextInput.setAttribute('placeholder', "Type here");
    TextInput.classList.add('TextInput');

    return TextInput;
}

function addSubmitInput() {
    const SubmitInput = document.createElement('input');

    SubmitInput.setAttribute('type', 'submit');
    SubmitInput.setAttribute('value', "Submit");
    SubmitInput.classList.add('SubmitInput');

    return SubmitInput
}

const CreateEditModal = EditBtn.addEventListener('click', () => {
    if(List.length == 0) {
        ModalAlert();
    } else {
        const Div = document.createElement('div');
        Div.classList.add('ModalContainerEditBtn');
        
        const ModalContent = document.createElement('div');
        ModalContent.classList.add('EditBtnModalContent');

        const Overlay = document.createElement('div');
        Overlay.classList.add('overlay'); 

        List.map((Element, indice) => {
            const Contents = document.createElement('div');
            Contents.classList.add('contents');
            const DivElement = document.createElement('div');
            DivElement.classList.add('DivElement');
            DivElement.classList.add('edit' + indice);

            const Emoji = document.createElement('img'); 
            Emoji.classList.add('img');      
            Emoji.classList.add('edit' + indice); 
            Emoji.setAttribute('src', 'assets/images/edit_FILL0_wght400_GRAD0_opsz24 (1).png');    

            DivElement.innerHTML = Element;  

            Emoji.addEventListener('click', (event) => {
                const target = event.target;
                const ClassList = target.classList; 
                
                for(let i of ClassList) {
                    const Icon1 = document.createElement(   'img');
                    Icon1.innerHTML = "Done";
                    Icon1.setAttribute('src', 'assets/images/done_FILL0_wght400_GRAD0_opsz24.png');
                    const Icon2 = document.createElement('img');
                    Icon2.innerHTML = "Close";
                    Icon2.setAttribute('src', 'assets/images/close_FILL0_wght400_GRAD0_opsz24.png');

                    if(DivElement.classList.contains(i)) {
                        DivElement.setAttribute('contenteditable', 'true');
                        const PreviousElement = DivElement.textContent; 

                        // Limpa o conteúdo e reatribui para reposicionar o cursor
                        DivElement.innerText = ''; // Limpa o conteúdo do elemento
                        const originalText = PreviousElement; // Salva o texto original
                        DivElement.innerText = originalText; // Adiciona o texto de volta ao elemento
                        
                        // Seleciona o texto e move o cursor para o final
                        const selection = window.getSelection();
                        const range = document.createRange();
                        range.selectNodeContents(DivElement);
                        range.collapse(false); // Move o cursor para o final
                        selection.removeAllRanges();
                        selection.addRange(range);
                        

                        Emoji.style.display = 'none';
                        Icon1.classList.add('icons');
                        Icon1.addEventListener('click', () => {
                            Icon1.style.display = 'none';
                            Icon2.style.display = 'none';
                            Emoji.style.display = 'block';
                            DivElement.setAttribute('contenteditable', 'false');
                            
                            List[indice] = DivElement.textContent;

                            //Reexibe os elementos na exibição
                            Print();
                        })

                        Icon2.classList.add('icons');
                        Icon2.addEventListener('click', () => {
                            Icon1.style.display = 'none';
                            Icon2.style.display = 'none';
                            Emoji.style.display = 'block';
                            DivElement.textContent = PreviousElement;
                            DivElement.setAttribute('contenteditable', 'false');
                        })

                        DivElement.focus();
                        Contents.appendChild(Icon1);
                        Contents.appendChild(Icon2);
                    }
                }
            }) 
            
            ModalContent.appendChild(Contents);
            Contents.appendChild(DivElement);         
            Contents.appendChild(Emoji); 
        })

        const CloseModal = document.createElement('button');
        CloseModal.classList.add('closeEditModal');
        CloseModal.innerHTML = "Close";

        CloseModal.addEventListener('click', () => closeModal(Div, CloseModal, Overlay));

        Main.appendChild(Div);
        Div.appendChild(ModalContent);
        Div.appendChild(CloseModal);
        Main.appendChild(Overlay);
    }
}) 

const CreateRemoveModal = RemoveBtn.addEventListener('click', () => {
    if(List.length == 0) {
        ModalAlert();
    } else {
        const Div = document.createElement('div');
        Div.classList.add('ModalContainerEditBtn');
        
        const ModalContent = document.createElement('div');
        ModalContent.classList.add('EditBtnModalContent');

        const Overlay = document.createElement('div');
        Overlay.classList.add('overlay'); 

        List.map((Elements, indice) => {
            const Contents = document.createElement('div');
            Contents.classList.add('contents');
            const DivElement = document.createElement('div');
            DivElement.classList.add('DivElement');
            DivElement.classList.add('edit' + indice);
            
            const Emoji = document.createElement('img'); 
            Emoji.classList.add('img');      
            Emoji.classList.add('edit' + indice); 
            Emoji.setAttribute('src', 'assets/images/close_FILL0_wght400_GRAD0_opsz24.png');

            DivElement.innerHTML = Elements;

            Emoji.addEventListener('click', (evt) => {
                const ElementSelected = evt.target;
                const ClassList = ElementSelected.classList;

                RemoveElement(ElementSelected, Contents);

            })

            ModalContent.appendChild(Contents);
            Contents.appendChild(DivElement);         
            Contents.appendChild(Emoji);
        })

        const CloseModal = document.createElement('button');
        CloseModal.classList.add('closeEditModal');
        CloseModal.innerHTML = "Close";

        CloseModal.addEventListener('click', () => closeModal(Div, CloseModal, Overlay));

        Main.appendChild(Div);
        Div.appendChild(ModalContent);
        Div.appendChild(CloseModal);
        Main.appendChild(Overlay);
    }
})

function closeModal(Div, CloseModal, Overlay) {
    Div.classList.remove('modal');
    Div.classList.remove('ModalContainerEditBtn'); 
    CloseModal.classList.remove('CloseEditModal');
    Div.innerHTML = "";
    CloseModal.innerHTML = ""; 
    Overlay.classList.remove('overlay'); 
}

function RemoveElement(Element, Contents) {
    const elementText = Element.parentElement.querySelector('.DivElement').textContent;
    const Index = List.findIndex((El) => El === elementText);
    if(Index != -1) {
        List.splice(Index, 1);
        Contents.remove();
        Print();
    }
}

function Print() {
    Result.innerHTML = "";
    List.forEach((element) => {
        const Div = document.createElement('div');
        const Paragraph = document.createElement('p');
        Paragraph.innerHTML = element;
        Result.appendChild(Div);
        Div.appendChild(Paragraph);
    });
}

function ModalAlert() {
        const Div = document.createElement('div');
        Div.classList.add('modal');
        const ModalContent = document.createElement('div');
        ModalContent.classList.add('modal-content');

        const Overlay = document.createElement('div');
        Overlay.classList.add('overlay');
 
        const AlertMessage = document.createElement('div');
        AlertMessage.classList.add('NoTask');
        AlertMessage.innerHTML = "There is no any task!";

        const CloseModal = document.createElement('button');
        CloseModal.classList.add('close');
        CloseModal.innerHTML = "Close";

        CloseModal.addEventListener('click', () => closeModal(Div, CloseModal, Overlay));

        Main.appendChild(Div);
        Div.appendChild(ModalContent);
        ModalContent.appendChild(AlertMessage);
        ModalContent.appendChild(CloseModal);
        Main.appendChild(Overlay);
}

function UpdateHour() {
    const NewTime = new Date();
    let Hour = NewTime.getHours();
    let Minutes = NewTime.getMinutes();

    Hour = Hour < 10 ? '0' + Hour : Hour;
    Minutes = Minutes < 10 ? '0' + Minutes : Minutes;

    Time.innerHTML = Hour + ":" + Minutes;
}
setInterval(UpdateHour, 1000); /* Update the hour 1 to 1 sec */
UpdateHour();