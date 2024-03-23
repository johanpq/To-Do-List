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

const TextInput = document.createElement('input');
const SubmitInput = document.createElement('input');

const List = ["Johan", "Pedro", "Queiroz"];

const AddArrayElements = SubmitInput.addEventListener('click', () => {
    if(TextInput.value != "") {
        List.push(TextInput.value);
    }
})

console.log(List);

AddBtn.addEventListener('click', () => {
    const Div = document.createElement('div');
    Div.classList.add('modal');
    
    const ModalContent = document.createElement('div');
    ModalContent.classList.add('modal-content');

    const Overlay = document.createElement('div');
    Overlay.classList.add('overlay');

    TextInput.setAttribute('type', 'text');
    TextInput.setAttribute('placeholder', "Type here");
    TextInput.classList.add('TextInput');

    SubmitInput.setAttribute('type', 'submit');
    SubmitInput.setAttribute('value', "Submit");
    SubmitInput.classList.add('SubmitInput'); 

    const CloseModal = document.createElement('button');
    CloseModal.classList.add('close');
    CloseModal.innerHTML = "Close";

    CloseModal.addEventListener('click', () => {
        Div.classList.remove('modal');
        CloseModal.classList.remove('close');
        Div.innerHTML = "";
        CloseModal.innerHTML = "";
        Overlay.classList.remove('overlay');
    })

    Main.appendChild(Div);
    Div.appendChild(ModalContent);
    ModalContent.appendChild(TextInput);
    ModalContent.appendChild(SubmitInput);
    ModalContent.appendChild(CloseModal);
    Main.appendChild(Overlay);
})

EditBtn.addEventListener('click', () => {
    const Div = document.createElement('div');
    Div.classList.add('modal');
    
    const ModalContent = document.createElement('div');
    ModalContent.classList.add('modal-content');

    const Overlay = document.createElement('div');
    Overlay.classList.add('overlay');

    List.map((Element) => {
        const DivFather = document.createElement('div');
        DivFather.classList.add('EditBtnModalContent');
 
        const DivElements = document.createElement('div');
        DivElements.classList.add('ArrayList');

        DivElements.innerHTML = Element;

        ModalContent.appendChild(DivFather);
        DivFather.appendChild(DivElements); 
    })

    const CloseModal = document.createElement('button');
    CloseModal.classList.add('close');
    CloseModal.innerHTML = "Close";

    CloseModal.addEventListener('click', () => {
        Div.classList.remove('modal');
        CloseModal.classList.remove('close');
        Div.innerHTML = "";
        CloseModal.innerHTML = "";
        Overlay.classList.remove('overlay');
    })

    Main.appendChild(Div);
    Div.appendChild(ModalContent);
    ModalContent.appendChild(CloseModal);
    Main.appendChild(Overlay);
})

const Print = SubmitInput.addEventListener('click', () => {
    const Div = document.createElement('div');
    const Paragraph = document.createElement('p');
    if(TextInput.value != "") {
        Paragraph.innerHTML = TextInput.value;
        Result.appendChild(Div);
        Div.appendChild(Paragraph);
    } else {
        alert("Não há nada!");
    }
})

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