const investBtn = document.getElementById('invest-btn')
const confirmation = document.getElementById('summary-dialog')
const closeBtn = document.getElementById('close-btn')
const investmentAmount = document.getElementById('investment-amount')
const investmentSummary = document.getElementById('investment-summary')
const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')

const newPrice = new EventSource('/price-stream'); 

investBtn.addEventListener('click', (event) => {
    console.log('CLICKED')

    investmentSummary.textContent = `You just bought ${(investmentAmount.value/priceDisplay.innerText).toFixed(8)} ounces (ozt) for £${investmentAmount.value}. \n You will receive documentation shortly.`
    event.preventDefault() // The Button shoudn't reset the page
    confirmation.showModal()
})

closeBtn.addEventListener('click', (event) => {
    confirmation.close()
    investmentAmount.value = ''
})

newPrice.onmessage = (event) => {
    connectionStatus.innerText = 'Live Price 🟢'
    const data = JSON.parse(event.data)
    priceDisplay.innerText = `${data.price.toFixed(2)}`
    
}

newPrice.onerror = (event) => {
    console.error('Error receiving price updates: ', event)
}