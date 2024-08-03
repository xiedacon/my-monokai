package main

import (
	"fmt"
	http "net/http"
)

// This ia an comment

const (
	ok       = "ok"
	notFound = "notFound"
)

var statusCodes = map[string]int{
	ok:       200,
	notFound: 404,
}

type Handler struct {
	responses map[string]string
}

func NewHandler() *Handler {
	return &Handler{
		responses: map[string]string{
			"/ping": "pong",
		},
	}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Got: %s\n", r.RequestURI)

	h.Route(r.RequestURI)(w, r)
}

func (h *Handler) Route(url string) func(http.ResponseWriter, *http.Request) {
	switch url {
	case "/ping":
		return h.pong
	default:
		return h.notFound
	}
}

func (h *Handler) pong(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(statusCodes[ok])
	w.Write([]byte(h.responses[r.RequestURI]))
}

func (h *Handler) notFound(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(statusCodes[notFound])
	w.Write([]byte(fmt.Sprintf("Not found %s", r.RequestURI)))
}

func main() {
	s := http.Server{Addr: ":3000", Handler: NewHandler()}

	s.ListenAndServe()
}
