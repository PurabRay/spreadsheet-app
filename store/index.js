import create from 'zustand';

const loadData = () => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('spreadsheetData');
    return savedData ? JSON.parse(savedData) : Array.from({ length: 1000 }, () => Array(50).fill('')); // Assume a large dataset
  } else {
    return Array.from({ length: 1000 }, () => Array(50).fill(''));
  }
};

const useStore = create((set) => ({
  data: loadData(),
  history: [],
  future: [],
  searchQuery: '',
  currentPage: 1,
  rowsPerPage: 20,

  updateCell: (row, col, value) =>
    set((state) => {
      const newData = [...state.data];
      const previousValue = state.data[row][col];
      newData[row][col] = value;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData));
      }

      return {
        data: newData,
        history: [...state.history, { row, col, previousValue }],
        future: [],
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const lastChange = state.history.pop();
      const newData = [...state.data];
      newData[lastChange.row][lastChange.col] = lastChange.previousValue;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData));
      }

      return {
        data: newData,
        history: [...state.history],
        future: [...state.future, { row: lastChange.row, col: lastChange.col, nextValue: newData[lastChange.row][lastChange.col] }],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const lastUndo = state.future.pop();
      const newData = [...state.data];
      const previousValue = state.data[lastUndo.row][lastUndo.col];
      newData[lastUndo.row][lastUndo.col] = lastUndo.nextValue;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData));
      }

      return {
        data: newData,
        history: [...state.history, { row: lastUndo.row, col: lastUndo.col, previousValue }],
        future: [...state.future],
      };
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  
  setCurrentPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
}));

export default useStore;
