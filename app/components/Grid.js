"use client";

import React, { useEffect, useRef } from 'react';
import useStore from '../../store';

const Grid = () => {
  const { data, searchQuery, updateCell, currentPage, rowsPerPage, setCurrentPage } = useStore();
  const highlightedCellRef = useRef(null);

  const handleCellChange = (e, row, col) => {
    updateCell(row, col, e.target.value);
  };

  const handleBlur = (e, row, col) => {
    if (col === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (e.target.value && !emailRegex.test(e.target.value)) {
        alert(`Invalid email address at row ${row + 1}, column ${col + 1}`);
        updateCell(row, col, ''); // Clear the invalid email input
      }
    }
  };

  const renderGrid = () => {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    const rows = [];

    // Add labels for the columns
    rows.push(
      <div key="labels" style={{ display: 'flex', fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: '0.5rem 0' }}>
        <div style={{ flex: '1 1 6rem', textAlign: 'center', padding: '0 0.5rem' }}>Numbers</div>
        <div style={{ flex: '1 1 6rem', textAlign: 'center', padding: '0 0.5rem' }}>Email</div>
        {Array.from({ length: 48 }).map((_, index) => (
          <div key={index} style={{ flex: '1 1 6rem', padding: '0 0.5rem' }} />
        ))}
      </div>
    );

    // Render the grid cells for the current page
    for (let i = startRow; i < endRow; i++) {
      const cells = [];
      for (let j = 0; j < 50; j++) {
        const cellValue = data[i][j] || '';
        const isHighlighted = searchQuery && cellValue.toLowerCase().includes(searchQuery.toLowerCase());

        cells.push(
          <input
            key={`${i}-${j}`}
            style={{
              flex: '1 1 6rem',
              height: '2rem',
              border: '1px solid #ccc',
              padding: '0 0.5rem',
              backgroundColor: isHighlighted ? '#fef3c7' : 'white',
              minWidth: '5rem', // Ensure a minimum width on small screens
              maxWidth: '12rem', // Cap the width for larger screens
            }}
            value={cellValue}
            onChange={(e) => handleCellChange(e, i, j)}
            onBlur={(e) => handleBlur(e, i, j)}
            ref={isHighlighted ? highlightedCellRef : null}
          />
        );
      }
      rows.push(
        <div key={i} style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {cells}
        </div>
      );
    }
    return rows;
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
      <div style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '1rem' }}>
        {renderGrid()}
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ padding: '0.5rem 1rem' }}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ padding: '0.5rem 1rem' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Grid;
