"use client";
import React from 'react';
import useStore from '../../store';

const UndoRedoControls = () => {
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={undo} style={{ marginRight: '1rem' }}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default UndoRedoControls;
