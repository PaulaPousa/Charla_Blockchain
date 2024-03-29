# Charla Blockchain (ACM UPM)

Ejemplo práctico de una dapp chorra de Ethereum.

## Entorno
1. Paquetes:
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

#Instalar las dependencias de la Web:
$ cd libreria/
$ npm i 

#Instalar las dependencias de las Pruebas:
$ pip3 install request
$ pip3 install json
```


## Blockchain

### Ganache-cli (red de pruebas de Ethereum)
Hay dos opciones:

- Instalar ganache: <https://github.com/trufflesuite/ganache-cli>
```bash
$ npm install -g ganache-cli
$ ganache-cli
```

- Run docker: 
```bash
$ docker run --name socialNetwork_redis -p 6379:6379  redis:6.0-alpine
```

### Quorum (red privada de Ethereum)
Hemos utilizado `Quorum Maker` <https://github.com/synechron-finlabs/quorum-maker> que es una herramienta que te permite desplegar y controlar una red de Quorum:
```bash
$ git clone https://github.com/synechron-finlabs/quorum-maker.git #Clonar el repositorio

$ cd quorum-maker 
$ ./setup.sh # Levantar la red
```
(Necesario tener docker instalado)

### Smart Contract (Solidity)
Hemos utilizado `Truffle` como herramienta de entorno de desarrollo.

```bash
$ npm install -g truffle
```

Para poder compilar y ejecutar los smart contrats, hay que ir al directorio raiz `/smartContracts` y ejecutar los siguientes comandos:
```bash
truffle compile 	# Compilar los contratos
truffle test	    # Testear los contratos
truffle migrate 	# Desplegar los contratos
```

## Makefile
```bash 
#Pruebas
$ make entorno # Generar un nuevo contrato y usuario
$ make main # Añadir libros, obtener libros y reservar libro.
```
**¡Importante!** Generar un entorno antes de ejecutar ``make main`` y relevantar la api para que se actualice el ``.env``


## Importante

Una vez que ya este desarrollado el smart contract hay que copiar el ABI en la carpeta ``api/abis``
```bash
cp smartContracts/build/contracts/Library.json /api/abis/Library.json
```
