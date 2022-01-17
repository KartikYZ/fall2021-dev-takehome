import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <TodoList tasks={[]}/>
    </div>
  );
}

export default App;
