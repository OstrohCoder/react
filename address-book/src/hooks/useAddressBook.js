import { useState, useEffect } from "react";

const useAddressBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBooks([]);
    setFilteredBooks([]);
  }, []);

  const addBook = async (book) => {
    try {
      if (!book.firstName || !book.lastName || !book.phone) {
        setError("All required fields must be filled");
        return;
      }

      setLoading(true);

      const newBook = { ...book, id: Date.now() };

      setBooks((prev) => [...prev, newBook]);
      setFilteredBooks((prev) => [...prev, newBook]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id, updatedFields) => {
    try {
      setLoading(true);

      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
      );
      setFilteredBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setLoading(true);

      setBooks((prev) => prev.filter((b) => b.id !== id));
      setFilteredBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const search = (term) => {
    if (!term.trim()) {
      setFilteredBooks(books);
      return;
    }

    const lower = term.toLowerCase();
    setFilteredBooks(
      books.filter(
        (b) =>
          b.firstName.toLowerCase().includes(lower) ||
          b.lastName.toLowerCase().includes(lower)
      )
    );
  };

  return {
    books: filteredBooks,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    search,
    setError,
  };
};

export default useAddressBook;
