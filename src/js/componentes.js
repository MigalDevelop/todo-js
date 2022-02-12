import { Todo } from '../classes';

import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');  
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    let htmlTodo = `
        <div class="view">
            <input class="toggle prueba" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' } >
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">`;

    const li = document.createElement('li');
    li.innerHTML = htmlTodo;

    if ( todo.completado ) li.classList.add('completed');
    li.setAttribute('data-id', todo.id );

    divTodoList.append( li );
    //divTodoList.append( div.firstElementChild() );

    return li;
}

txtInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const tarea = new Todo( txtInput.value );
        todoList.nuevoTodo( tarea );
        //todoList.marcarCompletado( tarea.id ); No tiene sentido que se inicie completado
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    
    //const nombreElemento = event.target.localName;
    const classListElemento = event.target.classList;
    //const todoElemento = event.target.parentElement.parentElement;
    const todoElemento = event.target.closest("li");
    const todoId = todoElemento.getAttribute('data-id');

    if ( classListElemento.contains('toggle') ) {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( classListElemento.contains('destroy') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

btnBorrarCompletados.addEventListener('click', ( event ) => {
    
    todoList.eliminarCompletados();
    const completados = document.querySelectorAll('.completed');
    completados.forEach( elemento => elemento.remove() );
});

ulFiters.addEventListener('click', ( event ) => {
    const href = event.target.getAttribute('href');

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    
    event.target.classList.add('selected');
    
    for( const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        console.log(href, completado);
        
        if ( href === "#/active" ) {
            if ( completado ) elemento.classList.add('hidden');
        } else if ( href === "#/completed" ) {
            if ( !completado ) elemento.classList.add('hidden');
        }
    }
});



