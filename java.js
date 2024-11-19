document.addEventListener('DOMContentLoaded', () => {
const billInput = document.querySelector('.bill-value');
const tipButtons = document.querySelectorAll('.tip-btn');
const customInput = document.querySelector('.custom');
const people = document.querySelector('.people');
const tipPriceDisplay = document.querySelector('.tip-price');
const totalPriceDisplay = document.querySelector('.total-price');
const resetButton = document.querySelector('.reset');

let tipPercentage = 0;
let bill = 0;
let numberOfPeople = 0;

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        customInput.classList.remove('custom-input');
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        customInput.value = '';
        tipPercentage = parseFloat(button.getAttribute('data-tip'));
        calculateTip();
    });
});

customInput.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    customInput.classList.add('custom-input');
    tipPercentage = parseFloat(customInput.value);

    if (tipPercentage === 0) {
        document.querySelector('.tip-error-message').innerHTML = `Can't be zero`;
        people.classList.add('bill-input');
    } else if (tipPercentage < 0) {
        document.querySelector('.tip-error-message').innerHTML = 'Enter a number greater than 0';
        people.classList.add('bill-input');
    } else {
        document.querySelector('.tip-error-message').innerHTML = '';
        people.classList.remove('bill-input')
    }
    calculateTip();
});

billInput.addEventListener('input', () => {
    bill = parseFloat(billInput.value);

    if (bill === 0) {
        document.querySelector('.bill-error-message').innerHTML = `Can't be zero`;
        people.classList.add('bill-input');
    } else if (bill < 0) {
        document.querySelector('.bill-error-message').innerHTML = 'Enter a number greater than 0';
        people.classList.add('bill-input');
    } else {
        document.querySelector('.bill-error-message').innerHTML = '';
        people.classList.remove('bill-input')
    }

    calculateTip();
});
people.addEventListener('input', () => {
    numberOfPeople = parseInt(people.value);
    if (numberOfPeople === 0) {
        document.querySelector('.error-message').innerHTML = `Can't be zero`;
        people.classList.add('people-input');
    } else if (numberOfPeople < 0) {
        document.querySelector('.error-message').innerHTML = 'Enter a number greater than 0';
        people.classList.add('people-input');
    } else {
        document.querySelector('.error-message').innerHTML = '';
        people.classList.remove('people-input')
    }
    calculateTip();

});

function calculateTip() {
    if (bill > 0 && numberOfPeople > 0 && tipPercentage > 0) {
        const tipPrice = (bill * (tipPercentage / 100)) / numberOfPeople;
        const totalPrice = (bill / numberOfPeople) + tipPrice;

        tipPriceDisplay.innerHTML = `$${tipPrice.toFixed(2)}`;
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        resetButton.classList.add('active-reset');
        
    } else {
        resetButton.classList.remove('active-reset');
        tipPriceDisplay.textContent = '$0 . 00';
        totalPriceDisplay.textContent = '$0 . 00';
    }
};

resetButton.addEventListener('click', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    
    billInput.value = '';
    people.value = '';
    customInput.value = '';

    bill = 0;
    numberOfPeople = 0;
    tipPercentage = 0;
    
    tipPriceDisplay.textContent = '$0 . 00';
    totalPriceDisplay.textContent = '$0 . 00';

    resetButton.classList.remove('active-reset');
});
});

