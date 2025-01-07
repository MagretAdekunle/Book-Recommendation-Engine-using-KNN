# Book Recommendation Engine

A web application that provides book recommendations based on machine learning. The system analyzes book similarities and suggests titles based on your input book, author, or genre preferences.

## Features

- Search by book title, author, or genre

- Real-time recommendations with similarity scores

- Clean and responsive user interface

- RESTful API backend with FastAPI

- Machine learning-powered recommendation system

## Tech Stack

### Frontend

- React.js

- React Bootstrap for UI components

- JavaScript ES6+

- Bootstrap CSS

### Backend

- Python 3.x

- FastAPI

- Pandas

- scikit-learn

- NumPy

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js and npm

- Python 3.x

- pip (Python package installer)

## Installation

1\. Clone the repository:

```bash

git clone <your-repository-url>

cd book-recommendation-engine

```

2\. Install frontend dependencies:

```bash

npm install

```

3\. Install backend dependencies:

```bash

python3 -m pip install fastapi uvicorn pandas scikit-learn numpy

```

## Project Structure

```

book-recommendations/

├── src/                      # Frontend source files

│   ├── App.js               # Main React component

│   ├── components/          # React components

│   │   └── BookRecommendationApp.js

│   └── index.js            # React entry point

├── backend/                 # Backend source files

│   ├── app.py              # FastAPI application

│   ├── filtered_df.pkl     # Preprocessed dataset

│   └── sm_filtered_df.pkl  # Similarity matrix

└── package.json            # NPM dependencies

```

## Running the Application

1\. Start the backend server:

```bash

cd backend

python3 app.py

```

The backend will start on http://localhost:8000

2\. In a new terminal, start the frontend development server:

```bash

# From the project root

npm start

```

The application will open in your browser at http://localhost:3000

## API Endpoints

### POST /api/recommendations

Gets book recommendations based on input.

Request body:

```json

{

  "query": "Book Title",

  "search_type": "book"

}

```

Response:

```json

{

  "input_book": "Book Title",

  "recommendations": [

    {

      "title": "Recommended Book 1",

      "distance": 0.8205

    },

    ...

  ]

}

```

## Development

### Adding New Features

1\. Create a new branch for your feature

2\. Implement the feature

3\. Submit a pull request

### Code Style

- Follow PEP 8 for Python code

- Use ESLint for JavaScript code

- Maintain consistent component structure in React

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgments

- Dataset source: [Dataset source]( https://cdn.freecodecamp.org/project-data/books/book-crossings.zip)

- Thanks to freeCodeCamp
