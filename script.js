// document.getElementById('create').addEventListener('click',pressed)
// function pressed(){
//     let input = document.getElementById('inputLOL').value;
//     let li = document.createElement('li');
//     let textnode = document.createTextNode(`${input}`)
//     li.appendChild(textnode)
//     document.getElementById('boxy').appendChild(li);
// }
// document.getElementById('create').addEventListener('click', calculate)
    const lists = [
        {
            name: 'Shopping List',
            todos: [
                {
                    text: 'bananas',
                    completed: false
                },
                {
                    text: '1 lbs ground turkey',
                    completed: true
                },
                {
                    text: 'milk',
                    completed: false
                }
            ]
        },
        {
            name: 'College List',
            todos: [
                {
                    text: 'University of Utah',
                    completed: false
                },
                {
                    text: 'Utah Valley University',
                    completed: true
                },
                {
                    text: 'Utah Tech University',
                    completed: false
                }
            ]
        },
        {
            name: 'Chores',
            todos: [
                {
                    text: 'wash dishes',
                    completed: false
                },
                {
                    text: 'vacuum downstairs',
                    completed:  true
                },
                {
                    text: "clean bathroom",
                    completed: true
                }
            ]
        },
        {
            name: 'empty',
            todos: [
                {
                    text: `this is a really long message that I'm trying to make appear long so that it'll extend the stupid box and make it wrap smh`,
                    completed: false
                }
            ]
        }
    ];

// console.log(arrTest[1]['todos'][0]);

// console.log(arrTest[1].todos.splice(1,1));
// arrTest[1].todos.forEach(element => {
    // console.log(element);
// })
// localStorage.setItem("test",lists)
let currentList;
let todosHtml;

function render(clicked_id) {
    let increase = 0;
    let todoIncrease = 0;
    if (clicked_id === undefined){
        clicked_id = 0;
    }
    let listsHtml = '<div class="text-lg flex flex-col items-center gap-y-2">';
    for (const prop in lists) {
        listsHtml += `
        <button  class="clicker text-left w-full max-w-xs">
        <p id="${increase}" class="text-white gray2 px-3 py-2" onClick='render(this.id)'>${lists[prop].name}</p>
        </button>`;
        increase++;
    };
    listsHtml += '</div>';
    document.getElementById('listHolder').innerHTML = listsHtml;
    currentList = lists[clicked_id]
    document.getElementById('current-list-name').innerHTML = currentList.name;
    let chart = currentList.todos;
    todosHtml = '<ul id="list-group-flush" class="w-full">';
    for (const prop in chart) {
        let completed = chart[prop].completed
        if (completed){
            completed = 'checked';
        }
        todosHtml += `
        <li class="${clicked_id} list-group-item flex" id='${todoIncrease}' onClick="hover(this)" ">
          <div class="mx-2 my-auto">
            <input type="checkbox" ${completed}>
          </div>
          <div>
            <p class="p-2" ondblClick="editText(this)">${chart[prop].text}</p>
            <input class="editable hidden" type="text" size="100%" placeholder=" Type your item, then click the Checkmark or press ENTER" value="cheese">
          </div>
          <div class="shrink-0 flex flex-row justify-center items-center left">
            <img class="list-img cursor-pointer mx-2 edit" src="/images/pen-to-square-regular.png" alt="edit">
            <img class="list-img cursor-pointer mx-2 delete" onClick='remove(this)' src="/images/trash-can-solid.png" alt="delete">
          </div>
        </li>`;
        todoIncrease++;
    }
    todosHtml += `<li id="${todoIncrease}" class="${clicked_id} py-2"><img onClick="add(this.parentNode)" class="list-img cursor-pointer mx-2 " src="/images/plus-solid.png"></li>`
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

function editText(elem) {
    let ul = document.getElementById('list-group-flush');
    elem.nextElementSibling.value = elem.innerHTML;
    
    // let newLI1 = `<li class="flex">`;
    // newLI1 += `<input class="black-box" id="input-text" type="text" size="47" placeholder=" Type your item, then click the Checkmark or press ENTER" value="${elem}">
    // <img onClick="addFin()" class="cursor-pointer mx-2" src="/images/check-solid.png">`;
    elem.nextElementSibling.classList.toggle('hidden');

    // console.log(sib);
}

function remove(example) {
    let thisID = Number(example.parentNode.parentNode.id);
    let classNum = Number(example.parentNode.parentNode.className.charAt(0));
    let finder = lists[classNum].todos;
    finder.splice(thisID,1);
    render(classNum);
}

function add(elem) {
    hover();
    let ul = document.getElementById('list-group-flush');
    let idNum = Number(elem.id); // gives us the id number
    let classNum = Number(elem.className.charAt(0)); // gives us the current list task number
    let newLI1 = `<li id="${idNum}" onClick="hover()" class="${classNum} flex py-1 my-3">`;
    newLI1 += `<input onkeyDown="enter(event,${classNum})" class="black-box " id="input-text" type="text" size="47" placeholder=" Type your item, then click the Checkmark or press ENTER" value="">
    <img onClick="addFin(${classNum})" class="cursor-pointer mx-2" src="/images/check-solid.png">`;
    
    ul.lastElementChild.remove()
    ul.innerHTML += newLI1;
}

function addFin(classNum) {
    hover();
    let ul = document.getElementById('list-group-flush');
    let liValue = document.getElementById('input-text').value.trim();
    if (liValue === '') {
        console.log('enter something please :(')
    } else {
    ul.lastElementChild.remove()
    lists[classNum]['todos'].push(
        {
            text: `${liValue}`,
            completed: false
        })
    render(classNum)
    }
}

function enter(event,classNum) {
    if (event.keyCode == 13){
        addFin(classNum);
    }
}

function hover(elem) {
    let siblings = [];
    let ul = document.getElementById('list-group-flush');
    let currentChild = ul.firstElementChild
    while (ul.childElementCount > 0) {
        siblings.push(currentChild)
        currentChild = currentChild.nextElementSibling;
        if (currentChild === null) break;
    }
    siblings.forEach(elem => elem.classList.remove('black-box'))
    if (elem !== undefined) elem.classList.add('black-box');
}

render()