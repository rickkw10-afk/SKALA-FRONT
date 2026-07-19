// ===== 결과 페이지 (result.js) =====
// 회원가입 폼이 method=get 으로 넘긴 URL 쿼리스트링을 읽어 표로 그린다.

// URLSearchParams: ?userId=abc&stack=백엔드&stack=디자인 같은 쿼리를 편하게 읽게 해준다.
const params = new URLSearchParams(location.search);

// 관심 분야는 checkbox 복수 선택 → getAll 로 배열 전체를 가져온다.
const stacks = params.getAll("stack");
const stackText = stacks.length > 0 ? stacks.join(", ") : "없음";

// 비밀번호는 그대로 노출하지 않고 길이만큼 ● 로 가린다.
const rawPw = params.get("userPw") || "";
const maskedPw = rawPw ? "●".repeat(rawPw.length) : "-";

// 표에 그릴 [항목, 값] 목록
const rows = [
  ["아이디", params.get("userId")],
  ["비밀번호", maskedPw],
  ["이름", params.get("userName")],
  ["이메일", params.get("userEmail")],
  ["전화번호", params.get("userPhone")],
  ["생년월일", params.get("userBirth")],
  ["성별", params.get("gender")],
  ["지역", params.get("region")],
  ["관심 분야", stackText],
  ["한 줄 소개", params.get("bio")],
];

// tbody 에 각 행(tr)을 만들어 붙인다.
const tbody = document.getElementById("resultBody");

rows.forEach(([label, value]) => {
  const tr = document.createElement("tr");
  // 값이 비어 있으면 '-' 로 표시
  tr.innerHTML = `<th>${label}</th><td>${value ? value : "-"}</td>`;
  tbody.appendChild(tr);
});
