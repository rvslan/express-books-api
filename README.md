
# Books API

API for retrieving book lists and details.

## Prerequisites

- Node.js (version 19)
- npm (version 9.2.0)
- Docker (if running with Docker)

## Getting Started

### Local Development

1. **Install Dependencies:**

    ```bash
    npm install
    ```

2. **Set Environment Variables:**

    Create a `.env` file in the root of your project with the following content:

    ```env
    NYT_API_KEY=your-nyt-api-key
    GOOGLE_BOOKS_API_KEY=your-google-books-api-key
    ```

    Replace `your-nyt-api-key` and `your-google-books-api-key` with your actual API keys.

3. **Run the Application:**

    ```bash
    npm start
    ```

    The application will be running at http://localhost:3000.

### Docker

1. **Build Docker Image:**

    ```bash
    docker build -t express-books-api .
    ```

2. **Run Docker Container:**

    ```bash
    docker run -p 3000:3000 -e NYT_API_KEY=your-nyt-api-key -e GOOGLE_BOOKS_API_KEY=your-google-books-api-key your-app-name
    ```

    Replace `your-nyt-api-key` and `your-google-books-api-key` with your actual API keys.

3. The application will be accessible at http://localhost:3000.

## API Documentation

- **Swagger UI:**

    Once the application is running, visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to explore the Swagger documentation.
    
### Endpoints  

#### 1. Get Book Lists  -  
- **Endpoint:**  `/api/books` 
- **Method:**  `GET`  -  
- **Description:** Retrieve a list of book lists from the New York Times. 

##### Request  - No request parameters required. 
##### Response  

```json
    [
	    {"list_name":"Combined Print and E-Book Fiction","display_name":"Combined Print & E-Book Fiction","list_name_encoded":"combined-print-and-e-book-fiction","oldest_published_date":"2011-02-13","newest_published_date":"2024-01-14","updated":"WEEKLY"}
    ]
  ```
  
#### 2. Get Books by List Code  -  
- **Endpoint:**  `/api/books/:listCode` 
- **Method:**  `GET`  -  
- **Description:** Retrieve a list of books on Google based on the provided list code.

##### Request
- **Parameters:** `listCode` (string): The code of the book list.
##### Response  

```json
    [
	    {"title":"I sette mariti di Evelyn Hugo","authors":["Taylor Jenkins Reid"],"previewLink":"http://books.google.it/books?id=yCA6EAAAQBAJ&printsec=frontcover&dq=combined-print-and-e-book-fiction&hl=&cd=1&source=gbs_api"},{"title":"L'incastro (im)perfetto","authors":["Colleen Hoover"],"previewLink":"http://books.google.it/books?id=laQcrgEACAAJ&dq=combined-print-and-e-book-fiction&hl=&cd=2&source=gbs_api"},{"title":"Il lungo cammino verso la verità","authors":["David Baldacci"],"previewLink":"http://books.google.it/books?id=m---DwAAQBAJ&printsec=frontcover&dq=combined-print-and-e-book-fiction&hl=&cd=3&source=gbs_api"}
	]
  ```

## Running Tests

```bash
npm test
