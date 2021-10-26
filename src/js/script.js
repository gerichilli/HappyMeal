'use strict';

const { async } = require("regenerator-runtime");

// --------------------
// ** SWIPER SLIDE INIT 

const slideSpaceBetween = getComputedStyle(document.documentElement).getPropertyValue('--recipe-gap');

const productSwiperLargeOptions = {
    slidesPerView: 3,
    spaceBetween: parseFloat(slideSpaceBetween),
    slidesPerGroup: 3,
    loop: true,
}

const productSwiperMediumOptions = {
    slidesPerView: 4,
    spaceBetween: parseFloat(slideSpaceBetween),
    slidesPerGroup: 2,
    loop: true,
}

const productSwiperSimilarOptions = {
    slidesPerView: 5,
    spaceBetween: parseFloat(slideSpaceBetween),
    slidesPerGroup: 2,
    loop: true,
}

const productSwiperSmallOptions = {
    slidesPerView: 6,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
}

const bannerSwiperOptions = {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable:true
    },
}

const productSwiperLarge = new Swiper(".product-swiper-large", productSwiperLargeOptions);
const productSwiperMedium = new Swiper(".product-swiper-medium", productSwiperMediumOptions);
const productSwiperSimilar = new Swiper(".product-swiper-similar", productSwiperSimilarOptions);
const productSwiperSmall = new Swiper(".product-swiper-small", productSwiperSmallOptions);
const bannerSwiper = new Swiper(".banner-swiper", bannerSwiperOptions);

// -----------------------
// ** SWIPER SLIDE BUTTONS

const btnPrevs = document.querySelectorAll('.button-prev');
const btnNexts = document.querySelectorAll('.button-next');

function getTargetSwiper(button) {
    const slideShow = button.closest('.recipe__slideshow');
    const targetSwipper = slideShow.querySelector('.swiper');
    return targetSwipper;
}

function setSwiperButtonPosition(button) {
    const currentSwiper = getTargetSwiper(button);
    const swipperImage = currentSwiper.querySelector('.recipe__img');
    const imageHeight = swipperImage.getBoundingClientRect().width;
    button.style.top = `${imageHeight / 2}px`
}

function updateSwiperButtonPosition(button) {
    setSwiperButtonPosition(button);
    setInterval(() => setSwiperButtonPosition(button), 500);
    window.addEventListener('resize', function() {
        setSwiperButtonPosition(button);
    }, true);
}

btnPrevs.forEach(prev => {
    updateSwiperButtonPosition(prev);

    prev.addEventListener('click', function() {
        getTargetSwiper(prev).swiper.slidePrev();
    })
})

btnNexts.forEach(next => {
    updateSwiperButtonPosition(next);

    next.addEventListener('click', function() {
        getTargetSwiper(next).swiper.slideNext();
    })
})

// -----------------------
// ** TO TOP BUTTON
const toTop = document.querySelector('.toTop');
const header = document.getElementById('header');
const rootMargin = header.getBoundingClientRect().height + 'px';

function toTopButtonToggle(entries) {
    const [entry] = entries;
    if(entry.isIntersecting) toTop.classList.remove('active');
    else toTop.classList.add('active');
}

const toTopObsOptions = {
    root: null,
    threshold: 0,
    rootMargin: rootMargin
}

const toTopObserver = new IntersectionObserver(toTopButtonToggle, toTopObsOptions);
toTopObserver.observe(header);

toTop.addEventListener('click', function(){
    header.scrollIntoView({ behavior: 'smooth' });
})

// -----------------------
// ** EVENT SECTION ANIMATION
const eventSection = document.getElementById('event');
const eventImg = document.querySelector('.event__img');
const eventCta = document.querySelector('.event__cta');

function revealEventSection(entries) {
    const [entry] = entries;
    if(entry.isIntersecting) {
        eventImg.classList.add('active');
        eventCta.classList.add('active');
    }
}

const eventObsOptions = {
    root: null,
    threshold: 0.2
}

if(eventSection) {
    const eventObserver = new IntersectionObserver(revealEventSection, eventObsOptions);
    eventObserver.observe(eventSection);
}

// ----------------------------------------------------------
// ** RECIPE RENDER

const API_URL = 'https://www.themealdb.com/api/json/v1/1';
const PARAMS = {
    id: '/lookup.php?i='
}
const RECENTLY_RECIPE_IDS = ["53063", "53057", "53031", "52917", "52887", "52882", "52903", "52952", "52877", "52780"];
const TAB_COLORS = ["orange", "green", "blue", "purple", "pink"];
const LOADING_HTML = `<div class="loading"> <img src="images/food_loader.gif" alt="Loading"/><span>Loading...</span></div>`;

const state = {
    singleRecipe: "",
    recentRecipes: []
};

const createIngredientsArray = function(recipe) {
    return Object.keys(recipe)
    .filter(key => key.startsWith("strIngredient") && recipe[key] !== "")
    .map((ingredient, index) => ({strIngredient: recipe[ingredient], strMeasure: recipe[`strMeasure${index + 1}`]}))
}
 
const getRecipe = async function(param, query, generateFunction) {
    try {
        const response = await fetch(`${API_URL}${param}${query}`);
        const data = await response.json();
        state.singleRecipe = data.meals[0];
        generateFunction(state.singleRecipe);
    } catch(err) {
        console.log(err);
    }
}

const generateRecipeItemsHtml = function(recipes, bookMarkPlace, titleSize) {
    
    const recipeItemsHtml = recipes.map(recipe => {
        const ingredientArray = createIngredientsArray(recipe);

        // RECIPE TAG
        const recipeTags = recipe.strTags ? recipe.strTags.split(",") : null;
        const recipeTagsHtml = recipeTags ? recipeTags.map((tag, index) => 
            `<span class="recipe__tag recipe__tag--${TAB_COLORS[index]}">${tag}</span>`
        ).join("") : "";

        return `
            <div class="recipe__item swiper-slide">
                <a class="recipe__link" href="recipe.html">
                    <div class="recipe__thumb">
                        <div class="recipe__img">
                            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
                        </div>
                        <button class="recipe__action--${bookMarkPlace} recipe__action">
                            <svg class="icon icon-dark">
                            <use xlink:href="images/iconsprite.svg#bookmark"></use>
                            </svg>
                        </button>
                    </div>
                    <h3 class="recipe__title recipe__title--${titleSize}">${recipe.strMeal}</h3>
                </a>
                <div class="recipe__body">
                    <div class="recipe__info">
                        <div class="recipe__ingre">
                            <span class="recipe__ingre-count">${ingredientArray.length}</span>
                            <span>Ingredient</span>
                        </div>
                        <div class="recipe__tags">
                            ${recipeTagsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("");

    return `${recipeItemsHtml}`
}

// ** RECENT RECIPE
const recentRecipesContainer = document.querySelector("#recently-update .recipe-container");

const loadRecentRecipes = function() {
    recentRecipesContainer.insertAdjacentHTML("afterbegin", LOADING_HTML);
    recentRecipesContainer.querySelector(".recipe__wrapper").style.opacity = "0";
    recentRecipesContainer.querySelector(".recipe__wrapper").style.height = "0";

    const getRecentRecipes = async function() {
        try {
            RECENTLY_RECIPE_IDS.forEach(id => {
                const response = await fetch(`${API_URL}${PARAMS.id}${id}`);
                const data = await response.json();
                state.recentRecipes = [...state.recentRecipes, data.meals[0]];
            })

            console.log(state.recentRecipes);
            
        } catch(err) {
            console.log(err);
        }
    }

    getRecentRecipes()
}

if(recentRecipesContainer) loadRecentRecipes();

// ** RECIPE SINGAL PAGE: Get recipe by ID
const recipeSingleContainer = document.querySelector(".recipe-single-container");

const generateSingleRecipeHtml = function(recipe) {
    // RECIPE TAG
    const recipeTags = recipe.strTags ? recipe.strTags.split(",") : null;
    const recipeTagsHtml = recipeTags ? recipeTags.map((tag, index) => 
        `<span class="recipe__details-tag recipe__details-tag--${TAB_COLORS[index]}">${tag}</span>`
    ).join("") : "";

    // RECIPE INGREDIENTS
    const recipeIngredients = createIngredientsArray(recipe);
    const recipeIngredientsHtml = recipeIngredients.map(ingredient => {
        return `
            <li class="recipe__ingre-item">
                <div class="recipe__ingre-name">${ingredient.strIngredient}</div>
                <div class="recipe__ingre-line"></div>
                <div class="recipe__ingre-quantity">${ingredient.strMeasure}</div>
            </li>
        `
    }).join("");

    const recipeHeaderHtml = `
        <div class="recipe__header">
            <div class="recipe__img-wrapper">
                <div class="recipe__img">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
                </div>
            </div>
            <div class="recipe__details-wrapper">
                <div class="recipe__details">
                    ${recipe.strYoutube ? 
                        `<a class="btn recipe__watch" href="${recipe.strYoutube}">
                            <svg class="icon icon-black">
                            <use xlink:href="images/iconsprite.svg#watch"></use>
                            </svg>
                            <span>Watch</span>
                        </a>` : ""
                    }
                    <div class="recipe__headline">
                        <h1 class="recipe__name">${recipe.strMeal}</h1>
                        <div class="recipe__divider"></div>
                        <div class="recipe__details-tags">
                        ${recipeTagsHtml}
                        </div>
                    </div>
                </div>
                <div class="recipe__summary">
                <div class="recipe__brief">
                    <img src="./images/clock.svg" alt="Clock" />
                    <div class="recipe__text">20 min</div>
                </div>
                <div class="recipe__brief">
                    <img src="./images/harvest.svg" alt="Ingredient" />
                    <div class="recipe__text">8 ingredients</div>
                </div>
                <div class="recipe__brief">
                    <img src="./images/cooking.svg" alt="Level" />
                    <div class="recipe__text">Easy</div>
                </div>
                </div>
                <div class="recipe__category">
                ${recipe.strCategory ? `<span>${recipe.strCategory}</span>` : ""}
                </div>
            </div>
        </div>
    `;
    const repiceMainHtml = `
        <div class="recipe__main">
            <div class="recipe__ingredients">
                <div class="recipe__sub-heading">Ingredients </div>
                <div class="recipe__amount">
                    <svg class="icon icon-black icon-medium">
                        <use xlink:href="images/iconsprite.svg#dish"></use>
                    </svg>
                    <div class="recipe__server">
                        <div class="recipe__server-til">Servering</div>
                        <div class="recipe__server-form">
                            <button>-</button>
                            <input type="number" id="quantity" value="1" />
                            <button>+</button>
                        </div>
                    </div>
                </div>
                <ul class="recipe__ingre-list">
                    ${recipeIngredientsHtml}
                </ul>
            </div>
            <div class="recipe__process">
                <div class="recipe__sub-heading">Process</div>
                <p class="recipe__steps">
                    ${recipe.strInstructions}
                </p>
            </div>
        </div>
    `;

    recipeSingleContainer.innerHTML = recipeHeaderHtml + repiceMainHtml;
}

const loadSingleRecipe = function() {
    recipeSingleContainer.innerHTML = LOADING_HTML;
    const recipeId = window.location.search.slice(window.location.search.indexOf("=") + 1);
    getRecipe(PARAMS.id, recipeId, generateSingleRecipeHtml);
}

if(recipeSingleContainer) loadSingleRecipe();
