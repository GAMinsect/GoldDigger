const extToContentType = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png'
}

export const setDataRes = (res, statusCode, ext, payload) => {
    res.statusCode = statusCode
    res.setHeader('Content-Type', extToContentType[ext])
    res.end(payload)
}

