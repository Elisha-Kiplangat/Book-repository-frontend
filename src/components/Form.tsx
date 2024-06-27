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
      if (yearRef.current) yearRef.current.value = bookToEdit.publication_year;
    }
  }, [bookToEdit]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const publication_year = Number(yearRef.current?.value);

    if (title && author && publication_year) {
      const newBook = { title, author, publication_year };

      try {
        if (bookToEdit) {
          const response = await axios.put(`http://localhost:8000/books/${bookToEdit.id}`, newBook);
          dispatch({ type: 'EDIT_BOOK', payload: response.data });
          setBookToEdit(''); 
          console.log(response)
        } else {
          const response = await axios.post('http://localhost:8000/books', newBook, 
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          
          dispatch({ type: 'ADD_BOOK', payload: response.data });
          setBookToEdit('')
          console.log(response)
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
        <label htmlFor="publication_year">Year:</label>
        <input
          type="number"
          id="publication_year"
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
