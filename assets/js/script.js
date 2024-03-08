const Main = document.querySelector('main');
console.log(Main);
const Btn = document.querySelectorAll('button');
const AddBtn = Btn[0];
const EditBtn = Btn[1];
const RemoveBtn = Btn[2];
const Time = document.querySelector('div.time');

const modal = document.getElementById('myModal');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.close');

AddBtn.addEventListener('click', () => {
    const Div = document.createElement('div');
    Div.classList.add('modal');
    
    const ModalContent = document.createElement('div');
    ModalContent.classList.add('modal-content');

    const CloseModal = document.createElement('button');
    CloseModal.classList.add('close');
    CloseModal.innerHTML = "Close";

    const Paragraph = document.createElement('p');
    Paragraph.innerHTML = "Teste";

    const Overlay = document.createElement('div');
    Overlay.classList.add('overlay');

    CloseModal.addEventListener('click', () => {
        Div.classList.remove('modal');
        CloseModal.classList.remove('close');
        Div.innerHTML = "";
        CloseModal.innerHTML = "";
        Overlay.classList.remove('overlay');
    })

    Main.appendChild(Div);
    Div.appendChild(ModalContent);
    ModalContent.appendChild(Paragraph);
    ModalContent.appendChild(CloseModal);
    Main.appendChild(Overlay);
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