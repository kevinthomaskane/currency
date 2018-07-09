$(".btn").on("click", () => {
  $.post("/currency", {
    startDate: $("#startDate").val(),
    numberOfDays: $("#numberOfDays").val()
  }).then(res => {
    $("#append-to-me").text("");
    $("#startDate").val("");
    $("#numberOfDays").val("");
    $("#append-to-me").append(res);
  });
});
