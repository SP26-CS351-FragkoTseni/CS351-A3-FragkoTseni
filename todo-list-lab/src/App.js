//Import react and the useState hook for state management
import React, { useState, useEffect } from "react";
import "./App.css";

//Import our custom components
import Header from "./components/Header";
import Button from "./components/Button";
import ToDoItem from "./components/TodoItem";

function App() {
  //todos array to store all todo items
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  //inputValue string to store current input field
  const [inputValue, setInputValue] = useState("");

  // input value for description
  const [inputDescriptionValue, setInputDescriptionValue] = useState("");

  //selecting priority level
  const [priority, setPriority] = useState("medium");

  //filter state (all, active, completed)
  const [filter, setFilter] = useState("all");

  //editing the Id, value
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  //save todos localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //this function basically updates inputValue as the user types
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // handle description input change
  const handleDescriptionChange = (event) => {
    setInputDescriptionValue(event.target.value);
  };

  // handle adding a new todo with description
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;

    const newToDo = {
      id: Date.now(),
      text: inputValue.trim(),
      description: inputDescriptionValue.trim(), // add description here
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newToDo]);
    setInputValue("");
    setInputDescriptionValue("");
    setPriority("medium");
  };

  //This function will toggle a todos completed status
  const toggleTodo = (id) => {
    //Map over the todods array to create a new array
    setTodos(
      todos.map((todo) => {
        //if this todos id matches, toggle its completed status
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      }),
    );
  };

  // this function removes a todo from the list
  const deleteTodo = (id) => {
    //Filter out the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //this functon edits a todo from the list
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  //this function saves the editing version
  const saveEdit = (id) => {
    if (!editValue.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editValue } : todo,
      ),
    );

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  //this function filters the todo list
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  //Counts
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="App">
      <Header title="My Todo List" />

      <form onSubmit={handleSubmit} className="todo-form">
        {/*Main todo input */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
          className="todo-input"
        />

        {/* Description input */}
        <input
          type="text"
          value={inputDescriptionValue}
          onChange={handleDescriptionChange}
          placeholder="Enter todo description..."
          className="todo-description"
        />

        {/* Priority selector */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <Button type="submit" text="Add todo" />
      </form>

{/* Filter Buttons */}
<div>
  <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
         All ({totalCount})
        </button>
        <button
          className={`filter-button ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeCount})
        </button>
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({completedCount})
        </button>
      </div>


      {/* Todo list */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-todos-message">No todos yet!</p>
        ) : (
          todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => startEditing(todo)}
              editingId={editingId}
              editValue={editValue}
              setEditValue={setEditValue}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          ))
        )}
      </div>

      {/* Todo count */}
      <p className="todo-count">
        {todos.length} {todos.length === 1 ? "todo" : "todos"}
      </p>
    </div>
  );
}

//Export the App component
export default App;
