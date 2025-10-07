import React from "react";

const BookCard = ({ book, onRequest }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:scale-105 transition transform duration-300">
      <img
        src={book.image || "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-500 text-sm">Condition: {book.condition}</p>
      {onRequest && (
        <button
          onClick={() => onRequest(book._id)}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Request Book
        </button>
      )}
    </div>
  );
};

export default BookCard;