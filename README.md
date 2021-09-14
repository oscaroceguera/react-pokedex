# Pokedex

- Crear un proyecto React con `create-react-app` o usar https://codesandbox.io/

**Dependencias**

- [react-router](https://reactrouter.com/)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [material-ui](https://material-ui.com/)
- [axios](https://www.npmjs.com/package/axios)

**APIs**

- [pokeapi](https://pokeapi.co/)
- [mockapi](https://mockapi.io/)

## V1.1.0 - Listado de pokemons

- Configurar material-ui para usar los componentes de este design system.
- Crear una ruta llamada `/dashboard` para listar los pokemons.
- El listado mostrara cada item dentro de una card con la imagen del pokemon.
- El recurso para recuperar la lista sera acceder al api de pokeapi con el endpoint `https://pokeapi.co/api/v2/pokemon?limit=600` para acceder a 600 pokemons.
- Para recuperar la imagen se usa este link `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id_de_pokemon}.png` se necesita enviarle el id del pokemon.
- Obtener el id del pokemon e.g.:

```javascript
const url = "https://pokeapi.co/api/v2/pokemon/1/";
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const id = url.replace(apiUrl, "").replace("/", "");
console.log("ID", id); // 1
```

**Estados del componente**

- **Loading:** Cuando se ejecute la consulta mostrar un loading miestras se resuelve la petición.
- **Error:** mostrar error si la petición falla.
- **Lista vacia:** en caso de que la petición retorne algo vacio.
- **Success:** se muestra el listado.

## Vista

**ERROR:**
![Error](error.png)

**LOADING**
![Loading](loading.png)

**LIST**
![List](list.png)
