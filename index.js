const container = document.getElementById("cards-container");

const departamentos = "https://api-colombia.com/api/v1/Department"; //le asignamos una variable al endpoint
const atracciones = "https://api-colombia.com/api/v1/TouristicAttraction"; 

//fetch para obtener los datos del endpoint de departamentos

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
      capital.textContent = `Capital: ${
        item.cityCapital?.name || "No disponible" //manejo de datos faltantes
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
//fetch para obtener los datos del endpoint de atracciones turísticas
fetch(atracciones)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((item) => {

  })
})

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

console.log("Archivo index.js cargado correctamente");
