pragma solidity >=0.4.22 <0.8.0;

contract Libreria {

    struct Libro {
        uint256 id;
        string titulo;
        string autor;
        string editorial; 
    }

    mapping(string => Libro) public libros; // Titulo => Libro
    string[] lista_titulos; 

    event ReservarLibro(string nombre, string titulo, string date, address account);

    //========================================
    //             AÑADIR LIBRO
    //========================================
    function addLibro(string memory titulo, string memory autor, string memory editorial) public returns (
        uint256, string memory, string memory, string memory ){
        
        // Añadir al array
        lista_titulos.push(titulo);
        uint256 id = lista_titulos.length - 1;

        // Crear el libro
        Libro memory new_libro = Libro(id, titulo, autor, editorial);
        
        // Añadir al mapping
        libros[titulo] = new_libro;

        return (id, titulo, autor, editorial);
    }

    //========================================
    //         OBTENER INFO DE UN LIBRO
    //========================================
    function getLibro(uint256 id) public view returns 
        (string memory titulo, string memory autor, string memory editorial){
        
        titulo = lista_titulos[id];
        autor = libros[lista_titulos[id]].autor;
        editorial = libros[lista_titulos[id]].editorial;
    }

    //========================================
    //        NUMERO TOTAL DE LIBROS
    //========================================
    function contLibros() public view returns (uint256){
        return lista_titulos.length;
    }

    //========================================
    //            RESERVAR LIBRO
    //========================================
    function reservar(string memory title, string memory nombre, string memory date) public {
        emit ReservarLibro(nombre, title, date, msg.sender);
    }

}