# Painel Gestor DBS · Bioclin

Painel da linha BIOLISA: previsão × venda × produção × estoque, por produto e por cliente, com riscos de desabastecimento e de vencimento.

- Arquivo único: `index.html`. Abre direto no navegador, sem instalar nada.
- Acesso por senha: os números ficam criptografados (AES-256) dentro do arquivo e só aparecem com a senha correta. A senha não está escrita neste repositório.
- Atualização mensal: planilha Controle_Previsibilidade_Biolisa_2026.xlsx (abas LANCAMENTO_MENSAL e COMPRAS_CLIENTES) → botão "Carregar planilha" no painel, ou regerar o `index.html`.

## Publicar como site (GitHub Pages)
Settings → Pages → Source: *GitHub Actions* (o fluxo `.github/workflows/pages.yml` publica a cada envio).
