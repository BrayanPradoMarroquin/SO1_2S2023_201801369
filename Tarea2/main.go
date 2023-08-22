package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Student struct {
	Carnet string `json:"Carnet"`
	Nombre string `json:"Nombre"`
}

func main() {
	http.HandleFunc("/data", data)
	http.ListenAndServe(":3000", nil)
	fmt.Println("Listen on port 3000")
}

func data(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Solo se puede hacer peticiones POST", http.StatusMethodNotAllowed)
		return
	}

	student := Student{"201801369", "Brayan Hamllelo Estevem Prado Marroquin"}
	json, _ := json.Marshal(student)

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}
