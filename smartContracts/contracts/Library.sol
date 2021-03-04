pragma solidity >=0.4.22 <0.8.0;

contract Library {

    struct Book {
        uint256 id;
        string title;
        string author;
        string editorial; 
    }

    mapping(string => Book) public books; // Titulo => Libro
    string[] list_titles; 

    event BookReserve(string user, string title, string date, address account);

    //========================================
    //             AÑADIR LIBRO
    //========================================
    function addBook(string memory title, string memory author, string memory editorial) public {
        
        // Añadir al array
        list_titles.push(title);
        uint256 id = list_titles.length - 1;

        // Crear el libro
        Book memory new_book = Book(id, title, author, editorial);
        
        // Añadir al mapping
        books[title] = new_book;
    }

    //========================================
    //         OBTENER INFO DE UN LIBRO
    //========================================
    function getBook(uint256 id) public view returns 
        (string memory title, string memory author, string memory editorial){
        
        title = list_titles[id];
        author = books[list_titles[id]].author;
        editorial = books[list_titles[id]].editorial;
    }

    //========================================
    //        NUMERO TOTAL DE LIBROS
    //========================================
    function numberBooks() public view returns (uint256){
        return list_titles.length;
    }

    //========================================
    //            RESERVAR LIBRO
    //========================================
    function reserveBook(string memory user, string memory title, string memory date) public {
        emit BookReserve(user, title, date, msg.sender);
    }
}
