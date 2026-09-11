const investBtn = document.getElementById('invest-btn')
const confirmation = document.getElementById('summary-dialog')
const closeBtn = document.getElementById('close-btn')

investBtn.addEventListener('click', (event) => {
    console.log('CLICKED')
    event.preventDefault() // The Button shoudn't reset the page
    confirmation.showModal()
})

closeBtn.addEventListener('click', (event) => {
    confirmation.close()
})

