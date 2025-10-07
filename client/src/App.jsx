import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddBook from "./pages/AddBook.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import EditBook from "./pages/EditBook.jsx";
import Requests from "./pages/Requests.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/edit-book/:id" element={<EditBook/>}/>
        <Route path="/requests" element={<Requests/>}/>
      </Routes>
    </Router>
  );
}

export default App;