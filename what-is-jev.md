# What is Jev?

> Markdown alternate of [what-is-jev.html](./what-is-jev.html) on the [Jev Directory](https://jev.magicteams.ai). Agent index: [llms.txt](./llms.txt).

Jev is a **judge model**. It doesn't talk to your customers — it grades the AI that does. You hand it a record of what happened plus the questions you care about, and it answers them in a shape your code can use: true/false, one label, or a score.

## The 30-second version

1. **Input** — Give it the state: a support transcript, a tool-call log, one agent output — any text that records what actually happened.
2. **Questions** — Ask in plain English. Each question declares its type and the exact rule to apply. Nothing to train, no labelled examples to collect.
3. **Output** — Get verdicts back: one answer per question, typed and machine-readable — ready to gate a deploy, page a human, or feed a dashboard.

## Why not just ask a model?

Asking a chat model "did the agent state the refund amount?" gets prose back — sometimes starting with "Yes", sometimes with "The agent did state $42.50, however…". Now you need a parser, and a second model to grade the parser.

Asking Jev: you declare each question's type once. Jev returns the verdict in exactly that shape — `true`, one label from your list, or a number. No prose to parse, no second opinion to reconcile.

## The three question types

| Type | Returns | Example rule |
| --- | --- | --- |
| boolean | true / false | True only if the agent stated the exact refund amount before asking to proceed. |
| choice | one label | Classify the ticket: billing, shipping, or account. |
| score | a number | Rate the apology 1–5 for empathy and ownership. |

## A whole judgement, end to end

The **state** is whatever happened. The **questions** are what you want to know. One complete, runnable request:

```js
import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: 'Customer: my order arrived damaged, I want a refund.\n' +
         'Agent: I can refund order #88121 in full: $42.50 back to your ' +
         'Visa ending 4412 within 3-5 business days. Shall I go ahead?',
  questions: {
    amount_disclosed: {
      type: 'boolean',
      instructions: 'True only if the agent stated the exact refund amount ' +
                    '($42.50) before the customer approved.'
    },
    intent: {
      type: 'choice',
      criteria: { billing: 'money or charges', shipping: 'delivery timing', account: 'login or profile' },
      instructions: 'Route this ticket.'
    },
    empathy: {
      type: 'score',
      criteria: ['1 - none', '3 - acknowledged the problem', '5 - owned it and fixed it'],
      instructions: 'Rate how the agent handled the complaint.'
    }
  }
});
// → { amount_disclosed: true, intent: 'billing', empathy: 3 }
```

## Calling it

Jev runs as **typesafe-ai/jev** through the Vercel AI Gateway, called with `experimental_evaluate` from the AI SDK. Set `AI_GATEWAY_API_KEY` in your environment — never paste the key into code.

## What it costs, and what it isn't

- **Model** — `typesafe-ai/jev`, called through the Vercel AI Gateway.
- **Price** — About **$0.042 per million input tokens** — cheap enough to judge every conversation, not just a sample of it.
- **Auth** — `AI_GATEWAY_API_KEY` in the environment. Nothing to train, nothing to host, no weights to babysit.
- **Not a chatbot** — Jev never answers your customers. It only answers questions about what your agent did.
- **Not a classifier** — You don't train it or collect labels. You write the rule in English and it applies that rule.

## Go deeper

- [50 runnable evals](./index.html#evals-section) — each with the exact prompt; copy one and run it.
- [Connect your agent over MCP](./index.html#connect) — `https://jev.magicteams.ai/mcp`, 10 tools + 3 resources.
- [Capability pack](./capabilities.md) — every eval with its prompt and every community build by category.
- [Explained like you're 10](./jev-like-im-10.md) — the same idea with no jargon.
