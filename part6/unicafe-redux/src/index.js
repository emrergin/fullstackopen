import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const okay = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={okay}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <h2>statistics</h2>
      {store.getState().good + store.getState().bad + store.getState().ok>0 &&
      <>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {store.getState().good + store.getState().bad + store.getState().ok}</div>
      <div>average {Math.floor(100*(store.getState().good - store.getState().bad)/
      (store.getState().good + store.getState().bad + store.getState().ok))/100}</div>
      <div>positive {Math.floor(10*store.getState().good/
      (store.getState().good + store.getState().bad + store.getState().ok))/10}%</div>
      </>
      }
      {store.getState().good + store.getState().bad + store.getState().ok===0 &&
      <><div>No statistics to show.</div></>}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
