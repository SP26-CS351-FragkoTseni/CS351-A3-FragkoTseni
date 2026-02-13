//Import react and the useState hook for state management
import React, { useState, useEffect } from "react";
import "./App.css";

//Import our custom components
import Header from "./components/Header";
import Button from "./components/Button";
import ToDoItem from "./components/TodoItem";

function App() {
  //todos array to store all todo items
  const [todos, setTodos] = useState([]);

  //inputValue string to store current input field
  const [inputValue, setInputValue] = useState("");

  //selecting priority level
  const [priority, setPriority] = useState("low");

  //filter state (all, active, completed)
  const [filter, setFilter] = useState("all")

  //save todos localStorage whenever todos change 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //this function basically updates inputValue as the user types
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // this function to add a new todo to the list
  const handleSubmit = (event) => {
    //Prevent default form submittion (which will reload the page and cause data loss)
    event.preventDefault();

    //Check if input is empty after removing the whitespace
    if (inputValue.trim() === "") {
      return;
    }

    //Create a new todo obj
    const newToDo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: priority,
    };

    //Add the new todo to the todos array using spread  operator
    setTodos([...todos, newToDo]);

    //clear the input field
    setInputValue("");
    setPriority("low");
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
    setTodos(todos.filter(todo => todo.id !== id));
  };

  //this functon edits a todo from the list
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: newText,
          };
        } else {
          return todo;
        }
      })
    );
  };

  //this function clears completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  //this function filters the todo list
  const filteredTodos = todos.filter((todo) => {
    if (filter ===  "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

return(
  <div className = "App">

    <Header title="My Todo List" />

    <form onSubmit={handleSubmit} className="todo-form">
      <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter a new todo..."
      className="todo-input"
      />

      {/* Priority selector */}
      <select 
      value = {priority}
      onChange = {(e) => setPriority(e.target.value)}
      className = "priority-select"
      >
        <option value = "low">Low</option>
        <option value = "medium">Medium</option>
        <option value = "high">High</option>
      </select>

      <Button
        type="submit"
        text="Add todo"
      />
    </form>

    <div className="todo-list">
      {todos.map(todo => (
        <ToDoItem
        key={todo.it}
        todo={todo}
        onToggle={() => toggleTodo(todo.id)}
        onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  </div>
);

}

//Export the App component
export default App;