const searchForm = document.querySelector(".search-form");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = searchForm
      .querySelector('input[name="q"]')
      .value.trim()
      .toLowerCase();

    if (keyword === "") {
      alert("検索キーワードを入力してください");
      return;
    }

    window.location.href =
      "cases.html?q=" + encodeURIComponent(keyword);
  });
}

const params = new URLSearchParams(window.location.search);
const keyword = params.get("q");

if (keyword) {
  const cards = document.querySelectorAll(".case-card");
  const searchKeyword = keyword.toLowerCase();

  let found = 0;

  cards.forEach(function (card) {
    const text = (
      card.innerText + " " + (card.dataset.search || "")
    ).toLowerCase();

    if (text.includes(searchKeyword)) {
      card.style.display = "";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  const message = document.createElement("p");
  message.textContent =
    found > 0
      ? `「${keyword}」の検索結果：${found}件`
      : `「${keyword}」に一致する修理事例はありません。`;

  const main = document.querySelector("main");
  if (main) {
    main.insertBefore(message, main.children[2] || null);
  }
}