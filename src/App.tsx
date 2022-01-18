import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
      <div className="App">
        <div>
          <h3>Bits of Good Take-home Project</h3>
          <h4>Created By: Kartik Sinha</h4>
          <p>
            *Note: This project implements the optional bonus 'filter' feature. By default, no tags are selected. 
            As a result, when adding tasks to the form, the filter dropdown needs to be initially set to "Select All" 
            so that all tasks are displayed at first. All other functionality works as specified in the ReadMe.
          </p>
        </div>
        <TodoList tasks={[]}/>
      </div>
  );
}

export default App;
