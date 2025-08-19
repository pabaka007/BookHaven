import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(bookId, newQuantity);
  };

  const handleRemoveItem = (bookId: string, title: string) => {
    removeItem(bookId);
    toast.success(`${title} removed from cart`);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/signin', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/books"
            className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.book.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.book.image_url || 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg'}
                        alt={item.book.title}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/books/${item.book.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-amber-700 transition-colors block"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-gray-600 mt-1">by {item.book.author}</p>
                        <p className="text-sm text-gray-500 mt-1">Category: {item.book.category}</p>
                        <p className="text-sm text-gray-500 mt-1">ISBN: {item.book.isbn}</p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            
                            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.book.id, item.book.title)}
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-semibold text-amber-700">
                          ${(item.book.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.book.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <p className="text-sm text-green-600">
                    🎉 Free shipping on orders over $50!
                  </p>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-amber-700">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors font-semibold"
              >
                {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </button>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;