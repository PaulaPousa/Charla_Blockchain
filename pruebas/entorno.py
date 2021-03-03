import requests, json

def createAccount(password):
    #password = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(15))
    params = {"password": password}
    
    res = requests.post('http://localhost:4040/crearCuenta', json=params)
    res = json.loads(res.text)

    user = {"account": res['address'], "password": password}

    print("ACCOUNT=" + user['account'])
    print("PASSWORD=" + user['password'])

    return user

def deployContract(user):
    #params = {"account": user['account'], "password": user['password']}
    params = {"account": "0x7EF4EeF21E42e0dd79bf40Ab272727191e3538eD", 
                "password": "" }
    res = requests.post('http://localhost:4040/desplegarContrato', json=params)
    res = json.loads(res.text)

    print("CONTRACT=" + res['address'])

    return res['address']


def añadirLibro(contract, titulo, autor):
    params = {"contractAddress": contract, 
            "account": "0x7EF4EeF21E42e0dd79bf40Ab272727191e3538eD", 
            "password": "",
            "titulo": titulo,
            "autor": autor }

    res = requests.post('http://localhost:4040/addLibro', json=params)
    
    #res = json.loads(res.text)

    print(res)

def getLibros(contract):
    params = {"contractAddress": contract, 
            "account": "0x7EF4EeF21E42e0dd79bf40Ab272727191e3538eD", 
            "password": ""}

    res = requests.post('http://localhost:4040/getLibros', json=params)
    
    #res = json.loads(res.text)

    print(res)
    

def main():
    password = "soy una contraseña"
    #user = createAccount(password)
    #contract = deployContract(user)
    contract = "0xd3501DB6F15b7D13c841965E070bF570273Fe71D"
    #añadirLibro(contract, "Charla_1", "María Fernandez")
    #añadirLibro(contract, "Charla_2", "María Fernandez")
    #añadirLibro(contract, "Charla_3", "María Fernandez")
    #añadirLibro(contract, "Charla_4", "María Fernandez")
    #añadirLibro(contract, "Charla_5", "María Fernandez")
    getLibros(contract)


main() 
