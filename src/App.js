import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let characters = "";

    if (uppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (lowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (numbers) {
      characters += "0123456789";
    }

    if (symbols) {
      characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if (characters.length === 0) {
      alert("Please select at least one option!");
      return;
    }

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length
      );
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  };

  const copyPassword = () => {
    if (password === "") {
      return;
    }
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const getStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        text: "Weak",
        className: "weak",
        width: "30%"
      };
    }

    if (score <= 4) {
      return {
        text: "Medium",
        className: "medium",
        width: "65%"
      };
    }

    return {
      text: "Strong",
      className: "strong",
      width: "100%"
    };
  };

  const strength = getStrength();

  return (
    <div className="app">
      <div className="password-box">
        <h1>Password Generator</h1>
        <p className="subtitle">
          Create a strong and secure password
        </p>
        <div className="password-display">
          <input type="text" value={password} placeholder="Your password" readOnly/>
          <button className="copy-btn" onClick={copyPassword}>{copied ? "Copied!" : "Copy"}</button>
        </div>

        {password && (
          <div className="strength-section">
            <div className="strength-info">
              <span>Password Strength</span>
              <span className={strength.className}>
                {strength.text}
              </span>
            </div>

            <div className="strength-bar">
              <div
                className={`strength-fill ${strength.className}`}
                style={{ width: strength.width }}
              ></div>
            </div>
          </div>
        )}

        <div className="option">
          <div className="length-heading">
            <label>Password Length</label>
            <span>{length}</span>
          </div>
          <input type="range" min="4" max="30" value={length} onChange={(e) => setLength(e.target.value)} />
        </div>

        <div className="options">
          <label>
            <input type="checkbox" checked={uppercase}
              onChange={(e) =>
                setUppercase(e.target.checked)
              }
            />Uppercase Letters</label>

          <label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) =>
                setLowercase(e.target.checked)
              }
            />
            Lowercase Letters
          </label>

          <label>
            <input type="checkbox" checked={numbers}
              onChange={(e) =>
                setNumbers(e.target.checked)
              }
            /> Numbers</label>

          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) =>
                setSymbols(e.target.checked)
              }/>Special Characters
          </label>

        </div>

        <button
          className="generate-btn"
          onClick={generatePassword}
        >
          Generate Password
        </button>

      </div>
    </div>
  );
}

export default App;