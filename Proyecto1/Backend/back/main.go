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
	for range time.Tick(time.Second * 1) {
		fmt.Println("Ejecutando funcion")
		fmt.Println("RAM")
		getModuleRAM()
		getModuleCPU()
	}
}

func getModuleRAM() {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201801369")
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err.Error())
	}

	out := string(output)
	fmt.Println(out)
}

func getModuleCPU() {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201801369")
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err.Error())
	}

	out := string(output)
	fmt.Println(out)
}
