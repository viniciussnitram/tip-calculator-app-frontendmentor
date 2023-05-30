const bill = document.getElementById("input-bill");
const numberOfPeople = document.getElementById("input-person");
const btnReset = document.getElementById("reset");
const percentages = document.querySelectorAll(".form__input--tip");
let resultAmount = document.getElementById("result-amount");
let resultTotal = document.getElementById("result-total");

function checkNumberOfPeople() {
    const warning = document.getElementById("warning");

    if (numberOfPeople.value <= 0) {
        btnReset.setAttribute('disabled', '');
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

function calculateTip(percentageTip) {
    resultAmount.textContent = `$${((bill.value * percentageTip) / numberOfPeople.value).toFixed(2)}`;
    resultTotal.textContent = `$${((bill.value / numberOfPeople.value) + parseFloat(resultAmount.textContent.slice(1))).toFixed(2)}`;
    btnReset.removeAttribute('disabled');
}

for (let i = 0; i < percentages.length; i++) {
    const btnTip = percentages[i];
    const tip = parseInt(btnTip.value);

    btnTip.addEventListener('click', () => {
        const percentageTip = tip / 100;
        calculateTip(percentageTip);
        checkNumberOfPeople();
        if (bill.value == 0) {
            btnReset.setAttribute('disabled', '');
        }
    })
}

const tipCustomPercent = document.getElementById("input-tip-custom");

tipCustomPercent.addEventListener('focusout', e => {
    const percentageTip = parseFloat(e.target.value) / 100;
    calculateTip(percentageTip);
    checkNumberOfPeople();
})

btnReset.addEventListener('click', e => {
    bill.value = '';
    numberOfPeople.value = '';
    resultAmount.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    e.target.setAttribute('disabled', '');
})