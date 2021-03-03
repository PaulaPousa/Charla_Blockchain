pragma solidity >=0.4.22 <0.8.0;

contract Libreria {

    struct Libro {
        string titulo;
        string autor;
    }

    mapping(string => Libro) public libros; // Titulo => Libro
    //Libro[] lista_libros; 

    event ReservarLibro(string nombre, string titulo, string date, address account);

    // --- Añadir un nuevo libro ---
    function addLibro(string memory titulo, string memory autor) public {
        Libro memory new_libro = Libro(titulo, autor);
        libros[titulo] = new_libro;
        //lista_libros.push(new_libro);
    }

    // --- Obtener lista libros  ---
    function getLibros() internal view returns (mapping(string => Libro) storage lista){
        return libros;
    }

    // --- Reservar Libro  ---
    function reservar(string memory title, string memory nombre, string memory date) public {
        emit ReservarLibro(nombre, title, date, msg.sender);
    }

}