// ===== 문구 갤러리 동작 (script.js) =====

// 1) 다크모드 토글
//    body 에 .dark 클래스를 켜고 끄면 CSS 변수 값이 바뀌어 전체 테마가 전환된다.
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️ 라이트모드" : "🌙 다크모드";
});

// 2) 카테고리 필터
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const homeLink = document.getElementById("homeLink");

// 모든 카드 보이기 + '전체' 메뉴만 강조
function showAll() {
  filters.forEach((f) => f.classList.remove("active"));
  cards.forEach((card) => card.classList.remove("is-hidden"));
  document.querySelector('[data-filter="all"]').classList.add("active");
}

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.preventDefault();
    const type = filter.dataset.filter;

    if (type === "all") {
      showAll();
      return;
    }

    // 클릭한 메뉴만 강조
    filters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");

    // 카테고리가 다른 카드는 숨긴다
    cards.forEach((card) => {
      const match = card.dataset.category === type;
      card.classList.toggle("is-hidden", !match);
    });
  });
});

// 3) 로고 클릭 시 필터 초기화 + 맨 위로 이동
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  showAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 첫 화면에서는 전체 보기 상태로 시작
showAll();
