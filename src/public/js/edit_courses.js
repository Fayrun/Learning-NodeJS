var form = document.getElementById("edit-form");
var submitBtn = document.getElementById("submit-btn");
var toast = document.getElementById("toast");

// Pre-check các genre đã có sẵn
if (currentGenres && currentGenres.length > 0) {
  document.querySelectorAll(".genre-check").forEach(function (checkbox) {
    if (currentGenres.indexOf(checkbox.value) !== -1) {
      checkbox.checked = true;
    }
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  var checked = document.querySelectorAll(".genre-check:checked");
  var Genre = Array.from(checked).map(function (el) {
    return el.value;
  });

  if (Genre.length === 0) {
    toast.className = "alert alert-warning";
    toast.textContent = "Vui long chon it nhat 1 the loai!";
    toast.classList.remove("d-none");
    toast.scrollIntoView({ behavior: "smooth" });
    return;
  }

  var courseId = document.getElementById("courseId").value;

  var formData = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    image: document.getElementById("image").value.trim(),
    videoId: document.getElementById("videoId").value.trim(),
    numberOfEpisodes: parseInt(
      document.getElementById("numberOfEpisodes").value,
    ),
    Genre: Genre,
    releaseYear: parseInt(document.getElementById("releaseYear").value),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Dang cap nhat...";

  try {
    var response = await fetch("/courses/" + courseId + "/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    var result = await response.json();

    if (response.ok) {
      toast.className = "alert alert-success";
      toast.textContent = "Cap nhat thanh cong!";
      toast.classList.remove("d-none");
      toast.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.className = "alert alert-danger";
      toast.textContent = "Loi: " + result.error;
      toast.classList.remove("d-none");
      toast.scrollIntoView({ behavior: "smooth" });
    }
  } catch (err) {
    toast.className = "alert alert-danger";
    toast.textContent = "Co loi xay ra!";
    toast.classList.remove("d-none");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Cap nhat Anime";
  }
});
