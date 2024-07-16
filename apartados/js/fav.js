(function() {
  const favoritesContainer = document.getElementById('favorites-container');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(recipe => {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favorite-card');
    favoriteCard.innerHTML = `
      <img src="${recipe.img}" alt="${recipe.title}">
      <div class="recipe-info">
        <h2>${recipe.title}</h2>
        <p>Sacado de: ${recipe.source}</p>
        <p>Fecha: ${recipe.date}</p>
        <button class="remove-btn"><i class="fa-regular fa-bookmark"></i></button>
      </div>
    `;

    // Botón para eliminar de favoritos
    const removeButton = favoriteCard.querySelector('.remove-btn');
    removeButton.addEventListener('click', function() {
      // Eliminar del array de favoritos
      const updatedFavorites = favorites.filter(fav => fav.title !== recipe.title);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Remover la tarjeta de la vista
      favoriteCard.remove();
    });

    favoritesContainer.appendChild(favoriteCard);
  });

  // Menú lateral
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', function(event) {
    menu.classList.toggle('open');
    event.stopPropagation(); // Detener la propagación para evitar cerrar el menú inmediatamente
  });

  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && event.target !== menuToggle && menu.classList.contains('open')) {
      menu.classList.remove('open');
    }
  });

  const shareButton = document.querySelector(".ShareWeb");

  if (shareButton) {
    shareButton.addEventListener("click", function(event) {
      event.preventDefault();

      if (navigator.share) {
        let shareData = {
          title: document.title,
          text: "¡Descubre esta increíble página!",
          url: window.location.href
        };

        navigator.share(shareData)
          .then(() => console.log("Contenido compartido exitosamente."))
          .catch(error => console.error("Error al compartir:", error));
      } else {
        console.log("La API de compartir no está disponible en este navegador.");
      }
    });
  }
})();
