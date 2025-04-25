function calculatePercentChange() {
   const numberInput = document.querySelector("#percentChange #wholeInput")
   const percentInput = document.querySelector("#percentChange #percentInput")
   const dropdown = document.querySelector("#percentChange #dropdown")
   const backgroundElement = document.querySelector("#percentChange .background")

   let number = parseFloat(numberInput.value)
   let percent = parseFloat(percentInput.value)
   let result = 0

   if (dropdown.value == "increased") {
      result = number * (percent / 100 + 1)
   } else if (dropdown.value == "decreased") {
      result = number * (1 - percent / 100)
   }
   console.log(result)

   if (document.querySelector("#percentChange .result")) {
      document.querySelector("#percentChange .result").remove()
   }

   if (isNaN(number) || isNaN(percent)) return

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (isNaN(result)) {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>.`
   } else {
      resultElement.innerHTML = `Answer: ${resultConditioner(number)} ${dropdown.value} by ${resultConditioner(
         percent
      )}% is <strong>${resultConditioner(result)}</strong>.`
   }
   backgroundElement.appendChild(resultElement)
}

function resultConditioner(number) {
   //Intelligent rounding. Results with only decimal component need sig figs,
   //results greater than 1 do not
   if (number < 1 && number > -1) {
      number = numberWithCommas(+number.toPrecision(2))
   } else {
      number = numberWithCommas(+number.toFixed(2))
   }
   return number
}

function numberWithCommas(number) {
   //taken from SO. Worked better than .toLocaleString()
   return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}
