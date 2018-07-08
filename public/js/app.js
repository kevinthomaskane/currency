$(".btn").on("click", () => {
  $.post("/currency", {startDate: $("#startDate").val(), numberOfDays: $("#numberOfDays").val()}).then((res) => {
    $("#append-to-me").append(res)
    $("#startDate").val("")
    $("#numberOfDays").val("")
  })
})