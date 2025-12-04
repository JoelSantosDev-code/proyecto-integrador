//Seleccionar contenedores donde se insertarán las cards
const container = document.getElementById("cards-container");
const containerTwo = document.getElementById("general-container");
//Cargar datos iniciales de departamentos al cargar la página
window.addEventListener("load", cargarGeneral);

//le asignamos una variable a los endpoints
const departamentos = "https://api-colombia.com/api/v1/Department";
const turismo = "https://api-colombia.com/api/v1/TouristicAttraction";
const general = "https://api-colombia.com/api/v1/Country/Colombia";
const gastronomia = "https://api-colombia.com/api/v1/TypicalDish";
const mapas = "https://api-colombia.com/api/v1/Map";
//fetch para obtener los datos del endpoint general
function cargarGeneral() {
  container.innerHTML = ""; //limpia el contenedor antes de cargar nuevos datos
  fetch(general)
    .then((resp) => resp.json())
    .then((data) => {

      // Crear elementos para mostrar información general
      const countryContainer = document.createElement("div");
      const flag = document.createElement("img");
      const title = document.createElement("h2");
      const description = document.createElement("p");
      const capital = document.createElement("li");
      const population = document.createElement("li");
      const surface = document.createElement("li");
      const language = document.createElement("li");

      // Agregar contenido del JSON
      flag.src = data.flags[1];
      flag.alt = `Bandera de ${data.name}`;
      title.textContent = data.name;
      description.textContent = data.description || "Descripción no disponible";
      capital.textContent = `Capital: ${data.stateCapital || "No disponible"}`;
      population.textContent = `Población: ${data.population.toLocaleString('es-CO')}`;
      surface.innerHTML = `Superficie: ${data.surface.toLocaleString('es-CO')} Km<sup>2</sup>`;
      language.textContent = `Idioma oficial: ${data.languages[0] || "No disponible"}`;

      // Insertar contenido en los elementos
      countryContainer.appendChild(flag);
      countryContainer.appendChild(title);
      countryContainer.appendChild(description);
      countryContainer.appendChild(capital);
      countryContainer.appendChild(population);
      countryContainer.appendChild(surface);
      countryContainer.appendChild(language);

      // Agregar clases para estilos
      countryContainer.classList.add("country-container");
      flag.classList.add("country-flag");
      title.classList.add("country-title");
      description.classList.add("country-description");
      capital.classList.add("country-capital");
      population.classList.add("country-population");
      surface.classList.add("country-surface");
      language.classList.add("country-language");

      // Agregar el contenedor del país al contenedor principal
      containerTwo.appendChild(countryContainer);
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}
//fetch para obtener los datos del endpoint de departamentos
function cargarDepartamentos() {
  container.innerHTML = ""; //limpia el contenedor antes de cargar nuevos datos
  containerTwo.innerHTML = ""; //limpia el contenedor de info general
  fetch(departamentos)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        //crear elementos
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const description = document.createElement("p");
        const population = document.createElement("p");
        const surface = document.createElement("p");
        const capital = document.createElement("p");

        //Agrega contenido del JSON
        title.textContent = item.name;
        description.textContent = item.description
          // Se eliminan frases repetitivas en las descripciones
          .replace(' es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia.', '. ')
          .replace(' es uno de los 32 departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia', '')
          .replace(' es uno de los treinta y dos departamentos que, junto a Bogotá, Distrito Capital, forman la República de Colombia', '')
          .replace(' es uno de los treinta y dos departamentos que junto con Bogotá, Distrito Capital, conforman la República de Colombia', '')
          .trim();
        population.textContent = `Población: ${item.population.toLocaleString('es-CO')}`; //formatea el número con separadores de miles
        surface.innerHTML = `Superficie: ${item.surface.toLocaleString('es-CO')} Km<sup>2</sup>`; //formatea el número con separadores de miles
        capital.textContent = `Capital: ${item.cityCapital?.name || "No disponible" //manejo de datos faltantes
          }`;

        //Se insertan dentro de la card
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(population);
        card.appendChild(surface);
        card.appendChild(capital);

        //se agregan clases para los estilos
        card.classList.add("card");
        title.classList.add("card-title");
        description.classList.add("card-description");
        population.classList.add("card-population");
        surface.classList.add("card-surface");
        capital.classList.add("card-capital");

        //se agrega card al contenedor
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}


//fetch para obtener los datos del endpoint de atracciones turísticas
function cargarTurismo() {
  container.innerHTML = ""; //limpia el contenedor antes de cargar nuevos datos
  containerTwo.innerHTML = ""; //limpia el contenedor de info general
  fetch(turismo)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        //crear elementos
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const image = document.createElement("img");
        const description = document.createElement("p");
        const location = document.createElement("p");

        //Agrega contenido del JSON
        title.textContent = item.name;
        image.src = item.images;
        image.alt = `Imagen de ${item.name}`;
        description.textContent = item.description || "Descripción no disponible"; //manejo de datos faltantes
        location.textContent = `Ubicación; ${item.city?.name || "No disponible"}`; //manejo de datos faltantes

        //Se insertan dentro de la card
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(location);

        //se agregan clases para los estilos
        card.classList.add("card");
        title.classList.add("card-title");
        image.classList.add("card-image");
        description.classList.add("card-description");
        location.classList.add("card-location");

        //se agrega card al contenedor
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

function cargarGastronomia() {
  container.innerHTML = ""; //limpia el contenedor antes de cargar nuevos datos
  containerTwo.innerHTML = ""; //limpia el contenedor de info general
  //fetch para obtener los datos del endpoint de gastronomía
  fetch(gastronomia)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        //crear elementos
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const image = document.createElement("img");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const departamento = document.createElement("p");

        //Agrega contenido del JSON
        title.textContent = item.name;
        image.src = item.imageUrl;
        image.alt = `Imagen de ${item.name}`;
        description.textContent = item.description || "Descripción no disponible"; //manejo de datos faltantes
        ingredients.textContent = `Ingredientes: ${item.ingredients || "No disponible"}`; //manejo de datos faltantes
        departamento.textContent = `Departamento: ${item.department?.name || "No disponible"}`; //manejo de datos faltantes

        //Se insertan dentro de la card
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(ingredients);
        card.appendChild(departamento);

        //se agregan clases para los estilos
        card.classList.add("card");
        title.classList.add("card-title");
        image.classList.add("card-image");
        description.classList.add("card-description");
        ingredients.classList.add("card-ingredients");
        departamento.classList.add("card-departamento");

        //se agrega card al contenedor
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

function cargarMapas() {
  container.innerHTML = ""; //limpia el contenedor antes de cargar nuevos datos
  containerTwo.innerHTML = ""; //limpia el contenedor de info general
  //fetch para obtener los datos del endpoint de mapas
  fetch(mapas)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        //crear elementos
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const image = document.createElement("img");
        const description = document.createElement("p");
        const reference = document.createElement("p");
        const source = document.createElement("a");

        //Agrega contenido del JSON
        title.textContent = item.name;
        image.src = item.urlImages[0];
        image.alt = `Mapa de ${item.name}`;
        reference.textContent = `Imagen: ${item.name}, recuperada de:`;
        source.href = item.urlSource || "#"; //manejo de datos faltantes
        description.textContent = item.description || "Descripción no disponible"; //manejo de datos faltantes

        //Se insertan dentro de la card
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(reference);
        reference.appendChild(source);
        source.textContent = item.urlSource || "No disponible";
        card.appendChild(description);

        //se agregan clases para los estilos
        card.classList.add("card");
        title.classList.add("card-title");
        image.classList.add("card-image");
        reference.classList.add("card-reference");
        source.classList.add("card-source");
        description.classList.add("card-description");
        //se agrega card al contenedor
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}
// Event listeners para los botones del menú
document.getElementById("turismo").addEventListener("click", (e) => {
  e.preventDefault();
  cargarTurismo();
});

document.getElementById("departamentos").addEventListener("click", (e) => {
  e.preventDefault();
  cargarDepartamentos();
});

document.getElementById("general").addEventListener("click", (e) => {
  e.preventDefault();
  cargarGeneral();
});

document.getElementById("gastronomia").addEventListener("click", (e) => {
  e.preventDefault();
  cargarGastronomia();
});

document.getElementById("mapas").addEventListener("click", (e) => {
  e.preventDefault();
  cargarMapas();
});

//Codigo para el toogle theme
const toggle = document.getElementById("theme-switch");

//Detectar tema guardado en localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  toggle.checked = savedTheme === "dark";
}

//Evento para cambiar tema
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Modal para imagen completa
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Función para abrir modal
function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  imageModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Cerrar modal al hacer clic en el botón X
closeModal.addEventListener('click', () => {
  imageModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera de la imagen
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.classList.contains('active')) {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Delegar eventos a las imágenes dinámicas
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-image')) {
    openImageModal(e.target.src, e.target.alt);
  }
});

console.log("Archivo index.js cargado correctamente");
