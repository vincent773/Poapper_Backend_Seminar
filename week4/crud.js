const http = require('http');

let database = {};
let idx = 1;

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = req.method;

    if(method == 'POST')
    {
        database[idx] = url_parsed[1];
        idx += 1;
    }
    else if(method == 'GET')
    {
        if(url_parsed[1] == '') //read all
            res.write(JSON.stringify(database));
        else
        {
            const url_idx = Number(url_parsed[1]);
            res.write(database[url_idx]);
        }
    }
    else if(method == 'PUT')
    {
        const url_idx = Number(url_parsed[1]);
        const url_data = url_parsed[2];
        database[url_idx] = url_data;
    }
    else if(method == 'DELETE')
    {
        const url_idx = Number(url_parsed[1]);
        database[url_idx] = undefined;
    }
    res.end();
});

server.listen(8080);
server.on('listening', () => {
    console.log("server is running on 8080 port.");
});
