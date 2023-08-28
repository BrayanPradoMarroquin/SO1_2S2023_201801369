// Info de los modulos
#include <linux/module.h>
// Info del kernel en tiempo real
#include <linux/kernel.h>
// info ram
#include <linux/mm.h>

// Headers para modulos
#include <linux/init.h>
// Header necesario para proc_fs
#include <linux/proc_fs.h>
// Para dar acceso al usuario
#include <asm/uaccess.h>
// Para manejar el directorio /proc
#include <linux/seq_file.h>

const long minute = 60;
const long hour = 60 * minute;
const long day = 24 * hour;
const long mb = 1024 * 1024;

struct sysinfo ram;

static void init_meminfo(void){
    si_meminfo(&ram);
}

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM Lab de Sopes 1");
MODULE_AUTHOR("Brayan Hamllelo Estevem Prado Marroquin");

static int escribir_archivo(struct seq_file *archivo, void *v){
    init_meminfo();
    seq_printf(archivo, "Totla_Ram: %lu kB", ram.totalram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "Ram_Libre: %lu kB", ram.freeram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "Ram_en_uso: %lu kB", ram.bufferram);
    seq_printf(archivo, ",\n");
    seq_printf(archivo, "Porcentaje_Ram_Libre: %lu", (ram.freeram * 100) / ram.totalram, "%%");
    seq_printf(archivo, ",\n");
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("ram_201801369", 0, NULL, &operaciones);
    printk(KERN_INFO "Brayan Hamllelo Estevem Prado Marroquin\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ram_201801369", NULL);
    printk(KERN_INFO "Segundo Semestre 2023\n");
}

module_init(_insert);
module_exit(_remove);