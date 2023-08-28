package Config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"tarea3/Entities"
)

var Database *gorm.DB

var Uri = "root:bh2023@tcp(database_container:3306)/reporductor?charset=utf8&parseTime=true&loc=Local"

func Conect() error {
	var err error

	Database, err = gorm.Open(mysql.Open(Uri), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})
	if err != nil {
		panic(err)
	}

	err = Database.AutoMigrate(&Entities.User{})
	if err != nil {
		return err
	}
	return nil
}
