function comments(postId) {
    console.log("Cargando comentarios del post:", postId);

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comentarios => {

            let muro = document.getElementById(`com${postId}`);
            let texto = "";
            
            comentarios.forEach(comentario => {
                texto += `
                <div class="card mt-2">
                    <div class="card-header fw-bold">${comentario.name}</div>
                    <div class="card-body">
                        <h6 class="card-title text-muted">${comentario.email}</h6>
                        <p class="card-text">${comentario.body}</p>
                    </div>
                </div>`;
            });
            muro.innerHTML = texto;
        })
        .catch(error => console.error("Error al cargar comentarios:", error));
}

window.comments = comments;


const btnCargar = document.getElementById("btnCargar");
btnCargar.addEventListener("click", () => {
    btnCargar.classList.toggle("btn-success");
    btnCargar.classList.toggle("btn-secondary");

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(usuarios => {
            let datos = document.getElementById("menu");
            let texto = "";
            usuarios.forEach(usr => {
                texto += `<option value="${usr.id}">${usr.name}</option>`;
            });
            datos.innerHTML = `<option value="0">Selecciona un Usuario</option>` + texto;
        })
        .catch(error => console.error("Error al cargar usuarios:", error));
});


const menu = document.getElementById("menu");
menu.addEventListener("change", () => {
    let datos = document.getElementById("pubs");
    
    if (menu.value === "0") {
        datos.innerHTML = "";
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${menu.value}`)
        .then(response => response.json())
        .then(posts => {
            let texto1 = "";
            posts.forEach(post => {
                texto1 += `
                <div class="card mb-4">
                    <div class="card-header bg-primary text-white">
                        Publicación #${post.id}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        
                        <button onClick="comments(${post.id})" class="btn btn-outline-primary">Ver Comentarios</button>
                        
                        <div id="com${post.id}" class="mt-3"></div>
                    </div>
                </div>`;
            });
            datos.innerHTML = texto1;
        })
        .catch(error => console.error("Error al cargar publicaciones:", error));
});