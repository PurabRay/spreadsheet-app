"use client";

import React, { useEffect, useRef } from 'react';
import useStore from '../../store';

const Grid = () => {
  const { data, searchQuery, updateCell, currentPage, rowsPerPage, setCurrentPage } = useStore();
  const highlightedCellRef = useRef(null);

  const handleCellChange = (e, row, col) => {
    let value = e.target.value;
    
    
    if (col === 0) {
      if (/[^0-9]/.test(value)) {
        alert(`Invalid value for row ${row + 1}, column ${col + 1}. Please enter only numbers.`);
        value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      }
    }
    
    updateCell(row, col, value);
  };

  const handleBlur = (e, row, col) => {
    if (col === 0) {
      if (e.target.value && isNaN(e.target.value)) {
        alert(`Invalid number at row ${row + 1}, column ${col + 1}`);
        updateCell(row, col, ''); // Clear the invalid number input
      }
    } else if (col === 1) {
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

 
    rows.push(
      <div key="labels" style={{ display: 'flex', fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: '0.5rem 0' }}>
        <div style={{ flex: '1 1 6rem', textAlign: 'center', padding: '0 0.5rem' }}>Numbers</div>
        <div style={{ flex: '1 1 6rem', textAlign: 'center', padding: '0 0.5rem' }}>Email</div>
        {Array.from({ length: 48 }).map((_, index) => (
          <div key={index} style={{ flex: '1 1 6rem', padding: '0 0.5rem' }} />
        ))}
      </div>
    );

   
    for (let i = startRow; i < endRow && i < data.length; i++) {
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
              minWidth: '5rem',
              maxWidth: '12rem',
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: '0.5rem 1rem',
            margin: '0 0.25rem',
            backgroundColor: currentPage === i ? '#e0e0e0' : 'white',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {i}
        </button>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          Previous
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
      <div style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '1rem' }}>
        {renderGrid()}
      </div>
      {renderPagination()}
    </div>
  );
};

export default Grid;