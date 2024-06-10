const API_key = "90ed1012-b980-4434-9f47-200245f69049";
const baseUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films";
const API_best =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_search = `${baseUrl}/search-by-keyword?keyword=`;
const API_expected = `${baseUrl}/top?type=TOP_AWAIT_FILMS`;
const API_current_month =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JULY";
const API_upcoming = `${baseUrl}/releases?year=2024&month=MAY`;
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
///// Current Movies
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
  const main = document.querySelector(".movies"); // Assuming you have a <main> element to display movies
  document.querySelector(".movies").innerHTML = "";
  const movies = data.items || data.films || data.releases || "No movies found";
  console.log(main);
  movies.forEach((movie) => {
    const { nameRu, posterUrl, rating } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <div class = "movie__cover-inner"><img src="${posterUrl}" alt="${nameRu}" class="movie__cover">
      <div class="movie__cover--darkened"></div></div>
      <div class="movie-info">
        <h3 class="movie__title">${nameRu}</h3>
        <div class = "movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}
      </div>
      <div class="heart" data-id="${movie.filmId}">&hearts;</div>
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
      }</div>
    `;
    main.appendChild(movieEl);
  });
  // Add event listeners to hearts for favorites
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      const movieId = heart.getAttribute("data-id");
      toggleFavorite(movieId);
      heart.classList.toggle("liked");
    });
  });
}
///// Favourites movies
const btn_fav = document.getElementById("heart");
function setLikedMovies(likedMovies) {
  localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
}
function toggleFavorite(movieId) {
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
  if (likedMovies.includes(movieId)) {
    const index = likedMovies.indexOf(movieId);
    likedMovies.splice(index, 1);
    console.log(movieId);
  } else {
    likedMovies.push(movieId);
  }
  setLikedMovies(likedMovies);
}
// On page load, mark liked movies
document.addEventListener("DOMContentLoaded", () => {
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];

  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    if (likedMovies.includes(heart.getAttribute("data-id"))) {
      heart.classList.add("liked");
    }
  });
});

// const API_key = "90ed1012-b980-4434-9f47-200245f69049";
// const baseUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films";
// const API_best =
//   "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";

// const API_search = `${baseUrl}/search-by-keyword?keyword=`;

// const API_expected = `${baseUrl}/top?type=TOP_AWAIT_FILMS`;

// const API_current_month =
//   "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JULY";

// const API_upcoming = `${baseUrl}/releases?year=2024&month=MAY`;

// ////// Default page

// getMovies(API_best);

// //////// Search input

// const form = document.querySelector("form");
// const search = document.querySelector(".header__search");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const APIsearch = `${API_search}${search.value}`;
//   if (search.value) {
//     getMovies(APIsearch);
//     search.value = "";
//   } else {
//     alert("Пожалуйста введите название фильма");
//   }
// });

// ///// Best movies

// const btnBest = document.querySelector(".btn_best");

// btnBest.addEventListener("click", () => {
//   getMovies(API_best);
// });

// ///// Expected movies

// const btnExpected = document.querySelector(".btn_expected");

// btnExpected.addEventListener("click", () => {
//   getMovies(API_expected);
// });

// /////Current Movies

// const currentBtn = document.querySelector(".btn_current_month");
// currentBtn.addEventListener("click", () => {
//   getMovies(API_current_month);
// });

// ////// Upcoming movies

// const upcomingBtn = document.querySelector(".btn_upcoming_movies");
// upcomingBtn.addEventListener("click", () => {
//   getMovies(API_upcoming);
// });

// ////// Get movies main function

// async function getMovies(url) {
//   try {
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-KEY": API_key,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const respData = await response.json();
//     console.log(respData);
//     showMovies(respData);
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//   }
// }

// ///// Movie rating

// function getClassByRate(vote) {
//   if (vote >= 7) {
//     return "green";
//   } else if (vote > 5) {
//     return "orange";
//   } else if (vote < 5) {
//     return "red";
//   } else if (vote === 3.5) {
//     return "blue";
//   }
// }

// //// Display Movies

// function showMovies(data) {
//   const moviesEl = document.querySelector(".movies");

//   document.querySelector(".movies").innerHTML = "";

//   const movies = data.items || data.films || data.releases || "No movies found";

//   localStorage.setItem("movies", JSON.stringify(movies));

//   movies.forEach((movie) => {
//     const movieEl = document.createElement("div");
//     movieEl.classList.add("movie");
//     movieEl.setAttribute("id", movie.filmId || movie.kinopoiskId);
//     movieEl.innerHTML = `
//         <div class="movie__cover-inner">
//         <img
//           src="${movie.posterUrlPreview}"
//           class="movie__cover"
//           alt="${movie.nameRu}"
//         />
//         <div class="movie__cover--darkened"></div>
//       </div>
//       <div class="movie__info">
//         <div class="movie__title">${movie.nameRu}</div>
//         <div class="movie__category">${movie.genres.map(
//           (genre) => ` ${genre.genre}`
//         )}</div> <button class="heart liked" id="heart"></button>
//         ${
//           (movie.ratingImdb &&
//             `
//         <div class="movie__average movie__average--${getClassByRate(
//           movie.ratingImdb
//         )}">${movie.ratingImdb || movie.Kinopoisk}</div>
//         `) ||
//           `<div class="movie__average blue movie__average--${getClassByRate(
//             0
//           )}">3.5</div>`
//         }
//       </div>
//         `;
//     moviesEl.appendChild(movieEl);
//   });
// }

// // const btn_fav = document.getElementById("heart");

// // function setLikedMovies(likedMovies) {
// //   localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
// // }
// // function getLikedMovies() {
// //   return JSON.parse(localStorage.getItem("likedMovies")) || [];
// // }

// // function toggleFavorite(movieId) {
// //   const likedMovies = getLikedMovies();
// //   if (likedMovies.includes(movieId)) {
// //     const index = likedMovies.indexOf(movieId);
// //     likedMovies.splice(index, 1);
// //   } else {
// //     likedMovies.push(movieId);
// //   }
// //   setLikedMovies(likedMovies);
// // }

// // // On page load, mark

// // document.addEventListener("DOMContentLoaded", () => {
// //   const likedMovies = getLikedMovies();
// //   const hearts = document.querySelectorAll(".heart");
// //   hearts.forEach((heart) => {
// //     if (likedMovies.includes(heart.getAttribute("data-id"))) {
// //       heart.classList.add("liked");
// //     }
// //   });
// // });
