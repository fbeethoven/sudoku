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
