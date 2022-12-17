// ----------------------------------------------------------------------------

let showNum = "10";

const trendingUrl = "https://api.coingecko.com/api/v3/search/trending";

const tableContainer = document.querySelector(".tbody");

function generateCoins() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${showNum}&page=1&sparkline=true`
  )
    .then((res) => res.json())
    .then((data) =>
      data.forEach((coin) => {
        usdBtn = coin.current_price.toLocaleString();
        const table = document.createElement("tr");
        table.classList.add("title");
        table.classList.add("glow");
        table.innerHTML = `
    <td class=" watchlist-item"><i class="star fa-solid fa-star"></i></th>
    <td class="top">${coin.market_cap_rank}</th>
    <th class="name name-coin"><span><img src=${coin.image} alt=""></span>${
          coin.name
        }<span class="symbol">${coin.symbol}</span></th>
    <td class="price">$${coin.current_price.toLocaleString()}</th>
    <td class="h24">${coin.price_change_percentage_24h.toFixed(2)}%</th>
    <td class="hour">$${coin.high_24h.toLocaleString()}</th>
    <td class="d7">$${coin.low_24h.toLocaleString()}</th>
    <td class="market">${coin.market_cap.toLocaleString()}</th>`;
        tableContainer.appendChild(table);
        const h24 = document.querySelectorAll(".h24");
        h24.forEach((e) =>
          parseInt(e.innerHTML) >= 0
            ? e.classList.add("positive")
            : e.classList.add("negative")
        );
      })
    )
    .catch((err) => console.log(err));
}

fetch(trendingUrl)
  .then((res) => res.json())
  .then((data) =>
    data.coins.map((e) => {
      const trending = document.querySelector(".trending");
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("glow");
      card.innerHTML = `
        <a href="#">
          <div class="token-img">
            <img src="${e.item.large}" alt="">
          </div>
          <div class="card-data">
            <span class="card-token">${e.item.name}</span>
            <span class="card-price">${e.item.price_btc.toFixed(6)}</span>
          </div>
        </a>
      `;
      trending.appendChild(card);
    })
  );

//--------------------------------------Search------------------------------------

const search = document.querySelector(".search");
const searchBox = document.querySelector(".search-input");
const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".search-container");
const closeSeach = document.querySelector(".close-seach");
const layer = document.querySelector(".layer");

search.addEventListener("click", function () {
  search.classList.toggle("active");
  searchBox.classList.toggle("active");
});

searchInput.addEventListener("submit", function (e) {
  searchContainer.classList.add("active");
  layer.classList.add("active");
  e.target[0].value = "";
});

closeSeach.addEventListener("click", function () {
  searchContainer.classList.remove("active");
  layer.classList.remove("active");
});

layer.addEventListener("click", function () {
  searchContainer.classList.remove("active");
  layer.classList.remove("active");
});

//-----------------------------Watchlist Star-----------------------
//
//
//

//-----------------------------Show qty-----------------------

generateCoins();

const inputShow = document.querySelector(".show");

inputShow.addEventListener("input", function (e) {
  showNum = inputShow.value;
  tableContainer.innerHTML = "";
  console.log(showNum);
  generateCoins();
});
