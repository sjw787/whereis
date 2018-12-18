import React, { Component } from 'react';
import './App.css';
import Environment from './Environment.js';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { environments: [] };
  }

  setEnvironmentState(items){
    this.setState( { environments: items } );
  }

  componentDidMount(){
    this.getEnvironments();
  }

  getEnvironments(){
    axios.get('/environments').then((res) => {
        let items = [];
        res.data.Items.forEach(item => {
          items.push({
            name: item.Name.S,
            frontend: item.Frontend.S,
            backend: item.Backend.S,
            desc: item.EnvironmentDescription.S,
            key: item.EnvironmentID.N
          });
        });
        this.setEnvironmentState(items);
    });
  }

  changeOnFront(key, desc){

  }

  render(){
    return (
      this.state.environments.map( env => {
        return <Environment name={env.name}
                            frontend={env.frontend}
                            backend={env.backend}
                            desc={env.desc}
                            envkey={env.key}/>
      })
    );
  }
}

export default App;
