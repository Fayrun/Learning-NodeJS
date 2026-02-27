document.addEventListener("DOMContentLoaded", function () {
  var yearSelect = document.getElementById("releaseYear");
  if (!yearSelect) return;
  var savedYear = parseInt(yearSelect.getAttribute("data-saved")) || 0;
  var currentYear = new Date().getFullYear();
  for (var y = currentYear; y >= 1995; y--) {
    var opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    if (y === savedYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }
});
