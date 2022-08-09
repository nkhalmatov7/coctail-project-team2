const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";

const toggle = document.querySelector(".nav-toggle");
const input = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-result");
const filterBtn = document.querySelectorAll(".filter-btn");

let cocktails;
let cocktailId;

//Navbar toggle button
toggle.addEventListener("click", function (e) {
  const links = e.currentTarget.parentNode.nextElementSibling;
  links.classList.toggle("hidden");
});

// Fetch data from API
async function getCocktails() {
  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);
  cocktails = data.drinks;
  // console.log(cocktails);
  renderData(cocktails);
}
getCocktails();

//Rendering data with map
const renderData = function (cocktails) {
  searchResult.innerHTML = '';
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
            <button class="details">Details</button>
          </div>
        </div>
  `;
  searchResult.innerHTML += cocktailInfo;


  const btnDetails = document.querySelectorAll('.details');
  
  btnDetails.forEach(btn=>{

    btn.addEventListener("click", (event)=>{ 
     
      const id = event.target.dataset.id
      
      async function getId () {
        const response = await fetch (`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        // const data = await response.json();
        // cocktailId = data.drinks[0]
        showDetails(cocktail)
        
        
      }
      getId();
      

    })
  })

}

input.addEventListener('input', (e) => {
  const value = e.target.value;
  const filter = cocktails.filter(cocktail => {
    return cocktail.strDrink.toLowerCase().includes(value.toLowerCase())
  })
  if(filter.length > 0){
    return renderData(filter)
  } else {
    return searchResult.innerHTML = `<div class="no-item">No Item Founded</div>`
  }
})

    //--- Filtered buttons of Category by Anara and Aisulu start here ---

    filterBtn.forEach(el => {
      el.addEventListener('click', (event)=>{
        searchResult.innerHTML = '';
          renderData(filteredBtnOfCategory(cocktails, event.target.innerText))
      })
    })
    function filteredBtnOfCategory(arr, category){
      if(category === 'All'){
       return cocktails
      }
      else return arr.filter(el => el.strCategory === category)
    }
    
    //--- Filtered buttons of Category by Anara and Aisulu end here ---

    //--- Detail buttons of drinks by Zada and Mika start here---
  function showDetails(cocktail){
    const cleanPlaceToDisplay= document.querySelector('.cleanWhenBtnDetailsClicked')
    const placeToDisplayDetails = document.querySelector('.overlay-btn-details')
    cleanPlaceToDisplay.style.display = "none";



      const list = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, cocktail.strIngredient4, cocktail.strIngredient5  ];

      let cocktailDetails = `
        <button class="back-to-home">BACK TO HOME</button>
        <h1 class="header-details">${cocktail.strDrink}</h1>
        <div class="container-details">
          <div class="img-wrapper">
            <img class="image-cocktail-details" src=${cocktail.strDrinkThumb} alt="image">
          </div>
          <div class="content-wrapper">
            <p> <span class = "drinks-details-span"> Name:</span> <span class="span-name">${cocktail.strDrink}</span></p>
            <p> <span class = "drinks-details-span">Category: </span> <span class="span-category">${cocktail.strCategory}</span></p>
            <p> <span class = "drinks-details-span">Info:</span> <span class="span-info">${cocktail.strAlcoholic}</span></p>
            <p> <span class = "drinks-details-span">Glass: </span> <span class="span-glass>${cocktail.strGlass}</span></p>
            <p> <span class = "drinks-details-span">Instructions: </span><span class="span-instructions">${cocktail.strInstructions}</span></p>
            <p> <span class = "drinks-details-span">Ingredients: </span> <span class="span-ingredients">${list.map(ingredient=>{
              if(list.length > 0){
                return ingredient
              }
            }).join(" ")}</span></p>
          </div>
        </div>`;

        placeToDisplayDetails.innerHTML = cocktailDetails;

        const btnBackToHome= document.querySelectorAll(".back-to-home");
        btnBackToHome.forEach(btnBack=>{
        btnBack.addEventListener('click', ()=>{
        placeToDisplayDetails.innerHTML = "";
        cleanPlaceToDisplay.style.display = "block"
    
  })

  })




    } 


    //--- Detail buttons of drinks by Zada and Mika end here--- 