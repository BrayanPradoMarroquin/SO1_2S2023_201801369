package main

import (
	"github.com/gofiber/fiber/v2"
	"log"
	"tarea3/Config"
)

func main() {
	app := fiber.New()
	err := Config.Conect()
	if err != nil {
		log.Fatal("Error: ", err)
	}

	err = app.Listen(":8000")
	if err != nil {
		log.Fatal("Error: ", err)
	}
}
