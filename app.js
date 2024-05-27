const API_key = "90ed1012-b980-4434-9f47-200245f69049";
const baseUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films";
const API_best =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";

const API_search =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_expected = `${baseUrl}/top?type=TOP_AWAIT_FILMS`;

const API_current_month =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JULY";

const API_upcoming =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY";

////// Default page

getMovies(API_best);

//////// Search input

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const APIsearch = `${API_search}${search.value}`;
  if (search.value) {
    getMovies(APIsearch);
    search.value = "";
  } else {
    alert("Пожалуйста введите название фильма");
  }
});

///// Best movies

const btnBest = document.querySelector(".btn_best");

btnBest.addEventListener("click", () => {
  getMovies(API_best);
});

///// Expected movies

const btnExpected = document.querySelector(".btn_expected");

btnExpected.addEventListener("click", () => {
  getMovies(API_expected);
});

/////Current Movies

const currentBtn = document.querySelector(".btn_current_month");
currentBtn.addEventListener("click", () => {
  getMovies(API_current_month);
});

////// Upcoming movies

const upcomingBtn = document.querySelector(".btn_upcoming_movies");
upcomingBtn.addEventListener("click", () => {
  getMovies(API_upcoming);
});

////// Get movies main function

async function getMovies(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_key,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const respData = await response.json();
    console.log(respData);
    showMovies(respData);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

///// Movie rating

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else if (vote < 5) {
    return "red";
  } else if (vote === 3.5) {
    return "blue";
  }
}

//// Display Movies

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  const movies = data.items || data.films || data.releases || "No movies found";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div> <div class="heart heart-active" id="heart"></div>
        ${
          (movie.ratingImdb &&
            `
        <div class="movie__average movie__average--${getClassByRate(
          movie.ratingImdb
        )}">${movie.ratingImdb || movie.Kinopoisk}</div>
        `) ||
          `<div class="movie__average blue movie__average--${getClassByRate(
            0
          )}">3.5</div>`
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

/////Favourites movies

moviesSection.addEventListener("click", (event) => {
  if (event.target.id === "heart") {
    event.target.classList.toggle("heart-active");
    const movieElement = event.target.closest(".movie-container");

    if (event.target.classList.contains("heart-active")) {
      moviesIdArray.push(movieElement.getAttribute("movieId"));
      localStorage.setItem("id", JSON.stringify(moviesIdArray));
    } else {
      moviesIdArray = moviesIdArray.filter(
        (item) => item !== movieElement.getAttribute("movieId")
      );
      localStorage.setItem("id", JSON.stringify(moviesIdArray));
    }
  }
});

favoritesBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moviesSection.innerHTML = "";
  moviesIdArray.forEach((id) => {
    getFavorites(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`);
  });
  console.log("favorites");
});
