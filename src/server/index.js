const express = require('express');
const items = require('./items');

const app = express();

const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static('dist'));

app.get('/api/items', (req, res) => {
  const searchQuery = req.query.name;
  
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.send({ items: filteredItems });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
