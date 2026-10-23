# Atlas IVD

Mapa interativo dos laboratórios clínicos e postos de coleta ativos no Brasil, a partir da base oficial do CNES (DATASUS).

- **Abrir o Atlas:** `index.html` (no GitHub Pages: `https://<usuario>.github.io/<repositorio>/atlas-ivd/`)
- **Atualizar a base:** `atualizador.html` (mesmo endereço, terminando em `atlas-ivd/atualizador.html`)

## Atualizar a base todo mês

1. Baixe `BASE_DE_DADOS_CNES_AAAAMM.ZIP` em https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp (cerca de 750 MB).
2. Abra `atualizador.html` no computador, escolha o ZIP e clique em **Baixar base do Atlas**.
3. Descompacte o ZIP gerado e, nesta pasta `atlas-ivd`, use **Add file › Upload files** para enviar `resumo.json`, `busca.json` e a pasta `uf`. Clique em **Commit changes**.

Em 1 ou 2 minutos o link do Atlas mostra a base nova.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `resumo.json` | Totais por estado e por município (abre o mapa do Brasil) |
| `uf/XX.json` | Estabelecimentos do estado XX (posição, tipo, nome) |
| `uf/XX_d.json` | Contatos do estado XX (CNES, endereço, telefone, e-mail, CNPJ) |
| `busca.json` | Índice de nomes para a busca nacional |
| `estados.json` | Contorno dos estados |

## Copiar o Atlas para outra conta

Faça um *fork* deste repositório, ative o GitHub Pages (Settings › Pages › Deploy from branch › `main`) e, se for usar o arquivo `index.html` fora do site, troque o endereço da linha `const CDN=` pelo seu.
