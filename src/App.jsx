import  React from 'react';
import './App.css';

import Todo from './Components/Todo/Todo';

function App() {

  const [todos, setTodos] = React.useState(JSON.parse(window.localStorage.getItem('todos')) || []);

  //state takes there values: all, completed, uncompleted

  const [type, setType] = React.useState('all');

  const handleDelete = (evt) => {
    const todoId = evt.target.dataset.todoId - 0 ;

    const filteredTodos =  todos.filter((todo) => todo.id !== todoId);

    window.localStorage.setItem('todos', JSON.stringify(filteredTodos));

    setTodos(filteredTodos);
  };


    const handleCheck = (evt) =>{

      const todoId = evt.target.dataset.todoId - 0;

		  const foundTodo = todos.find((todo) => todo.id === todoId);

		  foundTodo.isCompleted = !foundTodo.isCompleted;

      
      window.localStorage.setItem('todos', JSON.stringify([...todos]));

      setTodos([...todos]);
    };

    const getTodosByType = (_type, _todos) => {
      if(_type === 'all'){
        return todos;
      }

      if(_type === 'completed'){
        return todos.filter((t) => t.isCompleted);
      }

      if(_type === 'uncompleted') {
        return todos.filter((t) => !t.isCompleted);
      }else{
        return [];
      }
    }

  return (
   <main className='main'>
      <h1 className='todo__title'>todo</h1>

    <input 
      className='todo__input'
      type="text"
        onKeyUp={(evt)=>  {

          if(evt.code === 'Enter'){

            const newTodo = {
              id: todos[todos.length - 1]?.id + 1 || 0,
              title: evt.target.value.trim(),
              isCompleted: false,
            }

            window.localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
             
            setTodos([...todos, newTodo]);

            evt.target.value = null;
          }
      }}
    />


      <ul className='todos'>

        {todos.length > 0 && 
          getTodosByType(type, todos).map((todo) =>(
            <Todo  key={todo.id} todo={todo}  handleDelete={handleDelete} handleCheck={handleCheck}>

              {todo.title}

            </Todo>

          ))}
      </ul>

      <button className='btn' onClick={ () => setType('all')}>All</button>
      <button className='btn' onClick={ () => setType('completed')}>Completed</button>
      <button className='btn' onClick={ () => setType('uncompleted')}>Uncompleted</button>
   
   </main>
  );
}

export default App;
