
(function () {
  const tls = document.querySelectorAll(".timeline");
  if (!tls.length) return;
  const tlRef = document.querySelector(".timeline");
  const sidebar = document.querySelector(".sidebar.left");

  // 移动端：把时间线作为「>发布记录」树项注入探索侧栏的 .explorer-ul
  function injectTimeline() {
    const ul = document.querySelector(".explorer-ul");
    if (!ul || !tlRef || ul.contains(tlRef)) return;
    const li = document.createElement("li");
    li.className = "timeline-tree-item";
    li.appendChild(tlRef);
    const end = ul.querySelector(".overflow-end");
    ul.insertBefore(li, end || null);
  }
  // 桌面端：把时间线移回侧栏末尾（探索组件之后），恢复独立栏目
  function moveBackToSidebar() {
    if (sidebar && tlRef && !sidebar.contains(tlRef)) {
      sidebar.appendChild(tlRef);
    }
  }
  function applyLayout() {
    if (window.innerWidth > 800) {
      // 桌面端：独立栏目 + 默认展开
      tls.forEach(function (t) { t.open = true; });
      moveBackToSidebar();
    } else {
      injectTimeline();
    }
  }
  function start() {
    const ul = document.querySelector(".explorer-ul");
    applyLayout();
    if (ul) {
      // 自愈：探索树重渲染（innerHTML 替换会清掉我们插入的项）后按当前宽度重排。
      // 必须走 applyLayout 而不是直接 injectTimeline——否则桌面端也会被误注入进树里。
      new MutationObserver(function () { applyLayout(); }).observe(ul, { childList: true });
    }
    window.addEventListener("resize", applyLayout);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
