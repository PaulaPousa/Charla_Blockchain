pragma solidity >=0.4.22 <0.8.0;

contract Libreria {

    struct Libro {
        string titulo;
        string autor;
    }

    mapping(string => Libro) public libros; // Titulo => Libro
    string[] lista_titulos; 

    event ReservarLibro(string nombre, string titulo, string date, address account);

    // --- Añadir un nuevo libro ---
    function addLibro(string memory titulo, string memory autor) public {
        
        Libro memory new_libro = Libro(titulo, autor);
        
        // Añadir al mapping
        libros[titulo] = new_libro;
        
        // Añadir al array
        lista_titulos.push(titulo);
    }

    // --- Obtener info de un libro  ---
    function getLibro(uint256 id) public view returns (string memory titulo, string memory autor){
        titulo = lista_titulos[id];
        autor = libros[lista_titulos[id]].autor;
    }

    // --- Número de Libros ---
    function contLibros() public view returns (uint256){
        return lista_titulos.length;
    }

    // --- Reservar Libro  ---
    function reservar(string memory title, string memory nombre, string memory date) public {
        emit ReservarLibro(nombre, title, date, msg.sender);
    }

}