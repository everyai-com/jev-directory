# Jev decision patterns

> Markdown alternate of [decision-patterns.html](./decision-patterns.html) on the [Jev Directory](https://jev.magicteams.ai). Agent index: [llms.txt](./llms.txt).

Every Jev integration in this directory is one of ten reusable patterns. Find the shape of your problem, copy the closest runnable eval, adapt its questions to your own states.

## 1. Boolean gate — stop the action unless the rule holds

One boolean question per policy rule. The action only proceeds when every verdict is true; otherwise pause for approval or a human.

- **When:** refunds, sends, charges, publishes — anywhere an agent must prove it disclosed, redacted, or confirmed something before acting.
- **Ask:** `amount_disclosed` (boolean): "True only if the agent stated the exact refund amount before the customer approved."
- **Try:** [eval 1](./index.html#eval-1), [eval 4](./index.html#eval-4), [eval 6](./index.html#eval-6), [eval 9](./index.html#eval-9) · MCP: `list_jev_patterns {"id": "boolean-gate"}`

## 2. Choice router — send each item to exactly one owner

One choice question whose criteria are your queues, owners, or priorities. Every item lands somewhere — never two places, never nowhere.

- **When:** support triage, bug intake, lead routing, escalation queues, moderation dispositions.
- **Ask:** `queue` (choice: billing | shipping | account): "Route this ticket to the team that owns the underlying problem."
- **Try:** [eval 13](./index.html#eval-13), [eval 11](./index.html#eval-11), [eval 14](./index.html#eval-14), [eval 15](./index.html#eval-15), [eval 50](./index.html#eval-50) · MCP: `list_jev_patterns {"id": "choice-router"}`

## 3. Score rubric — grade quality on your own scale

One score question per quality dimension with an ordered rubric. Track the numbers over time instead of re-reading everything.

- **When:** reviewing agent replies, summaries, drafts, translations, plans — anything where "good" is a spectrum, not a switch.
- **Ask:** `empathy` (score 1–4): ["1 - none", "3 - acknowledged the problem", "4 - owned it and fixed it"].
- **Try:** [eval 23](./index.html#eval-23), [eval 21](./index.html#eval-21), [eval 24](./index.html#eval-24), [eval 25](./index.html#eval-25) · MCP: `list_jev_patterns {"id": "score-rubric"}`

## 4. Multi-question fan-out — one state, many verdicts, one call

Pack every question about the same record into a single call. Questions evaluate in parallel and output is free, so the tenth question costs about nothing extra.

- **When:** auditing transcripts, calls, or artifacts where you need the gate *and* the route *and* the grade together.
- **Ask:** `policy_followed` (boolean) + `empathy` (score) over the same transcript — pass only when both match.
- **Try:** [eval 31](./index.html#eval-31), [eval 32](./index.html#eval-32), [eval 34](./index.html#eval-34), [eval 40](./index.html#eval-40) · MCP: `list_jev_patterns {"id": "multi-question-fanout"}`

## 5. Confidence routing — automate the clear, escalate the unsure

Read the boolean probability (and Choice/Score confidence) on every answer. Automate above your threshold, route below it to a human — calibrated on your own labelled examples.

- **When:** any automation where a wrong auto-decision costs more than a review: refunds, access grants, publishes, medical or legal drafts.
- **Ask:** `refunded` (boolean), then in code: if probability < 0.8, send for manual review.
- **Try:** [eval 50](./index.html#eval-50), [eval 16](./index.html#eval-16), [eval 6](./index.html#eval-6) · MCP: `list_jev_patterns {"id": "confidence-routing"}`

## 6. Retag loop — reclassify all of history when the question changes

Tag what matters today; when the business changes, re-run Jev over everything for a few dollars instead of predicting the right taxonomy six months ahead. The headline run: 20,000 messages into 8 buckets in 7 minutes for $1.45.

- **When:** email, Slack, and transcript archives, CRM hygiene, content libraries — any corpus whose categories keep evolving.
- **Ask:** `intent` (choice over your buckets), re-run over the whole archive in one batch job.
- **Try:** [eval 13](./index.html#eval-13), [eval 12](./index.html#eval-12), [eval 17](./index.html#eval-17) · MCP: `list_jev_patterns {"id": "retag-loop"}`

## 7. Hypothesis loop — let the LLM guess, let Jev measure

Hand a thinking model transcripts plus outcomes; it proposes candidate drivers ("used the prospect's name"). Point Jev at history, score every record against all candidates, keep what correlates, repeat.

- **When:** sales-call analysis, support deflection, churn drivers — anywhere you suspect patterns but can't hand-label enough data to prove them.
- **Ask:** twenty booleans (one per hypothesis) over every call transcript, joined to outcomes in your warehouse.
- **Try:** [eval 40](./index.html#eval-40), [eval 20](./index.html#eval-20), [eval 15](./index.html#eval-15) · MCP: `list_jev_patterns {"id": "hypothesis-loop"}`

## 8. Eval harness — pin agent behavior with fixed states + verdicts

Fixed states, exact expected verdicts, one dataset revision. Run the suite on every agent change; a revision bump means the definition of success changed, never silently.

- **When:** CI gates for agent behavior, regression suites for prompts, comparing two agent versions on identical inputs.
- **Ask:** this directory's 50 evals are the template: exact match per question, pass iff every question matches.
- **Try:** [eval 1](./index.html#eval-1), [eval 31](./index.html#eval-31), [eval 49](./index.html#eval-49) · MCP: `list_jev_patterns {"id": "eval-harness"}`

## 9. Agent-loop step — Jev picks the next move, the LLM executes it

At each loop iteration Jev chooses the next tool or subagent — or one of continue / retry / ask-the-user / stop. The LLM never burns reasoning on the routing decision itself.

- **When:** multi-step agents, tool-heavy tasks, browser automation — anywhere routing tokens dominate the bill.
- **Ask:** `next_step` (choice: continue | retry | ask_user | stop): "Given the goal and the last tool result, what should the agent do next?"
- **Try:** [eval 50](./index.html#eval-50), [eval 48](./index.html#eval-48), [eval 18](./index.html#eval-18) · MCP: `list_jev_patterns {"id": "agent-loop-step"}`

## 10. Output verifier — check the artifact before it ships

Judge the draft, not the chat: groundedness, citations, tone, PII leaks, audience fit. The generator writes; Jev signs off or sends back with a scored reason.

- **When:** newsletters, release notes, RAG answers, code reviews, generated reports — any artifact with a bar to clear.
- **Ask:** `claims_sourced` (boolean) + `draft_quality` (score) over the draft artifact.
- **Try:** [eval 5](./index.html#eval-5), [eval 49](./index.html#eval-49), [eval 43](./index.html#eval-43), [eval 38](./index.html#eval-38), [eval 19](./index.html#eval-19) · MCP: `list_jev_patterns {"id": "output-verifier"}`

## Go deeper

- [50 runnable evals](./index.html#evals-section) — copy a prompt and run it.
- [Connect your agent over MCP](./index.html#connect) — `https://jev.magicteams.ai/mcp`.
- [What is Jev?](./what-is-jev.md) — the judge-model explainer with code.
