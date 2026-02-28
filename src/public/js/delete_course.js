function deleteCourse(id) {
  if (!confirm("Ban co chac muon xoa anime nay?")) return;
  fetch("/courses/" + id + "/delete", { method: "DELETE" })
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      if (result.message) {
        alert("Xoa thanh cong!");
        window.location.reload();
      } else {
        alert("Loi: " + result.error);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
