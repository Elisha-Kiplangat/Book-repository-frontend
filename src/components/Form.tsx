import { useRef, useEffect } from 'react'; 
import axios from 'axios';
import './Form.scss';
import { Book } from './BookReducer';

interface FormProps {
  dispatch: any; 
  bookToEdit?: Book | null;
  setBookToEdit: (value: any) => void;
}

const Form = ({ dispatch, bookToEdit, setBookToEdit }: FormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bookToEdit) {
      if (titleRef.current) titleRef.current.value = bookToEdit.title;
      if (authorRef.current) authorRef.current.value = bookToEdit.author;
      if (yearRef.current) yearRef.current.value = bookToEdit.year;
    }
  }, [bookToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const year = yearRef.current?.value;

    if (title && author && year) {
      const newBook = { title, author, year };

      try {
        if (bookToEdit) {
          const response = await axios.put(`http://localhost:8000/books/${bookToEdit.id}`, newBook);
          dispatch({ type: 'EDIT_BOOK', payload: response.data });
          setBookToEdit(null); // Clear edit mode
        } else {
          const response = await axios.post('http://localhost:8000/books', newBook);
          dispatch({ type: 'ADD_BOOK', payload: response.data });
        }
        if (titleRef.current) titleRef.current.value = '';
        if (authorRef.current) authorRef.current.value = '';
        if (yearRef.current) yearRef.current.value = '';
      } catch (error) {
        console.error('Failed to submit book', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          ref={titleRef}
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          placeholder="Author"
          ref={authorRef}
          required
        />
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          placeholder="Year"
          ref={yearRef}
          required
        />
        <button type="submit">{bookToEdit ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default Form;
