// document.getElementById('create').addEventListener('click',pressed)
// function pressed(){
//     let input = document.getElementById('inputLOL').value;
//     let li = document.createElement('li');
//     let textnode = document.createTextNode(`${input}`)
//     li.appendChild(textnode)
//     document.getElementById('boxy').appendChild(li);
// }
// document.getElementById('create').addEventListener('click', calculate)
// function calculate() {
//     let tax = parseFloat(document.getElementById('inputLOL').value, 10);
//     let price = parseFloat(document.getElementById('money').value, 10);
//     let total = Math.round(((((tax / 100) * price) + price) * 100) / 100);
//     // console.log(tax, price, total);
//     document.getElementById('result').innerHTML = `${total}`;
// }


// document.getElementById('new').addEventListener('click',render)
/*
<button id="list3" class="text-left w-full max-w-x">
<div class="gray2 px-3 py-2 s">
<p class="text-white ">test</p>
</div>
</button>*/
// function render() {
//     //this will hold the html that will be displayed in the sidebar
//     let listsHtml = '<button class="list-group text-left w-full max-w-xs">';
//     //iterate through the lists to get their names
//     lists.forEach((list) => {
//         listsHtml += `
//         <div class="list-group-item gray2 px-3 py-2">
//           <p class="text-white">${list.name}</p>
//         </div>`
//     });

//     listsHtml += '</button>'
    
//     // prints out the lists
//     document.getElementById('listHolder').innerHTML = listsHtml;

//     // prints out the name of the current list
//     document.getElementById('current-list-name').innerHTML = currentList.name;

//     //iterate over the todos in the current list 
//     let todosHtml = '<ul class="list-group-flush w-full">';
//     currentList.todos.forEach((list) => {
//         todosHtml += `
//         <li class="list-group-item flex">
//           <div class="my-auto">
//             <input type="checkbox">
//           </div>
//           <p class="p-2">${todo.text}</p>
//           <div class="shrink-0 flex flex-col justify-center gap-y-4">
//             <img class="list-img cursor-pointer" src="/images/pen-to-square-regular.png" alt="edit">
//             <img class="list-img cursor-pointer" src="/images/trash-can-solid.png" alt="delete">
//           </div>
//         </li>`;
//     });
//     //print out the todos
//     document.getElementById('current-list-todos').innerHTML = todosHtml;
// }
const lists = {
1: [{
        name: 'Shopping list',
        todos: [
            {
                text: 'bananas',
                completed: true
            },
            {
                text: '1 lbs ground turkey',
                completed: false
            },
            {
                text: 'milk',
                completed: true
            },
            {
                text: 'bread',
                completed: true
            },
            {
                text: 'cereal',
                completed: false
            }
        ]
  }],
2: [{
        name: 'Cleaning list',
        todos: [
            {
                text: 'dishes',
                completed: false
            },
            {
                text: 'vaccum living room',
                completed: true
            }
        ]
  }],
3: [{
        name: 'Ideas for college',
        todos: [
            {
                text: 'U of U',
                completed: false
            },
            {
                text: 'UVU',
                completed: false
            }
        ]
  }]
};
localStorage.setItem("test",lists)
let currentList = lists[1][0];
// console.log(currentList);
// console.log(lists.first[0].todos[0].completed);



function render(clicked_id) {
    let increase = 1;
    if (clicked_id === undefined){
        clicked_id = 1;
    }
    let listsHtml = '<div class="text-lg flex flex-col items-center gap-y-2">';
    for (const prop in lists) {
        listsHtml += `
        <button  class="clicker text-left w-full max-w-xs">
        <p id="${increase}" class="text-white gray2 px-3 py-2" onClick='render(this.id)'>${lists[prop][0].name}</p>
        </button>`;
        increase++;
    };
    listsHtml += '</div>';
    document.getElementById('listHolder').innerHTML = listsHtml;
    currentList = lists[clicked_id][0]
    document.getElementById('current-list-name').innerHTML = currentList.name;
    let chart = currentList.todos;
    let todosHtml = '<ul class="list-group-flush w-full">';
    let checked = ''
    for (const prop in chart) {
        let completed = chart[prop].completed
        if (completed){
            completed = 'checked';
        }
        todosHtml += `
        <li class="list-group-item flex">
          <div class="my-auto">
            <input type="checkbox" ${completed}>
          </div>
          <p class="p-2">${chart[prop].text}</p>
          <div class="shrink-0 flex flex-row justify-center items-center left">
            <img class="list-img cursor-pointer mx-2 edit" src="/images/pen-to-square-regular.png" alt="edit">
            <img class="list-img cursor-pointer mx-2 delete" onClick='remove(this)' src="/images/trash-can-solid.png" alt="delete">
          </div>
        </li>`;
    }
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}



function remove(example) {
    select = example.parentNode.parentNode;
    headSelect = select.parentNode;
    headSelect.removeChild(select);
}


render()
// function addTodo() {
    //     //get the todo text from the todo input box
    //     const text = document.getElementById('todo-input-box').value;
    //     if(text){
        //         currentList.todos.push({
            //             text: text,
            //             completed: false
            //         })
            //         render();
            //     }
            // }