import { observer, useLocalObservable } from "mobx-react";
import { useRef } from "react";

const TodoItem = (props) => {

    const { item, index, removeTodo, editTodo } = props;

    const newTodo = useRef();

    // local state using hooks based approach
    const localState = useLocalObservable(() => ({
        isEditing: false,
        toggleEditing(value) {
            this.isEditing = value;
        }
    }))


    // item list
    const renderItem = () => {
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-sm-8">{item} </div>
                    <button className="btn btn-danger col-sm-1 mr-1" onClick={() => removeTodo(index)}>X</button>
                    <button className="btn btn-warning col-sm-2" onClick={() => localState.toggleEditing(true)}>edit</button>
                </div>

            </li>
        )
    }


    // edit form
    const renderForm = () => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                editTodo({ index, updatedText: newTodo.current.value });
                localState.toggleEditing(false)
            }}>
                <div className="row">
                    <input type="text" className="form-control col-8" defaultValue={item} ref={newTodo} />
                    <button type="submit" className="btn btn-success">Done</button>
                </div>

            </form>
        )
    }

    return (
        localState.isEditing ? renderForm() : renderItem()
    )
}

export default observer(TodoItem);