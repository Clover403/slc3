# Simulasi Live Code 3 - Hacktiv ESport

## Ringkasan

Kalian akan membuat sebuah website aplikasi Full Stack Javascript client-server model (`NodeJS`, `ExpressJS`, `PostgreSQL`, `Sequelize`, `ReactJS`) yang dapat menampilkan daftar game - game esport. User dapat melihat list game dan menambahkan serta menghapus game.

Feature-feature aplikasi ini adalah:

1. User dapat melakukan register.
2. User dapat melakukan login.
3. User dapat melihat list _Game_
4. User dapat menambahkan _Game_
5. User dapat menghapus _Game_ 

Aplikasi ini akan dibuat dari _scratch_ atau dari awal oleh karena itu pastikan feature yang akan dibuat sesuai dengan yang diminta, kalian hanya diberikan `api_docs.md` sebagai panduan dalam membuat server dan client. Silahkan kalian buat feature by feature sesuai release yang disediakan `README.md` ini!

## Aturan dan Kebijakan

- Waktu Pengerjaan: **180 min (3 jam)**
- (-10) jika `node_modules` tidak di-_ignore_.
- (-5) jika `package.json` tidak ada atau tidak di-_push_.
- (-5) jika `.env` tidak di-_ignore_, bagi yang menggunakan dotenv.
- (-5) jika tidak menyertakan example value `.env`, bagi yang menggunakan dotenv.
- (-5) jika tidak menerapkan konsep SPA.
- (-5) Error tidak ditampilkan pada client.
- (-2) jika menggunakan `alert` bawaan browser (gunakan sweetalert atau sejenisnya)
- Data game diperbolehkan untuk dimasukkan _melalui_ seeding atau input manual pada database GUI (eg. pgadmin4 atau dbeaver).

## Components

Buatlah client side kalian yang terdiri dari beberapa component-component berikut:

- Register Page.
- Login Page.
- Home Page.
- Game Card.
- AddGame Page.
- Navbar.

## Release 0 - Setup Project

Lakukan setup project full stack dengan menginstall package yang sudah diajarkan sebelumnya. Adapun folder yang dibuat hanya ada `server` & `client`. Pada project ini terdapat:

1. `api_docs.md`: API Docs sebagai guideline pembuatan server.
2. server: untuk pembuatan REST API.
3. template: CSS template yang bisa membantu dalam pembuatan client.

### 0.1 Setup: Server

Aplikasi ini memiliki 2 entitas atau table. Buatlah Model sesuai `api_docs.md` pada folder server dan buatlah relasi yang sesuai antara User dan Game. `User` memiliki relasi one to many terhadap `Game`. Jangan lupa implementasi _error handling_ untuk error yang ada pada server.

### 0.2 Setup: Client

Aplikasi ini menggunakan `ReactJS`. Buatlah folder `client` dengan menggunakan `vite` dan `react-router` pada client side.

## Release 1 - Authentication: Register & Login

### 1.1 Server Side - Register

- Buatlah sebuah endpoint `POST /register` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no 1.
- Pastikan kalian melakukan _hash_ password menggunakan `bcrypt` sebelum kalian simpan pada database.

### 1.2 Server Side - Login

- Buatlah sebuah endpoint `POST /login` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no 2.
- Buatlah proses untuk _generate_ **access token**  menggunakan `jsonwebtoken`, pastikan kalian hanya menyimpan data rahasia pada env.

### 1.3 Client Side - Register

- Buatlah halaman `/register` untuk menampilkan form register user.
- Jika proses register berhasil maka akan menuju halaman `/login`
- Pastikan ada tombol yang bisa mengarah ke halaman `/login`

### 1.4 Client Side - Login

- Buatlah halaman `/login` untuk menampilkan form login user.
- Jika proses login berhasil maka akan menuju halaman `/` atau home dan menampilkan semua _games_ yang ada dari server.
- Pastikan ada tombol yang bisa mengarah ke halaman `/register`
- Pastikan ketika user sudah berhasil login, ketika direfresh maka user tidak harus login lagi.

### 1.5 Client Side: Logout

- Buatlah tombol logout dan ketika proses logout berhasil maka akan kembali ke tampilan login.
- Pastikan ketika user sudah berhasil logout, ketika direfresh maka user akan ke tampilan login.

## Release 2 - Fetch Games

Feature ini bertujuan untuk memberikan kepada user list game yang ada pada aplikasi.

### 2.1 Server Side: GET Games

- Buatlah sebuah endpoint `GET /games` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 3.
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint.
- Buatlah initial data game sesuai data json yang diberikan, boleh menggunakan seeding atau input manual pada database GUI.

### 2.2 Client Side: Halaman Home

- Buatlah halaman `/` untuk menampilkan list games di client dari server yang sudah dibuat sesuai `api_doc.md`.
- Terapkan konsep _component_ untuk setiap bagian yang bersifat `reuseable`.
- Gunakan _State Management_ untuk mengelola dan menyimpan data courses yang diambil dari server.
- **TAMBAHAN**: Pastikan hanya User yang sudah login yang bisa melihat halaman Home.

## Release 3 - Add Game

Feature ini bertujuan agar user bisa menambahkan game yang diinginkan

### 3.1 Server Side: POST Game

- Buatlah sebuah endpoint `POST /games` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 4.

### 3.2 Client Side: Halaman Add Game

- Pada halaman Add Game, Integrasikan tombol `Add` di form sehingga dapat menambahkan Game
- Jika berhasil menambahkan Game maka user akan diarahkan ke Halaman `/`.
- Jika berhasil maka list Games akan bertambah otomatis di client (Pastikan website kalian reaktif).

## Release 4 - DELETE Game

Feature ini bertujuan agar user dapat menghapus game yang dia buat

### 4.1 Server Side: DELETE Game

- Buatlah sebuah endpoint `DELETE /games/:id` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 6.
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint.
- **Authorization Check**: Pastikan, data yang dihapus hanya data yang dibuat oleh user tersebut.

### 4.2 Client Side: Feature Delete Game

- Pada halaman Home, Integrasikan tombol `Delete` sehingga user dapat menghapus suatu game
- Jika berhasil game yang telah di delete akan hilang tanpa harus di refresh (Pastikan website kalian reaktif).

## Github Live Code Workflow

Dalam pengerjaan simulasi live code, kalian diminta untuk melakukan `commit` sebagai check point pengerjaan. Jika pengerjaan release sudah selesai, segera lakukan `add commit push` dengan message relase yang jelas.

- Contoh 1: `git commit -m "Release 0.1 Setup: Server, Done"`.
- Contoh 2: `git commit -m "Release 3.1 Server: POST Game, Done"`.
- Contoh 3: `git commit -m "2.2 Client: Halaman Home, Done No TAMBAHAN"`.

## Testing

Kalian bisa menguji apakah REST API yang sudah kalian buat sesuai dengan docs yang diharapkan dengan testing berikut:

1. Drop db testing: `sequelize --env test db:drop`.
2. Create db testing: `sequelize --env test db:create`.
3. Migrate db testing: `sequelize --env test db:migrate`.
4. Ketika run test, `app.listen` nya boleh dicomment atau bikin di file `bin/www` dan di file `app.js` lakukan `module.exports = app`.
5. Pada package.json tambahkan script `"test": "jest --runInBand --forceExit"`.