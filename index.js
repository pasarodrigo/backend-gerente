const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/processar-uf", async (req, res) => {
  const { UF } = req.body;
  if (!UF) return res.status(400).send("UF não fornecida");

  const payload = [{ id: 1, UF }];
  console.log("📨 Recebido UF:", UF);

  try {
    const resposta = await fetch("https://api-gerentes.onrender.com/atribuir-gerentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const dados = await resposta.json();
    console.log("✅ Gerente atribuído:", dados[0]?.gerente);

    res.status(200).send("Processamento iniciado");
  } catch (erro) {
    console.error("❌ Erro ao chamar API de gerentes:", erro);
    res.status(500).send("Erro ao processar UF");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
