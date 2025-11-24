const addBtn = document.querySelector('.task-list__bnt--add');
const delBtn = document.querySelector('.task-list__bnt--del');
const list = document.querySelector('.list');


function addItem() {
    const item = document.createElement('li');
    item.textContent = 'Новый элемент списка';
    list.append(item);
}

addBtn.addEventListener('click', addItem)

function delItem() {
    if (list.children.length > 0) {
        list.lastElementChild.remove();
    }
}

delBtn.addEventListener('click', delItem)