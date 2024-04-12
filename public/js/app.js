console.log("Client side Javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// Challenge: Use input value to get weather
// Challenge: Render content to paragraph
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading ...";
  const location = search.value;
  fetch(`http://localhost:3000/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      }
      // console.log({
      //   location: data.location,
      //   forecast: data.forecast
      // });
      else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
