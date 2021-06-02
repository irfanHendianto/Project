import './App.css';
import 'antd/dist/antd.css';
import LayoutPage from './LayoutPage';
import react from "react";
import {ComponentProvider} from "./context/ComponentContext"


class App extends react.Component {
  render(){
      return (
        <div>

          <ComponentProvider>
            <LayoutPage/>
          </ComponentProvider>
          
        </div>
      );
  }
}

export default App;
