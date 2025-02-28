document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.querySelector(".bill-value");
  const tipButtons = document.querySelectorAll(".tip-btn");
  const customInput = document.querySelector(".custom");
  const people = document.querySelector(".people");
  const tipPriceDisplay = document.querySelector(".tip-price");
  const totalPriceDisplay = document.querySelector(".total-price");
  const resetButton = document.querySelector(".reset");

  let tipPercentage = 0;
  let bill = 0;
  let numberOfPeople = 0;

  billInput.addEventListener("input", () => {
    if (
      billInput.value.startsWith("0") &&
      billInput.value.length > 1 &&
      billInput.value[1] !== "."
    ) {
      billInput.value = billInput.value.slice(1);
    }

    bill = parseFloat(billInput.value);

    if (bill === 0) {
      document.querySelector(".bill-error-message").innerHTML = `Can't be zero`;
      billInput.classList.add("bill-input");
    } else if (bill < 0) {
      document.querySelector(".bill-error-message").innerHTML =
        "Not a valid number";
      billInput.classList.add("bill-input");
    } else {
      document.querySelector(".bill-error-message").innerHTML = "";
      billInput.classList.remove("bill-input");
    }

    calculateTip();
  });

  people.addEventListener("input", () => {
    if (people.value.startsWith("0") && people.value.length > 1) {
      people.value = people.value.slice(1);
    }

    numberOfPeople = parseFloat(people.value);

    if (numberOfPeople === 0) {
      document.querySelector(".error-message").innerHTML = `Can't be zero`;
      people.classList.add("people-input");
    } else if (numberOfPeople < 0) {
      document.querySelector(".error-message").innerHTML = "Not a valid number";
      people.classList.add("people-input");
    } else {
      document.querySelector(".error-message").innerHTML = "";
      people.classList.remove("people-input");
    }
    calculateTip();
  });

  people.addEventListener("keydown", (event) => {
    if (event.key === ".") {
      event.preventDefault();
    }
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      customInput.classList.remove("custom-input");
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      customInput.value = "";
      tipPercentage = parseFloat(button.getAttribute("data-tip"));
      calculateTip();
    });
  });

  customInput.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  });

  customInput.addEventListener("input", () => {
    customInput.classList.add("custom-input");

    if (
      customInput.value.startsWith("0") &&
      customInput.value.length > 1 &&
      customInput.value[1] !== "."
    ) {
      customInput.value = customInput.value.slice(1);
    }

    tipPercentage = parseFloat(customInput.value);

    if (tipPercentage === 0) {
      document.querySelector(".tip-error-message").innerHTML = `Can't be zero`;
      customInput.classList.add("tip-input");
    } else if (tipPercentage < 0) {
      document.querySelector(".tip-error-message").innerHTML =
        "Not a valid number";
      customInput.classList.add("tip-input");
    } else {
      document.querySelector(".tip-error-message").innerHTML = "";
      customInput.classList.remove("tip-input");
    }
    calculateTip();
  });

  function calculateTip() {
    if (bill > 0 && numberOfPeople > 0 && tipPercentage > 0) {
      const tipPrice = (bill * (tipPercentage / 100)) / numberOfPeople;
      const totalPrice = bill / numberOfPeople + tipPrice;

      tipPriceDisplay.innerHTML = `$${tipPrice.toFixed(2)}`;
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      resetButton.classList.add("active-reset");
    } else {
      resetButton.classList.remove("active-reset");
      tipPriceDisplay.textContent = "$0 . 00";
      totalPriceDisplay.textContent = "$0 . 00";
    }
  }

  resetButton.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customInput.classList.remove("custom-input");

    billInput.value = "";
    people.value = "";
    customInput.value = "";

    bill = 0;
    numberOfPeople = 0;
    tipPercentage = 0;

    document.querySelector(".bill-error-message").innerHTML = "";
    document.querySelector(".error-message").innerHTML = "";
    document.querySelector(".tip-error-message").innerHTML = "";

    people.classList.remove("people-input");
    billInput.classList.remove("bill-input");
    customInput.classList.remove("tip-input");

    tipPriceDisplay.textContent = "$0 . 00";
    totalPriceDisplay.textContent = "$0 . 00";

    resetButton.classList.remove("active-reset");
  });
});
