// document.getElementById('create').addEventListener('click',pressed)
// function pressed(){
//     let input = document.getElementById('inputLOL').value;
//     let li = document.createElement('li');
//     let textnode = document.createTextNode(`${input}`)
//     li.appendChild(textnode)
//     document.getElementById('boxy').appendChild(li);
// }
// document.getElementById('create').addEventListener('click', calculate)
// const lists = [{
// 1: [{
//         name: 'Shopping list',
//         todos:[
//             {
//                 text: 'bananas',
//                 completed: true
//             },
//             {
//                 text: '1 lbs ground turkey',
//                 completed: false
//             },
//             {
//                 text: 'milk',
//                 completed: true
//             },
//             {
//                 text: 'bread',
//                 completed: true
//             },
//             {
//                 text: 'cereal',
//                 completed: false
//             }
//         ]
//   }],
// 2: [{
//         name: 'Cleaning list',
//         todos: 
//             [{
//                 text: 'dishes',
//                 completed: false
//             },
//             {
//                 text: 'vaccum living room',
//                 completed: true
//             }]
//   }],
// 3: [{
//         name: 'Ideas for college',
//         todos: 
//             [{
//                 text: 'U of U',
//                 completed: false
//             },
//             {
//                 text: 'UVU',
//                 completed: false
//             }]
//   }]
// }];
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
        }
    ];

// console.log(arrTest[1]['todos'][0]);

// console.log(arrTest[1].todos.splice(1,1));
// arrTest[1].todos.forEach(element => {
    // console.log(element);
// })
// localStorage.setItem("test",lists)
let currentList;

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
    let todosHtml = '<ul class="list-group-flush w-full">';
    for (const prop in chart) {
        let completed = chart[prop].completed
        if (completed){
            completed = 'checked';
        }
        todosHtml += `
        <li class="list-group-item flex ${clicked_id}" id='${todoIncrease}'>
          <div class="my-auto">
            <input type="checkbox" ${completed}>
          </div>
          <p class="p-2">${chart[prop].text}</p>
          <div class="shrink-0 flex flex-row justify-center items-center left">
            <img class="list-img cursor-pointer mx-2 edit" src="/images/pen-to-square-regular.png" alt="edit">
            <img class="list-img cursor-pointer mx-2 delete" onClick='remove(this)' src="/images/trash-can-solid.png" alt="delete">
          </div>
        </li>`;
        todoIncrease++;
    }
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    // console.log(fixedList);
}



function remove(example) {
    let thisID = Number(example.parentNode.parentNode.id);
    let test = example.parentNode.parentNode.className
    let num = Number(test.charAt(21))
    console.log(num, thisID);
    // let now = fixedList[num][0].todos[thisID];
    test2 = lists.splice(fixedList[num][0].todos[thisID],1);
    console.log(fixedList[num][0].todos[thisID]);
    render()
}

render()
