// ===== 회원가입 폼 동작 (join.js) =====

// 1) 비밀번호 보기/숨기기 토글
//    .pw__toggle 버튼마다 data-target 에 적힌 id 의 input 을 찾아 type 을 전환한다.
const toggleButtons = document.querySelectorAll(".pw__toggle");

toggleButtons.forEach((button) => {
  const target = document.getElementById(button.dataset.target);

  button.addEventListener("click", () => {
    // 현재 가려진(password) 상태면 text 로 바꿔서 보이게 한다.
    const hidden = target.type === "password";
    target.type = hidden ? "text" : "password";
    button.textContent = hidden ? "숨김" : "보기";
  });
});

// 2) 제출 시 비밀번호 일치 검증
//    브라우저 기본 검증(required·pattern 등)은 통과해도, 두 비밀번호가 같은지는 직접 확인한다.
const form = document.getElementById("signupForm");

form.addEventListener("submit", (event) => {
  const pw = document.getElementById("userPw").value;
  const pw2 = document.getElementById("userPw2").value;

  if (pw !== pw2) {
    event.preventDefault(); // 제출 중단 → result.html 로 넘어가지 않음
    alert("비밀번호가 서로 일치하지 않습니다.");
    document.getElementById("userPw2").focus();
  }
});

// 3) 다시 작성(reset) 버튼을 누르면 화면 맨 위로 스크롤
const resetButton = document.querySelector('input[type="reset"]');

resetButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
