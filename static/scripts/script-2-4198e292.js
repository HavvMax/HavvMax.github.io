
(function () {
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function tick() {
    var els = document.querySelectorAll(".sidebar-clock");
    if (!els.length) return;
    var now = new Date();
    var time = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    var week = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
    var date = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日 · 星期" + week;
    els.forEach(function (el) {
      var t = el.querySelector(".clock-time");
      var d = el.querySelector(".clock-date");
      if (t) t.textContent = time;
      if (d) d.textContent = date;
    });
  }
  tick();
  // 每秒刷新；SPA 切换页面后元素会重建，这里每次都重新查询
  setInterval(tick, 1000);
})();
