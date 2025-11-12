import React from "react";
import parse from 'html-react-parser';
import "./style.scss"
import Accordion from "./components/Accordion";

const App = ({ data }) => {

  const { title, description, items } = data;

  return (
    <div className="faq-component">
      <h2 className="faq-title">{title}</h2>
      <div className="faq-description">
        { parse(description)}
      </div>
      
      <Accordion list={items} />
    </div>
  );
}

export default App;