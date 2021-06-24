import { observer, inject } from "mobx-react";
import { useRef } from "react";
import TodoItem from "./TodoItem";


const Todos = (props) => {
    const { todoStore } = props;
    const todo = useRef(null);

    const addTodoSubmitHandler = (e) => {
        e.preventDefault();
        todoStore.addTodo(todo.current.value);
        todo.current.value = "";
        todo.current.focus();
    }

    return (
        <section>
            <h1>Todo</h1>
            <form onSubmit={addTodoSubmitHandler}
                className="row">
                <div className="col-8">
                    <input type="text" ref={todo} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Add todo</button>
            </form>

            <ul className="list-group mt-2">
                {
                    todoStore.todos.map((item, index) => {
                        return <TodoItem
                            key={index}
                            index={index}
                            item={item}
                            editTodo={todoStore.editTodo}
                            removeTodo={todoStore.removeTodo}
                        ></TodoItem>
                    })
                }
            </ul>

        </section>
    )
}

export default inject("todoStore")(observer(Todos));
