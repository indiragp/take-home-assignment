import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    let paragraphs = input.split('\n\n');
    
    let output = '';
    for(let paragraphIdx in paragraphs) {
      output += formatParagraph(paragraphs[paragraphIdx]);
      // Making sure we don't add an extra line break at the end of the file.
      if(paragraphIdx < paragraphs.length - 1) {
        output += '\n\n';
      } 
    }

    setTextOutput(output);
  }

  const formatParagraph = input => {
    let output = '';
    const words = input.replace(/\s+/g, ' ').split(' ');
    let charCount = 0;
    for(let wordIdx in words) {
      if(charCount + words[wordIdx].length < 80) {
        output += words[wordIdx] + ' ' ;
        charCount += words[wordIdx].length + 1;
      } else {
        output += '\n' + words[wordIdx] + ' ';
        charCount = words[wordIdx].length + 1;
      }
    }
    return output;
  }
  
  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
