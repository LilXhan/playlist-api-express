### Objetivos

馃憠 Utilizar NodeJs y Express.

馃憠 Las rutas deber谩n seguir el patr贸n REST.

馃憠 Utilizar la librer铆a Prisma.

馃憠 Utilizar Typescript.

馃憠 Utilizar SQLite.

馃憠 Manejar git como equipo.

### Consideraciones

Todos los聽_response_聽deben ser de los que ofrece prisma al realizar la query a la base de datos.

## Creaci贸n de usuarios

-   Creaci贸n con password hasheado

Ruta:聽`/api/v1/users`聽=>聽**POST**

```json
{
  "id": 1,
  "name": "Usuario 1",
  "email": "email@gmail.com",
  "password": "123456"
  "last_session": Date,
  "update_at": Date,
  "date_born": Date
}
```

## Login de usuario

Ruta:聽`/api/v1/users/login`聽=>聽**POST**

```json
{
  "email": "email@gmail.com",
  "password": "123456"
}
```

## Creaci贸n de canciones

### Consideraciones

-   Hay un campo para indicar si la canci贸n es p煤blica o privada.
    
-   En el caso de las privadas, solo podr铆an verlas los usuarios que son autenticados.
    
-   Para la creaci贸n de canciones utilizar los siguientes campos:
    

Ruta:聽`/api/v1/songs`聽=>聽**POST**

```json
{
  "id": 1,
  "name": "Canci贸n 1",
  "artist": "Artista 1",
  "album": "Album 1",
  "year": 2020,
  "genre": "Rock",
  "duration": 120
}
```

-   Leer todas las canciones
    
    -   Ruta: /api/v1/songs => GET
-   Leer una canci贸n por id
    
    -   Ruta: /api/v1/songs/:id => GET

## Creaci贸n de playlist

Tabla intermedia entre usuarios y canciones.

Si te gusta una canci贸n la agregas a tu playlist (crear ruta para a帽adir canciones a la playlist)

La playlist debe contener los siguientes campos:

-   Ruta:聽`/api/v1/playlist`聽=>聽**POST**

```json
{
  "id": 1,
  "name": "Playlist 1",
  "user_id": 1,
  "songs": [
    {
      "id": 1,
      "name": "Canci贸n 1",
      "artist": "Artista 1",
      "album": "Album 1",
      "year": 2020,
      "genre": "Rock",
      "duration": 120
    },
    {
      "id": 2,
      "name": "Canci贸n 2",
      "artist": "Artista 2",
      "album": "Album 2",
      "year": 2020,
      "genre": "Rock",
      "duration": 120
    }
  ]
}
```

A帽adir una canci贸n a una playlist:

```json
{
  "id_song": 2,
  "id_playlist": 3,
}
```