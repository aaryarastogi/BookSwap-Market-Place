import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-200 cursor-pointer">
            BookSwap
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            {user && <Link to="/add-book" className="hover:text-gray-200 cursor-pointer">Add Book</Link>}
            {user && <Link to="/my-books" className="hover:text-gray-200 cursor-pointer">My Books</Link>}
            {user && <Link to="/requests" className="hover:text-gray-200 cursor-pointer">Requests</Link>}
            {user ? (
              <>
                <span className="ml-2">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <> 
                <Link to="/login" className="hover:text-gray-200 cursor-pointer">Login</Link>
                <Link to="/signup" className="hover:text-gray-200 cursor-pointer">Signup</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-green-800">Home</Link>
          {user && <Link to="/add-book" className="block px-3 py-2 rounded hover:bg-green-800 cursor-pointer">Add Book</Link>}
          {user && <Link to="/my-books" className="block px-3 py-2 rounded hover:bg-green-800 cursor-pointer">My Books</Link>}
          {user && <Link to="/requests" className="block px-3 py-2 rounded hover:bg-green-800 cursor-pointer">Requests</Link>}
          {user ? (
            <>
              <span className="block px-3 py-2">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 bg-red-500 rounded hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded hover:bg-green-800 cursor-pointer">Login</Link>
              <Link to="/signup" className="block px-3 py-2 rounded hover:bg-green-800 cursor-pointer">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;