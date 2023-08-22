package Entities

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Album   string
	Artista string
	Genero  string
	Año     string
}
