import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import BookList from './components/BookList';
import BookReducer, { initialState } from './components/BookReducer';

const App = () => {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  // const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      dispatch({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <div className="app-container">
      <h1>My Book Collection</h1>
      <BookList books={state.books} dispatch={dispatch} />
    </div>
  );
};

export default App;
