# Charla_Blockchain

Ejemplo práctico de una dapp chorra de Ethereum.

## Entorno
1. Construir el entorno:
```bash 
$ sudo apt install python3 
$ sudo apt install python3-pip 
$ sudo apt-get install nodejs npm
```

2. Dependencias:
```bash 
#Instalar las dependencias de la API:
$ cd pruebas/
$ npm i 

#Instalar las dependencias de las Pruebas:
$ pip3 install request
$ pip3 install json
```

## Makefile
```bash 
#API
$ make api # Levantar la api (puerto=4040)

#Pruebas
$ make entorno # Generar un nuevo contrato y usuario
$ make main # Añadir libros, obtener libros y reservar libro.
```
¡Importante! Generar un entorno antes de ejecutar ``make main``


## Importante

Una vez que ya este desarrollado el smart contract hay que copiar el ABI en la carpeta ``api/abis``
```bash
cp smartContracts/build/contracts/Library.json /api/abis/Library.json
```
