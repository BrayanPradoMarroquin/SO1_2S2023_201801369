# PROYECTO #1 - 2S2023

-----------------------------------
## DATOS PERSONALES

### BRAYAN HAMLLELO ESTEVEM PRADO MARROQUIN
### 201801369

------------------------------------
# MANUAL TECNICO
------------------------------------

## MODULOS
Los módulos para obtener la información del sistema se crearon en el lenguaje de programación C, utilizando cabeceras propias del sistema y los struct que estos proporcionan como task_struct, list_head, etc.

**Makefile:** Archivo para compila y generar el módulo.

```
obj-m += cpu.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
``` 

**Modulo de CPU**: 
```
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched.h>
#include <linux/mm.h>

MODULE_AUTHOR("Brayan Hamllelo Estevem Prado Marroquin");
MODULE_DESCRIPTION("CPU Module - Get data for process, PID, name, child and more");
MODULE_LICENSE("GPL");

struct task_struct *task;
struct task_struct *task_child;
struct list_head *list;

char *name = "cpu_201801369";

static int content_file(struct seq_file *file, void *v) {
    unsigned long rss;

    seq_printf(file, "{\"process\":[");

    int count_running = 0, count_sleeping = 0, count_zombie = 0, count_stopped = 0;

    for_each_process(task) {

        switch (task->__state) {
            case TASK_RUNNING:
                count_running++;
                break;
            case EXIT_TRACE:
            case TASK_DEAD:
                count_zombie++;
                break;
            case TASK_STOPPED:
                count_stopped++;
                break;
            default:
                count_sleeping++;
        }

        if (task->mm){
            rss = get_mm_rss(task->mm) << PAGE_SHIFT;
            seq_printf(file, "{\"pid\": %d, \"name\": \"%s\", \"user\": %d, \"state\": %i, \"ram\": %lu, \"children\": [", task->pid, task->comm, task->cred->uid, task->__state, rss);
        } else {
            seq_printf(file, "{\"pid\": %d, \"name\": \"%s\", \"user\": %d, \"state\": %i, \"ram\": %d, \"children\": [", task->pid, task->comm, task->cred->uid, task->__state, 0);
        }

        list_for_each(list, &task->children) {
            task_child = list_entry(list, struct task_struct, sibling);

            if (list->next == &task->children) {
                seq_printf(file, "{\"pid\": %d, \"name\": \"%s\" }", task_child->pid, task_child->comm);
            } else {
                seq_printf(file, "{\"pid\": %d, \"name\": \"%s\" },", task_child->pid, task_child->comm);
            }
        }

        if (next_task(task) == &init_task) {
            seq_printf(file, "]}");
        } else {
            seq_printf(file, "]},");
        }
    }

    seq_printf(file, "],\"summary\": {\"running\": %d, \"sleeping\": %d, \"stopped\": %d, \"zombie\": %d },", count_running, count_sleeping, count_stopped, count_zombie);

    return 0;
}

static int get_data(struct inode *inode, struct file *file){
    return single_open(file, content_file, NULL);
}

static struct proc_ops data = {
        .proc_open = get_data,
        .proc_read = seq_read
};

static int __init add_module(void) {
    proc_create(name, 0, NULL, &data);
    printk(KERN_INFO "Brayan Hamllelo Estevem Prado Marroquin\n");
    return 0;
}

static void __exit remove_module(void) {
    remove_proc_entry(name, NULL);
    printk(KERN_INFO "Segundo Semestre 2023\n");
}

module_init(add_module);
module_exit(remove_module);
```

**Modulo de RAM**:
```
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/mm.h>

MODULE_AUTHOR("Brayan Hamllelo Estevem Prado Marroquin");
MODULE_DESCRIPTION("Ram Module - Get data for free memory, used memory and total memory");
MODULE_LICENSE("GPL");

struct sysinfo sys_info;
char *name = "ram_201801369";

static int content_file(struct seq_file *file, void *v) {
    si_meminfo(&sys_info);
    seq_printf(file, "{\"total\": %ld", (sys_info.totalram << PAGE_SHIFT));
    seq_printf(file, ", \"used\": %ld", ((sys_info.totalram - sys_info.freeram) << PAGE_SHIFT));
    seq_printf(file, "}");
    return 0;
}

static int get_data(struct inode *inode, struct file *file) {
    return single_open(file, content_file, NULL);
}

static struct proc_ops data = {
        .proc_open = get_data,
        .proc_read = seq_read
};

static int __init add_module(void) {
    proc_create(name, 0, NULL, &data);
    printk(KERN_INFO "201801369\n");
    return 0;
}

static void __exit remove_module(void) {
    remove_proc_entry(name, NULL);
    printk(KERN_INFO "Sistemas Operativos I\n");
}

module_init(add_module);
module_exit(remove_module);
```

## BACKEND - AGENTE - GOLANG
+ ### **Dockerfile**
```
FROM golang:1.18
WORKDIR /home/server
COPY . .
RUN go mod download
RUN go get github.com/go-sql-driver/mysql
CMD ["go", "run", "main.go"]
```

+ ### **Agente de Go**
```
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
```

## FRONTEND 

### **API**

+ ### **Dockerfile**
```
FROM node:latest
WORKDIR /home/server
COPY . .
RUN npm install
CMD ["npm", "start"]
```

### **PAGINA WEB - REACT**
```
FROM node.latest
WORKDIR /home/client
COPY . .
RUN npm install
CMD ["npm", "start"]
```

## DEPENDENCIAS UTILIZADAS

+ ### **Agente**
    + github.com/go-sql-driver/mysql
+ ### **Backend**
    + NodeJS
    + Express
    + Mysql2
    + Cors
