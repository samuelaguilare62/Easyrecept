/*document.addEventListener("DOMContentLoaded", function() {
  
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

  
  const recomendacionesDiv = document.getElementById('recomendaciones');

  fetch('/info.json')
    .then(response => response.json())
    .then(data => {
      const recetas = Object.values(data);
      const hora = new Date().getHours();
      let periodo;

      if (hora >= 5 && hora < 12) {
        periodo = 'mañana';
      } else if (hora >= 12 && hora < 18) {
        periodo = 'tarde';
      } else if (hora >= 18 && hora < 24) {
        periodo = 'noche';
      } else {
        periodo = 'madrugada';
      }

      const recetasFiltradas = recetas.filter(receta => receta.periodo === periodo);

      recetasFiltradas.forEach(receta => {
        const recetaDiv = document.createElement('div');
        recetaDiv.classList.add('receta');
        
        let enlaceHTML = '';
        if (receta.enlace) {
          enlaceHTML = `<a href="${receta.enlace}">Ver Receta</a>`;
        }

        recetaDiv.innerHTML = `
          <div>
            <h2>${receta["title-card"]}</h2>
            <p>${receta.descripcion}</p>
            <p><strong>Autor:</strong> ${receta.author}</p>
            <p><strong>Fecha:</strong> ${receta.fecha}</p>
            ${enlaceHTML}
          </div>
        `;
        recomendacionesDiv.appendChild(recetaDiv);

        if (receta.recomendacion) {
          const recomendacionDiv = document.createElement('div');
          recomendacionDiv.classList.add('recomendacion');
          recomendacionDiv.innerHTML = `<p><strong>Recomendación:</strong> ${receta.recomendacion}</p>`;
          recomendacionesDiv.appendChild(recomendacionDiv);
        }
      });
    })
    .catch(error => console.error('Error al cargar las recetas:', error));
    
});*/
document.addEventListener("DOMContentLoaded", function() {
  
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

  const recomendacionesDiv = document.getElementById('recomendaciones');

  fetch('/info.json')
    .then(response => response.json())
    .then(data => {
      const recetas = Object.values(data);

      recetas.forEach(receta => {
        const recetaDiv = document.createElement('div');
        recetaDiv.classList.add('receta');
        
        let enlaceHTML = '';
        if (receta.enlace) {
          enlaceHTML = `<a href="${receta.enlace}">Ver Receta</a>`;
        }

        recetaDiv.innerHTML = `
          <div>
            <h2>${receta["title-card"]}</h2>
            <p>${receta.descripcion}</p>
            <p><strong>Autor:</strong> ${receta.author}</p>
            <p><strong>Fecha:</strong> ${receta.fecha}</p>
            ${enlaceHTML}
          </div>
        `;
        recomendacionesDiv.appendChild(recetaDiv);

        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.classList.add('recommendations-container');
        recommendationsContainer.style.display = 'none';
        
        let hasRecommendations = false;

        // Verificar recomendacion (string o array)
        if (receta.recomendacion && ((typeof receta.recomendacion === 'string' && receta.recomendacion.trim() !== "") || (Array.isArray(receta.recomendacion) && receta.recomendacion.length > 0 && receta.recomendacion[0].trim() !== ""))) {
          if (typeof receta.recomendacion === 'string') {
            receta.recomendacion = [receta.recomendacion]; // Convertir a array si es string
          }
          receta.recomendacion.forEach(recomendacion => {
            const recomendacionDiv = document.createElement('div');
            recomendacionDiv.classList.add('recomendacion');
            recomendacionDiv.innerHTML = `<p><strong>Recomendación:</strong> ${recomendacion}</p>`;
            recommendationsContainer.appendChild(recomendacionDiv);
          });
          hasRecommendations = true;
        }

        // Verificar recomendaciones (array)
        if (receta.recomendaciones && Array.isArray(receta.recomendaciones) && receta.recomendaciones.length > 0 && receta.recomendaciones[0].trim() !== "") {
          receta.recomendaciones.forEach(recomendacion => {
            const recomendacionDiv = document.createElement('div');
            recomendacionDiv.classList.add('recomendacion');
            recomendacionDiv.innerHTML = `<p><strong>Recomendación:</strong> ${recomendacion}</p>`;
            recommendationsContainer.appendChild(recomendacionDiv);
          });
          hasRecommendations = true;
        }

        if (hasRecommendations) {
          const showRecommendationsButton = document.createElement('button');
          showRecommendationsButton.classList.add('show-recommendations');
          showRecommendationsButton.textContent = 'Recomendaciones';
          
          showRecommendationsButton.addEventListener('click', function() {
            const isHidden = recommendationsContainer.style.display === 'none';
            recommendationsContainer.style.display = isHidden ? 'block' : 'none';
            showRecommendationsButton.textContent = isHidden ? 'Ocultar Recomendaciones' : 'Recomendaciones';
          });

          recetaDiv.querySelector('div').appendChild(showRecommendationsButton);
          recetaDiv.querySelector('div').appendChild(recommendationsContainer);
        }
      });
    })
    .catch(error => console.error('Error al cargar las recetas:', error));
    
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

});
