import requests, json

def addLibro(titulo, autor, editorial):
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


def getReservas():

    res = requests.get('http://localhost:4040/getReserve')
    res = json.loads(res.text)

    print(res['tx'])


def main():
    
    addLibro("Practical Malware Analysis", "Sikorski Honig", "XXX")
    addLibro("The Art of Exploitation", "jon Erickson", "XXX")
    addLibro("Resistencia Digital", "Enric Borras", "XXX")
    addLibro("The Art of Invisibility", "Kevin Mitnick", "XXX")
    addLibro("The Book of Satoshi", "Phil Champagne", "XXX")
    addLibro("Identidad Digitial Descentralizada", "Lucas Carmona Ampuero", "XXX")
    
    #getLibros()

    #reservarLibro("Practical Malware Analysis", "Manolo")
    #reservarLibro("Resistencia Digital", "Ana")
    #reservarLibro("The Book of Satoshi", "Pepe")
    #reservarLibro("Identidad Digitial Descentralizada", "Maria")
   
    getReservas()


main() 
