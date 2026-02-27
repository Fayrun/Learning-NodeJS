document.addEventListener("DOMContentLoaded", function () {
  try {
    var yearDropdown = document.getElementById("year-dropdown");
    var currentYear = new Date().getFullYear();
    for (var y = currentYear; y >= 2018; y--) {
      var li = document.createElement("li");
      li.innerHTML =
        '<a class="dropdown-item" href="/courses?year=' +
        y +
        '">Nam ' +
        y +
        "</a>";
      yearDropdown.appendChild(li);
    }
    var liOld = document.createElement("li");
    liOld.innerHTML =
      '<a class="dropdown-item" href="/courses?year=before2018">Truoc nam 2018</a>';
    yearDropdown.appendChild(liOld);
  } catch (e) {
    console.error("Header JS error:", e);
  }
});
