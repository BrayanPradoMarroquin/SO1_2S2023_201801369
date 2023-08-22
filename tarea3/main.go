package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"tarea3/Config"
	"tarea3/Entities"
)

var app = fiber.New()

func main() {
	err := Config.Conect()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	if err != nil {
		log.Fatal("Error: ", err)
	}

	InsertData()

	err = app.Listen(":8000")
	if err != nil {
		log.Fatal("Error: ", err)
	}
}

func InsertData() {
	app.Post("/", func(ctx *fiber.Ctx) error {
		var album Entities.User
		if err := ctx.BodyParser(&album); err != nil {
			return nil
		}

		Config.Database.Create(&album)
		return nil
	})
}
