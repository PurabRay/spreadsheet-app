"use client";
import { useState } from 'react';
import useStore from '../../store';

const Grid = () => {
  const [activeCell, setActiveCell] = useState(null);
  const { data, updateCell, searchQuery } = useStore();

  const handleCellChange = (e, row, col) => {
    updateCell(row, col, e.target.value);
  };
  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < 20; i++) {
      const cells = [];
      for (let j = 0; j < 50; j++) {
        const cellValue = data[i][j] || '';
        const isHighlighted = searchQuery && cellValue.toLowerCase().includes(searchQuery.toLowerCase());
        cells.push(
          <input
            key={`${i}-${j}`}
            style={{
              width: '6rem',
              height: '2rem',
              border: '1px solid #ccc',
              padding: '0 0.5rem',
              backgroundColor: isHighlighted ? '#fef3c7' : 'white',
            }}
            value={cellValue}
            onChange={(e) => handleCellChange(e, i, j)}
            onFocus={() => setActiveCell({ row: i, col: j })}
          />
        );
      }
      rows.push(
        <div key={i} style={{ display: 'flex' }}>
          {cells}
        </div>
      );
    }
    return rows;
  };
  return (
    <div style={{ overflowX: 'auto', padding: '1rem', backgroundColor: '#f3f4f6' }}>
      {renderGrid()}
    </div>
  );
};

export default Grid;