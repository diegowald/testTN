const express = require('express')
const http = require("https");
const { v4: uuidv4 } = require("uuid");
const app = express()
const port = 5000
app.use(express.json())

async function getData(quantity) {
  return new Promise((resolve, reject) => {
    const url = `https://lorem-faker.vercel.app/api?quantity=5`;
    http.get(url, (res) => {
      let rawHtml = '';
      res.on('data', (chunk) => {
        rawHtml += chunk;
      });
      res.on('end', () => {
        try {
          const retrievedTitles = JSON.parse(rawHtml);
          const result = [];
          retrievedTitles.forEach(title => {
            result.push({
              uuid: uuidv4(),
              title: title
            });
          })
          resolve(result);
        } catch (e) {
          console.error(e.message);
          resject(e.message);
        }
      });
    });
  });
}

app.get('/tasks', (req, response) => {
  getData(3).then(data => response.send(data)).catch(err => response.send(err));
})

app.get('/tasks/:count', (req, response) => {
  const quantity = req.params.count;
  getData(quantity).then(data => response.send(data)).catch(err => response.send(err));
})

app.put('/tasks', (req, resp) => {
  console.log(req.body);
  const json = req.body;
  const uuid = json.uuid;
  console.log(`item marked ${uuid}`);
  resp.send("done");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})