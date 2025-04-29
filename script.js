function calculatePercentChange() {
   const initialInput = document.querySelector("#percentChange #initialInput")
   const finalInput = document.querySelector("#percentChange #finalInput")
   const backgroundElement = document.querySelector("#percentChange .background")

   let initial = parseFloat(initialInput.value)
   let final = parseFloat(finalInput.value)
   let result = 0
   let direction = ""

   if (document.querySelector("#percentChange .result")) {
      document.querySelector("#percentChange .result").remove()
   }

   if (isNaN(initial) || isNaN(final)) return

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (final > initial) {
      direction = "increase"
      result = ((final - initial) / initial) * 100
   } else if (initial > final) {
      direction = "decrease"
      result = (final / initial - 1) * -100
   } else if (initial == final) {
      direction = "increase"
      result = 0
   }

   if (isNaN(result) || result == "Infinity") {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>`
   } else {
      resultElement.innerHTML = `Answer: ${resultConditioner(final)} is a <strong>${resultConditioner(
         result
      )}%</strong> ${direction} from ${resultConditioner(initial)}`
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
