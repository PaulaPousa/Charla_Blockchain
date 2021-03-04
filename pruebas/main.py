import requests, json

def añadirLibro(titulo, autor, editorial):
    params = {"titulo": titulo, "autor": autor, "editorial": editorial }

    res = requests.post('http://localhost:4040/addLibro', json=params)
    res = json.loads(res.text)

    print(res)

def getLibros():

    res = requests.get('http://localhost:4040/getLibros')

    print(res.json())
    

def main():
    
    for i in range(6):
        añadirLibro("Libro_" + str(i), "autor_" + str(i), "editorial_" + str(i))
    
    getLibros()


main() 