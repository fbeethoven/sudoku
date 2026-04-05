import { React, useState } from "react";
import "./SudokuDisplay.css";


type Props = {
  puzzle: string;
  readOnly?: boolean;
  showIndices?: boolean;
};

function parsePuzzle(puzzle: string): (string | null)[] | null {
  if (typeof puzzle !== "string") return null;
  const normalized = puzzle.replace(/\s/g, "");
  if (normalized.length !== 81) return null;
  return normalized.split("").map((ch) => {
    return /[1-9]/.test(ch) ? ch : "0";
  });
}


export default function SudokuDisplay({
  puzzle,
  readOnly = true,
}: Props): JSX.Element {
  const cells = parsePuzzle(puzzle);
  if (!cells) {
    return <div className="sudoku-error">Invalid puzzle string — must be exactly 81 characters.</div>;
  }

  const [puzzleSolve, setPuzzleSolve] = useState<string[]>(cells as string[])

  const handleCellChange = (idx: number, val: string) => {
    setPuzzleSolve((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  return (
    <div className="sudoku-wrapper">
      <div className="sudoku-grid" role="table" aria-label="Sudoku board">
        {Array.from({ length: 9 }).map((_, r) => (
          <div className="sudoku-row" role="row" key={r}>
            {Array.from({ length: 9 }).map((_, c) => {
              const idx = r * 9 + c;
              const value = puzzleSolve[idx];
              console.log(idx, value)
              const isGiven = cells[idx] !== "0";
              return (
                <SudokuCell
                  key={c}
                  row={r}
                  col={c}
                  idx={idx}
                  value={value}
                  readOnly={readOnly}
                  isGiven={isGiven}
                  onChange={handleCellChange}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}



type SudokuCellProps = {
  row: number;
  col: number;
  idx: number;
  value: string;
  readOnly?: boolean;
  isGiven?: boolean;
  onChange: (idx: number, value: string) => void;
};

function SudokuCell({
  row,
  col,
  idx,
  value,
  readOnly = true,
  isGiven = false,
  onChange,
}: SudokuCellProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ch = e.target.value;
    const valid = /[1-9]/.test(ch) ? ch : "0";
    onChange(idx, valid);
  };

  const cellClass = [
    "sudoku-cell",
    isGiven ? "given" : "empty",
    (col + 1) % 3 === 0 && col !== 8 ? "subgrid-v" : "",
    (row + 1) % 3 === 0 && row !== 8 ? "subgrid-h" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cellClass} role="cell" data-row={row} data-col={col}>
      <input
        className="sudoku-input"
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value !== "0" ? value : ""}
        readOnly={readOnly || isGiven}
        aria-label={`Row ${row + 1} Column ${col + 1}`}
        onChange={handleChange}
      />
    </div>
  );
}
