// ===== 부산 여행지 페이지 동작 (script.js) =====

// 1) 히어로 배경 이미지 자동 전환
//    두 개의 레이어(heroBg1, heroBg2)를 번갈아 보여주며 부드럽게 크로스페이드한다.
const heroImages = ["media/hero1.jpg", "media/hero2.jpg", "media/hero3.jpg"];
const layers = [
  document.getElementById("heroBg1"),
  document.getElementById("heroBg2"),
];

let current = 0; // 지금 화면에 보이는 레이어 (0 또는 1)
let index = 0;   // 다음에 보여줄 이미지 순서

// 첫 화면 배경 지정
layers[0].style.backgroundImage = `url(${heroImages[0]})`;

function changeBackground() {
  index = (index + 1) % heroImages.length;   // 다음 이미지 순서
  const next = layers[1 - current];          // 지금 안 보이는 레이어

  next.style.backgroundImage = `url(${heroImages[index]})`;
  next.classList.add("is-active");           // 새 레이어를 서서히 나타냄
  layers[current].classList.remove("is-active");
  current = 1 - current;                     // 보이는 레이어 교체
}

// 4초마다 배경 전환
setInterval(changeBackground, 4000);

// 2) 현재 스크롤 위치에 맞춰 내비게이션 메뉴 강조
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav__menu a");

function highlightMenu() {
  const scrollPos = window.scrollY + 120; // 고정 헤더 높이를 감안한 보정값

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href="#${id}"]`);
    if (!link) return;

    // 현재 보고 있는 섹션의 메뉴만 active 표시
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightMenu);

// 3) '맨 위로' 버튼: 클릭 시 화면 최상단으로 부드럽게 이동
const toTop = document.getElementById("toTop");

toTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
