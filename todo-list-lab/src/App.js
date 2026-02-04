//Import react and the useState hook for state management
import React, {useState} from 'react';
import './App.css';

//Import our custom components 
import Header from './components/Header';
import Button from './components/Button';
import ToDoItem from './components/TodoItem';

function App() {

  //todos array to store all todo items
  const [todos, setTodos] = useState([]);

  //inputValue string to store current input field 
  const [inputValue, setInputValue] = useState("");

  //this function basically updates inputValue as the user types
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  
}