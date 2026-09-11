import http from 'node:http';
import path from 'node:path'
import fs from 'node:fs/promises'
import { EventEmitter } from 'node:events'; 
import { extToContentType } from './utils/setDataRes.js';

const PORT = 8000
const __dirname = import.meta.dirname
export const newPrice = new EventEmitter()

const server = http.createServer( async (req, res) => {

    //Send the web site to be interacted with
    if(req.method == 'GET'){
        //console.log("URL: ", req.url)

        try{
            if(req.url == '/price-stream'){
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
            else{ //default resource request
                const filePath = path.join(__dirname,'public',req.url == '/' || req.url == '/?' ? 'index.html' : req.url)
                const payload = await fs.readFile(filePath)
                //console.log("EXT: ", path.extname(filePath))
                res.setHeader('Content-Type', extToContentType[path.extname(filePath)])
                res.statusCode = 200
                res.end(payload)
            }
        }catch(err){
            console.error("Error: ", err)
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            const payload = await fs.readFile(path.join(__dirname, 'public', '404.html'))
            res.end(payload)
        }
    }
    
})


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


   