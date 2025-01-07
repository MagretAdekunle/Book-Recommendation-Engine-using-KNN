import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookRecommendationApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchType, setSearchType] = useState("book");
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async (query, type) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            search_type: type,
          }),
        }
      );

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
    setError("");
    setRecommendations(null);

    if (!searchQuery.trim()) {
      setError("Please enter a search term");
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

  const Navigation = () => (
    <Navbar bg="dark" variant="dark" className="py-2">
      <Container fluid className="px-3">
        <Navbar.Brand className="fs-4">BookMind AI</Navbar.Brand>
        <Nav>
          <Nav.Link
            active={currentPage === "home"}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </Nav.Link>
          <Nav.Link
            active={currentPage === "recommend"}
            onClick={() => setCurrentPage("recommend")}
          >
            Recommendations
          </Nav.Link>
          <Nav.Link
            active={currentPage === "about"}
            onClick={() => setCurrentPage("about")}
          >
            About
          </Nav.Link>
          <Nav.Link
            active={currentPage === "research"}
            onClick={() => setCurrentPage("research")}
          >
            Research
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );

  const HomePage = () => (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="fs-1 mb-3">Welcome to BookMind AI</h1>
        <p className="fs-5 mb-3">
          Discover your next favorite book using our advanced AI-powered
          recommendation system.
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => setCurrentPage("recommend")}
        >
          Get Started
        </Button>
      </div>

      <Row className="g-2">
        {[
          "Smart Recommendations",
          "Multiple Search Options",
          "Research-Backed",
        ].map((title, i) => (
          <Col key={i} lg={4}>
            <Card className="h-100">
              <Card.Body className="p-3">
                <Card.Title className="fs-5">{title}</Card.Title>
                <Card.Text className="md">
                  {title === "Smart Recommendations" &&
                    "A sophisticated web application recommendation system that suggests books to users based on their reading preferences, powered by the K-Nearest Neighbors (KNN) algorithm."}
                  {title === "Multiple Search Options" &&
                    "Search by book title, author, or genre to discover new books tailored to your interests."}
                  {title === "Research-Backed" &&
                    "Built on cutting-edge machine learning algorithms and extensive literary research."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  const RecommendationPage = () => (
    <Container fluid className="p-4">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="fs-3 mb-2">Get Recommendations</Card.Title>
          <Form onSubmit={handleSearch}>
            <Row className="g-2">
              <Col sm={3}>
                <Form.Select
                  size="md"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="book">Book Title</option>
                  <option value="author">Author</option>
                  <option value="genre">Genre</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Form.Control
                  size="md"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Enter ${searchType}...`}
                />
              </Col>
              <Col sm={2}>
                <Button
                  size="md"
                  type="submit"
                  disabled={isLoading}
                  className="w-100"
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-2 p-2 md">
              {error}
            </Alert>
          )}

          {recommendations && (
            <div className="mt-2">
              <h6>Results for '{recommendations.input_book}'</h6>
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index} className="mt-1">
                  <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                    <span className="small">
                      {index + 1}. {rec.title}
                    </span>
                    <small className="text-muted">
                      {rec.distance.toFixed(4)}
                    </small>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );

  const AboutPage = () => (
    <Container fluid className="p-4">
      <Card>
        <Card.Body className="p-4">
          <Card.Title className="fs-2 mb-3">About BookMind AI</Card.Title>
          <Card.Text className="md mb-3">
            BookMind AI is a state-of-the-art book recommendation system that
            combines machine learning with deep literary understanding to help
            readers discover their next favorite books.
          </Card.Text>

        <Row className="g-2">
        {[
          "Our Mission",
          "How It Works"
        ].map((title, i) => (
          <Col key={i} md={6}>
            <Card className="h-100 bg-light" >
              <Card.Body className="p-3">
                <Card.Title className="fs-4">{title}</Card.Title>
                <Card.Text className="md">
                  {title === "Our Mission" &&
                   "We believe that every reader deserves to find books that resonate with their interests and preferences. Our mission is to make book discovery more personal, intuitive, and enjoyable through the power of AI."}
                  {title === "How It Works" &&
                    "Our system analyzes various aspects of books including writing style, themes, character development, and plot elements to create sophisticated recommendation patterns that go beyond simple genre matching."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

        </Card.Body>
      </Card>
    </Container>
  );

  const ResearchPage = () => (
    <Container className="p-4">
      <Card>
        <Card.Body>
          <Card.Title className="fs-2 mb-3">Research & Methodology</Card.Title>
          <Card.Text className="md">
            Our recommendation system is built on extensive research in machine
            learning, natural language processing, and literary analysis. 
          </Card.Text>

          <Card.Text className="md">
            A sophisticated web-based recommendation system designed to suggest
            books based on user preferences, utilizing the K-Nearest Neighbors
            (KNN) algorithm. This system employs advanced similarity analysis to
            recommend titles aligned with input criteria such as book, author,
            or genre preferences. Developed using the comprehensive
            Book-Crossings dataset, it effectively analyzes user reading
            patterns and ratings to generate highly tailored and personalized
            recommendations.
          </Card.Text>

          <Card className="bg-light">
            <Card.Body className="p-2">
              <Card.Title className="fs-4">Technical Approach</Card.Title>

              <Card.Title className="fs-5">Data Processing</Card.Title>
              <Card.Text className="md">
                We process book data using advanced NLP techniques to extract
                meaningful features from book descriptions, reviews, and content
                analysis.
              </Card.Text>

              <Card.Title className="fs-5">Machine Learning Model</Card.Title>
              <Card.Text className="md">
                Our system uses a combination of collaborative filtering and
                content-based filtering, implemented using nearest neighbors
                algorithm with cosine similarity metrics.
              </Card.Text>
            </Card.Body>
          </Card>

          
        </Card.Body>
      </Card>
    </Container>
  );

  const Footer = () => (
    <footer className="bg-dark text-white p-3 mt-3">
      <Container className="text-center">
        <Card.Text className="small">
          © 2024 BookMind AI. All rights reserved.
        </Card.Text>
        {/* <Card.Text className="small">
          Powered by machine learning and developed with ❤️ for book lovers
        </Card.Text> */}
      </Container>
    </footer>
  );

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navigation />
      <div className="flex-grow-1">
        {currentPage === "home" && <HomePage />}
        {currentPage === "recommend" && <RecommendationPage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "research" && <ResearchPage />}
      </div>
      <Footer />
    </div>
  );
};

export default BookRecommendationApp;
