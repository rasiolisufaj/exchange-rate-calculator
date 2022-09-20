const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");
const swapBtnEl = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// Fetch the exchange rates and update the UI

function calculate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/77fb77a530d4802c086efffa/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rates = data.conversion_rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rates} ${currencyTwo}`;

      amountTwoEl.value = (amountOneEl.value * rates).toFixed(2);
    });
}

calculate();

currencyOneEl.addEventListener("change", calculate);
currencyTwoEl.addEventListener("change", calculate);
amountOneEl.addEventListener("input", calculate);
amountTwoEl.addEventListener("input", calculate);
swapBtnEl.addEventListener("click", () => {
  const temp = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = temp;
  calculate();
});
