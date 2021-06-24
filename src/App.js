import './App.css';
import Todos from './components/todo/Todos';
import todoStore from './store/todoStore';
import { observer, Provider } from 'mobx-react';

function App() {
  return (
    <Provider todoStore={todoStore}>
      <div className="container">
        <Todos/>
      </div>

    </Provider>
  );
}

export default observer(App);
