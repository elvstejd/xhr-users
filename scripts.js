const usersDiv = document.querySelector('.users');
const btn = document.getElementById('buscarUsuarios');
const xhr = new XMLHttpRequest();

let users = [];

function init() {
    // buscar cada usuario en localStorage
    const usuariosEnLocalStorage = getUsersFromLocalStorage();
    // guardar esos usuarios en users
    users = users.concat(usuariosEnLocalStorage);
    // mostrar en pantalla cada usuario en users
    mostrarUsuarios();
}

window.addEventListener('DOMContentLoaded', init);

// funcion agregar usuario al html
function agregarUsuarioAHTML(name, email, company) {
    const user = document.createElement('div');
    const nameDiv = document.createElement('div');
    const emailDiv = document.createElement('div');
    const companyDiv = document.createElement('div');

    user.className = 'user';
    nameDiv.textContent = name;
    emailDiv.textContent = email;
    companyDiv.textContent = company;

    user.appendChild(nameDiv);
    user.appendChild(emailDiv);
    user.appendChild(companyDiv);

    usersDiv.appendChild(user);
}

function mostrarUsuarios() {
    console.log('ejecuto');
    console.log(users);
    for (user of users) {
        const name = user.name;
        const email = user.email;
        const company = user.company;
        agregarUsuarioAHTML(name, email, company);
    }
}

btn.addEventListener('click', obtenerDatosDeUsuarios);

function obtenerDatosDeUsuarios() {
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.addEventListener('load', (e) => {
        const usersArray = JSON.parse(e.target.response);
        const newUsers = [];
        console.log(usersArray);

        for (user of usersArray) {
            const name = user.name;
            const email = user.email;
            const company = user.company.name;
            const newUser = {
                name,
                email,
                company
            }
            newUsers.push(newUser);
        }
        // concatenarlo al array global
        users = users.concat(newUsers);
        console.log("los users que llegan de la api", newUsers);
        // function mostrarUsuarios() 
        mostrarUsuarios();
        // guardarlo en local storage
        saveUsersToLocalStorage(newUsers);
    });
    xhr.send();
}

function saveUsersToLocalStorage(users) {
    const usuariosEnLocalStorage = getUsersFromLocalStorage();
    const mezclaDeUsuarios = usuariosEnLocalStorage.concat(users);
    localStorage.setItem('users', JSON.stringify(mezclaDeUsuarios));
}

function getUsersFromLocalStorage() {
    const usuarios = JSON.parse(localStorage.getItem('users'));
    return usuarios || [];
}

function borrarUsuarios() {
    // borrarlos de localStorage


    // borrar el array 


    // mostrarUsuarios();


}


console.log(getUsersFromLocalStorage());
