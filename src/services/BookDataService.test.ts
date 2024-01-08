import axios from "axios";
import { BookDataService } from "./BookDataService";

jest.mock("axios");

describe("BookDataService", () => {
  const mockNytApiKey = process.env.NYT_API_KEY || "default-nyt-api-key";
  const mockGoogleBooksApiKey =
    process.env.GOOGLE_BOOKS_API_KEY || "default-google-books-api-key";
  const bookDataService = new BookDataService(
    mockNytApiKey,
    mockGoogleBooksApiKey
  );

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches book lists successfully", async () => {
    const mockBookLists: any = [
      {
        list_name: "hardcover-fiction",
        display_name: "Hardcover Fiction",
        list_name_encoded: "hardcover-fiction",
        oldest_published_date: "2022-01-01",
        newest_published_date: "2022-06-01",
        updated: "WEEKLY",
      },
    ];

    // Mocking Axios get function to return the expected response
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { results: mockBookLists } });

    const result = await bookDataService.getBookLists();

    expect(result).toEqual(mockBookLists);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${mockNytApiKey}`
    );
  });

  it("handles errors when fetching book lists", async () => {
    const errorMessage = "Error fetching book lists";
    // Mocking Axios get function to simulate an error
    jest.spyOn(axios, "get").mockRejectedValue(new Error(errorMessage));

    await expect(bookDataService.getBookLists()).rejects.toThrow(
      "Internal Server Error"
    );
  });

  it("fetches books by list code successfully", async () => {
    const mockListCode = "hardcover-fiction";
    const mockGoogleBooksResponse: any = {
      data: {
        items: [
          {
            volumeInfo: {
              title: "The Great Gatsby",
              authors: ["F. Scott Fitzgerald"],
              previewLink: "https://books.google.com/greatgatsby",
            },
          },
        ],
      },
    };

    // Mocking Axios get function to return the expected response
    jest.spyOn(axios, "get").mockResolvedValue(mockGoogleBooksResponse);

    const result = await bookDataService.getBooksByListCode(mockListCode);

    expect(result).toEqual([
      {
        title: "The Great Gatsby",
        authors: ["F. Scott Fitzgerald"],
        previewLink: "https://books.google.com/greatgatsby",
      },
    ]);

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/books/v1/volumes?q=${mockListCode}&key=${mockGoogleBooksApiKey}`
    );
  });

  it("handles errors when fetching books by list code", async () => {
    const errorMessage = "Error fetching books from Google Books";
    // Mocking Axios get function to simulate an error
    jest.spyOn(axios, "get").mockRejectedValue(new Error(errorMessage));

    await expect(
      bookDataService.getBooksByListCode("some-list-code")
    ).rejects.toThrow("Internal Server Error");
  });
});
