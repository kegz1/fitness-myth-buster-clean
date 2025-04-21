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
      setResponse('❌ Error connecting to server. Try again later.');
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
        <form onSubmit={handleSubmit} className="myth-form">
          <textarea
            value={mythQuestion}
            onChange={(e) => setMythQuestion(e.target.value)}
            placeholder="Enter a fitness myth like 'fasted cardio burns more fat'..."
            rows={4}
            required
            className="myth-input"
          />
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Thinking...' : 'Deep Senzu Research'}
          </button>
        </form>

        {response && (
          <div className="result-container">
            <h2>RESULT</h2>
            <pre>{response}</pre>
          </div>
        )}
      </main>

      <footer className="App-footer">Powered by DEEP SENZU + OPENAI</footer>
    </div>
  );
}

export default App;
