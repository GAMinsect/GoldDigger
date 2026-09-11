export const updatePrice = (req, res) => {  
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Periodically give updates to the client about the price of gold
    setInterval(() => {
        let startingPrice = 3226.23; //Sterling Pounds per ounce
        startingPrice = startingPrice + (startingPrice * (Math.random() * 0.1 - 0.05)); // Randomly fluctuate the price by +- 5 percent

        res.write(
        `data: ${JSON.stringify({
            event: 'price-update',
            price: startingPrice
        })}\n\n`
        )

    }, 2000)
}