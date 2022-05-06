const bill = document.getElementById("bill");
const custom = document.getElementById("custom");
const Nop = document.getElementById("Nop");

const select = document.getElementById("container");
const tips = select.querySelectorAll(".select-tip");
const errorMsg = document.querySelector(".error-msg");

const amount = document.getElementById("amount");
const total = document.getElementById("total");
const reset = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
custom.addEventListener("input", setCustomValue);
Nop.addEventListener("input", setPeopleValue);
reset.addEventListener("click", resetAll);

let billValue = 0.0;
let tipValue = 0.15;
let people = 1;

function ValidateFloat(s) {
  var reg = /^[0-9]*\.?[0-9]*$/;
  return s.match(reg);
}

function ValidateInt(s) {
  var reg = /^[0-9]*$/;
  return s.match(reg);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!ValidateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);

  calcTip();

  // console.log(billValue);
}

function setCustomValue() {
  if (!ValidateInt(custom.value)) {
    custom.value = custom.value.substring(0, custom.value.length - 1);
  }

  tips.forEach((btn) => {
    custom.classList.add("active");
    btn.classList.remove("active");
  });

  tipValue = parseFloat(custom.value / 100);

  calcTip();

  // console.log(tipValue);
}

for (var i = 0; i < tips.length; i++) {
  tips[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    tipValue = parseFloat(this.value) / 100;

    calcTip();

    // console.log(tipValue);
  });
}

function setPeopleValue() {
  if (!ValidateInt(Nop.value)) {
    Nop.value = Nop.value.substring(0, Nop.value.length - 1);
  }

  if (Nop.value <= 0) {
    errorMsg.classList.add("show-error-msg");
    setTimeout(function () {
      errorMsg.classList.remove("show-error-msg");
    }, 1000);
  }

  people = parseInt(Nop.value);

  calcTip();
  // console.log(people);
}

function calcTip() {
  if (people >= 1) {
    let tipAmount = (billValue * tipValue) / people;
    let totalBill = (billValue * (tipValue + 1)) / people;
    amount.innerHTML = "$" + tipAmount.toFixed(2);
    total.innerHTML = "$" + totalBill.toFixed(2);
  }
}

function resetAll() {
  bill.value = "0.0";
  setBillValue();

  tips[2].click();

  Nop.value = "1";
  setPeopleValue();
}
