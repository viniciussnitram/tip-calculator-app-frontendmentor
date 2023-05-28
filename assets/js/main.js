const bill = document.getElementById("input-bill");
const numberOfPeople = document.getElementById("input-person");
const btnReset = document.getElementById("reset");
const percentages = document.querySelectorAll(".form__input--tip");
let resultAmount = document.getElementById("result-amount");
let resultTotal = document.getElementById("result-total");


function checkNumberOfPeople() {
    const warning = document.getElementById("warning");

    if (numberOfPeople.value <= 0) {
        warning.textContent = 'Can\'t be zero';
        warning.classList.add("form__label--warning");
        numberOfPeople.classList.add("form__input--warning");
        resultAmount.textContent = '$0.00';
        resultTotal.textContent = '$0.00';
    } else {
        warning.textContent = '';
        warning.classList.remove("form__label--warning");
        numberOfPeople.classList.remove("form__input--warning");
    }
}

numberOfPeople.addEventListener('focusout', () => {
    const warning = document.getElementById("warning");

    if (numberOfPeople.value <= 0) {
        warning.textContent = 'Can\'t be zero';
        warning.classList.add("form__label--warning");
        numberOfPeople.classList.add("form__input--warning");
        resultAmount.textContent = '$0.00';
        resultTotal.textContent = '$0.00';
    } else {
        warning.textContent = '';
        warning.classList.remove("form__label--warning");
        numberOfPeople.classList.remove("form__input--warning");
    }
});

bill.addEventListener('focusout', e => {
    if (e.target.value == '0') {
        resultAmount.textContent = '$0.00';
        resultTotal.textContent = '$0.00';
    }
})

function calculateTip(percentageTip) {
    resultAmount.textContent = `$${((bill.value * percentageTip) / numberOfPeople.value).toFixed(2)}`;
    resultTotal.textContent = `$${((bill.value / numberOfPeople.value) + parseFloat(resultAmount.textContent.slice(1))).toFixed(2)}`;
}

for (let i = 0; i < percentages.length; i++) {
    const btnTip = percentages[i];
    const tip = parseInt(btnTip.value);

    btnTip.onclick = () => {
        const percentageTip = tip / 100;
        calculateTip(percentageTip);
        checkNumberOfPeople();
    }
}

const tipCustomPercent = document.getElementById("input-tip-custom");

tipCustomPercent.addEventListener('focusout', e => {
    const percentageTip = parseFloat(e.target.value) / 100;
    calculateTip(percentageTip);
    checkNumberOfPeople();
})

btnReset.addEventListener('click', () => {
    bill.value = '';
    numberOfPeople.value = '';
    resultAmount.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
})