console.log('test hello');
var divElement = document.createElement('div');
divElement.style.border = `1px solid black`;
divElement.style.position = `absolute`;
divElement.style.left = `10px`;
divElement.style.top = `10px`;
divElement.style.width = `200px`;
divElement.style.height = `200px`;
divElement.style.background = `white`;
divElement.style.visibility = 'hidden';
document.body.appendChild(divElement);

function getData() {
    fetch('https://fat.sitotest.ru/data.json')
    .then((res) => res.json())
    .then((data) => {console.log(data);})
    .catch((err) => console.log(err));
}

function greeting() {
    console.log('hello everyone...');
}

var button1 = document.createElement('button');
button1.textContent = 'getData';
var button2 = document.createElement('button');
button2.textContent = 'greeting';

button1.addEventListener('click', getData);
button2.addEventListener('click', greeting);

// document.addEventListener('touchend', () => {
//     if (window.getSelection()) {
//         var select = window.getSelection();
//         console.log(select.toString());
//     }
// })
function show() {
    if (window.getSelection()) {
        var select = window.getSelection();
        var text = select.toString();
        divElement.textContent = text;
        divElement.style.visibility = 'visible';
        console.log(text);
    }
}

document.addEventListener('selectionchange', () => {
    if (window.getSelection()) {
        var select = window.getSelection();
        var text = select.toString();
        divElement.textContent = text;
        console.log('selection change:', text);
    }
})

document.body.appendChild(button1);
document.body.appendChild(button2);

// document.addEventListener('contextmenu', (e) => {e.preventDefault()});




// fetch('http://translate.sitotest.ru/translate?q=test')
//     .then((res) => res.json())
//     .then((data) => {console.log(data);})
//     .catch((err) => console.log(err));



// 1. Развернуть в докере проект translate
// 2. Прописать переадресацию в настройках nginx
// 3. Создать поддомен translate.sitotest.ru для 95.78.239.48
// 4. Запросить сертификат для translate.sitotest.ru