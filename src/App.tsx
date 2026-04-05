import { useState } from 'react'
import ReactDOM from "react-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SudokuDisplay from "./components/SudokuDisplay";
import './App.css'


const puzzle =
  "530070000600195000098000060800060003400803001700020006060000280000419005000080079";

function App() {
  return (
    <>
      <h1>SUDOKU</h1>
      <SudokuDisplay puzzle={puzzle} readOnly={false} />
    </>
  )
}

export default App
