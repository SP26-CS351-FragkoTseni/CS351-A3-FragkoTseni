import Button from "./Button";

function ToDoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  editValue,
  setEditValue,
  onSave,
  onCancel,
}) {
  //ToDo - object for each tasks(id, text, completed)
  //onToggle - function taht needs to be called when checkbox is clicked
  //onDelete - function to call when to Delete btn is clicked

  return (
    <div className="todo-item">
      {/* Checkbox to toggle status */}
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />

      {/* Todo text with conditional strikethorugh styling if completed */}
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        {todo.text}
      </span>

      {/* Display description if it exists */}
      {todo.description && (
        <div
          style={{
            fontSize: "0.9em",
            color: "#666",
            marginLeft: "20px",
          }}
        >
          {todo.description}
        </div>
      )}

      {/* Delete btn using out reusable btn component*/}
      <Button text="Delete" onClick={onDelete} />
    </div>
  );
}

export default ToDoItem;
