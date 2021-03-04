entorno: 
	python3 pruebas/entorno.py > api/.env_variables
	cp api/.env_variables pruebas/.env_variables

main:
	python3 pruebas/main.py