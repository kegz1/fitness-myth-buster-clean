import React, { useState } from 'react';
import './App.css';

function App() {
  const [mythQuestion, setMythQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await fetch('https://fitness-myth-backend.onrender.com/api/verify-myth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: mythQuestion }),
      });
      
      const data = await result.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error connecting to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fitness Myth Buster</h1>
        <p>Ask about any fitness myth and get fact-checked answers!</p>
      </header>
      
      <main>
        <form onSubmit={handleSubmit}>
          <textarea
            value={mythQuestion}
            onChange={(e) => setMythQuestion(e.target.value)}
            placeholder="Enter a fitness claim or myth to verify..."
            rows={4}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Verify Myth'}
          </button>
        </form>
        
        {response && (
          <div className="response-container">
            <h2>Analysis:</h2>
            <div className="response-text">
              {response}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
