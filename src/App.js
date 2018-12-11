import React, { Component } from 'react';
import './App.css';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Environment from './Environment.js';

let awsConfig = {
  "region": "us-east-2",
  "endpoint": "https://dynamodb.us-east-2.amazonaws.com"
};

AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

class App extends Component {
  constructor(props){
    super(props);
    this.state = { environments: [] };
  }

  componentDidMount(){
    this.getEnvironments();
  }

  getEnvironments(){
    let params = { TableName: "Environments", Limit: 100 };

    dynamodb.scan(params, (err, data) => {
      if(err) throw new Error(err);
      else {
        let items = [];
        data.Items.forEach(item => {
          items.push({
            name: item.Name.S,
            frontend: item.Frontend.S,
            backend: item.Backend.S,
            desc: item.EnvironmentDescription.S,
            key: item.EnvironmentID.N
          });
        });

        this.setEnvironmentState(items)
      }
    });
  }

  setEnvironmentState(envs){
    this.setState({
      environments: envs.map((env) => {
        return (
          <Environment
            name = {env.name}
            frontend = {env.frontend}
            backend = {env.backend}
            desc = {env.desc}
            key = {env.key}/>
        );
      })
    });
  }

  render(){
    return (
      <div className="App"> { this.state.environments } </div>
    );
  }
}

export default App;
