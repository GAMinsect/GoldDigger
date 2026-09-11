import http from 'node:http';
import path from 'node:path'
import fs from 'node:fs/promises'

import { extToContentType } from './utils/setDataRes.js';

const PORT = 8000
const __dirname = import.meta.dirname
const server = http.createServer( async (req, res) => {

    //Send the web site to be interacted with
    if(req.method == 'GET'){
        //console.log("URL: ", req.url)
 
        const filePath = path.join(__dirname,'public',req.url == '/' || req.url == '/?' ? 'index.html' : req.url)
        const payload = await fs.readFile(filePath)
        //console.log("EXT: ", path.extname(filePath))
        res.setHeader('Content-Type', extToContentType[path.extname(filePath)])
        res.statusCode = 200
        res.end(payload)
        
    }
    
})
    

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


   