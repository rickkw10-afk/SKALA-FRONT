// ===== 화면 담당 모듈 (app.js) =====
// storage.js(데이터)에서 함수를 import 해서 화면을 그리고, 사용자 이벤트를 처리한다.
import {
  loadTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
  filterTodos,
} from "./storage.js";

// 화면 요소 모으기
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const filters = document.getElementById("filters");
const clearBtn = document.getElementById("clearBtn");
const quoteEl = document.getElementById("quote");
const countAll = document.getElementById("countAll");
const countActive = document.getElementById("countActive");
const countDone = document.getElementById("countDone");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

// 앱 상태: 할 일 배열 + 현재 필터
let todos = loadTodos();
let currentFilter = "all";

// 입력값에 위험한 HTML 이 들어가지 않도록 안전 처리
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 배열 상태 → 화면을 다시 그리는 핵심 함수
function render() {
  const visible = filterTodos(todos, currentFilter);

  list.innerHTML = "";

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "표시할 할 일이 없어요.";
    list.appendChild(empty);
  } else {
    visible.forEach((item) => {
      const li = document.createElement("li");
      li.className = "todo" + (item.done ? " done" : "");
      li.dataset.id = item.id; // 이벤트 위임에서 어떤 항목인지 식별하는 값
      li.innerHTML = `
        <input type="checkbox" ${item.done ? "checked" : ""}>
        <span class="todo__text">${escapeHtml(item.text)}</span>
        <button class="todo__del" type="button" aria-label="삭제">✕</button>
      `;
      list.appendChild(li);
    });
  }

  // 하단 요약(개수) 갱신
  const total = todos.length;
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = total - doneCount;

  countAll.textContent = total;
  countActive.textContent = activeCount;
  countDone.textContent = doneCount;

  // 진행률 계산
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  progressBar.style.width = percent + "%";
  progressPercent.textContent = percent + "%";

  // 완료 항목이 있을 때만 '완료 항목 지우기' 버튼 노출
  clearBtn.hidden = doneCount === 0;
}

// 할 일 추가 (Enter 또는 추가 버튼 → submit)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return; // 빈 값 방지

  todos = addTodo(todos, text);
  input.value = "";
  render();
});

// 이벤트 위임: ul 하나에만 리스너를 달아 체크박스/삭제 버튼을 모두 처리
list.addEventListener("click", (e) => {
  const li = e.target.closest(".todo");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.matches('input[type="checkbox"]')) {
    todos = toggleTodo(todos, id); // 완료 토글
    render();
  } else if (e.target.closest(".todo__del")) {
    todos = removeTodo(todos, id); // 삭제
    render();
  }
});

// 필터 버튼 처리
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;

  currentFilter = btn.dataset.filter;
  filters
    .querySelectorAll(".filter")
    .forEach((b) => b.classList.toggle("is-active", b === btn));
  render();
});

// 완료 항목 모두 지우기
clearBtn.addEventListener("click", () => {
  todos = clearCompleted(todos);
  render();
});

// 오늘의 한마디: async/await + fetch, 실패하면 기본 문구로 대체
async function loadQuote() {
  const fallback = "작은 한 걸음이 모여 큰 변화를 만듭니다. 🌱";
  try {
    const res = await fetch("https://korean-advice-open-api.vercel.app/api/advice");
    if (!res.ok) throw new Error("응답 오류");
    const data = await res.json();
    quoteEl.textContent = `"${data.message}" — ${data.author}`;
  } catch {
    // 인터넷 차단·오류 시에도 앱은 정상 동작
    quoteEl.textContent = fallback;
  }
}

// 시작할 때 한 번 실행
loadQuote();
render();
