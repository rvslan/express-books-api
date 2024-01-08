/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Operations related to books
 */

import express from "express";
import { BookDataService } from "../services/BookDataService";
require("dotenv").config();

const router = express.Router();
const nytApiKey = process.env.NYT_API_KEY || "";
const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY || "";

const bookDataService = new BookDataService(nytApiKey, googleBooksApiKey);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of available book lists from NY Times.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of book lists.
 *         content:
 *           application/json:
 *             example:
 *               - list_name: 'hardcover-fiction'
 *                 display_name: 'Hardcover Fiction'
 *                 list_name_encoded: 'hardcover-fiction'
 *                 newest_published_date: '2022-01-01'
 *                 updated: 'WEEKLY'
 */
router.get("/", async (req, res) => {
  try {
    const bookLists = await bookDataService.getBookLists();
    res.json(bookLists);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books list" });
  }
});

/**
 * @swagger
 * /books/{listCode}:
 *   get:
 *     summary: Get books from Google Books based on the provided NY Times list code.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: listCode
 *         required: true
 *         description: NY Times list code.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             example:
 *               - title: 'The Great Gatsby'
 *                 authors: ['F. Scott Fitzgerald']
 *                 previewLink: 'https://books.google.com/greatgatsby'
 *               - title: 'To Kill a Mockingbird'
 *                 authors: ['Harper Lee']
 *                 previewLink: 'https://books.google.com/tokillamockingbird'
 *       404:
 *         description: Books not found for the given list code.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Books not found for the given list code.'
 */
router.get("/:listCode", async (req, res) => {
  const { listCode } = req.params;
  try {
    const books = await bookDataService.getBooksByListCode(listCode);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book by list code" });
  }
});

export default router;
