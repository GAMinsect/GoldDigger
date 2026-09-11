import http from 'node:http';
import path from 'node:path'
import fs from 'node:fs/promises'
import { EventEmitter } from 'node:events'; 
import { setDataRes } from './utils/setDataRes.js';
import { updatePrice } from './utils/updatePrice.js'

const PORT = 8000
const __dirname = import.meta.dirname
export const newPrice = new EventEmitter()

const server = http.createServer( async (req, res) => {

    //Send the web site to be interacted with
    if(req.method == 'GET'){
        //console.log("URL: ", req.url)

        try{
            if(req.url == '/price-stream'){
                updatePrice(req, res)
            }
            else{ //default resource request
                const filePath = path.join(
                    __dirname,
                    'public',req.url == '/' || req.url == '/?' ? 'index.html' : req.url
                )
                const payload = await fs.readFile(filePath)
                setDataRes(res, 200, path.extname(filePath), payload)
            }
        }catch(err){
            console.error("Error: ", err)
            const filePath = path.join(__dirname, 'public', '404.html')
            const payload = await fs.readFile(filePath)
            setDataRes(res, 404, '.html', payload)
        }
    }
    else if (req.method == 'POST') {
        if (req.url === '/save-transaction') {
            let body = '';
            for await (const chunk of req) {
                body += chunk;
            }
           
            const transaction = JSON.parse(body);
            try{
                const filePath = path.join(__dirname, 'transactions.json');
                const data = await fs.readFile(filePath, 'utf-8');
                const transactions = JSON.parse(data);
                transactions.push(transaction);
                await fs.writeFile(filePath, JSON.stringify(transactions, null, 2));
            }
            catch (error) {
                console.error('Error saving transaction:', error);
            }
            console.log('Transaction received:', transaction);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'Transaction saved successfully' }));
        }
    }
  
})


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


   