import { useReducer, useEffect, useState, createContext } from 'react';
import axios from 'axios';
import './App.scss';
import BookList from './components/BookList';
import BookReducer, { initialState } from './components/BookReducer';

export const refreshContext = createContext({ refresh: false, setRefresh: (refresh: boolean) => {} });

const App = () => {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, [refresh]); // Fetch books when refresh changes

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://book-repository-api-64t5.onrender.com/books');
      dispatch({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <div className="app-container">
      <h1>My Book Collection</h1>
      <refreshContext.Provider value={{ refresh, setRefresh }}>
        <BookList books={state.books} dispatch={dispatch} />
      </refreshContext.Provider>
    </div>
  );
};

export default App;
