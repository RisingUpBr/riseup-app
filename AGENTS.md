# AGENTS.md â Guia de ColaboraÃ§Ã£o entre IAs

## PapÃ©is definidos

### Claude (claude.ai â esta conversa)
**Foco:** Rise Up APP exclusivamente
- DecisÃµes de arquitetura e produto
- UI/UX complexo
- LÃ³gica de negÃ³cio e serviÃ§os Firebase
- Debug de problemas complexos
- GeraÃ§Ã£o de prompts para Claude Code executar

### Claude Code (CLI)
**Foco:** ExecuÃ§Ã£o no repositÃ³rio
- Executa os prompts gerados nesta conversa
- LÃª/escreve arquivos do projeto
- Roda `npm run dev` para testar
- Reporta erros de compilaÃ§Ã£o de volta para esta conversa

### Codex / GitHub Copilot
**Foco:** Autocomplete inline no editor
- SugestÃµes de sintaxe enquanto vocÃª digita
- Completar boilerplate Ã³bvio
- NÃO usar para decisÃµes de arquitetura
- NÃO usar para a mesma tarefa que o Claude Code estÃ¡ fazendo

### Outras conversas Claude
**Foco:** Rise Up SITE (separado)
- Nunca misturar contexto app â site
- Se precisar de lÃ³gica shared, documentar aqui

---

## Fluxo de trabalho recomendado

```
1. VocÃª descreve o problema/feature aqui (Claude)
2. Claude gera o prompt/cÃ³digo completo
3. Claude Code executa no repositÃ³rio
4. Claude Code reporta erro se houver
5. Claude corrige e Claude Code re-executa
6. Codex ajuda com autocomplete enquanto vocÃª revisa
```

---

## Anti-padrÃµes a evitar

| â Errado | â Correto |
|---|---|
| Pedir para Codex criar a lÃ³gica de auth | Usar Claude para arquitetura, Codex sÃ³ para syntax |
| Abrir nova conversa para resolver bug do app | Continuar nesta conversa com contexto completo |
| Copiar cÃ³digo do site para o app sem adaptar | Documentar lÃ³gica shared em AI_CONTEXT.md |
| Dar o projeto inteiro como contexto | Dar apenas os arquivos relevantes para a tarefa |

---

## Quando iniciar nova conversa

- Apenas quando o contexto ficar muito longo e Claude comeÃ§ar a perder detalhes
- Nesse caso: cole o AI_CONTEXT.md no inÃ­cio + descreva o estado atual
