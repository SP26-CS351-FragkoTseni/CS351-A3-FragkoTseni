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
  const isEditing = todo.id === editingId;

  const priorityColors = {
  high: "red",
  medium: "yellow",
  low: "green",
};

  // Get the color based on the todo's priority
  const borderColor = priorityColors[todo.priority] || "gray";

  return (
    <div className="todo-item" 
    style={{ border: '2px solid ${borderColor}',
    display: "flex", 
    alignItems: "center", 
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff" 
    }}
    >

      {/* Checkbox to toggle status */}
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />

      {/* show editing input field */}
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          style={{ marginLeft: "10px", flexGrow: 1 }}
        />
      ) : (
        // Todo text with conditional strikethorugh styling if completed
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            marginLeft: "10px",
            marginRight: "10px",
            flexGrow: 1,
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Display description if exists */}
      {todo.description && (
        <div
          style={{
            fontSize: "0.9em",
            color: "#666",
            marginLeft: "20px",
            flexBasis: "100%",
          }}
        >
          {todo.description}
        </div>
      )}

      {/* ----Buttons---- */}
      {isEditing ? (
        <>
          <Button text="Save" onClick={() => onSave(todo.id)} />
          <Button text="Cancel" onClick={onCancel} />
        </>
      ) : (
        <Button text="Edit" onClick={() => onEdit(todo)} />
      )}

      {/* Delete btn using out reusable btn component */}
      <Button text="Delete" onClick={onDelete} />
    </div>
  );
}

export default ToDoItem;