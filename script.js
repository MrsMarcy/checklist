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
        name: `todo stuff lol`,
        todos: [
            {
                text: 'title edit',
                completed: true
            },
            {
                text: 'creatable lists',
                completed:  true
            },
            {
                text: "local storage",
                completed: false
            }
        ]
    },
    {
        name: 'empty',
        todos: [
            {
                text: `this is a really long message that I'm trying to make appear long so that it'll extend the stupid box and make it wrap smh. extend extend extend`,
                completed: false
            }
        ]
    }
];

// let lists = JSON.parse(localStorage.getItem('toDoLists'))  ?? [
//     {
//         name: '<- Name your list!',
//         todos: [
//         ]
//     }
// ]

// let currentList = JSON.parse(localStorage.getItem('currentList'))  ?? lists[0];
let currentList;
// function save(lists, currList) {
//     localStorage.setItem('lists', JSON.stringify(lists));
//     localStorage.setItem('currentList', JSON.stringify(currentList));
// }

let html = document.body.parentNode;
let todosHtml;
// the ULTIMATE render function lmao. loads everything super nicely ^w^
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
    let currentName = document.getElementById('current-list-name');
    let now = currentName.classList;

    currentName.innerHTML = currentList.name;
    now.add(`${clicked_id}`)
    if (now.length > 6){
        now.remove(now[5])
    }

    let chart = currentList.todos;
    todosHtml = '<ul id="list-group-flush" class="w-full">';

    for (const prop in chart) {
        let completed = chart[prop].completed
        let strike = '';
        if (completed){
            completed = 'checked';
            strike = 'strike';
        }
        todosHtml += `
        <li class="${clicked_id} list-group-item flex ${strike}" id='${todoIncrease}' onClick="hover(this)" >
          <div class="mx-2 my-auto">
            <input onClick="check(this,${clicked_id},${todoIncrease})" type="checkbox" ${completed}>
          </div>
          <div class="w-full">
            <p class="p-2" ondblClick="editText(this)">${chart[prop].text}</p>
            <input id="${clicked_id}" class="${todoIncrease} w-full flex-wrap editable p-2 hidden" <input onkeyDown="enterAll(event, 1, this, ${todoIncrease}, ${clicked_id}, value)" type="text">
          </div>
          <div class="shrink-0 flex flex-row justify-center items-center left">
            <img class="list-img cursor-pointer mx-2 delete" onClick='removeTask(this)' src="/images/trash-can-solid.png" alt="delete">
          </div>
        </li>`;
        todoIncrease++;
    }
    
    todosHtml += `<li id="${todoIncrease}" class="${clicked_id} py-2"><img onClick="addTodo(this.parentNode)" class="list-img cursor-pointer mx-2 " src="/images/plus-solid.png"></li>`
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    // save(lists,currentList);
}

// detects the click period on the page. and if its the current selected edited list, it does nothing. if not then it auto updates the data.
html.addEventListener('click', function(event) {
    event.preventDefault();
    let highlight = document.getElementsByClassName('black-box');
    highlight = highlight[0]
    
    if (highlight){
        if(!highlight.contains(event.target)){
            highlight.classList.toggle('black-box')
        }
    }
    
    let allEdits = document.getElementsByClassName('editable');
    let select = document.getElementsByClassName('selected');
    select = select[0]

    if (select){
        if (!select.contains(event.target)) {
            for (let i=0;i<allEdits.length;i++) {
                let id = Number(allEdits[i].id);
                let classN = Number(allEdits[i].classList[0])
                let val = allEdits[i].value
                // currentEdit.classList.toggle('black-box')
                if (val) {
                    enterAll(true, 1, this, classN, id, val );
                } else {
                    //delete the list
                }
            }
        }
    }
    let editT = document.getElementById('titleEdit')
    let title = document.getElementById('current-list-name')
    if(editT.classList.contains('hidden')){
        if (!editT.contains(event.target)) {
            // enterAll(true, 3, editT)
            // console.log('test');
        }
    }
})

// if the item is checked, it adds the strikethrough style and updates data
function check(el, id, num) {
    if (el.checked){
        lists[id].todos[num].completed = true;
        el.parentNode.parentNode.classList.add('strike')
    } else {
        lists[id].todos[num].completed = false;
        el.parentNode.parentNode.classList.remove('strike')
    }
    render(id)
}

//toggles the editable title
function editTitle(elem) {
    let titleEdit = document.getElementById('titleEdit')
    elem.classList.toggle('hidden');

    titleEdit.classList.toggle('hidden');
    titleEdit.value = elem.innerHTML;
}

// toggles the editable prompt
function editText(elem) {
    let inputSib = elem.nextElementSibling;
    inputSib.value = elem.innerHTML;
    inputSib.classList.toggle('hidden');
    inputSib.classList.toggle('bg-gray');
    inputSib.classList.toggle('selected');
    elem.classList.toggle('hidden');
}

// takes a bunch of enter prompts for editing and creating todos and lists. 
function enterAll(event, key, elem, classN, id, value) {
    if (event.key === 'Enter' || event == true) {
        switch (key) {
        case 0:
            addFin(classN);
            break;
        case 1:
            lists[id].todos[classN].text = value;
            render(id)
            break;
        case 2:
            lists.push(
                {
                    name: `${elem.value}`,
                    todos: []
                })
                let lastEl = lists.length - 1
                render(lastEl)
            break;
        case 3:
            console.log(elem);
            let idT = Number(elem.previousElementSibling.className.charAt(46));
            console.log(idT);
            let val = elem.value
            if(val === '') {
                lists[idT].name = `empty...`;
            } else {
                lists[idT].name = `${val}`;
            }
            elem.classList.toggle('hidden')
            elem.previousElementSibling.classList.toggle('hidden')
            render(idT);
            break;
        }
    }
}

//grabs the item clicked, finds their id and position in data and deletes it
function removeTask(elem) {
    let id = Number(elem.parentNode.parentNode.id);
    let classNum = Number(elem.parentNode.parentNode.className.charAt(0));
    let finder = lists[classNum].todos;
    finder.splice(id,1);
    render(classNum);
}

//creates a text box able to create a new todo
function addTodo(elem) {
    hover();
    let ul = document.getElementById('list-group-flush');
    let idNum = Number(elem.id); // gives us the id number
    let classNum = Number(elem.className.charAt(0)); // gives us the current list task number
    let newLI1 = `<li id="${idNum}" onClick="hover()" class="${classNum} flex py-1 my-3">`;
    newLI1 += `<input onkeyDown="enterAll(event, 0, this, ${classNum})" class="black-box " id="input-text" type="text" size="47" placeholder=" Type your item, then click the Checkmark or press ENTER" value="">
    <img onClick="addFin(${classNum})" class="cursor-pointer mx-2" src="/images/check-solid.png">`;
    ul.lastElementChild.remove()
    ul.innerHTML += newLI1;
}

// finalizes the todo by iether hitting enter or the checkmark
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

// this makes the current selected todo highlighted
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

render(2)