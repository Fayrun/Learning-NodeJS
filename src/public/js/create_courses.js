var form = document.getElementById("create-form");
var submitBtn = document.getElementById("submit-btn");
var toast = document.getElementById("toast");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Phải nằm TRONG này để đọc đúng lúc user submit
  var checked = document.querySelectorAll(".genre-check:checked");
  var Genre = Array.from(checked).map(function (el) {
    return el.value;
  });

  if (Genre.length === 0) {
    toast.className = "alert alert-warning";
    toast.textContent = "Vui long chon it nhat 1 the loai!";
    toast.classList.remove("d-none");
    toast.scrollIntoView({ behavior: "smooth" });
    return; // return ở đây mới đúng, chặn submit khi chưa chọn genre
  }

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
    status: document.getElementById("status").value,
    country: document.getElementById("country").value.trim(),
    studio: document.getElementById("studio").value.trim(),
    duration: parseInt(document.getElementById("duration").value),
    warning: document.getElementById("warning").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Dang tao...";

  try {
    var response = await fetch("/courses/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    var result = await response.json();

    if (response.ok) {
      toast.className = "alert alert-success";
      toast.textContent = "Tao anime thanh cong!";
      toast.classList.remove("d-none");
      toast.scrollIntoView({ behavior: "smooth" });
      form.reset();
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
    submitBtn.textContent = "Create Anime";
  }
});
