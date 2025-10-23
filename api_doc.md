# Hacktiv ESport API Documentation

## Models

### User

```txt
- email : string, required, unique
- name : string, required
- password : string, required
```

### Game

```txt
- name : string, required
- gameImg : string, required
- releaseDate : date, required
- developer : string, required
- genre : string, required
```

## Relation - One to Many

Perhatikan relasi antara `User`, dan `Game` gunakan definisi relasi yang sesuai pada sequelize relation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /games`
- `POST /games`

Routes below need authentication & authorization:

- `DELETE /games/:id`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /games

Description:

- Get all games from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "League of Legends",
        "gameImg": "https://www.dexerto.com/cdn-cgi/image/width=1200,quality=60,format=auto/https://editors.dexerto.com/wp-content/uploads/2020/08/kda-return-new-song-the-baddest-announce-ep.png",
        "releaseDate": "2009-10-27T00:00:00.000Z",
        "developer": "Riot Games",
        "genre": "MOBA",
        "UserId": 1
    },
    {
        "id": 2,
        "name": "Mobile Legends",
        "gameImg": "https://cdn0-production-images-kly.akamaized.net/Hyl2S_OHDEDCGayRTeriz3hPi38=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3488932/original/008102000_1624278462-Mobile_Legends_11.jpg",
        "releaseDate": "2016-07-14T00:00:00.000Z",
        "developer": "Moonton",
        "genre": "MOBA",
        "UserId": 1
    },
    {
        "id": 3,
        "name": "Arena Of Valor",
        "gameImg": "https://gamebrott.com/wp-content/uploads/2020/11/arena_of_valor.jpg",
        "releaseDate": "2016-10-13T00:00:00.000Z",
        "developer": "Tencent Games",
        "genre": "MOBA",
        "UserId": 1
    },
]
```

&nbsp;

## 4. POST /games

Description:

- Add new game

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```
- body:

```json
{
   "name": "string",
   "gameImg": "string",
   "releaseDate": "date",
   "developer":  "string",
   "genre":  "string"
}
```

_Response (201 - Created)_

```json
{
   "id": "integer",
   "name": "string",
   "gameImg": "string",
   "releaseDate": "date",
   "developer":  "string",
   "genre":  "string",
   "UserId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Game Image is required"
}
OR
{
  "message": "Release Date is required"
}
OR
{
  "message": "Developer is required"
}
OR
{
  "message": "Genre is required"
}
```
&nbsp;

## 5. DELETE /games/:id

Description:

- Delete game

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Game has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```