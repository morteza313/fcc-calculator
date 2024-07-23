import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [exoression, setExoression] = useState("");
  const et = exoression.trim();
  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  }
  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExoression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer);
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString())
    } else if (isOperator(symbol)) {
      setExoression(et + " " + symbol + " ")
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (exoression.charAt(0) !== "0") {
        setExoression(exoression + symbol);
      }
    } else if (symbol === ".") {
      //split by oprators and get last number 
      const lastNumber = exoression.split(/[-+*/]/g).pop();
      if (lastNumber?.includes(".")) return;
      setExoression(exoression + symbol);
    } else {
      if (exoression.charAt(0) === '0') {
        setExoression(exoression.slice(1) + symbol);
      } else {
        setExoression(exoression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;

      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExoression("");
  }
  return (
    <>
      <div className='container'>
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{exoression}</div>
          </div>
          <button id="clear" onClick={() => buttonPress("clear")} className="light-gray">C</button>
          <button id="negative" onClick={() => buttonPress("negative")} className="light-gray">+/-</button>
          <button id="percentage" onClick={() => buttonPress("percentage")} className="light-gray">%</button>
          <button id="divide" onClick={() => buttonPress("/")} className="yellow">/</button>
          <button id="seven" onClick={() => buttonPress("7")} className="dark-gray">7</button>
          <button id="eight" onClick={() => buttonPress("8")} className="dark-gray">8</button>
          <button id="nine" onClick={() => buttonPress("9")} className="dark-gray">9</button>
          <button id="multiply" onClick={() => buttonPress("*")} className="yellow">*</button>
          <button id="four" onClick={() => buttonPress("4")} className="dark-gray">4</button>
          <button id="five" onClick={() => buttonPress("5")} className="dark-gray">5</button>
          <button id="six" onClick={() => buttonPress("6")} className="dark-gray">6</button>
          <button id="subtract" onClick={() => buttonPress("-")} className="yellow">-</button>
          <button id="one" onClick={() => buttonPress("1")} className="dark-gray">1</button>
          <button id="two" onClick={() => buttonPress("2")} className="dark-gray">2</button>
          <button id="three" onClick={() => buttonPress("3")} className="dark-gray">3</button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">+</button>
          <button id="zero" onClick={() => buttonPress("0")} className="dark-gray">0</button>
          <button id="decimal" onClick={() => buttonPress(".")} className="dark-gray">.</button>
          <button id="equals" onClick={() => buttonPress("=")} className="yellow">=</button>

        </div>
      </div>
    </>
  )
}

export default App
