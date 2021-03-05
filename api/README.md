# API

## Create Account

Crear una cuenta de un usuario en la blockchain.

**URL** : `POST /createAccount`

### Request
**Content-type** : `application-json`

**Body** : 
```json
{
    "password": "Contraseña del nuevo usuario "
}
```

### Response

**Code** : `201 CREATE`

**Example**
```json
{
    "address": "0x74dFe6C7d11551e63F2a8B0050a0A1578Fa11151"
}
```


## Deploy Contract

Desplegar un nuevo contrato de Library.sol

**URL** : `POST /deployContract`

### Request
**Content-type** : `application-json`

**Body** : 
```json
{
    "account": "Address del usuario que despliega el contrato",
    "password": "Contraseña del usuario que despliega el contrato"
}
```

### Response

**Code** : `201 CREATE`

**Example**
```json
{
    "address": "0xf5AA772120deA80574F31C8C42dd31779B98740d"
}
```

## Add Book
Añadir un nuevo libro a la Biblioteca.

**URL** : `POST /addBook`

### Request
**Content-type** : `application-json`

**Body** : 
```json
{
    "title": "Título del libro",
    "author": "Autor del libro",
    "editorial": "Editorial del libro"
}
```

### Response

**Code** : `201 CREATE`

**Example**
```json
{
    "tx": "0xe0331c3d6be94a6ca98a733b53a7d80e08444954e3104d15cd3a43b1b646f2dc",
    "msg": "El libro se ha añadido correctamente"
}
```

## Get Books
Obtener todos los libros de la Biblioteca.

**URL** : `GET /getBooks`

### Response

**Code** : `200 OK`

**Example**
```json
{
    "books": 
        {"0": 
            {"title": "Libro_0", 
            "author": "autor_0", 
            "editorial": "editorial_0"}, 
        "1": 
            {"title": "Libro_1", 
            "author": "autor_1", 
            "editorial": "editorial_1"}
        }
}
```


## Reserve Book
Mandar un evento a la blockchain con la reserva del libro.

**URL** : `POST /reserveBook`

### Request
**Content-type** : `application-json`

**Body** : 
```json
{
    "user": "Nombre del usuario que reserva el libro",
    "title": "Título del libro"
}
```

### Response

**Code** : `201 CREATE`

**Example**
```json
{
    "tx": "0xc2165da865399c4bad15feb75c8def307398a2081038d94f9ae46fdd4577ea31",
    "msg": "Reserva realizada correctamente"
}
```

## Get Reserve 
Obtener todas las reservas de libros.

**URL** : `GET /getReserve`

### Response

**Code** : `200 OK`

**Example**
```json
{
    "books": 
        {"0": 
            {"title": "Libro_0", 
            "author": "autor_0"}, 
        "1": 
            {"title": "Libro_1", 
            "author": "autor_1"}
        }
}
```