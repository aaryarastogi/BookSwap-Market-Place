import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BookCard from "../components/BookCard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import backend_url from "../config/auth.js";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/books`);
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const handleRequest = async (bookId) => {
    if (!user) return alert("Please login to request a book");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backend_url}/api/requests/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        BookSwap Marketplace
      </h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onRequest={book.user._id !== user?.id ? handleRequest : null} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;