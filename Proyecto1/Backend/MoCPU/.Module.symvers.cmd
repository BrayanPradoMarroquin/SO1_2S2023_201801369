cmd_/home/brayan/Escritorio/Laboratorio_SOPES/SO1_2S2023_201801369/Proyecto1/Backend/MoCPU/Module.symvers := sed 's/\.ko$$/\.o/' /home/brayan/Escritorio/Laboratorio_SOPES/SO1_2S2023_201801369/Proyecto1/Backend/MoCPU/modules.order | scripts/mod/modpost -m -a  -o /home/brayan/Escritorio/Laboratorio_SOPES/SO1_2S2023_201801369/Proyecto1/Backend/MoCPU/Module.symvers -e -i Module.symvers   -T -