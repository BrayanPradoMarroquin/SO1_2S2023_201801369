package main

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var rdb *redis.Client

type Data struct {
	Album  string
	Artist string
	Year   string
}

func redisConnect() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "172.17.0.2:6379",
		Password: "",
		DB:       10,
	})
	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(pong)
}

func redisInsert(c *fiber.Ctx) error {
	var data map[string]string
	e := c.BodyParser(&data)
	if e != nil {
		return e
	}
	rank := Data{
		Album:  data["album"],
		Artist: data["artist"],
		Year:   data["year"],
	}

	array := rank.Artist
	year, err := strconv.ParseFloat(rank.Year, 64)
	if err != nil {
		fmt.Println("Error al convertir el string a float64:", err)
		return err
	}

	rdb.ZAddArgs(ctx, array, redis.ZAddArgs{
		NX: true,
		Members: []redis.Z{{
			Score:  year,
			Member: rank.Album,
		}},
	})

	return nil
}

func main() {
	app := fiber.New()

	redisConnect()

	app.Post("/agregar", redisInsert)

	err := app.Listen(":5000")
	if err != nil {
		return
	}
}
