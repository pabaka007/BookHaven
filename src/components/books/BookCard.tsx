import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Book } from '../../types';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(book);
    toast.success(`${book.title} added to cart!`);
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link to={`/books/${book.id}`} className="block">
        <div className="relative">
          <img
            src={book.image_url || 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg'}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          
          <div className="flex items-center mb-2">
            <div className="flex space-x-1 mr-2">
              {renderStars(book.rating)}
            </div>
            <span className="text-sm text-gray-500">({book.rating || 0})</span>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-700">
              ${book.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors transform hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
          
          <div className="mt-3 text-sm text-gray-500">
            Category: <span className="text-amber-700 font-medium">{book.category}</span>
          </div>
          
          {book.stock_quantity < 10 && book.stock_quantity > 0 && (
            <div className="mt-2 text-sm text-orange-600">
              Only {book.stock_quantity} left in stock!
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BookCard;