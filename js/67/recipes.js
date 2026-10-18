async function loadRecipes() {
    const selector = document.querySelector("#selector");
    const details = document.querySelector("#recipeDetails");

    try {
        const response = await fetch("recipes.json");
        const data = await response.json();

        data.recipes.forEach(recipe => {
            const option = document.createElement("option");

            option.value = recipe.url;
            option.textContent = recipe.name;

            selector.appendChild(option);
        });

        selector.addEventListener("change", async () => {
            try {
                const response = await fetch(selector.value);
                const recipe = await response.json();

                details.replaceChildren();

                const heading = document.createElement("h2");
                heading.textContent = recipe.name;
                details.appendChild(heading);

                const ingredients = document.createElement("p");
                ingredients.textContent =
                    "Ingredients: " + recipe.ingredients.join(", ");
                details.appendChild(ingredients);

                const directions = document.createElement("p");
                directions.textContent = "Directions: " + recipe.directions;
                details.appendChild(directions);

                const image = document.createElement("img");
                image.src = recipe.image;
                image.alt = recipe.name;
                image.width = 200;
                details.appendChild(image);

            } catch (error) {
                console.error("Error loading recipe details:", error);
            }
        });

    } catch (error) {
        console.error("Error loading recipes:", error);
    }
}

loadRecipes();
