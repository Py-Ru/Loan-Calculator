// SUBMIT EVENT
document
  .querySelector("#loan-form")
  .addEventListener("submit", function (event) {
    document.getElementById("result").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    event.preventDefault();
  });
document.querySelector("#clear-btn").addEventListener("click", clearInput);

// CALCULATE RESULT
function calculateResults() {
  // VARIABLES
  const $amount = document.querySelector("#amount");
  const $interest = document.querySelector("#interest");
  const $years = document.querySelector("#years");
  const $monthlyPay = document.querySelector("#monthly-payment");
  const $totalPay = document.querySelector("#total-payment");
  const $totalInterest = document.querySelector("#total-interest");
  const principal = parseFloat($amount.value);
  const calcInterest = parseFloat($interest.value) / 100 / 12;
  const calcPay = parseFloat($years.value) * 12;
  const x = Math.pow(1 + calcInterest, calcPay);
  const monthly = (principal * x * calcInterest) / (x - 1);

  if (isFinite(monthly)) {
    $monthlyPay.value = monthly.toFixed(2);
    $totalPay.value = (monthly * calcPay).toFixed(2);
    $totalInterest.value = (monthly * calcPay - principal).toFixed(2);

    document.getElementById("result").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your input.");
  }
}

function showError(error) {
  document.getElementById("result").style.display = "none";
  document.getElementById("loading").style.display = "none";
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(removeError, 3000);
}

function removeError() {
  document.querySelector(".alert").remove();
}

function clearInput() {
  const $amount = document.querySelector("#amount").value,
    $interest = document.querySelector("#interest").value,
    $years = document.querySelector("#years").value,
    $result = document.getElementById("result");

  if ($amount === "" || $interest === "" || $years === "") {
    showError("There is no input.");
  } else {
    $amount = "";
    $interest = "";
    $years = "";
    $result.remove();
  }
  // $loanFormInput.forEach((input) => {
  //   if (input.value === "") {
  //     showError("There is no input...");
  //   } else {
  //     input.value = "";
  //     $result.remove();
  //   }
  // });
}
