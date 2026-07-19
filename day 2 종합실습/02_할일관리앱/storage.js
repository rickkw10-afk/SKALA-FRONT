// ===== 데이터 담당 모듈 (storage.js) =====
// 할 일 목록을 localStorage 에 저장/불러오기 하고, 배열 상태를 바꾸는 함수들을 export 한다.
// 화면(DOM)은 전혀 건드리지 않고 '데이터'만 다룬다.

const KEY = "todomate.items";

// localStorage 에서 할 일 배열을 불러온다 (없으면 빈 배열).
export function loadTodos() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    // 저장된 값이 깨졌을 때를 대비한 방어 코드
    return [];
  }
}

// 배열을 JSON 문자열로 바꿔 localStorage 에 저장한다.
function save(todos) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}

// 새 할 일 추가 → 할 일 하나는 { id, text, done } 객체로 관리한다.
export function addTodo(todos, text) {
  const item = { id: Date.now(), text: text, done: false };
  const next = [...todos, item]; // spread 로 새 배열을 만들어 추가
  save(next);
  return next;
}

// 완료 상태 토글 (map 으로 해당 id 항목만 done 값을 뒤집는다).
export function toggleTodo(todos, id) {
  const next = todos.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  save(next);
  return next;
}

// 한 개 삭제 (filter 로 해당 id 만 빼낸다).
export function removeTodo(todos, id) {
  const next = todos.filter((item) => item.id !== id);
  save(next);
  return next;
}

// 완료된 항목 모두 삭제.
export function clearCompleted(todos) {
  const next = todos.filter((item) => !item.done);
  save(next);
  return next;
}

// 필터 조건에 맞는 항목만 골라 돌려준다: "all" | "active" | "done"
export function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter((item) => !item.done);
  if (filter === "done") return todos.filter((item) => item.done);
  return todos;
}
