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
    params = {"account": user['account'], "password": user['password']}
    
    res = requests.post('http://localhost:4040/desplegarContrato', json=params)
    res = json.loads(res.text)

    print("CONTRACT=" + res['address'])


def main():
    password = "soy una contraseña"
    user = createAccount(password)
    deployContract(user)


main() 