import { useState, useEffect } from 'react';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import './App.css';

function formatCode(code) {
  try {
    return code.split('').map(char => {
      if (char === '{') {
        return '{\n';
      } else if (char === '}') {
        return '\n}\n';
      } else if (char === ';') {
        return ';\n';
      } else {
        return char;
      }
    }).join('');
  } catch (error) {
    console.error('Error formatting code:', error);
    return code; // Return the original code if formatting fails
  }
}

function App() {
  const [selection, setSelection] = useState('');
  const [items, setItems] = useState([]); // Initialize state for items
  useEffect(() => {
    fetch('http://18.223.212.123:8080/algo/all')
    .then(response => response.json())
    .then(data => {
      setItems(data); // Update state with fetched data
    })
    .catch(error => console.error('Error fetching data:', error));
}, []); // Empty dependency array means this effect runs once on mount

const handleSelectionChange = (event) => {
  setSelection(event.target.value);
};

  // if (!quizData) return <div>Loading...</div>;

  return (
    
    <div>
      <h1>Please select a sorting method.</h1>
      <select onChange={handleSelectionChange} style={{ fontSize: '1.5rem', padding: '10px', width: '100%' }}>
        <option value="">Select an option</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
  
      {/* Conditional rendering based on selection */}
      {items.map((item) => {
        if (selection === item.id.toString()) {
          return (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              {/* The <pre> tag is used to display the item's example code in a preformatted way, preserving spaces and line breaks.  */}
              {/* The <code> tag inside <pre> further specifies that the content is a piece of computer code. */}
              <pre className="code-block"><code>{formatCode(item.example)}</code></pre>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;