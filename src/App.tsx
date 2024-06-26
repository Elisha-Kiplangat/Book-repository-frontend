import { useReducer, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import BookList from './components/BookList';
import BookReducer, { initialState } from './components/BookReducer';

const App = () => {
  const [state, dispatch] = useReducer(BookReducer, initialState);

  useEffect(() => {
    fetchBooks();
  }, []);

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
      <BookList books={state.books} dispatch={dispatch} />
    </div>
  );
};

export default App;
