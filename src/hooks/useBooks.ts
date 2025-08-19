import { useState, useEffect } from 'react';
import { Book } from '../types';

// Mock data for development
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    price: 12.99,
    image_url: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
    category: 'Fiction',
    isbn: '978-0-7432-7356-5',
    stock_quantity: 15,
    rating: 4.5,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    price: 14.99,
    image_url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    category: 'Fiction',
    isbn: '978-0-06-112008-4',
    stock_quantity: 20,
    rating: 4.8,
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    price: 13.99,
    image_url: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
    category: 'Science Fiction',
    isbn: '978-0-452-28423-4',
    stock_quantity: 25,
    rating: 4.7,
    created_at: '2024-01-13T10:00:00Z',
    updated_at: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    price: 11.99,
    image_url: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    category: 'Romance',
    isbn: '978-0-14-143951-8',
    stock_quantity: 18,
    rating: 4.6,
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
    price: 15.99,
    image_url: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
    category: 'Fiction',
    isbn: '978-0-316-76948-0',
    stock_quantity: 12,
    rating: 4.2,
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    description: 'The first book in the beloved Harry Potter series about a young wizard\'s adventures.',
    price: 16.99,
    image_url: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    category: 'Fantasy',
    isbn: '978-0-439-70818-8',
    stock_quantity: 30,
    rating: 4.9,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'An epic high fantasy novel about the quest to destroy the One Ring.',
    price: 24.99,
    image_url: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
    category: 'Fantasy',
    isbn: '978-0-544-00341-5',
    stock_quantity: 22,
    rating: 4.8,
    created_at: '2024-01-09T10:00:00Z',
    updated_at: '2024-01-09T10:00:00Z'
  },
  {
    id: '8',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'A science fiction epic set in a distant future amidst a feudal interstellar society.',
    price: 18.99,
    image_url: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
    category: 'Science Fiction',
    isbn: '978-0-441-17271-9',
    stock_quantity: 16,
    rating: 4.4,
    created_at: '2024-01-08T10:00:00Z',
    updated_at: '2024-01-08T10:00:00Z'
  }
];

interface UseBooks {
  books: Book[];
  loading: boolean;
  error: string | null;
  searchBooks: (query: string) => void;
  filterByCategory: (category: string) => void;
  fetchBooks: () => void;
}

export const useBooks = (): UseBooks => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (query?: string, category?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredBooks = [...mockBooks];
      
      // Filter by search query
      if (query) {
        filteredBooks = filteredBooks.filter(book =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by category
      if (category && category !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }
      
      setBooks(filteredBooks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = (query: string) => {
    fetchBooks(query);
  };

  const filterByCategory = (category: string) => {
    fetchBooks('', category);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    searchBooks,
    filterByCategory,
    fetchBooks,
  };
};