import { toggleBar } from "../toggle.js";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const input = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-result");
const btnContainer = document.querySelector(".filter");
const loadingImage = document.querySelector(".input-loading-image");



let cocktails;
let cocktailId;

//Navbar toggle button
toggleBar();

function loading() {
  searchResult.style.display = "block";
  searchResult.innerHTML = `
  <div class='loading'>
    <img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif" alt="loading"/>
  </div>
  `;
}

// Fetch data from API
async function getCocktails() {
  loading();
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  cocktails = data.drinks;
  // console.log(cocktails);
  renderData(cocktails);
  displayCategoryBtns(cocktails);
}
getCocktails();

//Rendering data with map
const renderData = function (cocktails) {
  searchResult.style.display = "grid";
  searchResult.innerHTML = "";
  cocktails.map((cocktail) => {
    createCocktails(cocktail);
  });
};

//How each cocktail info will be displayed
const createCocktails = function (cocktail) {
  const cocktailInfo = `
  <div class="cocktail-item">
          <div class="img-wrapper">
            <img
              src=${cocktail.strDrinkThumb}
              alt=""
            />
          </div>
          <div class="cocktail-info">
            <p class="cocktail-name">${cocktail.strDrink}</p>
            <p class="glass">${cocktail.strGlass}</p>
            <p class="cocktail-type">${cocktail.strAlcoholic}</p>
            <button data-id= ${cocktail.idDrink} class="details">Details</button>
          </div>
        </div>
  `;
  searchResult.innerHTML += cocktailInfo;

  const btnDetails = document.querySelectorAll(".details");

  btnDetails.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      console.log(id);

      async function getId() {
        const response = await fetch(
          `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const data = await response.json();

        cocktailId = data.drinks[0];
        showDetails(cocktailId);
      }
      getId();
    });
  });
};

//--- Filtering Cocktails Nurlan and Zhassulan start

input.addEventListener("input", (e) => {
  const value = e.target.value;
  const filter = cocktails.filter((cocktail) => {
    return cocktail.strDrink.toLowerCase().includes(value.toLowerCase());
  });
  if (filter.length > 0) {
    searchResult.style.display = "grid";
    return renderData(filter);
  } else {
    searchResult.style.display = "block";
    return (searchResult.innerHTML = `<h1 class="no-item">No Cocktails Matched Your Search Criteria</h1>`);
  }
});

//---Zada and Akzhol input loading starts here
let loadingInput;

input.addEventListener('keyup',()=>{

  loadingInput = setTimeout(()=>{
    searchResult.style.display = "none";
    loadingImage.style.display = "grid";
  },50)
  setTimeout(()=>{
    searchResult.style.display = "grid";
    loadingImage.style.display = "none";

  },500)

})


//---Zada and Akzhol input loading ends here

//--- Filtered buttons of Category by Anara and Aisulu start here ---

// filterBtn.forEach((el) => {
//   el.addEventListener("click", (event) => {
//     console.log(event.target.innerText);
//     searchResult.innerHTML = "";
//     renderData(filteredBtnOfCategory(cocktails, event.target.innerText));
//   });
// });
// function filteredBtnOfCategory(arr, category) {
//   if (category === "ALL") {
//     return cocktails;
//   } else return arr.filter((el) => el.strCategory.includes(category));
// }

//category buttons
function displayCategoryBtns(cocktails) {
  //solution with new Set
  /*  const category = cocktails.map((cocktail) => {
    return cocktail.strCategory;
  });
  const categories = new Set(category);
  categories.add("All");
  console.log(categories);
  for (let category of categories) {
    const categoryBtn = `
      <button class="filter-btn" data-id=${category}>${category}</button>
           `;
    // console.log(categoryBtn);
    btnContainer.innerHTML += categoryBtn;
  } */

  //solution with reduce HOF
  const categories = cocktails.reduce(
    (values, item) => {
      if (!values.includes(item.strCategory)) {
        values.push(item.strCategory);
      }
      return values;
    },
    ["All"]
  );

  categories.map((category) => {
    const categoryBtn = `
      <button class="filter-btn" data-id=${category}>${category}</button>
           `;
    // console.log(categoryBtn);
    btnContainer.innerHTML += categoryBtn;
  });

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      console.log(category);
      const cocktailItems = cocktails.filter((cocktailItem) => {
        if (cocktailItem.strCategory.includes(category)) {
          return cocktailItem;
        }
      });
      if (category === "All") {
        console.log(cocktails);
        return renderData(cocktails);
      } else {
        console.log(cocktailItems);
        return renderData(cocktailItems);
      }
    });
  });
}

//--- Detail buttons of drinks by Zada and Mika start here---
function showDetails(cocktail) {
  const cleanPlaceToDisplay = document.querySelector(
    ".cleanWhenBtnDetailsClicked"
  );
  const placeToDisplayDetails = document.querySelector(".overlay-btn-details");
  cleanPlaceToDisplay.style.display = "none";

  const list = [
    cocktail.strIngredient1,
    cocktail.strIngredient2,
    cocktail.strIngredient3,
    cocktail.strIngredient4,
    cocktail.strIngredient5,
  ];

  let cocktailDetails = `
        <button class="back-to-home">BACK TO HOME</button>
        <h1 class="header-details">${cocktail.strDrink}</h1>
        <div class="container-details">
          <div class="img-wrapper-details">
            <img class="image-cocktail-details" src=${
              cocktail.strDrinkThumb
            } alt="image">
          </div>
          <div class="content-wrapper">
            <p> <span class = "drinks-details-span"> Name:</span> <span class="span-name">${
              cocktail.strDrink
            }</span></p>
            <p> <span class = "drinks-details-span">Category: </span> <span class="span-category">${
              cocktail.strCategory
            }</span></p>
            <p> <span class = "drinks-details-span">Info:</span> <span class="span-info">${
              cocktail.strAlcoholic
            }</span></p>
            <p> <span class = "drinks-details-span">Glass: </span> <span class="span-glass>${
              cocktail.strGlass
            }</span></p>
            <p> <span class = "drinks-details-span">Instructions: </span><span class="span-instructions">${
              cocktail.strInstructions
            }</span></p>
            <p> <span class = "drinks-details-span">Ingredients: </span> <span class="span-ingredients">${list
              .map((ingredient) => {
                if (list.length > 0) {
                  return ingredient;
                }
              })
              .join(" ")}</span></p>
          </div>
        </div>`;

  placeToDisplayDetails.innerHTML = cocktailDetails;

  const btnBackToHome = document.querySelectorAll(".back-to-home");
  btnBackToHome.forEach((btnBack) => {
    btnBack.addEventListener("click", () => {
      placeToDisplayDetails.innerHTML = "";
      cleanPlaceToDisplay.style.display = "block";
    });
  });
}

//--- Detail buttons of drinks by Zada and Mika end here---
