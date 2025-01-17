package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {

	count := 0
	var prevIdleTime, prevTotalTime uint64

	for {

		catCpuReader, err := exec.Command("sh", "-c", "cat /proc/cpu_201801369").Output()

		if err != nil {
			log.Fatal(err)
		}

		catRamReader, err := exec.Command("sh", "-c", "cat /proc/ram_201801369").Output()

		if err != nil {
			log.Fatal(err)
		}

		catCpuString := string(catCpuReader)
		catRamString := string(catRamReader)

		file, err := os.Open("/proc/stat")

		if err != nil {
			log.Fatal(err)
		}

		scanner := bufio.NewScanner(file)
		scanner.Scan()

		fmt.Println(scanner.Text()[5:])
		cpuLine := scanner.Text()[5:]
		file.Close()

		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}

		values := strings.Fields(cpuLine)
		idleTime, _ := strconv.ParseUint(values[3], 10, 64)
		totalTime := uint64(0)

		for _, item := range values[1:] {
			value, _ := strconv.ParseUint(item, 10, 64)
			totalTime += value
		}

		if count > 0 {
			deltaIdleTime := idleTime - prevIdleTime
			deltaTotalTime := totalTime - prevTotalTime
			cpuUsage := (1.0 - float64(deltaIdleTime)/float64(deltaTotalTime)) * 100.0
			catCpuString += fmt.Sprintf("\"cpu_usage\": %f}", cpuUsage)
		} else {
			catCpuString += fmt.Sprintf("\"cpu_usage\": %f}", 0.0)
		}

		prevIdleTime = idleTime
		prevTotalTime = totalTime

		count++

		db, err := sql.Open("mysql", "root:bhepm@tcp(localhost:33061)/monitor?charset=utf8&parseTime=True&loc=Local")
		if err != nil {
			panic(err.Error())
		}

		defer db.Close()

		query := fmt.Sprintf("INSERT INTO cpu(data) VALUE('%s');", catCpuString)
		_, err = db.Exec(query)

		if err != nil {
			panic(err.Error())
		}

		query = fmt.Sprintf("INSERT INTO ram(data) VALUE('%s');", catRamString)
		_, err = db.Exec(query)

		if err != nil {
			panic(err.Error())
		}

		time.Sleep(time.Second)
	}
}
