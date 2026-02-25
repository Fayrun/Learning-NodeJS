var form = document.getElementById("create-form");
var submitBtn = document.getElementById("submit-btn");
var toast = document.getElementById("toast");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  var formData = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    image: document.getElementById("image").value.trim(),
    videoId: document.getElementById("videoId").value.trim(),
    Genre: document.getElementById("Genre").value,
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
