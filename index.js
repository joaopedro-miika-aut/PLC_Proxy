const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.text());

app.post('/receber', async (req, res) => {
  const corpo = req.body;
  console.log("Recebido do PLC:", corpo);

  const resposta = await fetch(process.env.APPS_SCRIPT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: corpo
  });

  const retorno = await resposta.text();
  res.send(retorno);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor ativo na porta", PORT);
});