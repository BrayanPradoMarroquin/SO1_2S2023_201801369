package main

import (
	"fmt"
	"os/exec"
	"time"
)

func main() {
	go repetFuncRam()
	time.Sleep(1000 * time.Second)
}

func repetFuncRam() {
	for range time.Tick(1 * time.Second) {
		fmt.Println("RAM")
		getModuleRAM()
	}
}

func getModuleRAM() {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201801369")
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}

	out := string(output)
	fmt.Println(out)
}
