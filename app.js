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

//-------------------------------------Trending---------------------

// getiing bitcoin price to convert to USD
let change;

function btcUsd() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  )
    .then((res) => res.json())
    .then((coin) => {
      change = coin.bitcoin.usd;
    });
}

btcUsd();

setTimeout(() => {
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
            <span class="card-price">$${(e.item.price_btc * change)
              .toFixed(2)
              .toLocaleString()}</span>
          </div>
        </a>
      `;

        trending.appendChild(card);
      })
    );
}, 1000);

//--------------------------------------Search------------------------------------

const search = document.querySelector(".search");
const searchBox = document.querySelector(".search-input");
const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".search-container");
const closeSearch = document.querySelector(".close-seach");
const layer = document.querySelector(".layer");
const tbodySearch = document.querySelector(".search-tbody");

search.addEventListener("click", function () {
  search.classList.toggle("active");
  searchBox.classList.toggle("active");
});

searchInput.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target[0].value === "") {
    alert("Search can't be empty");
  } else {
    searchContainer.classList.add("active");
    layer.classList.add("active");
    searchFetch(e.target[0].value);
    e.target[0].value = "";
  }
});

closeSearch.addEventListener("click", function () {
  searchContainer.classList.remove("active");
  layer.classList.remove("active");
  tbodySearch.innerHTML = "";
});

layer.addEventListener("click", function () {
  searchContainer.classList.remove("active");
  layer.classList.remove("active");
  tbodySearch.innerHTML = "";
});

function searchFetch(query) {
  fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
    .then((res) => res.json())
    .then((data) =>
      data.coins.forEach((coin) => {
        const coinSearch = document.createElement("tr");
        coinSearch.classList.add("search-item");
        coinSearch.classList.add("glow");
        coinSearch.innerHTML = `
        <th><i class="star fa-solid fa-star"></i></th>
              <td class="top mobile-delete">${
                coin.market_cap_rank ? coin.market_cap_rank : "N/A"
              }</td>
              <th class="name name-coin">
                <span><img src=${coin.thumb} alt=""></span>
                ${coin.name}
              </th>
              <td class="price">N/A</td>
              <td class="h24 mobile-delete">N/A</td>
            </tr>
        `;
        tbodySearch.appendChild(coinSearch);
      })
    );
}

//-----------------------------Watchlist Star-----------------------
const Watchprice = document.querySelector(".card-price");
fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
)
  .then((res) => res.json())
  .then((coin) => {
    Watchprice.innerText = coin.bitcoin.usd;
  });
//
//

//-----------------------------Show qty-----------------------

generateCoins();

const inputShow = document.querySelector(".show");

inputShow.addEventListener("input", function (e) {
  showNum = inputShow.value;
  tableContainer.innerHTML = "";
  generateCoins();
});
