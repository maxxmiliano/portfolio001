# Portfólio — Maxmiliano Souza

Site pessoal: https://maxxmiliano.github.io/portfolio001/

Feito em HTML, CSS e JavaScript puros, sem frameworks. Tudo é servido do
próprio repositório (fonte, ícones e imagens), sem depender de CDNs externos.

## Estrutura

- `index.html` — conteúdo da página
- `assets/css/style.css` — estilos (cores no topo do arquivo, em `:root`)
- `assets/fonts/` — fonte Archivo (licença OFL-1.1)
- `assets/js/` — modo escuro, menu do celular, carrossel e formulário
- `assets/img/` — fotos, ilustrações dos projetos e ícone
- `assets/vendor/boxicons/` — ícones (Boxicons 2.1.4, licença MIT/OFL/CC-BY)

## Formulário de contato

O formulário abre o WhatsApp (ou o e-mail) já com a mensagem escrita.
Configure no `index.html`, na tag `<form id="form-contato">`:
`data-whatsapp="5567999999999"` (DDI + DDD + número) ou `data-email="voce@exemplo.com"`.

## Como editar

Abra o `index.html` e altere os textos. Para adicionar um projeto, copie um
bloco `<li>` da seção "Projetos". O status usa as classes `andamento` ou
`planejamento`.
