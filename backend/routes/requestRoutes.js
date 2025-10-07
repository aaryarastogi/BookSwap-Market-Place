import express from "express";
import BookRequest from "../models/BookRequest.js";
import Book from "../models/Book.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookId", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() === req.user._id.toString())
      return res.status(400).json({ message: "Cannot request your own book" });

    const existingRequest = await BookRequest.findOne({
      book: book._id,
      requester: req.user._id,
    });

    if (existingRequest)
      return res.status(400).json({ message: "Request already sent" });

    const request = await BookRequest.create({
      book: book._id,
      requester: req.user._id,
      owner: book.user,
    });

    res.status(201).json({ message: "Request sent", request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/owner", protect, async (req, res) => {
  try {
    const requests = await BookRequest.find({ owner: req.user._id })
      .populate("book", "title author")
      .populate("requester", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/sent", protect, async (req, res) => {
  try {
    const requests = await BookRequest.find({ requester: req.user._id })
      .populate("book", "title author")
      .populate("owner", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  const incoming = await Request.find({ bookOwner: req.user._id })
    .populate("requester", "name")
    .populate("book", "title");
  const sent = await Request.find({ requester: req.user._id })
    .populate("book", "title");
  res.json({ incoming, sent });
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { status } = req.body; 
    const request = await BookRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (!["accepted", "declined"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    request.status = status;
    await request.save();

    res.json({ message: "Request updated", request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;