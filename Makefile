api:
	node api/node controller.js

entorno: 
	python3 pruebas/entorno.py > api/.env_variables

main:
	python3 pruebas/main.py