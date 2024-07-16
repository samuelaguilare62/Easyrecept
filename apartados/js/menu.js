(function() {
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

  // Tarjetas de recetas
  const recipeCards = document.querySelectorAll('.recipe-card');
  
  // Función para mostrar una tarjeta según su nombre
  function showRecipeCard(cardName) {
    recipeCards.forEach(card => {
      const recipeTitle = card.querySelector('h2').textContent.trim();
      if (normalizeRecipeName(recipeTitle) === cardName) {
        card.style.display = 'block'; // Mostrar la tarjeta
      } else {
        card.style.display = 'none'; // Ocultar otras tarjetas
      }
    });
  }
  
  // Función para manejar el clic en el botón de compartir
  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar la acción predeterminada del enlace
      event.stopPropagation(); // Detener la propagación para evitar que se interprete como un clic en la tarjeta
  
      const recipeName = this.closest('.recipe-card').querySelector('h2').textContent.trim();
      const cardName = normalizeRecipeName(recipeName);
  
      // Mostrar la tarjeta correspondiente
      showRecipeCard(cardName);
  
      // Actualizar la URL del navegador para reflejar la tarjeta compartida, usando # en lugar de @
      const newUrl = `#${cardName}`;
      history.pushState(null, null, newUrl);
  
      // Almacenar en localStorage para persistencia
      localStorage.setItem('selectedRecipe', cardName);
  
      // Simular la acción de compartir (puedes personalizar esto según tus necesidades)
      alert(`Compartiendo: ${window.location.href}`);
    });
  });
  
  // Función para manejar la carga inicial y los cambios en el hash
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Eliminar el # del inicio
    if (hash) {
      showRecipeCard(hash);
    } else {
      // Si no hay hash, mostrar todas las tarjetas o la primera tarjeta
      recipeCards.forEach(card => card.style.display = 'block');
    }
  }
  
  // Manejar la carga inicial de la página
  window.addEventListener('load', handleHashChange);
  
  // Manejar cambios en el hash (por si el usuario navega con los botones del navegador)
  window.addEventListener('hashchange', handleHashChange);

  // Función para manejar el clic en el botón de favorito
  function handleFavoriteButtonClick(event) {
    event.preventDefault(); // Evitar la acción predeterminada del botón

    const card = this.closest('.recipe-card');
    const recipeImg = card.querySelector('img').src;
    const recipeTitle = card.querySelector('h2').textContent.trim();
    const recipeSource = card.querySelector('p:first-of-type').textContent.trim();
    const recipeDate = card.querySelector('p:last-of-type').textContent.trim();

    // Guardar la tarjeta de favorito en localStorage
    const favoriteRecipe = {
      img: recipeImg,
      title: recipeTitle,
      source: recipeSource,
      date: recipeDate
    };

    // Obtener el array de favoritos del localStorage o crear uno nuevo
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favoriteRecipe);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Redirigir a la página de Favoritos.html
    window.location.href = '/apartados/Favoritos.html';
  }

  // Asignar evento de clic al botón de favorito en cada tarjeta
  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', handleFavoriteButtonClick);
  });

  // Función para normalizar el nombre de la receta
  function normalizeRecipeName(name) {
    // Convertir a minúsculas y eliminar caracteres no alfanuméricos
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  // Verificar si hay una tarjeta seleccionada almacenada en localStorage y mostrarla al cargar la página
  const selectedRecipe = localStorage.getItem('selectedRecipe');
  if (selectedRecipe) {
    showRecipeCard(selectedRecipe);
  }

  // Limpiar localStorage al salir de la página
  window.addEventListener('beforeunload', function() {
    localStorage.removeItem('selectedRecipe');
  });

  // Limpiar overlay al volver atrás desde el caché del navegador
  window.addEventListener('pageshow', function(event) {
    // Verificar si la página se muestra desde el caché
    if (event.persisted) {
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove(); // Eliminar la capa de superposición si existe
      }
    }
  });

  // Deshabilitar enlaces dentro de recipe-actions
  document.querySelectorAll('.recipe-actions a').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar la acción predeterminada del enlace
      event.stopPropagation(); // Detener la propagación para evitar que afecte a otros elementos
    });
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
