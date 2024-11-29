const apiKey = "a2de8100073f49a382d99d5dc12e3062";
const allRecipes = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;


var card_container = document.getElementById("cardbox");
var searchBar = document.getElementById("recipe-search-bar");

// Event Listeners
document.getElementById("searchbtn").addEventListener("click", handleSearchRecipes);


// Display recipes on initial screen load
displayAllRecipes();

// Function to fetch and display all recipes
async function displayAllRecipes() {
  card_container.innerHTML = ""; // Clear existing content

  // Fetch data only if it's not already in localStorage
  if (!localStorage.getItem("Recipes")) {
    try {
      const response = await fetch(allRecipes);
      const data = await response.json();
      localStorage.setItem("Recipes", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  // Retrieve data from localStorage and display cards
  const data = JSON.parse(localStorage.getItem("Recipes"));
  generateRecipeCards(data);
}



// Function to fetch and add ingredients to recipes
async function fetchAndAddIngredients(data, localStorageKey) {
  if (!localStorage.getItem(localStorageKey)) {
    for (const element of data.results) {
      const ingredientApi = `https://api.spoonacular.com/recipes/${element.id}/ingredientWidget.json?apiKey=${apiKey}&number=10`;

      try {
        const response = await fetch(ingredientApi);
        const ingredientData = await response.json();
        localStorage.setItem(element.title, JSON.stringify(ingredientData));
        
        const ingredientList = ingredientData.ingredients.map((ingredient) => ({
          name: ingredient.name,
          amount: ingredient.amount.metric.value,
          unit: ingredient.amount.metric.unit || "qty",
        }));

        // Add ingredients to the recipe object
        element.ingredients = ingredientList;
      } catch (error) {
        console.error(error);
      }
    }

    // Save the updated data in localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  const storedData = JSON.parse(localStorage.getItem(localStorageKey));
  generateRecipeCards(storedData);
}


// Function to display recipe cards
function generateRecipeCards(data) {
  data.results.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = element.id;

    card.innerHTML = `
      <img src="${element.image}" alt="Food Recipe Image">
      <div class="recipy-card">
        <h3 class="card-title">${element.title}</h3>
      </div>
    `;

    // Add click event listener to show individual recipe details
    card.addEventListener("click", () => displayRecipeDetails(element.id));
    card_container.appendChild(card);
  });
}


// Function to fetch and display searched recipes
async function handleSearchRecipes() {
  card_container.innerHTML = ""; // Clear existing content
  console.log(searchbar.value);

  const searchQuery = searchbar.value.toLowerCase();
//   console.log(searchQuery);
  if (!localStorage.getItem(searchQuery)) {
    const searchRecipeUrl = `https://api.spoonacular.com/recipes/complexSearch?number=16&query=${searchQuery}&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(searchRecipeUrl);
      const data = await response.json();
      localStorage.setItem(searchQuery, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  const searchData = JSON.parse(localStorage.getItem(searchQuery));
  generateRecipeCards(searchData);
}

// Function to display recipe details
const recipeCardBody = document.getElementById("recipes");
async function displayRecipeDetails(id) {
    console.log(id);
  // recipeCardBody.innerHTML = ""; // Clear existing content
  const recipy_card = document.getElementById("recipy-card");
//   recipy_card.style.display="flex";

  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  if (!localStorage.getItem(id)) {
    try {
      const response = await fetch(recipeUrl);
      const recipeData = await response.json();
      localStorage.setItem(id, JSON.stringify(recipeData));
    } catch (error) {
      console.error(error);
    }
  }

  const recipeData = JSON.parse(localStorage.getItem(id));
  const allSteps = recipeData.analyzedInstructions[0]?.steps || [];
console.log(allSteps);
let stephtml = '';
  // Display steps for the recipe
  allSteps.forEach((step) => {
    stephtml += `<p>${step.step}</p>`;
  });
  recipeCardBody.innerHTML = `<div id="recipy-card" style="display: flex; ">
            <button  class="close" onclick="hideCard()">X</button>
        </div>
        <h1>Recipe</h1>`
  recipeCardBody.innerHTML += stephtml;

  recipeCardBody.style.display = "block";
}




function hideCard() {
 recipeCardBody.style.display = "none"; // Hide the recipe card
  
}




function showRecipe() {
  // Select the recipe card
  const recipeCard = document.getElementById("recipy-card");

  // Toggle the display property
  if (recipeCard.style.display === "none") {
      recipeCard.style.display = "flex"; // Show the recipe
  } else {
      recipeCard.style.display = "none"; // Hide the recipe
  }
}



async function showrecipies(type) {
  card_container.innerHTML = ""; // Clear existing content
  console.log("button pressed");
//   console.log(searchQuery);
  if (!localStorage.getItem(type)) {
    const searchRecipeUrl = `https://api.spoonacular.com/recipes/complexSearch?number=16&cuisine=${type}&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(searchRecipeUrl);
      const data = await response.json();
      localStorage.setItem(type, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  const searchData = JSON.parse(localStorage.getItem(type));
  console.log(searchData);
  generateRecipeCards(searchData);
  
}

function testfunction() {
  alert("mouse hover");
}

const homeBtn = document.getElementById("homeBtn");
        const otherBtn1 = document.getElementById("Btn1");
        const otherBtn2 = document.getElementById("Btn2");
        const homeImage = document.getElementById("remove");

        // Show the image when "Home" is clicked
        homeBtn.addEventListener("click", () => {
            homeImage.style.display = "block";
        });

        // Hide the image when any other button is clicked
        Btn1.addEventListener("click", () => {
            homeImage.style.display = "none";
        });

       