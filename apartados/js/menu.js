document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            if (!menu.contains(event.target) && event.target !== menuToggle) {
                menu.classList.remove('open');
            }
        });
    }

    const recipeCards = document.querySelectorAll('.recipe-card');

    function showRecipeCard(cardName) {
        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('h2').textContent.trim();
            if (normalizeRecipeName(recipeTitle) === cardName) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const recipeName = this.closest('.recipe-card').querySelector('h2').textContent.trim();
            const cardName = normalizeRecipeName(recipeName);

            showRecipeCard(cardName);
            history.pushState(null, null, `#${cardName}`);
            localStorage.setItem('selectedRecipe', cardName);

            alert(`Compartiendo: ${window.location.href}`);
        });
    });

    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            showRecipeCard(hash);
        } else {
            recipeCards.forEach(card => card.style.display = 'block');
        }
    }

    window.addEventListener('load', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);

    function handleFavoriteButtonClick(event) {
        event.preventDefault();

        const card = this.closest('.recipe-card');
        const recipeImg = card.querySelector('img').src;
        const recipeTitle = card.querySelector('h2').textContent.trim();
        const recipeSource = card.querySelector('p:first-of-type').textContent.trim();
        const recipeDate = card.querySelector('p:last-of-type').textContent.trim();

        const favoriteRecipe = {
            img: recipeImg,
            title: recipeTitle,
            source: recipeSource,
            date: recipeDate
        };

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(favoriteRecipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        window.location.href = '/apartados/Favoritos.html';
    }

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', handleFavoriteButtonClick);
    });

    function normalizeRecipeName(name) {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    const selectedRecipe = localStorage.getItem('selectedRecipe');
    if (selectedRecipe) {
        showRecipeCard(selectedRecipe);
    }

    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('selectedRecipe');
    });

    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    });

    document.querySelectorAll('.recipe-actions a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });

    const shareButton = document.querySelector(".ShareWeb");

    if (shareButton) {
        shareButton.addEventListener("click", function (event) {
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
