# RendaloMaq-
1.- Correr 'npm install'

2.- Para iniciar el servidor, correr 'npm run start'

3.- Para las pruebas(No es necesario que este corriendo el servidor), correr: npm run test


Structura del proyecto

--config
	-db.js (Configuracion para iniciar la base de datos mongoDB)
	-default.json (URI de la base de datos y la JWT secreta para autenticacion)
	
--models
	-User.js (Documento o tabla de MongoDB del usuario)
	
--routes
	--api
		-auth.js (Ruta para la autenticacion del usuario al hacer login y creacion de la JWT token)
		-user.js (Ruta para crear o eliminar un usuario, y ver todos los usuarios de la database)
		
--test
	-auth.test.js (Testeo del login de usuario)
	-user.text.js (Testeo de ver todos los usuarios y tambien borrar y crearlo)
	
-server.js (Configuracion del app, exportada para utilizarla en las pruebas)
-start.js (Para escuchar el servidor)
