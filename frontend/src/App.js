import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://fitness-myth-backend.onrender.com/api/debunk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim: inputValue }),
      });

      const data = await response.json();

      if (data.result) {
        setResult(data.result);
      } else {
        setError('No response received from backend.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while connecting to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="App-header">
          <h1>HTC FITNESS MYTH BUSTER</h1>
          <p>Type a fitness myth below and we'll break it down with science.</p>
        </header>

        <main>
          <div className="myth-form">
            <textarea
              className="myth-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. Fasted cardio burns more fat..."
            />
            <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Deep Senzu Research'}
            </button>
          </div>

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div>Analyzing Myth...</div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          {result && (
            <div className="result-container">
              <pre className="result-content">{result}</pre>
            </div>
          )}
        </main>

        <footer className="App-footer">Powered by DEEP SENZU + OPENAI</footer>
      </div>
    </div>
  );
}

export default App;
