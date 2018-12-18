import React, { Component } from 'react';
import './Environment.css';
import axios from 'axios';

class Environment extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
    this.handleFrontChange = this.handleFrontChange.bind(this);
    this.handleBackChange = this.handleBackChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFrontChange (event) {
      this.setState({ frontend: event.target.value })
  }
  handleBackChange (event) {
      this.setState({ backend: event.target.value })
  }
  handleDescChange (event) {
      this.setState({ desc: event.target.value });
  }

  handleSubmit (event){
    event.preventDefault();

    console.log("state is", this.state.frontend, this.state.backend, this.state.desc);
    let params = {
      url: '/environment',
      // method: 'PUT',
    };
    //
    axios.put(params.url + '/' + this.props.envkey, {
      frontend: this.state.frontend,
      backend: this.state.backend,
      desc: this.state.desc
    }).then((res) => {
      console.log('Update success', res)
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="Environment">
        <h1 className="env-name">{this.props.name}</h1>
        <h2 className="env-front">FrontEnd: <input type="text" value={this.state.frontend} onChange={this.handleFrontChange}/></h2>
        <h2 className="env-back">BackEnd: <input value={this.state.backend} onChange={this.handleBackChange}/></h2>
        <textarea className="env-desc" placeholder={this.state.desc} onChange={this.handleDescChange}></textarea>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default Environment;
