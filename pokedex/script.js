const listaPokemon =document.querySelector('#listaPokemon');  /* Busca el div con el id "listaPokemon" y lo guarda en una variable para luego meter la estructura html de cad tarjeta de pokemon  independiente" */
const botonesHeader = document.querySelectorAll('.btn-header'); /* BUsca todos los elementos con clase btn-header (botones de tipo de pokemon) y devuelve una lista con cada uno de estos */
let URL = "https://pokeapi.co/api/v2/pokemon/"; /*direccion base de la API */

for (let i=0 ; i <= 151 ; i++) { /* i aumentara su valor de 1 en 1 mientras sea menor o igual a 151(numero de pokemones a mostrar) emoezando con un valor de 0 */
    fetch(URL + i) /*hace una peticion a la api y agrega al final del link el numero correspondiente a la vuelta de  i, es decir que pedira los datos de los primeros 151 pokemones */
        .then((response)  => response.json()) /* "Then" = cuando la respuesta llegue haz "response" y con json lo convertimos en un objeto de javascript para poder trabajarlo */
        .then(poke => mostrarPokemon(poke)) /* una vez el json devuelve un objeto y poke es el objeto que guaradara los datos del pokemon correspondiente, estos datos se pueden mostrar a traves de la funcion mostrarPokemon */
}

function mostrarPokemon(poke) {
/* poke.types es una lista de los tipos que tiene el pokemon. .map recorre esa lista y para cada tipo que tenga el pokemon creara un  <p class="${type.type.name} tipo">${type.type.name}</p>*/
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');/* une esa lista de textos en un solo texto, sin separarlos */

    let pokeId = poke.id.toString(); /* guarda en la variable pokeId el texto de la clave "id" del pokemon, su uso se explica en las lineas */
    if (pokeId.length === 1) { /* si el texto es igual a 1 caracter de largo entonces se le agregan 2 ceros antes */
        pokeId =  `00${pokeId}`;
    } else if (pokeId.length === 2) {/* si el texto es igual a 2 caracteres de largo entonces se le agrega 1 cero antes */
        pokeId = `0${pokeId}`;
    }

    const div = document.createElement('div'); /* crea un div nuevo, sera la base para las tarjetas de cada pokemon */
    div.classList.add('pokemon'); /* se le asigna una clase "pokemon" al div creado */
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${pokeId}"/>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>
    `;
        /* este div tendra adentro la estructura HTML agregada dentro de las comillas simpleas*/
        /* <p class="pokemon-id-back">#${pokeId}</p> :: Es el id mostrado al fondo de cada tarjeta de cada pokemon, su texto es igual a la variable pokeIda mencionada en la lista 16*/
        /* <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${pokeId}"/> :: Es la imagen de cada pokemon  */
        /*  <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>  :: Son el nombre y id visibles debajo de la foto del pokemon*/
        /*<div class="pokemon-tipos">
                ${tipos}
            </div>         :: Para colocar el tipo o tipos de cada pokemos solo es necesario agregar la variable donde se guaradaron los parrafos creados para cada tipo */
        /* <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}KG</p>  :: Solamente agrega el peso y estatura del pokemon*/
    listaPokemon.append(div); /* dentro de la variable listaPokemon la cual guarda el div "listaPokemon" insertamos el div que acabamos de crear*/
}


botonesHeader.forEach(boton => boton.addEventListener('click', (event) => { /* la variable boton recorrera cada elemento dentro de botonesHeader, cuando boton sea clickeado entonces:*/
    const botonId = event.currentTarget.id; /* la constante botonId guarda el el id del boton pulsado actualmente (.currentTarget) */

    listaPokemon.innerHTML = ''; /* vacia el div contenedor (listapokemon) */

    for (let i=0 ; i <= 151 ; i++) { /* igualmente que al inicio recorre los 151 pokemones de nuevo */
        fetch(URL + i)
            .then((response)  => response.json())
            .then(poke => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(poke);  /* si el boton pulsado tenia el id "ver-todos el codigo carga todos los pokemones sin excepcion" */
                } else {
                    
                    const tipos = poke.types.map(type => type.type.name); /* si no crea una lista llamada tipos donde guardara todos los nombres de todos los tipos de pokemon existentes*/
                    if (tipos.some(tipo => tipo.includes(botonId))) { /* la variable tipo, recorre cada elemento de tipos y comprueba si alguno contiene el id del boton pulsado */
                        mostrarPokemon(poke);       /* muestra poke, ya que ahora poke esta filtrada y no contiene todos los pokemones */
                    }
                }
                

            })
    }
}))