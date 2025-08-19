import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { Book } from '../types';
import { supabase } from '../lib/supabase';
import BookCard from '../components/books/BookCard';

const Home: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch featured books (latest arrivals)
        const { data: featured } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        // Fetch bestsellers (books with highest ratings)
        const { data: bestsellers } = await supabase
          .from('books')
          .select('*')
          .order('rating', { ascending: false })
          .limit(4);

        setFeaturedBooks(featured || []);
        setBestSellers(bestsellers || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-800 via-amber-700 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Discover Your Next Great Read
              </h1>
              <p className="text-xl mb-8 text-amber-100">
                Explore thousands of books across all genres. From bestsellers to hidden gems, 
                find the perfect book for every moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/books"
                  className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-flex items-center justify-center"
                >
                  Browse Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/categories"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-all inline-flex items-center justify-center"
                >
                  Explore Categories
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg"
                alt="Stack of books"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-amber-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Books Available</div>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-amber-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Readers</div>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-amber-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Award Winners</div>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-amber-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest additions to our collection. Fresh stories, new perspectives, 
              and trending titles just waiting to be explored.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 transition-colors"
            >
              View All Books
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Star className="inline h-8 w-8 text-yellow-500 mr-2" />
              Bestsellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular books that readers can't put down. Join thousands of satisfied 
              customers who've made these their favorites.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to know about new releases, 
            special offers, and reading recommendations.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;