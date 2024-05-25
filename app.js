const API = "90ed1012-b980-4434-9f47-200245f69049";
const API_popular =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";

getPopular(API_popular);
async function getPopular(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API,
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  showPopular(responseData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showPopular(data) {
  const moviesEl = document.querySelector(".movies");
  data.items.forEach((movie) => {
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
        )}</div>
        ${
          movie.ratingKinopoisk &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          movie.ratingKinopoisk
        )}">${movie.ratingKinopoisk}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}
