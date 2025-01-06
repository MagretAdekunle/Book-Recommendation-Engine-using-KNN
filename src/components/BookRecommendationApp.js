import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookRecommendationApp = () => {
  const [searchType, setSearchType] = useState('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async (query, type) => {
    try {
      const response = await fetch('http://localhost:8000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          search_type: type
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setRecommendations(null);
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    try {
      const results = await getRecommendations(searchQuery, searchType);
      setRecommendations(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h2 className="text-center mb-0">Book Recommendations</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <div className="d-flex gap-2 mb-3">
              <Form.Select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                style={{ width: '200px' }}
              >
                <option value="book">Book Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
              </Form.Select>
              
              <div className="d-flex flex-grow-1 gap-2">
                <Form.Control
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Enter ${searchType}...`}
                />
                <Button type="submit" disabled={isLoading}>
                  Search
                </Button>
              </div>
            </div>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {isLoading && (
            <div className="text-center mt-4">
              Loading recommendations...
            </div>
          )}

          {recommendations && (
            <div className="mt-4">
              <h4>Recommendations for '{recommendations.input_book}'</h4>
              <div className="mt-3">
                {recommendations.recommendations.map((rec, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <span>
                        {index + 1}. {rec.title}
                      </span>
                      <span className="text-muted">
                        Similarity: {rec.distance.toFixed(4)}
                      </span>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookRecommendationApp;