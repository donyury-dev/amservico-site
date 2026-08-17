# AM Serviço e Manutenção — Site

Site institucional da AM Serviço e Manutenção, com painel administrativo integrado, temas automáticos por datas comemorativas e deploy na Vercel.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- GitHub API (commit de JSON via painel admin)
- Vercel (hospedagem)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. O painel admin está em `http://localhost:3000/admin`.

**Senha padrão do admin:** `admin123` (altere assim que possível).

## Como fazer build

```bash
npm run build
```

O site estático é gerado na pasta `dist/`.

## Como fazer deploy

1. Crie um repositório no GitHub (ex: `usuario/amservico-site`).
2. Envie o código:
   ```bash
   git remote add origin https://github.com/usuario/amservico-site.git
   git add .
   git commit -m "feat: site inicial"
   git push -u origin main
   ```
3. Importe o projeto na Vercel (`vercel.com/new`).
4. Configure o domínio customizado `amservico.com.br` no dashboard da Vercel.
5. Na GoDaddy, aponte o DNS:
   - Registro A `@` → `76.76.21.21`
   - Registro CNAME `www` → `cname.vercel-dns.com`
6. Aguarde a propagação do DNS (pode levar até 48h).

## Como usar o painel admin

1. Acesse `/admin` e faça login com a senha.
2. Configure o **Token de acesso do GitHub** e o **Repositório (dono/repo)**.
3. Clique em **Salvar Token no Site** para armazenar no navegador.
4. Edite o conteúdo nas abas (textos, cores, fontes, temas comemorativas).
5. Clique em **Publicar no Site** para commitar as alterações no GitHub.
6. Aguarde 1-2 minutos para o deploy da Vercel refletir as mudanças.

### Criar token do GitHub

1. Acesse `github.com/settings/tokens`.
2. Clique em **Generate new token (classic)**.
3. Marque a permissão **repo**.
4. Copie o token e cole no painel admin.

## Temas automáticos

O arquivo `data/themes.json` define o tema padrão e temas comemorativos com `startDate` e `endDate` no formato `MM-DD`. O site detecta a data atual e aplica o tema ativo automaticamente.

## Dados pendentes (TODO)

Os seguintes dados não foram encontrados publicamente no site atual e estão como placeholder ou parciais:

- Endereço completo (rua, número, bairro): exibido como "Embu-Guaçu/SP — CEP 06928-265".
- CREA / responsável técnico nominal.
- Redes sociais (Instagram, LinkedIn, Facebook).
- Telefone fixo/comercial (usa apenas WhatsApp).

Edite esses dados no painel admin ou diretamente em `data/site-content.json`.

## Licença

Projeto privado — AM Serviço e Manutenção.
