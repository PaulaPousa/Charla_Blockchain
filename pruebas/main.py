import requests, json

def añadirLibro(titulo, autor, editorial):
    params = {"title": titulo, "author": autor, "editorial": editorial }

    res = requests.post('http://localhost:4040/addBook', json=params)
    res = json.loads(res.text)

    print(res)


def getLibros():
    res = requests.get('http://localhost:4040/getBooks')
    print(res.json())
    

def reservarLibro(title, user):
    params = {"user": user, "title": title }

    res = requests.post('http://localhost:4040/reserveBook', json=params)
    res = json.loads(res.text)

    print(res)


def main():
    
    #for i in range(6):
    #   añadirLibro("Libro_" + str(i), "autor_" + str(i), "editorial_" + str(i))
    
    getLibros()

    #reservarLibro("Libro_2", "Manolo")


main() 