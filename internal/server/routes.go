// Package server implements the HTTP server and routing functionality
package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"            // Chi router for HTTP request handling
	"github.com/go-chi/chi/v5/middleware" // Chi middleware components
	"github.com/go-chi/cors"              // CORS middleware for handling Cross-Origin Resource Sharing
)

// RegisterRoutes sets up and configures all the routes for the server.
// It returns an http.Handler that can be used to start the HTTP server.
func (s *Server) RegisterRoutes() http.Handler {
	// Initialize a new Chi router
	r := chi.NewRouter()
	// Add logging middleware to log all HTTP requests
	r.Use(middleware.Logger)

	// Configure CORS middleware to handle cross-origin requests
	r.Use(cors.Handler(cors.Options{

		// Allow requests from any HTTPS and HTTP origin
		AllowedOrigins: []string{"https://*", "http://*"},

		// Allow standard HTTP methods
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},

		// Allow common HTTP headers
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type"},

		// Allow requests to include credentials (cookies, HTTP authentication)
		AllowCredentials: true,

		// Cache preflight requests for 300 seconds
		MaxAge: 300,
	}))

	// Register route handlers
	// Root endpoint returns a hello world message
	r.Get("/", s.HelloWorldHandler)
	// Health check endpoint for monitoring service status
	r.Get("/health", s.healthHandler)

	return r
}

// HelloWorldHandler responds with a simple "Hello World" JSON message.
// This handler serves as a basic endpoint to verify the server is running.
func (s *Server) HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	// Create a map for the response message
	resp := make(map[string]string)
	resp["message"] = "Hello from Go backend"

	// Convert the response to JSON
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("error handling JSON marshal. Err: %v", err)
	}

	// Write the JSON response to the client
	_, _ = w.Write(jsonResp)
}

// healthHandler returns the health status of the server's database connection.
// This endpoint is useful for health checks and monitoring.
func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	// Get health status from the database and convert to JSON
	jsonResp, _ := json.Marshal(s.db.Health())
	// Send the health status response to the client
	_, _ = w.Write(jsonResp)
}
