import Button from `./Button`;

function ToDoItem({ todo, onToggle, onDelete}) {
    //ToDo - object for each tasks(id, text, completed)
    //onToggle - function taht needs to be called when checkbox is clicked
    //onDelete - function to call when to Delete btn is clicked

    return(

        <div className="todo-item">
            //Checkbox to toggle status
            <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={onToggle}
            />

            //Todo text with conditional strikethorugh styling if completed 
            <span
                style={{
                    textDeclaration: todo.completed ? 'line-through' : 'none',
                    marginLeft: '10px',
                    marginRight: '10px'
                }}
            >
            </span>

            //Delete btn using out reusable btn component
            <Button text="Delete" onClick={onDelete} />

        </div>

    );
}


export default ToDoItem;