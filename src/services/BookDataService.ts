import axios from "axios";

interface BookList {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
}

interface Book {
  title: string;
  authors: string[];
  previewLink: string;
}

export class BookDataService {
  private nytApiKey: string;
  private googleBooksApiKey: string;

  constructor(nytApiKey: string, googleBooksApiKey: string) {
    this.nytApiKey = nytApiKey;
    this.googleBooksApiKey = googleBooksApiKey;
  }

  async getBookLists(): Promise<BookList[]> {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.nytApiKey}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async getBooksByListCode(listCode: string): Promise<Book[]> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${listCode}&key=${this.googleBooksApiKey}`
      );

      return response.data.items.map((book: any) => ({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        previewLink: book.volumeInfo.previewLink || "",
      }));
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}
