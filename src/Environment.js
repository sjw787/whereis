import React from 'react';
import './Environment.css';

const Environment = (props) => {
    return (
      <div className="Environment">
        <h1 className="env-name">{props.name}</h1>
        <h2 className="env-front">FrontEnd: <input value={props.frontend}/></h2>
        <h2 className="env-back">BackEnd: <input value={props.backend}/></h2>
        <textarea className="env-desc" placeholder={props.desc}></textarea>
      </div>
    );
}

export default Environment;
