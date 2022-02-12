import { crearTodoHtml } from "../js/componentes";
import { Todo } from '../classes';

export class TodoList {

    constructor() {
        this.obtenerLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        crearTodoHtml( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        this.todos = this.todos.map(
            todo => todo.id == id ? { ...todo, completado : !todo.completado } : todo
        );
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    obtenerLocalStorage() {
        const todoJSON = localStorage.getItem( 'todo' );

        this.todos = ( todoJSON ) ? JSON.parse( todoJSON ) : [];

        this.todos = this.todos.map( Todo.fromJson );
    }
}