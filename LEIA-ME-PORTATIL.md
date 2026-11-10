# Taberna das Taipas: continuar no portátil

Passos para pôr o projeto a funcionar num portátil Windows a partir de `taberna-das-taipas-transferir.zip`.
Os comandos são para o **PowerShell**. Corre-os um de cada vez.

## 0. O que vem no ZIP

| Pasta ou ficheiro | Para que serve | No git? |
|---|---|---|
| `conteudo/` | Originais do restaurante: ficha, ementa (`ementa.json`, `ementa.md`) e fotos | Não, de propósito |
| `index.html`, `ementa.html` | O site | Sim |
| `assets/` | CSS, JS, fotos preparadas e fontes | Sim |
| `scripts/` | `gerar-ementa.mjs` (gera a ementa) e `servidor.mjs` (servidor local) | Sim |
| `PRODUCT.md`, `DESIGN.md` | Contexto do produto e sistema visual (usados pelo Impeccable) | Sim |
| `.impeccable/` | Só os ficheiros partilhados: `config.json`, `design.json`, `surfaces/` | Sim |
| `versoes/` | Cópia da v1 para comparar lado a lado no browser | Não |
| `.git/` | Histórico completo, com a tag `v1-mesa-ao-centro` | — |

O ZIP **não** traz a pasta `.claude/`. As skills (Impeccable e mobile-native) são reinstaladas no passo 4.

> **Os originais em `conteudo/` não podem ser apagados.** Ficam fora do git, por isso o ZIP é a única cópia que levas. Guarda o ZIP até confirmares que está tudo no portátil.

## 1. Descompactar

1. Copia o ZIP para o Ambiente de Trabalho do portátil.
2. Clica com o botão direito no ZIP, escolhe **Extrair tudo…** e extrai para o Ambiente de Trabalho.
3. Deve ficar a pasta `Desktop\taberna-das-taipas\`, com o `index.html` lá dentro.
4. Entra na pasta:

```powershell
cd "$HOME\Desktop\taberna-das-taipas"
```

Se o Ambiente de Trabalho estiver no OneDrive, o caminho é `"$HOME\OneDrive\Desktop\taberna-das-taipas"` (ou `Ambiente de Trabalho`).

## 2. Instalar o Node.js e o Git

O Node corre os scripts do projeto e o `npx`. O Git guarda as versões e traz o Git Bash, de que o Claude Code e o hook do Impeccable precisam no Windows.

```powershell
winget install OpenJS.NodeJS.LTS
```

```powershell
winget install Git.Git
```

Fecha o PowerShell, abre-o de novo e confirma:

```powershell
node -v
```

```powershell
git -v
```

Sem `winget`, instala a partir de https://nodejs.org (versão LTS) e https://git-scm.com.

No primeiro `git commit`, se o Git pedir nome e e-mail:

```powershell
git config --global user.name "mxthiasp"
```

```powershell
git config --global user.email "o-teu-email"
```

Confirma que o histórico veio no ZIP:

```powershell
git log --oneline --decorate
```

## 3. Permitir scripts no PowerShell

O Windows bloqueia por omissão os scripts `.ps1`, incluindo o `npx` e o `npm`. Este comando permite-os só para o teu utilizador. Os scripts descarregados da internet continuam a precisar de assinatura.

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Responde `S` (ou `Y`). Para confirmar:

```powershell
Get-ExecutionPolicy -List
```

`CurrentUser` deve aparecer como `RemoteSigned`.

## 4. Reinstalar o Impeccable e a mobile-native (só para o Claude Code, só neste projeto)

Instala o Claude Code no portátil, se ainda não estiver, e corre os comandos seguintes **dentro da pasta do projeto**.

### Impeccable, com o hook

```powershell
npx impeccable@latest install --project
```

- Quando pedir os harnesses/agentes, escolhe **só o Claude Code**.
- Aceita os hooks: não uses `--no-hooks`.
- O hook fica em `.claude\settings.local.json`. Verifica a deteção depois de mexer num `.html` ou `.css`. As regras de deteção que já tinhas vêm no `.impeccable\config.json`.

O que fica instalado:

- `.claude\skills\impeccable\`
- `.claude\agents\impeccable-*.md`
- o hook do detetor de design

Para confirmar, no Claude Code, dentro do projeto:

```
/impeccable hooks status
```

Se disser que o hook não está ligado, corre `/impeccable hooks on`. Na primeira sessão o Claude Code pode pedir para confiar na pasta e aprovar o hook. Aceita.

### mobile-native

```powershell
npx skills add emilkowalski/skills --skill mobile-native --agent claude-code
```

- Se perguntar o âmbito, escolhe **Project**, não Global.
- Se perguntar o método, escolhe **Copy**.
- A skill fica em `.claude\skills\mobile-native\`.
- O `skills-lock.json` na raiz regista a origem.

Depois **reinicia o Claude Code** na pasta do projeto, para carregar as skills e o hook. Escreve `/` e confirma que aparecem `impeccable` e `mobile-native`.

## 5. Abrir o servidor local (PC e iPhone)

```powershell
node scripts/servidor.mjs
```

O terminal mostra dois endereços:

```
No PC:      http://localhost:4173/
No iPhone:  http://192.168.x.x:4173/
```

- **No PC:** abre o primeiro endereço.
- **No iPhone:** liga-o à mesma rede Wi-Fi e abre o segundo endereço no Safari. A ementa está em `…:4173/ementa.html`.
- **Versão antiga:** a v1, para comparar, está em `http://localhost:4173/versoes/v1-mesa-ao-centro/`.
- **Parar:** `Ctrl+C`.
- **Outra porta:** `node scripts/servidor.mjs 8080`.

O servidor não mostra `conteudo/`, `.git/`, `.impeccable/`, `.claude/` nem `scripts/` à rede.

**Se o iPhone não abrir a página:**

1. Na primeira vez, o Windows pergunta se o Node.js pode usar a rede. Marca **Redes privadas** e carrega em Permitir.
2. Em **Definições → Rede e Internet → Wi-Fi → (a tua rede)**, o perfil tem de ser **Rede privada**. Em rede pública, o Windows bloqueia o acesso.
3. Confirma que o endereço começa por `192.168.` ou `10.`. Se aparecerem vários, experimenta o do Wi-Fi.
4. Redes de hotel ou de convidados costumam isolar os aparelhos. Aí não há volta a dar.

## 6. Gerar a ementa

Sempre que mudares `conteudo/ementa.json`:

```powershell
node scripts/gerar-ementa.mjs
```

Deve responder algo como `ementa.html gerada: 25 categorias, 255 itens, 10 da casa.`

Se o JSON tiver um erro, o script diz qual e **não** mexe no `ementa.html` atual. Os destaques "da casa", os grupos e os títulos das categorias configuram-se no topo de `scripts/gerar-ementa.mjs`.

## 7. Verificação rápida

- [ ] `git log --oneline --decorate` mostra a tag `v1-mesa-ao-centro` e o último commit.
- [ ] `conteudo\` tem a `ficha.md`, a `ementa.json`, a `ementa.md` e as fotos.
- [ ] `node scripts/gerar-ementa.mjs` gera a ementa sem erros.
- [ ] `node scripts/servidor.mjs` abre o site no PC e no iPhone.
- [ ] No Claude Code, `/impeccable hooks status` mostra o hook ligado e `mobile-native` aparece na lista de skills.

## Ainda por confirmar com o restaurante

Horário, telefones, alergénios, a secção Vegetariano, a história, a política de privacidade e a grafia de alguns pratos da ementa. No site, estes pontos aparecem com sublinhado tracejado.
