const spinner = document.getElementById("spinner")

function displaySpinner() {
  spinner.style.display = "inline-block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

module.exports = {
  displaySpinner: displaySpinner,
  hideSpinner: hideSpinner
}
