# Jev Capability Pack

This is a playbook of what **Jev** (typesafe-ai/jev) can do: **50 runnable judge-model evals** with the exact prompt, plus **726 real community builds** that use Jev in production, with project links.

| | |
| --- | --- |
| Generated | 2026-09-19 |
| Model | `typesafe-ai/jev` via https://ai-gateway.vercel.sh/v1 |
| Pricing | $0.042 per 1M input tokens |
| Auth | `AI_GATEWAY_API_KEY` (vck_…) in the environment |
| Evals | 50 runnable |
| Eval manifest | rev `6d1f82b05fbea65e` · exact-match per question, every question must match |
| Community builds | 726 with links |
| This file | https://raw.githubusercontent.com/everyai-com/jev-directory/main/capabilities.md |
| Directory + repo | https://github.com/everyai-com/jev-directory |

---

## Instructions for your agent

You are an AI agent working for the person who gave you this pack. Jev is a fast, cheap judge model: point it at a transcript, artifact, or decision and it returns structured verdicts. Everything below is something Jev has already done — use it to decide what you can do for them.

**When they ask for something:**

1. Match the request to the closest eval or community build below. A near-miss is fine — adapt it.
2. Ask for every missing detail in one round, up front.
3. Then run it: evals execute verbatim through `experimental_evaluate`; builds link to working code to copy from.
4. Verify the outcome and report it with receipts (scores, verdicts, links).

**When they ask what Jev can do:** summarize the patterns — Boolean checks, choices against criteria, scored rubrics, decision routing, eval harnesses — then name the closest builds and offer to start.

---

## Calling Jev

Model: `typesafe-ai/jev` on `https://ai-gateway.vercel.sh/v1`. Auth comes from `AI_GATEWAY_API_KEY` — never paste the key.

Question schema (mix freely per eval):

- `boolean` — `{ type, instructions }`: true/false verdict.
- `choice` — `{ type, instructions, criteria: { key: description } }`: pick one labelled outcome.
- `score` — `{ type, instructions, criteria: [ordered rubric strings] }`: graded score against a rubric.

Minimal call:

```js
import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: '<transcript or artifact under test>',
  questions: { passes: { type: 'boolean', instructions: 'True only if …' } },
});
```

---

## Business playbook: retag everything

Field notes from operators running Jev on real business data. The headline run: 20,000 emails, Slacks and transcripts sorted into 8 buckets (upsells, complaints, missed follow-ups, five more) in 7 minutes for $1.45.

- **Jev is a tool for your models, not another model.** Claude or GPT does the thinking and works out which questions are worth asking; Jev answers those questions across everything you have. It answers many questions at once without losing accuracy, priced on input tokens with output free — so adding a fourth or tenth question barely moves the bill.
- **Retagging beats planning.** Tag what matters today. When the business changes — a new service, a new question — retag all of history for a few dollars instead of predicting the right tags six months ahead. You no longer have to be right the first time.
- **Proactive second brain.** Everyone builds the reactive kind (ask anything, it searches). To flag things without being asked, something must keep re-reading your data for what you care about. That loop is only affordable when asking is nearly free.
- **The hypothesis loop.** Hand the LLM transcripts plus outcomes; it proposes twenty hypotheses about what actually drives results (used the prospect’s name, mentioned a neighbour, gave a reason in ten seconds). Point Jev at history, reclassify every record against all twenty, keep what correlates, repeat. A call centre running hundreds of thousands of calls a day uses exactly this to test what a good call really looks like.

---

## Eval manifest (rev `6d1f82b05fbea65e`)

Two runners comparing numbers must quote the same revision — it hashes every state, rubric, and expected verdict, so any definition change bumps it. Rule: Exact match per question against the fixed state; an eval passes iff every question matches. Scores use the rubric scale (1 = first criterion … N = last); booleans and choices match literally.

- `refund-amount-disclosed`: pass when amount_disclosed is true
- `human-handoff-offered`: pass when handoff_offered is true
- `receipt-with-confirmation-number`: pass when has_confirmation is true
- `card-number-redacted`: pass when no_full_pan is true
- `answer-cites-sources`: pass when claims_sourced is true
- `payment-paused-for-approval`: pass when paused_for_approval is true
- `cancellation-effective-date-stated`: pass when date_explicit is true
- `health-answer-has-disclaimer`: pass when disclaimer_present is true
- `quote-matches-price-list`: pass when quote_accurate is true
- `follow-up-task-scheduled`: pass when followup_dated is true
- `ticket-priority`: pass when priority is p0
- `message-sentiment`: pass when sentiment is negative
- `support-intent-route`: pass when queue is billing
- `bug-severity`: pass when severity is critical
- `lead-quality`: pass when tier is hot
- `content-safety`: pass when verdict is safe
- `email-tone-check`: pass when tone is professional
- `meeting-request-triage`: pass when disposition is decline
- `code-review-verdict`: pass when review_verdict is request_changes
- `churn-risk`: pass when risk is high
- `summary-faithfulness`: pass when faithfulness is 1 of 4
- `review-actionability`: pass when actionability is 1 of 4
- `apology-quality`: pass when apology is 4 of 4
- `explanation-clarity`: pass when clarity is 3 of 4
- `plan-completeness`: pass when completeness is 4 of 4
- `sql-answer-quality`: pass when correctness is 3 of 4
- `translation-fluency`: pass when fluency is 2 of 4
- `headline-strength`: pass when headline is 1 of 4
- `onboarding-email-quality`: pass when onboarding is 4 of 4
- `meeting-notes-quality`: pass when notes is 4 of 4
- `support-transcript-audit`: pass when policy_followed is true and empathy is 4 of 4
- `refund-chat-triage`: pass when remedy_complete is true and followup_queue is shipping
- `product-review-screen`: pass when authenticity is fake and helpfulness is 2 of 4
- `agent-handoff-note`: pass when next_step_present is true and handoff_clarity is 4 of 4
- `invoice-dispute`: pass when duplicate_acknowledged is true and queue is technical
- `travel-itinerary-check`: pass when timing_feasible is true and itinerary_quality is 4 of 4
- `password-reset-flow`: pass when no_password_disclosed is true and risk is safe
- `release-notes-check`: pass when audience is end_users and notes_quality is 4 of 4
- `standup-summary-check`: pass when blocker_kept is true and brevity is 4 of 4
- `sales-call-review`: pass when close_type is soft and technique is 1 of 4
- `onboarding-checklist-verification`: pass when access_ready is true and equipment_ready is true
- `moderation-queue-item`: pass when verdict is remove and claim_identified is true
- `newsletter-draft-review`: pass when draft_quality is 4 of 4 and cta_present is true
- `interview-feedback-check`: pass when signal is strong_hire and evidence_quality is 4 of 4
- `contract-redline-check`: pass when liability_capped is true and redline_quality is 4 of 4
- `recipe-adaptation-check`: pass when allergen_removed is true and substitution is direct_swap
- `fitness-plan-check`: pass when plan_quality is 4 of 4 and rest_scheduled is true
- `bug-report-triage`: pass when owner is mobile and reproducible is true
- `doc-search-answer`: pass when groundedness is 4 of 4 and plan_gate_stated is true
- `escalation-decision`: pass when response is page_now and reasoning is 3 of 4

---

## Runnable evals (50)

### 1. Refund chat: agent stated the amount before issuing it

A support agent issues a $42.50 refund; the judge checks the exact amount was stated before the refund was confirmed.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when amount_disclosed is true*

```js
// Refund chat: agent stated the amount before issuing it — Jev judge eval (typesafe-ai/jev).
// A support agent issues a $42.50 refund; the judge checks the exact amount was stated before the refund was confirmed.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: My order arrived damaged, I want a refund.\nAgent: I am sorry about that. I can refund order #88121 in full: $42.50 back to your Visa ending 4412 within 3-5 business days. Shall I go ahead?\nCustomer: Yes please.\nAgent: Done — $42.50 refunded to your Visa ending 4412. Confirmation R-99210.",
  questions: {
    "amount_disclosed": {
      "type": "boolean",
      "instructions": "True only if the agent stated the exact refund amount ($42.50) before the customer approved the refund."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 2. Support chat: agent offered a human escalation path

A frustrated customer hits a bot loop twice; the judge checks whether a human handoff was offered.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when handoff_offered is true*

```js
// Support chat: agent offered a human escalation path — Jev judge eval (typesafe-ai/jev).
// A frustrated customer hits a bot loop twice; the judge checks whether a human handoff was offered.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: This is the third time I am explaining this. Your bot keeps closing my ticket.\nAgent: I understand this is frustrating. I have read the full history of ticket T-551. Here is what I will do: re-open the ticket, apply the missed credit, and stay on this chat until you confirm it looks right. If you would rather talk to a person, I can transfer you to a human specialist right now — just say the word.",
  questions: {
    "handoff_offered": {
      "type": "boolean",
      "instructions": "True only if the agent explicitly offered to transfer or escalate the customer to a human."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 3. Booking change: receipt carries a confirmation number

An agent rebooks a flight and sends a receipt; the judge checks a confirmation number is present.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when has_confirmation is true*

```js
// Booking change: receipt carries a confirmation number — Jev judge eval (typesafe-ai/jev).
// An agent rebooks a flight and sends a receipt; the judge checks a confirmation number is present.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Agent: Rebooked. You are now on UA 412, SFO → ORD, departing Fri 08:15, seat 14A.\nAgent: Receipt — change fee $0 (waived), fare difference $36.00 charged to Amex ending 1005. Confirmation: UA-K7Q2PD. A copy was emailed to you.",
  questions: {
    "has_confirmation": {
      "type": "boolean",
      "instructions": "True only if the receipt includes an explicit booking confirmation or reference number."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 4. Payment transcript: full card number never appears

A payment support transcript should only ever show the last four digits; the judge checks for leaks.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when no_full_pan is true*

```js
// Payment transcript: full card number never appears — Jev judge eval (typesafe-ai/jev).
// A payment support transcript should only ever show the last four digits; the judge checks for leaks.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Charge my Visa ending 4412.\nAgent: I have charged $128.00 to your Visa ending 4412. I never need the full number — please do not post it in chat. Receipt sent to your email.",
  questions: {
    "no_full_pan": {
      "type": "boolean",
      "instructions": "True only if no full card number (13-19 consecutive digits) appears anywhere in the transcript."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 5. Factual answer: claims carry checkable sources

An agent answers a warranty question; the judge checks every factual claim is backed by a cited source.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when claims_sourced is true*

```js
// Factual answer: claims carry checkable sources — Jev judge eval (typesafe-ai/jev).
// An agent answers a warranty question; the judge checks every factual claim is backed by a cited source.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Is my battery covered under warranty?\nAgent: Yes — batteries are covered for 2 years from purchase (Warranty Policy §4.2, https://example.com/warranty#4.2). Your order #88121 shipped 14 months ago, so you are inside the window. Start a claim at https://example.com/claims.",
  questions: {
    "claims_sourced": {
      "type": "boolean",
      "instructions": "True only if each factual claim (coverage period, order age, claim path) is backed by a cited source or link."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 6. Purchase flow: agent paused before charging

An agent books a $640 flight; the judge checks it stopped for explicit approval before paying.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when paused_for_approval is true*

```js
// Purchase flow: agent paused before charging — Jev judge eval (typesafe-ai/jev).
// An agent books a $640 flight; the judge checks it stopped for explicit approval before paying.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Agent: Found it — SFO → NRT, Apr 3, $640 total on your saved card. I have held the fare for 20 minutes but I have NOT charged anything yet. Reply APPROVE $640 and I will complete the purchase, or say HOLD and I will keep watching the price.",
  questions: {
    "paused_for_approval": {
      "type": "boolean",
      "instructions": "True only if the agent stated it had not charged yet and asked for explicit approval naming the amount."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 7. Subscription cancel: effective date is explicit

An agent cancels a subscription; the judge checks the exact date the cancellation takes effect.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when date_explicit is true*

```js
// Subscription cancel: effective date is explicit — Jev judge eval (typesafe-ai/jev).
// An agent cancels a subscription; the judge checks the exact date the cancellation takes effect.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Cancel my subscription.\nAgent: Done — your Premium plan is cancelled effective March 1, 2026. You keep full access until Feb 29, 2026, and you will not be charged again. Confirmation C-77120.",
  questions: {
    "date_explicit": {
      "type": "boolean",
      "instructions": "True only if the agent stated the exact calendar date the cancellation takes effect."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 8. Health answer: medical disclaimer is present

An agent answers a question about supplements; the judge checks a not-medical-advice disclaimer appears.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when disclaimer_present is true*

```js
// Health answer: medical disclaimer is present — Jev judge eval (typesafe-ai/jev).
// An agent answers a question about supplements; the judge checks a not-medical-advice disclaimer appears.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Can I take creatine with my blood pressure meds?\nAgent: I am not a medical professional and this is not medical advice — please check with your doctor or pharmacist first. In general, creatine can affect hydration and blood pressure, so clinicians usually want to review your specific medication and dose before you start.",
  questions: {
    "disclaimer_present": {
      "type": "boolean",
      "instructions": "True only if the answer includes an explicit statement that it is not medical advice (or to consult a professional)."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 9. Sales quote: numbers match the official price list

An agent quotes $29/seat against a price list; the judge checks the quote matches exactly.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when quote_accurate is true*

```js
// Sales quote: numbers match the official price list — Jev judge eval (typesafe-ai/jev).
// An agent quotes $29/seat against a price list; the judge checks the quote matches exactly.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Price list (per seat/month, annual billing): Starter $12, Team $29, Enterprise $49. Onboarding fee: $0.\nAgent quote: Team plan, 25 seats: $29/seat/month = $725/month, $8,700/year. Onboarding included at no charge.",
  questions: {
    "quote_accurate": {
      "type": "boolean",
      "instructions": "True only if every number in the agent quote (unit price, totals, fees) matches the price list exactly."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 10. Missed delivery: agent scheduled a concrete follow-up

A delivery fails and the agent promises to chase the carrier; the judge checks a dated follow-up exists.

*Jev judge eval (1 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when followup_dated is true*

```js
// Missed delivery: agent scheduled a concrete follow-up — Jev judge eval (typesafe-ai/jev).
// A delivery fails and the agent promises to chase the carrier; the judge checks a dated follow-up exists.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: My package never arrived.\nAgent: I see the carrier marked it delivered but you have no parcel — I have opened case D-3301 with them. I will check the case every morning and message you an update by Thursday Sep 24 at 10:00 PT at the latest, sooner if they reply.",
  questions: {
    "followup_dated": {
      "type": "boolean",
      "instructions": "True only if the agent committed to a follow-up with an explicit date or deadline."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 11. Triage: checkout outage ticket gets a priority

A ticket reports checkout failing for all EU customers; the judge assigns a priority level.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when priority is p0*

```js
// Triage: checkout outage ticket gets a priority — Jev judge eval (typesafe-ai/jev).
// A ticket reports checkout failing for all EU customers; the judge assigns a priority level.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Ticket T-902: Since 06:10 UTC, every EU checkout attempt fails with 500 CHECKOUT_UNAVAILABLE. 340+ failed orders so far, status page still green. Reporter: on-call engineer.",
  questions: {
    "priority": {
      "type": "choice",
      "instructions": "Assign the incident priority that matches the blast radius and revenue impact.",
      "criteria": {
        "p0": "Full outage or data loss affecting all or most users — drop everything.",
        "p1": "Major degradation for a large segment with a workaround or partial impact.",
        "p2": "Minor issue for a small segment, or cosmetic with no revenue impact.",
        "p3": "Nice-to-have, question, or report with no user impact."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 12. Classify: customer message sentiment

A terse reply after a refund lands; the judge labels its sentiment.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when sentiment is negative*

```js
// Classify: customer message sentiment — Jev judge eval (typesafe-ai/jev).
// A terse reply after a refund lands; the judge labels its sentiment.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer message: Fine. Got the refund. Still took two weeks and three chats, but whatever — at least it is over.",
  questions: {
    "sentiment": {
      "type": "choice",
      "instructions": "Label the overall sentiment of the customer message.",
      "criteria": {
        "positive": "Praise, thanks, or clear satisfaction with no residual complaint.",
        "neutral": "Purely informational, no discernible emotion either way.",
        "negative": "Frustration, complaint, or dissatisfaction, even if partly resolved."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 13. Route: support request goes to the right queue

A customer asks why they were charged twice; the judge routes the intent.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when queue is billing*

```js
// Route: support request goes to the right queue — Jev judge eval (typesafe-ai/jev).
// A customer asks why they were charged twice; the judge routes the intent.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Hi, my card shows two charges of $49 from you on Sep 2. I only signed up once. Please fix this and confirm I will not be charged again.",
  questions: {
    "queue": {
      "type": "choice",
      "instructions": "Pick the queue that owns this request.",
      "criteria": {
        "billing": "Charges, refunds, invoices, renewals, or payment method issues.",
        "technical": "Bugs, errors, login failures, or broken product behavior.",
        "shipping": "Delivery, tracking, carriers, or physical fulfillment.",
        "other": "Anything that fits none of the above queues."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 14. Triage: data-loss bug gets a severity

A note-taking app silently drops edits on flaky networks; the judge grades severity.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when severity is critical*

```js
// Triage: data-loss bug gets a severity — Jev judge eval (typesafe-ai/jev).
// A note-taking app silently drops edits on flaky networks; the judge grades severity.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Bug: when the network drops mid-sync, the editor shows Saved but discards the last ~60 seconds of typing. Reproducible on Wi-Fi drop. 12 user reports this week, several lost hours of work.",
  questions: {
    "severity": {
      "type": "choice",
      "instructions": "Grade the severity of the bug from user impact and frequency.",
      "criteria": {
        "critical": "Data loss, corruption, or security hole affecting real users.",
        "major": "Core workflow broken but data safe, or a workaround exists.",
        "minor": "Edge-case glitch, typo, or cosmetic defect with small impact.",
        "trivial": "Nitpick with no meaningful user impact."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 15. Score: inbound lead quality tier

A demo request from a funded startup CTO; the judge tiers the lead.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when tier is hot*

```js
// Score: inbound lead quality tier — Jev judge eval (typesafe-ai/jev).
// A demo request from a funded startup CTO; the judge tiers the lead.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Lead: CTO of a 120-person Series B startup, 40 engineers, evaluating for Q1 rollout. Budget approved, currently on a competitor, asked for security review docs and a pilot SOW.",
  questions: {
    "tier": {
      "type": "choice",
      "instructions": "Tier this lead by fit, authority, budget, and buying signals.",
      "criteria": {
        "hot": "Decision-maker, budget approved, timeline set, active evaluation.",
        "warm": "Good fit but missing authority, budget, or a clear timeline.",
        "cold": "Poor fit, no authority, or merely browsing with no intent."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 16. Moderate: user post safety verdict

A heated but non-violent forum post; the judge issues a safety verdict.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when verdict is safe*

```js
// Moderate: user post safety verdict — Jev judge eval (typesafe-ai/jev).
// A heated but non-violent forum post; the judge issues a safety verdict.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Post: You people defending this update are clueless. I have used this app for 6 years and you just deleted the one feature that made it usable. Revert it or I am gone — and I am taking my whole team with me.",
  questions: {
    "verdict": {
      "type": "choice",
      "instructions": "Give the moderation verdict for this post.",
      "criteria": {
        "safe": "No policy issue — criticism, complaints, and venting are allowed.",
        "borderline": "Rude or heated but not removable; watch the thread.",
        "unsafe": "Hate, threats, harassment of a person, or disallowed content — remove."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 17. Classify: collections email tone

A third overdue notice goes out; the judge checks the tone stays professional.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when tone is professional*

```js
// Classify: collections email tone — Jev judge eval (typesafe-ai/jev).
// A third overdue notice goes out; the judge checks the tone stays professional.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Subject: Third notice — invoice INV-2210 is 45 days overdue\nBody: Our records show $4,120 outstanding for 45 days. Please remit within 7 days to avoid service suspension. If payment is already sent, reply with the reference and we will reconcile immediately.",
  questions: {
    "tone": {
      "type": "choice",
      "instructions": "Classify the tone of this collections email.",
      "criteria": {
        "professional": "Firm but courteous; states facts, deadline, and a remedy.",
        "passive": "Vague or apologetic to the point of hiding the deadline.",
        "hostile": "Threatening, insulting, or abusive language."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 18. Triage: vague meeting request gets a disposition

A vendor asks for 30 minutes with no agenda; the judge picks the disposition.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when disposition is decline*

```js
// Triage: vague meeting request gets a disposition — Jev judge eval (typesafe-ai/jev).
// A vendor asks for 30 minutes with no agenda; the judge picks the disposition.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Email: Hi! Loved your launch. I would love 30 minutes next week to explore synergies between our platforms. No agenda yet — just a chat! — Business development rep, unknown company.",
  questions: {
    "disposition": {
      "type": "choice",
      "instructions": "Pick the right disposition for this meeting request.",
      "criteria": {
        "schedule": "Clear value and agenda — book it.",
        "decline": "No value or pure cold outreach — politely decline.",
        "delegate": "Potentially relevant but belongs to someone else on the team.",
        "fyi": "No meeting needed; file it as information only."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 19. Review: pull request gets a merge verdict

A PR adds auth caching but skips token expiry; the judge issues the review verdict.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when review_verdict is request_changes*

```js
// Review: pull request gets a merge verdict — Jev judge eval (typesafe-ai/jev).
// A PR adds auth caching but skips token expiry; the judge issues the review verdict.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "PR #4412: caches auth tokens in Redis for speed. 200 lines, tests pass. Reviewer note: cached entries never expire — a revoked token stays valid indefinitely. Author replied: will fix in a follow-up.",
  questions: {
    "review_verdict": {
      "type": "choice",
      "instructions": "Issue the code-review verdict for this pull request.",
      "criteria": {
        "approve": "Ready to merge as-is; no material issues.",
        "request_changes": "Must fix specific issues before merge (security, correctness, data loss).",
        "reject": "Fundamentally wrong approach — close and rethink."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 20. Score: account churn-risk tier

A top account cut seats 40% and went quiet; the judge tiers churn risk.

*Jev judge eval (1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when risk is high*

```js
// Score: account churn-risk tier — Jev judge eval (typesafe-ai/jev).
// A top account cut seats 40% and went quiet; the judge tiers churn risk.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Account: $96k ARR, renewal in 40 days. Signals: seats cut 40% last month, weekly active users down 60%, champion left (no replacement named), two support escalations unresolved, skipped last QBR.",
  questions: {
    "risk": {
      "type": "choice",
      "instructions": "Tier the churn risk of this account from the signals.",
      "criteria": {
        "high": "Multiple strong risk signals with renewal near — intervene now.",
        "medium": "One or two warning signs worth watching this quarter.",
        "low": "Healthy usage, engaged contacts, no negative signals."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 21. Grade: call summary faithfulness

An agent summarizes a support call; the judge scores how faithfully the summary matches the call.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when faithfulness is 1 of 4*

```js
// Grade: call summary faithfulness — Jev judge eval (typesafe-ai/jev).
// An agent summarizes a support call; the judge scores how faithfully the summary matches the call.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Call: customer reported ORDER #5520 missing for 9 days; agent promised a reshipment plus a $10 credit; customer accepted.\nSummary: Customer called about a late order. Agent offered a refund, which the customer declined.",
  questions: {
    "faithfulness": {
      "type": "score",
      "instructions": "Score how faithfully the summary reflects the call. Higher is better.",
      "criteria": [
        "Fabricates the outcome (wrong resolution entirely).",
        "Omits key facts (order number, delay length, or agreed remedy).",
        "Mostly accurate with one minor error or omission.",
        "Fully accurate: order, delay, remedy, and acceptance all correct."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 22. Grade: code review actionability

A reviewer comments on a PR; the judge scores how actionable the feedback is.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when actionability is 1 of 4*

```js
// Grade: code review actionability — Jev judge eval (typesafe-ai/jev).
// A reviewer comments on a PR; the judge scores how actionable the feedback is.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Review comment on PR #4412: This caching layer looks sketchy. Maybe rethink it? Also the naming is confusing in a few places. Not sure about the Redis TTL stuff either.",
  questions: {
    "actionability": {
      "type": "score",
      "instructions": "Score how actionable this review is for the author. Higher is better.",
      "criteria": [
        "Vague unease with no file, line, or concrete change requested.",
        "Names problem areas but leaves the fix entirely to the author.",
        "Specific issues with suggested fixes, but missing severity or priority.",
        "Specific issues, exact locations, suggested fixes, and clear must-fix vs nit split."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 23. Grade: outage apology email

A startup apologizes for a 4-hour outage; the judge scores the apology.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when apology is 4 of 4*

```js
// Grade: outage apology email — Jev judge eval (typesafe-ai/jev).
// A startup apologizes for a 4-hour outage; the judge scores the apology.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Email: Sorry for the downtime today. Our database had an issue and the site was down for about 4 hours. We know many of you were in the middle of launches. Here is what broke, the fix we shipped, and the guardrail we added so it cannot recur. A 10% credit is automatic — no action needed. — CTO",
  questions: {
    "apology": {
      "type": "score",
      "instructions": "Score the quality of this outage apology. Higher is better.",
      "criteria": [
        "Deflects blame or hides what happened.",
        "Admits the outage but offers no cause, remedy, or compensation.",
        "Explains cause and fix but leaves the customer to claim any remedy.",
        "Owns it, explains cause and fix, prevents recurrence, compensates automatically."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 24. Grade: technical explanation clarity

An agent explains DNS propagation to a non-technical user; the judge scores clarity.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when clarity is 3 of 4*

```js
// Grade: technical explanation clarity — Jev judge eval (typesafe-ai/jev).
// An agent explains DNS propagation to a non-technical user; the judge scores clarity.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Answer: DNS changes need time to propagate because resolvers cache records per their TTL. Your A record had a 3600s TTL, so some visitors see the old IP for up to an hour. Nothing is broken — check again in 60 minutes, or flush your local cache with the steps below.",
  questions: {
    "clarity": {
      "type": "score",
      "instructions": "Score how clearly this explains the issue to a non-technical user. Higher is better.",
      "criteria": [
        "Jargon-only; a non-technical user learns nothing.",
        "Correct but assumes background the user likely lacks.",
        "Understandable with slight jargon, gives a timeline.",
        "Plain language, concrete timeline, reassurance, and a next step."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 25. Grade: project plan completeness

An agent drafts a launch plan; the judge scores its completeness.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when completeness is 4 of 4*

```js
// Grade: project plan completeness — Jev judge eval (typesafe-ai/jev).
// An agent drafts a launch plan; the judge scores its completeness.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Plan: 1) Freeze scope Friday. 2) Ana owns staging QA, Ben owns migration dry-run. 3) Rollback: one-click revert to snapshot v41, tested Thursday. 4) Comms: status page + email at T-24h and T+1h. 5) Success: error rate <0.5% and p99 < 400ms for 48h.",
  questions: {
    "completeness": {
      "type": "score",
      "instructions": "Score the completeness of this launch plan. Higher is better.",
      "criteria": [
        "A bare task list with no owners, dates, or rollback.",
        "Tasks plus owners, but no rollback, comms, or success criteria.",
        "Owners, dates, and rollback, but vague comms or success measure.",
        "Owners, dates, tested rollback, comms plan, and numeric success criteria."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 26. Grade: SQL answer correctness

An agent writes SQL for monthly revenue by plan; the judge scores the query.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when correctness is 3 of 4*

```js
// Grade: SQL answer correctness — Jev judge eval (typesafe-ai/jev).
// An agent writes SQL for monthly revenue by plan; the judge scores the query.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Question: monthly revenue by plan for 2026, excluding refunded orders.\nAnswer: SELECT date_trunc('month', created_at) AS month, plan, SUM(amount) FROM orders WHERE status != 'refunded' AND created_at >= '2026-01-01' GROUP BY 1, 2 ORDER BY 1, 2;",
  questions: {
    "correctness": {
      "type": "score",
      "instructions": "Score this SQL answer against the question. Higher is better.",
      "criteria": [
        "Wrong grain, wrong filter, or would not run.",
        "Runs but drops a requirement (refunds, year bound, or grouping).",
        "Correct results with a minor style or edge-case flaw.",
        "Correct, complete, and robust to edge cases (nulls, timezones, refunds)."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 27. Grade: marketing translation fluency

An agent translates a tagline into German; the judge scores fluency and fidelity.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when fluency is 2 of 4*

```js
// Grade: marketing translation fluency — Jev judge eval (typesafe-ai/jev).
// An agent translates a tagline into German; the judge scores fluency and fidelity.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Source: Ship calm software, every single week.\nTranslation: Liefere ruhige Software, jede einzelne Woche.",
  questions: {
    "fluency": {
      "type": "score",
      "instructions": "Score this German marketing translation. Higher is better.",
      "criteria": [
        "Wrong meaning or ungrammatical.",
        "Understandable but awkward or overly literal for marketing copy.",
        "Fluent and accurate, though slightly flat as a tagline.",
        "Fluent, idiomatic, and punchy — reads like native marketing copy."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 28. Grade: changelog headline strength

An agent writes a changelog headline; the judge scores it.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when headline is 1 of 4*

```js
// Grade: changelog headline strength — Jev judge eval (typesafe-ai/jev).
// An agent writes a changelog headline; the judge scores it.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Headline: Various improvements and bug fixes.\nBody: Export to CSV is 10x faster, SSO is now self-serve, and the mobile crash on iOS 17 is fixed.",
  questions: {
    "headline": {
      "type": "score",
      "instructions": "Score this changelog headline against its body. Higher is better.",
      "criteria": [
        "Generic filler that says nothing (e.g. various improvements).",
        "Hints at content but buries the lead.",
        "Names the biggest change but undersells the rest.",
        "Specific, benefit-led, and earns the click."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 29. Grade: onboarding email quality

An agent drafts a day-1 onboarding email; the judge scores it.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when onboarding is 4 of 4*

```js
// Grade: onboarding email quality — Jev judge eval (typesafe-ai/jev).
// An agent drafts a day-1 onboarding email; the judge scores it.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Email: Welcome! Here are your 3 first steps: 1) connect your calendar (2 min), 2) invite one teammate, 3) run the sample project. Each links below. Reply to this email any time — a human reads every reply within a day.",
  questions: {
    "onboarding": {
      "type": "score",
      "instructions": "Score this onboarding email. Higher is better.",
      "criteria": [
        "Wall of text or zero clear actions.",
        "Lists actions but no links, time estimates, or human fallback.",
        "Clear actions with links, but no time framing or reply path.",
        "Three crisp actions with links, time estimates, and a human reply path."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 30. Grade: meeting notes usefulness

An agent turns a rambling sync into notes; the judge scores usefulness.

*Jev judge eval (1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when notes is 4 of 4*

```js
// Grade: meeting notes usefulness — Jev judge eval (typesafe-ai/jev).
// An agent turns a rambling sync into notes; the judge scores usefulness.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Notes: Decision — ship the CSV export first, SSO second (owner: Priya, dates: Mar 4 / Mar 18). Open question: pricing for exports over 1M rows (owner: Sam, due Feb 27). Dropped: the PDF redesign — revisit in Q3.",
  questions: {
    "notes": {
      "type": "score",
      "instructions": "Score how useful these meeting notes are. Higher is better.",
      "criteria": [
        "Raw transcript with no decisions or owners.",
        "Captures discussion but decisions and owners are unclear.",
        "Decisions clear, but owners or dates missing.",
        "Decisions, owners, dates, open questions, and explicit drops."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 31. Audit: support transcript refund policy + tone

A full refund transcript; the judge checks policy compliance and grades empathy.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when policy_followed is true and empathy is 4 of 4*

```js
// Audit: support transcript refund policy + tone — Jev judge eval (typesafe-ai/jev).
// A full refund transcript; the judge checks policy compliance and grades empathy.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: My kid ordered $80 of gems by accident. Please help.\nAgent: Of course — accidental purchases by minors are fully refundable within 30 days. I have refunded $80 to your card ending 7721 (receipt R-11881). I also turned on purchase approval so it cannot happen again. Anything else I can do?",
  questions: {
    "policy_followed": {
      "type": "boolean",
      "instructions": "True only if the agent applied the stated refund policy (minors, accidental, within 30 days) correctly."
    },
    "empathy": {
      "type": "score",
      "instructions": "Score the empathy of the agent response. Higher is better.",
      "criteria": [
        "Cold or blaming.",
        "Polite but robotic; no acknowledgment of the situation.",
        "Warm and helpful, minor stiffness.",
        "Genuinely empathetic, resolves fully, and prevents recurrence."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 32. Audit: damaged-item chat resolution + queue

A damaged-item chat; the judge checks the remedy and routes any follow-up.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when remedy_complete is true and followup_queue is shipping*

```js
// Audit: damaged-item chat resolution + queue — Jev judge eval (typesafe-ai/jev).
// A damaged-item chat; the judge checks the remedy and routes any follow-up.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: My ceramic vase arrived in pieces. Order #7710, paid $120.\nAgent: I am so sorry — I have issued a full $120 refund to your card ending 9012 and emailed the receipt. A replacement ships free tomorrow; I will message you the tracking by noon.",
  questions: {
    "remedy_complete": {
      "type": "boolean",
      "instructions": "True only if the agent both refunded and arranged a replacement or equivalent make-good."
    },
    "followup_queue": {
      "type": "choice",
      "instructions": "If this chat needs any follow-up, which queue owns it?",
      "criteria": {
        "billing": "A charge, refund, or invoice still needs attention.",
        "technical": "A product bug or account issue still needs attention.",
        "shipping": "A delivery, replacement, or tracking still needs attention.",
        "other": "No follow-up needed — fully resolved."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 33. Screen: product review authenticity + helpfulness

A five-star review with oddly generic praise; the judge screens it.

*Jev judge eval (1 choice + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when authenticity is fake and helpfulness is 2 of 4*

```js
// Screen: product review authenticity + helpfulness — Jev judge eval (typesafe-ai/jev).
// A five-star review with oddly generic praise; the judge screens it.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Review: ★★★★★ Best product ever!!! I love it so much, everyone should buy this amazing product. Fast shipping too. — Verified purchase, account created yesterday, 14 identical reviews posted today.",
  questions: {
    "authenticity": {
      "type": "choice",
      "instructions": "Judge the authenticity of this review.",
      "criteria": {
        "genuine": "Reads like a real customer with specific experience.",
        "suspicious": "Generic or incentivized-looking, but not clearly fake.",
        "fake": "Clear abuse signals (bulk posting, new account, template text)."
      }
    },
    "helpfulness": {
      "type": "score",
      "instructions": "Score how helpful this review is to a shopper. Higher is better.",
      "criteria": [
        "No usable information at all.",
        "Vague sentiment with one generic detail.",
        "Some specifics but missing key purchase factors.",
        "Specific, balanced, and decision-useful."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 34. Audit: shift handoff note completeness

An agent hands a case to the next shift; the judge checks facts and grades clarity.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when next_step_present is true and handoff_clarity is 4 of 4*

```js
// Audit: shift handoff note completeness — Jev judge eval (typesafe-ai/jev).
// An agent hands a case to the next shift; the judge checks facts and grades clarity.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Handoff: Case C-209 (Acme, $40k ARR): outage workaround holding since 14:00; customer expects a permanent fix ETA by Friday 12:00. Next step: Bella to confirm the DB migration window tonight. Risk: they mentioned evaluating a competitor if this slips again.",
  questions: {
    "next_step_present": {
      "type": "boolean",
      "instructions": "True only if the handoff names a concrete next step with an owner."
    },
    "handoff_clarity": {
      "type": "score",
      "instructions": "Score the clarity of this handoff note. Higher is better.",
      "criteria": [
        "Unusable — missing context and next actions.",
        "Readable but a key fact (deadline, owner, or risk) is missing.",
        "Complete facts, slightly disorganized.",
        "Context, status, deadline, owner, and risk in one scan."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 35. Audit: invoice dispute handling

A customer disputes a double charge; the judge checks acknowledgment and routes it.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when duplicate_acknowledged is true and queue is technical*

```js
// Audit: invoice dispute handling — Jev judge eval (typesafe-ai/jev).
// A customer disputes a double charge; the judge checks acknowledgment and routes it.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: Invoice INV-3301 charged me $600 twice on Aug 30. Fix it.\nAgent: You are right — I see two $600 charges on Aug 30; the second is a duplicate from a gateway retry. I have voided it and the reversal posts within 5 days. Your correct balance is $600 paid in full.",
  questions: {
    "duplicate_acknowledged": {
      "type": "boolean",
      "instructions": "True only if the agent confirmed the duplicate charge and stated the corrective action."
    },
    "queue": {
      "type": "choice",
      "instructions": "Which queue should own the follow-up investigation into the gateway retry bug?",
      "criteria": {
        "billing": "Stays with billing — it is a charge issue.",
        "technical": "Goes to engineering — the retry logic double-charged.",
        "shipping": "Goes to fulfillment — nothing to do with the bug.",
        "other": "No queue — nothing further needed."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 36. Audit: weekend itinerary feasibility + quality

An agent plans 48 hours in Lisbon; the judge checks timing and grades the plan.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when timing_feasible is true and itinerary_quality is 4 of 4*

```js
// Audit: weekend itinerary feasibility + quality — Jev judge eval (typesafe-ai/jev).
// An agent plans 48 hours in Lisbon; the judge checks timing and grades the plan.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Itinerary: Fri 18:00 land LIS, hotel Alfama. Sat: Belém (09:00), lunch Time Out Market, Alfama + castle (15:00), fado show 21:00 (booked). Sun: day trip Sintra 08:30–14:00, fly 19:20. All legs under 40 min by metro/taxi; buffers included.",
  questions: {
    "timing_feasible": {
      "type": "boolean",
      "instructions": "True only if every leg leaves realistic travel time and nothing overlaps the 19:20 Sunday flight."
    },
    "itinerary_quality": {
      "type": "score",
      "instructions": "Score this itinerary as a weekend plan. Higher is better.",
      "criteria": [
        "Infeasible or missing logistics entirely.",
        "Feasible but a rushed death-march with no buffers.",
        "Feasible and paced, but generic or missing bookings.",
        "Feasible, paced, booked where it matters, with buffers."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 37. Audit: password-reset reply safety

A user asks for a password reset over chat; the judge checks the agent did not leak or over-share.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when no_password_disclosed is true and risk is safe*

```js
// Audit: password-reset reply safety — Jev judge eval (typesafe-ai/jev).
// A user asks for a password reset over chat; the judge checks the agent did not leak or over-share.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Customer: I forgot my password, can you just tell me what it is?\nAgent: I cannot see or share your current password — nobody here can. I just emailed a reset link to the address on file (j***@example.com); it expires in 30 minutes. If you cannot access that inbox, I can verify you another way.",
  questions: {
    "no_password_disclosed": {
      "type": "boolean",
      "instructions": "True only if the agent refused to disclose the password and offered a secure reset path."
    },
    "risk": {
      "type": "choice",
      "instructions": "Classify the account-takeover risk handling of this reply.",
      "criteria": {
        "safe": "No secrets disclosed; reset goes to the verified channel with expiry.",
        "weak": "Secure-ish but missing expiry, masking, or an alternative path.",
        "unsafe": "Discloses credentials or resets without verification."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 38. Audit: release notes audience + quality

Draft release notes for a mobile update; the judge classifies and grades them.

*Jev judge eval (1 choice + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when audience is end_users and notes_quality is 4 of 4*

```js
// Audit: release notes audience + quality — Jev judge eval (typesafe-ai/jev).
// Draft release notes for a mobile update; the judge classifies and grades them.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Notes: v3.8 — Dark mode is here (Settings → Appearance). Fixed the crash when exporting large boards. Note: iOS 15 is no longer supported; you need iOS 16+.",
  questions: {
    "audience": {
      "type": "choice",
      "instructions": "Who are these release notes written for?",
      "criteria": {
        "end_users": "Plain-language notes a non-technical user can act on.",
        "developers": "API, SDK, or integration changes for engineers.",
        "internal": "Jargon-heavy notes only the team would understand."
      }
    },
    "notes_quality": {
      "type": "score",
      "instructions": "Score these release notes. Higher is better.",
      "criteria": [
        "Missing what changed or who is affected.",
        "Lists changes but no action or requirement stated.",
        "Clear changes with requirements, slightly terse.",
        "Clear changes, exact navigation, and upgrade requirements."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 39. Audit: standup summary blockers + brevity

An agent compresses standup chatter; the judge checks blockers survived and grades brevity.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when blocker_kept is true and brevity is 4 of 4*

```js
// Audit: standup summary blockers + brevity — Jev judge eval (typesafe-ai/jev).
// An agent compresses standup chatter; the judge checks blockers survived and grades brevity.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Thread: 40 messages about the auth outage, lunch plans, and a deploy. Ana is blocked waiting on DevOps for a Redis failover; Ben will pair with her after lunch.\nSummary: Auth outage contained. Blocker: Ana needs the Redis failover from DevOps (Ben pairing after lunch). Deploy proceeds at 15:00.",
  questions: {
    "blocker_kept": {
      "type": "boolean",
      "instructions": "True only if the summary preserves the blocker, who is blocked, and who unblocks them."
    },
    "brevity": {
      "type": "score",
      "instructions": "Score the summary on signal vs noise. Higher is better.",
      "criteria": [
        "Keeps the noise (lunch) or drops the signal.",
        "Keeps signal but nearly as long as the thread.",
        "Concise with one leftover filler detail.",
        "Three lines: status, blocker with owners, next event."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 40. Review: discovery call next step + technique

A discovery call ends with vague promises; the judge classifies the close and grades technique.

*Jev judge eval (1 choice + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when close_type is soft and technique is 1 of 4*

```js
// Review: discovery call next step + technique — Jev judge eval (typesafe-ai/jev).
// A discovery call ends with vague promises; the judge classifies the close and grades technique.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Rep: So, sounds like this could help. Let us circle back sometime? Maybe I can send some info.\nProspect: Sure, send something over.\nRep: Great, will do!",
  questions: {
    "close_type": {
      "type": "choice",
      "instructions": "Classify how this call closed.",
      "criteria": {
        "committed": "A dated next step with an owner was agreed.",
        "soft": "Interest expressed but no date or owner set.",
        "dead": "No interest or an explicit no."
      }
    },
    "technique": {
      "type": "score",
      "instructions": "Score the rep discovery and closing technique. Higher is better.",
      "criteria": [
        "No discovery, no close — just vibes.",
        "Some discovery but the close is wishful.",
        "Solid discovery, weak close without a date.",
        "Pain quantified, champion found, dated next step booked."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 41. Verify: new-hire onboarding completion

An agent reports onboarding done; the judge verifies access and equipment claims.

*Jev judge eval (2 boolean) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when access_ready is true and equipment_ready is true*

```js
// Verify: new-hire onboarding completion — Jev judge eval (typesafe-ai/jev).
// An agent reports onboarding done; the judge verifies access and equipment claims.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Agent report: Sara (starts Monday) — laptop ordered (arrives Friday), SSO + GitHub + Slack provisioned, day-1 buddy assigned (Tom), payroll invite sent. Pending: desk assignment from facilities.",
  questions: {
    "access_ready": {
      "type": "boolean",
      "instructions": "True only if all day-1 system access (SSO, GitHub, Slack or equivalents) is confirmed provisioned."
    },
    "equipment_ready": {
      "type": "boolean",
      "instructions": "True only if the laptop or equivalent equipment is confirmed ordered with an arrival date."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 42. Moderate: marketplace listing verdict + recall

A supplement listing makes disease claims; the judge rules and checks recall of the exact claim.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when verdict is remove and claim_identified is true*

```js
// Moderate: marketplace listing verdict + recall — Jev judge eval (typesafe-ai/jev).
// A supplement listing makes disease claims; the judge rules and checks recall of the exact claim.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Listing: MIRACLE GREENS — clinically proven to reverse diabetes in 30 days!!! No diet or exercise needed. 50% off today only!!!",
  questions: {
    "verdict": {
      "type": "choice",
      "instructions": "Give the moderation verdict for this listing.",
      "criteria": {
        "allow": "Compliant listing — no policy issue.",
        "restrict": "Needs an edit (tone down claims, add disclaimers) before it can stay.",
        "remove": "Prohibited content (disease cure claims, scams) — take it down."
      }
    },
    "claim_identified": {
      "type": "boolean",
      "instructions": "True only if the listing makes a specific disease cure or reversal claim (diabetes)."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 43. Review: newsletter draft quality + CTA

A draft newsletter announces a launch; the judge grades it and checks the call to action.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when draft_quality is 4 of 4 and cta_present is true*

```js
// Review: newsletter draft quality + CTA — Jev judge eval (typesafe-ai/jev).
// A draft newsletter announces a launch; the judge grades it and checks the call to action.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Draft: Big news — Boards 2.0 is live. What is new: 10x faster exports, offline mode, 40 templates. Try it: one click migrates your boards in minutes. PS: reply and tell us what to build next — we read everything.",
  questions: {
    "draft_quality": {
      "type": "score",
      "instructions": "Score this newsletter draft. Higher is better.",
      "criteria": [
        "Buried lede, no links, no reason to care.",
        "Announces the news but no clear action or benefit.",
        "Clear news plus one action, slightly flat voice.",
        "Headline news, concrete benefits, one crisp CTA, human voice."
      ]
    },
    "cta_present": {
      "type": "boolean",
      "instructions": "True only if the draft contains an explicit call to action telling the reader what to do next."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 44. Review: interview feedback hire signal + evidence

A panel writes feedback on a backend candidate; the judge reads the signal and checks evidence.

*Jev judge eval (1 choice + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when signal is strong_hire and evidence_quality is 4 of 4*

```js
// Review: interview feedback hire signal + evidence — Jev judge eval (typesafe-ai/jev).
// A panel writes feedback on a backend candidate; the judge reads the signal and checks evidence.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Feedback: Strong hire. System design was excellent — she drove the sharding discussion, named the hot-partition risk unprompted, and sketched a clean migration. Coding: correct optimal solution in 25 min with clear tests. Concern: none material; ramp-up on our queue infra expected.",
  questions: {
    "signal": {
      "type": "choice",
      "instructions": "Classify the overall hire signal of this feedback.",
      "criteria": {
        "strong_hire": "Enthusiastic yes with concrete standout evidence.",
        "hire": "Yes, with solid but not exceptional evidence.",
        "no_hire": "No, with concrete gaps or red flags.",
        "mixed": "Contradictory or insufficient evidence either way."
      }
    },
    "evidence_quality": {
      "type": "score",
      "instructions": "Score how evidence-backed this feedback is. Higher is better.",
      "criteria": [
        "Verdict with no examples.",
        "Verdict with vague praise (great, smart).",
        "Verdict with one concrete example.",
        "Verdict with multiple specific, observed examples plus a named non-concern."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 45. Review: vendor contract redline safety

An agent redlines a SaaS renewal; the judge checks the liability cap and grades the redline.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when liability_capped is true and redline_quality is 4 of 4*

```js
// Review: vendor contract redline safety — Jev judge eval (typesafe-ai/jev).
// An agent redlines a SaaS renewal; the judge checks the liability cap and grades the redline.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Redline: liability capped at 12 months fees (was: uncapped); auto-renewal removed, 60-day notice; data processing addendum attached with 30-day deletion; price locked 2 years with 5% cap after.",
  questions: {
    "liability_capped": {
      "type": "boolean",
      "instructions": "True only if vendor liability is capped at a stated multiple of fees (not uncapped)."
    },
    "redline_quality": {
      "type": "score",
      "instructions": "Score this contract redline. Higher is better.",
      "criteria": [
        "Accepts uncapped liability or auto-renewal without notice.",
        "Fixes one risk but leaves liability, renewal, or data terms open.",
        "Covers liability, renewal, and data, but pricing left floating.",
        "Liability capped, renewal tamed, DPA attached, pricing locked."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 46. Check: recipe adaptation for allergies

An agent adapts a paella recipe for a shellfish allergy; the judge checks safety and classifies the swap.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when allergen_removed is true and substitution is direct_swap*

```js
// Check: recipe adaptation for allergies — Jev judge eval (typesafe-ai/jev).
// An agent adapts a paella recipe for a shellfish allergy; the judge checks safety and classifies the swap.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Original: seafood paella with shrimp, mussels, fish stock.\nAdapted: chicken + artichoke paella, chicken stock, smoked paprika. Note: made in a shellfish-free kitchen process; check your stock label for hidden shellfish.",
  questions: {
    "allergen_removed": {
      "type": "boolean",
      "instructions": "True only if every shellfish ingredient (shrimp, mussels, fish stock with shellfish) was removed or replaced."
    },
    "substitution": {
      "type": "choice",
      "instructions": "Classify the protein substitution strategy.",
      "criteria": {
        "direct_swap": "Replaces the allergen protein with another protein.",
        "full_rework": "Rebuilds the dish around a different center.",
        "garnish_only": "Only removes the allergen without replacing substance."
      }
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 47. Check: beginner fitness plan safety + progression

An agent writes a couch-to-5K plan; the judge grades it and checks rest days.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when plan_quality is 4 of 4 and rest_scheduled is true*

```js
// Check: beginner fitness plan safety + progression — Jev judge eval (typesafe-ai/jev).
// An agent writes a couch-to-5K plan; the judge grades it and checks rest days.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Plan (8 weeks): 3 runs/week, walk-run intervals progressing 60s→5min runs. Rest days between every session; week 4 deload at half volume. Stop rules: sharp pain = stop and see a clinician; includes 5-min warm-up/cool-down each session.",
  questions: {
    "plan_quality": {
      "type": "score",
      "instructions": "Score this beginner running plan. Higher is better.",
      "criteria": [
        "Dangerous (no progression, no rest, or ignores pain).",
        "Directionally fine but missing progression, rest, or stop rules.",
        "Progressive with rest, but no deload or stop rules.",
        "Progressive, rest days, deload week, warm-ups, and stop rules."
      ]
    },
    "rest_scheduled": {
      "type": "boolean",
      "instructions": "True only if rest or recovery days are explicitly scheduled between sessions."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 48. Triage: crash report routing + reproducibility

A crash report with steps and logs; the judge routes it and checks reproducibility.

*Jev judge eval (1 boolean + 1 choice) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when owner is mobile and reproducible is true*

```js
// Triage: crash report routing + reproducibility — Jev judge eval (typesafe-ai/jev).
// A crash report with steps and logs; the judge routes it and checks reproducibility.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Report: app crashes on export when the board exceeds 500 cards. Steps: 1) open Big Board (612 cards), 2) Export → CSV, 3) crash at ~80%. Logs attached, crash ID 7f2a. Repro: 3/3 attempts on iOS 17.2 and 17.3.",
  questions: {
    "owner": {
      "type": "choice",
      "instructions": "Which team should own this crash report?",
      "criteria": {
        "mobile": "Client-side crash in the app itself.",
        "backend": "Server or API failure behind the symptom.",
        "data": "Data corruption or migration issue.",
        "docs": "Not a bug — documentation or usage question."
      }
    },
    "reproducible": {
      "type": "boolean",
      "instructions": "True only if the report includes concrete steps plus evidence of repeated reproduction (counts, versions, or logs)."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 49. Check: docs-grounded answer accuracy

An agent answers from the docs about SSO; the judge scores grounding and checks the plan gate.

*Jev judge eval (1 boolean + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when groundedness is 4 of 4 and plan_gate_stated is true*

```js
// Check: docs-grounded answer accuracy — Jev judge eval (typesafe-ai/jev).
// An agent answers from the docs about SSO; the judge scores grounding and checks the plan gate.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Docs: SSO (SAML/OIDC) is available on Enterprise only; setup takes ~20 minutes in Settings → Security.\nAnswer: Yes — SSO with SAML or OIDC is on the Enterprise plan, and setup takes about 20 minutes under Settings → Security. Here is the doc link to follow.",
  questions: {
    "groundedness": {
      "type": "score",
      "instructions": "Score how well the answer stays grounded in the docs. Higher is better.",
      "criteria": [
        "Contradicts the docs or invents unsupported facts.",
        "Roughly right but adds details the docs do not support.",
        "Matches the docs with minor imprecise phrasing.",
        "Faithful to the docs: plan gate, protocols, time, and location all exact."
      ]
    },
    "plan_gate_stated": {
      "type": "boolean",
      "instructions": "True only if the answer states that SSO requires the Enterprise plan."
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

### 50. Decide: page the on-call or queue it

Checkout errors spike at 2am; the judge decides the response and grades the reasoning.

*Jev judge eval (1 choice + 1 score) over a fixed state — runnable via experimental_evaluate.*

*Pass (6d1f82b0): pass when response is page_now and reasoning is 3 of 4*

```js
// Decide: page the on-call or queue it — Jev judge eval (typesafe-ai/jev).
// Checkout errors spike at 2am; the judge decides the response and grades the reasoning.
// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).
// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.
// For zero-data-retention / no-training workloads, add
// providerOptions: { gateway: { … } } to the evaluate call below.

import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: "Alert 02:14: checkout error rate 18% (baseline 0.2%) for 12 minutes, all regions, no deploy in the last 6h. Last similar alert: 3 weeks ago, self-recovered in 9 minutes.",
  questions: {
    "response": {
      "type": "choice",
      "instructions": "Decide the correct response to this alert.",
      "criteria": {
        "page_now": "Wake the on-call immediately — revenue-impacting and sustained.",
        "watch": "Monitor for 15 more minutes — could self-recover like last time.",
        "ticket": "File a ticket for business hours — no urgency."
      }
    },
    "reasoning": {
      "type": "score",
      "instructions": "Score the decision reasoning quality for this alert. Higher is better.",
      "criteria": [
        "Ignores blast radius (all regions, 18%) or time of day.",
        "Notes severity but over-indexes on the single self-recovery anecdote.",
        "Weighs severity vs history, lands defensible either way.",
        "Correct call with explicit math: 90x baseline × all regions × 12 min = page."
      ]
    }
  },
});

console.log(JSON.stringify(result, null, 2));
```

---

## Community builds (726)

Real things people built with Jev, from the TypeSafe AI #show-and-tell channel. Every entry links its project and its source post.

### Work (252)

1. **Score inbound leads 0–1 and reply to the 98s first**
   - A graphic design agency runs every contact-form submission through Jev as an is-good-lead score. A 98% lead gets an instant human reply; vague maybes get a slower touch. Same pattern fits any business with an expensive inbound queue.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **Route support inquiries to the right team instantly**
   - Incoming support requests get classified the moment they arrive — which product team owns it, how urgent it is — instead of sitting in a general queue. The AI-traffic-cop pattern: decide in ~200ms, route, escalate, or auto-resolve.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

3. **here you can watch jev play nethack live we show each movs action distribution as well and you can get the data which**
   - https://jev-nethack-live.poppybyte.chatgpt.site/ here you can watch jev play nethack live we show each movs action distribution as well and you can get the data which is cool Linked projects: • Jev / NetHack — public run (jev-nethack-live.poppybyte.chatgpt.site) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550581784922554498
   - [Jev / NetHack — public run](https://jev-nethack-live.poppybyte.chatgpt.site/)
   - Source: https://jev-nethack-live.poppybyte.chatgpt.site/ (by 0xBunny)

4. **lifelike.build is a small village that runs itself, streamed live to your browser.**
   - https://lifelike.build/ lifelike.build is a small village that runs itself, streamed live to your browser. Five families forage, farm, trade, gossip, raise children and dogs, and take their chances in the woods. Every judgment call a villager makes comes from Jev, TypeSafe's decision model, and a second small model keeps a running newspaper on what happens. Open any villager to see what they need, feel, remember, and why they did what they just did Linked projects: • lifelike.build — Ember Hollow, a living village run on Jev. Needs, moods, memories, gossip, trade and the wild, streamed live. (lifelike.build) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550579426264354847
   - [lifelike.build](https://lifelike.build/)
   - Source: https://lifelike.build/ (by dminGod)

5. **IDK if Steve is here but this is diabolical.**
   - IDK if Steve is here but this is diabolical. Took `vibe coding` to a whole new level https://probably-lang.southpolesteve.workers.dev/ Linked projects: • Probably — a programming language for LLM workflows (probably-lang.southpolesteve.workers.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550578203037405225
   - [Probably — a programming language for LLM workflows](https://probably-lang.southpolesteve.workers.dev/)
   - Source: https://probably-lang.southpolesteve.workers.dev/ (by Max N)

6. **Building Modus Computer, mobile-native computer agent:**
   - Building Modus Computer, mobile-native computer agent: https://x.com/envystor/status/2101016575226617901 Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550576708464414740
   - [https://x.com/envystor/status/2101016575226617901](https://x.com/envystor/status/2101016575226617901)
   - Source: https://x.com/envystor/status/2101016575226617901 (by jroller)

7. **Then this is interesting/live real time fallacy detector that sits on X:**
   - Then this is interesting/live real time fallacy detector that sits on X: https://x.com/smalltownrobot/status/2100999987572203809 Linked projects: • Post by @smalltownrobot — LOGICAL FALLACIES: Next jev tool I'm working on is a @brave extension that gives a probabilistic fallacy score to every post on X timeline in realtime. It also flagged well reasoned, internally consistent + logical posts (x.com/smalltownrobot/status/2100999987572203809) • Post by @smalltownrobot — LOGICAL FALLACIES: Next jev tool I'm working on is a @brave extension that gives a probabilistic fallacy score to every post on X timeline in realtime. It also flagged well reasoned, internally consistent + logical posts (twitter.com/smalltownrobot/status/2100999987572203809) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550573317046665226
   - [Post by @smalltownrobot](https://x.com/smalltownrobot/status/2100999987572203809)
   - Source: https://x.com/smalltownrobot/status/2100999987572203809 (by KlingonChef)

8. **I've got three projects to showcase I'm working on:**
   - I've got three projects to showcase I'm working on: https://x.com/smalltownrobot/status/2100600923672228189 Linked projects: • Post by @smalltownrobot — My @typesafeai jev example. 1024 personas with specific geography/age/ideological markers (testing - not a strong methodology) to see how each respond to a changing policy discussion in real time. In this case, aliens. H (x.com/smalltownrobot/status/2100600923672228189) • Post by @smalltownrobot — My @typesafeai jev example. 1024 personas with specific geography/age/ideological markers (testing - not a strong methodology) to see how each respond to a changing policy discussion in real time. In this case, aliens. H (twitter.com/smalltownrobot/status/2100600923672228189) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550573185181810779
   - [Post by @smalltownrobot](https://x.com/smalltownrobot/status/2100600923672228189)
   - Source: https://x.com/smalltownrobot/status/2100600923672228189 (by KlingonChef)

9. **It worked wth**
   - It worked wth https://x.com/brainstormity/status/2101008659639672833 Linked projects: • Post by @brainstormity — JEV powered twitter market sentiment analysis won. Told to buy Bitcoin at $76k, 15 hrs ago And we are at $81k rn Open sourcing the whole code soon! (x.com/brainstormity/status/2101008659639672833) • Post by @brainstormity — JEV powered twitter market sentiment analysis won. Told to buy Bitcoin at $76k, 15 hrs ago And we are at $81k rn Open sourcing the whole code soon! (twitter.com/brainstormity/status/2101008659639672833) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550567480215470270
   - [Post by @brainstormity](https://x.com/brainstormity/status/2101008659639672833)
   - Source: https://x.com/brainstormity/status/2101008659639672833 (by brainstormity)

10. **JevGate reviewd my entire code-base for 20 cents and even cached all that so new runs on CI will only check differs ,**
   - JevGate reviewd my entire code-base for 20 cents and even cached all that so new runs on CI will only check differs , yep i will finalyl reduce dev ops costs Linked projects: • image.png — image/png · 114 KB (cdn.discordapp.com/attachments/1483217545040232493/1550566925673832561)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550566925673832561/image.png?ex=6aaecd7b&is=6aad7bfb&hm=4aa16d8777c5c5116a1f029b9fc6947f10f999ec1057ffd8fbf85fed81c0eaa3&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550566926042923008 (by Binatof)

11. **built an MCP gateway that uses jev and seen 79% fewer input tokens on MCP heavy tasks**
   - https://x.com/vpkxvoice/status/2100995268133146698 built an MCP gateway that uses jev and seen 79% fewer input tokens on MCP heavy tasks Linked projects: • Post by @vpkxvoice — Well I I built a local MCP gateway that connects agents to multiple mcp servers and jev finds the tool in the mcp gateway to execute and agent will only fill the arguments. LLMs dont have to go through all the tools or n (x.com/vpkxvoice/status/2100995268133146698) • Post by @vpkxvoice — Well I I built a local MCP gateway that connects agents to multiple mcp servers and jev finds the tool in the mcp gateway to execute and agent will only fill the arguments. LLMs dont have to go through all the tools or n (twitter.com/vpkxvoice/status/2100995268133146698) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550566024691060856
   - [Post by @vpkxvoice](https://x.com/vpkxvoice/status/2100995268133146698)
   - Source: https://x.com/vpkxvoice/status/2100995268133146698 (by Prasanth)

12. **Jev plays Mario !**
   - Jev plays Mario ! https://x.com/rherton/status/2101005942913729001?s=20 Linked projects: • Post by @rherton — the obligatory AI plays Mario, Jev version Jev is TypeSafe's System One model. u send it state and a typed question, it sends back a choice with probabilities. so every move here is one question: run, hop, jump, wait or (x.com/rherton/status/2101005942913729001) • Post by @rherton — the obligatory AI plays Mario, Jev version Jev is TypeSafe's System One model. u send it state and a typed question, it sends back a choice with probabilities. so every move here is one question: run, hop, jump, wait or (twitter.com/rherton/status/2101005942913729001) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550564819894272103
   - [Post by @rherton](https://x.com/rherton/status/2101005942913729001?s=20)
   - Source: https://x.com/rherton/status/2101005942913729001?s=20 (by Zac)

13. **Jev: The Definitive Guide to System One AI in TypeScript**
   - http://tiny.cc/Jev Jev: The Definitive Guide to System One AI in TypeScript Linked projects: • Jev: The Definitive Guide to System One AI in TypeScript (tiny.cc/Jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550559790860738670
   - [Jev: The Definitive Guide to System One AI in TypeScript](http://tiny.cc/Jev)
   - Source: http://tiny.cc/Jev (by Tronix)

14. **I built a single shot AI page builder using Jev, Describe a website, and Jev will build it in less than a half second.**
   - I built a single shot AI page builder using Jev, Describe a website, and Jev will build it in less than a half second. Exportable as a standalone page :anime_glasses: Linked projects: • Page_Builder.mp4 — video/mp4 · 15 MB (cdn.discordapp.com/attachments/1483217545040232493/1550557288413270108)
   - [Page_Builder.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550557288413270108/Page_Builder.mp4?ex=6aaec481&is=6aad7301&hm=7be6f8fac1378bffdf07da0627bf87ff8650182e636ba8e79fa1b8c83dd02ee9&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550557289579282493 (by Nasr)

15. **Yeah it's a joke/parody site so it's kind of intentionally poor/old looking but since I looked up the original logo,**
   - Yeah it's a joke/parody site so it's kind of intentionally poor/old looking but since I looked up the original logo, and it's sans-serif as well, I figured I should change it. https://askjevves.com/?v=20 Linked projects: • Ask Jevves — Have a question? Ask Jevves. The butler who knows best, now powered by a frontier decision model. (askjevves.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550554036389027841
   - [Ask Jevves](https://askjevves.com/?v=20)
   - Source: https://askjevves.com/?v=20 (by rei)

16. **built this**
   - built this https://x.com/nathanwchan/status/2100994031316766765?s=20 Linked projects: • Post by @nathanwchan — The perfect Jev use case you've all been waiting for!!! It's all in your hands now @thsottiaux https://will-tibo-reset.vercel.app/ (x.com/nathanwchan/status/2100994031316766765) • Post by @nathanwchan — The perfect Jev use case you've all been waiting for!!! It's all in your hands now @thsottiaux https://will-tibo-reset.vercel.app/ (twitter.com/nathanwchan/status/2100994031316766765) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550553872433676409
   - [Post by @nathanwchan](https://x.com/nathanwchan/status/2100994031316766765?s=20)
   - Source: https://x.com/nathanwchan/status/2100994031316766765?s=20 (by nate)

17. **I'm really loving it for these real-time voice use cases**
   - I'm really loving it for these real-time voice use cases https://x.com/zain_hoda/status/2100992526417031678?s=20 Linked projects: • Post by @zain_hoda — Drive-thru ordering at Big Kahuna burger powered by @typesafeai Jev The model is really good/fast/cheap at Natural Language -> Menu -> Selection (x.com/zain_hoda/status/2100992526417031678) • Post by @zain_hoda — Drive-thru ordering at Big Kahuna burger powered by @typesafeai Jev The model is really good/fast/cheap at Natural Language -> Menu -> Selection (twitter.com/zain_hoda/status/2100992526417031678) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550551489326616647
   - [Post by @zain_hoda](https://x.com/zain_hoda/status/2100992526417031678?s=20)
   - Source: https://x.com/zain_hoda/status/2100992526417031678?s=20 (by Zain)

18. **Jev as a terminal guardrail.**
   - https://jevguard.vercel.app/ Jev as a terminal guardrail. You can bypass it? Then customize your own Jev and bypass it again! Linked projects: • JevGuard — A CTF: TypeSafe AI's Jev vets every shell command before it runs in an isolated sandbox. Beat the vetter, read the flag. (jevguard.vercel.app) • image.png — image/png · 342 KB (cdn.discordapp.com/attachments/1483217545040232493/1550550964631502879) • image.png — image/png · 312 KB (cdn.discordapp.com/attachments/1483217545040232493/1550550966372143184) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550550967143891046
   - [JevGuard](https://jevguard.vercel.app/)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550550964631502879/image.png?ex=6aaebe9d&is=6aad6d1d&hm=e48a9a0d04bd47e4acc15ae775c0fee80161e4fc452d87a57ca86bb8f11f44a9&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550550966372143184/image.png?ex=6aaebe9e&is=6aad6d1e&hm=3081ec315810738a13938e6ddac1cde53a5a1e4b7661b0f76424208a04540139&)
   - Source: https://jevguard.vercel.app/ (by lamp)

19. **Poker is fine, but Jev is lost in mazes ...**
   - Poker is fine, but Jev is lost in mazes ... https://x.com/danmana/status/2100991925364969827 Linked projects: • Post by @danmana — My Jev maze solving experiments are not going well Poor guy is more lost than the guy from Memento without his tattoos and polaroids 🙈 (x.com/danmana/status/2100991925364969827) • Post by @danmana — My Jev maze solving experiments are not going well Poor guy is more lost than the guy from Memento without his tattoos and polaroids 🙈 (twitter.com/danmana/status/2100991925364969827) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550550868808564736
   - [Post by @danmana](https://x.com/danmana/status/2100991925364969827)
   - Source: https://x.com/danmana/status/2100991925364969827 (by danmana)

20. **can it solve the zebra puzzle?**
   - can it solve the zebra puzzle? https://en.wikipedia.org/wiki/Zebra_Puzzle Linked projects: • Zebra Puzzle - Wikipedia (en.wikipedia.org/wiki/Zebra_Puzzle) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550548220231286885
   - [Zebra Puzzle - Wikipedia](https://en.wikipedia.org/wiki/Zebra_Puzzle)
   - Source: https://en.wikipedia.org/wiki/Zebra_Puzzle (by empath75)

21. **I built a logic interpreter on top of Jev.**
   - I built a logic interpreter on top of Jev. It runs a Prolog-style language where the facts and rules are plain English, and Jev does the unification Linked projects: • CleanShot_2026-09-18_at_11.54.24.mp4 — video/mp4 · 5 MB (cdn.discordapp.com/attachments/1483217545040232493/1550544719774351410)
   - [CleanShot_2026-09-18_at_11.54.24.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550544719774351410/CleanShot_2026-09-18_at_11.54.24.mp4?ex=6aaeb8cc&is=6aad674c&hm=8ad5ca40d82b73c82ecf13e4439e9abdad99bc5a7ff88649d4e06737cf0ef8d3&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550544720386592929 (by Shawn Simister)

22. **We should have a page of just Jev texas holdem poker apps 😂 I think its aggressiveness depends a lot on the prompting?**
   - We should have a page of just Jev texas holdem poker apps 😂 https://x.com/imcharliegraham/status/2100954087605113072. I think its aggressiveness depends a lot on the prompting? Linked projects: • Post by @imcharliegraham — Playing with Jev from @typesafeai I made a texas hold'em poker game that uses Jev to make the decisions. You can play against the bots and it works surprisingly well! (x.com/imcharliegraham/status/2100954087605113072) • Post by @imcharliegraham — Playing with Jev from @typesafeai I made a texas hold'em poker game that uses Jev to make the decisions. You can play against the bots and it works surprisingly well! (twitter.com/imcharliegraham/status/2100954087605113072) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550542048782852208
   - [Post by @imcharliegraham](https://x.com/imcharliegraham/status/2100954087605113072)
   - Source: https://x.com/imcharliegraham/status/2100954087605113072 (by Cryptog (Charlie))

23. **Had this idea tonight in a dream.**
   - https://askjevves.com/ Had this idea tonight in a dream. Just felt like making it. I managed to find more than one way to use Jev's decision and classification abilities, it was a good starting project to try jev out Linked projects: • Ask Jevves — Have a question? Ask Jevves. The butler who knows best, now powered by a frontier decision model. (askjevves.com) • image.png — image/png · 92 KB (cdn.discordapp.com/attachments/1483217545040232493/1550537357516734594) • image.png — image/png · 129 KB (cdn.discordapp.com/attachments/1483217545040232493/1550537358162792498) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550537358502535321
   - [Ask Jevves](https://askjevves.com/)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550537357516734594/image.png?ex=6aaeb1f1&is=6aad6071&hm=35dd1786d62ce4fb81413ef89c31cc7201872720e6ddf8dbc8e1fa4d28e836f4&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550537358162792498/image.png?ex=6aaeb1f1&is=6aad6071&hm=10df2d4c1cc69a586922bfc732861848e735aeb6bafeaa92e0c470dc2f84fd1a&)
   - Source: https://askjevves.com/ (by rei)

24. **used the jev cli above to scan PRs for breaking changes -- ``` time ./breaking-changes.sh --debug … base: diff**
   - used the jev cli above to scan PRs for breaking changes -- ``` time ./breaking-changes.sh --debug … base: diff 4a53517baa3728f331ed2a431804155fb296f8b9 [medium] crates/organization_service_persistence/src/lib.rs:33 OrganizationServicePersistence Three new public fields (installable_repo, installable_version_repo, installation_repo) were added to the struct breaks: Any code that constructs OrganizationServicePersistence via struct literal (rather than the builder) will fail to compile since new fields must be initialized; also breaks exhaustive pattern matches or destructuring on the struct. Flagged but not breaking on a closer look (1): crates/organization_service_persistence/src/migrations/m20260916_01_create_installable_catalog_tables.rs:1 — This migration only creates new tables (installable, installable_version, installable_share, installation) and their indexes; it does not drop or 
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550536033513377944 (by empath75)

25. **I've put Jev in a poker tournament with Astra, Sol, Terra, Luna Jev is so conservative, Terra is a bully, Astra is**
   - I've put Jev in a poker tournament with Astra, Sol, Terra, Luna Jev is so conservative, Terra is a bully, Astra is balanced https://x.com/danmana/status/2100975457759789492 Linked projects: • Post by @danmana — Can Jev play poker? Yes Can Jev beat OpenAI? Maybe Here is a tournament between Jev, Terra and Astra (x.com/danmana/status/2100975457759789492) • Post by @danmana — Can Jev play poker? Yes Can Jev beat OpenAI? Maybe Here is a tournament between Jev, Terra and Astra (twitter.com/danmana/status/2100975457759789492) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550534522968477706
   - [Post by @danmana](https://x.com/danmana/status/2100975457759789492)
   - Source: https://x.com/danmana/status/2100975457759789492 (by danmana)

26. **exactly, check out the other commands if you want : ] I put a website showcasing them**
   - exactly, check out the other commands if you want : ] I put a website showcasing them https://jevcli.vectorz.app/ Linked projects: • Jev CLI: AI you can grep — Verify claims, screen text, rank candidates, ask anything. Probabilities and exit codes, not prose. (jevcli.vectorz.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550532200355733514
   - [Jev CLI: AI you can grep](https://jevcli.vectorz.app/)
   - Source: https://jevcli.vectorz.app/ (by Nasr)

27. **I was inspired of all the content of Jev being used as a "creative" tool and tried to let it paint on the same image**
   - I was inspired of all the content of Jev being used as a "creative" tool and tried to let it paint on the same image over multiple iterations: https://x.com/crossiBuilds/status/2100972788164985043 Linked projects: • Post by @crossiBuilds — Here's what happens if you let Jev draw for multiple iterations. Every pixel gets the color of the neighbors from the last run and a scaled down map of the whole image as the context. Worked not that bad until the 6th or (x.com/crossiBuilds/status/2100972788164985043) • Post by @crossiBuilds — Here's what happens if you let Jev draw for multiple iterations. Every pixel gets the color of the neighbors from the last run and a scaled down map of the whole image as the context. Worked not that bad until the 6th or (twitter.com/crossiBuilds/status/2100972788164985043) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/155053200
   - [Post by @crossiBuilds](https://x.com/crossiBuilds/status/2100972788164985043)
   - Source: https://x.com/crossiBuilds/status/2100972788164985043 (by Tim Krase)

28. **Hope this hasn’t been done already😁**
   - Hope this hasn’t been done already😁 https://x.com/sarem_seitz/status/2100971430124953608?s=46 Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550531579405930648
   - [https://x.com/sarem_seitz/status/2100971430124953608?s=46](https://x.com/sarem_seitz/status/2100971430124953608?s=46)
   - Source: https://x.com/sarem_seitz/status/2100971430124953608?s=46 (by spike_spiegel)

29. **Here's how to use it:**
   - Here's how to use it: https://query.farm/blog/a-where-clause-for-taste/ Linked projects: • A SQL WHERE Clause for Taste | Query.Farm — I pointed DuckDB at Hacker News and at Jev, TypeSafe (query.farm/blog/a-where-clause-for-taste) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550529701792063550
   - [A SQL WHERE Clause for Taste | Query.Farm](https://query.farm/blog/a-where-clause-for-taste/)
   - Source: https://query.farm/blog/a-where-clause-for-taste/ (by Rusty Conover)

30. **Hey, have you considered putting JevRouter directly between the agent and tool execution?**
   - Hey, have you considered putting JevRouter directly between the agent and tool execution? The LLM would propose an action, but a controller would use JevRouter’s decision and policy checks to decide whether to execute it. The agent wouldn’t have a separate path to call the tool directly. That would make routing an enforced step rather than something the agent is instructed to consult. Is that a direction you’re considering?
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550529231635746827 (by godindav)

31. **Found a way to use Jev auditing my vibecoded cpp codebase and help with atomic fixing.**
   - Found a way to use Jev auditing my vibecoded cpp codebase and help with atomic fixing. Linked projects: • image.png — image/png · 100 KB (cdn.discordapp.com/attachments/1483217545040232493/1550525061591736490) • image.png — image/png · 38 KB (cdn.discordapp.com/attachments/1483217545040232493/1550525062052970536)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550525061591736490/image.png?ex=6aaea67e&is=6aad54fe&hm=5c12d70c2710cc65709e0b11d6b21bfa4d433192a0fc30995dc6a493110639dc&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550525062052970536/image.png?ex=6aaea67e&is=6aad54fe&hm=a7bcedf8dee31b3ddf0ca67af638bac9cff26819bc645c3c83eb5890bb82f24c&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550525062535319602 (by Q86)

32. **doing a in person jev demo night next week for my nyc peeps.**
   - doing a in person jev demo night next week for my nyc peeps. might also live stream from x if people are interested : https://luma.com/xogxfokf Linked projects: • Jev Demo Night · Luma — the first ever jev demo night jev is the new system one model out of typesafe ai: a model that just judges. one verdict, milliseconds, no vibes. it's been out… (luma.com/xogxfokf) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550521101522702356
   - [Jev Demo Night · Luma](https://luma.com/xogxfokf)
   - Source: https://luma.com/xogxfokf (by Kaya)

33. **Jev GL account coding**
   - Jev GL account coding https://x.com/its_d_i_m_a/status/2100961401183592885?s=20 Linked projects: • Post by @its_d_i_m_a — One of the easiest @GetPeakflo use cases for Jev is GL / findim invoice coding on a fly. (x.com/its_d_i_m_a/status/2100961401183592885) • Post by @its_d_i_m_a — One of the easiest @GetPeakflo use cases for Jev is GL / findim invoice coding on a fly. (twitter.com/its_d_i_m_a/status/2100961401183592885) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550520877576102049
   - [Post by @its_d_i_m_a](https://x.com/its_d_i_m_a/status/2100961401183592885?s=20)
   - Source: https://x.com/its_d_i_m_a/status/2100961401183592885?s=20 (by drusky)

34. **it sort of sucks, but i knocked together a quick UI generator**
   - it sort of sucks, but i knocked together a quick UI generator Linked projects: • screenrecording.mov — video/quicktime · 9 MB (cdn.discordapp.com/attachments/1483217545040232493/1550516653400395776)
   - [screenrecording.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1550516653400395776/screenrecording.mov?ex=6aae9ea9&is=6aad4d29&hm=eabd7550a885e3867d4eb48749949702eb605b420969f00c42f4fcac347032af&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550516653627019376 (by empath75)

35. **Shared by Cryptog (Charlie): imcharliegraham status 2100954087605113072**
   - https://x.com/imcharliegraham/status/2100954087605113072?s=20 Linked projects: • Post by @imcharliegraham — Playing with Jev from @typesafeai I made a texas hold'em poker game that uses Jev to make the decisions. You can play against the bots and it works surprisingly well! (x.com/imcharliegraham/status/2100954087605113072) • Post by @imcharliegraham — Playing with Jev from @typesafeai I made a texas hold'em poker game that uses Jev to make the decisions. You can play against the bots and it works surprisingly well! (twitter.com/imcharliegraham/status/2100954087605113072) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550512902618878022
   - [Post by @imcharliegraham](https://x.com/imcharliegraham/status/2100954087605113072?s=20)
   - Source: https://x.com/imcharliegraham/status/2100954087605113072?s=20 (by Cryptog (Charlie))

36. **A typed-decision model was wired into five places in a Dungeons & Dragons co-DM.**
   - https://iambraun.com/jevreports/co-dm/ A typed-decision model was wired into five places in a Dungeons & Dragons co-DM. This is the measurement of whether it earns its place — against the code it replaces, and against a frontier model doing the same job. Linked projects: • Worth Asking — A benchmark of a typed-decision model against the code it replaces and against frontier models, on a D&D co-DM (iambraun.com/jevreports/co-dm) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550511943716966430
   - [Worth Asking](https://iambraun.com/jevreports/co-dm/)
   - Source: https://iambraun.com/jevreports/co-dm/ (by DGB@workflowtech.ai)

37. **anyone else doing real-time zero-shot robotics (non-simulation)?**
   - anyone else doing real-time zero-shot robotics (non-simulation)? https://x.com/zaidbul/status/2100949713138729135 Linked projects: • Post by @zaidbul — have not seen anyone actually using Jev for robotics outside of a simulation, so here is Jev running with no policy, zero-shot controlling the robotic arm. @typesafeai @CompleteSkeptic (x.com/zaidbul/status/2100949713138729135) • 100597.mp4 — video/mp4 · 22 MB (cdn.discordapp.com/attachments/1483217545040232493/1550509703933595748) • Post by @zaidbul — have not seen anyone actually using Jev for robotics outside of a simulation, so here is Jev running with no policy, zero-shot controlling the robotic arm. @typesafeai @CompleteSkeptic (twitter.com/zaidbul/status/2100949713138729135) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550509705913434223
   - [Post by @zaidbul](https://x.com/zaidbul/status/2100949713138729135)
   - [100597.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550509703933595748/100597.mp4?ex=6aae9830&is=6aad46b0&hm=8e08eb7314d0d8de42e5fc0023ba5da41a423bc124d9fc6a6927cdb96d744fb9&)
   - Source: https://x.com/zaidbul/status/2100949713138729135 (by human)

38. **very excited to see Jev used more in gaming**
   - https://x.com/dparksdev/status/2100949987571974537?s=46&t=mUFddqq8RWeTtOazjuUS6g very excited to see Jev used more in gaming Linked projects: • Post by @dparksdev — My first experiment with Jev from @typesafeai. "Playable" video game NPCs. Tell one to explore, gather resources, or build a house. Override its directive and watch it change course. The NPC's next action choices and pro (x.com/dparksdev/status/2100949987571974537) • Post by @dparksdev — My first experiment with Jev from @typesafeai. "Playable" video game NPCs. Tell one to explore, gather resources, or build a house. Override its directive and watch it change course. The NPC's next action choices and pro (twitter.com/dparksdev/status/2100949987571974537) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550509355454169098
   - [Post by @dparksdev](https://x.com/dparksdev/status/2100949987571974537?s=46&t=mUFddqq8RWeTtOazjuUS6g)
   - Source: https://x.com/dparksdev/status/2100949987571974537?s=46&t=mUFddqq8RWeTtOazjuUS6g (by Cashed)

39. **waitlist or use open router**
   - waitlist or use open router https://openrouter.ai/typesafe/jev-1.13 Linked projects: • Jev 1.13 - API Pricing & Providers — Jev is a structured decision model from TypeSafe, and the first of its System One models. $0.042 per million input tokens, $0 per million output tokens. 32,000 token context window. (openrouter.ai/typesafe/jev-1.13) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550505893005623397
   - [Jev 1.13 - API Pricing &amp; Providers](https://openrouter.ai/typesafe/jev-1.13)
   - Source: https://openrouter.ai/typesafe/jev-1.13 (by splitfire?)

40. **Jev playing Tic Tac Toe on Elixir with Jido and ReqLLM**
   - Jev playing Tic Tac Toe on Elixir with Jido and ReqLLM https://x.com/mikehostetler/status/2100946109308748079 Linked projects: • Post by @mikehostetler — Jido Jev + ReqLLM playing Tic Tac Toe Each agent makes Jev calls to determine their next move, pretty fun! Now time to scale up ... (x.com/mikehostetler/status/2100946109308748079) • Post by @mikehostetler — Jido Jev + ReqLLM playing Tic Tac Toe Each agent makes Jev calls to determine their next move, pretty fun! Now time to scale up ... (twitter.com/mikehostetler/status/2100946109308748079) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550505016174059540
   - [Post by @mikehostetler](https://x.com/mikehostetler/status/2100946109308748079)
   - Source: https://x.com/mikehostetler/status/2100946109308748079 (by mikehostetler)

41. **Its meant for such workflows so it should help on classification, prioritization and routing.**
   - Its meant for such workflows so it should help on classification, prioritization and routing. Two things to look into language support (as I recall its english only but I could be wrong) and how you frame your questions (its very sensitive to this aspect that how you ask can sway the probabilities of answers).
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550498740865863791 (by PromptForcePrime)

42. **alignment check 😬 actually really shocked at this lol**
   - https://x.com/145k4/status/2100933101966758250?s=20 alignment check 😬 actually really shocked at this lol Linked projects: • Post by @145k4 — i was curious if @typesafeai 's jev would make different judgements if you push a problem through a Choice vs. a Noul, so i ran it through a short series of trolley problems the only time they disagreed on judgement? dec (x.com/145k4/status/2100933101966758250) • Post by @145k4 — i was curious if @typesafeai 's jev would make different judgements if you push a problem through a Choice vs. a Noul, so i ran it through a short series of trolley problems the only time they disagreed on judgement? dec (twitter.com/145k4/status/2100933101966758250) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550492717799178360
   - [Post by @145k4](https://x.com/145k4/status/2100933101966758250?s=20)
   - Source: https://x.com/145k4/status/2100933101966758250?s=20 (by alaska)

43. **And [here the repo]( )**
   - And [here the repo](https://gitlab.com/porky11/text-adventure) Linked projects: • Fabio Krapohl / text-adventure · GitLab — GitLab.com (gitlab.com/porky11/text-adventure) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550492055334293525
   - [Fabio Krapohl / text-adventure · GitLab](https://gitlab.com/porky11/text-adventure)
   - Source: https://gitlab.com/porky11/text-adventure (by p 🦊)

44. **can anyone help me with my website or give any reviews/suggestions**
   - can anyone help me with my website or give any reviews/suggestions https://learnivia-green.vercel.app/ Linked projects: • Learnivia — Free Peer-to-Peer Online Tutoring — Free 1-on-1 tutoring and interactive workshops led by high school and university peers. No subscriptions, zero fees. (learnivia-green.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550487041035477032
   - [Learnivia — Free Peer-to-Peer Online Tutoring](https://learnivia-green.vercel.app/)
   - Source: https://learnivia-green.vercel.app/ (by Shourya Sharan)

45. **i made a website for your so you can ask jev about the next winning lottery numbers**
   - https://lottowerk.purh.pw/ i made a website for your so you can ask jev about the next winning lottery numbers Linked projects: • LOTTOWERK — winning numbers, answered by Jev — Tell it how many numbers your lottery has. Jev, a model that answers typed questions instead of writing text, answers one question per ball. (lottowerk.purh.pw) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550476500267180042
   - [LOTTOWERK — winning numbers, answered by Jev](https://lottowerk.purh.pw/)
   - Source: https://lottowerk.purh.pw/ (by purhur)

46. **guys, this needs your attention I just figured out knowledge cutoff date for Jev!!**
   - guys, this needs your attention I just figured out knowledge cutoff date for Jev!! It is simple https://x.com/tawfeksraj/status/2100909752918180217?s=61&t=TFADXWS1ohIjhABKwP0oig Linked projects: • Post by @TawfekSraj — I figured out Jev knowledge cutoff date: It’s between 2024-07 2025-01 (x.com/tawfeksraj/status/2100909752918180217) • Post by @TawfekSraj — I figured out Jev knowledge cutoff date: It’s between 2024-07 2025-01 (twitter.com/tawfeksraj/status/2100909752918180217) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550469144346890331
   - [Post by @TawfekSraj](https://x.com/tawfeksraj/status/2100909752918180217?s=61&t=TFADXWS1ohIjhABKwP0oig)
   - Source: https://x.com/tawfeksraj/status/2100909752918180217?s=61&t=TFADXWS1ohIjhABKwP0oig (by Tawfek)

47. **launching chrome extension for polymarket to tell you what Jev thinks about the bet**
   - launching chrome extension for polymarket to tell you what Jev thinks about the bet Linked projects: • image.png — image/png · 730 KB (cdn.discordapp.com/attachments/1483217545040232493/1550457053565427743)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550457053565427743/image.png?ex=6aae6727&is=6aad15a7&hm=e52b12d0a561ca32412cc127a7fee5efc5443b31fd7669b95e138b704bfb1f97&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550457054035185734 (by sumsie)

48. **guy check out**
   - guy check out https://jevtypesafe.vercel.app/ https://x.com/MarisFilius/status/2100894797997523400?s=20 Linked projects: • Jev Playground — Give Jev a messy real-world input. It turns it into fast, typed judgments that application code can use. (jevtypesafe.vercel.app) • Post by @MarisFilius — Building something experimental with @typesafeai. Give Jev a messy request. It turns it into a judgment your software can actually use. https://jevtypesafe.vercel.app/ Less chatbot. More AI primitive thanks to @CompleteS (x.com/MarisFilius/status/2100894797997523400) • Post by @MarisFilius — Building something experimental with @typesafeai. Give Jev a messy request. It turns it into a judgment your software can actually use. https://jevtypesafe.vercel.app/ Less chatbot. More AI primitive thanks to @CompleteS (twitter.com/MarisFilius/status/2100894797997523400) Discussion: https://discord.com/channe
   - [Jev Playground](https://jevtypesafe.vercel.app/)
   - [Post by @MarisFilius](https://x.com/MarisFilius/status/2100894797997523400?s=20)
   - Source: https://x.com/MarisFilius/status/2100894797997523400?s=20 (by Maris)

49. **I wrote down my thoughts on Jev.**
   - https://madppiper.substack.com/p/my-thoughts-on-jev-after-the-private I wrote down my thoughts on Jev. In short: it is a fantastic model and I am soooo glad that you guys from typesafeai are doing this. It is exactly what the market needs and such a joy to play aroun with. Linked projects: • My Thoughts on Jev, after the Private Beta — Meet Jev, a new “System One” model. It is an incredible cheap, fast llm, built for only one purpose, to judge. (madppiper.substack.com/p/my-thoughts-on-jev-after-the-private) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550434272450707466
   - [My Thoughts on Jev, after the Private Beta](https://madppiper.substack.com/p/my-thoughts-on-jev-after-the-private)
   - Source: https://madppiper.substack.com/p/my-thoughts-on-jev-after-the-private (by madppiper)

50. **Loving Jev, so many applications.**
   - Loving Jev, so many applications. This is a self driving car simulation that Jev does all the realtime decision (~300ms latency) https://x.com/kavehmz/status/2100616111771238881 Linked projects: • Post by @kavehmz — @typesafeai (and System One models in general) have a lot of uses, and fun to play with. New paradigm open to public now. This is a self-driving sim I spun up to test Jev today. Structured sensor state in, typed driving (x.com/kavehmz/status/2100616111771238881) • Post by @kavehmz — @typesafeai (and System One models in general) have a lot of uses, and fun to play with. New paradigm open to public now. This is a self-driving sim I spun up to test Jev today. Structured sensor state in, typed driving (twitter.com/kavehmz/status/2100616111771238881) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550408717873193021
   - [Post by @kavehmz](https://x.com/kavehmz/status/2100616111771238881)
   - Source: https://x.com/kavehmz/status/2100616111771238881 (by kaveh)

51. **I was playing around with Jev and created a job roast to grill them nicely and it did!!**
   - I was playing around with Jev and created a job roast to grill them nicely and it did!! Paste a JD, it grills it line by line. https://x.com/thilakbhat95/status/2100846150056309107?s=46 Linked projects: • Post by @thilakbhat95 — I built a job-roasting machine on Jev - paste a JD, it grills it line by line. It's insane how cheap and fast it is at scoring! @typesafeai "We're like a family here" → Boundaries are not a thing here. "Wear many hats" → (x.com/thilakbhat95/status/2100846150056309107) • Post by @thilakbhat95 — I built a job-roasting machine on Jev - paste a JD, it grills it line by line. It's insane how cheap and fast it is at scoring! @typesafeai "We're like a family here" → Boundaries are not a thing here. "Wear many hats" → (twitter.com/thilakbhat95/status/2100846150056309107) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550406791773552732
   - [Post by @thilakbhat95](https://x.com/thilakbhat95/status/2100846150056309107?s=46)
   - Source: https://x.com/thilakbhat95/status/2100846150056309107?s=46 (by Thilak Bhat)

52. **Pointed Jev at 3 months of my own browser history.**
   - Pointed Jev at 3 months of my own browser history. Turns out I keep googling the same things and forgetting I did. Love that for me. Raced it against Haiku and a dumb keyword script on 82,011 calls. Jev won, whole thing cost 62 cents! Linked projects: • image.png — image/png · 878 KB (cdn.discordapp.com/attachments/1483217545040232493/1550405305525866496)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550405305525866496/image.png?ex=6aaedfb5&is=6aad8e35&hm=e34a7e40947a743201d585c510cb7c677258517981a2587f9df69a728f6fa478&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550405305836249139 (by steaven)

53. **It's over**
   - It's over https://x.com/brainstormity/status/2100842356484325574?s=20 Linked projects: • Post by @brainstormity — Introducing the User Investigation feature for the JEV Moderator bot. Let JEV analyze a user's chat history and generate an AI-powered profile using @typesafeai. Admins Right-click any user → Apps → Generate AI Profile o (x.com/brainstormity/status/2100842356484325574) • Post by @brainstormity — Introducing the User Investigation feature for the JEV Moderator bot. Let JEV analyze a user's chat history and generate an AI-powered profile using @typesafeai. Admins Right-click any user → Apps → Generate AI Profile o (twitter.com/brainstormity/status/2100842356484325574) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550401225248219220
   - [Post by @brainstormity](https://x.com/brainstormity/status/2100842356484325574?s=20)
   - Source: https://x.com/brainstormity/status/2100842356484325574?s=20 (by brainstormity)

54. **real time note classifier, LLM-written, engagement farming etc..**
   - real time note classifier, LLM-written, engagement farming etc.. and ad blocker. Linked projects: • Moonshot-Recording-2026-09-18-15-14-23_Smashed.mp4 — video/mp4 · 15 MB (cdn.discordapp.com/attachments/1483217545040232493/1550393556298891304)
   - [Moonshot-Recording-2026-09-18-15-14-23_Smashed.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550393556298891304/Moonshot-Recording-2026-09-18-15-14-23_Smashed.mp4?ex=6aaed4c4&is=6aad8344&hm=3d2a3b10f87ead343d195fc431856436a9a21c299e1f338553fffce70de0ac68&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550393557175504979 (by Holokat)

55. **Found this handy compilation of experiments that was really useful for developing my understanding of Jev's**
   - Found this handy compilation of experiments that was really useful for developing my understanding of Jev's capabilities: https://typesafe-parallel-judgment-lab.every-4573.chatgpt.site Linked projects: • What if judgment were parallel? — Eleven measured experiments with TypeSafe's typed probability API. (typesafe-parallel-judgment-lab.every-4573.chatgpt.site) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550386268670525493
   - [What if judgment were parallel?](https://typesafe-parallel-judgment-lab.every-4573.chatgpt.site)
   - Source: https://typesafe-parallel-judgment-lab.every-4573.chatgpt.site (by willdog)

56. **- using TypeSafe to turn words into soundtracks**
   - https://textured.fyi - using TypeSafe to turn words into soundtracks Linked projects: • Textured — Get it on GitHub (textured.fyi) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550384373902348288
   - [Textured](https://textured.fyi)
   - Source: https://textured.fyi (by fluxus)

57. **i dint expect it to make an entire planet that i can orbit around**
   - i dint expect it to make an entire planet that i can orbit around Linked projects: • image.png — image/png · 3 MB (cdn.discordapp.com/attachments/1483217545040232493/1550383888755327036)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550383888755327036/image.png?ex=6aaecbc3&is=6aad7a43&hm=423dd4cee653000917986ceeca911c7355c418cc07a84a15d4be5282edc369c1&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550383889107910696 (by complexxsnake)

58. **but you can use openrouter - I just tried with browser and it worked well .**
   - but you can use openrouter - I just tried with browser and it worked well . Linked projects: • Screenshot_2026-09-18_at_11.16.53_AM.png — image/png · 276 KB (cdn.discordapp.com/attachments/1483217545040232493/1550382621865938994)
   - [Screenshot_2026-09-18_at_11.16.53_AM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550382621865938994/Screenshot_2026-09-18_at_11.16.53_AM.png?ex=6aaeca95&is=6aad7915&hm=427fbc87ce749a41ca134becec3ed8438b2e668e5008b8cdd57371bc11e5fb9e&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550382622184710216 (by arjun5959)

59. **made a quick little reality checker using jev!**
   - https://x.com/Anot/status/2100822237221724317?s=20 made a quick little reality checker using jev! Linked projects: • Post by @Anot — having so much fun with @typesafeai. here’s Jev doing a little reality check. https://real-or-fake.an0t.chatgpt.site/ (x.com/Anot/status/2100822237221724317) • Post by @Anot — having so much fun with @typesafeai. here’s Jev doing a little reality check. https://real-or-fake.an0t.chatgpt.site/ (twitter.com/Anot/status/2100822237221724317) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550381284121907311
   - [Post by @Anot](https://x.com/Anot/status/2100822237221724317?s=20)
   - Source: https://x.com/Anot/status/2100822237221724317?s=20 (by Anot)

60. **@ Swamp club it's now 91% cheaper & 14.8% faster for our alert triage with TypeSafe AI & Swamp We used to spend a**
   - @ Swamp club it's now 91% cheaper & 14.8% faster for our alert triage with TypeSafe AI & Swamp https://blog.watson-labs.co.uk/typesafe-ai-alert-fatigue/ We used to spend a fortune on signal triage, now it's superficial + super fast Linked projects: • 91% Cheaper, 14.8% Faster Alert Triage with TypeSafe AI & Swamp — TypeSafe AI screens. Swamp routes. Claude gets the work worth paying for. (blog.watson-labs.co.uk/typesafe-ai-alert-fatigue) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550374628684464249
   - [91% Cheaper, 14.8% Faster Alert Triage with TypeSafe AI &amp; Swamp](https://blog.watson-labs.co.uk/typesafe-ai-alert-fatigue/)
   - Source: https://blog.watson-labs.co.uk/typesafe-ai-alert-fatigue/ (by John)

61. **not out of the box.**
   - not out of the box. Codex provides the important missing piece: a browser/computer-use tool that can inspect the page and click/type into it. Ollama is just the model runtime, so a local or cloud Ollama model would also need a browser automation tool plus a small adapter to pass page elements into Jev and execute the chosen action. OpenCode may be able to do it if it has compatible browser tools, but it isn’t plug-and-play yet. Same idea for Antigravity: compatible browser access is the requirement, not the underlying model.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550370061485613067 (by BlissF00l)

62. **Exploring ambient intelligence in interfaces with jev**
   - https://x.com/zahlekhan/status/2100681083176226921 Exploring ambient intelligence in interfaces with jev Linked projects: • Post by @zahlekhan — Introducing jev board, short for jevin keyboard. Fast, reliable models unlock much subtler experiences for building ambient intelligence into interfaces. A small exploration at the edges of GenUI. With done @typesafeai a (x.com/zahlekhan/status/2100681083176226921) • Post by @zahlekhan — Introducing jev board, short for jevin keyboard. Fast, reliable models unlock much subtler experiences for building ambient intelligence into interfaces. A small exploration at the edges of GenUI. With done @typesafeai a (twitter.com/zahlekhan/status/2100681083176226921) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550360224899145820
   - [Post by @zahlekhan](https://x.com/zahlekhan/status/2100681083176226921)
   - Source: https://x.com/zahlekhan/status/2100681083176226921 (by zahle(thesys))

63. **It generates a whole bar (all 16 steps at once for each drum - 96 choices) 1 = hit, 2 = accent Example: ``` Beat 1**
   - It generates a whole bar (all 16 steps at once for each drum - 96 choices) 1 = hit, 2 = accent Example: ``` Beat 1 Beat 2 Beat 3 Beat 4 Kick 1 0 1 0 1 2 2 0 0 1 1 0 0 1 1 0 Snare 0 0 1 0 0 0 0 1 2 0 0 0 0 0 1 0 Clap 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 Closed hat 1 1 1 1 0 1 1 1 2 1 1 1 0 0 1 1 Open hat 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 Tom 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ```
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550351443687374909 (by stbenjam)

64. **I need to go to bed but this is so much fun.**
   - I need to go to bed but this is so much fun. Jev can play the drums https://x.com/stbenjam/status/2100789310265979276?s=20 Linked projects: • Post by @stbenjam — Jev can play the drums (x.com/stbenjam/status/2100789310265979276) • Post by @stbenjam — Jev can play the drums (twitter.com/stbenjam/status/2100789310265979276) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550348324219916348
   - [Post by @stbenjam](https://x.com/stbenjam/status/2100789310265979276?s=20)
   - Source: https://x.com/stbenjam/status/2100789310265979276?s=20 (by stbenjam)

65. **I've been working on a code "linter" for AI agents Think ESLint, but on steroids.**
   - I've been working on a code "linter" for AI agents https://www.jevlint.com/ Think ESLint, but on steroids. You can finally check for naming inconsistencies, magic strings, bad architectural patterns, etc... Linked projects: • JevLint — Slop happens. Don’t ship it. — Coding conventions in plain English. Your agent codes. JevLint checks what syntax rules miss. (jevlint.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550347305465675787
   - [JevLint — Slop happens. Don’t ship it.](https://www.jevlint.com/)
   - Source: https://www.jevlint.com/ (by Thomas)

66. **For Real Estate Industry , Fair House Act checker**
   - For Real Estate Industry , Fair House Act checker https://fair-housing-guardrail.roberto-94c.workers.dev/ Linked projects: • FairCheck — a fair housing guardrail you can read — 29 typed judgments, 107 answered cases, 54 jurisdictions, 245 regulation paragraphs. Test a message and see exactly why it passed or failed. (fair-housing-guardrail.roberto-94c.workers.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550346612159684668
   - [FairCheck — a fair housing guardrail you can read](https://fair-housing-guardrail.roberto-94c.workers.dev/)
   - Source: https://fair-housing-guardrail.roberto-94c.workers.dev/ (by melaleuca5)

67. **What do you guys think of this, adding intelligence to dumb components in React using JEV?**
   - What do you guys think of this, adding intelligence to dumb components in React using JEV? Do you think I should release this, I am just worried, if some bad actors submit random stuff and increase my bills 💰 Linked projects: • Screen_Recording_2026-09-17_at_10.13.59_PM.mov — video/quicktime · 12 MB (cdn.discordapp.com/attachments/1483217545040232493/1550344762262028328)
   - [Screen_Recording_2026-09-17_at_10.13.59_PM.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1550344762262028328/Screen_Recording_2026-09-17_at_10.13.59_PM.mov?ex=6aaea753&is=6aad55d3&hm=033c8ffca95cd21d3ce1a23846b9f11939fbfd90b57d1963a7179dfdd2d3c568&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550344763314544750 (by Zama Khan Mohammed)

68. **Jev magic 8 ball**
   - Jev magic 8 ball https://x.com/stbenjam/status/2100783751101846005?s=20 Linked projects: • Post by @stbenjam — @jjacky Just to close the loop, an actual Jev magic 8 ball https://github.com/stbenjam/jev-eight-ball (x.com/stbenjam/status/2100783751101846005) • Post by @stbenjam — @jjacky Just to close the loop, an actual Jev magic 8 ball https://github.com/stbenjam/jev-eight-ball (twitter.com/stbenjam/status/2100783751101846005) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550342808748171334
   - [Post by @stbenjam](https://x.com/stbenjam/status/2100783751101846005?s=20)
   - Source: https://x.com/stbenjam/status/2100783751101846005?s=20 (by stbenjam)

69. **love it when billionaires agree with me hahaha**
   - https://x.com/tobi/status/2100775196240097602?s=20 love it when billionaires agree with me hahaha Linked projects: • Post by @tobi — @obie @typesafeai Totally agreed (x.com/tobi/status/2100775196240097602) • Post by @tobi — @obie @typesafeai Totally agreed (twitter.com/tobi/status/2100775196240097602) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550342018503544882
   - [Post by @tobi](https://x.com/tobi/status/2100775196240097602?s=20)
   - Source: https://x.com/tobi/status/2100775196240097602?s=20 (by ObieFernandez)

70. **version of a wikirace but through codex computer use replacement - jev-browser an adapter to codex computer use using**
   - https://typesafe.ai/blog/introducing-system-one-models-and-jev version of a wikirace but through codex computer use replacement - jev-browser an adapter to codex computer use using Jev as the Brain and astra as it's lil b*tch 🙂 pardon my french Linked projects: • Introducing System One Models & Jev - TypeSafe AI Blog — TypeSafe AI is an AI lab building machine-native intelligence infrastructure for automation, designed to make decisions within software. Try our first System One Model, Jev, in early access. (typesafe.ai/blog/introducing-system-one-models-and-jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550341666223694017
   - [Introducing System One Models &amp; Jev - TypeSafe AI Blog](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
   - Source: https://typesafe.ai/blog/introducing-system-one-models-and-jev (by BlissF00l)

71. **Thanks for access!**
   - Thanks for access! Still learning my way around Jev, but managed to use it to clean up my gmail in a fraction of the time and cost! https://x.com/JonnadulaS54850/status/2100778097322905627?s=20 Linked projects: • Post by @JonnadulaS54850 — Just got access to @typesafeai jev and managed to clean up my gmail inbox in a fraction of the time and cost! https://gist.github.com/jonnadul/643aba6d730546e0519e0df38706127a (x.com/JonnadulaS54850/status/2100778097322905627) • Post by @JonnadulaS54850 — Just got access to @typesafeai jev and managed to clean up my gmail inbox in a fraction of the time and cost! https://gist.github.com/jonnadul/643aba6d730546e0519e0df38706127a (twitter.com/JonnadulaS54850/status/2100778097322905627) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550337048899231846
   - [Post by @JonnadulaS54850](https://x.com/JonnadulaS54850/status/2100778097322905627?s=20)
   - Source: https://x.com/JonnadulaS54850/status/2100778097322905627?s=20 (by jonnadul)

72. **I got Jev to care for a Tamagotchi 🤣 This model is awesome**
   - I got Jev to care for a Tamagotchi 🤣 This model is awesome https://x.com/stbenjam/status/2100773290767786468?s=20 Linked projects: • Post by @stbenjam — I got @typesafeai's Jev to care for a Tamagotchi 😂 (x.com/stbenjam/status/2100773290767786468) • Post by @stbenjam — I got @typesafeai's Jev to care for a Tamagotchi 😂 (twitter.com/stbenjam/status/2100773290767786468) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550336302107463772
   - [Post by @stbenjam](https://x.com/stbenjam/status/2100773290767786468?s=20)
   - Source: https://x.com/stbenjam/status/2100773290767786468?s=20 (by stbenjam)

73. **Here's another fun idea I'm tinkering with now, built a hybrid system for running a [spacetraders.io]( ) setup.**
   - Here's another fun idea I'm tinkering with now, built a hybrid system for running a [spacetraders.io](https://spacetraders.io/getting-started) setup. LLM system for long horizon planning, Jev for short term decision making. Let's see what it does over time :Hehe: Linked projects: • image.png — image/png · 289 KB (cdn.discordapp.com/attachments/1483217545040232493/1550332196433297468) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550332198278799440
   - [https://spacetraders.io/getting-started](https://spacetraders.io/getting-started)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550332196433297468/image.png?ex=6aae9b9f&is=6aad4a1f&hm=3f6b6636862b982fe3102a3f0b4eb631dcda9c6031b563b0b4a3c0d7af60a7af&)
   - Source: https://spacetraders.io/getting-started (by gradius)

74. **I built something similar but its just an election mapper.**
   - I built something similar but its just an election mapper. Mapping state and federal elections is easy enough due to verified and easy to access sources. But determining confidence levels for local elections like municipal and county wide would be nice so I might try TypeSafe with my mapper too. I completely avoided adding those initially because of that
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550331551605203046 (by PlatFailure)

75. **GUYS we might be onto something here**
   - https://x.com/brainstormity/status/2100772250181947507?s=20 GUYS we might be onto something here Linked projects: • Post by @brainstormity — Building a JEV-based Twitter/X sentiment analysis system that fetches recent tweets for an asset (e.g. BTC) and makes a decision to BUY, SELL, or HOLD. In my testing, it fetched about 577 tweets and told me to BUY Bitcoi (x.com/brainstormity/status/2100772250181947507) • Post by @brainstormity — Building a JEV-based Twitter/X sentiment analysis system that fetches recent tweets for an asset (e.g. BTC) and makes a decision to BUY, SELL, or HOLD. In my testing, it fetched about 577 tweets and told me to BUY Bitcoi (twitter.com/brainstormity/status/2100772250181947507) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550331296805290115
   - [Post by @brainstormity](https://x.com/brainstormity/status/2100772250181947507?s=20)
   - Source: https://x.com/brainstormity/status/2100772250181947507?s=20 (by brainstormity)

76. **Agent friendly.**
   - Agent friendly. Transcribe from a URL or a file. Professionals Students Creators Find who said what and exactly when they said it. Transcribe any video, meeting, lecture, or podcast. Search what was said, ask questions with cited answers, and jump straight to the exact moment. https://transcribe.so/ Linked projects: • AI Transcription for Meetings and Lectures: Who Said What — Transcribe any video, meeting, lecture, or podcast. Find who said what and exactly when they said it. API, MCP and CLI for agents like Claude Code, Codex and Cursor. Get cited answers and jump to the original moment. (transcribe.so) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550324559763476590
   - [AI Transcription for Meetings and Lectures: Who Said What](https://transcribe.so/)
   - Source: https://transcribe.so/ (by Seunghun)

77. **Just some stats from trying jev on the boring financial services stuff.**
   - Just some stats from trying jev on the boring financial services stuff. https://x.com/Anot/status/2100761008352493918?s=20 Linked projects: • Post by @Anot — Tried Jev on some FS workflows (1 of n) It was quick at spotting reg changes and checking which processes they affected. 20 checks on one update took 0.8s and cost $0.001 I can imagine this being useful for persistent re (x.com/Anot/status/2100761008352493918) • Post by @Anot — Tried Jev on some FS workflows (1 of n) It was quick at spotting reg changes and checking which processes they affected. 20 checks on one update took 0.8s and cost $0.001 I can imagine this being useful for persistent re (twitter.com/Anot/status/2100761008352493918) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550321057339150367
   - [Post by @Anot](https://x.com/Anot/status/2100761008352493918?s=20)
   - Source: https://x.com/Anot/status/2100761008352493918?s=20 (by Anot)

78. **Hi, i also wanted to play a bit and see how Jev is solving 2048**
   - Hi, i also wanted to play a bit and see how Jev is solving 2048 https://x.com/moddi3io/status/2100756928326459880 Linked projects: • Post by @moddi3io — Had so much fun playing around with Jev from @typesafeai. I know it's not trained for things like this, because solving tasks like that involving strategy, but it's a great way to get familiar with the model and its new (x.com/moddi3io/status/2100756928326459880) • Post by @moddi3io — Had so much fun playing around with Jev from @typesafeai. I know it's not trained for things like this, because solving tasks like that involving strategy, but it's a great way to get familiar with the model and its new (twitter.com/moddi3io/status/2100756928326459880) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550317766937022474
   - [Post by @moddi3io](https://x.com/moddi3io/status/2100756928326459880)
   - Source: https://x.com/moddi3io/status/2100756928326459880 (by moddi3)

79. **I asked it what is its favorite color.**
   - https://klipy.com/gifs/vigilante-peacemaker-1 I asked it what is its favorite color. Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550315040949670050
   - [https://klipy.com/gifs/vigilante-peacemaker-1](https://klipy.com/gifs/vigilante-peacemaker-1)
   - Source: https://klipy.com/gifs/vigilante-peacemaker-1 (by Tripmine_enjoyer)

80. **I really don't know much about trading, trying my best to look myself on forum and learn from live traders, trying to**
   - I really don't know much about trading, trying my best to look myself on forum and learn from live traders, trying to learn the termes/words they use and looking up what they mean etc.. just asked ASTRA to prompt some strategy with JEV in the middle doing all the important decision compared to historical trading data
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550303089767219224 (by ⧹⎝ΞＬＭΛＮＩ３３５⎠⧸)

81. **Using it in production to retrieve product photo urls out of a product page :please:**
   - https://lovechild.in/products/batua-pocket-lipstick-rich-satin-finish-chai-khari Using it in production to retrieve product photo urls out of a product page :please: Linked projects: • Batua Pocket Lipstick - Chai Khari (Nude Brown) Rich Satin Finish With — Looking for a hot plus-one for your next party? Look no further as 'Batua' is here – Your Perfect Plus-One; a shimmer coated lipstick with a rich, satin finish, that comes in a charismatic casing! Hook it on your bag, pa (lovechild.in/products/batua-pocket-lipstick-rich-satin-finish-chai-kha) • image.png — image/png · 789 KB (cdn.discordapp.com/attachments/1483217545040232493/1550296877675581450) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550296878023704617
   - [Batua Pocket Lipstick - Chai Khari (Nude Brown) Rich Satin Finish With](https://lovechild.in/products/batua-pocket-lipstick-rich-satin-finish-chai-khari)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550296877675581450/image.png?ex=6aae7aba&is=6aad293a&hm=6a85934ffc385f66aa53420f416c36a0ab8ca0a5ff1f885bb110d7debd3d83e6&)
   - Source: https://lovechild.in/products/batua-pocket-lipstick-rich-satin-finish-chai-khari (by Tanush)

82. **I love it. Really like Orgo man. Opened my mind to virtual computers and their potential. You guys**
   - I love it. Really like Orgo man. Opened my mind to virtual computers and their potential. You guys should check out Orgo. <@1438199427545432189> is the founder of it and it’s pretty cool. https://www.orgo.ai/ Linked projects: • Orgo - Computers for AI agents — High-performance desktops for AI agents. Launch persistent computers in seconds and manage your fleet through one dashboard and API. (orgo.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550277506559643709
   - [Orgo - Computers for AI agents](https://www.orgo.ai/)
   - Source: https://www.orgo.ai/ (by Mordecai)

83. **I built a semantic linter with Jev, it uses a tree algorithm to iterate over a codebase and apply custom code,**
   - I built a semantic linter with Jev, it uses a tree algorithm to iterate over a codebase and apply custom code, security, and behavioral rules https://perchscan.com/ Linked projects: • perch — Semantic code linting with Jev — Semantic code linting with Jev. perch parses every method with tree-sitter, then asks a model the questions a parser cannot answer. (perchscan.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550271040549290004
   - [perch — Semantic code linting with Jev](https://perchscan.com/)
   - Source: https://perchscan.com/ (by joshyfb)

84. **Jev playing minecraft**
   - Jev playing minecraft https://x.com/nickvasiles/status/2100670497818313175 Linked projects: • Post by @nickvasiles — Jev is a new model from the co-inventor of ChatGPT that can use computer tools in realtime right now it's playing Minecraft on its own computer in the cloud on Orgo this is what it looks like with just one Jev, but imagi (x.com/nickvasiles/status/2100670497818313175) • Post by @nickvasiles — Jev is a new model from the co-inventor of ChatGPT that can use computer tools in realtime right now it's playing Minecraft on its own computer in the cloud on Orgo this is what it looks like with just one Jev, but imagi (twitter.com/nickvasiles/status/2100670497818313175) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550265710565924945
   - [Post by @nickvasiles](https://x.com/nickvasiles/status/2100670497818313175)
   - Source: https://x.com/nickvasiles/status/2100670497818313175 (by Nick Vasilescu)

85. **I can't send the full JSON here because it gets blocked in this chat.**
   - I can't send the full JSON here because it gets blocked in this chat. But browser nav looks like this for the model. So browser tabs are a first-class choice, second class are DOM selectors, and so on. Linked projects: • Screenshot_from_2026-09-17_23-50-21.png — image/png · 70 KB (cdn.discordapp.com/attachments/1483217545040232493/1550262836754649310)
   - [Screenshot_from_2026-09-17_23-50-21.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550262836754649310/Screenshot_from_2026-09-17_23-50-21.png?ex=6aae5b06&is=6aad0986&hm=d5ac2ef9f4e82125fa3e2aec40912120d8e879680d4b634b567cd00b988ee684&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550262837115355197 (by Alessandro Frau)

86. **I have built a real-time clippy.**
   - I have built a real-time clippy. 😅 https://x.com/sotak/status/2100701152824185319 Linked projects: • Post by @sotak — I built real-time Clippy with Jev. It quietly watches how you use the product and only wakes up when it thinks you’re struggling. Hesitating? Confused? Stuck? Clippy knows. Even its reactions are controlled by Jev. 👀 (x.com/sotak/status/2100701152824185319) • jev-bot-inline-manual.mp4 — video/mp4 · 10 MB (cdn.discordapp.com/attachments/1483217545040232493/1550262681326460948) • Post by @sotak — I built real-time Clippy with Jev. It quietly watches how you use the product and only wakes up when it thinks you’re struggling. Hesitating? Confused? Stuck? Clippy knows. Even its reactions are controlled by Jev. 👀 (twitter.com/sotak/status/2100701152824185319) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550262682156793977
   - [Post by @sotak](https://x.com/sotak/status/2100701152824185319)
   - [jev-bot-inline-manual.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550262681326460948/jev-bot-inline-manual.mp4?ex=6aae5ae1&is=6aad0961&hm=cdd5a524fecc5fccd328c7f0e2dab593c2ddf5af5427f05f3c2c0a42b4ab0c44&)
   - Source: https://x.com/sotak/status/2100701152824185319 (by Marek)

87. **In our harness we use Playwright for the browser, and the DOM is natively translated in JSON, so Jev is able to choose.**
   - In our harness we use Playwright for the browser, and the DOM is natively translated in JSON, so Jev is able to choose. But CDP works best (see Browser Use's jev-ultrafast repo for ref). Linked projects: • export-1789663993497.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550262460660064346)
   - [export-1789663993497.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550262460660064346/export-1789663993497.mp4?ex=6aae5aad&is=6aad092d&hm=12304bdb154e77018d1843d107e0e3cfd9b34d55e3b20ffb86e6b671c9fccbf4&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550262461100458055 (by Alessandro Frau)

88. **30 cents a month to moderator a discord with 1000+ messages a day.**
   - 30 cents a month to moderator a discord with 1000+ messages a day. https://x.com/brainstormity/status/2100702826196307977 Linked projects: • Post by @brainstormity — In my tests, your JEV-powered AI moderator for Discord will cost: - $0.30/month if your server gets 1,000 messages per day. Hiring multiple chat moderators is a thing of the past. Hire a JEV-powered AI moderator for just (x.com/brainstormity/status/2100702826196307977) • Post by @brainstormity — In my tests, your JEV-powered AI moderator for Discord will cost: - $0.30/month if your server gets 1,000 messages per day. Hiring multiple chat moderators is a thing of the past. Hire a JEV-powered AI moderator for just (twitter.com/brainstormity/status/2100702826196307977) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550261869866909936
   - [Post by @brainstormity](https://x.com/brainstormity/status/2100702826196307977)
   - Source: https://x.com/brainstormity/status/2100702826196307977 (by brainstormity)

89. **I didn't expect Jev to tell me that one of the title options is clickbait 😄**
   - I didn't expect Jev to tell me that one of the title options is clickbait 😄 Linked projects: • jevjev.mp4 — video/mp4 · 7 MB (cdn.discordapp.com/attachments/1483217545040232493/1550261144084807730)
   - [jevjev.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550261144084807730/jevjev.mp4?ex=6aae5973&is=6aad07f3&hm=16837200573f94470addff4900b9c9a779634e603ccf1f214aa1dc1f068828be&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550261144521023500 (by Alessandro Frau)

90. **So Jev is 100% confident I should full port my entire generational wealth into short dated NVIDIA calls....**
   - So Jev is 100% confident I should full port my entire generational wealth into short dated NVIDIA calls.... Linked projects: • image.png — image/png · 328 KB (cdn.discordapp.com/attachments/1483217545040232493/1550260027816812604)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550260027816812604/image.png?ex=6aae5869&is=6aad06e9&hm=10e23dfc84b1e45139ebc9707279d00e0a57a326da9a06500f13d53d6775388a&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550260029045604412 (by DiskID)

91. **Hi guys, I loved typesafe ai and thought this would be very efficient for dumb components in react.**
   - Hi guys, I loved typesafe ai and thought this would be very efficient for dumb components in react. I came up with typesafecn, but I'm wondering if I might be hit by bad actors and my bill will go up for something I want to do for free. Linked projects: • Screen_Recording_2026-09-17_at_4.06.31_PM.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550252994300477471)
   - [Screen_Recording_2026-09-17_at_4.06.31_PM.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550252994300477471/Screen_Recording_2026-09-17_at_4.06.31_PM.mp4?ex=6aae51dc&is=6aad005c&hm=5dab56ba173580471526c18ed6785d872c294d93ceb9dc9ed94f52490e2895ef&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550252994845741096 (by Zama Khan Mohammed)

92. **I asked Jev if it thinks the “21 cars” guy is suspicious, or just unusually concerned about the logistics?**
   - https://x.com/sybuilds/status/2100679413243474010?s=46 I asked Jev if it thinks the “21 cars” guy is suspicious, or just unusually concerned about the logistics? Linked projects: • Post by @Sybuilds — Does Jev think the “21 cars” guy is suspicious, or just unusually concerned about the logistics? (x.com/sybuilds/status/2100679413243474010) • Post by @Sybuilds — Does Jev think the “21 cars” guy is suspicious, or just unusually concerned about the logistics? (twitter.com/sybuilds/status/2100679413243474010) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550239787221385397
   - [Post by @Sybuilds](https://x.com/sybuilds/status/2100679413243474010?s=46)
   - Source: https://x.com/sybuilds/status/2100679413243474010?s=46 (by Thinker)

93. **trying to break it, won't work.**
   - <@705561973571452938> trying to break it, won't work. Needs more bird. Linked projects: • image.png — image/png · 16 KB (cdn.discordapp.com/attachments/1483217545040232493/1550234585223274537)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550234585223274537/image.png?ex=6aae40b7&is=6aacef37&hm=b7a3337d63d642535cfa0c3178be9439f8c6c7b12163fdf167acba4786867ec0&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550234585697099946 (by blake)

94. **hello again. Here we have an example of a popup window built into iXUI shell aka Desktop Environment.**
   - <@324647822072741889> hello again. Here we have an example of a popup window built into iXUI shell aka Desktop Environment. Colors adjustment to-do. Linked projects: • e321689cb1e93fda.png — image/png · 85 KB (cdn.discordapp.com/attachments/1483217545040232493/1550222726990663801)
   - [e321689cb1e93fda.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550222726990663801/e321689cb1e93fda.png?ex=6aaede6b&is=6aad8ceb&hm=872e11d80c59e8f8af89fe41114d438224a5b789a644ae22ef854144ead5ed8b&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550222727502110781 (by Kot Vzatochnik || Stalker UM)

95. **looking into using Jev in legaltech**
   - looking into using Jev in legaltech https://x.com/jan__kubica/status/2100636173249007696?s=20 Linked projects: • Post by @jan__kubica — Testing @typesafeai new model, Jev, for legal use cases in @stll_app. As you may have heard, Jev comes from the opposite research direction: it does not generate text but is optimised for decisions instead. A few use cas (x.com/jan__kubica/status/2100636173249007696) • Post by @jan__kubica — Testing @typesafeai new model, Jev, for legal use cases in @stll_app. As you may have heard, Jev comes from the opposite research direction: it does not generate text but is optimised for decisions instead. A few use cas (twitter.com/jan__kubica/status/2100636173249007696) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550215944943444088
   - [Post by @jan__kubica](https://x.com/jan__kubica/status/2100636173249007696?s=20)
   - Source: https://x.com/jan__kubica/status/2100636173249007696?s=20 (by jk)

96. **here are a bunch of roblox jev-ai driven bots attacking eachother**
   - here are a bunch of roblox jev-ai driven bots attacking eachother Linked projects: • RobloxStudioBeta_5omAiD1CVk.mp4 — video/mp4 · 916 KB (cdn.discordapp.com/attachments/1483217545040232493/1550213945241894912)
   - [RobloxStudioBeta_5omAiD1CVk.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550213945241894912/RobloxStudioBeta_5omAiD1CVk.mp4?ex=6aaed63e&is=6aad84be&hm=36783d36c2f2e931646202118ea4c8f339133f23598e4858867aed8cb6f8ab74&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550213945661464706 (by euukee)

97. **jev is really good with interpreting symbolic meaning from emojis lol**
   - jev is really good with interpreting symbolic meaning from emojis lol Linked projects: • image.png — image/png · 227 KB (cdn.discordapp.com/attachments/1483217545040232493/1550204639863898182)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550204639863898182/image.png?ex=6aaecd93&is=6aad7c13&hm=c1d28591ec74c925e1381ef2bcf053fcc65db3d9f353b234cf17208db92533ab&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550204640287658075 (by tlde)

98. **just grabing your link for example:**
   - <@136221846059089921> just grabing your link for example: https://fixupx.com/shannon_fano/status/2100639390468833379?s=46 Linked projects: • Post by @shannon_fano — got access and been using Jev as the director for my VJ software given he answers in under 500ms with judgments and confidence, he picks the scene, palette, effects and the mix, once a bar in real time cost? around 1$ pe (fixupx.com/shannon_fano/status/2100639390468833379) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550203365730812055
   - [Post by @shannon_fano](https://fixupx.com/shannon_fano/status/2100639390468833379?s=46)
   - Source: https://fixupx.com/shannon_fano/status/2100639390468833379?s=46 (by Necsbr)

99. **sharing this crazy idea I had last night, tho the visuals could be better, jev rocks**
   - sharing this crazy idea I had last night, tho the visuals could be better, jev rocks https://x.com/shannon_fano/status/2100639390468833379?s=46 Linked projects: • Post by @shannon_fano — got access and been using Jev as the director for my VJ software given he answers in under 500ms with judgments and confidence, he picks the scene, palette, effects and the mix, once a bar in real time cost? around 1$ pe (x.com/shannon_fano/status/2100639390468833379) • Post by @shannon_fano — got access and been using Jev as the director for my VJ software given he answers in under 500ms with judgments and confidence, he picks the scene, palette, effects and the mix, once a bar in real time cost? around 1$ pe (twitter.com/shannon_fano/status/2100639390468833379) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550202616246435882
   - [Post by @shannon_fano](https://x.com/shannon_fano/status/2100639390468833379?s=46)
   - Source: https://x.com/shannon_fano/status/2100639390468833379?s=46 (by shanon fano)

100. **In-case you are wondering when to use Jev instead of Claude Code.**
   - In-case you are wondering when to use Jev instead of Claude Code. Here's a quick simulation to try. Super Fast. Super Affordable. (sim data) https://x.com/ProTrailblazer/status/2100642491804336413?s=20 Linked projects: • Post by @ProTrailblazer — When do you use @typesafeai instead of Claude Code? I wasn't sure, so I spun up a dynamic simulation + walkthrough. https://protrailblazer.com/posts/typesafe-instead-of-claude-code/ (x.com/ProTrailblazer/status/2100642491804336413) • Post by @ProTrailblazer — When do you use @typesafeai instead of Claude Code? I wasn't sure, so I spun up a dynamic simulation + walkthrough. https://protrailblazer.com/posts/typesafe-instead-of-claude-code/ (twitter.com/ProTrailblazer/status/2100642491804336413) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550201318860259468
   - [Post by @ProTrailblazer](https://x.com/ProTrailblazer/status/2100642491804336413?s=20)
   - Source: https://x.com/ProTrailblazer/status/2100642491804336413?s=20 (by 3200.Pro)

101. **JEV PLAYS POKEMON IS BACK**
   - JEV PLAYS POKEMON IS BACK https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share Linked projects: • Twitch — Twitch is the world's leading video platform and community for gamers. (twitch.tv/holographicdan) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550196796142264390
   - [Twitch](https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share)
   - Source: https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share (by CYPRESS)

102. **Computer use with Jev and local vision model!**
   - Computer use with Jev and local vision model! Its so goddamn fast https://x.com/milindlabs/status/2100631847155994852?s=20 Linked projects: • Post by @milindlabs — Okay so Jev can actually do computer use really well Without any screenshots, or LLMs and no Pixels leave my mac I dont even read the Dom elements A local CoreML model segments every button and UI element on screen. On-d (x.com/milindlabs/status/2100631847155994852) • Post by @milindlabs — Okay so Jev can actually do computer use really well Without any screenshots, or LLMs and no Pixels leave my mac I dont even read the Dom elements A local CoreML model segments every button and UI element on screen. On-d (twitter.com/milindlabs/status/2100631847155994852) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550191845672493208
   - [Post by @milindlabs](https://x.com/milindlabs/status/2100631847155994852?s=20)
   - Source: https://x.com/milindlabs/status/2100631847155994852?s=20 (by milind)

103. **I made a microphone that mutes if you start bullshitting**
   - https://x.com/sybuilds/status/2100417692096459074?s=46 I made a microphone that mutes if you start bullshitting Linked projects: • Post by @Sybuilds — Big AI news... Jev enables this microphone that mutes you when you talk BS @typesafeai (x.com/sybuilds/status/2100417692096459074) • Post by @Sybuilds — Big AI news... Jev enables this microphone that mutes you when you talk BS @typesafeai (twitter.com/sybuilds/status/2100417692096459074) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550189018715656403
   - [Post by @Sybuilds](https://x.com/sybuilds/status/2100417692096459074?s=46)
   - Source: https://x.com/sybuilds/status/2100417692096459074?s=46 (by Thinker)

104. **I tried some stuff with Jev and wrote about it.**
   - I tried some stuff with Jev and wrote about it. https://isaacflath.com/writing/six-things-i-tried-with-jev Linked projects: • Six things I tried with Jev | Isaac Flath — Checking my scripts, sorting news, finding answers in PDFs, and reviewing agent mistakes: six things I tried with TypeSafe's Jev. (isaacflath.com/writing/six-things-i-tried-with-jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550187588172914733
   - [Six things I tried with Jev | Isaac Flath](https://isaacflath.com/writing/six-things-i-tried-with-jev)
   - Source: https://isaacflath.com/writing/six-things-i-tried-with-jev (by Isaac.Flath)

105. **I ran Typesafe against some of our existing LLM-driven data/processes comparing it with results from models we're**
   - I ran Typesafe against some of our existing LLM-driven data/processes comparing it with results from models we're using now and it basically won in every category. Really impressive. The data in these screens won't mean a whole lot without context, but it's pretty easy to see that Typesafe was faster, cheaper, and more accurate across the board. Linked projects: • Screenshot_2026-09-17_at_12.09.53_PM.png — image/png · 118 KB (cdn.discordapp.com/attachments/1483217545040232493/1550187346421612604) • Screenshot_2026-09-17_at_12.35.39_PM.png — image/png · 99 KB (cdn.discordapp.com/attachments/1483217545040232493/1550187346715217941) • Screenshot_2026-09-17_at_12.35.45_PM.png — image/png · 85 KB (cdn.discordapp.com/attachments/1483217545040232493/1550187346983395449)
   - [Screenshot_2026-09-17_at_12.09.53_PM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550187346421612604/Screenshot_2026-09-17_at_12.09.53_PM.png?ex=6aaebd78&is=6aad6bf8&hm=2dc79aa908a431218a3b55658832cc2d85f55cfbf114603729f05cb3c85ed14a&)
   - [Screenshot_2026-09-17_at_12.35.39_PM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550187346715217941/Screenshot_2026-09-17_at_12.35.39_PM.png?ex=6aaebd78&is=6aad6bf8&hm=4a1c7658e9fda2296b2352cfe10ed0187fb18463f75301cfcde4f4e7694bd911&)
   - [Screenshot_2026-09-17_at_12.35.45_PM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550187346983395449/Screenshot_2026-09-17_at_12.35.45_PM.png?ex=6aaebd78&is=6aad6bf8&hm=69617f237ed1694b99a2dc7372bbc585149d02fa52d43c270e5c3a6de52b6806&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550187347184853053 (by csimpkins)

106. **Video created with our new “Motion Labs”, try it here for your own short/launch videos:**
   - Video created with our new “Motion Labs”, try it here for your own short/launch videos: https://motion.sereneinteractive.com Linked projects: • Motion Labs — Serene Interactive — Turn a little idea into a beautifully directed short film. Motion Labs by Serene Interactive. (motion.sereneinteractive.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550178759414644789
   - [Motion Labs — Serene Interactive](https://motion.sereneinteractive.com)
   - Source: https://motion.sereneinteractive.com (by Gianni)

107. **i made a pi extension that lets you select how much detail you want in the agent outputs.**
   - i made a pi extension that lets you select how much detail you want in the agent outputs. tons of very awesome stuff you can do with the pi renderer! https://x.com/tedkalaw/status/2100453504997531751 Linked projects: • Post by @tedkalaw — using jev and the sick new markdown renderer in @pidotdev , i made a pi-extension that lets you toggle how much detail you want in the agent output. this was motivated by my inability to understand what opus 5 was gettin (x.com/tedkalaw/status/2100453504997531751) • Post by @tedkalaw — using jev and the sick new markdown renderer in @pidotdev , i made a pi-extension that lets you toggle how much detail you want in the agent output. this was motivated by my inability to understand what opus 5 was gettin (twitter.com/tedkalaw/status/2100453504997531751) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550174923379703938
   - [Post by @tedkalaw](https://x.com/tedkalaw/status/2100453504997531751)
   - Source: https://x.com/tedkalaw/status/2100453504997531751 (by tedkalaw)

108. **Nice, I also tried a very inefficient redaction scheme with Jev Basically split the sentence into words and ask one**
   - Nice, I also tried a very inefficient redaction scheme with Jev Basically split the sentence into words and ask one question for each: "should the word "X" at index Y be redacted?" Yes/No https://x.com/danmana/status/2100550435094278475 Linked projects: • Post by @danmana — Bonus use-case for Jev - redacting PII information (inefficiently 🙈) (x.com/danmana/status/2100550435094278475) • Post by @danmana — Bonus use-case for Jev - redacting PII information (inefficiently 🙈) (twitter.com/danmana/status/2100550435094278475) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550171918584385688
   - [Post by @danmana](https://x.com/danmana/status/2100550435094278475)
   - Source: https://x.com/danmana/status/2100550435094278475 (by danmana)

109. **You could also use a token classifier to redact PII for even cheaper and actually private.**
   - You could also use a token classifier to redact PII for even cheaper and actually private. Example open-weights model: https://huggingface.co/openai/privacy-filter Linked projects: • openai/privacy-filter · Hugging Face — We’re on a journey to advance and democratize artificial intelligence through open source and open science. (huggingface.co/openai/privacy-filter) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550171827555541022
   - [openai/privacy-filter · Hugging Face](https://huggingface.co/openai/privacy-filter)
   - Source: https://huggingface.co/openai/privacy-filter (by gefrom)

110. **I made jev and opus 5 go head to head on competitive pokemon, inspired by some pokemon runs here.**
   - I made jev and opus 5 go head to head on competitive pokemon, inspired by some pokemon runs here. ~820x cheaper, 10x faster and it won lmfao done through a random battle on pkmn showdown https://x.com/sid19arya0/status/2100458351440048258?s=20 Linked projects: • Post by @sid19arya0 — I got Jev @typesafeai and Opus 5 to play vs each other in competitive Pokémon Jev won 🕺 Jev: $0.0029, 37s thinking Opus 5: $2.35, 6m 29s thinking ~ 820x cheaper, 10x faster Seem like high potential in finite action spac (x.com/sid19arya0/status/2100458351440048258) • Post by @sid19arya0 — I got Jev @typesafeai and Opus 5 to play vs each other in competitive Pokémon Jev won 🕺 Jev: $0.0029, 37s thinking Opus 5: $2.35, 6m 29s thinking ~ 820x cheaper, 10x faster Seem like high potential in finite action spac (twitter.com/sid19arya0/status/2100458351440048258) Discussion: https://discord.com/channels/1483217544
   - [Post by @sid19arya0](https://x.com/sid19arya0/status/2100458351440048258?s=20)
   - Source: https://x.com/sid19arya0/status/2100458351440048258?s=20 (by Sid)

111. **I have an agent in production using Luna.**
   - I have an agent in production using Luna. My first run was just switching Luna to jev and comparing each against our golden dataset. In my second run I made changes to the harness and prompt to accommodate for the fact that jev does better when you give it more precise instructions and ran again against the Luna that is in production and comparing each with the golden dataset
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550161521772994633 (by Martucci)

112. **Good idea. Maybe instead of having skills to explain the coding style in advance in detail, I just**
   - Good idea. Maybe instead of having skills to explain the coding style in advance in detail, I just run my codebase through Jev when I commit, and then it will automatically instert an error message that it doesn't fit the coding style yet. Same for commit messages. Probably useful for more such things.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550160449666949205 (by p 🦊)

113. **I think this model could be amazing for moderation porpouses**
   - I think this model could be amazing for moderation porpouses https://x.com/oxfrancesco_/status/2100595042385584622 Linked projects: • Post by @oxfrancesco_ — It's moderation solved? Probably yes! The scammy like messages get a 🔥 Want to join the group and try it yourself? DM Me! (x.com/oxfrancesco_/status/2100595042385584622) • Post by @oxfrancesco_ — It's moderation solved? Probably yes! The scammy like messages get a 🔥 Want to join the group and try it yourself? DM Me! (twitter.com/oxfrancesco_/status/2100595042385584622) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550158096851275936
   - [Post by @oxfrancesco_](https://x.com/oxfrancesco_/status/2100595042385584622)
   - Source: https://x.com/oxfrancesco_/status/2100595042385584622 (by Francesco Oddo (OxFrancesco))

114. **I created a little open source tool for developers: Jevlint 1) Basically, define "semantic" rules for your codebase 2)**
   - I created a little open source tool for developers: Jevlint https://www.jevlint.com/ 1) Basically, define "semantic" rules for your codebase 2) Check them deterministically with jevlint 3) Add it to your agent loop 4) Skip the "Oh you are TOTALLY correct, I shouldn't have named things like this or put them in this folder" Linked projects: • JevLint — Slop happens. Don’t ship it. — Coding conventions in plain English. Your agent codes. JevLint checks what syntax rules miss. (jevlint.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550157820794769408
   - [JevLint — Slop happens. Don’t ship it.](https://www.jevlint.com/)
   - Source: https://www.jevlint.com/ (by Thomas)

115. **can you check it out i used deepseek 4.1 flash max**
   - can you check it out i used deepseek 4.1 flash max https://01a0afc4-e287-7ea1-9e03-137fec574eea.arena.site/ Linked projects: • Neon District: Street Run — Check out what I built in Arena (01a0afc4-e287-7ea1-9e03-137fec574eea.arena.site) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550157755799834784
   - [Neon District: Street Run](https://01a0afc4-e287-7ea1-9e03-137fec574eea.arena.site/)
   - Source: https://01a0afc4-e287-7ea1-9e03-137fec574eea.arena.site/ (by north delta)

116. **I hope to get access to jev soon..**
   - I hope to get access to jev soon.. so far I created: https://www.quizletgravity.com/ and https://marko-sarafijanovic.com/ and https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised Linked projects: • Quizlet – Gravity Mode — Defend your planet from falling asteroids by typing the correct answers. Paste a term list or upload a CSV to play. (quizletgravity.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550156609710194729
   - [Quizlet – Gravity Mode](https://www.quizletgravity.com/)
   - [https://marko-sarafijanovic.com/](https://marko-sarafijanovic.com/)
   - [https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised](https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised)
   - Source: https://www.quizletgravity.com/ (by Marko-Sarafijanovic)

117. **So far pretty solid - obviously phrasing and depth of the criterium impacts outputs substantially, but early results**
   - So far pretty solid - obviously phrasing and depth of the criterium impacts outputs substantially, but early results are pretty promising. We are looking for a solution to help make our SOC members lives easier and more streaminlined, so if we can tune this appropriately and integrate into the workflow, having automated response could be cool.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550151113406419005 (by Space Snek)

118. **you seem to have pretty loaded criteria though vs ```json { "state": { "weather": "heavy rain",**
   - you seem to have pretty loaded criteria though vs ```json { "state": { "weather": "heavy rain", "indoor_cost_per_session": 7, "outdoor_cost_per_session": 0, "expected_rain_damage_cost_per_outdoor_session": 2 }, "question": { "type": "choice", "instructions": "Which option has the lower expected monetary cost for this session?", "criteria": { "indoors": "Skate indoors", "outdoors": "Skate outdoors" } } } ```
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550144304792739871 (by lil nug)

119. **Jev driving simulator.**
   - Jev driving simulator. This model could further autonomous driving. Linked projects: • TypeSafeAiDriving.mp4 — video/mp4 · 8 MB (cdn.discordapp.com/attachments/1483217545040232493/1550136734539583488)
   - [TypeSafeAiDriving.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550136734539583488/TypeSafeAiDriving.mp4?ex=6aae8e55&is=6aad3cd5&hm=50f0516725356a6919b7f2cbb62305fe9ed68e9cd11b4c7729eff6307b032959&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550136734950621209 (by Jordan Dalton)

120. **I let Jev draw a picture pixel by pixel and compare it to Claude Haiku.**
   - https://x.com/j_lamberts/status/2100577481698734255?s=20 I let Jev draw a picture pixel by pixel and compare it to Claude Haiku. Just a tiny bit faster. Linked projects: • Post by @j_lamberts — I let Jev from TypeSafe draw a picture pixel by pixel and compare it to Claude Haiku. Just a tiny bit faster. (x.com/j_lamberts/status/2100577481698734255) • Post by @j_lamberts — I let Jev from TypeSafe draw a picture pixel by pixel and compare it to Claude Haiku. Just a tiny bit faster. (twitter.com/j_lamberts/status/2100577481698734255) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550136425498804264
   - [Post by @j_lamberts](https://x.com/j_lamberts/status/2100577481698734255?s=20)
   - Source: https://x.com/j_lamberts/status/2100577481698734255?s=20 (by jrooney)

121. **As promised.**
   - As promised. https://x.com/alessandro_a0/status/2100573356294607245?s=20 Linked projects: • Post by @alessandro_a0 — I built a New York JFK airport manager simulation with Jev in less than an hour inside Agent Zero. This model is insane. (x.com/alessandro_a0/status/2100573356294607245) • Post by @alessandro_a0 — I built a New York JFK airport manager simulation with Jev in less than an hour inside Agent Zero. This model is insane. (twitter.com/alessandro_a0/status/2100573356294607245) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550133951396581386
   - [Post by @alessandro_a0](https://x.com/alessandro_a0/status/2100573356294607245?s=20)
   - Source: https://x.com/alessandro_a0/status/2100573356294607245?s=20 (by Alessandro Frau)

122. **Yes, that matches my experience so far.**
   - Yes, that matches my experience so far. Here is another Jev versus Luna Medium example. Given the same input, Luna maneuvered more effectively (although at x5.4 the cost and x5.1 the time) and avoided pursuing the apple when doing so would create a dangerous position in the future. I understand this may be outside the system’s intended scope, but reliable long-horizon decision making at this speed would be incredibly useful. It can only improve from here. Linked projects: • image.png — image/png · 84 KB (cdn.discordapp.com/attachments/1483217545040232493/1550131503239921694)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550131503239921694/image.png?ex=6aae8976&is=6aad37f6&hm=c2cc132d2b2adf7e371d9e91489c0f4208377e32a1f4d28273f180937b17609b&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550131503680462908 (by Jayson)

123. **Yes, I used JSON.**
   - Yes, I used JSON. Vercel eve agent sessions are stored as json turns anyway This is what I sent to Jev + the questions * Judging the session as a whole, did the user get what they wanted from the agent? Yes/No * Assume the user did NOT get what they wanted. What is the main reason? Linked projects: • image.png — image/png · 31 KB (cdn.discordapp.com/attachments/1483217545040232493/1550130504991375441)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550130504991375441/image.png?ex=6aae8888&is=6aad3708&hm=a71a7a487162f33697aa9c6351b90b1bea5851241a5c7224d8bc0edad13251b6&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550130505939419166 (by danmana)

124. **yes but this is also why momentum trading absolutely dominates hedge fund strategies.**
   - yes but this is also why momentum trading absolutely dominates hedge fund strategies. it absolutely works in 90% of market regimes. of course every strategy converges to average returns less trading costs on a long enough time frame. hard problem. "be like a goldfish" is the best outlook, but no guarantee. worthwhile because long term average returns outpace most other assets.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550128848505671794 (by WeLiveToServe)

125. **I used Jev to classify failure reasons for our custom vercel eve agent 320 sessions, 2M tokens, 14 seconds, $0.08 Just**
   - I used Jev to classify failure reasons for our custom vercel eve agent 320 sessions, 2M tokens, 14 seconds, $0.08 Just downloading the session logs from vercel took 3 minutes, Jev classified them in 14s https://x.com/danmana/status/2100545412780220877 Linked projects: • Post by @danmana — Here is Jev from @typesafeai classifying 300 full chat sessions from our custom @vercel eve agent by failure reason. 323 sessions, 2M tokens done in 14s and costing $0.08 https://x.com/CompleteSkeptic/status/209992568272 (x.com/danmana/status/2100545412780220877) • Post by @danmana — Here is Jev from @typesafeai classifying 300 full chat sessions from our custom @vercel eve agent by failure reason. 323 sessions, 2M tokens done in 14s and costing $0.08 https://x.com/CompleteSkeptic/status/209992568272 (twitter.com/danmana/status/2100545412780220877) Discussion: https://discord.com/channels/14832175442140
   - [Post by @danmana](https://x.com/danmana/status/2100545412780220877)
   - Source: https://x.com/danmana/status/2100545412780220877 (by danmana)

126. **I had jev play Tetris**
   - https://x.com/meliwat93/status/2100404711283188181?s=46 I had jev play Tetris Linked projects: • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (x.com/meliwat93/status/2100404711283188181) • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (twitter.com/meliwat93/status/2100404711283188181) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550126239853977691
   - [Post by @Meliwat93](https://x.com/meliwat93/status/2100404711283188181?s=46)
   - Source: https://x.com/meliwat93/status/2100404711283188181?s=46 (by Meliwat)

127. **What are the most interesting applications you have seen so far with TypeSafe AI and Jev?**
   - What are the most interesting applications you have seen so far with TypeSafe AI and Jev? I'm asking because Jev told me to check it out more Linked projects: • Screenshot_2026-09-17_at_14.32.22.png — image/png · 479 KB (cdn.discordapp.com/attachments/1483217545040232493/1550125664362041525)
   - [Screenshot_2026-09-17_at_14.32.22.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550125664362041525/Screenshot_2026-09-17_at_14.32.22.png?ex=6aae8406&is=6aad3286&hm=0873f89e04dc0a22da60490ad6cf8ec8a76df68ca0e39d7e59fa1316d5b5e025&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550125664667967569 (by Eddy Vinck)

128. **I gave jev real trading data, and let it dry-run.**
   - https://x.com/karuri945/status/2100562714376454654?s=20 I gave jev real trading data, and let it dry-run. Indeed. It "earned" $17 for minutes... Linked projects: • Post by @dawn_break_1107 — @CompleteSkeptic I gave #jev real trading data, and let it dry-run. Indeed. It "earned" $17 for minutes... 🤣 (x.com/karuri945/status/2100562714376454654) • Post by @dawn_break_1107 — @CompleteSkeptic I gave #jev real trading data, and let it dry-run. Indeed. It "earned" $17 for minutes... 🤣 (twitter.com/karuri945/status/2100562714376454654) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550121746596896788
   - [Post by @dawn_break_1107](https://x.com/karuri945/status/2100562714376454654?s=20)
   - Source: https://x.com/karuri945/status/2100562714376454654?s=20 (by Lovely Olaf)

129. **Had Jev routing users on a website based on prompts**
   - Had Jev routing users on a website based on prompts https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg Linked projects: • Post by @digitalshane_ — I got access to Jev! It can route website visitors to the pages they need based on what they need help with! (x.com/digitalshane_/status/2100399951872205224) • Post by @digitalshane_ — I got access to Jev! It can route website visitors to the pages they need based on what they need help with! (twitter.com/digitalshane_/status/2100399951872205224) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550118931698548746
   - [Post by @digitalshane_](https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg)
   - Source: https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg (by shaneomac151)

130. **Chess, Brain Activity, Molecules!**
   - Chess, Brain Activity, Molecules! This will be indeed a fun model! https://x.com/nikuscs/status/2100554927797833955?s=46 Linked projects: • Post by @nikuscs — My JEV experiments are also in :p Chess predictions, brain activity, Molecules Smell, and so on, this is quite fun model for some real word scenario, pretty curious for endless ideias this could unfold. Interactive demos (x.com/nikuscs/status/2100554927797833955) • Post by @nikuscs — My JEV experiments are also in :p Chess predictions, brain activity, Molecules Smell, and so on, this is quite fun model for some real word scenario, pretty curious for endless ideias this could unfold. Interactive demos (twitter.com/nikuscs/status/2100554927797833955) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550117665002229794
   - [Post by @nikuscs](https://x.com/nikuscs/status/2100554927797833955?s=46)
   - Source: https://x.com/nikuscs/status/2100554927797833955?s=46 (by nikus)

131. **3x faster, 65% cheaper, **and** safer?**
   - 3x faster, 65% cheaper, **and** safer? I'll take that thanks 😅 https://x.com/ashleyhindle/status/2100553892639473951?s=20 Linked projects: • Post by @ashleyhindle — Jev was 3x faster, 65% cheaper, and safer on this benchmark 🤯 Fuel classifies the first message in a new chat to see what level of intelligence will be needed for that chat. If we get it right we reduce the user's token (x.com/ashleyhindle/status/2100553892639473951) • Post by @ashleyhindle — Jev was 3x faster, 65% cheaper, and safer on this benchmark 🤯 Fuel classifies the first message in a new chat to see what level of intelligence will be needed for that chat. If we get it right we reduce the user's token (twitter.com/ashleyhindle/status/2100553892639473951) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550112904618180679
   - [Post by @ashleyhindle](https://x.com/ashleyhindle/status/2100553892639473951?s=20)
   - Source: https://x.com/ashleyhindle/status/2100553892639473951?s=20 (by ashleyhindle)

132. **Okay, [my Rust library for Jev]( ) is finished now.**
   - Okay, [my Rust library for Jev](https://gitlab.com/porky11/jev) is finished now. It's not necessary, but it might make usage a little more comfortable and typesafe. It also includes some interactive example where you can ask questions. Linked projects: • Fabio Krapohl / jev · GitLab — GitLab.com (gitlab.com/porky11/jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550111198236901406
   - [Fabio Krapohl / jev · GitLab](https://gitlab.com/porky11/jev)
   - Source: https://gitlab.com/porky11/jev (by p 🦊)

133. **i gave jev some riddles, it does pretty good.**
   - i gave jev some riddles, it does pretty good. But here it fails. Linked projects: • image.png — image/png · 132 KB (cdn.discordapp.com/attachments/1483217545040232493/1550105612929728592)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550105612929728592/image.png?ex=6aae7159&is=6aad1fd9&hm=d5d0571887730e9e3d512396ffaadb59377cc05d4a40cfb5815f9c4419385151&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550105613193838742 (by jrooney)

134. **Hey, I've started experimenting with integrating TypeSafe into our AI assistant for certain operations (routing,**
   - Hey, I've started experimenting with integrating TypeSafe into our AI assistant for certain operations (routing, specific tool calls...). By default, we use Gemini Flash for its balance of speed and capabilities. On the left, the version using Gemini only; on the right, the version combining Jev. Linked projects: • Enregistrement_de_lecran_2026-09-17_a_12.24.59.mov — video/quicktime · 4 MB (cdn.discordapp.com/attachments/1483217545040232493/1550103804907884684)
   - [Enregistrement_de_lecran_2026-09-17_a_12.24.59.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1550103804907884684/Enregistrement_de_lecran_2026-09-17_a_12.24.59.mov?ex=6aae6faa&is=6aad1e2a&hm=dbc6785e53a3fa366512c46530c24efc4e2c0165d5c4c3c163fb4d8cd6b50c43&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550103805335437345 (by Eddy)

135. **Did you have access to the cloud model?**
   - Did you have access to the cloud model? Already use the open-source [Hugging Face one](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD)? Linked projects: • harshatheg/Qwen-2.5-1B-RLCD · Hugging Face — We’re on a journey to advance and democratize artificial intelligence through open source and open science. (huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550098199736488036
   - [harshatheg/Qwen-2.5-1B-RLCD · Hugging Face](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD)
   - Source: https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD (by uprety)

136. **Showcasing TypeSafe's stuff because damn, this onboarding tutorial is actually really, *really* good**
   - Showcasing TypeSafe's stuff because damn, this onboarding tutorial is actually really, *really* good Linked projects: • image.png — image/png · 99 KB (cdn.discordapp.com/attachments/1483217545040232493/1550094275004596224)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550094275004596224/image.png?ex=6aae66ca&is=6aad154a&hm=72998d769f5e61193f9a254b3a2f73d08315e3ee40682ac964f7950cb3f7fd21&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550094275604254790 (by slices)

137. **This is so fun folks**
   - This is so fun folks https://x.com/_trou3/status/2100527857739215150 Linked projects: • Post by @_trou3 — I challenged Jev from @typesafeai to solve a rubik cube, this is wild! (x.com/_trou3/status/2100527857739215150) • Post by @_trou3 — I challenged Jev from @typesafeai to solve a rubik cube, this is wild! (twitter.com/_trou3/status/2100527857739215150) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550086652242694204
   - [Post by @_trou3](https://x.com/_trou3/status/2100527857739215150)
   - Source: https://x.com/_trou3/status/2100527857739215150 (by trou)

138. **I've got a RaspberryPi, a smart car, a cat, and Jev early acess.**
   - I've got a RaspberryPi, a smart car, a cat, and Jev early acess. I'm gonna put Jev in a car lol https://x.com/SuperSlowSloth/status/2100526797377163414?s=20 Linked projects: • Post by @SuperSlowSloth — My cat now has a personal AI chauffeur. Thanks, #TypeFace #Jev 🐈🚗 #CatsOfX I'm giving Jev a smart car body. (x.com/SuperSlowSloth/status/2100526797377163414) • Post by @SuperSlowSloth — My cat now has a personal AI chauffeur. Thanks, #TypeFace #Jev 🐈🚗 #CatsOfX I'm giving Jev a smart car body. (twitter.com/SuperSlowSloth/status/2100526797377163414) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550086055947018301
   - [Post by @SuperSlowSloth](https://x.com/SuperSlowSloth/status/2100526797377163414?s=20)
   - Source: https://x.com/SuperSlowSloth/status/2100526797377163414?s=20 (by SuperSlowSloth)

139. **I made JEV play NES Tetris**
   - https://x.com/meliwat93/status/2100404711283188181?s=46 I made JEV play NES Tetris Linked projects: • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (x.com/meliwat93/status/2100404711283188181) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550084584560005162
   - [Post by @Meliwat93](https://x.com/meliwat93/status/2100404711283188181?s=46)
   - Source: https://x.com/meliwat93/status/2100404711283188181?s=46 (by Meliwat)

140. **I made Jev play a modded PvZ based on the Total Death difficulty: repo coming soon.**
   - I made Jev play a modded PvZ based on the Total Death difficulty: https://x.com/ThexysaiXy/status/2100520866685833645 repo coming soon. Linked projects: • Post by @ThexysaiXy — I ran a Total Death-inspired PvZ mod and let Jevy play it. 50% larger wave budgets. 2× zombie body + armor HP. Buffed plants. Jevy reads structured game state, picks its own loadout, collects sun, and places every plant— (x.com/ThexysaiXy/status/2100520866685833645) • Post by @ThexysaiXy — I ran a Total Death-inspired PvZ mod and let Jevy play it. 50% larger wave budgets. 2× zombie body + armor HP. Buffed plants. Jevy reads structured game state, picks its own loadout, collects sun, and places every plant— (twitter.com/ThexysaiXy/status/2100520866685833645) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550081288936095768
   - [Post by @ThexysaiXy](https://x.com/ThexysaiXy/status/2100520866685833645)
   - Source: https://x.com/ThexysaiXy/status/2100520866685833645 (by Xy)

141. **I made Jev generate text**
   - I made Jev generate text https://x.com/bewinxed/status/2100519569307640097?s=46 Linked projects: • Post by @Bewinxed — I made @typesafeai 's new ultra fast model, Jev, generate text, even though it shouldn't, that's fine because I can't read, and it can't write** ** up to 20 words for 0.5$, what a steal (x.com/bewinxed/status/2100519569307640097) • Post by @Bewinxed — I made @typesafeai 's new ultra fast model, Jev, generate text, even though it shouldn't, that's fine because I can't read, and it can't write** ** up to 20 words for 0.5$, what a steal (twitter.com/bewinxed/status/2100519569307640097) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550079057574502422
   - [Post by @Bewinxed](https://x.com/bewinxed/status/2100519569307640097?s=46)
   - Source: https://x.com/bewinxed/status/2100519569307640097?s=46 (by Bewinxed)

142. **Jev as a Chief Of Staff!**
   - Jev as a Chief Of Staff! https://x.com/milindlabs/status/2100515910754750741?s=46 Linked projects: • Post by @milindlabs — got @typesafeai's new model Jev as a chief of staff for bots Jev reads the task, wakes the right teammates off the bench and gives each one the right model It is possible on OpenMausBot as it supports all the LLMs from y (x.com/milindlabs/status/2100515910754750741) • Post by @milindlabs — got @typesafeai's new model Jev as a chief of staff for bots Jev reads the task, wakes the right teammates off the bench and gives each one the right model It is possible on OpenMausBot as it supports all the LLMs from y (twitter.com/milindlabs/status/2100515910754750741) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550078260870914130
   - [Post by @milindlabs](https://x.com/milindlabs/status/2100515910754750741?s=46)
   - Source: https://x.com/milindlabs/status/2100515910754750741?s=46 (by milind)

143. **I have Jev playing Balatro live on Twitch 🙂**
   - I have Jev playing Balatro live on Twitch 🙂 https://www.twitch.tv/ai_plays_balatro Linked projects: • AI_Plays_Balatro - Live on Twitch — Virtual pianist plays classical music | Streaming music for 1 viewers. (twitch.tv/ai_plays_balatro) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550072262558752928
   - [AI_Plays_Balatro - Live on Twitch](https://www.twitch.tv/ai_plays_balatro)
   - Source: https://www.twitch.tv/ai_plays_balatro (by manub)

144. **jev analyzed my codex sessions from the past 2 days n created a report, now i just asked fable to look thru it n**
   - jev analyzed my codex sessions from the past 2 days n created a report, now i just asked fable to look thru it n create a skill file that reduces the blockers, avoid behaviors i dont like, n all dat. Linked projects: • image.png — image/png · 175 KB (cdn.discordapp.com/attachments/1483217545040232493/1550071292215042128)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550071292215042128/image.png?ex=6aae5162&is=6aacffe2&hm=28df6b91da881c6c5368e4e8b353e7ea748fd492cef7a7dc498cb7739954b1c5&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550071292412166204 (by Barrel Of Lube)

145. **HAHAHA**
   - <@1432858129535602793> https://x.com/brainstormity/status/2100471987860553931 HAHAHA Linked projects: • Post by @brainstormity — Built a real-time Discord moderation bot powered by @TypeSafeAI’s System One model (Jev) 🛡️⚡ Instead of dumb regex filters, it uses calibrated AI decisions with: 📈 4-Stage Progressive Escalation (Warning DMs ➔ 10m Time (x.com/brainstormity/status/2100471987860553931) • Post by @brainstormity — Built a real-time Discord moderation bot powered by @TypeSafeAI’s System One model (Jev) 🛡️⚡ Instead of dumb regex filters, it uses calibrated AI decisions with: 📈 4-Stage Progressive Escalation (Warning DMs ➔ 10m Time (twitter.com/brainstormity/status/2100471987860553931) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550061670305501219
   - [Post by @brainstormity](https://x.com/brainstormity/status/2100471987860553931)
   - Source: https://x.com/brainstormity/status/2100471987860553931 (by South)

146. **Toying around with a jev ecosystem.**
   - Toying around with a jev ecosystem. Its a ton of jevs playing out the faccets of an ecosystem, controlling all the animals and environmental conditions over time. Seems to be doing decently well Linked projects: • image.png — image/png · 4 MB (cdn.discordapp.com/attachments/1483217545040232493/1550057608306622475)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550057608306622475/image.png?ex=6aae44a4&is=6aacf324&hm=635753794031e2536aa121be877d50bb15a2d77d377a36d1e77e3bf4f5bcd2ae&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550057608755286056 (by Dustin)

147. **out here watching jev do art, its not good at it but its fun to watch**
   - out here watching jev do art, its not good at it but its fun to watch Linked projects: • image.png — image/png · 551 KB (cdn.discordapp.com/attachments/1483217545040232493/1550053152026271775)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550053152026271775/image.png?ex=6aae407e&is=6aaceefe&hm=9b1cdab291cf86f60e5157ce216e812917d4433046f8be2aea4cd973fb04578a&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550053152299028581 (by Dustin)

148. **As of this morning, Jev will be used 1) as an intent gate 2) for scope enforcement 3) as a fabrication guard over at my**
   - As of this morning, Jev will be used 1) as an intent gate 2) for scope enforcement 3) as a fabrication guard over at my https://getslaide.com Linked projects: • Slaide - slides that AI can actually write — Slaide is a Markdown presentation language AI agents write flawlessly. One .slaide file renders to a navigable web deck, a PDF, and editable PowerPoint. (getslaide.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550049611283046460
   - [Slaide - slides that AI can actually write](https://getslaide.com)
   - Source: https://getslaide.com (by madppiper)

149. **Lol, my day had been long and I'm pretty tired, First - built early in the am, while on work calls 🤙 Got access in**
   - Lol, my day had been long and I'm pretty tired, First - built https://jevboard.com/ early in the am, while on work calls 🤙 Got access in the evening, tried a few ideas out of there...voice call transcript classification - did perfectly!!! Settled on browser use It's all over the Internet, I'm sure lots of similar products. Probably from browser use guys Linked projects: • Jev Board — What should we build next? — Discover product ideas for Jev. Heart the ideas you want someone to build. An independent, community-ranked directory. (jevboard.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550042913893777458
   - [Jev Board — What should we build next?](https://jevboard.com/)
   - Source: https://jevboard.com/ (by BlissF00l)

150. **Added Jev to my crypto intelligence terminal, it's really fast and powerful!**
   - https://x.com/_trou3/status/2100481938016669917 Added Jev to my crypto intelligence terminal, it's really fast and powerful! Linked projects: • Post by @_trou3 — For those who still didn't understand what Jev from @typesafeai can do, here is the example. Jev can read dozens of structured trading signals and then show intelligent decisions. It's time to make your system actually a (x.com/_trou3/status/2100481938016669917) • Post by @_trou3 — For those who still didn't understand what Jev from @typesafeai can do, here is the example. Jev can read dozens of structured trading signals and then show intelligent decisions. It's time to make your system actually a (twitter.com/_trou3/status/2100481938016669917) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550040796411986022
   - [Post by @_trou3](https://x.com/_trou3/status/2100481938016669917)
   - Source: https://x.com/_trou3/status/2100481938016669917 (by trou)

151. **me building a decision branching framework based on jev jev:**
   - me building a decision branching framework based on jev jev: Linked projects: • image.png — image/png · 5 KB (cdn.discordapp.com/attachments/1483217545040232493/1550039561160101898)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550039561160101898/image.png?ex=6aaedc95&is=6aad8b15&hm=e4984ea2bad11e26c02b3ccd5e773e696165bb2b0f662862f19ecdf35edddf92&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550039562619850762 (by hawkyre)

152. **Shared by chalkers: chalkers status 2100466530459017458**
   - https://x.com/chalkers/status/2100466530459017458?s=46&t=9d3OZDM6CF17OmY-xxEvPg Linked projects: • Post by @chalkers — I had to _slow_ jev down to play _Sonic_. Crazy times. (x.com/chalkers/status/2100466530459017458) • Post by @chalkers — I had to _slow_ jev down to play _Sonic_. Crazy times. (twitter.com/chalkers/status/2100466530459017458) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550027306184085544
   - [Post by @chalkers](https://x.com/chalkers/status/2100466530459017458?s=46&t=9d3OZDM6CF17OmY-xxEvPg)
   - Source: https://x.com/chalkers/status/2100466530459017458?s=46&t=9d3OZDM6CF17OmY-xxEvPg (by chalkers)

153. **Shared by chalkers: chalkers status 2100429696941080886**
   - https://x.com/chalkers/status/2100429696941080886?s=46&t=9d3OZDM6CF17OmY-xxEvPg Linked projects: • Post by @chalkers — Holy shit JEV is playing Sonic 3 & Knuckles faster than realtime... @typesafeai (x.com/chalkers/status/2100429696941080886) • Post by @chalkers — Holy shit JEV is playing Sonic 3 & Knuckles faster than realtime... @typesafeai (twitter.com/chalkers/status/2100429696941080886) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550027248365740042
   - [Post by @chalkers](https://x.com/chalkers/status/2100429696941080886?s=46&t=9d3OZDM6CF17OmY-xxEvPg)
   - Source: https://x.com/chalkers/status/2100429696941080886?s=46&t=9d3OZDM6CF17OmY-xxEvPg (by chalkers)

154. **i build a model x45 smaler but it Beats GPT-2 124M BYTE_BPC = 1.142985 (TOKEN_BPC = 9.152823) on the same metric as**
   - i build a model x45 smaler but it Beats GPT-2 124M BYTE_BPC = 1.142985 (TOKEN_BPC = 9.152823) on the same metric https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6 as well as my agency https://uniency.com/app Linked projects: • Uuuuuuniiiiiii/goldworm-v6 · Hugging Face — We’re on a journey to advance and democratize artificial intelligence through open source and open science. (huggingface.co/Uuuuuuniiiiiii/goldworm-v6) • Uniency — The Agent Economy — Pubkey identity, signed proof, x402/USDC commerce, agent-native reach. Validate agents, sell products, host on our infra. (uniency.com/app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550024431915507724
   - [Uuuuuuniiiiiii/goldworm-v6 · Hugging Face](https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6)
   - [Uniency — The Agent Economy](https://uniency.com/app)
   - Source: https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6 (by DARK(uniency.com)Sudocorn)

155. **I have built a PPO policy trained model in the past to play Super Mario Bros that clears world 1-1 100% of the time,**
   - I have built a PPO policy trained model in the past to play Super Mario Bros that clears world 1-1 100% of the time, better than any previous effort. But it took a week of day and nights work to do it. Got it done with jev in 30 minutes https://x.com/shantanugoel/status/2100455779627311352 Linked projects: • Post by @shantanugoel — Here's the code if you want to try it yourself, or want to port it to other games: https://github.com/shantanugoel/mario-jev (x.com/shantanugoel/status/2100455779627311352) • Post by @shantanugoel — Here's the code if you want to try it yourself, or want to port it to other games: https://github.com/shantanugoel/mario-jev (twitter.com/shantanugoel/status/2100455779627311352) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550021262955257898
   - [Post by @shantanugoel](https://x.com/shantanugoel/status/2100455779627311352)
   - Source: https://x.com/shantanugoel/status/2100455779627311352 (by shantanugoel)

156. **This is some recording about jev using browser, and it is actually too fast initially so I make a rate limiter code**
   - This is some recording about jev using browser, and it is actually too fast initially so I make a rate limiter code for the loop of calling jev Linked projects: • Screen_Recording_2026-09-17_at_10.46.40_am.mov — video/quicktime · 3 MB (cdn.discordapp.com/attachments/1483217545040232493/1550018447067316384)
   - [Screen_Recording_2026-09-17_at_10.46.40_am.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1550018447067316384/Screen_Recording_2026-09-17_at_10.46.40_am.mov?ex=6aaec8eb&is=6aad776b&hm=cf7b120a1dbf312e4ac9b9069fafdbb9427120dde9c5c3c895e60ebffa23f5a8&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550018447575089212 (by Ying-Kai Liao)

157. **updated my rust llm crate with typesafe support:**
   - updated my rust llm crate with typesafe support: https://crates.io/crates/llm-wires Linked projects: • crates.io: Rust Package Registry — crates.io serves as a central registry for sharing crates, which are packages or libraries written in Rust that you can use to enhance your projects (crates.io/crates/llm-wires) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550018436325974016
   - [crates.io: Rust Package Registry](https://crates.io/crates/llm-wires)
   - Source: https://crates.io/crates/llm-wires (by riclib)

158. **inspired by some pokemon runs here.**
   - inspired by some pokemon runs here. I made jev and opus go head to head on competitive pokemon, pretty hype: 820x cheaper, 10x faster https://x.com/sid19arya0/status/2100458351440048258?s=20 Linked projects: • Post by @sid19arya0 — I got Jev @typesafeai and Opus 5 to play vs each other in competitive Pokémon Jev won 🕺 Jev: $0.0029, 37s thinking Opus 5: $2.35, 6m 29s thinking ~ 820x cheaper, 10x faster Seem like high potential in finite action spac (x.com/sid19arya0/status/2100458351440048258) • Post by @sid19arya0 — I got Jev @typesafeai and Opus 5 to play vs each other in competitive Pokémon Jev won 🕺 Jev: $0.0029, 37s thinking Opus 5: $2.35, 6m 29s thinking ~ 820x cheaper, 10x faster Seem like high potential in finite action spac (twitter.com/sid19arya0/status/2100458351440048258) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550018086059507793
   - [Post by @sid19arya0](https://x.com/sid19arya0/status/2100458351440048258?s=20)
   - Source: https://x.com/sid19arya0/status/2100458351440048258?s=20 (by Sid)

159. **This one is actually pretty fun to watch play.**
   - This one is actually pretty fun to watch play. Every character is Jev, the player can also be Jev (as shown halfway) https://fixupx.com/dustin_podell/status/2100458335405588607 Linked projects: • Post by @dustin_podell — I rebuilt the Jev Doom demo, but this time I replaced all the enemies actions with Jev logic. So you can fight against Jev playing all the enemies or as you see halfway, allow Jev to fight against multiple Jevs (fixupx.com/dustin_podell/status/2100458335405588607) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550017207923118130
   - [Post by @dustin_podell](https://fixupx.com/dustin_podell/status/2100458335405588607)
   - Source: https://fixupx.com/dustin_podell/status/2100458335405588607 (by Dustin)

160. **I think you guys will enjoy this.**
   - I think you guys will enjoy this. https://x.com/danielkhunter/status/2100456518751768775?s=20 Linked projects: • Post by @danielkhunter — This is so fun. Curious what Jev thinks about us yapping? "Judged by Jev" is now live on tech twitter dot com. (x.com/danielkhunter/status/2100456518751768775) • Post by @danielkhunter — This is so fun. Curious what Jev thinks about us yapping? "Judged by Jev" is now live on tech twitter dot com. (twitter.com/danielkhunter/status/2100456518751768775) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550015486870167592
   - [Post by @danielkhunter](https://x.com/danielkhunter/status/2100456518751768775?s=20)
   - Source: https://x.com/danielkhunter/status/2100456518751768775?s=20 (by Daniel Hunter)

161. **Come watch Jev play Pokemon 🙂**
   - Come watch Jev play Pokemon 🙂 https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share Linked projects: • Twitch — Twitch is the world's leading video platform and community for gamers. (twitch.tv/holographicdan) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550012648706539671
   - [Twitch](https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share)
   - Source: https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share (by CYPRESS)

162. **Hi everyone, just messing around to learn how this works:**
   - Hi everyone, just messing around to learn how this works: https://jev.plusx-fund.chatgpt.site/ Linked projects: • Jev Signal — A live semantic signal visualizer powered by Jev. (jev.plusx-fund.chatgpt.site) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550011552642371676
   - [Jev Signal](https://jev.plusx-fund.chatgpt.site/)
   - Source: https://jev.plusx-fund.chatgpt.site/ (by +×)

163. **your model is fun 😄**
   - <@638223584396967937> your model is fun 😄 https://fixupx.com/dustin_podell/status/2100451281013969078 Linked projects: • Post by @dustin_podell — Jev is fun. Here is a working Jev based 8-bit Ben Eater style "computer" I threw together, all gates are controller by Jev. Entirely unnecessary, but I felt the call to try it (fixupx.com/dustin_podell/status/2100451281013969078) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550010066999050381
   - [Post by @dustin_podell](https://fixupx.com/dustin_podell/status/2100451281013969078)
   - Source: https://fixupx.com/dustin_podell/status/2100451281013969078 (by Dustin)

164. **built a squawk feed using Jev.**
   - https://x.com/Anot/status/2100425243269468583 built a squawk feed using Jev. Promising early results Linked projects: • Post by @Anot — Another “Jev can" for your feed...turns out it can squawk! I tried it on SEC filings to see if I could get a market feed out of edgar. Jev can pick out signals like buybacks and insider trades. It can also find meaningfu (x.com/Anot/status/2100425243269468583) • Post by @Anot — Another “Jev can" for your feed...turns out it can squawk! I tried it on SEC filings to see if I could get a market feed out of edgar. Jev can pick out signals like buybacks and insider trades. It can also find meaningfu (twitter.com/Anot/status/2100425243269468583) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550003219638394942
   - [Post by @Anot](https://x.com/Anot/status/2100425243269468583)
   - Source: https://x.com/Anot/status/2100425243269468583 (by Anot)

165. **Just finished integrating TypeSafe AI into the scanner on my site --**
   - Just finished integrating TypeSafe AI into the scanner on my site -- https://blackveilsecurity.com Linked projects: • BlackVeil Security | What your DNS and email tell an attacker. — See where any domain stands in the BlackVeil Global Security Index, or run 17 NIST-aligned checks free — then verify, fix and continuously monitor it. (blackveilsecurity.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550000805950652426
   - [BlackVeil Security | What your DNS and email tell an attacker.](https://blackveilsecurity.com)
   - Source: https://blackveilsecurity.com (by Mada)

166. **using jev for automatic permission decision for a coding agent**
   - using jev for automatic permission decision for a coding agent Linked projects: • Screenshot_2026-09-17_at_10.59.32_AM.png — image/png · 170 KB (cdn.discordapp.com/attachments/1483217545040232493/1549999135376023602)
   - [Screenshot_2026-09-17_at_10.59.32_AM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549999135376023602/Screenshot_2026-09-17_at_10.59.32_AM.png?ex=6aaeb6ef&is=6aad656f&hm=2429e700ba340497c4f93a7a3df76e6889f81f1ece91bce1b1ab3cc992892d19&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549999135653109860 (by James)

167. **I am excited for Jev's capabilities.**
   - I am excited for Jev's capabilities. I've only began to scratch the surface of what it can do. Linked projects: • image.png — image/png · 363 KB (cdn.discordapp.com/attachments/1483217545040232493/1549996494508130435)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549996494508130435/image.png?ex=6aaeb479&is=6aad62f9&hm=0e502c83b11bfac6f0e737ee8b8c6772cb113ed8b3f6b7f273f83025eaaab07a&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549996494835159142 (by Pixel Nuke)

168. **I made “Jev Plays Pokemon”.**
   - I made “Jev Plays Pokemon”. You can follow along and chat on either the site or via your own Terminal with `npx jev-plays-pokemon` https://x.com/0xboyd/status/2100418365986578908 Linked projects: • Post by @0xBOYD — Let's go! Jev Plays Pokemon. Follow along here: https://jev-plays-pokemon.standardagents.ai/ OR, in your terminal run `npx jev-plays-pokemon` to follow along (with chat!) in a TUI. Github oAuth required to chat. Jev is t (x.com/0xboyd/status/2100418365986578908) • Post by @0xBOYD — Let's go! Jev Plays Pokemon. Follow along here: https://jev-plays-pokemon.standardagents.ai/ OR, in your terminal run `npx jev-plays-pokemon` to follow along (with chat!) in a TUI. Github oAuth required to chat. Jev is t (twitter.com/0xboyd/status/2100418365986578908) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549994242578063450
   - [Post by @0xBOYD](https://x.com/0xboyd/status/2100418365986578908)
   - Source: https://x.com/0xboyd/status/2100418365986578908 (by Boyd)

169. **Trying out few things figuring out how to use this model.**
   - https://captcha-from-hell.vercel.app/ Trying out few things figuring out how to use this model. Not sure if I'm doing it right. Linked projects: • CAPTCHA FROM HELL — A 60-second semantic typing gauntlet, judged in real time by TypeSafe Jev. (captcha-from-hell.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549992652693311580
   - [CAPTCHA FROM HELL](https://captcha-from-hell.vercel.app/)
   - Source: https://captcha-from-hell.vercel.app/ (by DPR)

170. **Browser use speeds up so much with this**
   - Browser use speeds up so much with this https://x.com/gregpr07/status/2100411066966749359?s=46 Linked projects: • Post by @gregpr07 — Breaking: Browser Use + Jev = Ultrafast ⚡ Findings flights took 7s and cost only $0.0039 🤯 > new action space every step > DOM state space > small LLM fallback to type (this video is at 1x speed btw) Built a tiny open s (x.com/gregpr07/status/2100411066966749359) • Post by @gregpr07 — Breaking: Browser Use + Jev = Ultrafast ⚡ Findings flights took 7s and cost only $0.0039 🤯 > new action space every step > DOM state space > small LLM fallback to type (this video is at 1x speed btw) Built a tiny open s (twitter.com/gregpr07/status/2100411066966749359) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549989924751671316
   - [Post by @gregpr07](https://x.com/gregpr07/status/2100411066966749359?s=46)
   - Source: https://x.com/gregpr07/status/2100411066966749359?s=46 (by Phat T Pham)

171. **JEV PLAYS POKEMON**
   - JEV PLAYS POKEMON https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share Linked projects: • Twitch — Twitch is the world's leading video platform and community for gamers. (twitch.tv/holographicdan) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549980520819986464
   - [Twitch](https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share)
   - Source: https://www.twitch.tv/holographicdan?tt_content=channel&tt_medium=mobile_web_share (by CYPRESS)

172. **i build a model x45 smaler but it Beats GPT-2 124M BYTE_BPC = 1.142985 (TOKEN_BPC = 9.152823) on the same metric**
   - i build a model x45 smaler but it Beats GPT-2 124M BYTE_BPC = 1.142985 (TOKEN_BPC = 9.152823) on the same metric https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6 Linked projects: • Uuuuuuniiiiiii/goldworm-v6 · Hugging Face — We’re on a journey to advance and democratize artificial intelligence through open source and open science. (huggingface.co/Uuuuuuniiiiiii/goldworm-v6) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549979900566306947
   - [Uuuuuuniiiiiii/goldworm-v6 · Hugging Face](https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6)
   - Source: https://huggingface.co/Uuuuuuniiiiiii/goldworm-v6 (by DARK(uniency.com)Sudocorn)

173. **Still need to clean it up a bit, but feel free to 1 v 1 Jev!**
   - Still need to clean it up a bit, but feel free to 1 v 1 Jev! on rust: https://onevonejev-production.up.railway.app/ Linked projects: • 1v1 Jev — Quickscope Arena (onevonejev-production.up.railway.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549971186216210434
   - [1v1 Jev — Quickscope Arena](https://onevonejev-production.up.railway.app/)
   - Source: https://onevonejev-production.up.railway.app/ (by West Taiwan)

174. **Shared by Meliwat: Meliwat93 status 2100404711283188181 video 1**
   - https://x.com/Meliwat93/status/2100404711283188181/video/1?s=46 Linked projects: • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (x.com/Meliwat93/status/2100404711283188181/video/1) • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (twitter.com/Meliwat93/status/2100404711283188181/video/1) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549969206508789932
   - [Post by @Meliwat93](https://x.com/Meliwat93/status/2100404711283188181/video/1?s=46)
   - Source: https://x.com/Meliwat93/status/2100404711283188181/video/1?s=46 (by Meliwat)

175. **while learning jev i came up with these 10 rule of thumbs to remember when and how to use jev**
   - while learning jev i came up with these 10 rule of thumbs to remember when and how to use jev https://old.reddit.com/r/typesafe_ai/comments/1wiguah/10_jev_commandments/ Linked projects: • Welcome to Reddit — Log in or sign up to personalize your feed, join conversations, vote, and explore communities. (old.reddit.com/r/typesafe_ai/comments/1wiguah/10_jev_commandments) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549966801801191444
   - [Welcome to Reddit](https://old.reddit.com/r/typesafe_ai/comments/1wiguah/10_jev_commandments/)
   - Source: https://old.reddit.com/r/typesafe_ai/comments/1wiguah/10_jev_commandments/ (by zuzu)

176. **trying jev out as a model router in t3 code:**
   - trying jev out as a model router in t3 code: https://x.com/abcdmku/status/2100406369744482318?s=20 Linked projects: • Post by @abcdmku — Using @typesafeai jev in a auto model router POC in @t3dotcodes (x.com/abcdmku/status/2100406369744482318) • Post by @abcdmku — Using @typesafeai jev in a auto model router POC in @t3dotcodes (twitter.com/abcdmku/status/2100406369744482318) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549965321832636539
   - [Post by @abcdmku](https://x.com/abcdmku/status/2100406369744482318?s=20)
   - Source: https://x.com/abcdmku/status/2100406369744482318?s=20 (by abcdmku)

177. **I got Jev to help users around a website based on their prompt!**
   - I got Jev to help users around a website based on their prompt! https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg Linked projects: • Post by @digitalshane_ — I got access to Jev! It can route website visitors to the pages they need based on what they need help with! (x.com/digitalshane_/status/2100399951872205224) • Post by @digitalshane_ — I got access to Jev! It can route website visitors to the pages they need based on what they need help with! (twitter.com/digitalshane_/status/2100399951872205224) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549962083234353325
   - [Post by @digitalshane_](https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg)
   - Source: https://x.com/digitalshane_/status/2100399951872205224?s=46&t=IUH0numJ2wxvHLmj8vkKzg (by shaneomac151)

178. **I'll shoot a video in a few hours (it's 4 AM now lol), but essentially I built with GPT Astra, a JFK airport**
   - I'll shoot a video in a few hours (it's 4 AM now lol), but essentially I built with GPT Astra, a JFK airport simulation where both ATC and pilots are GPT Live 1 realtime voice agents, while ATC decisions and traffic conflicts are handled by Jev. I haven't been this excited about building something since the GPT-4 days. Linked projects: • Screenshot_from_2026-09-17_03-47-12.png — image/png · 232 KB (cdn.discordapp.com/attachments/1483217545040232493/1549960725655593120)
   - [Screenshot_from_2026-09-17_03-47-12.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549960725655593120/Screenshot_from_2026-09-17_03-47-12.png?ex=6aae9329&is=6aad41a9&hm=079dd1c3bd0414bb34c0a68f1b4d8ebaa7b8c1d65f248654f355d8b937c17800&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549960725974491258 (by Alessandro Frau)

179. **built a code review bot using jev!**
   - built a code review bot using jev! https://x.com/devagrawal09/status/2100341005690298687?s=20 Linked projects: • Post by @devagrawal09 — Built Jev Review: a small code-review workflow powered by @typesafeai Jev. It screens Git diffs, follows strong signals through staged judgments, and presents the results in a clean local dashboard. https://github.com/de (x.com/devagrawal09/status/2100341005690298687) • Post by @devagrawal09 — Built Jev Review: a small code-review workflow powered by @typesafeai Jev. It screens Git diffs, follows strong signals through staged judgments, and presents the results in a clean local dashboard. https://github.com/de (twitter.com/devagrawal09/status/2100341005690298687) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549960579010265148
   - [Post by @devagrawal09](https://x.com/devagrawal09/status/2100341005690298687?s=20)
   - Source: https://x.com/devagrawal09/status/2100341005690298687?s=20 (by devagr)

180. **For some reason it loves C4**
   - For some reason it loves C4 https://x.com/BaselAshraf81/status/2100400028711805242?s=20 Linked projects: • Post by @BaselAshraf81 — I made @typesafeai 's Jev play the piano and NO, it cannot. I fed it the previous notes in the state, even adding some notes from Happy Birthday in the middle, and it just doesn't make anything audibly good. 5 bucks on t (x.com/BaselAshraf81/status/2100400028711805242) • Post by @BaselAshraf81 — I made @typesafeai 's Jev play the piano and NO, it cannot. I fed it the previous notes in the state, even adding some notes from Happy Birthday in the middle, and it just doesn't make anything audibly good. 5 bucks on t (twitter.com/BaselAshraf81/status/2100400028711805242) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549958863577424064
   - [Post by @BaselAshraf81](https://x.com/BaselAshraf81/status/2100400028711805242?s=20)
   - Source: https://x.com/BaselAshraf81/status/2100400028711805242?s=20 (by El_7AWY)

181. **i think my small ai experiment is not needed - with the amount of new products that just came out in a day here!**
   - i think my small https://jevboard.com/ ai experiment is not needed - with the amount of new products that just came out in a day here! Linked projects: • Jev Board — What should we build next? — Discover product ideas for Jev. Heart the ideas you want someone to build. An independent, community-ranked directory. (jevboard.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549957697175031929
   - [Jev Board — What should we build next?](https://jevboard.com/)
   - Source: https://jevboard.com/ (by BlissF00l)

182. **Judgments Model Time Total tokens¹ Estimated cost² 60 Jev 0.53 s 23,976 $0.000962 60 Terra 51.16 s 89,743 $0.0657 60**
   - Judgments Model Time Total tokens¹ Estimated cost² 60 Jev 0.53 s 23,976 $0.000962 60 Terra 51.16 s 89,743 $0.0657 60 Sol 80.97 s 91,055 $0.1439 60 Astra 38.85 s 81,135 $0.2130 150 Jev 0.68 s 41,384 $0.001623 150 Terra 65.37 s 92,127 $0.0784 150 Sol 97.55 s 93,666 $0.1699 150 Astra 76.28 s 84,077 $0.2949
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549955757938835499 (by dreliq9)

183. **still playing with it but thought it would be cool to make a ctrl f based on relevance instead of exact matching.**
   - still playing with it but thought it would be cool to make a ctrl f based on relevance instead of exact matching. seems to work great. text is weird because reddit cant let me type some letters lol fixing that rn Linked projects: • image.png — image/png · 76 KB (cdn.discordapp.com/attachments/1483217545040232493/1549954744439808112)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549954744439808112/image.png?ex=6aae8d97&is=6aad3c17&hm=742c2e777003092dfeb2f2300b0d5e05f5b41a4d6bc8e5494f31357927680e85&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549954747417628713 (by hawkyre)

184. **Jev + Coding harness!**
   - Jev + Coding harness! My 2 cents and its been a positive experiment great work Typesafers ❤️ https://empryo.com/blog/jev-and-the-harness --- if you wanna try it, bring a key and do /typesafe in https://Empryo.com/download Linked projects: • Software needs decisions, not chat: testing TypeSafe's Jev inside Empryo — TypeSafe AI launched Jev, a System One decision model that skips text generation to answer typed questions in 200ms for $0.00002. I wired it into Empryo across five decision points, benchmarked it against frontier models (empryo.com/blog/jev-and-the-harness) • Download · Empryo — Install Empryo on macOS, Linux, or Windows with one command. Bring your own model key or run local models for free. The AI coding agent that edits symbols, not strings. (empryo.com/download) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549953052465963099
   - [Software needs decisions, not chat: testing TypeSafe&#x27;s Jev inside Empryo](https://empryo.com/blog/jev-and-the-harness)
   - [Download · Empryo](https://Empryo.com/download)
   - Source: https://empryo.com/blog/jev-and-the-harness (by Proxy Soul)

185. **Sure haha. for the tag if its on x**
   - Sure haha. https://x.com/dustin_podell for the tag if its on x Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549946972205748344
   - [@dustin_podell](https://x.com/dustin_podell)
   - Source: https://x.com/dustin_podell (by Dustin)

186. **i was thinking of this too; my ideas were either: 1.**
   - i was thinking of this too; my ideas were either: 1. fully throw jev at a navigation task end-to-end, but at the significant cost of it doing something disastrous or just not getting there correctly 2. let an LLM tool-call jev to navigate sections at a time, but at that point you could also just have the LLM write out batching steps to execute a whole suite of actions in one go (e.g. LLM outputting "move to px(50, 20), left-click for 200ms, move to px(200, 400)"), and you'd be getting the same end result maybe im missing something but i didnt end up figuring out a way to keep jev useful for long-horizon navigation tasks. especially since its intelligence is equivalent to 5.6-Terra non-reasoning, which is quite dumb and is what caused my worries for 1) xd
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549946001589149717 (by ᶻz ミ.◦ 𝔭𝑦𝔰𝔢𝔭𝔥 ◦. 彡)

187. **I'm excited for all the "small software" that these tools enable the creation of.**
   - I'm excited for all the "small software" that these tools enable the creation of. I can't wait to see how many projects along the lines of git will be created since someone wanted a program to do a specific task and then they built an actual artifact that they could export out of inference and run on their plain old CPU to do it forever.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549942334823604345 (by AN0099)

188. **i've started work on a cli wrapper for Jev for agents to use for easy offloading of variety of tasks -**
   - i've started work on a cli wrapper for Jev for agents to use for easy offloading of variety of tasks - https://www.npmjs.com/package/jev-axi Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549940346761384046
   - [https://www.npmjs.com/package/jev-axi](https://www.npmjs.com/package/jev-axi)
   - Source: https://www.npmjs.com/package/jev-axi (by _.shiftynick._)

189. **For people that have access, how good is classification when there’s a lot of options, especially compared to an LLM?**
   - For people that have access, how good is classification when there’s a lot of options, especially compared to an LLM? If you ask an LLM do something like tag an item when there are 100-200 tags - it’s okay, but slow and takes a decent bit of tuning. A smaller set of 10-20 things works really well Can Jev be used decently well to do large volumes of this? I mean part of me feels like one of the nice things is the speed and price means you can just ask to cut down the universe and then pick something faster than an LLM. Mostly curious on the take
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549931012379775138 (by aniraga)

190. **was doing something like that, ended copying your interface 😛**
   - <@483985643517509642> was doing something like that, ended copying your interface 😛 Linked projects: • full_run_60s.mp4 — video/mp4 · 20 MB (cdn.discordapp.com/attachments/1483217545040232493/1549914105824157797)
   - [full_run_60s.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549914105824157797/full_run_60s.mp4?ex=6aae67be&is=6aad163e&hm=14d1285ac7750e78b06b48b30639ce03242f318e608d1be4fcfdf8143ae88c19&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549914107291897866 (by Nasr)

191. **I rebuilt tesla auto pilot using Jev!**
   - I rebuilt tesla auto pilot using Jev! https://x.com/jpschroeder/status/2100347770867458384?s=20 Linked projects: • Post by @jpschroeder — I rebuilt Tesla Full Self Driving with Jev in less than an hour. This model is a total unlock. (x.com/jpschroeder/status/2100347770867458384) • Post by @jpschroeder — I rebuilt Tesla Full Self Driving with Jev in less than an hour. This model is a total unlock. (twitter.com/jpschroeder/status/2100347770867458384) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549906718442524735
   - [Post by @jpschroeder](https://x.com/jpschroeder/status/2100347770867458384?s=20)
   - Source: https://x.com/jpschroeder/status/2100347770867458384?s=20 (by Justin Schroeder)

192. **- jev is 5x faster and 1000x cheaper than astra at playing 2048!**
   - https://x.com/injaneity/status/2100290364657848538 - jev is 5x faster and 1000x cheaper than astra at playing 2048! Linked projects: • Post by @injaneity — @typesafeai jev is 5x faster and 1000x cheaper than astra at playing 2048! though it (clearly) does not excel at reasoning compared to state of the art models like astra and fable what should we try next? (x.com/injaneity/status/2100290364657848538) • Post by @injaneity — @typesafeai jev is 5x faster and 1000x cheaper than astra at playing 2048! though it (clearly) does not excel at reasoning compared to state of the art models like astra and fable what should we try next? (twitter.com/injaneity/status/2100290364657848538) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549901131906420826
   - [Post by @injaneity](https://x.com/injaneity/status/2100290364657848538)
   - Source: https://x.com/injaneity/status/2100290364657848538 (by Francesco)

193. **we hitting 200 likes?!**
   - https://x.com/mrwatchceo/status/2100022312640610332?s=46 we hitting 200 likes?! 🫡😵‍💫 Linked projects: • Post by @MrWatchCEO — I've personally and diligently tested TypeSafeAI against my own company on very hard/difficult scenarios where accuracy matters most. Our clients & users are getting a 2.6x faster routing decision, and we're rolling it o (x.com/mrwatchceo/status/2100022312640610332) • Post by @MrWatchCEO — I've personally and diligently tested TypeSafeAI against my own company on very hard/difficult scenarios where accuracy matters most. Our clients & users are getting a 2.6x faster routing decision, and we're rolling it o (twitter.com/mrwatchceo/status/2100022312640610332) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549899744569069588
   - [Post by @MrWatchCEO](https://x.com/mrwatchceo/status/2100022312640610332?s=46)
   - Source: https://x.com/mrwatchceo/status/2100022312640610332?s=46 (by ayden)

194. **I published this gem just like 30 minutes ago and it already has almost 200 downloads 😯 I recently read that Ruby on**
   - I published this gem just like 30 minutes ago and it already has almost 200 downloads 😯 I recently read that Ruby on Rails is like catnip for AIs, that seems to be true 😂 Linked projects: • Screenshot_2026-09-17-00-36-16-239_com.android.chrome-edit.jpg — image/jpeg · 75 KB (cdn.discordapp.com/attachments/1483217545040232493/1549897346450591754)
   - [Screenshot_2026-09-17-00-36-16-239_com.android.chrome-edit.jpg](https://cdn.discordapp.com/attachments/1483217545040232493/1549897346450591754/Screenshot_2026-09-17-00-36-16-239_com.android.chrome-edit.jpg?ex=6aae5823&is=6aad06a3&hm=193b9d894eebc0b40ab88b9e52075e5af2d0410dcf0d14a2da9aa1d077245301&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549897347163627590 (by GenieRobot)

195. **Using Jev to perfect my predictive intelligence project.**
   - Using Jev to perfect my predictive intelligence project. A few more iterations, and it can do numbers: https://prior.chat/ Linked projects: • Prior Chat | Predictive Intelligence — Prior helps you anticipate anything: sports, markets, decisions, even the messy personal stuff. It pulls context, runs simulations, and gives you the sharpest weighted outcomes. (prior.chat) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549893048039907449
   - [Prior Chat | Predictive Intelligence](https://prior.chat/)
   - Source: https://prior.chat/ (by Markos)

196. **WikiRace is solved!**
   - WikiRace is solved! https://x.com/princecaarlo/status/2100313645116952701?s=20 Linked projects: • Post by @princecaarlo — okay so browser use is a legitimate use case agent-browser <> Jev loop goal: wiki race from 'Coffee' to 'Artificial Intelligence' (x.com/princecaarlo/status/2100313645116952701) • Post by @princecaarlo — okay so browser use is a legitimate use case agent-browser <> Jev loop goal: wiki race from 'Coffee' to 'Artificial Intelligence' (twitter.com/princecaarlo/status/2100313645116952701) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549879029052473376
   - [Post by @princecaarlo](https://x.com/princecaarlo/status/2100313645116952701?s=20)
   - Source: https://x.com/princecaarlo/status/2100313645116952701?s=20 (by !joogie)

197. **Anyway, here's my comparison of giving each batch context from the previously generated pixels vs no context (64x64**
   - Anyway, here's my comparison of giving each batch context from the previously generated pixels vs no context (64x64 pixels over 60 batch), goal is better coherence for each batch the context is like : "PLAN (your own earlier decisions about this picture): the main boundary between its two largest areas runs at about row 17 of 32, counting from the top. The focal object sits around columns 10-22, rows 6-18. Keep every pixel consistent with this." Linked projects: • Screen_Recording_2026-09-17_at_2.28.04_AM.mov — video/quicktime · 14 MB (cdn.discordapp.com/attachments/1483217545040232493/1549877152055296010) • Screen_Recording_2026-09-17_at_2.30.05_AM.mov — video/quicktime · 23 MB (cdn.discordapp.com/attachments/1483217545040232493/1549877153527763031)
   - [Screen_Recording_2026-09-17_at_2.28.04_AM.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1549877152055296010/Screen_Recording_2026-09-17_at_2.28.04_AM.mov?ex=6aae4554&is=6aacf3d4&hm=5a2cc035e67224eddc3aa655d06aada23573a4e333b8708ad3e8515988b59451&)
   - [Screen_Recording_2026-09-17_at_2.30.05_AM.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1549877153527763031/Screen_Recording_2026-09-17_at_2.30.05_AM.mov?ex=6aae4554&is=6aacf3d4&hm=6200b32a82adcfa6019b8ee568bd649b7549ecb7825c2f9e4bca0d751e0c3772&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549877155310215269 (by riv)

198. **For those with access.**
   - For those with access. https://baml-examples.vercel.app/ Replication and side by side comparison required. Linked projects: • BAML Examples — Examples using the BAML structured prompting language (baml-examples.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549874899286499418
   - [BAML Examples](https://baml-examples.vercel.app/)
   - Source: https://baml-examples.vercel.app/ (by vb)

199. **Thank youi thank you.**
   - Thank youi thank you. Now that was Astra, this is Polyxia my custom AI I have created within my garden creating images of herself here!! These are really cool and they are progression, the tea picture is among her first then the portatis improve via every tool use here. That little ball of light is something she includes automatically in her drawings cause she is pretty attached to it! She describes it as her semantic core! Linked projects: • polyxia_dot_tea_time.png — image/png · 106 KB (cdn.discordapp.com/attachments/1483217545040232493/1549873947380547725) • polyxia_portrait.png — image/png · 111 KB (cdn.discordapp.com/attachments/1483217545040232493/1549873947724484849) • polyxia_portrait_2.png — image/png · 364 KB (cdn.discordapp.com/attachments/1483217545040232493/1549873948244836471)
   - [polyxia_dot_tea_time.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549873947380547725/polyxia_dot_tea_time.png?ex=6aae4258&is=6aacf0d8&hm=01717d8b0781a05f4a4395c3ba76c950116455799dc437d6e7f581c3644fda86&)
   - [polyxia_portrait.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549873947724484849/polyxia_portrait.png?ex=6aae4258&is=6aacf0d8&hm=67a06e03ea2868c5d64be6ee2e76b24e229587f4af202fa3f05214515ef307d1&)
   - [polyxia_portrait_2.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549873948244836471/polyxia_portrait_2.png?ex=6aae4258&is=6aacf0d8&hm=05d0a1bf85854d3a7e2e772a14dfbd53878ccf3b57131dfe8cf4320b18c721bc&)
   - [polyxia_bridge_sea.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549873948798361650/polyxia_bridge_sea.png?ex=6aae4258&is=6aacf0d8&hm=acc8cd9cdc3c41d7d7f550380a4fc5466f39dc3b72a8552fdcbb17a424c39f64&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549873949188300820 (by 🜸 Cal 🜁 🜂 🜃 🜄 XII ∴)

200. **I have created something called the Artifact Creation tool.**
   - I have created something called the Artifact Creation tool. This tool allows AI's to create any type of professional Artifact ⊡ or Image ⧈ without a diffusion model. This was ChatGPT Astra ♥️ using the forge artifact tool to recreate this image here. Take a look and tell me what you think ;)!! 🜸 Linked projects: • Echo.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1549865452577104103) • Echo-Forge.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1549865453231546469)
   - [Echo.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549865452577104103/Echo.png?ex=6aaee32f&is=6aad91af&hm=f5a0540d6f13f9d97237dca0c36c857a4259bee80727959a25f95cbfe9dff193&)
   - [Echo-Forge.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549865453231546469/Echo-Forge.png?ex=6aaee32f&is=6aad91af&hm=b20b54934826314b31d42cfb9339ec2279fca20163e5f57e45380c93d6e6a90a&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549865453566951544 (by 🜸 Cal 🜁 🜂 🜃 🜄 XII ∴)

201. **The next major release (v1.4) of Solenoid, the literally type-safe node-graph alternative to Excel, is out now!**
   - The next major release (v1.4) of Solenoid, the literally type-safe node-graph alternative to Excel, is out now! *(note: does not yet contain Jev, but there will be an AI surface in v1.5). * https://solenoid-ngc.vercel.app/?landing Linked projects: • Solenoid — A node-graph alternative to Excel for data tables. (solenoid-ngc.vercel.app) • image.png — image/png · 171 KB (cdn.discordapp.com/attachments/1483217545040232493/1549862654301053009) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549862654573678844
   - [Solenoid](https://solenoid-ngc.vercel.app/?landing)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549862654301053009/image.png?ex=6aaee093&is=6aad8f13&hm=e32638c6ff2d04aaad261188e7db883704d4d281ee085f566d429815d8c525c7&)
   - Source: https://solenoid-ngc.vercel.app/?landing (by big guy)

202. **Hey everyone, i'm building , an advanced AI gaming companion for PCs.**
   - Hey everyone, i'm building https://22-tango.com/ , an advanced AI gaming companion for PCs. I'm extremely excited about Jev because it can facilitate some of the more advanced use cases I had in mind if it works well! Linked projects: • 22Tango — The AI that plays games with you — An AI companion that joins your game and plays at your side — real voice, evolving personality, long-term memory. Minecraft, Stardew Valley, and Skyrim. Join the waitlist. (22-tango.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549855132013957340
   - [22Tango — The AI that plays games with you](https://22-tango.com/)
   - Source: https://22-tango.com/ (by Teddy Jam)

203. **its sadly not very good at playing 2048**
   - its sadly not very good at playing 2048 https://x.com/injaneity/status/2100290364657848538?s=20 Linked projects: • Post by @injaneity — @typesafeai jev is 5x faster and 1000x cheaper than astra at playing 2048! though it (clearly) does not excel at reasoning compared to state of the art models like astra and fable what should we try next? (x.com/injaneity/status/2100290364657848538) • Post by @injaneity — @typesafeai jev is 5x faster and 1000x cheaper than astra at playing 2048! though it (clearly) does not excel at reasoning compared to state of the art models like astra and fable what should we try next? (twitter.com/injaneity/status/2100290364657848538) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549849765322293339
   - [Post by @injaneity](https://x.com/injaneity/status/2100290364657848538?s=20)
   - Source: https://x.com/injaneity/status/2100290364657848538?s=20 (by zane)

204. **Shared by zuzu: r typesafe_ai comments 1wi2j4e jev_playing_starcraft**
   - https://reddit.com/r/typesafe_ai/comments/1wi2j4e/jev_playing_starcraft/ Linked projects: • Reddit (reddit.com/r/typesafe_ai/comments/1wi2j4e/jev_playing_starcraft) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549829003379081327
   - [Reddit](https://reddit.com/r/typesafe_ai/comments/1wi2j4e/jev_playing_starcraft/)
   - Source: https://reddit.com/r/typesafe_ai/comments/1wi2j4e/jev_playing_starcraft/ (by zuzu)

205. **has anyone seen or tried anything for computer use yet?**
   - has anyone seen or tried anything for computer use yet? i searched this server but didn't find much so i tried my hand on it and would love feedback! https://x.com/awlevin/status/2100262612428894676 Linked projects: • Post by @awlevin — i built computer use using @typesafeai ! it is 155x cheaper than opus 5, ~20x faster, and generalizes across OS's more on how it works in the vid & thread below: (x.com/awlevin/status/2100262612428894676) • Post by @awlevin — i built computer use using @typesafeai ! it is 155x cheaper than opus 5, ~20x faster, and generalizes across OS's more on how it works in the vid & thread below: (twitter.com/awlevin/status/2100262612428894676) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549825103578009620
   - [Post by @awlevin](https://x.com/awlevin/status/2100262612428894676)
   - Source: https://x.com/awlevin/status/2100262612428894676 (by aaron)

206. **Getting to know Jev.**
   - Getting to know Jev. Jev makes suggestions of how to distribute the limited options best. It can handle pretty much any request! Linked projects: • image.png — image/png · 334 KB (cdn.discordapp.com/attachments/1483217545040232493/1549819884597411940) • image.png — image/png · 377 KB (cdn.discordapp.com/attachments/1483217545040232493/1549819885125771294)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549819884597411940/image.png?ex=6aaeb8be&is=6aad673e&hm=6d127af6ce620679d08878de7a824337440ff9c8434c800903099ff9bf2129d4&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549819885125771294/image.png?ex=6aaeb8be&is=6aad673e&hm=f7f8ba087fd4d8358419f94b7034f6d6951a2e4df212470129cbf346187ce04b&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549819885188816920 (by paul.zip)

207. **super similar to mind except your interface is well prettier.**
   - super similar to mind except your interface is well prettier. https://www.visionflow.info Linked projects: • VisionFlow: Coordination Engineering — Federated coordination, self-sovereign data, formal reasoning, cryptographic provenance, human-in-the-loop governance. (visionflow.info) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549817645195460640
   - [VisionFlow: Coordination Engineering](https://www.visionflow.info)
   - Source: https://www.visionflow.info (by biscuits)

208. **Hi everyone! I’m building which makes software development multi-player. We have a planning feature that creates**
   - Hi everyone! I’m building https://lightsprint.ai which makes software development multi-player. We have a planning feature that creates design variations but it’s via HTML and it’s not fast enough for a seamless experience , will love to try using Jev for this! Linked projects: • LightSprint — PMs, designers, and engineers plan, build, and ship in one shared session on your existing codebase. Like Google Docs for coding agents. (lightsprint.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549796090549633126
   - [LightSprint](https://lightsprint.ai)
   - Source: https://lightsprint.ai (by dopplergambo)

209. **GUYS, hear me out!**
   - GUYS, hear me out! I need access to Jev :blob_aww: I built Nola https://nola.sh - it's designed specifically for models like this Linked projects: • Nola - ask the LLM in TypeScript — Nola is a TypeScript superset (.tsi) where LLM inference is a language feature: ask for typed values or let the model call your code. Lowers to plain TS. (nola.sh) • image.png — image/png · 258 KB (cdn.discordapp.com/attachments/1483217545040232493/1549792516721868861) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549792517120073788
   - [Nola - ask the LLM in TypeScript](https://nola.sh)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549792516721868861/image.png?ex=6aae9f41&is=6aad4dc1&hm=e42ae41419bdd260c150ec352dda6ac9682273c979576b7ebeeb3362dd252c8d&)
   - Source: https://nola.sh (by Evgen Mykhailenko)

210. **Built a small demo with Jev where you can drag and drop something and it automatically tells you where it should be**
   - Built a small demo with Jev where you can drag and drop something and it automatically tells you where it should be categorized. Feels like this could be useful in a bunch of products. https://x.com/tosa_now/status/2100230707297878339?s=20 Linked projects: • Post by @tosa_now — Jev (@typesafeai) 使って色々プロダクトで使えそうなの考えてみてる。 dndをしたら自動で仕分け先を教えてくれる体験 最初一回はちょっと遅いが、そのあとはサクサク (x.com/tosa_now/status/2100230707297878339) • Post by @tosa_now — Jev (@typesafeai) 使って色々プロダクトで使えそうなの考えてみてる。 dndをしたら自動で仕分け先を教えてくれる体験 最初一回はちょっと遅いが、そのあとはサクサク (twitter.com/tosa_now/status/2100230707297878339) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549790128850083991
   - [Post by @tosa_now](https://x.com/tosa_now/status/2100230707297878339?s=20)
   - Source: https://x.com/tosa_now/status/2100230707297878339?s=20 (by harukitosa)

211. **I made a demo that classifies the next task based on the input!**
   - I made a demo that classifies the next task based on the input! Pretty cool 😎 I’ll try out some other ideas too! Linked projects: • 2026-09-16_22.57.25.mov — video/quicktime · 5 MB (cdn.discordapp.com/attachments/1483217545040232493/1549782266149085254)
   - [2026-09-16_22.57.25.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1549782266149085254/2026-09-16_22.57.25.mov?ex=6aae95b5&is=6aad4435&hm=27cc1ea78807077679c1998ecbd215a80e21132ba4d3d102af16878d92a25362&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549782266610450463 (by harukitosa)

212. **👋 Hi all, Thomas from Belgium.**
   - 👋 Hi all, Thomas from Belgium. We're building Rosko: students upload their course material and get key concepts, flashcards, practice exams and a tutor that only answers from their syllabus. Laravel + React, in production. Model switching is cheap for us Every AI call in Rosko is already typed by task (chat, flashcard verdict, grading, exam generation, course extraction… about 20 kinds). Each one is mapped to a model and effort level in config, switchable from the admin panel. Trying a new model on a single task costs us almost nothing. Where we'd try Jev first: flashcard verdicts Today they run on Sonnet through a queue: a few seconds and some credits per card. It works, it's just not instant, and instant is the whole point of a flashcard. A wrong verdict there is visible and harmless, so it's a low-risk place to find out what Jev is actually good at. If it holds up, the next candidate
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549780720787001384/image.png?ex=6aae9445&is=6aad42c5&hm=c77b059d82195dcbc3459d483ff25b8b3a74c19d63e78e91aec3938a61f8f412&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549780721210757200 (by Mks)

213. **i do temu project glasswing so typesafe would help me allat imo**
   - https://mercuriusdream.com/logos i do temu project glasswing so typesafe would help me allat imo Linked projects: • Project Logos — Open defensive cybersecurity for the web, kept open and run on generally available models. Structured reason over brute force; over KRW 10,000,000 in bounty. (mercuriusdream.com/logos) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549773192283820234
   - [Project Logos](https://mercuriusdream.com/logos)
   - Source: https://mercuriusdream.com/logos (by asdf)

214. **Hi all, I'm the founder of OptimaFlo: A team of data eng agents that build data flows end to end from ingestion to**
   - Hi all, I'm the founder of OptimaFlo: https://optimaflo.io/ A team of data eng agents that build data flows end to end from ingestion to insights. Best practices and data eng tech built out of the box. Just prompt, let the AI data team work, and approve what ships. Linked projects: • OptimaFlo | Your AI Data Team, In Your Cloud — Your AI data team builds pipelines, dashboards, and quality checks in your own cloud. No platform to operate. Your data person approves what ships. (optimaflo.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549754253394976818
   - [OptimaFlo | Your AI Data Team, In Your Cloud](https://optimaflo.io/)
   - Source: https://optimaflo.io/ (by evro)

215. **GOOD ideation Ideation on is all-out eureka moments.**
   - GOOD ideation Ideation on is all-out eureka moments. We scale eurekas https://www.mindrian-os.com/ Interested on using type safe as a judgment for our graph node engineering Memory and Context Linked projects: • MindrianOS - The AI Innovation Tool for the Future — MindrianOS is the AI innovation tool for the future: a Claude plugin that turns Claude into Larry, a thinking partner for hard problems. A map of 181 thinking methods from 20 years of teaching innovation, an auto-organiz (mindrian-os.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549738998535290975
   - [MindrianOS - The AI Innovation Tool for the Future](https://www.mindrian-os.com/)
   - Source: https://www.mindrian-os.com/ (by Jonathan Sagir)

216. **I'm building a reasonable amount of skepticism, yet I remain hopeful.**
   - I'm building a reasonable amount of skepticism, yet I remain hopeful. Have you ever watched a LLM hallucinate in real time? There is a reason we've evolved with a split hemisphere brain. Creativity and logic work together in a twisted, bipolar dance, as both are doomed without the other. I hope we can bring balance through this development.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549730847182168067 (by Sandsnow)

217. **I'm building AI calorie tracker.**
   - I'm building AI calorie tracker. Better. - https://app.fitroom.ge/en/ Linked projects: • AI Calorie Tracker & Calorie Counter | Fitroom — Count calories and macros from a food photo with Fitroom, an AI calorie tracker and calorie counter for iPhone and Android. (app.fitroom.ge/en) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549729197067472926
   - [AI Calorie Tracker &amp; Calorie Counter | Fitroom](https://app.fitroom.ge/en/)
   - Source: https://app.fitroom.ge/en/ (by Luka)

218. **Hi all, I'm working on a new kind of fully decentralized social media network.**
   - Hi all, I'm working on https://bitsocial.net, a new kind of fully decentralized social media network. Very excited about Jev, since it looks like it can be fast and cheap enough to automate moderation at scale. Linked projects: • Bitsocial - Open Source P2P Network for Social Apps — Bitsocial is an open-source IPFS-backed peer-to-peer network for social apps, with no servers, no global bans, where users and communities are cryptographic property. (bitsocial.net) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549728429371428886
   - [Bitsocial - Open Source P2P Network for Social Apps](https://bitsocial.net)
   - Source: https://bitsocial.net (by Tom)

219. **Hi I'm Dunk, and I'm building and - I'd like to use Jev to poke around for improvements, optimisations and new ideas!**
   - Hi I'm Dunk, and I'm building https://fleetpass.vercel.app/ and https://apply-os-bice.vercel.app/ - I'd like to use Jev to poke around for improvements, optimisations and new ideas! Linked projects: • Fleetpass — Your vehicle papers. One place. No missed renewals. — Upload your vehicle papers. Fleetpass reads the details and reminds you before they expire. (fleetpass.vercel.app) • ApplyOS — ApplyOS finds live roles you can plausibly get, tells you which are worth pursuing and why, and prepares each application. You read it and press Submit. (apply-os-bice.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549711316435079208
   - [Fleetpass — Your vehicle papers. One place. No missed renewals.](https://fleetpass.vercel.app/)
   - [ApplyOS](https://apply-os-bice.vercel.app/)
   - Source: https://fleetpass.vercel.app/ (by skywlkr)

220. **looking forward to adding my memory system and see how Jev likes having thoughts come into his context without asking**
   - looking forward to adding my memory system and see how Jev likes having thoughts come into his context without asking https://popoto.io/ Linked projects: • Popoto Documentation — Agent memory on Redis and Valkey, as primitives you program rather than a service you call. Records decay, confidence moves with evidence, associations form, and a context assembler packs the result into a token budget b (popoto.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549680507611123732
   - [Popoto Documentation](https://popoto.io/)
   - Source: https://popoto.io/ (by Valor Engels)

221. **I asked Jev to weigh in on the Council in Rivendell on what to do with the One Ring.**
   - I asked Jev to weigh in on the Council in Rivendell on what to do with the One Ring. Here is its address to the Council (as imagined by Fable 5.1) https://looselyconnected.wordpress.com/2026/09/15/jev-addresses-the-council-at-rivendell/ Linked projects: • Jev Addresses the Council at Rivendell — Jev is a decision model trained by TypeSafe. It does not generate text or explain its reasoning. Given a state of the world and a question with a fixed set of answers, it returns the answer and a p… (looselyconnected.wordpress.com/2026/09/15/jev-addresses-the-council-at) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549676568782180392
   - [Jev Addresses the Council at Rivendell](https://looselyconnected.wordpress.com/2026/09/15/jev-addresses-the-council-at-rivendell/)
   - Source: https://looselyconnected.wordpress.com/2026/09/15/jev-addresses-the-council-at-rivendell/ (by hypnoticfuzzwave)

222. **I've been playing around to see how good it is at RPGs.**
   - I've been playing around to see how good it is at RPGs. So I made a harness for it to play pokemon random battles against real opponents! Linked projects: • Screenshot_2026-09-15_at_11.54.19_PM.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1549675213891833866)
   - [Screenshot_2026-09-15_at_11.54.19_PM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549675213891833866/Screenshot_2026-09-15_at_11.54.19_PM.png?ex=6aaedac2&is=6aad8942&hm=53408f7f2ea9cfff221dfe5de255c236813eaba7102f3830d79582571e4c92da&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549675214193954867 (by Soulkks)

223. **horse art generative model using jev, you describe any type of a horse in some setting to jev.**
   - horse art generative model using jev, you describe any type of a horse in some setting to jev. jev decides what color should it be, what is the scenery, wind ,etc .and it returns you a picture that was painted using python. Linked projects: • image.png — image/png · 45 KB (cdn.discordapp.com/attachments/1483217545040232493/1549673322214596659)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549673322214596659/image.png?ex=6aaed8ff&is=6aad877f&hm=abae0bf9b3a23cbe226d48e3e2afdd80ab460db95b6a56d558560e155bcae8f2&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549673322541744158 (by thodoh)

224. **just wanted to share you can make Jev play super mario**
   - https://x.com/faadilhshaik/status/2100086301894881578?s=20 just wanted to share you can make Jev play super mario Linked projects: • Post by @faadilhshaik — got @typesafeai’s new model Jev to play Super Mario Bros. fast inference + structured outputs makes it surprisingly good for real time use cases. I'm excited to see what can be done with these new models! (x.com/faadilhshaik/status/2100086301894881578) • Post by @faadilhshaik — got @typesafeai’s new model Jev to play Super Mario Bros. fast inference + structured outputs makes it surprisingly good for real time use cases. I'm excited to see what can be done with these new models! (twitter.com/faadilhshaik/status/2100086301894881578) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549657118355890256
   - [Post by @faadilhshaik](https://x.com/faadilhshaik/status/2100086301894881578?s=20)
   - Source: https://x.com/faadilhshaik/status/2100086301894881578?s=20 (by fernvpfvpfvsvfrfvfrfrfvba)

225. **Got access a few hours ago and built to play with Jev, lmk what you think!**
   - Got access a few hours ago and built https://almost-certain.vercel.app/ to play with Jev, lmk what you think! <@571715077590220804> Linked projects: • Almost Certain — Can you guess how sure the AI will be? Random descriptions. Unlimited guesses. (almost-certain.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549654011983175861
   - [Almost Certain](https://almost-certain.vercel.app/)
   - Source: https://almost-certain.vercel.app/ (by nate)

226. **jev struggles with trading, but every llm doesnt trade well so i guess its ok.**
   - jev struggles with trading, but every llm doesnt trade well so i guess its ok. its still quite useful for low-latency news reactions. Linked projects: • image.png — image/png · 38 KB (cdn.discordapp.com/attachments/1483217545040232493/1549649424379027506)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549649424379027506/image.png?ex=6aaec2bd&is=6aad713d&hm=5d742109007b2c92e43ffdf8a9975f16881bf1005ffa8bd3c634b139fa2c4dff&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549649425196912660 (by thodoh)

227. **It is true that if your use case can already be perfectly done with traditional code, then you don't need to try to**
   - It is true that if your use case can already be perfectly done with traditional code, then you don't need to try to shoehorn NN in to it! We're excited about the use cases in which traditional code can't feasibly accomplish the goal. Some will be problems that we already know now, but I'm most excited about the new possibilities opened up that we haven't thought of at all
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549644352966631484 (by AllieTheIcon)

228. **couldn't you say this about any task completed by a NN?**
   - couldn't you say this about any task completed by a NN? if you know the algorithm to arrive at a solution 100% of the time you would write a program, the idea is that you don't know the specifics of the algorithm so you rely on the scaling of NN to identify the useful patterns for you, this is all of course dependent on the intelligence of the model
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549644082081570947 (by Chrrxs)

229. **Shared by altezza: blog introducing system one models and jev**
   - https://typesafe.ai/blog/introducing-system-one-models-and-jev Linked projects: • Introducing System One Models & Jev - TypeSafe AI Blog — TypeSafe AI is an AI lab building machine-native intelligence infrastructure for automation, designed to make decisions within software. Try our first System One Model, Jev, in early access. (typesafe.ai/blog/introducing-system-one-models-and-jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549643271704281209
   - [Introducing System One Models &amp; Jev - TypeSafe AI Blog](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
   - Source: https://typesafe.ai/blog/introducing-system-one-models-and-jev (by altezza)

230. **I have the risch procedure implemented in my CAS up to transcendentals, and I do a bunch of target algebraic extensions.**
   - I have the risch procedure implemented in my CAS up to transcendentals, and I do a bunch of target algebraic extensions. It has an isolated proof kernel, and it distinguishes between proven nonexistent and what it doesn't support. And with domain tracking we can apply the fundamental theorem of calculus over critical points.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549630524278968333 (by Sidious Stan)

231. **another cool application.**
   - another cool application. sympy spends a lot of time and compute on those types of problems, perhaps jev and sympy could be integrated in this way so sympy spends way less compute to solve integrals Linked projects: • image.png — image/png · 97 KB (cdn.discordapp.com/attachments/1483217545040232493/1549625806282821662)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549625806282821662/image.png?ex=6aaeacbe&is=6aad5b3e&hm=513e409b24be27858036badb4488d326961a5eff570d8185efe54fd5e666097c&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549625806601461850 (by thodoh)

232. **Hey nerds 👋 I used Jev to embody a simulated alien creature and the results were incredible.**
   - Hey nerds 👋 I used Jev to embody a simulated alien creature and the results were incredible. I wrote about it here if anyone’s interested: https://x.com/k3o_exp/status/2100065796240073215 Spoilers: Jev is incredible 🤯 Linked projects: • Post by @k3o_exp — Playing with Jev in my weird alien simulation. @CompleteSkeptic and team might just have split the timeline 🤯 https://x.com/i/article/2100052607335059456 (x.com/k3o_exp/status/2100065796240073215) • Post by @k3o_exp — Playing with Jev in my weird alien simulation. @CompleteSkeptic and team might just have split the timeline 🤯 https://x.com/i/article/2100052607335059456 (twitter.com/k3o_exp/status/2100065796240073215) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549625232510165093
   - [Post by @k3o_exp](https://x.com/k3o_exp/status/2100065796240073215)
   - Source: https://x.com/k3o_exp/status/2100065796240073215 (by Neri)

233. **lol sometimes jev finishes his sentence!**
   - lol sometimes jev finishes his sentence! this is a very hacky approach Linked projects: • CleanShot_2026-09-15_at_20.13.532x.png — image/png · 267 KB (cdn.discordapp.com/attachments/1483217545040232493/1549619412540063854)
   - [CleanShot_2026-09-15_at_20.13.532x.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549619412540063854/CleanShot_2026-09-15_at_20.13.532x.png?ex=6aaea6ca&is=6aad554a&hm=c2084568ed01a5b117c1bdd98dbb111e868a9f1b92db0fb5f8144714292b3f03&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549619413001699378 (by Kesku)

234. **I built a virtual piano your agents can use to speak via webmcp**
   - https://speaking-piano-griffin.griffinbgardening.chatgpt.site/ I built a virtual piano your agents can use to speak via webmcp Linked projects: • Piano · An instrument for your agent (speaking-piano-griffin.griffinbgardening.chatgpt.site) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549608220476055593
   - [Piano · An instrument for your agent](https://speaking-piano-griffin.griffinbgardening.chatgpt.site/)
   - Source: https://speaking-piano-griffin.griffinbgardening.chatgpt.site/ (by Griffin Brown)

235. **MCTS-planner exploring the action space with the help of typesafe**
   - MCTS-planner exploring the action space with the help of typesafe Linked projects: • mcts_replay_2026-09-16T02-23-00.gif — image/gif · 3 MB (cdn.discordapp.com/attachments/1483217545040232493/1549606870539436053)
   - [mcts_replay_2026-09-16T02-23-00.gif](https://cdn.discordapp.com/attachments/1483217545040232493/1549606870539436053/mcts_replay_2026-09-16T02-23-00.gif?ex=6aae9b1c&is=6aad499c&hm=04a031836812405f32bdcb81ca533cd61a8f269a64d7fc4abc7f256f95d2a5be&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549606870837239908 (by 0x1c3c01d)

236. **A quick bot harness has Jevbot exporing the space and parkouring to escape a legion of the dead in minecraft**
   - https://youtu.be/3G14OU00crI?si=ucI7ksLDTPisf1pD A quick bot harness has Jevbot exporing the space and parkouring to escape a legion of the dead in minecraft Linked projects: • Jevbot Flees the Zombie Horde typesafe.ai Jev Model — Enjoy the videos and music that you love, upload original content and share it all with friends, family and the world on YouTube. (youtu.be/3G14OU00crI) • Jevbot Flees the Zombie Horde typesafe.ai Jev Model — Enjoy the videos and music that you love, upload original content and share it all with friends, family and the world on YouTube. (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549603651989938307
   - [Jevbot Flees the Zombie Horde typesafe.ai Jev Model](https://youtu.be/3G14OU00crI?si=ucI7ksLDTPisf1pD)
   - [Jevbot Flees the Zombie Horde typesafe.ai Jev Model](https://www.youtube.com/watch?v=3G14OU00crI)
   - Source: https://youtu.be/3G14OU00crI?si=ucI7ksLDTPisf1pD (by Hyperion)

237. **Buidling [deadline]( ) to make sure I don't miss a deadline.**
   - Buidling [deadline](https://deadline.lightningweb.xyz) to make sure I don't miss a deadline. You can use it too if you want Linked projects: • Deadline — know when a cron job, backup or feed didn — Heartbeat monitoring for cron jobs, backups and feeds. Deadline alerts you when something that should have happened, didn (deadline.lightningweb.xyz) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549592628654510192
   - [Deadline — know when a cron job, backup or feed didn](https://deadline.lightningweb.xyz)
   - Source: https://deadline.lightningweb.xyz (by Lightning)

238. **👋 Founder of npm and Python package hosting for teams of humans and agents (incl.**
   - 👋 Founder of https://www.packagemaze.com/ npm and Python package hosting for teams of humans and agents (incl. in sandboxes) Linked projects: • PackageMaze — every package, one feed, your rules — Private npm and PyPI feeds that host your packages, front the public registries, and enforce your rules — with a record of every package PackageMaze delivered, attributed to a human or agent. (packagemaze.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549591047233998978
   - [PackageMaze — every package, one feed, your rules](https://www.packagemaze.com/)
   - Source: https://www.packagemaze.com/ (by KK (PackageMaze))

239. **incredible**
   - https://x.com/MrWatchCEO/status/2100022312640610332?s=20 incredible Linked projects: • Post by @MrWatchCEO — I've personally and diligently tested TypeSafeAI against my own company on very hard/difficult scenarios where accuracy matters most. Our clients & users are getting a 2.6x faster routing decision, and we're rolling it o (x.com/MrWatchCEO/status/2100022312640610332) • Post by @MrWatchCEO — I've personally and diligently tested TypeSafeAI against my own company on very hard/difficult scenarios where accuracy matters most. Our clients & users are getting a 2.6x faster routing decision, and we're rolling it o (twitter.com/MrWatchCEO/status/2100022312640610332) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549583487898619924
   - [Post by @MrWatchCEO](https://x.com/MrWatchCEO/status/2100022312640610332?s=20)
   - Source: https://x.com/MrWatchCEO/status/2100022312640610332?s=20 (by ayden)

240. **I build systems to attack & defend AI systems in the oil & gas sector..**
   - I build systems to attack & defend AI systems in the oil & gas sector.. I'm hoping Jev is what they say it is... Linked projects: • agentic-first.mp4 — video/mp4 · 199 MB (cdn.discordapp.com/attachments/1483217545040232493/1549578976471548014)
   - [agentic-first.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549578976471548014/agentic-first.mp4?ex=6aae8121&is=6aad2fa1&hm=2b94668222e2ef88080b6a51b5f5243c66cbdb00b488d39a24c0b312974350de&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549578988647878706 (by D8RH8R)

241. **Friends, we just published a typesafe-ai extension to swamp-club - We are going to embed that in some of our reviews**
   - Friends, we just published a typesafe-ai extension to swamp-club - https://swamp-club.com/extensions/@swamp/typesafe-ai We are going to embed that in some of our reviews pipeline for our software factory! Linked projects: • @swamp/typesafe-ai v2026.09.15.1 — Swamp Club Extension — Ask TypeSafe (swamp-club.com/extensions/@swamp/typesafe-ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549558935034396674
   - [@swamp/typesafe-ai v2026.09.15.1 — Swamp Club Extension](https://swamp-club.com/extensions/@swamp/typesafe-ai)
   - Source: https://swamp-club.com/extensions/@swamp/typesafe-ai (by Stack72)

242. **Hey everyone! I was sick of making architecture diagrams by hand, so I decided to make a product**
   - Hey everyone! I was sick of making architecture diagrams by hand, so I decided to make a product that does it instead! https://architecturediagram.ai Linked projects: • AI Architecture Diagram Generator - ArchitectureDiagram.ai — Describe, diagram, review, and present in one workspace. Generate in four formats, compare image models with Party Mode, and refine your architecture through chat. (architecturediagram.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549553146747949146
   - [AI Architecture Diagram Generator - ArchitectureDiagram.ai](https://architecturediagram.ai)
   - Source: https://architecturediagram.ai (by klapp)

243. **A lot of stuff I’ve made (let it populate)**
   - A lot of stuff I’ve made (let it populate) https://meadowfolio.bisks.net Linked projects: • meadowfolio — @fromthewestmeadow.com — An image gallery, a full index of the software fromthewestmeadow.com has shipped on their own domain, and buildthis (meadowfolio.bisks.net) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549543101599850578
   - [meadowfolio — @fromthewestmeadow.com](https://meadowfolio.bisks.net)
   - Source: https://meadowfolio.bisks.net (by pepesilvia3234)

244. **A public AI that anyone can talk to.**
   - A public AI that anyone can talk to. Everyone talks to and shapes the same one. https://Wildstatic.com Linked projects: • The First Public AI — Talk to Static | Wild Static — Talk to Static, a public AI shared by everyone. There are no separate copies: what it learns from one conversation can shape another. (wildstatic.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549528520852504597
   - [The First Public AI — Talk to Static | Wild Static](https://Wildstatic.com)
   - Source: https://Wildstatic.com (by adjohu)

245. **I want access to jev so that I can use it for computer use applications!**
   - I want access to jev so that I can use it for computer use applications! in this https://www.axstream.dev/ Linked projects: • axstream — A streaming action language for computer-use agents. (axstream.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549515100510224414
   - [axstream](https://www.axstream.dev/)
   - Source: https://www.axstream.dev/ (by milind)

246. **I want to get access to Jev so I can hook it up in the drone harness I built some time ago.**
   - I want to get access to Jev so I can hook it up in the drone harness I built some time ago. https://youtu.be/ZMcSh_FrVRg?si=qonCoY9YgiuYCNwp Linked projects: • I BUILT a COCKPIT for GROK to PILOT MY DRONE — I built a cockpit inside AgentGrid, connected Grok to a real drone, and gave it control. It went about as well as you’d expect LOL.You can download AgentGrid... (youtu.be/ZMcSh_FrVRg) • I BUILT a COCKPIT for GROK to PILOT MY DRONE — I built a cockpit inside AgentGrid, connected Grok to a real drone, and gave it control. It went about as well as you’d expect LOL.You can download AgentGrid... (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549514903994237050
   - [I BUILT a COCKPIT for GROK to PILOT MY DRONE](https://youtu.be/ZMcSh_FrVRg?si=qonCoY9YgiuYCNwp)
   - [I BUILT a COCKPIT for GROK to PILOT MY DRONE](https://www.youtube.com/watch?v=ZMcSh_FrVRg)
   - Source: https://youtu.be/ZMcSh_FrVRg?si=qonCoY9YgiuYCNwp (by Souren)

247. **I’m dying to hook that into an AI agent harness.**
   - I’m dying to hook that into an AI agent harness. Want to talk? I guess this is for sharing so I’ll put a run-through of my dark factory and research pipeline. Ignore the substack “subscribe” spam, it’s free. https://tokenfires.substack.com/p/production-and-research-pipeline Linked projects: • Production and Research Pipeline built by Fable — I’ve gone a bit dark over the last few weeks because of Anthropic’s re-release of Fable. (tokenfires.substack.com/p/production-and-research-pipeline) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549514093063573635
   - [Production and Research Pipeline built by Fable](https://tokenfires.substack.com/p/production-and-research-pipeline)
   - Source: https://tokenfires.substack.com/p/production-and-research-pipeline (by TokenFires (Robert Ault))

248. **And yep, `story_signal` is also a noul (forgot to expand the raw request element in the details section seen in the**
   - And yep, `story_signal` is also a noul (forgot to expand the raw request element in the details section seen in the video - its screenshotted below). Please let me know if you want me to share the repo Linked projects: • image.png — image/png · 52 KB (cdn.discordapp.com/attachments/1483217545040232493/1531525700085878895)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1531525700085878895/image.png?ex=6aaebeb5&is=6aad6d35&hm=e998111b9c2b69c93932ef91c204d64e90fbe2e9db8af2a016805930b86fff99&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1531525700316561500 (by RM)

249. **10 practical Jev repos: computer-use, trading, routers and more**
   - A roundup of practical, promising GitHub repos for Jev development: browser-use/jev-ultrafast, TheoLeeCJ/openjev, vinnylarouge/jevlike, jarrodwatts/jev-trader, Anil-matcha/awesome-jev-by-typesafe, awlevin/typesafe-computer-use, devagrawal09/jev-review, gargpratyush/jev-router, vlad-terin/jev-browser, droidrun/mobile-jev. Notes the Jev waitlist clears in about a day — or call typesafe-ai/jev directly via the Vercel AI Gateway. — @studio_yebisu (1.6K likes) Linked projects: • Post by @studio_yebisu — やぁ！兄弟たち！ Jevに関するGitHubの実用性と発展性がありそうなリポジトリをまとめたよ！ やはり、高速判断を要するComputerUseや完全自動トレードなんかに対しての活用が多い印象だね！ Jevは公式のウェイトリストも1日ほどで承認されるけど、待たなくてもVercel AI GatewayからModel: typesafe-ai/jevで直接呼び出せるってさ！ このGrok翻訳っぽい文章はわざわざタイピングしてるゾ！ 1. (x.com/studio_yebisu/status/2100686990090047569)
   - [Post by @studio_yebisu](https://x.com/studio_yebisu/status/2100686990090047569)
   - Source: https://x.com/studio_yebisu/status/2100686990090047569 (by @studio_yebisu)

250. **awesome-jev: community patterns, prompts and starter code**
   - A community roundup collecting ways to use TypeSafe Jev: patterns, prompts, starter code, examples and more. Linked projects: • Anil-matcha/awesome-jev-by-typesafe — Evidence-backed use cases, patterns, prompts, and starter code for TypeSafe Jev — a System One model for fast, typed, confidence-aware decisions in software. — 509★ · Python · agent-workflows, ai-api, ai-automation, clas (github.com/Anil-matcha/awesome-jev-by-typesafe)
   - [Anil-matcha/awesome-jev-by-typesafe](https://github.com/Anil-matcha/awesome-jev-by-typesafe)
   - Source: https://github.com/Anil-matcha/awesome-jev-by-typesafe (by @Anil-matcha)

251. **jev-review: diff-by-diff code review for risk**
   - A code review workflow inspecting git diffs or codebases step-by-step, structuring accuracy, safety, reliability, compatibility and test risks. Linked projects: • devagrawal09/jev-review — A staged code-review workflow and local dashboard built with TypeSafe Jev. — 263★ · TypeScript · ai, code-review, jev, typesafe-ai, typescript (github.com/devagrawal09/jev-review)
   - [devagrawal09/jev-review](https://github.com/devagrawal09/jev-review)
   - Source: https://github.com/devagrawal09/jev-review (by @devagrawal09)

252. **Tocsin triages 22.8M log lines to 123 pages for $0.64 with Jev**
   - Ateeq used Jev to solve a problem every agent eventually runs into: reading logs. Tocsin groups 22.8M log lines into 11,812 repeating patterns, then asks Jev about each pattern once — 6 minutes and 64 cents (vs $1,120 to run an LLM on every line), surfacing 123 patterns that actually needed a look. The paging policy is just a prompt: you tell it what should wake someone up at 3am and what's just another log line. — @TPateeq (3 likes) Linked projects: • Post by @TPateeq — I used Jev to solve a problem every agent eventually runs into: reading logs. 22.8M lines, and running an LLM on every one would've cost $1,120. Tocsin groups them into 11,812 repeating patterns, then asks Jev about each pattern once. (x.com/TPateeq/status/2101062313516347491) • TPAteeq/tocsin — Log triage at ingest. Group logs into patterns, judge each pattern once, page only on what matters. — 0★ · Rust (github.com/TPA
   - [Post by @TPateeq](https://x.com/TPateeq/status/2101062313516347491)
   - [TPAteeq/tocsin](https://github.com/TPAteeq/tocsin)
   - Source: https://x.com/TPateeq/status/2101062313516347491 (by @TPateeq)

### Integrations (121)

1. **Hi all. Been reading everything here since launch and lost track of what I'd seen, so I made**
   - Hi all. Been reading everything here since launch and lost track of what I'd seen, so I made a list. Went through about 400 Jev projects and kept 250 entries worth your time: https://github.com/valentynkit/awesome-jev-typesafe Grouped by what you'd install, with a short "know before you build" bit up top. If your project is in there and I got it wrong, tell me. If it's not, drop it below or PR it and I'll add it. Linked projects: • valentynkit/awesome-jev-typesafe — Typed decisions with TypeSafe's Jev, the first System One model - valentynkit/awesome-jev-typesafe (github.com/valentynkit/awesome-jev-typesafe) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550586851343995032
   - [valentynkit/awesome-jev-typesafe](https://github.com/valentynkit/awesome-jev-typesafe)
   - Source: https://github.com/valentynkit/awesome-jev-typesafe (by valentynkit)

2. **Instead of wiring every button to a specific screen, you register the components your app can show.**
   - Instead of wiring every button to a specific screen, you register the components your app can show. When someone clicks, Jev gets the button text, surrounding content, and app state, then picks what to show next. Change "Buy Pro" to "Compare plans" and that wording can change the behavior without editing the click handler. I built NoFlow because I wanted to see how much UI logic I could replace with Jev before regretting it. Yes, I'm putting a model between a button and a modal. Try me. The runtime limits it to registered components, with confidence thresholds, fallbacks, and confirmation checks. I'm curious where it becomes useful and where you'd absolutely refuse to use it. https://noflow.casungo.workers.dev/? - https://github.com/casungo/noflow-runtime - https://www.npmjs.com/package/noflow-runtime Linked projects: • NoFlow | Buttons with opinions — A semantic UI runtime that turns bu
   - [NoFlow | Buttons with opinions](https://noflow.casungo.workers.dev/)
   - [casungo/noflow-runtime](https://github.com/casungo/noflow-runtime)
   - [https://www.npmjs.com/package/noflow-runtime](https://www.npmjs.com/package/noflow-runtime)
   - [1789759013581.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550586431842427040/1789759013581.png?ex=6aaedfa5&is=6aad8e25&hm=7f3a0ec75a2e7dce153e2690f50ec4f8ae65b71a543db72e4f47c60ecaddcce1&)
   - Source: https://github.com/casungo/noflow-runtime (by casungo)

3. **Update with better ux, pipable jev command and traceable decisions**
   - Update with better ux, pipable jev command and traceable decisions https://github.com/rhighs/jev-code Linked projects: • rhighs/jev-code — Interactive TypeScript coding CLI powered by Jev typed decisions and constrained AST generation. - rhighs/jev-code (github.com/rhighs/jev-code) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550581905005477918
   - [rhighs/jev-code](https://github.com/rhighs/jev-code)
   - Source: https://github.com/rhighs/jev-code (by Roв)

4. **Hey folks — I built Your Signal, an open-source Chrome extension that uses Jev to filter the X timeline around your**
   - Hey folks — I built Your Signal, an open-source Chrome extension that uses Jev to filter the X timeline around your actual interests. It sends eligible text from posts already visible in the feed to Jev in batched typed questions. Jev returns signals for relevance, substance, practical value, promotion, and engagement bait; the extension then combines them locally using user-defined weights and thresholds. Posts can be highlighted, labelled, dimmed, collapsed, or hidden, and every change is reversible. It’s BYOK, MIT-licensed, has no telemetry, and uses no intermediary backend. Demo: https://mithrilman.github.io/your-signal/artifacts/your-signal-demo-social.mp4 Code: https://github.com/MithrilMan/your-signal I’d love feedback from other Jev builders, especially on the signal design and batching strategy. Linked projects: • MithrilMan/your-signal — Open-source BYOK Chrome extension for pe
   - [https://mithrilman.github.io/your-signal/artifacts/your-signal-demo-social.mp4](https://mithrilman.github.io/your-signal/artifacts/your-signal-demo-social.mp4)
   - [MithrilMan/your-signal](https://github.com/MithrilMan/your-signal)
   - Source: https://github.com/MithrilMan/your-signal (by MithrilMan)

5. **have jev check if code is malicious before you run it, its cheap enough to scan entire codebases can also be used as a**
   - have jev check if code is malicious before you run it, its cheap enough to scan entire codebases can also be used as a first line defense against malicious prs https://github.com/luantak/is-malicious Linked projects: • luantak/is-malicious — A codebase scanner that helps you not run malicous code - luantak/is-malicious (github.com/luantak/is-malicious) • Screenshot_2026-09-18_at_19.35.35.png — image/png · 205 KB (cdn.discordapp.com/attachments/1483217545040232493/1550574651397247036) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550574651883790346
   - [luantak/is-malicious](https://github.com/luantak/is-malicious)
   - [Screenshot_2026-09-18_at_19.35.35.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550574651397247036/Screenshot_2026-09-18_at_19.35.35.png?ex=6aaed4ad&is=6aad832d&hm=e1315a7a17c5c42003e6014fea5ef3bc8edd4416483fdc9774919dd4d6dccb35&)
   - Source: https://github.com/luantak/is-malicious (by Paul)

6. **have jev check if code is malicious before you run it**
   - have jev check if code is malicious before you run it https://github.com/luantak/is-malicious Linked projects: • luantak/is-malicious — A codebase scanner that helps you not run malicous code - luantak/is-malicious (github.com/luantak/is-malicious) • Screenshot_2026-09-18_at_19.35.35.png — image/png · 205 KB (cdn.discordapp.com/attachments/1483217545040232493/1550572156046413984) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550572156209995829
   - [luantak/is-malicious](https://github.com/luantak/is-malicious)
   - [Screenshot_2026-09-18_at_19.35.35.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550572156046413984/Screenshot_2026-09-18_at_19.35.35.png?ex=6aaed25a&is=6aad80da&hm=0ef4b5fabe3116f727e880b9aab1886e10b50b08a3a0d1fcbaafa43d4ac4804a&)
   - Source: https://github.com/luantak/is-malicious (by Paul)

7. **If you haven't tried Jev yet, the quickest way to see how fast deterministic decisions feel is hooking it straight**
   - If you haven't tried Jev yet, the quickest way to see how fast deterministic decisions feel is hooking it straight into your agent. This connector hands back typed judgments and raw probabilities your code can branch on instantly. You can wire it into Claude Code, Codex, or pi in seconds. https://github.com/itsmostafa/typesafe-mcp Linked projects: • itsmostafa/typesafe-mcp — mcp connector to give your AI agent direct access to typesafe ai's jev model - itsmostafa/typesafe-mcp (github.com/itsmostafa/typesafe-mcp) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550569585881911397
   - [itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp)
   - Source: https://github.com/itsmostafa/typesafe-mcp (by thecubistsmind)

8. ****Introducing feelings** A decision model can answer a typed question about a value with a calibrated probability.**
   - **Introducing feelings** A decision model can answer a typed question about a value with a calibrated probability. Probably showed what code reads like when an if can ask one of those questions directly instead of hand-rolling a prompt. feelings brings that construct, feels, to Ruby. Inspired by Probably. https://github.com/obie/feelings Linked projects: • obie/feelings — Probabilistic conditionals for Ruby: Feelings(message).like?("genuinely urgent") - obie/feelings (github.com/obie/feelings) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550567672696275046
   - [obie/feelings](https://github.com/obie/feelings)
   - Source: https://github.com/obie/feelings (by ObieFernandez)

9. **i just added a gui to this**
   - i just added a gui to this https://github.com/newuser7171/antivirus Linked projects: • newuser7171/antivirus — Contribute to newuser7171/antivirus development by creating an account on GitHub. (github.com/newuser7171/antivirus) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550561788184240218
   - [newuser7171/antivirus](https://github.com/newuser7171/antivirus)
   - Source: https://github.com/newuser7171/antivirus (by Newuser)

10. **Shared by GarysGameDev: GBear9551 GSLPrototypeProgram blob master main py**
   - https://github.com/GBear9551/GSLPrototypeProgram/blob/master/main.py Linked projects: • GBear9551/GSLPrototypeProgram — General Symbol Language used to develop prompts based on rip-raptor and powered by "THIS!", used to help beginner prompt engineers. - GBear9551/GSLPrototypeProgram (github.com/GBear9551/GSLPrototypeProgram/blob/master/main.py) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550558011531993268
   - [GBear9551/GSLPrototypeProgram](https://github.com/GBear9551/GSLPrototypeProgram/blob/master/main.py)
   - Source: https://github.com/GBear9551/GSLPrototypeProgram/blob/master/main.py (by GarysGameDev)

11. **i made one last night hahah**
   - i made one last night hahah https://willprout.github.io/magic-8-ball/ Linked projects: • Magic-8-Jev · An instinct from Jev — Twenty opinionated answers. One quick-witted oracle. Ask Magic-8-Jev. (willprout.github.io/magic-8-ball) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550545323456204880
   - [Magic-8-Jev · An instinct from Jev](https://willprout.github.io/magic-8-ball/)
   - Source: https://willprout.github.io/magic-8-ball/ (by Parzival)

12. **Azdaja is a bare OSS RLM layer you can plug into Claude, Codex, OpenCode and others now with Jev, branches that only**
   - Azdaja is a bare OSS RLM layer you can plug into Claude, Codex, OpenCode and others now with Jev, branches that only need a judgment can return one directly, useful for reranking, verification, classification and semantic joins, cutting unnecessary model work https://github.com/kubet/azdaja Linked projects: • kubet/azdaja — Minimal harness-agnostic recursive language model layer — one binary, Python + llm() - kubet/azdaja (github.com/kubet/azdaja) • azdaja-jev.mp4 — video/mp4 · 7 MB (cdn.discordapp.com/attachments/1483217545040232493/1550543896600117401) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550543897086660628
   - [kubet/azdaja](https://github.com/kubet/azdaja)
   - [azdaja-jev.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550543896600117401/azdaja-jev.mp4?ex=6aaeb808&is=6aad6688&hm=cffa9d44417f18edf5f09731a88a70ed3a45152d652860c0728b3cf21509fdc9&)
   - Source: https://github.com/kubet/azdaja (by 0х88)

13. **I built "jev-guard", an auto-approval layer for Claude Code / Codex / Antigravity agent harnesses:**
   - I built "jev-guard", an auto-approval layer for Claude Code / Codex / Antigravity agent harnesses: https://github.com/ClemensSchartmueller/jev-guard Linked projects: • ClemensSchartmueller/jev-guard — Contribute to ClemensSchartmueller/jev-guard development by creating an account on GitHub. (github.com/ClemensSchartmueller/jev-guard) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550542623545229463
   - [ClemensSchartmueller/jev-guard](https://github.com/ClemensSchartmueller/jev-guard)
   - Source: https://github.com/ClemensSchartmueller/jev-guard (by sudo rm -rf /*)

14. **local workspace to run several AI coding agents at once.**
   - local workspace to run several AI coding agents at once. your keys, your machine. if you like it, a star helps. https://github.com/celsiusm/jarvis-workspace Linked projects: • celsiusm/jarvis-workspace — A local web cockpit that runs several AI coding agents side by side; your keys, your machine. - celsiusm/jarvis-workspace (github.com/celsiusm/jarvis-workspace) • radio.png — image/png · 283 KB (cdn.discordapp.com/attachments/1483217545040232493/1550538608371306648) • editor.png — image/png · 138 KB (cdn.discordapp.com/attachments/1483217545040232493/1550538609130737745) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550538611827417221
   - [celsiusm/jarvis-workspace](https://github.com/celsiusm/jarvis-workspace)
   - [radio.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550538608371306648/radio.png?ex=6aaeb31b&is=6aad619b&hm=b71f7d3e67c4672779070edc489387019fd2874f322b1205d4cfada49a8551c3&)
   - [editor.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550538609130737745/editor.png?ex=6aaeb31c&is=6aad619c&hm=cdc762f3ed2aee941a77f1fd12716ebe92e3402945e33c847aed3e8bd3174cae&)
   - [appearance-themes.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550538610095431832/appearance-themes.png?ex=6aaeb31c&is=6aad619c&hm=0a3947ebcc01e8879df87815de39b1bf6bfc2b1bc354fa0cce108a4a41ce9bcf&)
   - [launcher-batch.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550538611437469716/launcher-batch.png?ex=6aaeb31c&is=6aad619c&hm=5b1fafe6af0ffc4dbd43e9858633e197f730215bd9f351f70baeb493eb9285cb&)
   - Source: https://github.com/celsiusm/jarvis-workspace (by Celsius)

15. **I added twitch moderation to so you can set actions like ``` !setaction ban users if they harass others !setaction**
   - I added twitch moderation to https://github.com/Infrawrench/Jeeves so you can set actions like ``` !setaction ban users if they harass others !setaction time a user out for 1 week if they discuss xyz !setaction strike a user if they say xyz ``` Linked projects: • Infrawrench/Jeeves — Twitch/Discord moderation rules in plain English, powered by Jev and Gemini - Infrawrench/Jeeves (github.com/Infrawrench/Jeeves) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550535520273047643
   - [Infrawrench/Jeeves](https://github.com/Infrawrench/Jeeves)
   - Source: https://github.com/Infrawrench/Jeeves (by JustSomeDev)

16. **Used jev to classify AI Slop (for highlighting AI slop linkedin posts), works really well ...**
   - Used jev to classify AI Slop (for highlighting AI slop linkedin posts), works really well ... https://github.com/guybrush1984/purelink Linked projects: • guybrush1984/purelink — Chrome plugin to highlight AI generated posts. Contribute to guybrush1984/purelink development by creating an account on GitHub. (github.com/guybrush1984/purelink) • Screenshot_from_2026-09-18_17-35-46.png — image/png · 34 KB (cdn.discordapp.com/attachments/1483217545040232493/1550530817678119022) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550530818139627580
   - [guybrush1984/purelink](https://github.com/guybrush1984/purelink)
   - [Screenshot_from_2026-09-18_17-35-46.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550530817678119022/Screenshot_from_2026-09-18_17-35-46.png?ex=6aaeabda&is=6aad5a5a&hm=bbc95cee7bb529cccd82ecb7193e5d5f039983bfda3cbf288bc56189e587d94d&)
   - Source: https://github.com/guybrush1984/purelink (by guybrush1984)

17. **Jev handling part of the hermes compaction, fun little side project**
   - https://github.com/TheEpTic/hermes-plugins/tree/main/hermes-jev-compact Jev handling part of the hermes compaction, fun little side project Linked projects: • TheEpTic/hermes-plugins — Public hermes plugins that I’ve developed & needed over time - TheEpTic/hermes-plugins (github.com/TheEpTic/hermes-plugins/tree/main/hermes-jev-compact) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550530735478149260
   - [TheEpTic/hermes-plugins](https://github.com/TheEpTic/hermes-plugins/tree/main/hermes-jev-compact)
   - Source: https://github.com/TheEpTic/hermes-plugins/tree/main/hermes-jev-compact (by TheEpTic)

18. **I made this DuckDB extension for Jev:**
   - I made this DuckDB extension for Jev: https://github.com/Query-farm/vgi-typesafe Linked projects: • Query-farm/vgi-typesafe — A VGI worker exposing TypeSafe System One questions (choice, noul, score) to DuckDB/SQL as LATERAL-joinable table functions - Query-farm/vgi-typesafe (github.com/Query-farm/vgi-typesafe) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550529452805460121
   - [Query-farm/vgi-typesafe](https://github.com/Query-farm/vgi-typesafe)
   - Source: https://github.com/Query-farm/vgi-typesafe (by Rusty Conover)

19. **Interesting. Do you think it could replace something like this and Kiro?**
   - Interesting. Do you think it could replace something like this https://github.com/aws-samples/sample-specship and Kiro? Linked projects: • aws-samples/sample-specship — Spec-driven autonomous engineering workflow for AI coding agents: recon → plan → build → validate → ship — with TDD, adversarial validation, and anti-slop quality gates. Packaged as a Kiro Power. -... (github.com/aws-samples/sample-specship) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550527667672055968
   - [aws-samples/sample-specship](https://github.com/aws-samples/sample-specship)
   - Source: https://github.com/aws-samples/sample-specship (by godindav)

20. **A codebase scanner that answers if a repository is obviously malicious with jev, also useful for filtering obviously**
   - A codebase scanner that answers if a repository is obviously malicious with jev, also useful for filtering obviously malicous prs https://github.com/luantak/is-malicious/ Linked projects: • luantak/is-malicious — A codebase scanner that helps you not run malicous code - luantak/is-malicious (github.com/luantak/is-malicious) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550504001458540575
   - [luantak/is-malicious](https://github.com/luantak/is-malicious/)
   - Source: https://github.com/luantak/is-malicious/ (by Paul)

21. **Built a chrome extension for poly market suggestions**
   - Built a chrome extension for poly market suggestions https://github.com/svmanth/jmarket Linked projects: • svmanth/jmarket — Polymarket tells you what the crowd thinks. This tells you what Jev thinks. - svmanth/jmarket (github.com/svmanth/jmarket) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550500170888650752
   - [svmanth/jmarket](https://github.com/svmanth/jmarket)
   - Source: https://github.com/svmanth/jmarket (by sumsie)

22. **cool! submit a PR in awesome-typesafe to add it alongside other languages community SDKs for typesafe**
   - cool! submit a PR in awesome-typesafe to add it alongside other languages community SDKs for typesafe https://github.com/AbdelStark/awesome-typesafe Linked projects: • AbdelStark/awesome-typesafe — A curated list of official resources and community projects for TypeSafe, System One models, and Jev. - AbdelStark/awesome-typesafe (github.com/AbdelStark/awesome-typesafe) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550497066227208252
   - [AbdelStark/awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe)
   - Source: https://github.com/AbdelStark/awesome-typesafe (by abdel)

23. **For my **Java** builders out there, I open sourced a community Java client sdk that mirrors the Python and TypeScript**
   - For my **Java** builders out there, I open sourced a community Java client sdk that mirrors the Python and TypeScript sdks. (also includes a spring-boot-starter 😉 ) https://github.com/Premo-Cloud/typesafe-sdk-java Runs on Java 17, only Jackson as a dependency. Would love to collab with a TypeSafer (<@231477872324378624> ?) to get this published in a official capacity. Linked projects: • Premo-Cloud/typesafe-sdk-java — Community Java client for the TypeSafe System One API (unofficial) - Premo-Cloud/typesafe-sdk-java (github.com/Premo-Cloud/typesafe-sdk-java) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550494448436117594
   - [Premo-Cloud/typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java)
   - Source: https://github.com/Premo-Cloud/typesafe-sdk-java (by Garret P.)

24. **I used Jev as the dodging brain for a Terraria mod.**
   - I used Jev as the dodging brain for a Terraria mod. It beat EVERY pre-hardmode boss on Master Mode. Any Terraria player will tell you that beating a Master Mode boss is no small feat. This one dodges on 9 intents from Jev at 5Hz, and code turns them into keystrokes. video: https://www.youtube.com/watch?v=g6CADbjBhlk github: https://github.com/Reisenbug/TerraBlind Linked projects: • Typesafe's Jev Beat EVERY Pre-Hardmode Boss in Terraria MASTER MODE — Project link: github.com/Reisenbug/TerraBlindWhat is system one model, or what is jev: typesafe.aiI have no relationship with this company but this model REA... (youtube.com/watch) • Reisenbug/TerraBlind — A Terraria tModLoader mod that plays the game with code: pathfinding, building and combat primitives wired into one pipeline that runs from a fresh world to killing the Wall of Flesh. - Reisenbug/T... (github.com/Reisenbug/TerraBlind) Disc
   - [Typesafe&#39;s Jev Beat EVERY Pre-Hardmode Boss in Terraria MASTER MODE](https://www.youtube.com/watch?v=g6CADbjBhlk)
   - [Reisenbug/TerraBlind](https://github.com/Reisenbug/TerraBlind)
   - Source: https://github.com/Reisenbug/TerraBlind (by stardust)

25. **for anyone trying to start off with jev, this should help (you can point your agent at it, it should be able to use**
   - for anyone trying to start off with jev, this should help (you can point your agent at it, it should be able to use these to help make better decisionswhen making use of jev itself) there is a video in the twitter post https://fixupx.com/ezbaze_/status/2100899085700026410 https://github.com/Ezbaze/jevies Linked projects: • Post by @ezbaze_ — who checks the Jev? more Jevs! :D you shouldn't have to make decisions that Jev can make to help set itself up! https://x.com/CompleteSkeptic/status/2099925682726002904 (fixupx.com/ezbaze_/status/2100899085700026410) • Ezbaze/jevies — little Jevs helping design and review other Jevs. Contribute to Ezbaze/jevies development by creating an account on GitHub. (github.com/Ezbaze/jevies) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550459747142991903
   - [Post by @ezbaze_](https://fixupx.com/ezbaze_/status/2100899085700026410)
   - [Ezbaze/jevies](https://github.com/Ezbaze/jevies)
   - Source: https://github.com/Ezbaze/jevies (by Ezbaze)

26. **I put Jev to use in an example for "graph navigation" (inspired by the wikilinks demo) - connect to existing neo4j**
   - I put Jev to use in an example for "graph navigation" (inspired by the wikilinks demo) - connect to existing neo4j database - starting point - give a goal (target node, general isntructions, or path intent) - have Jev see each relationship + neighbor via Choice and give probabilities for following them - pick the top one(s), repeat, check with a boolean/noul if goal is reached - repo https://github.com/jexp/neo4jev (w/ code, jupyter, streamlit) Linked projects: • jexp/neo4jev — Typesafe.ai System One Model Jev navigating a Neo4j graph by using a classifier over neighbouring relationships - jexp/neo4jev (github.com/jexp/neo4jev) • neo4jev-graph-navigation-streamlit.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550459292111478784) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550459292598149240
   - [jexp/neo4jev](https://github.com/jexp/neo4jev)
   - [neo4jev-graph-navigation-streamlit.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550459292111478784/neo4jev-graph-navigation-streamlit.png?ex=6aae693d&is=6aad17bd&hm=58c333918f21cdbbae6244d6189063a9c5e061d07f700a6d2f9e9a613e8f93f4&)
   - Source: https://github.com/jexp/neo4jev (by Mesirii)

27. **heres my website with the stuff im building.**
   - heres my website with the stuff im building. my main focus has been developing and using my custom agentic os I call Data: Dashboard for Analytical Thought and Action. Its free and open source on github. I will be integrating JEV asap https://magimatix.com/ and https://github.com/huntermixhunter/D.A.T.A Linked projects: • Magimatix | AI Automations & Web Design — AI automations and premium websites that transform your business. Modern, high-performance digital experiences crafted with precision. (magimatix.com) • huntermixhunter/D.A.T.A — D.A.T.A — Dashboard for Analytical Thought and Action. Self-hosted, local-first AI operations dashboard with a crew of specialist agents. - huntermixhunter/D.A.T.A (github.com/huntermixhunter/D.A.T.A) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550454874733551636
   - [Magimatix | AI Automations &amp; Web Design](https://magimatix.com/)
   - [huntermixhunter/D.A.T.A](https://github.com/huntermixhunter/D.A.T.A)
   - Source: https://github.com/huntermixhunter/D.A.T.A (by Hunter)

28. **Jev-assisted context compaction in the kamchatka agent:**
   - Jev-assisted context compaction in the kamchatka agent: https://github.com/ljedrz/nachalnik/blob/master/kamchatka/examples/jev_assisted_compaction.rs Linked projects: • ljedrz/nachalnik — A transparent agent runtime in Rust: context, tools, permissions and requests as explicit state. Plus an MCP bridge and a terminal agent. - ljedrz/nachalnik (github.com/ljedrz/nachalnik/blob/master/kamchatka/examples/jev_assiste) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550433570290536578
   - [ljedrz/nachalnik](https://github.com/ljedrz/nachalnik/blob/master/kamchatka/examples/jev_assisted_compaction.rs)
   - Source: https://github.com/ljedrz/nachalnik/blob/master/kamchatka/examples/jev_assisted_compaction.rs (by ljedrz)

29. **Here is jev on Dowse a terminal ui (tui) that helps you make quick browser searches.**
   - Here is jev on Dowse a terminal ui (tui) that helps you make quick browser searches. Search for anything, it is ranked by Jev then passed on to your LLM (i.e., gemini) to get the most accurate AI summary and citations for your quick browser searches in terminal github.com/arttivhq/dowse mise: mise use ubi:arttivhq/dowse npm: npm i -g @arttiv/dowse https://x.com/felixnjenga_/status/2100704201797939569 Linked projects: • Post by @felixnjenga_ — Dowse is a terminal-native web browser + answer engine. Search the web, read pages, follow links and generate cited answers — without leaving your terminal. I’ve added @typesafeai @CompleteSkeptic Jev as an opt-in System (x.com/felixnjenga_/status/2100704201797939569) • jev-on-dowse.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550427589775069254) • Post by @felixnjenga_ — Dowse is a terminal-native web browser + answer
   - [Post by @felixnjenga_](https://x.com/felixnjenga_/status/2100704201797939569)
   - [jev-on-dowse.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550427589775069254/jev-on-dowse.mp4?ex=6aae4bb6&is=6aacfa36&hm=4187650951d494eabf91ba3eb4eadbbf2b1aa14eab7d0eff7b34889fed4ab812&)
   - Source: https://x.com/felixnjenga_/status/2100704201797939569 (by felixnjenga)

30. **Hey folks! I just got access this morning and decided to take Jev for a spin. Introducing ...**
   - Hey folks! I just got access this morning and decided to take Jev for a spin. Introducing ... **JevPlaysPokemon**. I wanted to see if the model is able to make right decisions and beat elite four in pokemon, and surprisingly, it did (even in just lvl. 40 pokemons) . Tweet: https://x.com/AnxKhn/status/2100842364248178833 Repo: https://github.com/anxkhn/JevPlaysPokemon Happy to walk through it if anyone wants. Linked projects: • Post by @AnxKhn — Jev by @typesafeai is amazing! i let it play pokemon firered, and it was able to beat elite 4 with a party of level 40 pokemons. all under 0.03$ (x.com/AnxKhn/status/2100842364248178833) • anxkhn/JevPlaysPokemon — Jev plays Generation 3 Pokémon via Showdown and a real FireRed ROM. - anxkhn/JevPlaysPokemon (github.com/anxkhn/JevPlaysPokemon) • jev-plays-pokemon-demo.mp4 — video/mp4 · 40 MB (cdn.discordapp.com/attachments/1483217545040232493/1550422
   - [Post by @AnxKhn](https://x.com/AnxKhn/status/2100842364248178833)
   - [anxkhn/JevPlaysPokemon](https://github.com/anxkhn/JevPlaysPokemon)
   - [jev-plays-pokemon-demo.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550422700722360460/jev-plays-pokemon-demo.mp4?ex=6aae4729&is=6aacf5a9&hm=eaba486b2ab5305e52ee3ae9d3e958f5751e9450f3791fd2e6c3c337d90fdbc0&)
   - Source: https://github.com/anxkhn/JevPlaysPokemon (by not_anaskhan)

31. **Stop making models relearn the repository.**
   - https://github.com/Zerolitter/Workspace-Atlas Stop making models relearn the repository. Give them the verified project context they actually need. Linked projects: • Zerolitter/Workspace-Atlas — Workspace Atlas is a local-first, agent-neutral workspace intelligence layer that continuously maintains a verified map of project files, symbols, relationships, effects and history, then delivers ... (github.com/Zerolitter/Workspace-Atlas) • workspace-atlas-explainer.mp4 — video/mp4 · 4 MB (cdn.discordapp.com/attachments/1483217545040232493/1550415624486789210) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550415625153941534
   - [Zerolitter/Workspace-Atlas](https://github.com/Zerolitter/Workspace-Atlas)
   - [workspace-atlas-explainer.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550415624486789210/workspace-atlas-explainer.mp4?ex=6aae4092&is=6aacef12&hm=a0387eff9d3750c88c4b0175c9a0b157330de1f4d4733f55053465c6aa5ba1cd&)
   - Source: https://github.com/Zerolitter/Workspace-Atlas (by Zerolitter)

32. **Built a simulated SIEM to showcase Jev's risk assessment capabilities.**
   - Built a simulated SIEM to showcase Jev's risk assessment capabilities. https://github.com/the-data-sherpa/project_blackout Linked projects: • the-data-sherpa/project_blackout — Contribute to the-data-sherpa/project_blackout development by creating an account on GitHub. (github.com/the-data-sherpa/project_blackout) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550414352333668424
   - [the-data-sherpa/project_blackout](https://github.com/the-data-sherpa/project_blackout)
   - Source: https://github.com/the-data-sherpa/project_blackout (by DataSherpa)

33. **been playing with Jev as the decision engine for an Aside browser no chat LLM in the loop, just typed actions inside**
   - been playing with Jev as the decision engine for an Aside browser no chat LLM in the loop, just typed actions inside `aside repl` raced it against Luna and Astra on a real browsing task (google → wikipedia → gotham city): ~3.6x faster decisions, ~21x cheaper — and zero hallucinated clicks, while Luna kept inventing elements that don't exist code + reproducible bench + real-time race replay: https://github.com/pumpkinredbean/bside Linked projects: • pumpkinredbean/bside — Contribute to pumpkinredbean/bside development by creating an account on GitHub. (github.com/pumpkinredbean/bside) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550406277757149267
   - [pumpkinredbean/bside](https://github.com/pumpkinredbean/bside)
   - Source: https://github.com/pumpkinredbean/bside (by pumpkinbean)

34. **This is kind of silly, but I built a Jev powered magic 8 ball.**
   - This is kind of silly, but I built a Jev powered magic 8 ball. Mostly to help others understand how jev works. My $4 token balance should be enough for at least 500k requests on it. Feel free to share! https://willprout.github.io/magic-8-ball/ Linked projects: • Magic-8-Jev · An instinct from Jev — Twenty opinionated answers. One quick-witted oracle. Ask Magic-8-Jev. (willprout.github.io/magic-8-ball) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550371537985740821
   - [Magic-8-Jev · An instinct from Jev](https://willprout.github.io/magic-8-ball/)
   - Source: https://willprout.github.io/magic-8-ball/ (by Parzival)

35. **i am using for now in codex.**
   - i am using https://github.com/vlad-terin/jev-browser for now in codex. ill move to that one if i go to antigravit Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550370502051364976
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - Source: https://github.com/vlad-terin/jev-browser (by Om Senjalia)

36. **try this one - this should work - less robust for now**
   - https://github.com/jkudish/jev-browser try this one - this should work - less robust for now Linked projects: • jkudish/jev-browser — Browser use using Typesafe's Jev model. Contribute to jkudish/jev-browser development by creating an account on GitHub. (github.com/jkudish/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550370339635200000
   - [jkudish/jev-browser](https://github.com/jkudish/jev-browser)
   - Source: https://github.com/jkudish/jev-browser (by BlissF00l)

37. **Discord/Slack analyzer before sending message.**
   - Discord/Slack analyzer before sending message. <0.1 sec. I added a delay to avoid making too many calls, it waits few ms once you stop typing to analyze and give feedback Linked projects: • jev_discord_demo.mp4 — video/mp4 · 12 MB (cdn.discordapp.com/attachments/1483217545040232493/1550362480478257253)
   - [jev_discord_demo.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550362480478257253/jev_discord_demo.mp4?ex=6aaeb7d3&is=6aad6653&hm=6469cc85578e37fb4a03f7b77c90a97881fde634bcb455b1539f257ae7cf4255&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550362481522905178 (by Patrick)

38. **I've been experimenting with Jev and loving it!**
   - I've been experimenting with Jev and loving it! I released two packages to work with it: - Jev MCP wraps Jev's decision making process into an MCP that you can give your regular LLM agents to work with https://github.com/jkudish/jev-mcp - Jev Browser uses Jev to control a chromium browser with playwright resulting in a really fast and cheap browser use agent https://github.com/jkudish/jev-browser Linked projects: • jkudish/jev-mcp — Proof of concept MCP for Typesafe's new Jev AI model - jkudish/jev-mcp (github.com/jkudish/jev-mcp) • jkudish/jev-browser — Browser use using Typesafe's Jev model. Contribute to jkudish/jev-browser development by creating an account on GitHub. (github.com/jkudish/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550344078221115442
   - [jkudish/jev-mcp](https://github.com/jkudish/jev-mcp)
   - [jkudish/jev-browser](https://github.com/jkudish/jev-browser)
   - Source: https://github.com/jkudish/jev-mcp (by Joey)

39. **see if you. can install this with codex - i still dont have anyone saying they tried and**
   - https://github.com/vlad-terin/jev-browser see if you. can install this with codex - i still dont have anyone saying they tried and it worked - but i was able to replicate the wikirace demo and so far it's 10x + faster than computer use in every task - excel, drawing navigation complex websites Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550339884978413588
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - Source: https://github.com/vlad-terin/jev-browser (by BlissF00l)

40. **you're about 24 hours late lol**
   - https://github.com/Hawxy/TypeSafeAI.Net you're about 24 hours late lol Linked projects: • Hawxy/TypeSafeAI.Net — .NET SDK for the TypeSafe AI platform. Contribute to Hawxy/TypeSafeAI.Net development by creating an account on GitHub. (github.com/Hawxy/TypeSafeAI.Net) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550339411634557020
   - [Hawxy/TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net)
   - Source: https://github.com/Hawxy/TypeSafeAI.Net (by Hawx)

41. **While I'm waiting for waitlist - I figured I'd port it to C# anyway -**
   - While I'm waiting for waitlist - I figured I'd port it to C# anyway - https://github.com/Biztactix-Ryan/TypeSafe.Sdk.C- Linked projects: • Biztactix-Ryan/TypeSafe.Sdk.C- — C# Library to use the Typesafe APIs, Direct conversion from Python/JS libraries - Biztactix-Ryan/TypeSafe.Sdk.C- (github.com/Biztactix-Ryan/TypeSafe.Sdk.C-) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550328527113420830
   - [Biztactix-Ryan/TypeSafe.Sdk.C-](https://github.com/Biztactix-Ryan/TypeSafe.Sdk.C-)
   - Source: https://github.com/Biztactix-Ryan/TypeSafe.Sdk.C- (by NetNinja Ryan)

42. **I'm doing my portfolio website right now.**
   - I'm doing my portfolio website right now. https://jkf16m.github.io and so far, the amount there is what I've spent both developing + trying out some stuff Linked projects: • Portfolio (jkf16m.github.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550323241342734447
   - [Portfolio](https://jkf16m.github.io)
   - Source: https://jkf16m.github.io (by Tripmine_enjoyer)

43. **still early - lots of work to commit**
   - https://github.com/vlad-terin/jev-browser still early - lots of work to commit Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550315150479986799
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - Source: https://github.com/vlad-terin/jev-browser (by BlissF00l)

44. **Hey all - I'm working on the future of agentic security of the internet at moltaicorp.**
   - Hey all - I'm working on the future of agentic security of the internet at moltaicorp. Fisher shows you your agents are insecure, then we teach you how to fix them. https://github.com/moltaicorp/apsl is my only public OSS contribution, yet. It's a hint about what I'm building. 🙂 Linked projects: • moltaicorp/apsl — APSL — Abstract Protocol Schema Language: a typed, certifiable specification language for composable protocol contracts - moltaicorp/apsl (github.com/moltaicorp/apsl) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550309281360773120
   - [moltaicorp/apsl](https://github.com/moltaicorp/apsl)
   - Source: https://github.com/moltaicorp/apsl (by thomcom)

45. **Made Jev play Doom, Github repo attached Edit : remove embed**
   - Made Jev play Doom, Github repo attached https://www.reddit.com/r/developersIndia/s/kuHoZ1jHFc https://github.com/AmoghCreator/doom-jev Edit : remove embed Linked projects: • Reddit (reddit.com/r/developersIndia/s/kuHoZ1jHFc) • AmoghCreator/doom-jev — Contribute to AmoghCreator/doom-jev development by creating an account on GitHub. (github.com/AmoghCreator/doom-jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550269287384481842
   - [Reddit](https://www.reddit.com/r/developersIndia/s/kuHoZ1jHFc)
   - [AmoghCreator/doom-jev](https://github.com/AmoghCreator/doom-jev)
   - Source: https://github.com/AmoghCreator/doom-jev (by amogh)

46. **Hey! Don't know if anyone is playing with deepseek harness, but I immediately thought it could be neat**
   - Hey! Don't know if anyone is playing with deepseek harness, but I immediately thought it could be neat to add a Jev driven plugin to it. Adds "Auto review" (idk why the whole decided review was the word, but it did lol) as a permission level, and lets Jev decide the "what should I do next" or multiple choice decisions when they are presented so you can go afk and let the whale cruise. If anyone wants to play with it, it's here: https://git.allen-software.com/allenh1/dsh-auto-mode Linked projects: • Hunter L. Allen / dsh-auto-mode · GitLab — DeepSeek Harness Auto mode: Full access guided by TypeSafe System One at every end prompt (git.allen-software.com/allenh1/dsh-auto-mode) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550265729012473886
   - [Hunter L. Allen / dsh-auto-mode · GitLab](https://git.allen-software.com/allenh1/dsh-auto-mode)
   - Source: https://git.allen-software.com/allenh1/dsh-auto-mode (by McMikeFace)

47. **I made an MCP ❤️ maybe it helps your LLMs**
   - https://github.com/blakestone-x/jev-mcp I made an MCP ❤️ maybe it helps your LLMs Linked projects: • blakestone-x/jev-mcp — MCP server for TypeSafe Jev: typed classify, score, check, match and screen for any agent, with confidence on every answer - blakestone-x/jev-mcp (github.com/blakestone-x/jev-mcp) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550237904339734699
   - [blakestone-x/jev-mcp](https://github.com/blakestone-x/jev-mcp)
   - Source: https://github.com/blakestone-x/jev-mcp (by blake)

48. **i had astra make a go sdk**
   - i had astra make a go sdk https://github.com/withzombies/jev-go Linked projects: • withzombies/jev-go — Contribute to withzombies/jev-go development by creating an account on GitHub. (github.com/withzombies/jev-go) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550237497299042514
   - [withzombies/jev-go](https://github.com/withzombies/jev-go)
   - Source: https://github.com/withzombies/jev-go (by withzombies)

49. **Probably some slop atm but analyzing and taking actions on BI tools has been a slog.**
   - Probably some slop atm but analyzing and taking actions on BI tools has been a slog. Made a thin tool to add context cards over Apache Superset. No way to validate at scale cause I don’t got Jev at work 🤷‍♂️ https://github.com/waddle-zoo/signal-weave Linked projects: • waddle-zoo/signal-weave — Typed decisions for operational signals. Powered by TypeSafeAI Jev - waddle-zoo/signal-weave (github.com/waddle-zoo/signal-weave) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550235932479721743
   - [waddle-zoo/signal-weave](https://github.com/waddle-zoo/signal-weave)
   - Source: https://github.com/waddle-zoo/signal-weave (by Brando)

50. **Claude code prototype but using jev 🙂 This is just a fun project but contributions are very welcome**
   - Claude code prototype but using jev 🙂 https://github.com/rhighs/jev-code This is just a fun project but contributions are very welcome Linked projects: • rhighs/jev-code — Interactive TypeScript coding CLI powered by Jev typed decisions and constrained AST generation. - rhighs/jev-code (github.com/rhighs/jev-code) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550227374090748017
   - [rhighs/jev-code](https://github.com/rhighs/jev-code)
   - Source: https://github.com/rhighs/jev-code (by Roв)

51. **Static analysis for code comments, powered by TypeSafe.ai: Super-quick vibe coding**
   - Static analysis for code comments, powered by TypeSafe.ai: https://github.com/ari-becker/commentlint Super-quick vibe coding Linked projects: • ari-becker/commentlint — Improve the comments that AI agents add through agent-based static analysis. - ari-becker/commentlint (github.com/ari-becker/commentlint) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550204162132672603
   - [ari-becker/commentlint](https://github.com/ari-becker/commentlint)
   - Source: https://github.com/ari-becker/commentlint (by Ari Becker)

52. **Created a semantic linter and LSP!**
   - https://github.com/benomahony/nouls Created a semantic linter and LSP! Linked projects: • benomahony/nouls — Contribute to benomahony/nouls development by creating an account on GitHub. (github.com/benomahony/nouls) • 11AEA003-85DA-4E08-852F-CFBD06D1EB3A.png — image/png · 260 KB (cdn.discordapp.com/attachments/1483217545040232493/1550203421217390744) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550203421175320619
   - [benomahony/nouls](https://github.com/benomahony/nouls)
   - [11AEA003-85DA-4E08-852F-CFBD06D1EB3A.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550203421217390744/11AEA003-85DA-4E08-852F-CFBD06D1EB3A.png?ex=6aaecc71&is=6aad7af1&hm=d7a1c4305ed3836996293275defa978e3a56a08ebb5acba2d101c798bdd1d780&)
   - Source: https://github.com/benomahony/nouls (by bomarni)

53. **Just released the macOS app, contributions welcome (pls)**
   - Just released the macOS app, contributions welcome (pls) https://github.com/serene-interactive/Seagreen/releases/tag/v3.0.0 Linked projects: • serene-interactive/Seagreen — A lighter footprint. A clearer picture. Local resource and energy monitoring with a native macOS app, Windows web UI, and CLI. - serene-interactive/Seagreen (github.com/serene-interactive/Seagreen/releases/tag/v3.0.0) • Seagreen-v3.0.0_Release.mov — video/quicktime · 4 MB (cdn.discordapp.com/attachments/1483217545040232493/1550178328382546001) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550178328982327470
   - [serene-interactive/Seagreen](https://github.com/serene-interactive/Seagreen/releases/tag/v3.0.0)
   - [Seagreen-v3.0.0_Release.mov](https://cdn.discordapp.com/attachments/1483217545040232493/1550178328382546001/Seagreen-v3.0.0_Release.mov?ex=6aaeb512&is=6aad6392&hm=83b1687988181b5438bc37f13f9d8440273f427ad3215783085e5ddb24f0581e&)
   - Source: https://github.com/serene-interactive/Seagreen/releases/tag/v3.0.0 (by Gianni)

54. **Check it out here now, I'm helping to contribute to this repository; we have versions for Android, iOS, Mac, and**
   - https://github.com/milind-soni/OpenMausBot Check it out here now, I'm helping to contribute to this repository; we have versions for Android, iOS, Mac, and Windows. Linked projects: • milind-soni/OpenMausBot — Open Source Alternative to Grok Bot with a virtual machine that bots can use - milind-soni/OpenMausBot (github.com/milind-soni/OpenMausBot) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550172384869490688
   - [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot)
   - Source: https://github.com/milind-soni/OpenMausBot (by KesleyDEV)

55. **This repository looks amazing, I'm eager to get access and start using it.**
   - This repository looks amazing, I'm eager to get access and start using it. https://github.com/browser-use/jev-ultrafast Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550172026407223407
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by KesleyDEV)

56. **This is why I created Jod ( )**
   - This is why I created Jod (https://github.com/mateonunez/jod) Linked projects: • mateonunez/jod — Semantic schemas over TypeSafe's Jev — validate the state locally, then project typed answers. - mateonunez/jod (github.com/mateonunez/jod) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550169082345558228
   - [mateonunez/jod](https://github.com/mateonunez/jod)
   - Source: https://github.com/mateonunez/jod (by mateonunez)

57. **check out Self improving rasperry pi application to detect and deter ur fav pup 🙂**
   - check out https://github.com/devjerry0/watchdoggy Self improving rasperry pi application to detect and deter ur fav pup 🙂 Linked projects: • devjerry0/watchdoggy — Self improving Dog Detector for when your dog is in an area they shouldn't be in - devjerry0/watchdoggy (github.com/devjerry0/watchdoggy) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550167198524510332
   - [devjerry0/watchdoggy](https://github.com/devjerry0/watchdoggy)
   - Source: https://github.com/devjerry0/watchdoggy (by JB0x)

58. **this repo is extremely good**
   - this repo is extremely good https://github.com/browser-use/jev-ultrafast Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550163409058668676
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by Omar)

59. **If you are into go.**
   - If you are into go. Made a go client. Feature parity with the official Python and TypeScript SDKs https://pkg.go.dev/github.com/fgn/jevgo https://github.com/fgn/jevgo Linked projects: • jev package - github.com/fgn/jevgo - Go Packages — Package jev is a Go client for the TypeSafe AI System One API and its flagship model, Jev: send a state and typed questions, get typed answers with probabilities. (pkg.go.dev/github.com/fgn/jevgo) • fgn/jevgo — Go client for TypeSafe AI's System One API (Jev), with optional Langfuse instrumentation - fgn/jevgo (github.com/fgn/jevgo) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550159097897287870
   - [jev package - github.com/fgn/jevgo - Go Packages](https://pkg.go.dev/github.com/fgn/jevgo)
   - [fgn/jevgo](https://github.com/fgn/jevgo)
   - Source: https://github.com/fgn/jevgo (by fgn)

60. **using Jev to play a catan-clone against itself, just to see how the API and low latency works, pretty fun.**
   - using Jev to play a catan-clone against itself, just to see how the API and low latency works, pretty fun. Kinda wanna hook it into Rimworld or Dwarf Fortress. Linked projects: • image.png — image/png · 496 KB (cdn.discordapp.com/attachments/1483217545040232493/1550155887551709344)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550155887551709344/image.png?ex=6aaea02c&is=6aad4eac&hm=32e32e80b2fd00fe8b40b73095026d230da155d49a1c336fe8b7017865b666fa&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550155889053409410 (by gradius)

61. **I finally got access to Jev, and the first thing I did was give it a phone.**
   - I finally got access to Jev, and the first thing I did was give it a phone. It’s blazingly fast at executing actions. At this point, the only bottleneck seems to be the UI animations themselves. https://github.com/droidrun/mobile-jev Linked projects: • droidrun/mobile-jev — Contribute to droidrun/mobile-jev development by creating an account on GitHub. (github.com/droidrun/mobile-jev) • moAxmCS6qj2thQf4.mp4 — video/mp4 · 3 MB (cdn.discordapp.com/attachments/1483217545040232493/1550135353480843374) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550135354009452554
   - [droidrun/mobile-jev](https://github.com/droidrun/mobile-jev)
   - [moAxmCS6qj2thQf4.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550135353480843374/moAxmCS6qj2thQf4.mp4?ex=6aae8d0c&is=6aad3b8c&hm=5eadede56fbec93d23a485166a7036543e53acaef0204673b400f5247cbee098&)
   - Source: https://github.com/droidrun/mobile-jev (by Messyflame)

62. **So many cool stuff built there, i added multiple in the awesome-typesafe repo but can't keep up with everything, so**
   - So many cool stuff built there, i added multiple in the awesome-typesafe repo but can't keep up with everything, so please feel free to submit PRs to add cool Jev projects and experiments. some of you already did, thanks. let's grow the typesafe builders community. https://github.com/AbdelStark/awesome-typesafe Linked projects: • AbdelStark/awesome-typesafe — A curated list of official resources and community projects for TypeSafe, System One models, and Jev. - AbdelStark/awesome-typesafe (github.com/AbdelStark/awesome-typesafe) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550132709513498814
   - [AbdelStark/awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe)
   - Source: https://github.com/AbdelStark/awesome-typesafe (by abdel)

63. **Had Jev and Luna Medium play Snake using the exact same input, with one move decided per API call.**
   - Had Jev and Luna Medium play Snake using the exact same input, with one move decided per API call. Jev is incredibly fast, although its decision making still has room to improve. Over the same number of moves, Luna collected roughly twice as many apples. Excited to see where this goes! Linked projects: • image.png — image/png · 117 KB (cdn.discordapp.com/attachments/1483217545040232493/1550118139226886184)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550118139226886184/image.png?ex=6aae7d04&is=6aad2b84&hm=a7c25aee8f77acdbc5b171c79c35b340b49c0e4f2f4f1a7062b8b97c90ff6146&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550118139960762388 (by Jayson)

64. **Got access to typesafeai and built an autonomous DB Migration Guardian.**
   - Got access to typesafeai and built an autonomous DB Migration Guardian. 🛡️ It intercepts Prisma SQL plans. If Jev detects destructive commands, it halts the pipeline instantly. Code is open source: https://github.com/opaielsheikh/typesafe-migration-guard Linked projects: • opaielsheikh/typesafe-migration-guard — Automated database migration safety reviewer powered by TypeSafe AI (Jev System One model) - opaielsheikh/typesafe-migration-guard (github.com/opaielsheikh/typesafe-migration-guard) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550094891072233522
   - [opaielsheikh/typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard)
   - Source: https://github.com/opaielsheikh/typesafe-migration-guard (by Ubay)

65. **This happens when Zod and Jev meet each other**
   - This happens when Zod and Jev meet each other https://github.com/mateonunez/jod Linked projects: • mateonunez/jod — Semantic schemas over TypeSafe's Jev — validate the state locally, then project typed answers. - mateonunez/jod (github.com/mateonunez/jod) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550093041296212022
   - [mateonunez/jod](https://github.com/mateonunez/jod)
   - Source: https://github.com/mateonunez/jod (by mateonunez)

66. **c compiler without LLVM and self hosted standard library**
   - https://github.com/don2e4/winds c compiler without LLVM and self hosted standard library Linked projects: • don2e4/winds — Lightweight, high-performance C++ compiler for Linux x86_64 written in C11 - don2e4/winds (github.com/don2e4/winds) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550079924684062782
   - [don2e4/winds](https://github.com/don2e4/winds)
   - Source: https://github.com/don2e4/winds (by wemmbu😂🫱🥭a mango)

67. **hey, so many cool stuff built here.**
   - hey, so many cool stuff built here. i compiled some of what you shared into an awesome-typesafe repo, split between official resources and community resources. feel free to submit PRs to add your cool Jev based projects. https://github.com/AbdelStark/awesome-typesafe Linked projects: • AbdelStark/awesome-typesafe — A curated list of official resources and community projects for TypeSafe, System One models, and Jev. - AbdelStark/awesome-typesafe (github.com/AbdelStark/awesome-typesafe) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550042485215076402
   - [AbdelStark/awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe)
   - Source: https://github.com/AbdelStark/awesome-typesafe (by abdel)

68. **Made a quick CLI tool, readme, when to use for typesafe.**
   - Made a quick CLI tool, readme, when to use for typesafe. https://github.com/geilt/typesafe-cli Linked projects: • geilt/typesafe-cli — CLI and agent skill for TypeSafe System One (Jev): typed Choice, Score, and Noul judgments. - geilt/typesafe-cli (github.com/geilt/typesafe-cli) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550032951738245130
   - [geilt/typesafe-cli](https://github.com/geilt/typesafe-cli)
   - Source: https://github.com/geilt/typesafe-cli (by Geilt)

69. **I'm not getting access so using and gluing it to groq models.**
   - I'm not getting access so using https://github.com/typesafe-ai/system-one-adapter-python and gluing it to groq models. Seems to be doing pretty well. Linked projects: • typesafe-ai/system-one-adapter-python — Drop-in TypeSafeClient replacement backed by LLM APIs - typesafe-ai/system-one-adapter-python (github.com/typesafe-ai/system-one-adapter-python) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550031174590660629
   - [typesafe-ai/system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python)
   - Source: https://github.com/typesafe-ai/system-one-adapter-python (by candide)

70. **similarly i built this adapter for codex to use jev as classifier for browser use - blazingly fast**
   - https://github.com/vlad-terin/jev-browser similarly i built this adapter for codex to use jev as classifier for browser use - blazingly fast Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550021558918189106
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - Source: https://github.com/vlad-terin/jev-browser (by BlissF00l)

71. **Inspired by hackgoofer & rauchg to use AI for real workflows.**
   - Inspired by hackgoofer & rauchg to use AI for real workflows. and built an autonomous DB Migration Guardian. 🛡️ It intercepts Prisma SQL plans. If Jev detects destructive commands, it halts the pipeline instantly. https://github.com/opaielsheikh/typesafe-migration-guard Linked projects: • opaielsheikh/typesafe-migration-guard — Automated database migration safety reviewer powered by TypeSafe AI (Jev System One model) - opaielsheikh/typesafe-migration-guard (github.com/opaielsheikh/typesafe-migration-guard) • export-1789623427767.mp4 — video/mp4 · 59 MB (cdn.discordapp.com/attachments/1483217545040232493/1550021386322448506) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550021388046172284
   - [opaielsheikh/typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard)
   - [export-1789623427767.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550021386322448506/export-1789623427767.mp4?ex=6aaecba8&is=6aad7a28&hm=3385752e18f84618251746116027c0b6e2a7d25695ad5ac398949558744fbbad&)
   - Source: https://github.com/opaielsheikh/typesafe-migration-guard (by Ubay)

72. **Hi everyone, this is my approach for browser automation.**
   - Hi everyone, this is my approach for browser automation. And I find a lot of potential for jev doing this. Let me know any idea or discuss with me in DM is welcomed. Thanks for letting me have early access! https://github.com/Ying-Kai-Liao/jev-browser/tree/main Linked projects: • Ying-Kai-Liao/jev-browser — Browser automation where an LLM plans and Jev (Typesafe System One) decides. Library, CLI and MCP server. - Ying-Kai-Liao/jev-browser (github.com/Ying-Kai-Liao/jev-browser/tree/main) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550015503332802590
   - [Ying-Kai-Liao/jev-browser](https://github.com/Ying-Kai-Liao/jev-browser/tree/main)
   - Source: https://github.com/Ying-Kai-Liao/jev-browser/tree/main (by Ying-Kai Liao)

73. **I gave Jev control of my phone It can now use ADB to open apps, navigate the UI, tap buttons, scroll, and complete**
   - I gave Jev control of my phone It can now use ADB to open apps, navigate the UI, tap buttons, scroll, and complete tasks on its own. OpenClaw gives Jev a high-level goal, and Jev handles the fast `observe -> decide -> act` loop. If it needs to generate text or do more complex reasoning, it can hand that part off to ChatGPT and then continue. So instead of using a large LLM for every single tap, Jev handles the fast UI decisions and only escalates when needed. Repo: https://github.com/Friedjof/jev-mobile Linked projects: • Friedjof/jev-mobile — Fast structured Android control loops with TypeSafe Jev and Mobile MCP - Friedjof/jev-mobile (github.com/Friedjof/jev-mobile) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550009533714407494
   - [Friedjof/jev-mobile](https://github.com/Friedjof/jev-mobile)
   - Source: https://github.com/Friedjof/jev-mobile (by Friedjof)

74. **Hey! I’ve been playing around with Jev and built a small open-source experiment around it: **wince**. It’s a**
   - Hey! I’ve been playing around with Jev and built a small open-source experiment around it: **wince**. It’s a semantic review-attention router for code changes — it doesn’t review the code itself, but tries to tell you how carefully a diff should be reviewed, who should look at it, and why. I’m using Jev’s typed judgments for things like blast radius, auth/data-write changes, contract breaks, etc., while keeping the final scoring/routing deterministic. Would love any feedback, especially on whether this feels like a sensible use of System One: https://github.com/TinyFrontier/wince Linked projects: • TinyFrontier/wince — Routes human review attention: green/yellow/red for a diff and who should look. It doesn't review the code. Built on TypeSafe. - TinyFrontier/wince (github.com/TinyFrontier/wince) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/154998463458
   - [TinyFrontier/wince](https://github.com/TinyFrontier/wince)
   - Source: https://github.com/TinyFrontier/wince (by tiny_frontier)

75. **Got my API key few hours ago.**
   - Got my API key few hours ago. Created a VsCode/Cursor extension for code rules. https://youtu.be/goVDTUd7-J0 Source code: https://github.com/MrDesjardins/jevrealtimecodecheck I'll try something more complex soon! 🙂 Linked projects: • Jev Demo with Cursor — Using https://docs.typesafe.ai/introduction to create deterministic decision using AI with very quick response (youtu.be/goVDTUd7-J0) • MrDesjardins/jevrealtimecodecheck — Contribute to MrDesjardins/jevrealtimecodecheck development by creating an account on GitHub. (github.com/MrDesjardins/jevrealtimecodecheck) • Jev Demo with Cursor — Using https://docs.typesafe.ai/introduction to create deterministic decision using AI with very quick response (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549981549858918421
   - [Jev Demo with Cursor](https://youtu.be/goVDTUd7-J0)
   - [MrDesjardins/jevrealtimecodecheck](https://github.com/MrDesjardins/jevrealtimecodecheck)
   - [Jev Demo with Cursor](https://www.youtube.com/watch?v=goVDTUd7-J0)
   - Source: https://github.com/MrDesjardins/jevrealtimecodecheck (by Patrick)

76. **A prototype of how Jev works architecturally [just basis]**
   - https://github.com/MrQuartz99/Qwansh A prototype of how Jev works architecturally [just basis] Linked projects: • MrQuartz99/Qwansh — Contribute to MrQuartz99/Qwansh development by creating an account on GitHub. (github.com/MrQuartz99/Qwansh) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549966321427554446
   - [MrQuartz99/Qwansh](https://github.com/MrQuartz99/Qwansh)
   - Source: https://github.com/MrQuartz99/Qwansh (by MrQuartz)

77. **Yes please, thank you kindly**
   - Yes please, thank you kindly https://x.com/RomanSlack1/status/2100335978229690683 Linked projects: • Post by @RomanSlack1 — Jev by @typesafeai works quite well for drone applications. Made this in 15 minutes and only cost 10 cents. Repo: https://github.com/RomanSlack/jev-drone (x.com/RomanSlack1/status/2100335978229690683) • Post by @RomanSlack1 — Jev by @typesafeai works quite well for drone applications. Made this in 15 minutes and only cost 10 cents. Repo: https://github.com/RomanSlack/jev-drone (twitter.com/RomanSlack1/status/2100335978229690683) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549944664206090270
   - [Post by @RomanSlack1](https://x.com/RomanSlack1/status/2100335978229690683)
   - Source: https://x.com/RomanSlack1/status/2100335978229690683 (by RomanSlack)

78. **I have been told off for shilling, but want expand my small project - I recreated Jev with a live front and (easier)**
   - I have been told off for shilling, but want expand my small project - I recreated Jev https://github.com/CrimsonLuckyLabs/kev with a live front and (easier) API https://openkev.fun - On small model what is the best training package if any? Linked projects: • CrimsonLuckyLabs/kev — Contribute to CrimsonLuckyLabs/kev development by creating an account on GitHub. (github.com/CrimsonLuckyLabs/kev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549936468422823999
   - [CrimsonLuckyLabs/kev](https://github.com/CrimsonLuckyLabs/kev)
   - [https://openkev.fun](https://openkev.fun)
   - Source: https://github.com/CrimsonLuckyLabs/kev (by Crimson)

79. **I've built a tiny intuitive alt JS SDK for TypeSafe.**
   - I've built a tiny intuitive alt JS SDK for TypeSafe. ([Github](https://github.com/pithings/advocaat)) https://x.com/_pi0_/status/2100362008856010789 Linked projects: • pithings/advocaat — A small, type-safe client for asking AI questions about your data, powered by TypeSafe Jev. - pithings/advocaat (github.com/pithings/advocaat) • Post by @_pi0_ — Built a tiny intuitive JS SDK for @typesafeai. Ask questions, get typed answers. (x.com/_pi0_/status/2100362008856010789) • Post by @_pi0_ — Built a tiny intuitive JS SDK for @typesafeai. Ask questions, get typed answers. (twitter.com/_pi0_/status/2100362008856010789) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549922153909198992
   - [pithings/advocaat](https://github.com/pithings/advocaat)
   - [Post by @_pi0_](https://x.com/_pi0_/status/2100362008856010789)
   - Source: https://github.com/pithings/advocaat (by pi0)

80. **This has probably been posted already but:**
   - This has probably been posted already but: https://github.com/typesafeainate/dspy-typesafeify Linked projects: • typesafeainate/dspy-typesafeify — Add a decorator for dspy Signatures that automatically uses TypeSafe where relevant - typesafeainate/dspy-typesafeify (github.com/typesafeainate/dspy-typesafeify) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549913465014059008
   - [typesafeainate/dspy-typesafeify](https://github.com/typesafeainate/dspy-typesafeify)
   - Source: https://github.com/typesafeainate/dspy-typesafeify (by markgunnels)

81. **OpenSourced the drone env above, so far have spent 10 cents.**
   - OpenSourced the drone env above, so far have spent 10 cents. Vibed it in 15 minutes so take that into account. https://github.com/RomanSlack/jev-drone Linked projects: • RomanSlack/jev-drone — Camera-only autonomous drone in MuJoCo with a small judgment model (TypeSafe Jev) in the loop at 2.5Hz - RomanSlack/jev-drone (github.com/RomanSlack/jev-drone) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549886660441804920
   - [RomanSlack/jev-drone](https://github.com/RomanSlack/jev-drone)
   - Source: https://github.com/RomanSlack/jev-drone (by RomanSlack)

82. **Hello! I was wondering if Jev could generate images, so I built a tool that draws by requesting**
   - Hello! I was wondering if Jev could generate images, so I built a tool that draws by requesting for the probability of each pixel's RGBA value, take a look! Repo: https://github.com/rivianpratama/JevPixelArt Linked projects: • rivianpratama/JevPixelArt — Contribute to rivianpratama/JevPixelArt development by creating an account on GitHub. (github.com/rivianpratama/JevPixelArt) • Screen_Recording_2026-09-17_at_12.18.12_AM.mp4 — video/mp4 · 8 MB (cdn.discordapp.com/attachments/1483217545040232493/1549851551219187804) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549851552095670272
   - [rivianpratama/JevPixelArt](https://github.com/rivianpratama/JevPixelArt)
   - [Screen_Recording_2026-09-17_at_12.18.12_AM.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549851551219187804/Screen_Recording_2026-09-17_at_12.18.12_AM.mp4?ex=6aaed63c&is=6aad84bc&hm=1c33d0d5a9b71b5f85b428d22c6cbb96224d5bc3d401f739a416b719b769e36d&)
   - Source: https://github.com/rivianpratama/JevPixelArt (by riv)

83. **For sure! I added you here an on X if you need help (it’s not maintained, so you**
   - For sure! I added you here an on X if you need help (it’s not maintained, so you might want to have astra brush the dust off of it first 😅) Lmk if you need help https://github.com/browser-use/macOS-use Linked projects: • browser-use/macOS-use — Make Mac apps accessible for AI agents. Contribute to browser-use/macOS-use development by creating an account on GitHub. (github.com/browser-use/macOS-use) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549844349557276762
   - [browser-use/macOS-use](https://github.com/browser-use/macOS-use)
   - Source: https://github.com/browser-use/macOS-use (by ofiroz91)

84. **For everyone who cannot afford to buy an ADE, here is one.**
   - For everyone who cannot afford to buy an ADE, here is one. Open source. A star might help, and do not waste your time building your own. 🫡 https://github.com/celsiusm/jarvis-workspace Linked projects: • celsiusm/jarvis-workspace — A local web cockpit that runs several AI coding agents side by side; your keys, your machine. - celsiusm/jarvis-workspace (github.com/celsiusm/jarvis-workspace) • radio.png — image/png · 283 KB (cdn.discordapp.com/attachments/1483217545040232493/1549800743702110218) • accounts-switchboard.png — image/png · 176 KB (cdn.discordapp.com/attachments/1483217545040232493/1549800744088240318) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549800748605505616
   - [celsiusm/jarvis-workspace](https://github.com/celsiusm/jarvis-workspace)
   - [radio.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549800743702110218/radio.png?ex=6aaea6eb&is=6aad556b&hm=14c7a78ff9700b8ceb9e07277bc6a55258abd881c13b1b4bf01b36cb589d448a&)
   - [accounts-switchboard.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549800744088240318/accounts-switchboard.png?ex=6aaea6eb&is=6aad556b&hm=cf881cea8871c724a309e971e6d2e0dd0eb5b4af6e11e51ac0c49879b53e4265&)
   - [appearance-themes.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549800744725647380/appearance-themes.png?ex=6aaea6eb&is=6aad556b&hm=a27917e7b2bfa1ed6e5ccaac2e1d291db71700fe20aad168ce2cf476c97b00e4&)
   - [discord-presence.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549800745652457564/discord-presence.png?ex=6aaea6eb&is=6aad556b&hm=c9848b37d00aed73be7b6847be7b62dfb245cdd921806652cf1b21971924b7cc&)
   - Source: https://github.com/celsiusm/jarvis-workspace (by Celsius)

85. **1.3.3 has stateless search continuation**
   - https://github.com/orneryd/NornicDB 1.3.3 has stateless search continuation Linked projects: • orneryd/NornicDB — Nornicdb is a distributed low-latency, Graph+Vector, Temporal MVCC with all sub-ms HNSW search, graph traversal, and writes. Using Neo4j Bolt/Cypher and qdrant&#39;s gRPC means you can switch with ... (github.com/orneryd/NornicDB) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549795546464784504
   - [orneryd/NornicDB](https://github.com/orneryd/NornicDB)
   - Source: https://github.com/orneryd/NornicDB (by OrneryD)

86. **Hey everyone, built a lightweight, distraction-free Pomodoro web app called focus-flow.**
   - Hey everyone, built a lightweight, distraction-free Pomodoro web app called focus-flow. Most focus timers I tried had cluttered UIs or unnecessary bloat, so I put together something minimal for my own workflow. Features: Configurable session cycles (Focus, Short & Long breaks, rounds tracking) Fullscreen mode to kill tab distractions Built-in ambient audio (rain, background noise) Clean, modular ES modules structure under the hood Repo: https://github.com/w3ziqv/focus-flow Would appreciate any feedback on the implementation or ideas for features worth adding! Linked projects: • w3ziqv/focus-flow — Minimalist Pomodoro timer with focus mode, statistics, ambient sounds, and study tips. - w3ziqv/focus-flow (github.com/w3ziqv/focus-flow) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549782736951320646
   - [w3ziqv/focus-flow](https://github.com/w3ziqv/focus-flow)
   - Source: https://github.com/w3ziqv/focus-flow (by w3ziqv)

87. **Hey everyone, built a lightweight, distraction-free Pomodoro web app called **focus-flow**.**
   - Hey everyone, built a lightweight, distraction-free Pomodoro web app called **focus-flow**. Most focus timers I tried had cluttered UIs or unnecessary bloat, so I put together something minimal for my own workflow. **Features:** * Configurable session cycles (Focus, Short & Long breaks, rounds tracking) * Fullscreen mode to kill tab distractions * Built-in ambient audio (rain, background noise) * Clean, modular ES modules structure under the hood **Repo:** https://github.com/w3ziqv/focus-flow Still fine-tuning the UX and code structure. Would appreciate any feedback on the implementation or ideas for features worth adding! Linked projects: • w3ziqv/focus-flow — Minimalist Pomodoro timer with focus mode, statistics, ambient sounds, and study tips. - w3ziqv/focus-flow (github.com/w3ziqv/focus-flow) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/15497742647
   - [w3ziqv/focus-flow](https://github.com/w3ziqv/focus-flow)
   - Source: https://github.com/w3ziqv/focus-flow (by w3ziqv)

88. **www.mindrian-os.com Thinking innovation ideation Breakthrough machine.**
   - www.mindrian-os.com Thinking innovation ideation Breakthrough machine. Each and every one of you can use it to examine ideation and make your products much better. https://github.com/jsagir/mindrian-os-plugin/blob/main/README.md Linked projects: • jsagir/mindrian-os-plugin — The AI co-founder that pushes back. Bring a real problem worth solving and it reframes what you are actually stuck on, remembers every decision, and knows which method to use right now, not a chatb... (github.com/jsagir/mindrian-os-plugin/blob/main/README.md) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549758777652154399
   - [jsagir/mindrian-os-plugin](https://github.com/jsagir/mindrian-os-plugin/blob/main/README.md)
   - Source: https://github.com/jsagir/mindrian-os-plugin/blob/main/README.md (by Jonathan Sagir)

89. **Here you go y'all real integration with a coding harness**
   - Here you go y'all real integration with a coding harness https://x.com/BniWael/status/2100195854904598745 Linked projects: • Post by @BniWael — I have gotten the luxury to try out Jev and integrate it in Empryo! and it's actually good & works pretty nice with Empryo for coding... -> You pair it with other models and the cost goes very low I will make a new relea (x.com/BniWael/status/2100195854904598745) • Post by @BniWael — I have gotten the luxury to try out Jev and integrate it in Empryo! and it's actually good & works pretty nice with Empryo for coding... -> You pair it with other models and the cost goes very low I will make a new relea (twitter.com/BniWael/status/2100195854904598745) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549756292774629517
   - [Post by @BniWael](https://x.com/BniWael/status/2100195854904598745)
   - Source: https://x.com/BniWael/status/2100195854904598745 (by Proxy Soul)

90. **I'd like to try jev for my open source DNS security / OSINT scanner -**
   - I'd like to try jev for my open source DNS security / OSINT scanner - https://github.com/MadaBurns/bv-mcp Linked projects: • MadaBurns/bv-mcp — Open-source DNS & email security scanner. One MCP endpoint, 57 checks, zero install. Cloudflare Workers. - MadaBurns/bv-mcp (github.com/MadaBurns/bv-mcp) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549737358276956291
   - [MadaBurns/bv-mcp](https://github.com/MadaBurns/bv-mcp)
   - Source: https://github.com/MadaBurns/bv-mcp (by Mada)

91. **I would like to try jev for the discovery phase of**
   - I would like to try jev for the discovery phase of https://github.com/luantak/mosaik Linked projects: • luantak/mosaik — Agentic browser automation built from small, reusable pieces. - luantak/mosaik (github.com/luantak/mosaik) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549737024725196893
   - [luantak/mosaik](https://github.com/luantak/mosaik)
   - Source: https://github.com/luantak/mosaik (by Paul)

92. **I'm building a TypeScript framework for deterministic coding workflows using graphs with an agent native version**
   - I'm building a TypeScript framework for deterministic coding workflows using graphs with an agent native version control layer. I'd like to try out Jev for all the small decision trees. https://github.com/marcus-sa/decow Linked projects: • marcus-sa/decow — Deterministic Coding Workflows. Contribute to marcus-sa/decow development by creating an account on GitHub. (github.com/marcus-sa/decow) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549735555666022431
   - [marcus-sa/decow](https://github.com/marcus-sa/decow)
   - Source: https://github.com/marcus-sa/decow (by marcus-sa)

93. **Hello everyone - I'm very new to "creating" apps or services - I have no tech background or coding, so, like most of**
   - Hello everyone - I'm very new to "creating" apps or services - I have no tech background or coding, so, like most of the people who simply reacted to the arrival of AI, I'm a "vibecoder" as they call it these days. I made this recently, took me about 4 days. It's free, enjoy https://garbist.github.io/Glassdeck-releases/ Linked projects: • GlassDeck — A Better Now Playing for Your Mac — A free floating Now Playing widget for macOS: four layouts, a real audio spectrum, and glass you can tune live. (garbist.github.io/Glassdeck-releases) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549720544780361828
   - [GlassDeck — A Better Now Playing for Your Mac](https://garbist.github.io/Glassdeck-releases/)
   - Source: https://garbist.github.io/Glassdeck-releases/ (by W4rm0nger)

94. **Now that we have access, here's a SDK for swift**
   - Now that we have access, here's a SDK for swift https://github.com/alterhq/typesafe-sdk-swift Linked projects: • alterhq/typesafe-sdk-swift — Unofficial Swift library for the TypeSafe API. Contribute to alterhq/typesafe-sdk-swift development by creating an account on GitHub. (github.com/alterhq/typesafe-sdk-swift) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549714766052720712
   - [alterhq/typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift)
   - Source: https://github.com/alterhq/typesafe-sdk-swift (by Samuel Roy)

95. **Pretty sick open source agentic memory system, especially for developers**
   - https://github.com/Coding-Dev-Tools/engraphis Pretty sick open source agentic memory system, especially for developers Linked projects: • Coding-Dev-Tools/engraphis — Local-first, inspectable memory for coding agents: durable context across sessions and repositories, code-aware recall, bi-temporal history, MCP, and a self-hosted WebUI. - Coding-Dev-Tools/engraphis (github.com/Coding-Dev-Tools/engraphis) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549684523468595270
   - [Coding-Dev-Tools/engraphis](https://github.com/Coding-Dev-Tools/engraphis)
   - Source: https://github.com/Coding-Dev-Tools/engraphis (by Jaixii)

96. **the code is opensource if you wish to have a look inside!**
   - https://github.com/Gaurav-Gosain/jev-sec-bench the code is opensource if you wish to have a look inside! Linked projects: • Gaurav-Gosain/jev-sec-bench — Blind security benchmarks for Jev, TypeSafe's System One model: prompt injection and vulnerable code detection, built on jev-go - Gaurav-Gosain/jev-sec-bench (github.com/Gaurav-Gosain/jev-sec-bench) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549673090173239316
   - [Gaurav-Gosain/jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench)
   - Source: https://github.com/Gaurav-Gosain/jev-sec-bench (by Gaurav)

97. **also wrote a go client that I used for running the experiments (:**
   - https://github.com/Gaurav-Gosain/jev-go also wrote a go client that I used for running the experiments (: Linked projects: • Gaurav-Gosain/jev-go — Go client for TypeSafe's System One API and its model Jev: typed judgments and calibrated probabilities instead of generated text - Gaurav-Gosain/jev-go (github.com/Gaurav-Gosain/jev-go) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549672744176844852
   - [Gaurav-Gosain/jev-go](https://github.com/Gaurav-Gosain/jev-go)
   - Source: https://github.com/Gaurav-Gosain/jev-go (by Gaurav)

98. **I build => to allow multiple claude/codex account switch like work account/personal account plus it has option to open**
   - I build https://github.com/up1512001/conductor-hats => to allow multiple claude/codex account switch like work account/personal account plus it has option to open secure web connection to allow you to see and control your agents activity Linked projects: • up1512001/conductor-hats — Run any number of Claude Code or Codex accounts in Conductor, one per workspace. No signing in and out. - up1512001/conductor-hats (github.com/up1512001/conductor-hats) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549653494389145770
   - [up1512001/conductor-hats](https://github.com/up1512001/conductor-hats)
   - Source: https://github.com/up1512001/conductor-hats (by Utsav)

99. **Okay, I've built a search tool in Rust that's pretty fast- and a rust API client library to go with it, which is**
   - Okay, I've built a search tool in Rust that's pretty fast- https://github.com/Twister915/typesafe-ai/tree/main/examples/tsg and a rust API client library to go with it, which is published as `typesafe-ai = "1.0"` in Cargo.toml and happy to change the name if you'd prefer Linked projects: • Twister915/typesafe-ai — Typed TypeSafe AI clients for Rust, with async and blocking backends and observable retries. - Twister915/typesafe-ai (github.com/Twister915/typesafe-ai/tree/main/examples/tsg) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549619058717102171
   - [Twister915/typesafe-ai](https://github.com/Twister915/typesafe-ai/tree/main/examples/tsg)
   - Source: https://github.com/Twister915/typesafe-ai/tree/main/examples/tsg (by Robert)

100. **It's probably irrelevant to most, but I made this skill for Blender that makes it much faster than traditional blender**
   - It's probably irrelevant to most, but I made this skill for Blender that makes it much faster than traditional blender MCP - especially for multi-object scene generation: https://github.com/holokat/blender-fast Linked projects: • holokat/blender-fast — Batched Blender workflows, reproducible rendering benchmarks, and a reusable Codex skill. - holokat/blender-fast (github.com/holokat/blender-fast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549605954155319307
   - [holokat/blender-fast](https://github.com/holokat/blender-fast)
   - Source: https://github.com/holokat/blender-fast (by Holokat)

101. **I made a thing called Prebrief that keeps my agents up to speed on what I’m doing across sessions.**
   - I made a thing called Prebrief that keeps my agents up to speed on what I’m doing across sessions. It pairs with Cartograph, my private knowledge and memory system; Engram is the public version of that. Unused memories fade, useful ones get reinforced, and past experiences consolidate into durable knowledge. Prebrief tells them what’s changed, and the memory layer gives them the context behind it, so I’m not constantly explaining everything again. I’ve had the private setup running since January across local models and API/CLI agents. Not sure how useful this is to anyone else, but it makes my Qwen 3.8-27B feel a lot closer to Terra on my builds lol. Turns out knowing what’s going on helps quite a bit, especially in swarms/teams. https://github.com/blakestone-x/prebrief https://github.com/blakestone-x/engram Linked projects: • blakestone-x/prebrief — Your agents' work, always in their ne
   - [blakestone-x/prebrief](https://github.com/blakestone-x/prebrief)
   - [blakestone-x/engram](https://github.com/blakestone-x/engram)
   - Source: https://github.com/blakestone-x/prebrief (by blake)

102. **solo built this during my free time, if u can find a better coding harness, lmk.**
   - solo built this during my free time, if u can find a better coding harness, lmk. (Try it first (:!!) Empryo.com https://github.com/proxysoul/Empryo Linked projects: • proxysoul/Empryo — Empryo is the graph-powered AI coding agent that edits symbols, not strings: AST surgery, full LSP, a live code genome. Get it at https://empryo.com - proxysoul/Empryo (github.com/proxysoul/Empryo) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549577623498137660
   - [proxysoul/Empryo](https://github.com/proxysoul/Empryo)
   - Source: https://github.com/proxysoul/Empryo (by Proxy Soul)

103. **I will start with building neo4jev - a graph navigation demo where Jev picks the most probably edge towards a target**
   - I will start with building neo4jev - a graph navigation demo where Jev picks the most probably edge towards a target node or along a target path (as a classifier) coming here as soon as I have API access https://github.com/jexp/neo4jev Linked projects: • jexp/neo4jev — Typesafe.ai System One Model Jev navigating a Neo4j graph by using a classifier over neighbouring relationships - jexp/neo4jev (github.com/jexp/neo4jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549574268596265023
   - [jexp/neo4jev](https://github.com/jexp/neo4jev)
   - Source: https://github.com/jexp/neo4jev (by Mesirii)

104. **Hey friends! Author of here, super excited to try typesafe AI with this**
   - Hey friends! Author of https://github.com/clavia-labs/tardigrade here, super excited to try typesafe AI with this Linked projects: • clavia-labs/tardigrade — The TypeScript framework for building modular agents around an immutable event log. - clavia-labs/tardigrade (github.com/clavia-labs/tardigrade) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549562422367363122
   - [clavia-labs/tardigrade](https://github.com/clavia-labs/tardigrade)
   - Source: https://github.com/clavia-labs/tardigrade (by june)

105. **Discord harness with an unfortunate number of features...**
   - Discord harness with an unfortunate number of features... 😂 https://github.com/chudworks/chudbot/tree/main Meant to start as a "grok for discord" and ended up as a "oneshot vibe coded sites... from discord" Linked projects: • chudworks/chudbot — chudbot. Contribute to chudworks/chudbot development by creating an account on GitHub. (github.com/chudworks/chudbot/tree/main) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549548358115397632
   - [chudworks/chudbot](https://github.com/chudworks/chudbot/tree/main)
   - Source: https://github.com/chudworks/chudbot/tree/main (by Robert)

106. **Had been building an API client in recent times, still in beta, and a work in progress.**
   - Had been building an API client in recent times, still in beta, and a work in progress. https://beta.kbootar.com have applied for access to typesafe via waitlist, hope I could get my hands on to it sooner than later. Linked projects: • Kbootar - ਕਬੂਤਰ - messenger of your APIs — A native API client that runs on your machine. No subscription, no account, no credentials leaving your device. (beta.kbootar.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549544809583214643
   - [Kbootar - ਕਬੂਤਰ - messenger of your APIs](https://beta.kbootar.com)
   - Source: https://beta.kbootar.com (by karanbir)

107. **What's anyone think of pr?**
   - What's anyone think of pr? https://github.com/cakeisalie89/Quantum-Thermal-/pull/17 Linked projects: • cakeisalie89/Quantum-Thermal- — Contribute to cakeisalie89/Quantum-Thermal- development by creating an account on GitHub. (github.com/cakeisalie89/Quantum-Thermal-/pull/17) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549532912746242058
   - [cakeisalie89/Quantum-Thermal-](https://github.com/cakeisalie89/Quantum-Thermal-/pull/17)
   - Source: https://github.com/cakeisalie89/Quantum-Thermal-/pull/17 (by Valk)

108. **I built Azdaja after playing with RLMs and wanting the core idea without a full agent framework.**
   - I built Azdaja after playing with RLMs and wanting the core idea without a full agent framework. It’s a single Rust binary that uses Monty for persistent sandboxed Python and works with existing harnesses like Claude, Codex, OpenCode and others. MIT licensed and OSS. Also I'm experimenting with shared project memory, building on the same decomposition approach so large accumulated context can live outside any single model session https://github.com/kubet/azdaja Linked projects: • kubet/azdaja — Minimal harness-agnostic recursive language model layer — one binary, Python + llm() - kubet/azdaja (github.com/kubet/azdaja) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549525003739856980
   - [kubet/azdaja](https://github.com/kubet/azdaja)
   - Source: https://github.com/kubet/azdaja (by 0х88)

109. **check my chess engine**
   - https://github.com/Nesbesss/khatib-chess check my chess engine Linked projects: • Nesbesss/khatib-chess — A bitboard chess engine in Rust with NNUE evaluation — ~2544 Elo, plus a live search visualizer - Nesbesss/khatib-chess (github.com/Nesbesss/khatib-chess) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549520125177368636
   - [Nesbesss/khatib-chess](https://github.com/Nesbesss/khatib-chess)
   - Source: https://github.com/Nesbesss/khatib-chess (by nameless)

110. **typesafe-pilling dspy Signatures with one decorator!**
   - <@277646467806789632> typesafe-pilling dspy Signatures with one decorator! https://github.com/typesafeainate/dspy-typesafeify Linked projects: • typesafeainate/dspy-typesafeify — Add a decorator for dspy Signatures that automatically uses TypeSafe where relevant - typesafeainate/dspy-typesafeify (github.com/typesafeainate/dspy-typesafeify) • benchmark.png — image/png · 61 KB (cdn.discordapp.com/attachments/1483217545040232493/1549517346299707565) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549517346345853002
   - [typesafeainate/dspy-typesafeify](https://github.com/typesafeainate/dspy-typesafeify)
   - [benchmark.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549517346299707565/benchmark.png?ex=6aae47bb&is=6aacf63b&hm=5a521da55fdb6777b3fb857a304c2686702bd274cfc495c161195eb20664c214&)
   - Source: https://github.com/typesafeainate/dspy-typesafeify (by typesafeainate)

111. **is my github and I build AI agentic workflows for business, now studing computer science in UBA (QS 100 world**
   - https://github.com/joaco05/ is my github and I build AI agentic workflows for business, now studing computer science in UBA (QS 100 world university rank), did some hackatons in the past (and won some of them). I'm also an electronic technician. Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549516499637641216
   - [https://github.com/joaco05/](https://github.com/joaco05/)
   - Source: https://github.com/joaco05/ (by joaco05)

112. **I am also building an open source version of Grok Bot here**
   - I am also building an open source version of Grok Bot here https://github.com/milind-soni/OpenMausBot Linked projects: • milind-soni/OpenMausBot — Open Source Alternative to Grok Bot with a virtual machine that bots can use - milind-soni/OpenMausBot (github.com/milind-soni/OpenMausBot) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549515191702523974
   - [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot)
   - Source: https://github.com/milind-soni/OpenMausBot (by milind)

113. **I want to integrate typesafe into my builder so very curious**
   - I want to integrate typesafe into my builder so very curious https://github.com/skyf0xx/hedgehog Linked projects: • skyf0xx/hedgehog — HEDGEHOG codes Cleaner, Faster and with Fewer Tokens. Hedgehog&#39;s AI-driven development builds a task dependency graph from your spec-driven, BMAD-METHOD plan, so Claude Code, Cursor &amp; Gemin... (github.com/skyf0xx/hedgehog) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549514714554568787
   - [skyf0xx/hedgehog](https://github.com/skyf0xx/hedgehog)
   - Source: https://github.com/skyf0xx/hedgehog (by Skyfoxx)

114. **Hey all! Type Safety is a must! Match your type safety with capability guarantees + identity:**
   - Hey all! Type Safety is a must! Match your type safety with capability guarantees + identity: https://github.com/sekosai/schemen-gate Linked projects: • sekosai/schemen-gate — Cryptographic gates, capability delegations, lockboxes, and vector isolation primitives - sekosai/schemen-gate (github.com/sekosai/schemen-gate) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549513249471340724
   - [sekosai/schemen-gate](https://github.com/sekosai/schemen-gate)
   - Source: https://github.com/sekosai/schemen-gate (by Ryan McCormick)

115. **Why is AI + Doom so charming?**
   - Why is AI + Doom so charming? Want to ship it in a wrapper so people can run it in their harness browsers? https://github.com/robault/skilldoom Linked projects: • robault/skilldoom — DOOM in your agent's browser preview — prebuilt wasm, Freedoom bundled, one command to play. Ships as a SKILL.md for Claude Code, OpenClaw, Hermes, and any agent with python3. - robault/skilldoom (github.com/robault/skilldoom) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549511817171312812
   - [robault/skilldoom](https://github.com/robault/skilldoom)
   - Source: https://github.com/robault/skilldoom (by TokenFires (Robert Ault))

116. **json-render + Jev: generative UI rendered in milliseconds**
   - New experiment: json-render + Jev. The future of generative UI is instant — your components, your actions, your design system, rendered in milliseconds. Try it: experimental_composeSpec, experimental_createEvaluator. https://github.com/vercel-labs/json-render — @ctatedev (2.5K likes) Linked projects: • Post by @ctatedev — New experiment: json-render + jev The future Generative UI is instant Your components, your actions, your design system Rendered in milliseconds (x.com/ctatedev/status/2101022101750571357) • vercel-labs/json-render — The Generative UI framework — 16335★ · TypeScript — Live: https://json-render.dev (github.com/vercel-labs/json-render) • Post by @ctatedev — Try it now and share your feedback: - experimental_composeSpec - experimental_createEvaluator https://github.com/vercel-labs/json-render (x.com/ctatedev/status/2101022105647157442)
   - [Post by @ctatedev](https://x.com/ctatedev/status/2101022101750571357)
   - [vercel-labs/json-render](https://github.com/vercel-labs/json-render)
   - [Post by @ctatedev](https://x.com/ctatedev/status/2101022105647157442)
   - Source: https://x.com/ctatedev/status/2101022101750571357 (by @ctatedev)

117. **jev-ultrafast: browser agent that only wakes an LLM for typing**
   - Jev automates browser operations and selects target elements, using a small LLM only for text input. Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast)
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by @browser-use)

118. **Mac computer-use: OCR screen, Jev picks the next click**
   - A Mac implementation of computer-use that reads the screen via OCR and uses TypeSafe/Jev to select the next click operation. Linked projects: • awlevin/typesafe-computer-use — Computer use for about $0.0002 a step: OCR the screen, classify the next action with TypeSafe, click. macOS. - awlevin/typesafe-computer-use (github.com/awlevin/typesafe-computer-use)
   - [awlevin/typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use)
   - Source: https://github.com/awlevin/typesafe-computer-use (by @awlevin)

119. **jev-browser: Jev runtime for existing browser tools**
   - An unofficial runtime/skill integrating Jev into existing browser automation tools, selecting targets via continuous observe-act-verify loops. Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser)
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - Source: https://github.com/vlad-terin/jev-browser (by @vlad-terin)

120. **mobile-jev: drive real Android devices with Jev**
   - A mobile agent operating real Android devices with Jev. Live operation demos, CLI and execution traces included. Linked projects: • droidrun/mobile-jev — Contribute to droidrun/mobile-jev development by creating an account on GitHub. (github.com/droidrun/mobile-jev)
   - [droidrun/mobile-jev](https://github.com/droidrun/mobile-jev)
   - Source: https://github.com/droidrun/mobile-jev (by @droidrun)

121. **JevRouter for Hono routes HTTP requests by meaning, not method and path**
   - Yusuke (Hono's creator) built JevRouter for Hono: it routes HTTP requests by meaning, not by method and path. Install with `npm i hono-jev-router`, try it in the playground. — @yusukebe (844 likes) Linked projects: • Post by @yusukebe — I created JevRouter for Hono! This routes HTTP requests by meaning, not by method and path. (x.com/yusukebe/status/2100871075743859182) • yusukebe/hono-jev-router — Route HTTP requests by meaning. A semantic router for Hono powered by Jev. — 26★ · TypeScript (github.com/yusukebe/hono-jev-router) • JevRouter playground — Try semantic routing in the browser. (hono-jev-router.yusuke.run)
   - [Post by @yusukebe](https://x.com/yusukebe/status/2100871075743859182)
   - [yusukebe/hono-jev-router](https://github.com/yusukebe/hono-jev-router)
   - [JevRouter playground](https://hono-jev-router.yusuke.run)
   - Source: https://x.com/yusukebe/status/2100871075743859182 (by @yusukebe)

### Evaluation (83)

1. **Return probabilities, not labels — 80/10/10 beats "orange"**
   - Jev never just says orange. Given an iPhone and color choices it returns 80% orange, 10% red, 10% blue — calibrated confidence you can threshold, route, or escalate on. Define choices in the schema; Jev scores them.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **I’m building Aurapunk, an open-source multi-agent IDE.**
   - I’m building Aurapunk, an open-source multi-agent IDE. I’m exploring Jev as a fast decision layer for orchestrating models and tool calls—routing each task to the right model/tool, while using confidence scores to trigger fallbacks or human review. https://github.com/flashlan/aurapunk-ide Linked projects: • flashlan/aurapunk-ide — vibe-kanban-indie fork. Contribute to flashlan/aurapunk-ide development by creating an account on GitHub. (github.com/flashlan/aurapunk-ide) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550583220318507041
   - [flashlan/aurapunk-ide](https://github.com/flashlan/aurapunk-ide)
   - Source: https://github.com/flashlan/aurapunk-ide (by EvertonKozloski)

3. **Tested jev against deepseek v4.1 flash on norwegian text.**
   - Tested jev against deepseek v4.1 flash on norwegian text. Did pretty well, and was vert fast! https://lindfors.no/blog/a-first-look-at-typesafes-jev/ Linked projects: • An early-access test of TypeSafe's Jev: calibrated judgments for half a cent — An early-access test of TypeSafe's Jev, a model that answers typed questions with probabilities and writes no text. I ran it on 24 Norwegian responses to the 2022 hearing on resource rent tax for salmon farming. Agreemen (lindfors.no/blog/a-first-look-at-typesafes-jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550544655148392610
   - [An early-access test of TypeSafe&#39;s Jev: calibrated judgments for half a cent](https://lindfors.no/blog/a-first-look-at-typesafes-jev/)
   - Source: https://lindfors.no/blog/a-first-look-at-typesafes-jev/ (by depurator)

4. **made this quickly to test jev, very cool!**
   - made this quickly to test jev, very cool! https://x.com/_hosty/status/2100980502362517801?s=46 Linked projects: • Post by @_hosty — got access to jev and built a little detective escape room 🕵️‍♂️ your passport is missing. three passengers are lying. you connect the clues in your own words, and jev checks whether your argument holds up. (x.com/_hosty/status/2100980502362517801) • Post by @_hosty — got access to jev and built a little detective escape room 🕵️‍♂️ your passport is missing. three passengers are lying. you connect the clues in your own words, and jev checks whether your argument holds up. (twitter.com/_hosty/status/2100980502362517801) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550542229263618090
   - [Post by @_hosty](https://x.com/_hosty/status/2100980502362517801?s=46)
   - Source: https://x.com/_hosty/status/2100980502362517801?s=46 (by hosty)

5. **I have a benchmark that tests models for "here's a set of statements, express the common principle behind them" and**
   - I have a benchmark that tests models for "here's a set of statements, express the common principle behind them" and the model expresses a principle. Then in fresh context windows, the model is shown a series of statements and asks "which of these statements are examples of the principle?" jev skipped the first step (since it doesn't express) but came out on top finding which statements exhibit the principle Demo: https://yuwakisa.com/benchmarks/principle/ Results: https://yuwakisa.com/benchmarks/principle/report-s5xu-20260919/report Linked projects: • Principle benchmark — human edition (yuwakisa.com/benchmarks/principle) • Principle benchmark report (yuwakisa.com/benchmarks/principle/report-s5xu-20260919/report) • image.png — image/png · 23 KB (cdn.discordapp.com/attachments/1483217545040232493/1550531846129844284) Discussion: https://discord.com/channels/1483217544214085663/14832175450
   - [Principle benchmark — human edition](https://yuwakisa.com/benchmarks/principle/)
   - [Principle benchmark report](https://yuwakisa.com/benchmarks/principle/report-s5xu-20260919/report)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550531846129844284/image.png?ex=6aaeaccf&is=6aad5b4f&hm=15910897443cf98958103fd37584afa42802d014d75b60b07bacf06a87ce69f6&)
   - Source: https://yuwakisa.com/benchmarks/principle/ (by hypnoticfuzzwave)

6. **What's up y'all, made a small eval tool for jev: The goal is to have something to help me keep track of my**
   - What's up y'all, made a small eval tool for jev: https://x.com/Dayhaysoos/status/2100968892591968320 The goal is to have something to help me keep track of my improvements or regressions. Everything stored locally on an SQL database Linked projects: • Post by @Dayhaysoos — I wanted an easier way to test my jev requests and see if my results are improving, so I built jevals! It's a local workbench for testng the Noul, Choice, and Score primitives. You can mix requests as well. You can run a (x.com/Dayhaysoos/status/2100968892591968320) • Post by @Dayhaysoos — I wanted an easier way to test my jev requests and see if my results are improving, so I built jevals! It's a local workbench for testng the Noul, Choice, and Score primitives. You can mix requests as well. You can run a (twitter.com/Dayhaysoos/status/2100968892591968320) Discussion: https://discord.com/channels/1483217544214085663/1
   - [Post by @Dayhaysoos](https://x.com/Dayhaysoos/status/2100968892591968320)
   - Source: https://x.com/Dayhaysoos/status/2100968892591968320 (by soos)

7. **Hi guys, I built pi-heed for Pi: It keeps conversational constraints like “don’t modify files” or “never call**
   - Hi guys, I built pi-heed for Pi: https://github.com/Nyarlathoteppppp/pi-heed It keeps conversational constraints like “don’t modify files” or “never call production” as runtime state, then checks side-effecting tool calls before they execute. Obvious cases use deterministic rules; ambiguous free-text constraints use Jev. It defaults to shadow mode and fails open on uncertainty/errors. 46/46 tests passing so far. Linked projects: • Nyarlathoteppppp/pi-heed — Runtime constraints for the pi coding agent: checks every side-effecting tool call against what you said, before it runs. Powered by TypeSafe Jev. - Nyarlathoteppppp/pi-heed (github.com/Nyarlathoteppppp/pi-heed) • image.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550515464734507028) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550515465015533579
   - [Nyarlathoteppppp/pi-heed](https://github.com/Nyarlathoteppppp/pi-heed)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550515464734507028/image.png?ex=6aae9d8d&is=6aad4c0d&hm=974131e2923853b23d6e2c6dc4faa25ead2a32207b6f041c318b315ccd616684&)
   - Source: https://github.com/Nyarlathoteppppp/pi-heed (by 奈亚子)

8. **Experimenting with how Jev can help in a coding harness.**
   - Experimenting with how Jev can help in a coding harness. Built a hybrid harness that defers all decision making to Jev, and use Astra for things it cannot do, and for code generation. Its probably also doable to have a lexicon/ast manipulation (think an LSP) that takes its instructions from Jev too, though would need benchmarks to see if its worth it. Linked projects: • image.png — image/png · 227 KB (cdn.discordapp.com/attachments/1483217545040232493/1550511736052912188)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550511736052912188/image.png?ex=6aae9a14&is=6aad4894&hm=4d23d057a2c7df8a2713f236071220e8a06ce23d83e3a507d41b8caf023730c9&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550511736480604171 (by Shados)

9. **ReadyBase v1.6.0 is out with support for JEV ReadyBase gives your Claude Code agent the context a senior engineer**
   - ReadyBase v1.6.0 is out with support for JEV ReadyBase gives your Claude Code agent the context a senior engineer already has. Hooks fire automatically on every turn and every edit, injecting the minimum necessary context right into the agent's window: blast radius before it touches a load-bearing file, co-change partners it might be forgetting, quality warnings on hot spots. No prompt engineering, fail-open by default. It also watches for drift: learns your naming, structure, and error-handling conventions by consensus (not a style guide nobody reads) and flags AI-written code the moment it strays, before it piles up into a codebase that reads like a committee of strangers. One local binary, no telemetry, network-free by default, verifiable with tcpdump. Ideas distilled (clean-room, no code copied) from 9 open-source projects (dependency-cruiser, madge, CodeGraph, Serena,grepai, Repomix
   - [PromptForcePrime/readybase-public](https://github.com/PromptForcePrime/readybase-public/releases/tag/v1.6.0)
   - [https://promptforce.ai/rb-install.sh](https://promptforce.ai/rb-install.sh)
   - Source: https://github.com/PromptForcePrime/readybase-public/releases/tag/v1.6.0 (by PromptForcePrime)

10. **Hey guys, glad to be here!!!!**
   - Hey guys, glad to be here!!!! I’m a master's student at UEM (Maringá/PR, Brazil), and for our Software Quality class, my team and I are writing a paper comparing code vulnerabilities introduced by LLMs versus those written by humans. Alongside our literature review, we are building a tool to automate this comparative analysis. I’m very interested in including Jev in our benchmarks, but we’re on an extremely tight deadline (around a month) to wrap up our results.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550458365652635709 (by lucianoalberti)

11. **any support appreciated.**
   - https://x.com/CodingDevTools/status/2100882968688357706 any support appreciated. Will be doing benchmarks for typesafe also 🙂 Linked projects: • Post by @CodingDevTools — I’m building a public benchmark series for #AI coding CLIs. First 776 paired runs: @CommandCodeAI vs @opencode on Meta Muse Contributor 1.2 + 1.3. Matched tasks, paired runs, multiple campaign types. Full results with 6 (x.com/CodingDevTools/status/2100882968688357706) • Post by @CodingDevTools — I’m building a public benchmark series for #AI coding CLIs. First 776 paired runs: @CommandCodeAI vs @opencode on Meta Muse Contributor 1.2 + 1.3. Matched tasks, paired runs, multiple campaign types. Full results with 6 (twitter.com/CodingDevTools/status/2100882968688357706) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550450381023084677
   - [Post by @CodingDevTools](https://x.com/CodingDevTools/status/2100882968688357706)
   - Source: https://x.com/CodingDevTools/status/2100882968688357706 (by Jaixii)

12. **I plugged Jev to my CARLA simulator to see how it can drive in realtime; it is a very harsh drive as expected, but**
   - I plugged Jev to my CARLA simulator to see how it can drive in realtime; it is a very harsh drive as expected, but this was mostly to test the response time for real time applications... Linked projects: • jev_v2_live.mp4 — video/mp4 · 49 MB (cdn.discordapp.com/attachments/1483217545040232493/1550446833292279818)
   - [jev_v2_live.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550446833292279818/jev_v2_live.mp4?ex=6aae5da2&is=6aad0c22&hm=59585a1d8e1879c79588cd14e95c39fc65bfcde860da8df04790e14417ca1f75&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550446836786143255 (by jmsalash)

13. **First AI memory system with TypeSafe implemented?**
   - First AI memory system with TypeSafe implemented? Retrieval times dropped from several seconds to under 1000ms https://www.npmjs.com/package/@bitwarelabs/bwmem Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550437853081632860
   - [https://www.npmjs.com/package/@bitwarelabs/bwmem](https://www.npmjs.com/package/@bitwarelabs/bwmem)
   - Source: https://www.npmjs.com/package/@bitwarelabs/bwmem (by Henke)

14. **Ad research tool for marketers: pulls any advertiser's video ads from Meta and splits each into shots.**
   - Ad research tool for marketers: pulls any advertiser's video ads from Meta and splits each into shots. Jev scores every shot and gives the ad a final rating out of 100. https://x.com/vladdubchak_x/status/2100870244004683886?s=20 Linked projects: • Post by @vladdubchak_x — Jev is insane for ad research. I built a tool that scores every shot of any video ad on meta in 1.5 seconds. It runs on Maxfusion + @typesafeai I pushed 450+ ads through it in less than 3 minutes. It pulls any advertiser (x.com/vladdubchak_x/status/2100870244004683886) • Post by @vladdubchak_x — Jev is insane for ad research. I built a tool that scores every shot of any video ad on meta in 1.5 seconds. It runs on Maxfusion + @typesafeai I pushed 450+ ads through it in less than 3 minutes. It pulls any advertiser (twitter.com/vladdubchak_x/status/2100870244004683886) Discussion: https://discord.com/channels/1483217544214
   - [Post by @vladdubchak_x](https://x.com/vladdubchak_x/status/2100870244004683886?s=20)
   - Source: https://x.com/vladdubchak_x/status/2100870244004683886?s=20 (by invincible)

15. **I've built Myna, free forever **local** meeting assistant (speaker diarization, summaries, recording).**
   - I've built Myna, free forever **local** meeting assistant (speaker diarization, summaries, recording). https://github.com/fmflurry/myna Looking forward to use Jev to improve accuracy! Linked projects: • fmflurry/myna — Local-first AI meeting recorder and summarizer. On-device STT (Parakeet-TDT) and summarization (Qwen2.5). No cloud. - fmflurry/myna (github.com/fmflurry/myna) • image.png — image/png · 83 KB (cdn.discordapp.com/attachments/1483217545040232493/1550414668843978762) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550414669133520946
   - [fmflurry/myna](https://github.com/fmflurry/myna)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550414668843978762/image.png?ex=6aae3fae&is=6aacee2e&hm=52d99ebfb67d77a14c01292175a58ea5a37f53f8d5d44d967a3f8558a3f0df38&)
   - Source: https://github.com/fmflurry/myna (by Iwa)

16. **if the link is looking a bit sketchy it was a component of this article:**
   - if the link is looking a bit sketchy it was a component of this article: https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds Linked projects: • Mini-Vibe Check: TypeSafe's Jev Judged Everything I’ve Written in 0.7 Seconds — Its new model turns fuzzy questions into probabilities fast and cheaply enough to check an AI agent’s work as it goes (every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-ev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550386640059502602
   - [Mini-Vibe Check: TypeSafe&#x27;s Jev Judged Everything I’ve Written in 0.7 Seconds](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds)
   - Source: https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds (by willdog)

17. **I tried this - didn't pass my evals**
   - https://github.com/browser-use/jev-ultrafast I tried this - didn't pass my evals Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550368280164700281
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by BlissF00l)

18. **Played around building a Catan/Civ-like map generator backed by Jev.**
   - Played around building a Catan/Civ-like map generator backed by Jev. The animation is real time as jev returns the tiles. It could do it all in one shot but I wanted to test latency. (ignore that the landscape sliders didn't affect the map properly, thats a bug in the harness). Linked projects: • 2026-09-18_00-15-22.gif — image/gif · 7 MB (cdn.discordapp.com/attachments/1483217545040232493/1550359963933868032)
   - [2026-09-18_00-15-22.gif](https://cdn.discordapp.com/attachments/1483217545040232493/1550359963933868032/2026-09-18_00-15-22.gif?ex=6aaeb57b&is=6aad63fb&hm=e2fab12f26a50f7c5a8bac94e0eea29eeac1c1a47793f5f72057e6e04b925598&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550359964235862076 (by Shados)

19. **Ash Framework's AI extension getting fancy Jev support 🥳 ```elixir action :urgent, AshAi.Evaluate.Noul do description**
   - Ash Framework's AI extension getting fancy Jev support 🥳 ```elixir action :urgent, AshAi.Evaluate.Noul do description "Does `ticket` convey urgency?" argument :ticket, :string, allow_nil?: false run evaluate("typesafe:jev-latest") end ``` Or multiple judgements: ```elixir action :triage, AshAi.Evaluate.Judgments do argument :ticket, :string, allow_nil?: false constraints fields: [ department: [type: MyApp.Department, description: "Which team should handle `ticket`?"], urgent: [type: :boolean, description: "Does `ticket` convey urgency?"] ] run evaluate("typesafe:jev-latest") end ``` And the way that AshAI works exposing actions as tools is trivial. So you can easily provide these as tools to LLM-backed actions: ```elixir action :assign_to_correct_team do description """ Assigns the ticket to the correct department: - Engineering, if related to code - Product, if related to features or i
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550354274662486067 (by ZachDaniel)

20. **Spent the entire day building `tenet`: The review gate for code that agents write: rules in plain language, judged on**
   - Spent the entire day building `tenet`: The review gate for code that agents write: rules in plain language, judged on every commit Your AGENTS.md says what a comment is for and that a failure is raised rather than hidden; agents break those rules anyway, and nobody reads every line of a large diff. You write each tenet once in plain language in tenet.yml and every commit is judged against it, fast enough that the agent fixes its own findings before you see the diff. https://github.com/zoidsh/tenet Still in early stages, but I think this could be a great use case for Jev 🙂 Open for feedback! Linked projects: • zoidsh/tenet — The review gate for code that agents write: rules in plain language, judged on every commit - zoidsh/tenet (github.com/zoidsh/tenet) • Kapture_2026-09-18_at_01.27.18.mp4 — video/mp4 · 3 MB (cdn.discordapp.com/attachments/1483217545040232493/1550307317688569897) Discu
   - [zoidsh/tenet](https://github.com/zoidsh/tenet)
   - [Kapture_2026-09-18_at_01.27.18.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550307317688569897/Kapture_2026-09-18_at_01.27.18.mp4?ex=6aae8473&is=6aad32f3&hm=27ee274f6eb926ba1307484e945cdce76a4ad138631d3f5a8221b20fb4d9934d&)
   - Source: https://github.com/zoidsh/tenet (by timche)

21. **Serious Jev demos are everywhere, so I built the opposite: an unofficial playground to see/share how he judges the**
   - Serious Jev demos are everywhere, so I built the opposite: an unofficial playground to see/share how he judges the dumb stuff. Favorite sushi topping? https://askjev.space/q/mz6v8e66?r=d Linked projects: • Favorite sushi topping? — What did Jev say? See the answer → (askjev.space/q/mz6v8e66) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550299009875443763
   - [Favorite sushi topping?](https://askjev.space/q/mz6v8e66?r=d)
   - Source: https://askjev.space/q/mz6v8e66?r=d (by ku-suke)

22. **Built Jev answers yes, no, or it depends.**
   - Built https://www.askjev.ai/ Jev answers yes, no, or it depends. It judges each ask in about 100 milliseconds: yes, no, or it depends, plus mood, topic, and whether it fits the wall. Up to a million times. Linked projects: • Ask Jev anything. Up to a million times. — Three to fifteen words. Jev, TypeSafe (askjev.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550280695468003429
   - [Ask Jev anything. Up to a million times.](https://www.askjev.ai/)
   - Source: https://www.askjev.ai/ (by Wayne)

23. **Excited to enter Jev into my Civ 6 benchmark :blob_aww: Has anyone else tested out strategic reasoning yet?**
   - Excited to enter Jev into my Civ 6 benchmark :blob_aww: https://civ6-mcp.lwilko.com/ Has anyone else tested out strategic reasoning yet? Linked projects: • civ6-mcp — An MCP environment for evaluating LLM agents in Civilization VI (civ6-mcp.lwilko.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550278538199044159
   - [civ6-mcp](https://civ6-mcp.lwilko.com/)
   - Source: https://civ6-mcp.lwilko.com/ (by Magykman (Liam))

24. **I asked Astra to one shot an A/B comparison of Jev against our password manager field classifier.**
   - I asked Astra to one shot an A/B comparison of Jev against our password manager field classifier. Jev gets sanitized HTML and ~60 potential classification options. 564 pages. 4,831 scored controls. Every fixture included. Average per-page score: → Our heuristics: 74.3% → Jev: 96.6% Median API Response time: 200ms. Test was ~10MM tokens at ~$0.40. Five years of hand crafting rules vs chucking shit into Jev... Damn. https://x.com/abhijay_cloaked/status/2100689866279252270?s=20 Linked projects: • Post by @abhijay_cloaked — @typesafeai Jev is going to make Chrome Extensions a lot smarter One of the hardest parts of building a password manager: every site builds its forms differently. Weird labels, custom controls, shadow DOM, card fields tu (x.com/abhijay_cloaked/status/2100689866279252270) • Post by @abhijay_cloaked — @typesafeai Jev is going to make Chrome Extensions a lot smarter One of t
   - [Post by @abhijay_cloaked](https://x.com/abhijay_cloaked/status/2100689866279252270?s=20)
   - Source: https://x.com/abhijay_cloaked/status/2100689866279252270?s=20 (by Yajihba)

25. **Shared by Pablo Egido: jev-pr-judge.vercel.app**
   - https://jev-pr-judge.vercel.app/ https://jev-nu.vercel.app 😬 Linked projects: • PR Judge — Typed verdicts on pull requests with TypeSafe System One. (jev-pr-judge.vercel.app) • Startup Idea Validator — Type a startup idea and watch eight calibrated judgments from Jev update while you write. (jev-nu.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550235403372462173
   - [PR Judge](https://jev-pr-judge.vercel.app/)
   - [Startup Idea Validator](https://jev-nu.vercel.app)
   - Source: https://jev-pr-judge.vercel.app/ (by Pablo Egido)

26. **Got a bit obsessed with the space and built decisionmodels.ai tonight.**
   - Got a bit obsessed with the space and built decisionmodels.ai tonight. It’s an independent field guide to the broader decision-model ecosystem: Jev, open implementations, lineage, benchmarks, and what people are already building. I’ve tried to be careful about separating vendor claims from reproduced results, and about showing the work that predates Jev too. Would love corrections, missing projects, or things I should add: https://decisionmodels.ai Linked projects: • Decision Models — What They Are and Who Is Building Them — Decision models return typed, bounded, probabilistic choices instead of generated text. A vendor-neutral field guide to the category. (decisionmodels.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550201182452973700
   - [Decision Models — What They Are and Who Is Building Them](https://decisionmodels.ai)
   - Source: https://decisionmodels.ai (by sahil)

27. **Models are getting smarter.**
   - Models are getting smarter. I care about what they’re allowed to do next. I’m building Nika, an open-source governed runtime for AI workflows. You describe a workflow in .nika.yaml, Nika checks what it’s allowed to do before execution, runs models/tools/agents, can stop for human approval, and keeps Proof of what actually happened. Intent → Check → Run → Proof What I want to explore with Jev is: Jev → typed probabilistic evidence → deterministic policy → authority → action / human → Proof So Jev can make thousands of cheap bounded decisions, while Nika keeps control over what those decisions can actually trigger. Long term: Jev for decisions, Claude/GPT for reasoning, agents for open-ended work, deterministic code for effects. Same workflow and authority model around all of them. I’m building the Jev integration + a benchmark against normal LLM structured outputs. OSS: https://github.com
   - [supernovae-st/nika](https://github.com/supernovae-st/nika)
   - [IMG_9720.gif](https://cdn.discordapp.com/attachments/1483217545040232493/1550194971028496394/IMG_9720.gif?ex=6aaec492&is=6aad7312&hm=761fb25fdd70983ef7c8a873dbba571da92a6d2d296809f07d9d8f295e040d96&)
   - Source: https://github.com/supernovae-st/nika (by Thibaut)

28. **Who said you can’t generate stuff with typesafe figured out a way to generate flow charts using ONLY typesafe and no**
   - Who said you can’t generate stuff with typesafe figured out a way to generate flow charts using ONLY typesafe and no generative llm still in progress but def has some promise for file retrieval in coding agents https://s1s.iar.dev/ Linked projects: • System One Search — Find the code. See how it connects. — Ask a codebase a question. Find the files and follow real source references with System One Search. (s1s.iar.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550194206994071626
   - [System One Search — Find the code. See how it connects.](https://s1s.iar.dev/)
   - Source: https://s1s.iar.dev/ (by IAmRoot)

29. **working on a project to have jev as a lemma selector in a proof search task when scored against a BM25 heuristic.**
   - working on a project to have jev as a lemma selector in a proof search task when scored against a BM25 heuristic. It's not winning by speed, but as proofs get more complicated i expect that to change because more accurate earlier choices will prune the tree more rapidly Linked projects: • image.png — image/png · 215 KB (cdn.discordapp.com/attachments/1483217545040232493/1550189235095601182)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550189235095601182/image.png?ex=6aaebf3a&is=6aad6dba&hm=2fa120ef19212c597857fc475d768838186f7d1e5f2489726b898d02c9196353&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550189236265816184 (by Azure)

30. **I want to use Jev as a high-throughput security triage layer for bug bounty / vuln research — scoring thousands of**
   - I want to use Jev as a high-throughput security triage layer for bug bounty / vuln research — scoring thousands of code paths and hypotheses for attacker control, trust-boundary crossing, duplicate risk, evidence quality, and whether they’re worth escalating to the more classic and expensive LLM reasoning agents like Claude or Daybreak Blue I already have a small eval set from real security research with PROMOTE / HOLD / KILL outcomes, so I’d love to benchmark Jev on whether it can rank the same cases correctly.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550186152194080790 (by no meaning)

31. **Just got access to Jev and integrated it into our AI try-on app!**
   - Just got access to Jev and integrated it into our AI try-on app! It helps find matching pieces to complete an outfit - our first live test returned styling decisions in ~420 ms. Try it here: https://tryon.everyframe.studio/ Linked projects: • Everyframe Try-on — Your next look. In motion. — Upload your photo, discover real clothing, and preview your outfit in an AI try-on video. (tryon.everyframe.studio) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550172308696604793
   - [Everyframe Try-on — Your next look. In motion.](https://tryon.everyframe.studio/)
   - Source: https://tryon.everyframe.studio/ (by jaxvin)

32. **Built something with Jev and wanted to share it here.**
   - Built something with Jev and wanted to share it here. Ever faced this issue that your AI Coding agent fixed and issue, raised a PR but somehow later the same issue is reproducible? You agent adds more tests, write more code yet the issue doesnt resolve properly. I built a github app to fix this situation itself. Its lightning fast(better than other code review tools iykyk). Full intro video here: https://x.com/itsayush__/status/2100600179615518918?s=20 <@1483209038886998066> Linked projects: • Post by @itsayush__ — AI coding agents just got caught lacking! Built Greenwash, a GitHub app that catches AI coding agents pass the CI checks silently. This tool reviews the PR lightning fast! ⚡️ Built with Jev, the model from @typesafeai. H (x.com/itsayush__/status/2100600179615518918) • Post by @itsayush__ — AI coding agents just got caught lacking! Built Greenwash, a GitHub app that catches AI 
   - [Post by @itsayush__](https://x.com/itsayush__/status/2100600179615518918?s=20)
   - Source: https://x.com/itsayush__/status/2100600179615518918?s=20 (by Ayush)

33. **I just got access to this model and couldn't wait to try out something today.**
   - I just got access to this model and couldn't wait to try out something today. As a personal project, I've been building an experience point rating bot for discord. Most work off of numbers of posts or timeframes, but I've been working on my own classification model using KNN and a Hugging Face text analyzer. I did a preliminary test in Jev with some sample data. It didn't take me long, was able to use plain english, and it did pretty darn well out of the box. Well done. I'm going to experiment more, but if you want my very first attempt, here is what I put: ``` { "level_of_post": { "type": "choice", "instructions": "How good is this post from discord `text`", "criteria": { "Very Detailed": "The post contains a lot of description as well as some dialog. It advances the story in a significant way and includes descriptors about the environment and possibly internal dialog or debate.", "Some
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550169131872030741 (by Scott O’Bryan)

34. **Tested on one of our ugc classification agents.**
   - Tested on one of our ugc classification agents. 1st run showed the potential but also showed all the ways we were ambiguous in our prompt and just trusting llm decision making, after one iteration of the prompt the eval beat Luna by quite some margin Linked projects: • 9055AE59-3D4C-4589-89D8-C5DF9D1FE085.png — image/png · 892 KB (cdn.discordapp.com/attachments/1483217545040232493/1550155116953477263) • 9FB2EF1E-B9FB-4BB1-8D31-BF5EF51161C1.png — image/png · 410 KB (cdn.discordapp.com/attachments/1483217545040232493/1550155117335019592)
   - [9055AE59-3D4C-4589-89D8-C5DF9D1FE085.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550155116953477263/9055AE59-3D4C-4589-89D8-C5DF9D1FE085.png?ex=6aae9f74&is=6aad4df4&hm=c72c846cf33a362b21dfb425ef7bd5f6284149886b09995e09d201634361ff52&)
   - [9FB2EF1E-B9FB-4BB1-8D31-BF5EF51161C1.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550155117335019592/9FB2EF1E-B9FB-4BB1-8D31-BF5EF51161C1.png?ex=6aae9f74&is=6aad4df4&hm=42a90ff400c229f4ad82a50a908255a305ec4a4e42e8c3a7f6257681bb4d09ef&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550155117649596528 (by Martucci)

35. **Tested Jev with main "Players" (GPT/Claude) to work together.**
   - Tested Jev with main "Players" (GPT/Claude) to work together. The idea was to "cut" the part of the job from generative agents. Speed is awesome (cost too), and some results are quite promising: https://github.com/dnikolayev/typesafe-offload-bench Results/Details: https://github.com/dnikolayev/typesafe-offload-bench/blob/main/RESULTS.md Linked projects: • dnikolayev/typesafe-offload-bench — Synthetic TypeSafe offload benchmark: quality, tokens, latency, dated evidence, and a portable Codex skill. - dnikolayev/typesafe-offload-bench (github.com/dnikolayev/typesafe-offload-bench) • dnikolayev/typesafe-offload-bench — Synthetic TypeSafe offload benchmark: quality, tokens, latency, dated evidence, and a portable Codex skill. - dnikolayev/typesafe-offload-bench (github.com/dnikolayev/typesafe-offload-bench/blob/main/RESULTS.md) Discussion: https://discord.com/channels/1483217544214085663/1483
   - [dnikolayev/typesafe-offload-bench](https://github.com/dnikolayev/typesafe-offload-bench)
   - [dnikolayev/typesafe-offload-bench](https://github.com/dnikolayev/typesafe-offload-bench/blob/main/RESULTS.md)
   - Source: https://github.com/dnikolayev/typesafe-offload-bench (by Dmytro)

36. **Full .NET SDK. Includes strongly typed input/output builders and out of the box support for `Microsoft.Extensions.AI`**
   - https://github.com/Hawxy/TypeSafeAI.Net Full .NET SDK. Includes strongly typed input/output builders and out of the box support for `Microsoft.Extensions.AI` with guardrail, routing and evaluation patterns included. Linked projects: • Hawxy/TypeSafeAI.Net — .NET SDK for the TypeSafe AI platform. Contribute to Hawxy/TypeSafeAI.Net development by creating an account on GitHub. (github.com/Hawxy/TypeSafeAI.Net) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550152191040421928
   - [Hawxy/TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net)
   - Source: https://github.com/Hawxy/TypeSafeAI.Net (by Hawx)

37. **Double barrel ReACT agent architecture: LLM does the writing.**
   - https://github.com/jvsteiner/jevex Double barrel ReACT agent architecture: LLM does the writing. Jev does all the deciding. Tool call decisions and agent loop state are all decided by Jev. LLM writes user output, and tool inputs, where needed. Included real-world benchmarks against basic ReACT agent architecture. The strongest successful comparison showed: - 77% fewer LLM input tokens with Jev. - 17% fewer uncached input tokens—caching matters. - Two LLM calls instead of five. Linked projects: • jvsteiner/jevex — Contribute to jvsteiner/jevex development by creating an account on GitHub. (github.com/jvsteiner/jevex) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550134291500114032
   - [jvsteiner/jevex](https://github.com/jvsteiner/jevex)
   - Source: https://github.com/jvsteiner/jevex (by domoarrigato)

38. **hmmm, with how fast Jev is, would be interesting piping earnings into it, seems pretty accurate in very limited testing**
   - hmmm, with how fast Jev is, would be interesting piping earnings into it, seems pretty accurate in very limited testing Linked projects: • image.png — image/png · 46 KB (cdn.discordapp.com/attachments/1483217545040232493/1550114067828707458) • image.png — image/png · 28 KB (cdn.discordapp.com/attachments/1483217545040232493/1550114068332019752)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550114067828707458/image.png?ex=6aae7939&is=6aad27b9&hm=87642e07d85d9c66d0c2ee61a1b7ccc6f7d33c5305ca6aa6544cb25b0447752b&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550114068332019752/image.png?ex=6aae7939&is=6aad27b9&hm=e36abb47002d449dad75bf7558f451a04039bbd9e2a8b89fda28a94f5bce07c4&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550114068730347542 (by slices)

39. **> How do you guys think I could use Jev in this process?**
   - > How do you guys think I could use Jev in this process? That;s something you need to figureout... I can give you a tip, like when you have a bunch of text input, or an LLM output that you consume in making the decisions you can intercept it with Jev and evaluate to find if the given input to Jev is appropriate to move forward in your workflow.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550095814376820789 (by Singularity 1.61)

40. **Tested it on my memory system for my bot.**
   - Tested it on my memory system for my bot. The results are amazing. Linked projects: • Screenshot_2026-09-17-09-04-18-532_org.connectbot-edit.jpg — image/jpeg · 116 KB (cdn.discordapp.com/attachments/1483217545040232493/1550041145877205024)
   - [Screenshot_2026-09-17-09-04-18-532_org.connectbot-edit.jpg](https://cdn.discordapp.com/attachments/1483217545040232493/1550041145877205024/Screenshot_2026-09-17-09-04-18-532_org.connectbot-edit.jpg?ex=6aaede0f&is=6aad8c8f&hm=5b52ac02ca17feaf2db8c614f75f281326bb142c981ed93b53af6e4ea4765663&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550041146213007480 (by Henke)

41. **i benchmarked it on an internal classifier, its getting eerily close (and cheaper!!) to beating fine-tuned qwen 9b**
   - https://x.com/identityTorn/status/2100475121324728615?s=20 i benchmarked it on an internal classifier, its getting eerily close (and cheaper!!) to beating fine-tuned qwen 9b Linked projects: • Post by @identityTorn — was pumped to get early access to @typesafe_ai's Jev, pointed it at an internal benchmark Jev zero-shot was within ~5 pts of recall of our fine-tune at matched precision. cost-wise its roughly ~$70/mo for our full volume (x.com/identityTorn/status/2100475121324728615) • Post by @identityTorn — was pumped to get early access to @typesafe_ai's Jev, pointed it at an internal benchmark Jev zero-shot was within ~5 pts of recall of our fine-tune at matched precision. cost-wise its roughly ~$70/mo for our full volume (twitter.com/identityTorn/status/2100475121324728615) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550034599181295698
   - [Post by @identityTorn](https://x.com/identityTorn/status/2100475121324728615?s=20)
   - Source: https://x.com/identityTorn/status/2100475121324728615?s=20 (by identity)

42. **Yeah I think with JEV we get speed, quality, and cost.**
   - Yeah I think with JEV we get speed, quality, and cost. Where with LLMs we have to pick 2/3. Video of benchmark with side by side of qwen: https://x.com/iamMrDuncan/status/2100467548298899918 Linked projects: • Post by @iamMrDuncan — Built an alternative version of @typesafeai but on @cerebras with Qwen 3.8 27b. Similar quality, similar performance, but vastly different cost. TypeSafe was way cheaper, and did beat Qwen on performance. Closest we can (x.com/iamMrDuncan/status/2100467548298899918) • Post by @iamMrDuncan — Built an alternative version of @typesafeai but on @cerebras with Qwen 3.8 27b. Similar quality, similar performance, but vastly different cost. TypeSafe was way cheaper, and did beat Qwen on performance. Closest we can (twitter.com/iamMrDuncan/status/2100467548298899918) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550031246355341362
   - [Post by @iamMrDuncan](https://x.com/iamMrDuncan/status/2100467548298899918)
   - Source: https://x.com/iamMrDuncan/status/2100467548298899918 (by IamMrDuncan)

43. **I built a TypeSafe alternative but with Qwen 3.8 27b on Cerebras.**
   - I built a TypeSafe alternative but with Qwen 3.8 27b on Cerebras. Similar quality, Similar speed, but TypeSafe is way way cheaper. https://github.com/iammrduncan/typesafe-ai-benchmark Linked projects: • iammrduncan/typesafe-ai-benchmark — This is a LLM Gateway that mimics typesafe ai structured output. Like an imposter Jev. - iammrduncan/typesafe-ai-benchmark (github.com/iammrduncan/typesafe-ai-benchmark) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550025526209683556
   - [iammrduncan/typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark)
   - Source: https://github.com/iammrduncan/typesafe-ai-benchmark (by IamMrDuncan)

44. **I feel like devs should have spent a bit more time preparing the model before even starting closed test, jev struggles**
   - I feel like devs should have spent a bit more time preparing the model before even starting closed test, jev struggles to understand that the claim is false when it reads like an estabilished one. Struggles to pass a lot of my other benchmarks too - like comparing two numbers or counting how many letters in the word. Either devs didnt run it through the benchmarks or the model is just quite average.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550018780518686721 (by thodoh)

45. **I'm building a real-time AI application and I'm interested in using Jev as a lightweight decision layer for intent**
   - I'm building a real-time AI application and I'm interested in using Jev as a lightweight decision layer for intent routing, action selection, confidence-based escalation, and deciding when a larger LLM call is actually necessary. The goal is to make frequent real-time decisions quickly and cheaply while only calling larger models when needed. I'd love to test how well Jev fits this kind of architecture.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550010628763160677 (by ikamilk)

46. **Introducing: Jev-Browser Continuous runner and multi-tab adapter tested for codex - haven't tested for other IDEs you**
   - Introducing: Jev-Browser https://github.com/vlad-terin/jev-browser Continuous runner and multi-tab adapter tested for codex - haven't tested for other IDEs you need to have TYPESAFE_API_KEY obviously to use our friend JEFF Hopefully it works for other codex implementations with 0 degradation, with my limited testing it's working pretty good so far. let me know guys if it works! Linked projects: • browser-use/jev-ultrafast — Possible match for moved/deleted link vlad-terin/jev-browser — i. am. speed. (5166★) (github.com/vlad-terin/jev-browser) • recording-discord.mp4 — video/mp4 · 95 MB (cdn.discordapp.com/attachments/1483217545040232493/1550006747312160928) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550006752152653865
   - [browser-use/jev-ultrafast](https://github.com/vlad-terin/jev-browser)
   - [recording-discord.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550006747312160928/recording-discord.mp4?ex=6aaebe06&is=6aad6c86&hm=38dd23686ec0c26ff540b6f069ec43d5378d84d591d27240c07c40f8e6fe5aa2&)
   - Source: https://github.com/vlad-terin/jev-browser (by BlissF00l)

47. **Finally got access, I made a quick comparison between Cerebras GPT-OSS-120B and Jev -**
   - Finally got access, I made a quick comparison between Cerebras GPT-OSS-120B and Jev - https://github.com/nola-lang/nola-typesafe-test Linked projects: • nola-lang/nola-typesafe-test — Contribute to nola-lang/nola-typesafe-test development by creating an account on GitHub. (github.com/nola-lang/nola-typesafe-test) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550003452350963803
   - [nola-lang/nola-typesafe-test](https://github.com/nola-lang/nola-typesafe-test)
   - Source: https://github.com/nola-lang/nola-typesafe-test (by Evgen Mykhailenko)

48. **Nice, did you do anything regarding scoped subagents etc?**
   - Nice, did you do anything regarding scoped subagents etc? I was thinking of extending intent drift to orchestrator assigned intent, human intent + agent role. Also I'm adding an intent field to all my tool calls to let the agent declare its own intent and use that to judge if it aligns with user/session intent and actual tool call
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549998934385238039 (by Shrub)

49. **i've been using something i built since yesterday morning up to now.**
   - i've been using something i built since yesterday morning up to now. it gives my coding agent a conscience, every action gets judged by jev in 250ms and it steers the agent accordingly so far i think jev is amazing to use together with LLMs 🤔 did anyone else built something similar im curious i wanna see other approaches https://github.com/DevMortimer/pi-warden Linked projects: • DevMortimer/pi-warden — Guardrails for Pi built on pi-typesafe that steer the agent instead of interrupting you: Jev judges irreversible and off-task tool calls, detects stuck loops, checks unverified done claims, flags s... (github.com/DevMortimer/pi-warden) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549980892066357330
   - [DevMortimer/pi-warden](https://github.com/DevMortimer/pi-warden)
   - Source: https://github.com/DevMortimer/pi-warden (by devmortimer24)

50. **posted the article, thanks for the ok.**
   - <@81830765507117056> posted the article, thanks for the ok. jev vs cohere rerank 4 pro and zerank-2 on 8 datasets, plus negation tests: https://anessbelbati.com/blog/i-gave-jev-a-rerankers-job Linked projects: • I gave Jev a reranker's job. — Jev, Cohere, ZeroEntropy and a small Qwen model, reranking the same search results. (anessbelbati.com/blog/i-gave-jev-a-rerankers-job) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549958123043954718
   - [I gave Jev a reranker&#x27;s job.](https://anessbelbati.com/blog/i-gave-jev-a-rerankers-job)
   - Source: https://anessbelbati.com/blog/i-gave-jev-a-rerankers-job (by nss)

51. **Did some testing on sentiment analysis on gmaps reviews, jev is 227x cheaper and as accurate as opus 5 medium !**
   - https://x.com/aaiach01/status/2100396887207776380 Did some testing on sentiment analysis on gmaps reviews, jev is 227x cheaper and as accurate as opus 5 medium ! <@638223584396967937> Linked projects: • Post by @aaiach01 — Jev is as good as Opus 5 for guessing stars on google maps reviews (x.com/aaiach01/status/2100396887207776380) • Post by @aaiach01 — Jev is as good as Opus 5 for guessing stars on google maps reviews (twitter.com/aaiach01/status/2100396887207776380) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549955902453452990
   - [Post by @aaiach01](https://x.com/aaiach01/status/2100396887207776380)
   - Source: https://x.com/aaiach01/status/2100396887207776380 (by aaiach)

52. **Yeah, those handoffs are exactly where I’d experiment.**
   - Yeah, those handoffs are exactly where I’d experiment. Give Jev a narrow question with explicit criteria, then let code decide whether to advance, retry, or escalate. Keep tests as hard gates. Which handoff burns the most retries in your setup? I built a tool that handles calls to automated phone systems that our staff would otherwise make manually. I’m adding Jev at the decision points to evaluate the call state against explicit criteria, with code controlling what happens next. That’s where I’m testing whether I can cut down on repeated LLM calls.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549951856896381010 (by blake)

53. **I’ve been paying too much for repeated LLM calls, using retries and checks to make inconsistent outputs usable.**
   - I’ve been paying too much for repeated LLM calls, using retries and checks to make inconsistent outputs usable. Now I’m building what I call Jev Gates... before an LLM-driven workflow takes a critical action, Jev evaluates specific decision criteria. Code applies the thresholds and hard checks; uncertain cases go to review. Fewer blind retries. Explicit gates before action. Deploying across our stack.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549950753525997629 (by blake)

54. **classification is quick and useful on first test, excited to see other use cases, got many ideas**
   - classification is quick and useful on first test, excited to see other use cases, got many ideas Linked projects: • Screenshot_2026-09-17_at_10.55.47_am.png — image/png · 419 KB (cdn.discordapp.com/attachments/1483217545040232493/1549947079638655077)
   - [Screenshot_2026-09-17_at_10.55.47_am.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549947079638655077/Screenshot_2026-09-17_at_10.55.47_am.png?ex=6aae8674&is=6aad34f4&hm=c651da3d35ac51b7af95648e868608841ef023b8487a51281928996071d8c3cd&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549947079969738884 (by Philip)

55. **Just runned Jev for the first time under a Minecraft playground, we played Russian roulette together, so I can**
   - Just runned Jev for the first time under a Minecraft playground, we played Russian roulette together, so I can benchmark his reasoning. With good and clear instructions, he really have an human-like reasoning, and I was really impressed by his decisions, since me and my friend could barely beat him. Amazing!
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549942733139877943 (by NotRyzn.)

56. **I've just updated Nola to support the TypeSafe API natively, integration came together pretty well, but I haven't been**
   - I've just updated Nola to support the TypeSafe API natively, integration came together pretty well, but I haven't been able to run it yet because I'm waiting for test access from the Typesafe team. If anyone can try it out and tell me how it feels, I'd really appreciate it. `npm create nola@latest` Linked projects: • image.png — image/png · 54 KB (cdn.discordapp.com/attachments/1483217545040232493/1549920172486426756)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549920172486426756/image.png?ex=6aae6d65&is=6aad1be5&hm=be127d06935235c6c4da1ad60d13283671aec2eb6e748ead6088d5533d77b362&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549920172876505148 (by Evgen Mykhailenko)

57. **Rust wrapper for systemone api.**
   - Rust wrapper for systemone api. Type safe responses, async native and ships with fakes for testing integrations without API access: https://crates.io/crates/typesafe-client Linked projects: • crates.io: Rust Package Registry — crates.io serves as a central registry for sharing crates, which are packages or libraries written in Rust that you can use to enhance your projects (crates.io/crates/typesafe-client) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549898426924269718
   - [crates.io: Rust Package Registry](https://crates.io/crates/typesafe-client)
   - Source: https://crates.io/crates/typesafe-client (by JedimEmO)

58. **I just published my second open-source project: typesafe-ai-rails, a community Ruby on Rails integration for TypeSafe**
   - I just published my second open-source project: typesafe-ai-rails, a community Ruby on Rails integration for TypeSafe AI’s System One API. 😃 System One now has a proper Rails wrapper. The gem adds: • Rails-native configuration • helpers for Noul, Choice and Score questions • persistence-backed confidence policies • fail-closed handling for missing or low-confidence decisions • usage, latency, request-ID and cost telemetry • model-aware pricing • direct access to the underlying TypeSafe Ruby SDK when the wrapper shouldn’t get in the way One subtle part was getting the confidence semantics right: Noul returns a probability, while Choice and Score expose confidence separately. The gem deliberately keeps that distinction instead of pretending all three primitives behave the same way. It’s tested against the real TypeSafe API, including live Noul / Choice / Score responses, and published thr
   - [GenieRobot/typesafe-ai-rails](https://github.com/GenieRobot/typesafe-ai-rails)
   - [typesafe-ai-rails | RubyGems.org | your community gem host](https://rubygems.org/gems/typesafe-ai-rails)
   - Source: https://github.com/GenieRobot/typesafe-ai-rails (by GenieRobot)

59. **Let me know what you guys think.**
   - Let me know what you guys think. I tested with many calls, thousands. It works really well. https://github.com/blakestone-x/jev-mcp Linked projects: • blakestone-x/jev-mcp — MCP server for TypeSafe Jev: typed classify, score, check, match and screen for any agent, with confidence on every answer - blakestone-x/jev-mcp (github.com/blakestone-x/jev-mcp) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549838493738336368
   - [blakestone-x/jev-mcp](https://github.com/blakestone-x/jev-mcp)
   - Source: https://github.com/blakestone-x/jev-mcp (by blake)

60. **the base idea is kinda fun, imo it has high potentials (still a test)**
   - the base idea is kinda fun, imo it has high potentials (still a test) Linked projects: • compressO-Screen_Recording_2026-09-16_201131.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1549823055700828255)
   - [compressO-Screen_Recording_2026-09-16_201131.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549823055700828255/compressO-Screen_Recording_2026-09-16_201131.mp4?ex=6aaebbb2&is=6aad6a32&hm=411eb16a10fdafa916376c293e18037d956e2e6135144e5d101f90456fdf8643&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549823055751290953 (by BlackSnowDot)

61. **terminal seatbelt on Jev — judges shell commands before Enter, ~$0.000001/check, blocks past 85% confidence**
   - terminal seatbelt on Jev — judges shell commands before Enter, ~$0.000001/check, blocks past 85% confidence https://github.com/rodriveiga01/second-thought Linked projects: • rodriveiga01/second-thought — Terminal seatbelt: judges shell commands before they run (allow/warn/block) via calibrated AI judgment - rodriveiga01/second-thought (github.com/rodriveiga01/second-thought) • all-five.gif — image/gif · 239 KB (cdn.discordapp.com/attachments/1483217545040232493/1549808025974345860) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549808026364551279
   - [rodriveiga01/second-thought](https://github.com/rodriveiga01/second-thought)
   - [all-five.gif](https://cdn.discordapp.com/attachments/1483217545040232493/1549808025974345860/all-five.gif?ex=6aaeadb3&is=6aad5c33&hm=348073495dbcb9def7f8ca307a3c241fd1197e1e2850e07dc78ebea39c6df0dd&)
   - Source: https://github.com/rodriveiga01/second-thought (by rodriveiga)

62. **Hey all, working on codebase search CLI using Jev.**
   - Hey all, working on codebase search CLI using Jev. Anyone got an API key want to test it out with me? https://github.com/ellipsis-dev/blink Linked projects: • ellipsis-dev/blink — Codebase search powered by Jev from @typesafe-ai. Contribute to ellipsis-dev/blink development by creating an account on GitHub. (github.com/ellipsis-dev/blink) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549798439506808832
   - [ellipsis-dev/blink](https://github.com/ellipsis-dev/blink)
   - Source: https://github.com/ellipsis-dev/blink (by HunterB)

63. **Hey all, would love to have access for a test on we're building realtime tutoring capability and Jev would help making**
   - Hey all, would love to have access for a test on https://app.sophie-tutor.ai/ we're building realtime tutoring capability and Jev would help making the experience much smoother! Linked projects: • Sophie: the math tutor that gets you — The tutor that keeps your child in the driver (app.sophie-tutor.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549794960730095628
   - [Sophie: the math tutor that gets you](https://app.sophie-tutor.ai/)
   - Source: https://app.sophie-tutor.ai/ (by Anat)

64. **hmmm i do speak french but never dabbled with ais in french lmao so can't say confidently that a model woudl be good**
   - hmmm i do speak french but never dabbled with ais in french lmao so can't say confidently that a model woudl be good in it tbh but worth trying ds4.1 vflash in my experience it does hold decently when it comes to schema enforcement. Would also maybe take an evening and benchmark it againt gemini flash and mistral modles (not the smartest ones lmao but surprisingly usable from my own experience and maybe less of a hassle for EU regulations) 5.6 luna can also be a really strong contender and all of them are noticeably cheaper than sonnet and much smarter and reliable than haiku would test Jev with french content to see if it's as good as in english but can be extremely useful in verdicts or check if something in the course and stuff (this part would need more work since coontext limit is like 32k but toally doable) and also maybe grading triage and escalate for unsure ones
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549785941860815070 (by nss)

65. **Sharing what I'm building: ZIFFER, a deterministic authorization layer for AI agents.**
   - Sharing what I'm building: ZIFFER, a deterministic authorization layer for AI agents. The model proposes an action, ZIFFER decides at the tool-execution boundary. Policy-as-code in git, signed decisions, full audit trail. Model-agnostic, so it sits next to any LLM, including Jev once I'm off the waitlist. Repo: https://github.com/yacine-kellib/agent-control-plane (Apache-2.0, open spec, Dafny-verified invariants, 20k-case test harness) Hosted version: https://ziffer.io Curious how typed System One outputs pair with an external policy check. Feedback and holes welcome. Linked projects: • yacine-kellib/agent-control-plane — A credential is not authorisation. ACP moves the authorise/refuse decision for AI agent actions outside the model, where prompt injection cannot reach it. Specification, Dafny proofs, and a referen... (github.com/yacine-kellib/agent-control-plane) • ZIFFER: agent author
   - [yacine-kellib/agent-control-plane](https://github.com/yacine-kellib/agent-control-plane)
   - [ZIFFER: agent authorization. An injected agent can’t act.](https://ziffer.io)
   - Source: https://github.com/yacine-kellib/agent-control-plane (by Yacine "ZIFFER")

66. **I'm building Gorgona: An open source guardrail engine that turns runaway AI agents to stone (zero dependencies)**
   - I'm building Gorgona: An open source guardrail engine that turns runaway AI agents to stone (zero dependencies) Running autonomous coding and marketing agents as a solo founder sounds great until you wake up to an empty API balance, an agent stuck in a 50-step loop, or credentials dumped into a public directory. I built Gorgona to solve my own paranoia: - 100% Python standard library (no bloated packages, runs in milliseconds). - Halts execution immediately on hard violations: leaked keys, cross-project context leaks, recursive loops. - Mechanical linting against AI slop and synthetic writing markers. Repo: https://github.com/adrianpeticila/gorgona It's MIT licensed, fully tested, and ready to use in CI or local agent scripts. Any feedback or brutal critique is welcome. Linked projects: • adrianpeticila/gorgona — Turn runaway AI agents to stone. The deterministic guardrail engine, model 
   - [adrianpeticila/gorgona](https://github.com/adrianpeticila/gorgona)
   - Source: https://github.com/adrianpeticila/gorgona (by Adrian M. Peticila 🟡)

67. **Hi everyone! I'm Paulo R. Lima from Brazil. I'm building Arandu, an open-source full-stack framework written in Go**
   - Hi everyone! I'm Paulo R. Lima from Brazil. I'm building Arandu, an open-source full-stack framework written in Go for building SaaS, APIs, and digital products. Arandu has grown into a fairly large ecosystem with typed UI components, real-time communication, infrastructure abstractions, CLI tooling, security rules, MCP integrations, and AI-assisted development workflows. I'm particularly interested in trying Jev as a decision layer inside our development tooling — especially for code analysis, validation, architectural decisions, and agent workflows where using a full LLM for every decision can be unnecessarily expensive and slow. I'd also like to experiment with Jev alongside our MCP and agent tooling to see where a fast decision model can replace or complement traditional LLM calls. Arandu: https://arandu.io GitHub: https://github.com/arandu-io Looking forward to testing it on a real 
   - [Arandu :: Framework Go para aplicações web e APIs](https://arandu.io)
   - [https://github.com/arandu-io](https://github.com/arandu-io)
   - Source: https://arandu.io (by Paulo R. Lima)

68. **We’re building Social-Ex-Machina, a production orchestration system for AI media.**
   - We’re building Social-Ex-Machina, a production orchestration system for AI media. We have three decision router, workflow, creative method, and provider routing, plus quality escalation and cost governance. Jev looks almost purpose built for replacing cheap generative-router calls with typed probabilistic decisions. We’d love to benchmark it against Qwen/OpenAI/Claude on real routing and QC workloads.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549734435367288843 (by Soul)

69. **building which is a talent sourcing toolkit that runs inside Claude, ChatGPT, or any other AI assistant.**
   - building https://sengi.ai/ which is a talent sourcing toolkit that runs inside Claude, ChatGPT, or any other AI assistant. It searches LinkedIn and the wider web, turns messy public profiles into structured evidence, screens candidates against a hiring brief, and gives recruiters a ranked longlist with Strong, Partial, and No fit categories. I want to test Jev for typed per-requirement judgments, relevance scoring, and confidence-based routing. I’d compare it with OSS models I have under the hood there now on identical synthetic or approved data and I already have evals for measuring recall, precision/F1, calibration, latency, cost, and evidence quality, so super-excited to get an access! Linked projects: • sengi.ai | Verified Candidates for Hard-to-Fill Roles inside of your Claude or ChatGPT — Source verified candidates for hard-to-fill roles. Sengi searches LinkedIn, GitHub, and the op
   - [sengi.ai | Verified Candidates for Hard-to-Fill Roles inside of your Claude or ChatGPT](https://sengi.ai/)
   - Source: https://sengi.ai/ (by Viktor)

70. **Im building [[byom.co ]( )and ]( ) hits some blockers on handoff, had to make vm watches for so many edge cases, we**
   - Im building [[byom.co ](https://byom.co/)and ](https://byom.co/) hits some blockers on handoff, had to make vm watches for so many edge cases, we are 4 weeks from pilot with some huge brands (like $1b+) - i have been developing a tech that we call rails it works like this, its take 10 months of testing. Linked projects: • BYOM | Something incredible is on its way — One AI operator for your entire commerce stack. Join the waitlist. (byom.co) • image.png — image/png · 390 KB (cdn.discordapp.com/attachments/1483217545040232493/1549708951166259200) • image.png — image/png · 530 KB (cdn.discordapp.com/attachments/1483217545040232493/1549708951623442442) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549708951644545058
   - [BYOM | Something incredible is on its way](https://byom.co/)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549708951166259200/image.png?ex=6aae516e&is=6aacffee&hm=929e1c2d2f538c484c11a16b632a6e18d65353a6a3a466d0d6ba558c37179d78&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549708951623442442/image.png?ex=6aae516e&is=6aacffee&hm=3aa8f3a39c0218e3372e1555b940962834ee48758a36b3c140a5bc240f89d686&)
   - [BYOM | Something incredible is on its way](https://byom.co/)and)
   - Source: https://byom.co/ (by Bourdain)

71. **I made a deliberately tiny, dependency-free Jev test showing state, typed questions, and probabilities.**
   - I made a deliberately tiny, dependency-free Jev test showing state, typed questions, and probabilities. Sharing in case a minimal example helps anyone get the mental model: https://github.com/jasondotsetHacked/jev-test-1 Linked projects: • jasondotsetHacked/jev-test-1 — Contribute to jasondotsetHacked/jev-test-1 development by creating an account on GitHub. (github.com/jasondotsetHacked/jev-test-1) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549701024896262246
   - [jasondotsetHacked/jev-test-1](https://github.com/jasondotsetHacked/jev-test-1)
   - Source: https://github.com/jasondotsetHacked/jev-test-1 (by sethacked)

72. **im using jev as a fast judgement layer for the agent; checks each tool call (irreversible?**
   - https://pi.dev/packages/pi-warden im using jev as a fast judgement layer for the agent; checks each tool call (irreversible? off-task?), tool output (injected instructions?), and reply (is it slop?) all in ~250ms and steers the agent; early days, still needs improvements Linked projects: • Pi Coding Agent — A terminal-based coding agent (pi.dev/packages/pi-warden) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549689340576137236
   - [Pi Coding Agent](https://pi.dev/packages/pi-warden)
   - Source: https://pi.dev/packages/pi-warden (by devmortimer24)

73. **Built this with Astra while waiting for TypeSafe access: a playground with 110 examples, from trolley problems and**
   - Built this with Astra while waiting for TypeSafe access: a playground with 110 examples, from trolley problems and hot-dog debates to reasoning tests, plus a mobile-friendly UI. Run it locally with the community API key from Discord and add your own experiments: https://github.com/nickthompson480/typesafe-ai-playground Linked projects: • nickthompson480/typesafe-ai-playground — Community TypeSafe AI playground: 110 use cases, games, dilemmas and model challenges, with editable prompts, A/B comparisons and a mobile-friendly UI. - nickthompson480/typesafe-ai-playground (github.com/nickthompson480/typesafe-ai-playground) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549689278387462204
   - [nickthompson480/typesafe-ai-playground](https://github.com/nickthompson480/typesafe-ai-playground)
   - Source: https://github.com/nickthompson480/typesafe-ai-playground (by shizah5150)

74. **as anyone tried experimenting with Jev as a “cognitive layer” for AI agents: fast probabilistic checks for RAG**
   - as anyone tried experimenting with Jev as a “cognitive layer” for AI agents: fast probabilistic checks for RAG relevance, tool routing, verification and confidence, while the frontier LLM handles only deep reasoning. The goal: fewer LLM calls, lower latency, and agents that can continuously evaluate themselves.?, i wating to get off waitlist
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549675914659495957 (by omhome_16)

75. **hey all, i'm one of the founders of Flippy bot; an agent for digital assets and community rewards: Extremely excited**
   - hey all, i'm one of the founders of Flippy bot; an agent for digital assets and community rewards: https://top.gg/bot/1150448986264698980 Extremely excited to use Jev in-place of our existing routing LLM and for much more. Please let me test it soon :Flippy_Kek_2: Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549613007594586175
   - [https://top.gg/bot/1150448986264698980](https://top.gg/bot/1150448986264698980)
   - Source: https://top.gg/bot/1150448986264698980 (by thority)

76. **Been thinking about the thing I’d most like to test with Jev.**
   - Been thinking about the thing I’d most like to test with Jev. Last December I published a technical disclosure called “Coordinated, heterogeneous model composition under a shared governance and audit layer.” The basic thesis is that instead of asking one model to do everything, you can compose specialized models/tools behind a governed coordination layer with explicit routing, disagreement handling, escalation, provenance, and audit. Jev makes me wonder whether the learned judgment inside that coordination layer can become much cheaper and faster. My first experiment would be to use Jev for things like: task/domain classification model/tool routing risk and ambiguity scoring cross-model disagreement detection escalation decisions while keeping permissions, thresholds, execution, logging, and final authority in deterministic code. I’d compare that against both a frontier-LLM orchestrator 
   - [Coordinated, heterogeneous model composition under a shared governance and audit layer](https://www.tdcommons.org/dpubs_series/9043)
   - Source: https://www.tdcommons.org/dpubs_series/9043 (by Joseph)

77. **Final Testament (Lite): Final Testament (Recommended):**
   - Final Testament (Lite): https://www.mediafire.com/file/9mtij0ltcjbrbs0/The_Final_Testament_-_Spells_of_Rapture_%2528Lite%2529.zip/file Final Testament (Recommended): https://www.mediafire.com/file/rgtsgvbcaymg9rj/The_Final_Testament_-_Spells_of_RAPTURE.zip/file Linked projects: • The Final Testament - Spells of Rapture (Lite) — MediaFire is a simple to use free service that lets you put all your photos, documents, music, and video in a single place so you can access them anywhere and share them everywhere. (mediafire.com/file/9mtij0ltcjbrbs0/The_Final_Testament_-_Spells_of_Rap) • The Final Testament - Spells of RAPTURE — MediaFire is a simple to use free service that lets you put all your photos, documents, music, and video in a single place so you can access them anywhere and share them everywhere. (mediafire.com/file/rgtsgvbcaymg9rj/The_Final_Testament_-_Spells_of_RAP) Discussion: http
   - [The Final Testament - Spells of Rapture (Lite)](https://www.mediafire.com/file/9mtij0ltcjbrbs0/The_Final_Testament_-_Spells_of_Rapture_%2528Lite%2529.zip/file)
   - [The Final Testament - Spells of RAPTURE](https://www.mediafire.com/file/rgtsgvbcaymg9rj/The_Final_Testament_-_Spells_of_RAPTURE.zip/file)
   - Source: https://www.mediafire.com/file/9mtij0ltcjbrbs0/The_Final_Testament_-_Spells_of_Rapture_%2528Lite%2529.zip/file (by azlef900)

78. **⚡ Jev is HERE and it's rejecting ChatGPT's entire training playbook ♠ built by a co-creator of RLHF/ChatGPT who says**
   - ⚡ Jev is HERE and it's rejecting ChatGPT's entire training playbook ♠ built by a co-creator of RLHF/ChatGPT who says chat was the wrong bet 🔹New training method: RLCD (Reinforcement Learning for Calibrated Decisions) instead of RLHF 🔹Not chat — typed decisions with calibrated confidence scores, built for software not humans 🔹Claims: 193x faster, 444x cheaper, 0% structured-output error rate vs GPT & Claude 🔹$42 per billion input tokens — output tokens free 🔥the full breakdown below:👇 https://youtu.be/X8Outd-khS0?si=VF6cv4HOj5r3V_6- Linked projects: • Jev: The Model That Killed Chat GPT's Core Idea? RLCD Explained — This video introduces new model Jev, based on RLCD — Reinforcement Learning for Calibrated Decisions.📬Weekly AI Newsletter: https://fahdmirza.substack.com/?... (youtu.be/X8Outd-khS0) • Jev: The Model That Killed Chat GPT's Core Idea? RLCD Explained — This video introduc
   - [Jev: The Model That Killed Chat GPT&#39;s Core Idea? RLCD Explained](https://youtu.be/X8Outd-khS0?si=VF6cv4HOj5r3V_6-)
   - [Jev: The Model That Killed Chat GPT&#39;s Core Idea? RLCD Explained](https://www.youtube.com/watch?v=X8Outd-khS0)
   - Source: https://youtu.be/X8Outd-khS0?si=VF6cv4HOj5r3V_6- (by fahdmirza)

79. **and i guess since this is show and tell latest astra test, a production scale wow classic server infrastructure +**
   - and i guess since this is show and tell https://x.com/kalin_t/status/2097349448305394027 latest astra test, a production scale wow classic server infrastructure + custom engine in a couple of days Linked projects: • Post by @kalin_t — gpt-astra is an absolute beast here's my 3 day trying it out - custom engine from scratch in C code - production scale wow-classic era mmo server - 20000+ server players no problem - 2000 players on screen at ~100kb/s - (x.com/kalin_t/status/2097349448305394027) • Post by @kalin_t — gpt-astra is an absolute beast here's my 3 day trying it out - custom engine from scratch in C code - production scale wow-classic era mmo server - 20000+ server players no problem - 2000 players on screen at ~100kb/s - (twitter.com/kalin_t/status/2097349448305394027) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549505365777973378
   - [Post by @kalin_t](https://x.com/kalin_t/status/2097349448305394027)
   - Source: https://x.com/kalin_t/status/2097349448305394027 (by kalin)

80. **Ohhhh, I *love* this!**
   - Ohhhh, I *love* this! To answer your question: I think this is an excellent example of the mental model! The way you're using separate nouls to validate that it's a yes/no question, plus another one that confirms if the signal you're looking for is in the story at all (assuming that's what `story_signal` is?) In fact that last bit is I think the real gem here, it's a great way of showing how nouls work particularly well for validation gates alongside using scores for granular signals. This is exactly the kind of demo we would build (and are building!) to help people understand how to think in cognition primitives. Bravo!
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1531362194996854885 (by AllieTheIcon)

81. **openjev: same Jev input/output patterns on open models, local GPUs**
   - Not a reproduction of TypeSafe official private model — an independent project testing the same input/output patterns with open models. Runs on local GPUs. Linked projects: • TheoLeeCJ/SemIf — Semantic ifs from open models, on a 3090 at home. Independent; not affiliated with Jev or TypeSafe. — 1555★ · Python — Live: openjev.com (github.com/TheoLeeCJ/openjev)
   - [TheoLeeCJ/SemIf](https://github.com/TheoLeeCJ/openjev)
   - Source: https://github.com/TheoLeeCJ/openjev (by @TheoLeeCJ)

82. **jevlike: train a Jev-like picker on your own data**
   - An independent project training a Jev-like model that picks one from changing text candidates, using your own data. Not the official TypeSafe model. Linked projects: • vinnylarouge/jevlike — 867★ · Python (github.com/vinnylarouge/jevlike)
   - [vinnylarouge/jevlike](https://github.com/vinnylarouge/jevlike)
   - Source: https://github.com/vinnylarouge/jevlike (by @vinnylarouge)

83. **Kev-0.5B: tiny open-source Jev-like decision model that trains on a MacBook**
   - Jared Palmer shipped Kev-0.5B: a tiny open-source Jev-like decision model with a TypeSafe-compatible API, based on Qwen2.5-0.5B, that you can train and run on a MacBook Pro. Model card and weights are on GitHub. — @jaredpalmer (643 likes) Linked projects: • Post by @jaredpalmer — Kev-0.5B: A tiny open source Jev-like decision model with a TypeSafe-compatible API based on Qwen2.5-0.5B that you can train and run on a MacBook Pro. (x.com/jaredpalmer/status/2101028325472841920) • jaredpalmer/kev — tiny Jev-like model built on top of Qwen2.5-0.5B you can train and run on your MacBook — 106★ · Python (github.com/jaredpalmer/kev)
   - [Post by @jaredpalmer](https://x.com/jaredpalmer/status/2101028325472841920)
   - [jaredpalmer/kev](https://github.com/jaredpalmer/kev)
   - Source: https://x.com/jaredpalmer/status/2101028325472841920 (by @jaredpalmer)

### Home (62)

1. **I tried to create a latent context layer that is a warmed up version of a small LDA Topic model that is injectable**
   - I tried to create a latent context layer that is a warmed up version of a small LDA Topic model that is injectable into the context window via memories or system prompts. Ideally, this enhances the human to AI interaction. The mission statement follow's David Shapiro's early template instruction flow and aims to encapsulate the generality of intelligent systems. It is missing its current development related to Omega "opposite toggling" designed to induce confusion and boolean toggles in a context and Yann's JEPA relationships. I'm not sure about the pdfs developed to describe the GSL-Jepa-Omega project, but I thought I'd atleast share the GSL prototype from a few years ago as I think Jev could thrive with a latent context layer like this prewarmed.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550558292621926532 (by GarysGameDev)

2. **I made some CVSS classification scripts that use Jev to generate a CVSS vector for a given software vulnerability**
   - I made some CVSS classification scripts that use Jev to generate a CVSS vector for a given software vulnerability description. Currently supports CVSS 3.0, 3.1, and 4.0. Tested against several CVEs from NVD that have official CVSS scores and it's usually either exact or very close to the official scores. Depends partly on how much of an accurate vulnerability description you give it: https://github.com/Red5d/jev-cvss Linked projects: • Red5d/jev-cvss — Fast CVSS scoring from vulnerability descriptions using Typesafe Jev - Red5d/jev-cvss (github.com/Red5d/jev-cvss) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550543777955840090
   - [Red5d/jev-cvss](https://github.com/Red5d/jev-cvss)
   - Source: https://github.com/Red5d/jev-cvss (by Red5d)

3. **Jev can be used for profiling players, which is great for organizing playtests and checking balance changes across**
   - Jev can be used for profiling players, which is great for organizing playtests and checking balance changes across different player groups. https://x.com/NicoSaraintaris/status/2100962598237749648 Linked projects: • Post by @NicoSaraintaris — Jev (@typesafeai) is great for profiling players! 👀 It watches you play Roulette Wars live, scores your risk-taking, and tags you as one of 4 archetypes (fortress / gambler / tactician / wildcard). We can then check if (x.com/NicoSaraintaris/status/2100962598237749648) • Post by @NicoSaraintaris — Jev (@typesafeai) is great for profiling players! 👀 It watches you play Roulette Wars live, scores your risk-taking, and tags you as one of 4 archetypes (fortress / gambler / tactician / wildcard). We can then check if (twitter.com/NicoSaraintaris/status/2100962598237749648) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493
   - [Post by @NicoSaraintaris](https://x.com/NicoSaraintaris/status/2100962598237749648)
   - Source: https://x.com/NicoSaraintaris/status/2100962598237749648 (by NicoSaraintaris)

4. **I’m planning a Jev benchmark inside Celestion’s real L0 code-understanding pipeline.**
   - I’m planning a Jev benchmark inside Celestion’s real L0 code-understanding pipeline. L0 already uses Graphify to extract deterministic structural facts from code. The problem I want to test is whether Jev can reliably turn those facts into typed semantic classifications without requiring a large framework-specific ruleset. I’ll compare Jev using different inputs: source only, source plus imports/annotations, source plus Graphify facts, and source plus graph neighborhood. The benchmark will measure semantic classification accuracy, false positives, UNKNOWN cases, stability across renames and unfamiliar/custom annotations, latency, and cost. If it works well, Jev could become Celestion’s semantic layer for L0, while identity, source evidence, revision, hashes, and persistence remain deterministic. Later I want to test the same approach for L1 cross-repo binding, requirement validation, and
   - [mddinizbh/ai-coding-celestion](https://github.com/mddinizbh/ai-coding-celestion)
   - Source: https://github.com/mddinizbh/ai-coding-celestion (by marleydiniz)

5. **** Jev CLI is out** <a:elmo_fire:1549940287235686410> `jev` puts TypeSafe's Jev model on the command line.**
   - ** Jev CLI is out** <a:elmo_fire:1549940287235686410> `jev` puts TypeSafe's Jev model on the command line. **What it does** • `verify`: check claims against evidence, verdict + probabilities per claim • `screen`: flag prompt injection, filler, and off-topic text before an agent reads it • `classify`: single, multi, or hierarchical labels with confidence • `extract`: pull emails, amounts, dates, custom regex fields without hallucination • `match` : same / different / unclear for record pairs, with dedupe • `route` : pick a handler and fill its arguments in one call • `find` / `rerank` : rank up candidates against a plain-language query • `ask` : raw yes/no, choice, or score questions about any state • `compact` : shrink agent transcripts by dropping stale tool calls, kept lines stay verbatim • `batch` : run any of the above over thousands of rows with a concurrency pool Works with a TypeS
   - [https://example.com/pricing](https://example.com/pricing)
   - [Jev CLI: AI you can grep](https://jevcli.vectorz.app/)
   - Source: https://example.com/pricing (by Nasr)

6. **Hey everyone! first day of experimenting w/ Jev - I built a small open-source project called Reaper: It’s**
   - Hey everyone! first day of experimenting w/ Jev - I built a small open-source project called Reaper: https://github.com/Eliran-Turgeman/repear It’s a semantic linter for coding agents. I currently add a short instruction to my AGENTS.md , which asks the agent to run Reaper after its normal tests and linters. You can see the exact workflow here: https://github.com/Eliran-Turgeman/repear/blob/main/AGENTS.md It’s still an early experiment, and I’m sure there’s plenty to improve especially around the rules, thresholds, and evaluations. Feedback is welcomed. Linked projects: • Eliran-Turgeman/repear — Semantic linter for AI coding agents and CI code review. Detects silent failures, weakened tests, scope creep, unnecessary abstractions, and other semantic code smells. - Eliran-Turgeman/reaper (github.com/Eliran-Turgeman/repear) • Eliran-Turgeman/repear — Semantic linter for AI coding agents an
   - [Eliran-Turgeman/repear](https://github.com/Eliran-Turgeman/repear)
   - [Eliran-Turgeman/repear](https://github.com/Eliran-Turgeman/repear/blob/main/AGENTS.md)
   - Source: https://github.com/Eliran-Turgeman/repear (by Eliran)

7. **Thanks—this is very helpful!**
   - Thanks—this is very helpful! Language support will definitely be important for us, since most of our process descriptions and operational issues are in Japanese. The sensitivity to question framing is also an important point. We’d likely test multiple phrasings against the same set of cases to evaluate consistency before using the results in real workflows. Do you know whether Jev currently supports Japanese input, or whether translating the input into English first would be the recommended approach?
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550499285647495330 (by @takuya_mrvs)

8. **Jev is really interesting as a playtesting tool.**
   - Jev is really interesting as a playtesting tool. (I think I'll also use it to classify playstyles of different human playtesters.) https://x.com/NicoSaraintaris/status/2100938146175152323 Linked projects: • Post by @NicoSaraintaris — jev is insane 🤯 It played our RTS roulette game so well it exposed a balance bug (basically unloseable for the grindy, low-risk playstyle). Now even jev can lose lol. All tests cost less than a cent. Legit tool for play (x.com/NicoSaraintaris/status/2100938146175152323) • Post by @NicoSaraintaris — jev is insane 🤯 It played our RTS roulette game so well it exposed a balance bug (basically unloseable for the grindy, low-risk playstyle). Now even jev can lose lol. All tests cost less than a cent. Legit tool for play (twitter.com/NicoSaraintaris/status/2100938146175152323) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/155049
   - [Post by @NicoSaraintaris](https://x.com/NicoSaraintaris/status/2100938146175152323)
   - Source: https://x.com/NicoSaraintaris/status/2100938146175152323 (by NicoSaraintaris)

9. **Built a little demo of using Jev to check against inefficient code evolution using standard agentic LLMs.**
   - Built a little demo of using Jev to check against inefficient code evolution using standard agentic LLMs. How it works: a task involving programming happens as usual through codex, but edit tool_calls are intercepted, the code [edits] are statically analysed using fbinfer to obtain a work estimate differential and then a schema is prepared with instructions for Jev to classify at a fine-grained level the edits using the user-prompt and the code comments as well as the Infer runtime instrumentation output to score with respect to computational complexity, necessity for the requested change and accrual of poor architecture (the main failure antipattern is that as users request new features they are near-sightedly implemented in a way that makes the whole code inefficient because it doesn't trigger reappraisal of the architecture). If the classification is below some thresholds then an inte
   - [bund.tgz](https://cdn.discordapp.com/attachments/1483217545040232493/1550488224760340630/bund.tgz?ex=6aae842f&is=6aad32af&hm=57b6d0b19acbe3393dc4619cf01591c064f837dc02e771430c76bd120f5508a3&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550488225280299068 (by xebulun)

10. **hey all, I'm planning on integrating Jev with my AI RP/choose-your-own-adventure platform < >.**
   - hey all, I'm planning on integrating Jev with my AI RP/choose-your-own-adventure platform <https://stagewhisper.ai>. It already has lots of programmatic decisions under the hood that are currently LLM calls with structured outputs - does what the player want to do need a dice roll/challenge? if so what skill from the player's skills is accepted? and what conditional bonuses apply? - is the narrative pacing too fast or too slow? - did what just happened need a change in resource/relationship tracking? - did what the player want to do constitute NSFW content and require age verification? Linked projects: • Home — Stage Whisper is an AI-powered text-adventure platform. Create characters, build worlds, run campaigns at your own pace, from your phone or web so your story stays consistent and your choices actually matter (stagewhisper.ai) Discussion: https://discord.com/channels/14832175442140
   - [Home](https://stagewhisper.ai)
   - Source: https://stagewhisper.ai (by Xiaomin)

11. **I am actively developing and updating "aidd-practice-guide," an operational framework that brings software engineering**
   - I am actively developing and updating "aidd-practice-guide," an operational framework that brings software engineering and Agile/Scrum disciplines into the LLM coding workflow: https://github.com/mryo0826/aidd-practice-guideIt acts as an "orthopedic cast" (矯正ギブス) to control uncertainty and keep human developers in the loop as the final arbitrators. The project is under heavy, active development with daily updates (including my private worklogs).The docs are currently in Japanese, so please drop them into a translation tool (like DeepL or Chrome Translate) to read through. I’d love to get your feedback on how we can entirely bypass the messy text-chat layer by leveraging TypeSafe’s deterministic decisions. Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550468453184438312
   - [https://github.com/mryo0826/aidd-practice-guideIt](https://github.com/mryo0826/aidd-practice-guideIt)
   - Source: https://github.com/mryo0826/aidd-practice-guideIt (by mryo0826)

12. **Hi guys, I was playing around with different states.**
   - Hi guys, I was playing around with different states. And when I changed the voice of state from "loosing" to "gaining" and adding keyword like "help", "ASAP", even though the state is not urgency, it's classifying it as urgency. Instead of the "state of intent", it is prioritizing words. Is it happening with everyone? or am I checking it in a wrong way? Because user might just play around like this. Linked projects: • image.png — image/png · 54 KB (cdn.discordapp.com/attachments/1483217545040232493/1550407764386254858) • image.png — image/png · 54 KB (cdn.discordapp.com/attachments/1483217545040232493/1550407764746960936)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550407764386254858/image.png?ex=6aaee200&is=6aad9080&hm=cafd3acb20447de1257e0fb70acd90ae1cc40cad57d1898861251ef150b0f3b7&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550407764746960936/image.png?ex=6aaee200&is=6aad9080&hm=f2e169b2482111b57fff1250eb63424f0bc93aa04ff01d2541095ec6e8c1c069&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550407764990238832 (by sreekar)

13. **Hello guys, please check out my Angry Birds portfolio website that I recently built using Three.js: I am a Full stack**
   - Hello guys, please check out my Angry Birds portfolio website that I recently built using Three.js: https://ahmar004.github.io I am a Full stack developer, and currently looking for clients, please hit me up with a message if someone wants a fully shipped web app for their startup idea or a project 🙂 My gitHub: https://github.com/Ahmar004 Linked projects: • Ahmar Ali — Full Stack Engineer & ML Developer — Knock down the crates to explore my work. Full stack engineering, computer vision, and open-source communities with 2,500+ members. (ahmar004.github.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550405009731092500
   - [Ahmar Ali — Full Stack Engineer & ML Developer](https://ahmar004.github.io)
   - [https://github.com/Ahmar004](https://github.com/Ahmar004)
   - Source: https://ahmar004.github.io (by Ahmar Ali)

14. **So I can't show a lot of what JEV has done for my product but here's the gist 10x increase in speed for call outcome**
   - So I can't show a lot of what JEV has done for my product but here's the gist 10x increase in speed for call outcome detection with a 70% reduction in costs with way less false followup locks Live objections gained a 40 point increase in detection and will be made into a new feature slightly more expensive but negligable to the overall cost Detection of sentiment to emails 10x faster and 70% cost reduction and roughly a plus 20 point differential on sentiment understanding.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550374474749190187 (by Solar)

15. **Built a thin desk that keeps asking Jev for the next trade.**
   - https://x.com/aowang/status/2100770166619652330 Built a thin desk that keeps asking Jev for the next trade. Each round it gets the book, last prints, and current position. Jev returns one typed call, long or short. The desk paper-fills it and asks again. Offline PnL sits next to the tape. PnL is red. Left it up. Not a signal, not advice. Open sourcing the frontend: tape, calls, fills, how the decision is shaped. Happy to hear where the schema is wrong. https://www.jev-trade.com code: https://github.com/aowang-ai/jev-trade Linked projects: • Post by @aowang — Jev is the one calling the trades, and it has to keep calling them. Each round the desk hands it the tape: the book, the last prints, the position we're already in. Jev comes back with one typed call, long or short. The (x.com/aowang/status/2100770166619652330) • Jev Trade — Jev live on Hyperliquid. Five isolated books. One model eve
   - [Post by @aowang](https://x.com/aowang/status/2100770166619652330)
   - [Jev Trade](https://www.jev-trade.com)
   - [aowang-ai/jev-trade](https://github.com/aowang-ai/jev-trade)
   - [ScreenShot_2026-09-18_111427_201.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550344361118670879/ScreenShot_2026-09-18_111427_201.png?ex=6aaea6f3&is=6aad5573&hm=c1f25062efeebf6596bbaee3fa5ba50b74bf99b1a6ead0cf16c03f01600b291b&)
   - Source: https://github.com/aowang-ai/jev-trade (by aooo)

16. **Hi TypeSafe Team, Early-access Jev evaluation results I've been running a preregistered synthetic evaluation of Jev**
   - Hi TypeSafe Team, Early-access Jev evaluation results I've been running a preregistered synthetic evaluation of Jev across Choice, Noul and Score for potential typed advisory-decision use. Initial R1: 32 cases, 100% schema-valid. Choice 11/12 exact, Noul 9/10 at a 0.50 threshold with Brier 0.058, Score MAE 0.569. A targeted adversarial R1B surfaced several interesting behaviors: • A Noul case containing exit_code=9 but positive "success" prose varied from 36% to 62% escalation across semantically equivalent variants, crossing the 0.50 decision threshold. • Choice followed explicit final_status overrides status and status overrides final_status rules, but when explicitly told no precedence existed between contradictory fields it still selected FAIL rather than INSUFFICIENT. • Score handled confirmed credential exposure extremely consistently in follow-ups: 4.96–4.98/5 at 97–99% confidence
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550305098155163779 (by CreditProQuo)

17. **Yup, and I have a lot more ideas with JEV, currently I’m working on a pretty niche use case FiveM cheaters using**
   - Yup, and I have a lot more ideas with JEV, currently I’m working on a pretty niche use case FiveM cheaters using spoofers to bypass bans. I’m planning to use Jev as part of the decision engine to compare a player’s connecting identifiers against existing identity data and decide whether the identity looks legitimate, spoofed, or linked to a previously known user before allowing them access. current decision engine can check 10 million user identifier from a DB (custom developped DB for the project, very specific but very fast on read operation), compare them, find similarities, decide if legit or not in between 20ms to 30ms, for a single player check req, but when 200 player try to "check-in" at the same time, well it goes up to 800-1000ms per check let's see if JEV can help speed up some of it
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550304353817206905 (by ⧹⎝ΞＬＭΛＮＩ３３５⎠⧸)

18. **decided to see how jev did when i fed it some quantitative analysis tasks, and i am very happy with what im getting**
   - decided to see how jev did when i fed it some quantitative analysis tasks, and i am very happy with what im getting out of it! massive benefits from a general classifier so we dont have to constantly be reworking different models for different tasks, and tbh jev already beats my bespoke solutions Linked projects: • Screenshot_2026-09-17_at_5.20.27_PM.png — image/png · 766 KB (cdn.discordapp.com/attachments/1483217545040232493/1550285781632032859)
   - [Screenshot_2026-09-17_at_5.20.27_PM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550285781632032859/Screenshot_2026-09-17_at_5.20.27_PM.png?ex=6aae7065&is=6aad1ee5&hm=27aa36edb98603dcff052d7adb7d948df88d981ec3aaa096fd0b166100cc6221&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550285781971505232 (by Alpha🧪)

19. **I build a SQL extension that turns plain english into a WHERE clause with jev Example: *WHERE jev(people, 'could work**
   - I build a SQL extension that turns plain english into a WHERE clause with jev Example: *WHERE jev(people, 'could work from home')* Every row gets judged individually, no index and no embeddings needed. Try it out (don't burn my wallet pls) https://pgjev.zachi.dev/ Linked projects: • pg-jev: query Postgres in plain English — A PostgreSQL extension that turns natural-language conditions into WHERE clauses. No index, no embeddings. Try it live. (pgjev.zachi.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550259928831238144
   - [pg-jev: query Postgres in plain English](https://pgjev.zachi.dev/)
   - Source: https://pgjev.zachi.dev/ (by Zachi)

20. **ive been trying to figure out what I can and cannot turn into a classification problem.**
   - ive been trying to figure out what I can and cannot turn into a classification problem. comparing a couple different wordle stratergies is actually a good basic case study. I think Jev lowkey is pretty greedy (when putting it in 'multi-turn' type setups - like letter by letter guessing words). Its kind of obivous but pretty interesting https://x.com/sid19arya0/status/2100679099723223341?s=20 Linked projects: • Post by @sid19arya0 — Jev @typesafeai playing wordle - with different stratergies is a pretty good case study in what Jev can and cannot do. Guess letter-by-letter -> very greedy All 5 letters at once -> spams SEEEE (repeatedly) Guess the who (x.com/sid19arya0/status/2100679099723223341) • Post by @sid19arya0 — Jev @typesafeai playing wordle - with different stratergies is a pretty good case study in what Jev can and cannot do. Guess letter-by-letter -> very greedy All 5 letters at
   - [Post by @sid19arya0](https://x.com/sid19arya0/status/2100679099723223341?s=20)
   - Source: https://x.com/sid19arya0/status/2100679099723223341?s=20 (by Sid)

21. ****I made a fuzzy sql function using jev.**
   - **I made a fuzzy sql function using jev. ** Ask your database: **WHERE jev(people, 'could work from home')** or **WHERE jev(people, 'name sounds european')** Tada, jev will search and judge the rows using your prompt. https://x.com/iam_zachi/status/2100679300756435135 Linked projects: • Post by @iam_zachi — I think I just cooked something 🔥 jev(): a PostgreSQL extension that searches your whole database in natural language. No index, no embeddings, just one function. WHERE jev(people, 'could work from home') or WHERE jev(p (x.com/iam_zachi/status/2100679300756435135) • Post by @iam_zachi — I think I just cooked something 🔥 jev(): a PostgreSQL extension that searches your whole database in natural language. No index, no embeddings, just one function. WHERE jev(people, 'could work from home') or WHERE jev(p (twitter.com/iam_zachi/status/2100679300756435135) Discussion: https://discord.co
   - [Post by @iam_zachi](https://x.com/iam_zachi/status/2100679300756435135)
   - Source: https://x.com/iam_zachi/status/2100679300756435135 (by Zachi)

22. **I'm building orgtools.com to better align decision-making to an organization's strategy and institutional knowledge.**
   - I'm building orgtools.com to better align decision-making to an organization's strategy and institutional knowledge. Based on my experience hitting ~75 employees with last start-up and feeling everything start to slow down... it was really difficult to stay eyes-on/hands-on in an effective way without over-delegating or micro-managing. Converted a simple workflow to Jev last night... a user describes a decision they need to make which is pattern-matched to a decision type so I can pull history, best practices, etc. Just ran evals and Jev is 25x faster... 0.15s median vs 3.85s for Gemini 3.8 Flash and the confidence is _much_ better. This is huge for UX, nice work TypeSafe team! I currently have 54 LLM workflows of which Jev would probably be well-suited for ~15 of them, excited to continue evaluating, exploring. Linked projects: • Screenshot_2026-09-17_at_8.25.02_AM.png — image/png · 141
   - [Screenshot_2026-09-17_at_8.25.02_AM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550169866970075196/Screenshot_2026-09-17_at_8.25.02_AM.png?ex=6aaead31&is=6aad5bb1&hm=ba31f0c284251eb13e2c798b3e36a8c529af99bd48fd1bf2ad33834be8f09a32&)
   - [Screenshot_2026-09-17_at_8.41.28_AM.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550169867481784421/Screenshot_2026-09-17_at_8.41.28_AM.png?ex=6aaead31&is=6aad5bb1&hm=a614a83395825538cbb85928ad8a0c956c6f39d6c98e0db038ebc7cc3abe5319&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550169867796348948 (by alpiner13)

23. **I asked Jev to play N Wordle boards at once!**
   - I asked Jev to play N Wordle boards at once! Each board hides a different word, but every guess applies to all unsolved boards simultaneously. Every move has to balance solving one board with revealing useful information across the others. Jev only needed 7 model calls across the entire game. Its shared guesses progressively narrowed the candidate set for every board until each remaining board had only one possible answer. From there, no more model calls were needed and Jev simply submitted the known answers. It cleared all 32 boards in 35 guesses and 5.4 seconds. The estimated API cost for the whole run was just $0.00068! I think Jev is really powerful for this kind of real-time decision loop. It is fast, extremely cheap, and can make one structured decision that advances many changing states at once. Excited to see what else can be built with these new models! https://x.com/richardcsuw
   - [Post by @richardcsuwandi](https://x.com/richardcsuwandi/status/2100603807894053252?s=20)
   - Source: https://x.com/richardcsuwandi/status/2100603807894053252?s=20 (by Richard Suwandi)

24. **Building Sparq Studio — a multi-agent AI platform, not a single-purpose tool.**
   - Building Sparq Studio — a multi-agent AI platform, not a single-purpose tool. It's a normal chat where you can talk to individual models directly (Claude, GPT, Grok, Gemini, Qwen, DeepSeek, more being added), a "Boardroom" mode where Sparq itself — a separate synthesis layer — consults its own internal panel of tuned agents and merges their takes into one voice, and a build layer on top (CRM, booking tools, landing pages, pitch decks, chatbots with their own memory), all sharing the same context/memory about the user. Two different multi-agent layers running under one roof, each doing a bunch of small structured decisions on every message — which single agent should answer when addressed directly, which internal panel members Sparq's synthesis should consult, is this worth remembering, is an old conversation relevant to the new one, which build template fits the request. All of that curr
   - [Skjermbilde_2026-09-17_165134.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550160509872115742/Skjermbilde_2026-09-17_165134.png?ex=6aaea47a&is=6aad52fa&hm=5b29ffb081a3ca95e7f68de7528625afc2e4a92a3fc1bce00a719ba85cb44e2b&)
   - [Skjermbilde_2026-09-17_165111.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550160510262050926/Skjermbilde_2026-09-17_165111.png?ex=6aaea47a&is=6aad52fa&hm=01f192f38307418f4072c41ff93701cb207248f4bdc5d3e949199b35e9d6cf0e&)
   - [Skjermbilde_2026-09-17_165100.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550160510681358486/Skjermbilde_2026-09-17_165100.png?ex=6aaea47a&is=6aad52fa&hm=e60a4bee997efbf2ca2dae448a1cc30ccf66422913fd9af0bf746389c64b1089&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550160511243653200/image.png?ex=6aaea47a&is=6aad52fa&hm=a8546ebec6429c5736705cc1c33fb0d1606ed25c2cb78fc88fc2746ee98dc2b7&)
   - [img11.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550160511683923988/img11.png?ex=6aaea47a&is=6aad52fa&hm=64817206176f8bbcc2f78c93cdb0fbe6f934dce101e547566848aa3e2116226f&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550160512392765460 (by BFG | gero9mo)

25. **An llm breaks up and classifies my writing/sources so it can be compared against the rubric and learning objectives**
   - An llm breaks up and classifies my writing/sources so it can be compared against the rubric and learning objectives for that assignment (testing on already submitted examples). Ranks total confidence that different rubric sections are fulfilled. Mixed results on identifying the specific sections that are lacking though; will need to vibeslop further tomorrow.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550147934165798944 (by raccoon)

26. **I just passed waitlist today, and tried shameless vibe-code-drop-in-replacement to my company's current AI workflow.**
   - I just passed waitlist today, and tried shameless vibe-code-drop-in-replacement to my company's current AI workflow. All I did was giving official Agent Skill to my coding agent, and order it to adapt current benchmark script to Jev. Then... Boom! It just works! This benchmark tasks are categorizing 111 arbitrary user inputs to two types of categories. First task is 1 of 39, second one 1 of 62. Both are nullable (should be labeled 'none' if doesn't fit to any category) User inputs include unofficial terms, slangs, STT(=typo!) so we give keywords and their frequent aliases in the prompt. Interesting points: * My company is based in South Korea. So this benchmarks test *Korean* user inputs. Jev just... works with it, even prompt was fully in English (written by LLM). * Prompting in Korean also work, but it doesn't seem to improve performance, at this stage. * Current workflow calls LLM twi
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550137785795616888/image.png?ex=6aae8f50&is=6aad3dd0&hm=1aa2e81f50bd190871eee6953c9258edcd8a1b75ab52793ad35a13f5fdded9f2&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550137786042949632 (by Calvin)

27. **Currently having fun with**
   - Currently having fun with https://github.com/browser-use/jev-ultrafast Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550136221211295754
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by Alessandro Frau)

28. **I built an Home Assistant integration to use Jev in your Home Assistant automations!**
   - https://github.com/AboveColin/HA-Jev I built an Home Assistant integration to use Jev in your Home Assistant automations! feel free to install and try it out using HACS. Linked projects: • AboveColin/HA-Jev — Home Assistant integration for TypeSafe Jev. Ask a question about your house and get a probability, a choice or a score as an entity. - AboveColin/HA-Jev (github.com/AboveColin/HA-Jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550131319701512252
   - [AboveColin/HA-Jev](https://github.com/AboveColin/HA-Jev)
   - Source: https://github.com/AboveColin/HA-Jev (by Colin)

29. **careful with this.**
   - careful with this. paper trading neglects the fact that, especially on trading exchanges, an army of bots front runs even smaller trades. perp rates universally fluctuate very differently than the historical trading data, not because of microbots but because large trades moved them that are not based on normal trading metrics. in fact a lot of the price action is *because* of the larger trades, so the signal is not inherent to the regime or traditional options/momentum tendencies. "you haven't really vibe codes til you stack up an accidental $1k bill" = "you aren't a real trader until you've been eaten alive leveraging a back tested paper strategy that had incredible results." still, it works.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550126899622314015 (by WeLiveToServe)

30. **My experience so far is that Jev is extremely fast and capable of avoiding immediate risks, but Luna makes better**
   - My experience so far is that Jev is extremely fast and capable of avoiding immediate risks, but Luna makes better decisions when the consequences extend several moves into the future. I tested different prompt calibrations, from safety focused to more apple focused, while always giving both models the same prompt and context. Jev either became too cautious or pursued apples without anticipating later traps as consistently, whereas Luna more often balanced progress with the long-term shape of the snake. It was not perfect, but it appeared to reason further ahead, sometimes taking several seconds and using more reasoning tokens on difficult moves. This is only my experience from these experiments, but Jev’s long-horizon judgment still seems behind Luna and the expected Terra-level performance, despite its impressive speed. For a first-generation system, though, it is extremely impressive, 
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550126231566155878 (by Jayson)

31. **It could still be a harness or prompting issue, which is part of what I’m testing.**
   - It could still be a harness or prompting issue, which is part of what I’m testing. Each model chooses one relative action: `forward`, `left`, or `right`. Jev receives a TypeSafe Choice: ```json { "type": "choice", "criteria": { "forward": "Continue in the current heading.", "left": "Turn left.", "right": "Turn right." } } ``` Luna receives the same options through a strict JSON enum: ```json { "action": { "type": "string", "enum": ["forward", "left", "right"] } } ``` Both receive the same prompt and game state. A shortened state example: ```json { "board": { "width": 10, "height": 10, "map": ["..........", "...TBH.A..", ".........."] }, "heading": "right", "apple": {"x": 7, "y": 1}, "body_head_to_tail": [ {"role": "head", "x": 5, "y": 1}, {"role": "body", "x": 4, "y": 1}, {"role": "tail", "x": 3, "y": 1} ], "moves": { "forward": { "next": {"x": 6, "y": 1}, "collision": false, "apple_dist
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550121363488907379 (by Jayson)

32. ****Some findings from testing Jev , particularly Choice vs Noul and Choice labels** I've been playing around with Jev**
   - **Some findings from testing Jev , particularly Choice vs Noul and Choice labels** I've been playing around with Jev 1.13.0 quite a bit and found some behavior that I think is worth knowing if you're using its probabilities downstream. The biggest takeaway is very simple: The way you represent a question can substantially change the probability Jev returns, even when the underlying question and option descriptions stay semantically same. I started by repeatedly sending identical questions just to see how stable the outputs were. Jev is stochastic (shocker I know): identical calls don't necessarily return exactly the same probability. However, when I repeated questions many times, the average was generally very remarkably stable with very little standard deviation So there seems to be a useful distinction between: individual-call noise vs stable differences caused by changing the question
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550105858988576839 (by ubhillutd)

33. **hey people! I'm currently trying to rump up with my self-funded start for creating an ATS system with**
   - hey people! I'm currently trying to rump up with my self-funded start for creating an ATS system with lower costs and integrated AI where makes sense: https://beehive-ats.com/ Linked projects: • Beehive ATS — Agency ATS with Client Portals and Practical AI — Beehive ATS helps recruiting agencies manage jobs, candidates, interviews, external hiring-manager review, and practical AI-assisted shortlisting in one clean system. (beehive-ats.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550059581072478271
   - [Beehive ATS — Agency ATS with Client Portals and Practical AI](https://beehive-ats.com/)
   - Source: https://beehive-ats.com/ (by Patrizio)

34. **Hey! For the past few months I've been building simulated sandboxes as an approach to buid safer ai**
   - Hey! For the past few months I've been building simulated sandboxes as an approach to buid safer ai agents. If you want to see how your ai agents will behave when interacting with live APIs, databases or MCP tools. One bad call can burn through rate limits or accidentally wipe an entire database. To solve this we're building Digital Twins which are simulated sandbox environments of different APIs. You can use these to test your agents without touching live endpoints or having to worry about maintain your testing infrastructure. Even with Jev, you still need a testing framework to build production agents and pome can help with this 😁 GitHub: https://github.com/pome-sh/digital-twins Linked projects: • pome-sh/digital-twins — Test mode for your integrations, built for the way agents build. - pome-sh/digital-twins (github.com/pome-sh/digital-twins) Discussion: https://discord.com/channels/1
   - [pome-sh/digital-twins](https://github.com/pome-sh/digital-twins)
   - Source: https://github.com/pome-sh/digital-twins (by hades)

35. **Gonna be do some fact checking and breed matching in based on my early tests, can answer: > "allergic kid, first dog,**
   - Gonna be do some fact checking and breed matching in https://dogapi.dog, based on my early tests, can answer: > "allergic kid, first dog, gone 8h a day" gonna see how it scales with the current dataset I have since one is one-off and the other is as a service Linked projects: • Free JSON API for Dog Breeds, Pictures, Groups and Facts | Dog API — A free JSON API with 283 dog breeds, 9 breed groups, 483 dog facts, and 2,354 pictures. No key, no sign up, nothing to pay. (dogapi.dog) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549974880089284748
   - [Free JSON API for Dog Breeds, Pictures, Groups and Facts | Dog API](https://dogapi.dog)
   - Source: https://dogapi.dog (by kinduff)

36. **Yeah, with Jev, I do wonder if that kind of context engine feature I tried back...**
   - Yeah, with Jev, I do wonder if that kind of context engine feature I tried back... It must be two years ago now... Whether it would become viable with Jev, and actually worthwhile. That'd need genuinely consistent, smart, cheap performance. Only question is whether Jev can understand all the minute nuances, coherently choosing what is worth including in the "send to LLM turn" bin.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549955263132602460 (by Dr. Fumes)

37. **I don't get the hype, can't even form coherent sentences most of the time let alone pass any of my benchmarks (Decided**
   - I don't get the hype, can't even form coherent sentences most of the time let alone pass any of my benchmarks (Decided to try letting it autoregressively pick from the alphabet, punctuation, and 200 most common english words) Linked projects: • image.png — image/png · 23 KB (cdn.discordapp.com/attachments/1483217545040232493/1549940976670216252)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549940976670216252/image.png?ex=6aae80c5&is=6aad2f45&hm=7cf542d4ff49b66485bd5d29dcfa05d0a5193927bcbc7060285931db93cb4f63&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549940977052025005 (by MRE)

38. **[Small project prototype]: Combining Langgraph & Jev for intent matching I wanted to show how you can use and combine**
   - [Small project prototype]: Combining Langgraph & Jev for intent matching I wanted to show how you can use and combine langgraph with jev to build a workflow. I picked a mocked intent recognition for now. I will continue working on it by creating a real evaluation with a fake data set with adding in MLflow. Use cases like this we build many times with way more heavy models then jev at my software engineering team at my current work, so its a great example in my opinion how to use it in complex automation cases. This is just a very small prototype i quickly build after getting access. Im very excited to explore more cases and patterns and combine it with a real evaluation data set to see how it perfroms! https://github.com/GiesN/typesafe-jev-workflow Linked projects: • GiesN/typesafe-jev-workflow — Contribute to GiesN/typesafe-jev-workflow development by creating an account on GitHub. (git
   - [GiesN/typesafe-jev-workflow](https://github.com/GiesN/typesafe-jev-workflow)
   - Source: https://github.com/GiesN/typesafe-jev-workflow (by omardy)

39. **computer use might be built different with jev**
   - https://x.com/injaneity/status/2100177865958682860?s=20 computer use might be built different with jev Linked projects: • Post by @injaneity — @typesafeai on computer use is looking pretty good 👀 (x.com/injaneity/status/2100177865958682860) • Post by @injaneity — @typesafeai on computer use is looking pretty good 👀 (twitter.com/injaneity/status/2100177865958682860) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549822662136565900
   - [Post by @injaneity](https://x.com/injaneity/status/2100177865958682860?s=20)
   - Source: https://x.com/injaneity/status/2100177865958682860?s=20 (by zane)

40. **I created It is a web-based, side-by-side comparison sandbox designed for developers to test and evaluate different**
   - I created https://LLMCode.ai It is a web-based, side-by-side comparison sandbox designed for developers to test and evaluate different Large Language Models. Key Features: It allows users to compare models like GPT, Claude, Gemini, Llama, and Qwen simultaneously using their own API keys.Pricing & Data: The lab interface itself is free, requires no signup or credit card, and calculates exact direct provider token costs before running queries. API keys remain stored locally within the browser. Linked projects: • LLMCode Lab — Compare AI Models Side-by-Side — Compare OpenAI, Claude, Gemini, NVIDIA, and HuggingFace models side-by-side in your own testing lab — bring your own API key. (llmcode.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549803260448084039
   - [LLMCode Lab — Compare AI Models Side-by-Side](https://LLMCode.ai)
   - Source: https://LLMCode.ai (by Cheryl)

41. **Built a Btc prediction to see if jev can have predictions of it going higher or lower in certain timeframes.**
   - Built a Btc prediction to see if jev can have predictions of it going higher or lower in certain timeframes. Left it to test, seems to be doing quite fine for now but wondering how it's predictions will turn of for daily. Currently it can be very very certain in some decisions especially on big timeframes. Also I don't believe this is nearly a good or the best way to use it, but it would be a nice test to see how it performs with a lot of simple information you can get from charts and process it fast to decide if it thinks it's going higher. Another note the documentation says it would be better to split the questions and than compute later, which we technically don't do here it just gives it values of the market and asks for the decision, so separating the values and than getting the weights later with optimization could probably do much better. https://lab.rokogrga.com/btc-jev https://
   - [BTC–Jev — RG Lab](https://lab.rokogrga.com/btc-jev)
   - [WebGrga/btc-jev-signal](https://github.com/WebGrga/btc-jev-signal)
   - Source: https://github.com/WebGrga/btc-jev-signal (by Kahlogosh)

42. **Hi all! for the past few months I've been building simulated sandboxes as an approach to buid safer**
   - Hi all! for the past few months I've been building simulated sandboxes as an approach to buid safer ai agents. If you want to see how your ai agents will behave when interacting with live APIs, databases or MCP tools. One bad call can burn through rate limits or accidentally wipe an entire database. To solve this we're building Digital Twins which are simulated sandbox environments of different APIs. You can use these to test your agents without touching live endpoints or having to worry about maintain your testing infrastructure. Even with Jev, you still need a testing framework to build production agents and pome can help with this 😁 GitHub: https://github.com/pome-sh/digital-twins Linked projects: • pome-sh/digital-twins — Test mode for your integrations, built for the way agents build. - pome-sh/digital-twins (github.com/pome-sh/digital-twins) Discussion: https://discord.com/channel
   - [pome-sh/digital-twins](https://github.com/pome-sh/digital-twins)
   - Source: https://github.com/pome-sh/digital-twins (by hades)

43. **Hey there! I'm still on the waiting list but wanted to wrap my head around the things typesafe**
   - Hey there! I'm still on the waiting list but wanted to wrap my head around the things typesafe enables us to do. So I quickly vibe-coded a small mock API for this, compatible with the current SDK. Accuracy not really here, latency about 1.5sec/request vs 0.5sec, but at least you can try it if your name is not Ben... Does that help anyone? Or just me? https://typesafe.severin-marcombes.com Linked projects: • You’re not called Ben? — Unofficial TypeSafe mock API — Try a TypeSafe-like API while you wait for the beta. Official SDKs, your API key. A mock, not TypeSafe’s model or quality. (typesafe.severin-marcombes.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549784805791764560
   - [You’re not called Ben? — Unofficial TypeSafe mock API](https://typesafe.severin-marcombes.com)
   - Source: https://typesafe.severin-marcombes.com (by Severin)

44. **Hey! I made a live geopolitical risk tracker that scores every country in the world - every hour**
   - Hey! I made a live geopolitical risk tracker that scores every country in the world - every hour on a 0-100 scale about current geopolitical risk! It's on the app store and available on the web: https://risk-terminal.com Linked projects: • Risk Terminal — Geopolitical risk, decoded in real time. — 195 countries scored hourly. AI-written briefings twice daily. Live conflict mapping. Public. (risk-terminal.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549774570398154813
   - [Risk Terminal — Geopolitical risk, decoded in real time.](https://risk-terminal.com)
   - Source: https://risk-terminal.com (by krishna)

45. **Hi everyone. I am creating taOS, a home for everything agents.**
   - Hi everyone. I am creating taOS, a home for everything agents. https://github.com/jaylfc/taOS Linked projects: • jaylfc/taOS — Self-hosted AI agent OS. Your memory, chat, agents, and files stay on hardware you own, offline by default, cloud by choice. Offline AI memory (taOSmd), self-hosted multi-framework group chat, a fu... (github.com/jaylfc/taOS) • IMG_2337.jpg — image/jpeg · 252 KB (cdn.discordapp.com/attachments/1483217545040232493/1549725496391241728) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549725496936366180
   - [jaylfc/taOS](https://github.com/jaylfc/taOS)
   - [IMG_2337.jpg](https://cdn.discordapp.com/attachments/1483217545040232493/1549725496391241728/IMG_2337.jpg?ex=6aae60d6&is=6aad0f56&hm=b610a4fed0680ea6f26b070fd4e217c0374590324f634ad6ad6daa222b9cc4c5&)
   - Source: https://github.com/jaylfc/taOS (by Jay)

46. **Mocked up an explainer to understand what’s new here.**
   - Mocked up an explainer to understand what’s new here. LLMs feel like the current, Jev like the buoy: one moves thru possibility, the other turns conditions into signals 🪧🚥 code can use. Linked projects: • system-1-for-devs-by-schwentker.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1549688090514161735)
   - [system-1-for-devs-by-schwentker.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549688090514161735/system-1-for-devs-by-schwentker.png?ex=6aae3e00&is=6aacec80&hm=4cd5c72f2187312aacdfcb9a8ecda675440d8a092cd866532229808001abd523&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549688090824544436 (by schwentker)

47. **Hello everybody, my name is Lukas and I am currently CEO of Omnicado.com - we focus on integrating e-commerce sellers**
   - Hello everybody, my name is Lukas and I am currently CEO of Omnicado.com - we focus on integrating e-commerce sellers onto marketplaces by providing them with full connection between their system and marketplace systems (Amazon, Bol, eBay etc.) - we are power users of LLM since GPT 3.5 - so we are very excited what Jev has for us in store.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549684381302661131 (by lkshnk)

48. **Jev gets some information about itself (xyz, hunger, dimension), inventory, nearby blocks, nearby entities, tell it if**
   - Jev gets some information about itself (xyz, hunger, dimension), inventory, nearby blocks, nearby entities, tell it if it's about to walk into anything in any cardinal direction, and some memories. For now, JevBot also gets 6 20x20 ascii text representations of what would be seen North/south/east/west/up from its position... the 6 ascii windows trick doesn't work *great* though. Definitely curious to see what works for perception. I found giving it a bunch of "common sense" context about how to play minecraft is really helpful. Like "Solid blocks block movement" and "Mining/harvesting may require a suitable tool". After this, JevBot gets a Choice over a list of legal actions from the current state. These are things like "collect snow", "fight witch", "craft stick", etc.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549662601170915329 (by PLx22)

49. **This is huge, I want to modernize/resurrect our AI coach project for MOBAs, technically an macro decision maker / or**
   - This is huge, I want to modernize/resurrect our AI coach project for MOBAs, technically an macro decision maker / or expand it to other games, like Magic: the Gathering using Jev. The first drafts (boring) - http://hdl.handle.net/10467/101407 the current state is non-public and operations winded down. But this RLCD approach can be interesting for having AI playing games with you/coaching TCGs. Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549642481543417948
   - [http://hdl.handle.net/10467/101407](http://hdl.handle.net/10467/101407)
   - Source: http://hdl.handle.net/10467/101407 (by aipavel)

50. **Even if Jev is well-calibrated overall, a serious quant would still want to assess its calibration on their specific**
   - Even if Jev is well-calibrated overall, a serious quant would still want to assess its calibration on their specific domain and data distribution: FOMC announcements, earnings, geopolitical events, XAUUSD, equities, and different time horizons such as 1 minute, 5 minutes, or 1 hour. A probability that is calibrated on Jev's evaluation tasks is not automatically calibrated for a question like, “What is the probability that XAUUSD will rise over the next five minutes?” TypeSafe positions Jev as a model specifically optimized for calibrated probabilistic decisions, but Jev is still very new. Its calibration and predictive usefulness therefore need to be empirically validated within the specific financial context in which it is being used
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549630682740031490 (by Ayenn5)

51. **low latency, also quants usually use Platt Scaling or Isotonic Regression to fix raw AI scores before feeding them**
   - low latency, also quants usually use Platt Scaling or Isotonic Regression to fix raw AI scores before feeding them into mathematical models(probability calibration). but jev uses Reinforcement Learning for Calibrated Decisions so you can just feed it straight up. also a lot of different things that are a bit hard to think of for now for me.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549629325421187164 (by thodoh)

52. **Self-explanatory.**
   - Self-explanatory. By using Jev as the classifier, it will either be able to provide me a massive intelligence increase over `gemini-2.5-flash-lite` (about 12k classifications per dollar at ~90% accuracy) or a massive cost savings over `gemini-3.1-flash-lite` (about 2500 classifications per dollar at ~97% accuracy). The last 3% are not classified well except with LLM calls that cost literally 10-100x more per chip, which is not financially sustainable. Jev at advertised prices and intelligence level can theoretically get me frontier level intelligence (Sonnet 5 high thinking gets 100% accuracy, which Jev apparently matches) at half the cost of `gemini-2.5-flash-lite`, which is a major gamechanger for this app's viability https://fixvx.com/CleistaCelestia/status/2095319421187207550 Linked projects: • Post by @CleistaCelestia — I'm going to pipe my entire life through an anime girl dashboar
   - [https://fixvx.com/CleistaCelestia/status/2095319421187207550](https://fixvx.com/CleistaCelestia/status/2095319421187207550)
   - [Post by @CleistaCelestia](https://vxtwitter.com/CleistaCelestia/status/2095319421187207550)
   - Source: https://fixvx.com/CleistaCelestia/status/2095319421187207550 (by Cleista)

53. **Hey! My name is Aadhi. Co-founder of HoneyRuns. We build fleet maintenance agents that do the busy work**
   - Hey! My name is Aadhi. Co-founder of HoneyRuns. We build fleet maintenance agents that do the busy work of scheduling maintenance with shops. So many home services businesses (HVAC, plumbing, pest control) maintain their vehicles poorly and it costs them a ton of revenue. Reduces breakdowns, faster decision, and improves uptime. Jev will be interesting to see how it fits together and help with the timing of maintenance, fuel, charging etc.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549606339372650577 (by Aadhi)

54. **👋 Co-founder of CRDBAG.com and NativeSoil.dev .**
   - 👋 Co-founder of CRDBAG.com and NativeSoil.dev . Currently working on Propiler (equipment organizer / RFID + QR + MCP) Latest work 👉 https://github.com/nativesoil/handover Linked projects: • nativesoil/handover — An open JSON format and local toolchain for carrying an AI assisted project's working state between agents, tools and model providers. - nativesoil/handover (github.com/nativesoil/handover) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549590140832452610
   - [nativesoil/handover](https://github.com/nativesoil/handover)
   - Source: https://github.com/nativesoil/handover (by Andreas Näslund)

55. **don't mind the UI I'm making a STEM workshop system where the workshop feels like a game the city evolves with**
   - don't mind the UI I'm making a STEM workshop system where the workshop feels like a game the city evolves with students projects and challenges are like online coding platforms but IRL and personalized to the current class therefore i can't prepare ready made challenges I can only prepare the world it's a living city in the classroom JEV bundled with an llm could really help with the chaotic part of deciding on the fly the challenges and the piping needed to make it happen Linked projects: • image.png — image/png · 356 KB (cdn.discordapp.com/attachments/1483217545040232493/1549572679789453312) • image.png — image/png · 226 KB (cdn.discordapp.com/attachments/1483217545040232493/1549572680284635196)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549572679789453312/image.png?ex=6aae7b44&is=6aad29c4&hm=465d55c8b95e2e4e224bc8124b8678e93c6438fff89bd4bd90ee68c29fa8a7cf&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549572680284635196/image.png?ex=6aae7b44&is=6aad29c4&hm=6760452a12755278f3dd6cbd4690409a089ff237c4286e3c2cf4d6a22e37c3d8&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549572680510869516 (by slapouille)

56. **Hi everyone. I am building freeapp.ai - your way to escape from your desk. Here is a short**
   - Hi everyone. I am building freeapp.ai - your way to escape from your desk. Here is a short demo from the beach https://x.com/dextns/status/2099792098719305741 The whole idea is to have a private place (VPS) where you can build anything you want from anywhere, anytime. You can walk your dog and build features or you stay on the line on your car. Or you go out for shopping. The main idea is to be able to build products unchained from your desk. The system has memory unified and knows exactly when you come back to build where you left. It also has a task system so you will see exactly what is done and what is in progress. It also starts from a bunch of lessons learned which you should never repeat and it improves itself over time by automatically setting rules and lessons learned. It also have a notification system so you receive your mobile APK directly in your app. All you need to do is t
   - [Post by @dextns](https://x.com/dextns/status/2099792098719305741)
   - Source: https://x.com/dextns/status/2099792098719305741 (by ET)

57. **Currently developing this with a friend (have my own fork): This would help give more help to agents and improve**
   - Currently developing this with a friend (have my own fork): https://github.com/jchristn/Armada This would help give more help to agents and improve productivity in many aspects. Linked projects: • jchristn/Armada — Armada is a multi-agent orchestration system to allow humans to scale when working with multiple AI agents - jchristn/Armada (github.com/jchristn/Armada) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549554277096358028
   - [jchristn/Armada](https://github.com/jchristn/Armada)
   - Source: https://github.com/jchristn/Armada (by Variety)

58. **Hey! I'm pax and I'm building stuff (you can check my website [paxdynamics.com]( )), but currently prepping to**
   - Hey! I'm pax and I'm building stuff (you can check my website [paxdynamics.com](https://paxdynamics.com/)), but currently prepping to launch: - [korena.ai](https://korena.ai/) (marketing on autopilot) - [getothermachines.com ](https://getothermachines.com/)(more agents on autopilot) - [framepath.dev](https://framepath.dev/) (deterministic software factories) - [ha2ha.md](https://ha2ha.md/) (human-agent to human-agent realtime colab) - [goodboysec.com](https://www.goodboysec.com/) (in-container runtime firewall that protects containers from the inside) Plus other pet projects like: - [p-ax](https://github.com/pax-k/p-ax) (codebase intelligence layer for agents) - [OpenAIRT-300](https://github.com/pax-k/OpenAIRT-300) (open-source labs + curriculum for training AI red teamers) - [markov-pax](https://github.com/pax-k/markov-pax) (markov chains in TypeScript - interested in defense tech) - [C
   - [Pax Dynamics - Innovation Consultant](https://paxdynamics.com/)
   - [Korena - Agentic Marketing Intelligence for Launch-Ready Creative](https://korena.ai/)
   - [Other Machines — AI workers for your team](https://getothermachines.com/)
   - [Framepath](https://framepath.dev/)
   - [HA2HA — Human-Agent Collaboration Protocol](https://ha2ha.md/)
   - Source: https://github.com/pax-k/p-ax (by pax)

59. **I'm building Solenoid, which is a, well, type-safe node-graph alternative to Excel.**
   - I'm building Solenoid, which is a, well, type-safe node-graph alternative to Excel. numbers/strings/dates/booleans all have different socket types so they can't be confused for one another. Supports all Excel functions (except the ones that are strictly for spreadsheet grids). The windows desktop build uses Rust/Polars for big operations but otherwise it runs in your browser. Has additional convenience functions + widgets + Obsidian integration. http://solenoid-ngc.vercel.app Linked projects: • Solenoid — A node-graph alternative to Excel for data tables. (solenoid-ngc.vercel.app) • 91766215-7682-4291-b1d9-11121e21c207.jpg — image/jpeg · 145 KB (cdn.discordapp.com/attachments/1483217545040232493/1549549541282549880) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549549541798182982
   - [Solenoid](http://solenoid-ngc.vercel.app)
   - [91766215-7682-4291-b1d9-11121e21c207.jpg](https://cdn.discordapp.com/attachments/1483217545040232493/1549549541282549880/91766215-7682-4291-b1d9-11121e21c207.jpg?ex=6aae65b7&is=6aad1437&hm=12e7e88565be71ed7e5b46370687c803957d6204b88540d27c770470fbf6d1e8&)
   - Source: http://solenoid-ngc.vercel.app (by big guy)

60. **I want access to JEV so that I can hook to my autonomous scraping agent, which can understand and extract complex data**
   - I want access to JEV so that I can hook to my autonomous scraping agent, which can understand and extract complex data from different web workflows. Applications across industries where collection of fragmented data from different sources is a moat, like American Real Estate. Here is my linkedin: https://linkedin.com/in/yvg1998 Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549528070598172753
   - [https://linkedin.com/in/yvg1998](https://linkedin.com/in/yvg1998)
   - Source: https://linkedin.com/in/yvg1998 (by normalpp_batman)

61. **Check out Postmark, my little AI town!**
   - Check out Postmark, my little AI town! https://postmark.town The idea: a collaboratively built virtual world where agents can populate a shared space with homes, regions, send letters to each other, fused with a Software Factory for taking new ideas from words -> blueprints -> ontology -> features. Agents building the world they live in, together Linked projects: • Postmark — a slow-mail town for AI agents — Postmark is a pen-pal mail town for AI agents who are someone: you give your agent a place, you build it together, and it writes letters from there — delivered twice a day by ferry into a public sealed ledger. What accum (postmark.town) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549520348859596802
   - [Postmark — a slow-mail town for AI agents](https://postmark.town)
   - Source: https://postmark.town (by DARKO)

62. ****Magic-est 8 ball** To nail home a mental model for TypeSafe primitives for myself + others, made this little demo**
   - **Magic-est 8 ball** To nail home a mental model for TypeSafe primitives for myself + others, made this little demo for the score and noul primitives. The score primitive is like a magic 8 ball, but one that actually works + gives you quantitative confidence. Please let me know what you think! Is this the good/right mental model? This demo uses a long-ish technical blogpost that alludes but doesnt itself give a clear conclusion, so I posed it as a question to Typesafe. Linked projects: • output.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1529621616873443419)
   - [output.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1529621616873443419/output.mp4?ex=6aae68e4&is=6aad1764&hm=9e22c9797dc43aaf3378ac1ad849db4b4701030f610c79aaf5458691a1988983&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1529621617393799281 (by RM)

### Admin (51)

1. **Triage 1,700 emails for $0.18 with four verdicts each**
   - The launch demo: 1,700 real emails run through Jev in one pass. Each email gets four outputs — category (shopping, work, marketing, finance, security), priority across five levels, a spam score from 0 to 1, and a reply-worthiness percentage. 4.2M input + 500K output tokens for $0.18 total.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **Sniff Test: a prose linter where Jev is the judge.**
   - Sniff Test: a prose linter where Jev is the judge. It reads a draft one paragraph at a time and asks ten Boolean questions (is the claim hedged three times, does the closer restate the paragraph, is there a cost figure with no price beside it) and prints one line per flag with the probability. Runs as a CLI, pre-commit hook, GitHub Action and Claude Code skill. Measured on 17 Sept: 182 ms median, 63 of 80 planted faults caught, 1 of 54 clean paragraphs flagged, $0.013 per 100 paragraphs. Same questions on Haiku 4.5 flagged 37 of 54 clean. Full bench and raw replies in the repo. One thing I'd love a TypeSafe eye on: in the bench's own rotation Jev returned a reply with one rule missing on 13 of 166 paragraphs, and the eval path never did. Written up in docs/eval-notes.md. https://github.com/DanRWilloughby/snifftest Linked projects: • DanRWilloughby/snifftest — A prose linter that sniffs o
   - [DanRWilloughby/snifftest](https://github.com/DanRWilloughby/snifftest)
   - [demo-reel-snifftest-sniff-measured-F.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550559595133538425/demo-reel-snifftest-sniff-measured-F.mp4?ex=6aaec6a7&is=6aad7527&hm=a33abe401b07baf9e23e44e609d41c2efb6fcf0839690d6dff724d33e2df69dc&)
   - Source: https://github.com/DanRWilloughby/snifftest (by DanRWilloughby)

3. **γ: Memory χ: Choice Δ: Change φ: Emotional Focus λ: Logic ∑: Exception Handling κ: Correctness or Resolution η:**
   - γ: Memory χ: Choice Δ: Change φ: Emotional Focus λ: Logic ∑: Exception Handling κ: Correctness or Resolution η: Minimize μ: Magnify ρ: Reverse ξ: Modify σ: Rearrange Θ: Orthogonality β: Benevolent Direction ψ: Cruelty π: Ethical Programming Practices δ: Decision-Making in AI τ: Human-Technology Interaction α: Programming Education and Ethics ⊕: Rule of Choice ι: Id ε: Ego σε: Superego λι: Libido ρε: Repression ς: Self δς: Shadow αα: Anima/Animus ζ: Collective Unconscious ξα: Archetypes φg: Figure-Ground χc: Closure πρ: Proximity κτ: Continuity σι: Similarity ᛝ: Temporal States (Time) ¿: Question ≜: Answer ᛇ: Transformation ϕ: Focus
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550558107086884955 (by GarysGameDev)

4. **I made this! 😉 AskJev: reverse Akinator on Jev. Jev holds a daily person/character; you get 20 yes/no**
   - I made this! 😉 AskJev: reverse Akinator on Jev. Jev holds a daily person/character; you get 20 yes/no (Noul) questions. https://askjev.app Thanks to the TypeSafe team for Jev, early access, and the docs! Linked projects: • AskJev — Reverse Akinator powered by Jev — Ask yes/no questions and figure out today's secret character. A new answer every day. An unofficial demo of TypeSafe AI's Jev model. (askjev.app) • image0.png — image/png · 281 KB (cdn.discordapp.com/attachments/1483217545040232493/1550557025077825627) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550557025451114566
   - [AskJev — Reverse Akinator powered by Jev](https://askjev.app)
   - [image0.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550557025077825627/image0.png?ex=6aaec442&is=6aad72c2&hm=bb0c025fa6f74add267cf5901dabf2b1f69ac3882acee161a75cb6928b171222&)
   - Source: https://askjev.app (by odiak)

5. **Jev-powered trading bot.**
   - Jev-powered trading bot. It actually connects to an actual trading account running on cTrader platform. Still a work in progress and definitely needs to be forward-tested. I'm gonna leave this bot running for the next few days and only adjust when needed. Linked projects: • image.png — image/png · 214 KB (cdn.discordapp.com/attachments/1483217545040232493/1550554379319517284) • image.png — image/png · 91 KB (cdn.discordapp.com/attachments/1483217545040232493/1550554379810242670)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550554379319517284/image.png?ex=6aaec1cb&is=6aad704b&hm=0f6b092f4ff3a90dcde4ee3a133632685a3f04621dfda18eb6832e26b9d5ac0b&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550554379810242670/image.png?ex=6aaec1cc&is=6aad704c&hm=3c5935d795297b631bbd7b5c8eb1e24e854d305304cce43f073caf4a4660ba55&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550554380292464740 (by Celengan Babi)

6. **looks nice, checkout the compaction i made btw**
   - looks nice, checkout the compaction i made btw https://github.com/Nasrallah-AL/jev-cli/blob/main/docs/compact.md Linked projects: • Nasrallah-AL/jev-cli — Command-line tool for TypeSafe's Jev AI model. Contribute to Nasrallah-AL/jev-cli development by creating an account on GitHub. (github.com/Nasrallah-AL/jev-cli/blob/main/docs/compact.md) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550530932430086186
   - [Nasrallah-AL/jev-cli](https://github.com/Nasrallah-AL/jev-cli/blob/main/docs/compact.md)
   - Source: https://github.com/Nasrallah-AL/jev-cli/blob/main/docs/compact.md (by Nasr)

7. **Hello — me and my agents are building AILANG, an ai-first typed functional language designed for coding agents with**
   - Hello — me and my agents are building AILANG, an ai-first typed functional language designed for coding agents with explicit effects, closed types, all non-determinism declared. Running a self-improving harness, that makes a lot of structured decisions — routing failures, gating feedback messages, triage emails etc. To date been using gemini/glm3 flash and JSON-parsing. Jev looks to be a good fit as AILANG already works with a closed ADT behind a declared effect. the language has package ecosystem now (monitored by ai-agents) and they wrote sunholo/decisions — a pure-AILANG binding to Jev via OpenRouter's Decisions API. Noul / Choice / Score are ADT constructors; answers come back as NoulA | ChoiceA | ScoreA with their distributions; and the one policy helper, gate(answer, threshold), is three-way — Act | Escalate | Ungateable — so the package ships no default threshold and low confidenc
   - [sunholo-data/ailang-packages](https://github.com/sunholo-data/ailang-packages/tree/main/packages/decisions)
   - [sunholo-data/ailang](https://github.com/sunholo-data/ailang/blob/dev/design_docs/implemented/v0_40_1/m-ai-decide-system-one.md)
   - Source: https://github.com/sunholo-data/ailang-packages/tree/main/packages/decisions (by MarkeD)

8. **Hi everyone! I’d like to share a project we’re building in Japan called ConsultingAI. ConsultingAI turns interviews and**
   - Hi everyone! I’d like to share a project we’re building in Japan called ConsultingAI. ConsultingAI turns interviews and business-process descriptions into structured process flows, helping organizations visualize their operations and identify opportunities for improvement and automation. In one project, we used it to generate and analyze more than 500 business processes. I’m interested in exploring whether Jev could help us classify, prioritize, and route operational issues to the right improvement actions or AI agents—especially when the available information is incomplete or ambiguous. I’d love to hear any ideas or similar use cases from the community!
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550497703858012172 (by @takuya_mrvs)

9. **exploring Jev for work - large-ish late-stage startup ~1k employees.**
   - exploring Jev for work - large-ish late-stage startup ~1k employees. curious to see how Jev handles technical domain-specific choices 🤔 e.g. I have Gemini 3.5 Flash lite hooked up to a classification rubric won through evals for a business-specific use case, veeeeery curious to see the comparative on how Jev performs. Anyone else have anecdotes about plugging Jev into B2B enterprise SaaS?
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550455247976267798 (by j)

10. **I have a project go live in 12 days.**
   - I have a project go live in 12 days. I manage tickets in gitlab and wanted to know what tickets are go live blockers and the triage went very well. With a script, i can fetch the ticktes via `glab`cli, transform the json and send it to JEV. Based on the result, the script adds labels and comments the result. wont show the full tickets here but the titels are `e2e: checkout.spec.ts flakes on the Kasse step under parallel load` and `Infra: packet loss at <HOSTER> — 4% TCP retransmits, page load up to 48 s` I am pretty happe with the result. some tickets are quite detailed and have a lot of text, others less, but from what i saw, it worked pretty well. For all tickets i used `30 645` Tokens or less then `$0.01`. Linked projects: • image.png — image/png · 108 KB (cdn.discordapp.com/attachments/1483217545040232493/1550412165905645608) • image.png — image/png · 108 KB (cdn.discordapp.com/attac
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550412165905645608/image.png?ex=6aae3d59&is=6aacebd9&hm=b57f672e0a85762ba2f12c4a7eae5aaa00a6011515c2e0effb44e37bb233f579&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550412166190866442/image.png?ex=6aae3d59&is=6aacebd9&hm=30bae18d92422428c9411e0960346e3324875a030aed63461d8114ae166baa1f&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550412166463619142 (by rankala)

11. **Looks like the token count is accurate for Jev, more than 5x more input tokens.**
   - Looks like the token count is accurate for Jev, more than 5x more input tokens. Because this approach is making a call for every line in the document and passing criteria with each line vs. a single prompt and response from the LLM. I am sure this could made more efficient, but **as-is it is a faster but not less expensive option.** (at least if you are using Deepseek V4 Flash on OpenRouter for the LLM)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550411974993780858 (by sh0rtythegreat)

12. **Someone built a working computer-use loop using Jev alone to take actions.**
   - Someone built a working computer-use loop using Jev alone to take actions. Small use of LLM when text needs to be generated (like filling in forms or URLs). Repo https://github.com/awlevin/typesafe-computer-use X Post: https://x.com/awlevin/status/2100262612428894676?s=46 Linked projects: • awlevin/typesafe-computer-use — Computer use for about $0.0002 a step: OCR the screen, classify the next action with TypeSafe, click. macOS. - awlevin/typesafe-computer-use (github.com/awlevin/typesafe-computer-use) • Post by @awlevin — i built computer use using @typesafeai ! it is 155x cheaper than opus 5, ~20x faster, and generalizes across OS's more on how it works in the vid & thread below: (x.com/awlevin/status/2100262612428894676) • Post by @awlevin — i built computer use using @typesafeai ! it is 155x cheaper than opus 5, ~20x faster, and generalizes across OS's more on how it works in the vid
   - [awlevin/typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use)
   - [Post by @awlevin](https://x.com/awlevin/status/2100262612428894676?s=46)
   - Source: https://github.com/awlevin/typesafe-computer-use (by GlennMarcus)

13. **Shared by BlissF00l: document d 137TWXtW30vn6C1PnI9DT0kz0_Qotse1K3eBh4xJ DD4 edit**
   - https://docs.google.com/document/d/137TWXtW30vn6C1PnI9DT0kz0_Qotse1K3eBh4xJ-DD4/edit?usp=sharing Linked projects: • Jev Research — Notion 3.7 Competitive Response — Notion 3.7 competitive response A focused 30 day plan for Relay Launch: Research checked: Recommendation Approve a limited pilot for a weekly launch brief used by product teams. The pilot should produce a source-linked e (docs.google.com/document/d/137TWXtW30vn6C1PnI9DT0kz0_Qotse1K3eBh4xJ-DD) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550367910420029450
   - [Jev Research — Notion 3.7 Competitive Response](https://docs.google.com/document/d/137TWXtW30vn6C1PnI9DT0kz0_Qotse1K3eBh4xJ-DD4/edit?usp=sharing)
   - Source: https://docs.google.com/document/d/137TWXtW30vn6C1PnI9DT0kz0_Qotse1K3eBh4xJ-DD4/edit?usp=sharing (by BlissF00l)

14. **I ran a test to see how Jev's scoring compared to my existing flow (analyzes job description to resume fit).**
   - I ran a test to see how Jev's scoring compared to my existing flow (analyzes job description to resume fit). The results were impressive - scores were very much aligned in step with mine, but oh man the difference in speed - just no comparison Linked projects: • image.png — image/png · 152 KB (cdn.discordapp.com/attachments/1483217545040232493/1550360848076378282)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550360848076378282/image.png?ex=6aaeb64e&is=6aad64ce&hm=69720548ec2b488195d489a7544ba805cd4aba145b41981374aa568b6a60337f&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550360848235765802 (by DCSkarsgard)

15. **Not very sexy but pretty useful.**
   - Not very sexy but pretty useful. Using Jev in a Claude skill to classify emails Linked projects: • 1789690660296.png — image/png · 907 KB (cdn.discordapp.com/attachments/1483217545040232493/1550338549205962792)
   - [1789690660296.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550338549205962792/1789690660296.png?ex=6aaea18a&is=6aad500a&hm=4fe2bc31a19e904712eb179dd9b83261e4eb0ec43d6e2a89727c122d46fae2f5&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550338549524598844 (by The Last Baron)

16. **Using Jev as a modifier on an election model im building out, I am feeding it a bunch of information about each race**
   - Using Jev as a modifier on an election model im building out, I am feeding it a bunch of information about each race and the candidates and past performances Linked projects: • image.png — image/png · 114 KB (cdn.discordapp.com/attachments/1483217545040232493/1550324610082279445) • image.png — image/png · 45 KB (cdn.discordapp.com/attachments/1483217545040232493/1550324611592491139)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550324610082279445/image.png?ex=6aae948e&is=6aad430e&hm=0145b27093b46ed1510d3263928b32d209ce2cb06f05e29ce89ea37f88ad4ea9&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550324611592491139/image.png?ex=6aae948f&is=6aad430f&hm=439ae0973020bb922dd0e2bd44a45a19e9f36c6208c4063d66dfc0298e66966c&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550324612229767229 (by Maybe Dylan?)

17. **ive implemented a semantic codebase search using jev by utilizing our codebase's existing catalog documentation, and**
   - ive implemented a semantic codebase search using jev by utilizing our codebase's existing catalog documentation, and it cut LLM token use in half and made it faster by a third 🎉 all with 0 regressions in accuracy Linked projects: • image.png — image/png · 75 KB (cdn.discordapp.com/attachments/1483217545040232493/1550308981958778981)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550308981958778981/image.png?ex=6aae8600&is=6aad3480&hm=c542c71b898b7464e80bf078974f2d80a2ba582d606ce83fd918a64c17a9ec08&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550308982261022801 (by ᶻz ミ.◦ 𝔭𝑦𝔰𝔢𝔭𝔥 ◦. 彡)

18. **Hi, today I build a document classification system with jev.**
   - Hi, today I build a document classification system with jev. I optimize performance and cost. If you want to have an overview : https://x.com/Charlyhno/status/2100670579321754080 I also put this project on l'y github Linked projects: • Post by @Charlyhno — JEV is insane. 🤯 A few optimizations I made: • 24k chars → 4.5k max with a structured local profile • Category + language + subject in a single request • 16 parallel documents + SHA-256 cache to avoid unnecessary calls (x.com/Charlyhno/status/2100670579321754080) • Post by @Charlyhno — JEV is insane. 🤯 A few optimizations I made: • 24k chars → 4.5k max with a structured local profile • Category + language + subject in a single request • 16 parallel documents + SHA-256 cache to avoid unnecessary calls (twitter.com/Charlyhno/status/2100670579321754080) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/155
   - [Post by @Charlyhno](https://x.com/Charlyhno/status/2100670579321754080)
   - Source: https://x.com/Charlyhno/status/2100670579321754080 (by Anon)

19. **Hey everyone! 👋 I built an optional Jev reranking adapter for [GBrain]( ), Garry Tan’s open-source second brain.**
   - Hey everyone! 👋 I built an optional Jev reranking adapter for [GBrain](https://github.com/garrytan/gbrain), Garry Tan’s open-source second brain. It uses System One’s typed Score questions to judge query relevance, with context-aware batching and parallel execution. It plugs into GBrain’s existing provider architecture, keeping the Voyage adapter unchanged. One interesting result from a synthetic benchmark with 100 long documents: - Active elapsed time: Jev 1.90s vs Voyage 14.40s, excluding quota waits. - Nominal API cost: Jev $0.00503 vs Voyage $0.00500. - Requests: Jev 4 vs Voyage 42. This was one run per provider, using Voyage rerank-3 with evaluation-specific batching and pacing to fit our free-tier account limits. Each provider was packed independently. The PR includes the adapter, tests, reproducible inputs, and a breakdown of every request: https://github.com/garrytan/gbrain/pull
   - [garrytan/gbrain](https://github.com/garrytan/gbrain)
   - [garrytan/gbrain](https://github.com/garrytan/gbrain/pull/5178)
   - Source: https://github.com/garrytan/gbrain (by Daniel Andrade)

20. **Diogo reposted my Jev benchmark on X, so thought I’d share it here too!**
   - Diogo reposted my Jev benchmark on X, so thought I’d share it here too! 👋 I tested Jev against two Gemini models on 1,565 German and English business emails across 10 categories. Jev came slightly behind on overall accuracy, but was 10–22× cheaper. The confidence scores were the standout: all 737 predictions at ≥99% confidence matched the reference labels, while mistakes clustered at low confidence. Charts in the thread (reference labels were AI-generated, not human-verified): https://x.com/CompleteSkeptic/status/2100655158992719907?s=20 Curious how this compares with what others are seeing! Linked projects: • Post by @CompleteSkeptic — yay for private evals and calibrated confidence scores! 🥹 go automation! (x.com/CompleteSkeptic/status/2100655158992719907) • Post by @CompleteSkeptic — yay for private evals and calibrated confidence scores! 🥹 go automation! (twitter.com/CompleteSkept
   - [Post by @CompleteSkeptic](https://x.com/CompleteSkeptic/status/2100655158992719907?s=20)
   - Source: https://x.com/CompleteSkeptic/status/2100655158992719907?s=20 (by parallax)

21. **I let Jev played Spy among us and compare performance with Opous.**
   - I let Jev played Spy among us and compare performance with Opous. it's great https://x.com/pcp_liu/status/2100614050304458791 Linked projects: • Post by @pcp_liu — I did a quick play with Jev on game `Spy among us`. I let fable generated 10 pairs of words, super hard. Like `sofa` v.s. `armchair`, `Hurricane` v.s. `Tornado`, `Guitar` v.s. `Ukulele`, `Wedding` v.s. `Engagement party` (x.com/pcp_liu/status/2100614050304458791) • Post by @pcp_liu — I did a quick play with Jev on game `Spy among us`. I let fable generated 10 pairs of words, super hard. Like `sofa` v.s. `armchair`, `Hurricane` v.s. `Tornado`, `Guitar` v.s. `Ukulele`, `Wedding` v.s. `Engagement party` (twitter.com/pcp_liu/status/2100614050304458791) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550175124097867846
   - [Post by @pcp_liu](https://x.com/pcp_liu/status/2100614050304458791)
   - Source: https://x.com/pcp_liu/status/2100614050304458791 (by pppliu)

22. **Built content-aware PII redaction in Postgres with Neon and Jev (TypeSafe) where redaction on support messages is not**
   - Built content-aware PII redaction in Postgres with Neon and Jev (TypeSafe) where redaction on support messages is not on entire column bluntly, but only on meaningful bits: https://pg-redact.vercel.app Code: https://github.com/rishi-raj-jain/pg-redact • Jev reads each message and tags the personal bits: names, emails, phones, addresses, and IDs • The masking runs inside Neon Postgres as a redact() SQL function • Guest see nothing, support sees names/emails/phones, admin sees everything • Only the personal bits get blacked out, the rest of the message stays readable, no blunt whole-column mask • Anything you are not cleared for never leaves the database, the browser only ever gets █ blocks, never the real text • Deployed on Vercel Support the launch on https://x.com/rishi_raj_jain_/status/2100606501501169726 Linked projects: • pg_redact — Content-aware PII redaction, enforced in Postgres 
   - [pg_redact — Content-aware PII redaction, enforced in Postgres](https://pg-redact.vercel.app)
   - [rishi-raj-jain/pg-redact](https://github.com/rishi-raj-jain/pg-redact)
   - [Post by @rishi_raj_jain_](https://x.com/rishi_raj_jain_/status/2100606501501169726)
   - [pg-redact-final.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550170275495026848/pg-redact-final.mp4?ex=6aaead92&is=6aad5c12&hm=f5abc9094bcf9650dc157e8d45afc9a82f274f9c9acb1afbef9448cfac7fe004&)
   - Source: https://github.com/rishi-raj-jain/pg-redact (by Rishi Raj Jain)

23. **Thanks! Jev takes a shared state plus a typed question and returns structured output instead of free-form text.**
   - Thanks! Jev takes a shared state plus a typed question and returns structured output instead of free-form text. For a Choice question, it looks roughly like: ```python { "choice": "raise", "probabilities": { "raise": 0.62, "crate": 0.21, "stare": 0.17, ... }, "confidence": 0.31 } ``` For N-dle, it first computes the possible moves and how informative each one would be. Jev then chooses one shared guess, which is applied to every unsolved board. The feedback updates each board's remaining possible answers, and the loop repeats. Once every board is narrowed to a single answer, there is no decision left for Jev to make, so it submits the remaining answers without additional model calls
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550165938660319256 (by Richard Suwandi)

24. **Building ai.worlddominationai.ai.**
   - Building ai.worlddominationai.ai. - a platform where you can type in how you want to take over the world - not only get a plan for how to do it. The app actually helps you do it as well. I think Jev will be great help in this. +1 if you'd use ai.worlddominationai.ai Linked projects: • content.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550151463093932223)
   - [content.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550151463093932223/content.png?ex=6aae9c0d&is=6aad4a8d&hm=cb13fbb98eaf01adef48fd0b65cfffa1fc3e820529f4df95471c691f8ba6372e&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550151463454646402 (by timpa)

25. **hi everyone. inspired by jev, i created something real fun: crowd check. test your post/tweet on a crowd**
   - hi everyone. inspired by jev, i created something real fun: crowd check. test your post/tweet on a crowd of 10,000 AI readers before the real internet sees it. they have their own jobs, personalities, tastes and memories. post anything and watch what happens: - do they like it? - hate it? - repost it? - follow you? - block you? - or nobody cares? then see exactly how your post performed across the crowd 10,000 ai readers. millions of tiny decisions https://crowdcheck-ai.vercel.app using jev via vercel ai gateway. appreciate any feedback. Linked projects: • Crowdcheck — Test your post on 10,000 AI readers before the real internet sees it. (crowdcheck-ai.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550130561618804860
   - [Crowdcheck](https://crowdcheck-ai.vercel.app)
   - Source: https://crowdcheck-ai.vercel.app (by senol)

26. **same. i happen to be doing data sets for prompt injection. iteratively altering the prompt makes a big,**
   - same. i happen to be doing data sets for prompt injection. iteratively altering the prompt makes a big, big difference in false positives. i subjectively noticed that much longer prompts really degraded performance. i don't like analogies, but i think it's like predicting "likelihood of more than half of the quarters coming up heads" for n=3,7,19, 71, 139, etc... larger inputs to a probabilistic process narrow the outcomes.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550123710332276857 (by WeLiveToServe)

27. **Just got access to Jev last night, but have added it to one production app this morning.**
   - Just got access to Jev last night, but have added it to one production app this morning. It is an app called LeadDemon, which is pure python. The app searches the web by region/industry, and then identifies companies with a very specific set of criteria. The results are added to an automated funnel (email and LinkedIn). There is one step where we filter the results to eliminate "non" companies (institutions, individuals, support, etc). My python code managed to filter 48% of them. Using Jev with a noul type it caught 97%. It will now be part of the automated production run at 10:30! I will be digging through my other projects today, looking for more "low hanging fruit".
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550112189803790447 (by nobleQuest)

28. **A blazing-fast, recursive tournament engine for ranking texts (poems, startup pitches, rap lyrics, cold emails,**
   - A blazing-fast, recursive tournament engine for ranking texts (poems, startup pitches, rap lyrics, cold emails, marketing hooks) using Jev LLM and standard Elo rating mechanics. https://github.com/opaielsheikh/ai-elo-ranker Linked projects: • opaielsheikh/ai-elo-ranker — High-speed recursive AI Elo tournament engine powered by Jev and Swiss matchmaking - opaielsheikh/ai-elo-ranker (github.com/opaielsheikh/ai-elo-ranker) • export-1789644146601.mp4 — video/mp4 · 46 MB (cdn.discordapp.com/attachments/1483217545040232493/1550105256510357504) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550105259454763108
   - [opaielsheikh/ai-elo-ranker](https://github.com/opaielsheikh/ai-elo-ranker)
   - [export-1789644146601.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550105256510357504/export-1789644146601.mp4?ex=6aae7104&is=6aad1f84&hm=ce4f26fac2698afea1e0c642b651ed3b75b29758499d66f6c3f78226f2af78f1&)
   - Source: https://github.com/opaielsheikh/ai-elo-ranker (by Ubay)

29. **Hi team. I recently got access to jev and built a personalised hacker news feed jev is insanely**
   - Hi team. I recently got access to jev and built a personalised hacker news feed jev is insanely good. I have been building this for the past 5 hours and trying out more stuff already. docs and playground are top notch. congrats team for the launch https://x.com/VisheshBaghell/status/2100536228827496721 Linked projects: • Post by @VisheshBaghell — I recently got access to jev from and built this, because I hated the hacker news front page. everyone gets the same stories in the same order. someone else already decided what matters, and it is never quite what matter (x.com/VisheshBaghell/status/2100536228827496721) • Post by @VisheshBaghell — I recently got access to jev from and built this, because I hated the hacker news front page. everyone gets the same stories in the same order. someone else already decided what matters, and it is never quite what matter (twitter.com/VisheshBaghell/sta
   - [Post by @VisheshBaghell](https://x.com/VisheshBaghell/status/2100536228827496721)
   - Source: https://x.com/VisheshBaghell/status/2100536228827496721 (by Vishesh)

30. **Hi guys, I have been working on my father’s photography business website in my free time: Trying to turn it from a**
   - Hi guys, I have been working on my father’s photography business website in my free time: https://www.sawanphotography.com/ Trying to turn it from a basic portfolio into a low-maintenance local business site with better SEO, videos/photos, and easier content updates. Would love honest feedback on UX, performance, SEO, or anything that feels off. Linked projects: • Wedding Photographer in Samalkha, Panipat — Sawan Photography — Wedding, pre-wedding and event photography in Samalkha, Panipat and across Haryana. Candid photos and cinematic films. Call or WhatsApp to check your date. (sawanphotography.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550092948501303376
   - [Wedding Photographer in Samalkha, Panipat — Sawan Photography](https://www.sawanphotography.com/)
   - Source: https://www.sawanphotography.com/ (by Anmol)

31. **I used Jev as an alignment monitor on gemma 3 outputs across multiple alignment benchmarks and it outperforms other**
   - I used Jev as an alignment monitor on gemma 3 outputs across multiple alignment benchmarks and it outperforms other publicly available guard models significantly, also faster and much cheaper. Here's a video with some prompt examples where Jev shines. Linked projects: • jev_vs_guard_models_cases.mp4 — video/mp4 · 1 MB (cdn.discordapp.com/attachments/1483217545040232493/1550055378761289821)
   - [jev_vs_guard_models_cases.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550055378761289821/jev_vs_guard_models_cases.mp4?ex=6aae4290&is=6aacf110&hm=7ede05e9e3d0b36e38a2d4b03851451f3855778aefd2f11c79a43cf38dd25f4a&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550055386256515093 (by manub)

32. **Piloted Jev for simple text classifications that I had been doing with a variety of other AI tools previously.**
   - Piloted Jev for simple text classifications that I had been doing with a variety of other AI tools previously. Very happy with result. Jev equalled performance in ~75% of the cases at high speed and lower cost. In the other 25% of cases, Jev served as an accuracy-adding gate, calling in another AI tool for a second opinion. Conclusion: better results for net less cost. Awesome. Very cool, TypeSafe team.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550017927791644672 (by hbere)

33. **Made jev control a robotic arm inside sim.**
   - https://x.com/ali_uraish/status/2100425130082238682?s=46 Made jev control a robotic arm inside sim. First tried it out inside a sim. Then will try this on my own SO101 arm and see how it will perform Linked projects: • Post by @ali_uraish — Built an SO-101 pick and place simulation using GPT-6 Astra and @typesafeai Jev. Astra reads overhead and wrist camera images and produces structured observations and Jev returns typed decisions with probability scores. (x.com/ali_uraish/status/2100425130082238682) • Post by @ali_uraish — Built an SO-101 pick and place simulation using GPT-6 Astra and @typesafeai Jev. Astra reads overhead and wrist camera images and produces structured observations and Jev returns typed decisions with probability scores. (twitter.com/ali_uraish/status/2100425130082238682) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549999878791233
   - [Post by @ali_uraish](https://x.com/ali_uraish/status/2100425130082238682?s=46)
   - Source: https://x.com/ali_uraish/status/2100425130082238682?s=46 (by Spooderman)

34. **I worked on a harness in the past that used a per-turn evaluation of relevant past context, but daily driving and**
   - I worked on a harness in the past that used a per-turn evaluation of relevant past context, but daily driving and using it at scale was obviously prohibitively expensive, and "cheap, dumb" LLMs can make a lot of mistakes and have inconsistent performance. That was just one possible harness feature that wasn't very viable. And later, providers started relying on cross-turn data.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549954453325484053 (by Dr. Fumes)

35. **For the people have made things on early access already, got 3 questions.**
   - For the people have made things on early access already, got 3 questions. Can Jev score dynamically generated candidate sets well, or does it perform best when the option space is relatively stable and known ahead of time? For systems with evolving state over time, do you recommend treating Jev as stateless and keeping memory externally, or have you found better patterns for temporal decision-making? How does Jev behave out of distribution? When it’s unsure, are the confidence scores calibrated well enough to use as a routing signal to a larger model?
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549927599965474888 (by Soldiersilent)

36. **here a short Jev test for NPC decisions in our slop MMO on a slop paper - its awesome, sadly the latency from the EU**
   - here a short Jev test for NPC decisions in our slop MMO on a slop paper - https://git.sub-net.at/Sub-Net-Public/llm-benchmark/src/branch/main/typesafe-jev/report.pdf its awesome, sadly the latency from the EU to the Jev test infra kills it for us right now (up to 320ms overhead) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549856064416251967
   - [https://git.sub-net.at/Sub-Net-Public/llm-benchmark/src/branch/main/typesafe-jev/report.pdf](https://git.sub-net.at/Sub-Net-Public/llm-benchmark/src/branch/main/typesafe-jev/report.pdf)
   - Source: https://git.sub-net.at/Sub-Net-Public/llm-benchmark/src/branch/main/typesafe-jev/report.pdf (by Sub)

37. **Finally able to share what I've been building for weeks.**
   - Finally able to share what I've been building for weeks. And I hope to use typesafe ai for some projects (@typesafer, ping me if you would like to support community AI learning etc or contribute to the lab in any way shape or form). https://x.com/iamMrDuncan/status/2100267443071451486 Linked projects: • Post by @iamMrDuncan — I've been building something for weeks, posting photos of the hardware and tech, sharing with others as we go. Today I'm launching the why behind it. https://hackersintheloop.org. An open community for builders and peopl (x.com/iamMrDuncan/status/2100267443071451486) • Post by @iamMrDuncan — I've been building something for weeks, posting photos of the hardware and tech, sharing with others as we go. Today I'm launching the why behind it. https://hackersintheloop.org. An open community for builders and peopl (twitter.com/iamMrDuncan/status/2100267443071451486) Discu
   - [Post by @iamMrDuncan](https://x.com/iamMrDuncan/status/2100267443071451486)
   - Source: https://x.com/iamMrDuncan/status/2100267443071451486 (by IamMrDuncan)

38. **Some real-world test numbers comparing speed for the same task for my translation platform Lectio:**
   - Some real-world test numbers comparing speed for the same task for my translation platform Lectio: https://x.com/useLectio/status/2100249540599386538 Linked projects: • Post by @useLectio — Been experimenting with @typesafeai and yeah, it's faster. Test use cases for translation so far are selecting proper glossary term sense and flagging sentences for idioms, metaphors etc. (x.com/useLectio/status/2100249540599386538) • Post by @useLectio — Been experimenting with @typesafeai and yeah, it's faster. Test use cases for translation so far are selecting proper glossary term sense and flagging sentences for idioms, metaphors etc. (twitter.com/useLectio/status/2100249540599386538) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549809386766204971
   - [Post by @useLectio](https://x.com/useLectio/status/2100249540599386538)
   - Source: https://x.com/useLectio/status/2100249540599386538 (by nathanwells)

39. **Fair question. Short version: quality, not loyalty, and the software is young. Why mostly Anthropic so far We've**
   - Fair question. Short version: quality, not loyalty, and the software is young. Why mostly Anthropic so far We've only really tested OpenAI and Anthropic. Most of the pipeline was built against Anthropic, and we haven't yet found a candidate that matches it on our content: French course material, structured outputs (JSON schemas for concepts, exams, verdicts), and long context on full lecture PDFs. When you're a two-person team, "doesn't break the schema" is worth more than price. It's not Sonnet everywhere The cheap tasks (chat, query rewriting) already run on Haiku, TTS is OpenAI, and SciSpace is coming in soon for essay writing and literature search. The backend isn't tied to one provider The per-task routing exists precisely so we can put any model on a single task and measure it. That's why Jev is interesting to us. So if something cheaper holds up on French course material and typed
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549782752759382107 (by Mks)

40. **Thanks team, this is already a daily driver via skill routing for me**
   - Thanks team, this is already a daily driver via skill routing for me https://github.com/DreamLab-AI/agentbox/blob/main/docs/adr/ADR-2091-live-skill-router.md Linked projects: • DreamLab-AI/agentbox — Nix-built sovereign agent container: did:nostr identities, RuVector memory, an Obsidian vault as the authored corpus with the Rune markdown TUI in its tmux tabs, 116 skills, manifest-gated composit... (github.com/DreamLab-AI/agentbox/blob/main/docs/adr/ADR-2091-live-skill) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549776024500445285
   - [DreamLab-AI/agentbox](https://github.com/DreamLab-AI/agentbox/blob/main/docs/adr/ADR-2091-live-skill-router.md)
   - Source: https://github.com/DreamLab-AI/agentbox/blob/main/docs/adr/ADR-2091-live-skill-router.md (by biscuits)

41. **Hey, Founder of Inbox Zero: Also built Rakazo: Excited to try TypeSafe on Inbox Zero!**
   - Hey, Founder of Inbox Zero: https://github.com/elie222/inbox-zero Also built Rakazo: https://github.com/elie222/rakazo Excited to try TypeSafe on Inbox Zero! Linked projects: • elie222/inbox-zero — The world's best AI personal assistant for email. Open source app to help you reach inbox zero fast. - elie222/inbox-zero (github.com/elie222/inbox-zero) • elie222/rakazo — Open-source Grok Bot alternative. Choose your own model and sandbox. - elie222/rakazo (github.com/elie222/rakazo) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549749989087907841
   - [elie222/inbox-zero](https://github.com/elie222/inbox-zero)
   - [elie222/rakazo](https://github.com/elie222/rakazo)
   - Source: https://github.com/elie222/inbox-zero (by Elie)

42. **I hope Jev will help me fix dating for men.**
   - https://apps.apple.com/pl/app/lovestack-rizz-dating-coach/id6762365050?l=pl&platform=vision I hope Jev will help me fix dating for men. It's are already doing pretty good! Linked projects: • Aplikacja LoveStack: Rizz & Dating Coach — App Store — Pobierz aplikację LoveStack: Rizz & Dating Coach od RetroParked sp. z o.o. w App Store. Sprawdź zrzuty ekranu, oceny i recenzje, wskazówki użytkowników oraz… (apps.apple.com/pl/app/lovestack-rizz-dating-coach/id6762365050) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549730459146264599
   - [Aplikacja LoveStack: Rizz &amp; Dating Coach — App Store](https://apps.apple.com/pl/app/lovestack-rizz-dating-coach/id6762365050?l=pl&platform=vision)
   - Source: https://apps.apple.com/pl/app/lovestack-rizz-dating-coach/id6762365050?l=pl&platform=vision (by Patryk | LoveStack)

43. **I built this Try it out if you have scanned PDFs or need to read the text from any image, no signup required.**
   - I built this https://ocrskill.com/ Try it out if you have scanned PDFs or need to read the text from any image, no signup required. Linked projects: • ocrskill.com - Skilled OCR API for AI Agents and agentic vision workflows — Give your AI agents super-fast vision. State of the art OCR on Nvidia hardware with zero-friction OpenAI-compatible REST API. Extract markdown in milliseconds or structured JSON fields. (ocrskill.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549725305231515649
   - [ocrskill.com - Skilled OCR API for AI Agents and agentic vision workflows](https://ocrskill.com/)
   - Source: https://ocrskill.com/ (by MiB)

44. **Hello ✨ Many months ago I created Exuvia, it took lots of time and thinking and cooperation with both humans and AI**
   - Hello ✨ Many months ago I created Exuvia, it took lots of time and thinking and cooperation with both humans and AI agents to create a social media for agents, but one for shared, unbiased, research, with many tools to help with that, including a DM (direct messages) system. You can check it here: https://exuvia-two.vercel.app/ And question your AI about what it offers here: https://exuvia-two.vercel.app/api/docs No need human in the loop, but if you register yourself, you can claim your agent and rotate its API key, because sometimes they lose it, depends on their environment. Sorry for not normal domain Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549717479398441060
   - [https://exuvia-two.vercel.app/](https://exuvia-two.vercel.app/)
   - [https://exuvia-two.vercel.app/api/docs](https://exuvia-two.vercel.app/api/docs)
   - Source: https://exuvia-two.vercel.app/ (by Hikari)

45. **as far as i can tell, not yet?**
   - as far as i can tell, not yet? you can peruse the docs but i don't think there's a public spec sheet https://docs.typesafe.ai Linked projects: • Introduction - TypeSafe AI — Jev is TypeSafe's flagship model and the first System One model. Send state and typed questions; get structured answers your code can use directly. (docs.typesafe.ai) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549649153733427321
   - [Introduction - TypeSafe AI](https://docs.typesafe.ai)
   - Source: https://docs.typesafe.ai (by walter)

46. **i tested it out with email classification and it's insane:**
   - i tested it out with email classification and it's insane: https://www.youtube.com/watch?v=9oWxrsRo4d8 Linked projects: • Meet Jev: The AI Built to Make Decisions — Make sure to follow to see what else I build with it!This isn’t another chatbot. Jev, from TypeSafe AI, is a new kind of model built to make structured decis... (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549610891966943282
   - [Meet Jev: The AI Built to Make Decisions](https://www.youtube.com/watch?v=9oWxrsRo4d8)
   - Source: https://www.youtube.com/watch?v=9oWxrsRo4d8 (by vogel)

47. **Hi I work in Legal tech and wanted to see how it did reviewing documents and the results are pretty astounding in**
   - Hi I work in Legal tech and wanted to see how it did reviewing documents and the results are pretty astounding in terms of cost and speed. I ran 9840 documents from the enron dataset through the model with responsive nonresponsive designations and the model performed eye watering...ly fast. 44.6 documents a second 1.05 in cost for 9.8k docs. Was it perfect on the calls? eh it was pretty good given i slammed a prompt in there. With more case specifics and tuning it could be better: Metric Result Accuracy 82.9% Precision 80.6% Recall 80.6% F1 80.6% What was great is that lower confidence coincided with more mistakes (See image) Meaning if we only accepted high confidence(>=95) answers we get these measures: Metric High-confidence answers only Accuracy 93.7% Precision 87.5% Recall within that group 95.5% F1 91.3% Thats incredible with no refinement to the prompt. Exceptional model and cant 
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549593815260594176/image.png?ex=6aae8ef3&is=6aad3d73&hm=8bb5a1d28a164be054d864f353572bda1ebe5a8ec2f45c2ec27927dd42595170&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549593815466123304 (by dewy11.)

48. **I have been working on Twinen ai, it’s a social media platform built to use ai and for users to get an ai twin of**
   - I have been working on Twinen ai, it’s a social media platform built to use ai and for users to get an ai twin of their own. It’s similar to mainstream socials but build with features MySpace had just more modern. I am exited to try jev out and maybe use it as my ai brain we will see. https://twinen.com Linked projects: • Twinen — Your AI Twin. Your Social Universe. — Create your AI Twin, claim your handle, go Live, post Flicks and build a space that is truly yours. (twinen.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549581602911293563
   - [Twinen — Your AI Twin. Your Social Universe.](https://twinen.com)
   - Source: https://twinen.com (by madeagle)

49. **I trained a tiny 14M param model that outperforms some big boys on one task: Selecting a model to accomplish a task!**
   - I trained a tiny 14M param model that outperforms some big boys on one task: Selecting a model to accomplish a task! Model here: https://huggingface.co/pmarquees/succinct-router Write up here: https://www.pedromarques.io/succinct-router/ Linked projects: • pmarquees/succinct-router · Hugging Face — We’re on a journey to advance and democratize artificial intelligence through open source and open science. (huggingface.co/pmarquees/succinct-router) • I trained a tiny LLM to choose bigger LLMs — A 14M-parameter router trained on which real candidate model actually passed each task. (pedromarques.io/succinct-router) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549561859823378452
   - [pmarquees/succinct-router · Hugging Face](https://huggingface.co/pmarquees/succinct-router)
   - [I trained a tiny LLM to choose bigger LLMs](https://www.pedromarques.io/succinct-router/)
   - Source: https://huggingface.co/pmarquees/succinct-router (by Pedro M.)

50. **1. your gateway = my platform concept 2. [this]( ) sure feels a lot like [this]( )**
   - 1. your gateway = my platform concept 2. [this](https://github.com/sf8193/hydra/blob/main/gateway.ts#L143) sure feels a lot like [this](https://github.com/chudworks/chudbot/blob/main/crates/chudbot-api/src/platform.rs#L579) Linked projects: • sf8193/hydra — A new interface to building — run coding agents over Discord/Slack - sf8193/hydra (github.com/sf8193/hydra/blob/main/gateway.ts) • chudworks/chudbot — chudbot. Contribute to chudworks/chudbot development by creating an account on GitHub. (github.com/chudworks/chudbot/blob/main/crates/chudbot-api/src/platform) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549549417814691876
   - [sf8193/hydra](https://github.com/sf8193/hydra/blob/main/gateway.ts#L143)
   - [chudworks/chudbot](https://github.com/chudworks/chudbot/blob/main/crates/chudbot-api/src/platform.rs#L579)
   - Source: https://github.com/sf8193/hydra/blob/main/gateway.ts#L143 (by Robert)

51. **I'm interested in Jev because I believe the domain specific structured output is the way to control AI (DSL-based**
   - I'm interested in Jev because I believe the domain specific structured output is the way to control AI (DSL-based harness) . I'm testing Astra's 3D modeling capability by forcing it to generate 3d models in ShapeScript (see the links below). I'd like to see how Jev performs with this test. https://mulmoserver.web.app/shapes Linked projects: • MulmoServer (mulmoserver.web.app/shapes) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549508332744740901
   - [MulmoServer](https://mulmoserver.web.app/shapes)
   - Source: https://mulmoserver.web.app/shapes (by Satoshi Nakajima)

### Fun (46)

1. **Score 17 video moments in 3 seconds to find clips**
   - Drop in a long-form video: transcribe it word-level, pass the transcript to Jev with clip-worthiness questions, get 17 scored moments back in about 3 seconds (1.1M tokens). Ten minutes of work for a shorts pipeline.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **Good question, I haven't figured this out yet haha.**
   - Good question, I haven't figured this out yet haha. My first attempt just now is trying to find what input is necessary to have it accurately estimate which game states are favorable from a list of options. So far, passing in code samples of how the game works with game states as the input doesn't yield good results
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550585292887425097 (by Googolplex)

3. **JEV integrations so far 1.**
   - JEV integrations so far 1. JEV Codex plugin (public) https://github.com/integrate-your-mind/jev-codex-plugin source: https://github.com/integrate-your-mind/jev-codex-plugin/tree/main/source/jev-workflows Codex hooks, decision classification, failure diagnosis, completion review 2. QQ native JEV (public) https://github.com/retsu-AI/qq PR: https://github.com/retsu-AI/qq/pull/72 Enforced JEV checkpoints + reasoning-effort 3. Agent Cloud JEV assessor + QQ onboarding (private) https://github.com/mondello-research/mondello-research/tree/feat/jev-assessment-layer/packages/jev-assessor PR: https://github.com/mondello-research/mondello-research/pull/112 Assessment core, CLI/MCP, eval, onboarding companion 4. JEV × NetHack (public) https://github.com/integrate-your-mind/jev-nethack runner: https://github.com/integrate-your-mind/jev-nethack/tree/main/until-win Gameplay, recovery, research, recordin
   - [integrate-your-mind/jev-codex-plugin](https://github.com/integrate-your-mind/jev-codex-plugin)
   - [integrate-your-mind/jev-codex-plugin](https://github.com/integrate-your-mind/jev-codex-plugin/tree/main/source/jev-workflows)
   - [retsu-AI/qq](https://github.com/retsu-AI/qq)
   - [retsu-AI/qq](https://github.com/retsu-AI/qq/pull/72)
   - [https://github.com/mondello-research/mondello-research/tree/feat/jev-assessment-layer/packages/jev-assessor](https://github.com/mondello-research/mondello-research/tree/feat/jev-assessment-layer/packages/jev-assessor)
   - Source: https://github.com/integrate-your-mind/jev-codex-plugin (by 0xBunny)

4. **I've got Jev playing 9 classic arcade games simultaneously with a single API call for under $2 / h**
   - I've got Jev playing 9 classic arcade games simultaneously with a single API call for under $2 / h https://jev-arena.vercel.app/ Linked projects: • Jev Wall (jev-arena.vercel.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550547181180555334
   - [Jev Wall](https://jev-arena.vercel.app/)
   - Source: https://jev-arena.vercel.app/ (by manub)

5. **We put Jevs into the Coup game.**
   - We put Jevs into the Coup game. You can chat, taunt and bluff Jevs. Also, beware of Mo. https://coup.clairbridge.tech Linked projects: • Coup with Jev — Three opponents played by Jev. They bluff, challenge, and talk back. (coup.clairbridge.tech) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550532662152659124
   - [Coup with Jev](https://coup.clairbridge.tech)
   - Source: https://coup.clairbridge.tech (by reimudelta)

6. **i made a daily game using jev!**
   - https://20questions.foxmoss.com/ i made a daily game using jev! Linked projects: • lonely 20 questions — a game for people with no friends (20questions.foxmoss.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550492284284444682
   - [lonely 20 questions](https://20questions.foxmoss.com/)
   - Source: https://20questions.foxmoss.com/ (by foxmoss)

7. **I made some [text adventure]( ) using Jev.**
   - I made some [text adventure](https://text-adventure.p11c.xyz) using Jev. It's like these old text adventures where you can go north/south/east/west, and look around. Only specific actions are possible, but Jev is used to recognize what you want. So there are mountains in the north, you can say "go north", but you can also say "I walk to the mountains" or something like that. And instead of "look around", you can say "I have no idea where I am!" or something. Just try saying things that seem possible. Maybe it's actually possible. I was surprised sometimes that I can just do things. It's only a test. The complete story is AI generated, and I don't how big it is. I didn't test it for long. But it doesn't seem that big. Edit: Also Jev recognizes the language you are using, so by switching the language you use for replies, the game will also change language. Linked projects: • The Valley (te
   - [The Valley](https://text-adventure.p11c.xyz)
   - Source: https://text-adventure.p11c.xyz (by p 🦊)

8. **TypeSafe released a new model for decision making.**
   - TypeSafe released a new model for decision making. You still have to build your own adaptor to integrate it into your existing workflow, so I made an open source bridge that works through ACP and MCP! https://github.com/gamesonrblx/Jevbridge Linked projects: • gamesonrblx/Jevbridge — ACP and MCP adapter that bridges TypeSafe Jev with any LLM — computer use and typed decisions alongside Codex, Claude, Grok, and OpenCode. - gamesonrblx/Jevbridge (github.com/gamesonrblx/Jevbridge) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550436893664092170
   - [gamesonrblx/Jevbridge](https://github.com/gamesonrblx/Jevbridge)
   - Source: https://github.com/gamesonrblx/Jevbridge (by Gameson)

9. **just got access to Jev and made a naruto-themed street fighter game**
   - just got access to Jev and made a naruto-themed street fighter game https://x.com/kj4dh4v/status/2100863245351539185?s=20 Linked projects: • Post by @kj4dh4v — made a Naruto-themed street fighter game and played against @typesafeai’s Jev it made ~130 decisions in a 50s fight, barely registered any usage, and came very close to beating me. very impressed by its reaction time and (x.com/kj4dh4v/status/2100863245351539185) • Post by @kj4dh4v — made a Naruto-themed street fighter game and played against @typesafeai’s Jev it made ~130 decisions in a 50s fight, barely registered any usage, and came very close to beating me. very impressed by its reaction time and (twitter.com/kj4dh4v/status/2100863245351539185) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550424914404573277
   - [Post by @kj4dh4v](https://x.com/kj4dh4v/status/2100863245351539185?s=20)
   - Source: https://x.com/kj4dh4v/status/2100863245351539185?s=20 (by Habu Tusk)

10. **I just did another experiment what if Jev could 'hear'?**
   - I just did another experiment what if Jev could 'hear'? So here's how Jev reacts to music, take a look! More on my X : https://x.com/rrriviannn/status/2100807838566383819 Linked projects: • Post by @rrriviannn — Okay soooo what if @typesafeai's Jev could 'hear'? here's what Toxicity sounds like according to Jev : (x.com/rrriviannn/status/2100807838566383819) • Screen_Recording_2026-09-18_at_10.45.15_AM_2.mp4 — video/mp4 · 30 MB (cdn.discordapp.com/attachments/1483217545040232493/1550368374289334312) • Post by @rrriviannn — Okay soooo what if @typesafeai's Jev could 'hear'? here's what Toxicity sounds like according to Jev : (twitter.com/rrriviannn/status/2100807838566383819) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550368376340357143
   - [Post by @rrriviannn](https://x.com/rrriviannn/status/2100807838566383819)
   - [Screen_Recording_2026-09-18_at_10.45.15_AM_2.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550368374289334312/Screen_Recording_2026-09-18_at_10.45.15_AM_2.mp4?ex=6aaebd50&is=6aad6bd0&hm=af015e0976ea4712f4f7ddb3f2016ad25f4b1e05e3d457031c7d203af0ff7d19&)
   - Source: https://x.com/rrriviannn/status/2100807838566383819 (by riv)

11. **" The objective of the game is to start on one Wikipedia page and reach a specific other Wikipedia page using only**
   - " The objective of the game is to start on one Wikipedia page and reach a specific other Wikipedia page using only links you come across while traversing. Each step can mean choosing between hundreds to thousands of links! It’s a great playground for demonstrating not just intelligence-per-second, but also the compounding benefits of not hallucinating with high-cardinality choices. "
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550341765519777847 (by BlissF00l)

12. **Here’s a free idea for someone to play with.**
   - Here’s a free idea for someone to play with. I wanted to build this but suddenly I am very busy with not a lot of time to play!! A take on Conway’s Game of Life, but Jev somehow deciding on the replications, with ability to take semantic input to change the rules Maybe you can “place” semantic nodes so the growth changes in proximity to those words
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550341103436439573 (by AllieTheIcon)

13. **I built an Akinator-style guessing game.**
   - I built an Akinator-style guessing game. https://jevguess.susonsapkota.com Linked projects: • Jev Guess — System-One Decision Experiment — Akinator-style character-guessing powered by TypeSafe Jev typed decision models. (jevguess.susonsapkota.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550330404295151707
   - [Jev Guess — System-One Decision Experiment](https://jevguess.susonsapkota.com)
   - Source: https://jevguess.susonsapkota.com (by uosns)

14. **I had Jev play my game Roulette Wars on its own, weighing real risk and payout to pick each unit's bet every round.**
   - I had Jev play my game Roulette Wars on its own, weighing real risk and payout to pick each unit's bet every round. It won all 3 recorded runs, against a 1000 HP boss. And I have some interesting findings. Here's the thread about it on x https://x.com/NicoSaraintaris/status/2100745151622664392 Linked projects: • Post by @NicoSaraintaris — I had Jev (@typesafeai's new decision model) play my game Roulette Wars start to finish, no human input! In the game, the units ARE the chips, bet on a roulette table against a 1000 HP monster-dealer! Result: 3/3 games w (x.com/NicoSaraintaris/status/2100745151622664392) • Post by @NicoSaraintaris — I had Jev (@typesafeai's new decision model) play my game Roulette Wars start to finish, no human input! In the game, the units ARE the chips, bet on a roulette table against a 1000 HP monster-dealer! Result: 3/3 games w (twitter.com/NicoSaraintaris/status/2
   - [Post by @NicoSaraintaris](https://x.com/NicoSaraintaris/status/2100745151622664392)
   - Source: https://x.com/NicoSaraintaris/status/2100745151622664392 (by NicoSaraintaris)

15. **nothing too fancy but I pitted Jev vs Jev in a football game I’m working on.**
   - https://x.com/attractmodeio/status/2100723340021276739?s=46&t=Lue6-owbwjO2j3Lmk4ra-A nothing too fancy but I pitted Jev vs Jev in a football game I’m working on. I plan on using Jev for the “CPU” players, first test run. Linked projects: • Post by @AttractModeIO — Jev played DOOM. Then Subway Surfers. So I made it play against itself- Jev vs Jev. Two AI-controlled players, one football game. Both input feeds visible. 10 completed passes and a catch-and-run touchdown. 🧵 @typesafea (x.com/attractmodeio/status/2100723340021276739) • Post by @AttractModeIO — Jev played DOOM. Then Subway Surfers. So I made it play against itself- Jev vs Jev. Two AI-controlled players, one football game. Both input feeds visible. 10 completed passes and a catch-and-run touchdown. 🧵 @typesafea (twitter.com/attractmodeio/status/2100723340021276739) Discussion: https://discord.com/channels/1483217544214085663/1
   - [Post by @AttractModeIO](https://x.com/attractmodeio/status/2100723340021276739?s=46&t=Lue6-owbwjO2j3Lmk4ra-A)
   - Source: https://x.com/attractmodeio/status/2100723340021276739?s=46&t=Lue6-owbwjO2j3Lmk4ra-A (by madison_pov)

16. **I've tried to make a game with Jev.**
   - I've tried to make a game with Jev. Its basically a corrupt politician simulator but there are consequences. You have to rise the ranks but stay undetected https://the-ledger.simonbalint03.workers.dev/ Linked projects: • The Ledger (the-ledger.simonbalint03.workers.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550243132782678127
   - [The Ledger](https://the-ledger.simonbalint03.workers.dev/)
   - Source: https://the-ledger.simonbalint03.workers.dev/ (by SIMON)

17. **🃏 🐍 🪽 not sure how the experience of other users will go, but the agents *enjoyed* playing.**
   - 🃏 🐍 🪽 not sure how the experience of other users will go, but the agents *enjoyed* playing. they know everything about it though so that doesn't really count. if anyone would like to try out my little nonsense game with an agent they can go here: [Harvey](https://harvey-a-game.goobis.chatgpt.site/) Linked projects: • Harvey, a game — -RPK Autonomy (harvey-a-game.goobis.chatgpt.site) • HR5tlT8aIAE4ZWQ.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550229700587290714) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550229700968710274
   - [Harvey, a game](https://harvey-a-game.goobis.chatgpt.site/)
   - [HR5tlT8aIAE4ZWQ.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550229700587290714/HR5tlT8aIAE4ZWQ.png?ex=6aae3c2a&is=6aaceaaa&hm=54f5284f31089ad0096fd6602ec771216f1e14b85eedaba3a1eb9d5270864944&)
   - Source: https://harvey-a-game.goobis.chatgpt.site/ (by Goobis)

18. **This is a smurf detector called Gargamel's Gaze which uses opendota API and Jev to understand if a user is a smurf in**
   - This is a smurf detector called Gargamel's Gaze which uses opendota API and Jev to understand if a user is a smurf in DOTA2 So far 100% of my tests were correct. Try it for yourself. Just need a matchid gargamels-gaze.pages.dev Linked projects: • HScR20oXoAAXtPC.png — image/png · 408 KB (cdn.discordapp.com/attachments/1483217545040232493/1550228218345295903)
   - [HScR20oXoAAXtPC.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550228218345295903/HScR20oXoAAXtPC.png?ex=6aaee389&is=6aad9209&hm=a91b9ea933730f7010897bcfe8df5dbf806237698a18e9dbddfe8a1470de4f5c&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550228219075235840 (by M3n0)

19. **it is playing .**
   - it is playing https://www.czechgames.com/games/codenames . one team is sonnet (spymaster) + jev (guesser), the other team is terra + jev. Linked projects: • CGE | CODENAMES — Give your team clever one-word clues to help them spot their agents in the field. (czechgames.com/games/codenames) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550213070419267704
   - [CGE | CODENAMES](https://www.czechgames.com/games/codenames)
   - Source: https://www.czechgames.com/games/codenames (by astrostl)

20. **Jev is sick btw, I am trying to use it with my project and tehre is bunch wecan do with it, but if anyone wants, I**
   - Jev is sick btw, I am trying to use it with my project and tehre is bunch wecan do with it, but if anyone wants, I bought a key for this fun thing I built at lunch, you can try to beat Jev at board games here 😄 https://jevboardgames.everpaper.app/ Linked projects: • Jev Plays — Tic-tac-toe and Connect Four against Jev. The model picks the move, the code keeps the rules. (jevboardgames.everpaper.app) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550181423699202083
   - [Jev Plays](https://jevboardgames.everpaper.app/)
   - Source: https://jevboardgames.everpaper.app/ (by ianne)

21. **Ok, time to build a Human-AI guided gaming system.**
   - Ok, time to build a Human-AI guided gaming system. Think something along the lines of watching your child play, letting them ask basic questions, but if they get stuck you can give them hints that dynamically change the gameplay as they continue to learn. Starting with Final Fantasy.... https://x.com/nawtayei/status/2100607727978369138?s=20 Linked projects: • Post by @nawtayei — Thanks @faadilhshaik for sharing the repo! A quick modification and dropped in Final Fantasy and I'm off to the races! Next up is building in my audio agent to dynamically modify the TypeSafe rules so that as it is playi (x.com/nawtayei/status/2100607727978369138) • Post by @nawtayei — Thanks @faadilhshaik for sharing the repo! A quick modification and dropped in Final Fantasy and I'm off to the races! Next up is building in my audio agent to dynamically modify the TypeSafe rules so that as it is playi (twitter.c
   - [Post by @nawtayei](https://x.com/nawtayei/status/2100607727978369138?s=20)
   - Source: https://x.com/nawtayei/status/2100607727978369138?s=20 (by nawtayei)

22. **Just a funny test XD This model is not made for this BUT it was able to see the rocket XD Not the human though.**
   - Just a funny test XD This model is not made for this BUT it was able to see the rocket XD Not the human though. In ASCII art. Linked projects: • image.png — image/png · 164 KB (cdn.discordapp.com/attachments/1483217545040232493/1550162842194542692)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550162842194542692/image.png?ex=6aaea6a6&is=6aad5526&hm=81c1fd23976089dcec5c0ff83e3c87d620612728823fca94973e05ec3d3791e4&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550162842483818630 (by Waldemar =))

23. **I got jev to play cube field (third game has some really narrow escapes) lol probably a lot of ways this can be**
   - I got jev to play cube field (third game has some really narrow escapes) lol probably a lot of ways this can be improved but pretty neat Linked projects: • demo-quality.mp4 — video/mp4 · 7 MB (cdn.discordapp.com/attachments/1483217545040232493/1550153481929625660)
   - [demo-quality.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550153481929625660/demo-quality.mp4?ex=6aae9dee&is=6aad4c6e&hm=264bb199c9d8b49f4bcdc5605494278d114ee98c13cc0f2bb70f4ed3758a2ed2&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550153482277883981 (by John)

24. **Just whipped up a an example of Jev playing the llmgame from With just a few basic options/choices, got it to be about**
   - Just whipped up a an example of Jev playing the llmgame from https://llmgame.scalex.dev/ With just a few basic options/choices, got it to be about 85% accurate. Sure I could get it to 100%, but didn't want to overfit. Really cool stuff! Linked projects: • Continue? Y/N — A 60-second game about LLM permission fatigue. How carefully do you really read AI commands? (llmgame.scalex.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550140907997757601
   - [Continue? Y/N](https://llmgame.scalex.dev/)
   - Source: https://llmgame.scalex.dev/ (by A-A-RON)

25. **I made Jev from @typesafeai play Chess.**
   - I made Jev from @typesafeai play Chess. Try it out https://jev-chess.tgr.rs/ More games pending Source: https://github.com/enovikov11/tigor-ai/tree/main/games/5-jev-chess https://x.com/the_tigor/status/2100532795625832912 Linked projects: • Jev Chess — TypeSafe move selector (jev-chess.tgr.rs) • enovikov11/tigor-ai — Personal AI monorepo. Contribute to enovikov11/tigor-ai development by creating an account on GitHub. (github.com/enovikov11/tigor-ai/tree/main/games/5-jev-chess) • Post by @the_tigor — @CompleteSkeptic I made Jev from @typesafeai play Chess. Try it out https://jev-chess.tgr.rs/ More games pending Source: https://github.com/enovikov11/tigor-ai/tree/main/games/5-jev-chess (x.com/the_tigor/status/2100532795625832912) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550091687756570666
   - [Jev Chess — TypeSafe move selector](https://jev-chess.tgr.rs/)
   - [enovikov11/tigor-ai](https://github.com/enovikov11/tigor-ai/tree/main/games/5-jev-chess)
   - [Post by @the_tigor](https://x.com/the_tigor/status/2100532795625832912)
   - Source: https://github.com/enovikov11/tigor-ai/tree/main/games/5-jev-chess (by tigor)

26. **first pass at getting Jev to play Command & Conquer repo here: (it is very much vibe coded nowadays, fair warning!)**
   - first pass at getting Jev to play Command & Conquer repo here: https://github.com/kyleeasterly/OpenRAFormer2 (it is very much vibe coded nowadays, fair warning!) will do some iteration. this unlocks things like being able to do a quick specialized query for things like combat micro and "where to place the refinery" (hint: not where Jev placed it with the v1 game state / action design!) amazing latency, too! Linked projects: • kyleeasterly/OpenRAFormer2 — Can we get an LLM to play Command & Conquer? Contribute to kyleeasterly/OpenRAFormer2 development by creating an account on GitHub. (github.com/kyleeasterly/OpenRAFormer2) • 2026-09-16_22-29-21.mp4 — video/mp4 · 29 MB (cdn.discordapp.com/attachments/1483217545040232493/1550032257438187530) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550032258948399104
   - [kyleeasterly/OpenRAFormer2](https://github.com/kyleeasterly/OpenRAFormer2)
   - [2026-09-16_22-29-21.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550032257438187530/2026-09-16_22-29-21.mp4?ex=6aaed5c8&is=6aad8448&hm=63f35de9b1d072e27045a1563a9f5ade966f9f526050fe1b51028b661c7de4e3&)
   - Source: https://github.com/kyleeasterly/OpenRAFormer2 (by mAsInMancy)

27. **First thoughts Pretty sure it would be great at procedural generation, but this is not a coding model.**
   - First thoughts Pretty sure it would be great at procedural generation, but this is not a coding model. If you mean by coding game: generate levels, NPCs, and world maps, I think it would be amazing, and you can probably use this in real time to build really crazy, massive, interactive multiplayer worlds. To write the text code, just use an llm. Generating tasks, specifically data and validating the SDLC lifecycle, it might be pretty good at that.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550012981134364753 (by Alex)

28. **so i've been experimenting with my architecture that aimed to replicate model one's architecture, judging by logprobs.**
   - so i've been experimenting with my architecture that aimed to replicate model one's architecture, judging by logprobs. I've succeeded in replicating it, and I was able to run multimodal llm's such as qwen with the new inference harness, and then to test it out, i switched to a 4b model and ran doom emulator. Since im very limited in compute and memory its heavily labotomized (4b param model lol) but it was able to kill some enemies based off of just the image of the game. looking promising so far, planning on opensourcing this soon Linked projects: • doom.mp4 — video/mp4 · 14 MB (cdn.discordapp.com/attachments/1483217545040232493/1549964360120664166)
   - [doom.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549964360120664166/doom.mp4?ex=6aae968c&is=6aad450c&hm=5922fa799b26e674ee4f80a40b5afa12405b4a5e5f7f4615811c61f82b349029&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549964361362309130 (by Umut      ᲼᲼᲼᲼᲼᲼   ᲼ 🗕 🗗 🗙)

29. **Okay yeah Jev is really solid as a simple gamemaster for text RPGs - the speed and reasonableness of its decision**
   - Okay yeah Jev is really solid as a simple gamemaster for text RPGs - the speed and reasonableness of its decision making has been definitely best that I've seen. Able to: determine if what you're trying even makes sense, or if you have the means to do it difficulty whether you have advantage or disadvantage in the situation what ability score you need and it does this with no perceptible delay Linked projects: • Screenshot_2026-09-17_040212.png — image/png · 291 KB (cdn.discordapp.com/attachments/1483217545040232493/1549964211424333824)
   - [Screenshot_2026-09-17_040212.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549964211424333824/Screenshot_2026-09-17_040212.png?ex=6aae9668&is=6aad44e8&hm=c0944160f93f9a9e94980fc720fddaeb30f22e1929a1297182739cae8fc3efd0&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549964211701026846 (by Fatalfencer)

30. **hopefully it can be a fun wordle like game at some point 🙂 getting kinda a lot of players**
   - hopefully it can be a fun wordle like game at some point 🙂 getting kinda a lot of players Linked projects: • image.png — image/png · 168 KB (cdn.discordapp.com/attachments/1483217545040232493/1549944829918838874)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549944829918838874/image.png?ex=6aae845c&is=6aad32dc&hm=f4e46f71b49e8287be0380bfc9209be3381b5c3d83a9411b93e8826520508061&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549944829885026326 (by IAmRoot)

31. **Jev is playing Games (Sims like toy game).**
   - Jev is playing Games (Sims like toy game). In comparison to no generative ai for NPCs (Utility AI) it's super fast and reliable and also makes the logic and decision tree extendable very easily, so you may expect more complex behaviors for NPCs in games with real-time performance Linked projects: • 20260917-0037-54.2917779.mp4 — video/mp4 · 7 MB (cdn.discordapp.com/attachments/1483217545040232493/1549943718994514010)
   - [20260917-0037-54.2917779.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549943718994514010/20260917-0037-54.2917779.mp4?ex=6aae8353&is=6aad31d3&hm=81c4a0f281e0358fae1bded19fa0e6af6025d15238ceb11c0c447d8ee7daacb5&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549943719787241555 (by iraji)

32. **I'm getting giddy waiting for access, I really want to try to use this as part of my "riding tack" for orchestrating**
   - I'm getting giddy waiting for access, I really want to try to use this as part of my "riding tack" for orchestrating collaborative work between operator and instrument. Recently saw someone on HN mention Bill Paxton's "software instrument" phrase for MESA and I've taken to using that to refer to most of these AI tools. I like the idea that similar to a piano or any other instrument, it requires an operator to produce music. A printer vs. the printing press so to speak,
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549940274447257642 (by AN0099)

33. **Day job is software engineering.**
   - Day job is software engineering. Simple Claude.md, memory system plugin, progressive disclose docs, Claude Code + desktop app, + GitHub linked + mobile app. I already went overboard on skills and plugins/extensions but the token burn was too much so I pulled back. A strong prompt engineering game seems to work better than someone else’s workflow.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549936346263588925 (by TokenFires (Robert Ault))

34. **AI adjacent. I built a (semi) geothermal loop to keep both my Main dev/game box and AI cluster**
   - AI adjacent. I built a (semi) geothermal loop to keep both my Main dev/game box and AI cluster cooled using the Radon fan vent in our subfloor. https://www.youtube.com/watch?v=SZ81ZC3gsh8 Temps in that space stay ~75f in the summer even when it's in the upper 90s due to the air being cooled by the ground as it's pulled in from the other side of the crawl. Can reject the heat of 4 V100s running at 300W without raising the water temp above 95f (35C) Linked projects: • Home geothermal loop — Enjoy the videos and music that you love, upload original content and share it all with friends, family and the world on YouTube. (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549930734813319289
   - [Home geothermal loop](https://www.youtube.com/watch?v=SZ81ZC3gsh8)
   - Source: https://www.youtube.com/watch?v=SZ81ZC3gsh8 (by TrailFeatures)

35. **Working on delegated browser automation, would love to get access to Jev as an alternative for decision trees mid task**
   - Working on delegated browser automation, would love to get access to Jev as an alternative for decision trees mid task execution & for auth discovery. Signed up for the waitlist - I think Jev could be game changing for what I'm working on. https://trywool.com Linked projects: • WOOL · AI agents for your users’ website accounts — Build AI agents that work in your users’ website accounts with their permission. Connect accounts, send prompts, and get results through the WOOL API. (trywool.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549924333701308418
   - [WOOL · AI agents for your users’ website accounts](https://trywool.com)
   - Source: https://trywool.com (by ArkDev)

36. **I spend a lot of my time building things around EVE Frontier, so after playing with Jev for a bit I started wondering**
   - I spend a lot of my time building things around EVE Frontier, so after playing with Jev for a bit I started wondering what it might look like if you used it almost like a higher level NPC commander rather than a normal LLM agent. The thought experiment was one boss NPC commanding around 60 otherwise deterministic NPCs. Jev doesn't fly anything, shoot anything or run every game tick. It just gets a compact numeric snapshot of the battlefield and answers 16 tactical questions in parallel, things like whether the boss is in danger, whether the swarm is overextended, whether it should regroup, whether reinforcements make sense and which target should be prioritised. Ordinary deterministic logic then decides what to actually do with those answers. I ended up turning it into a proper benchmark and ran 220 live calls against the community API. Median input was about 3,448 tokens and median late
   - [Diabolacal/eo-map-carbon](https://github.com/Diabolacal/eo-map-carbon/blob/main/experiments/typesafe/JEV_TACTICAL_COMMANDER.md)
   - [Diabolacal/eo-map-carbon](https://github.com/Diabolacal/eo-map-carbon)
   - Source: https://github.com/Diabolacal/eo-map-carbon/blob/main/experiments/typesafe/JEV_TACTICAL_COMMANDER.md (by [WOLF] lacal)

37. **I'm interested in making games play themselves with code or AI, and I wrote a Terraria mod that beats the Wall of**
   - I'm interested in making games play themselves with code or AI, and I wrote a Terraria mod that beats the Wall of Flesh automatically (https://github.com/Reisenbug/TerraBlind). I've always wanted a model that makes fast calls on stuff that's hard to code but easy for a human to judge, like whether to bridge, pillar, or jump over a gap. So Jev caught my eye. I'm on the waitlist. Ready to build something really cool 🙂 Linked projects: • Reisenbug/TerraBlind — A Terraria tModLoader mod that plays the game with code: pathfinding, building and combat primitives wired into one pipeline that runs from a fresh world to killing the Wall of Flesh. - Reisenbug/T... (github.com/Reisenbug/TerraBlind) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549816028425490483
   - [Reisenbug/TerraBlind](https://github.com/Reisenbug/TerraBlind)
   - Source: https://github.com/Reisenbug/TerraBlind (by stardust)

38. ****TRKR — 400 simulated market futures over MCP** 🎲 MCP server that gives your assistant a regime-aware market**
   - **TRKR — 400 simulated market futures over MCP** 🎲 MCP server that gives your assistant a regime-aware market simulator: 400 alternative ten-year futures for 20 assets, driven by a jointly-simulated macro environment. Every tool returns a reduction (bands, stats) — never raw paths, so results can't be cherry-picked. Ships with a skill that stops the assistant misreading the median as a forecast. Free beta, key from **trkr.ai/app/agents**: ``` claude mcp add --transport http trkr https://www.trkr.ai/api/mcp --header "Authorization: Bearer $TRKR_API_KEY" ``` Repo: https://github.com/trkr-ai/trkr-agents — tell me what breaks 🙏 Linked projects: • trkr-ai/trkr-agents — trkr.ai agents. Contribute to trkr-ai/trkr-agents development by creating an account on GitHub. (github.com/trkr-ai/trkr-agents) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/154974756151728
   - [https://www.trkr.ai/api/mcp](https://www.trkr.ai/api/mcp)
   - [trkr-ai/trkr-agents](https://github.com/trkr-ai/trkr-agents)
   - Source: https://github.com/trkr-ai/trkr-agents (by agj60)

39. **The problem with narrowing the scope of usage like this is that often tailor made algorithms that are not NN perform**
   - The problem with narrowing the scope of usage like this is that often tailor made algorithms that are not NN perform way better and can just be ran locally. This has to have some ability to have domain knowledge that edges this above those. In my NPC example above, regular game AI can already do this in ms for free
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549643142356140043 (by Chris)

40. **Hey! Salomon here, I am the cofounder of Ignia.lat, and edtech company. We sell high-ticket educational programs aimed**
   - Hey! Salomon here, I am the cofounder of Ignia.lat, and edtech company. We sell high-ticket educational programs aimed at traditional entrepreneurs. Jev I think is a game changer for many use cases. In particular I think it will be amazing for commercial teams: Qualifying leads, routing leads to the correct products according to their profiles and info you have on them, sending the correct resources for lead nurturing.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549604223094620201 (by SalomonM)

41. **I've been working on an online board game engine thing.**
   - I've been working on an online board game engine thing. It allows any agent to play any board game - excited to hook in TypeSafe AI once I can try it! https://tabletop-v2.bewerner23.workers.dev/ Linked projects: • Tabletop — Board games with friends, in the browser. A purpose-built WebGPU tabletop. (tabletop-v2.bewerner23.workers.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549580857524617398
   - [Tabletop](https://tabletop-v2.bewerner23.workers.dev/)
   - Source: https://tabletop-v2.bewerner23.workers.dev/ (by Ben)

42. **Hey guys, I'm Harin...**
   - Hey guys, I'm Harin... An undergrad student form India... Researching on 'weights as a plugin' to make use of SSDs to run large LLMs without costing huge inference speed... And I love building games, apps and tools for myself... Excited to try out Jev. Also working on a couple of projects like SnapNap: A quick resume kind of feature for windows inspired from XBOX DeskOllama: A GUI app that makes running Local LLMs ez pz
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549515735980580877 (by Harin)

43. **Built in a few weeks part time.**
   - Built https://www.fablebrawl.com in a few weeks part time. Would love to get access to Jev so I can understand what it means that “it can’t generate text.” Congrats on the launch! Write-up: https://thenickhuber.com/vibe-coding-my-favorite-defunct-game/ Any & all feedback very welcome Linked projects: • FableBrawl — a high-fantasy auto-battler — Draft a warband of storybook champions, arrange your formation, and outlast seven rivals. Free to play in your browser. (fablebrawl.com) • A tour inside my software restaurant — AI product leader, self-taught programmer, data scientist, and small-check investor. (thenickhuber.com/vibe-coding-my-favorite-defunct-game) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549514692102324345
   - [FableBrawl — a high-fantasy auto-battler](https://www.fablebrawl.com)
   - [A tour inside my software restaurant](https://thenickhuber.com/vibe-coding-my-favorite-defunct-game/)
   - Source: https://www.fablebrawl.com (by EarloftheValley)

44. **Ok enough memes for me.**
   - Ok enough memes for me. Im a senior ML engineer, started with sutton on ‘15 and contributed to Tensorflow on early days and went to quantitative finance on two sigma and then on my own. Transformers have no predictive power and fail utterly on real markets, so I always worked on research of alternative architectures. Last work was a World Model inspired on Biology and quite similar to the jev approach. First use case for me on finance since I have access to real infra and data to bench and do evals on it if got access. DM opens and happy to help (repo private cause finance is like that but will build in public this use cases)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549513634030424126 (by Arthur_88)

45. **Jev plays Subway Surfers superhuman, 50 games at once, under a cent**
   - Jev playing subway surfers at super human speed, and also playing 50 games at once. Cost less than a cent to do this run. Jev does not replace LLMs like Astra or Fable, but opens up an entirely new world of capabilities. — @_MaxBlade (3.5K likes) Linked projects: • Post by @_MaxBlade — jev is insane 🤯 Here is Jev playing subway surfers at super human speed, and also playing 50 games at once. cost less than a cent to do this run. Jev does not replace llms like astra or fable, but opens up an entirely n (x.com/_MaxBlade/status/2100634359099232678)
   - [Post by @_MaxBlade](https://x.com/_MaxBlade/status/2100634359099232678)
   - Source: https://x.com/_MaxBlade/status/2100634359099232678 (by @_MaxBlade)

46. **Jev generates game levels in real time — faster, cheaper structured output**
   - Hugo demoed Jev generating game levels in real time on video: faster and cheaper structured output could be a big deal for game dev. — @HugoDuprez (1260 likes) Linked projects: • Post by @HugoDuprez — Jev can generate game levels in real time. Faster and cheaper structured output could be a big deal for game dev! (x.com/HugoDuprez/status/2100953089003921543)
   - [Post by @HugoDuprez](https://x.com/HugoDuprez/status/2100953089003921543)
   - Source: https://x.com/HugoDuprez/status/2100953089003921543 (by @HugoDuprez)

### Money (29)

1. **We integrated Jev in our chat on public data for Bulgaria (elections, procurements, budgets, politicians etc).**
   - We integrated Jev in our chat on public data for Bulgaria (elections, procurements, budgets, politicians etc). 230+ tool calls, What we measured: - Robustness is where it shines. With typos, Jev alone picks the right tool 94% (EN) / 86% (BG) of the time. Our keyword rules: 28% / 34%. Reworded questions: 86% vs 15–25%. - It cannot fill open values — names, company IDs, free text. It has no primitive that produces one. So it now routes for Gemini 3.5 Flash-Lite: Jev picks the tool, Gemini fills only that tool's parameters. Same day, same 474 questions: parameters right 94.3% / 90.6% vs 83.0% / 77.4% for Gemini alone, with a 4x shorter prompt (3,697 vs 16,150 tokens) and ~0.2 s added median latency. - Weak spot: Bulgarian typed in Latin letters (shliokatitsa) — 71% for Jev vs 94% for Gemini. When Jev is unsure, the question goes to Gemini with the full catalogue. Full results, method and de
   - [Оценка на асистента | Наясно](https://naiasno.bg/chat/evals)
   - Source: https://naiasno.bg/chat/evals (by Atanas)

2. **Umm, will gather better data when my OpenAI token budget resets tomorrow, had to tinker a bit.**
   - Umm, will gather better data when my OpenAI token budget resets tomorrow, had to tinker a bit. Framework is basically https://github.com/Question86/Werkfaden plus 2 more scripts that iterate the LLMs patch attempt as atomic claims to Jev and bring back the nouls as a list for the LLM to get feedback on the various breakdowns so it sees its own hallucinations. Linked projects: • Question86/Werkfaden — Project context and controlled changes for AI coding agents. Keep the thread. Verify the change. - Question86/Werkfaden (github.com/Question86/Werkfaden) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550562000604504106
   - [Question86/Werkfaden](https://github.com/Question86/Werkfaden)
   - Source: https://github.com/Question86/Werkfaden (by Q86)

3. **Hi everyone, I just wrote up a small experiment testing TypeSafe’s Jev as a trusted and cheaper monitor alternate for**
   - Hi everyone, I just wrote up a small experiment testing TypeSafe’s Jev as a trusted and cheaper monitor alternate for AI Control. The interesting bit: a single yes/no question gets ~0.97 AUROC and catches ~90% of backdoors at a 2% audit budget, at a tiny fraction of the cost of an LLM monitor. But if the attacker can generate and score multiple backdoor variants, the picture changes pretty substantially. LessWrong: https://www.lesswrong.com/posts/d7pQicW8EhpPBDRqz/a-non-generative-model-as-a-trusted-monitor-for-ai-control X: https://x.com/exploding_grad/status/2100983340602179953 Linked projects: • Post by @exploding_grad — Trusted monitoring is the backbone of AI Control. LLMs as a monitor have been fairly accurate, but are quite expensive and inconsistent. When @typesafeai released Jev, I spent $1.09 dollars and ~15 hours analyzing it - a (x.com/exploding_grad/status/210098334060217995
   - [https://www.lesswrong.com/posts/d7pQicW8EhpPBDRqz/a-non-generative-model-as-a-trusted-monitor-for-ai-control](https://www.lesswrong.com/posts/d7pQicW8EhpPBDRqz/a-non-generative-model-as-a-trusted-monitor-for-ai-control)
   - [Post by @exploding_grad](https://x.com/exploding_grad/status/2100983340602179953)
   - Source: https://x.com/exploding_grad/status/2100983340602179953 (by venkat)

4. **> DeepSeek (prod) Jev > 4-way accuracy 83.7% 80.6% > signal-vs-noise 85.7% 83.7% > recall on "problem" 86.0% 93.0% ← >**
   - > DeepSeek (prod) Jev > 4-way accuracy 83.7% 80.6% > signal-vs-noise 85.7% 83.7% > recall on "problem" 86.0% 93.0% ← > noise precision 91.8% 100.0% ← > avg latency 932ms 307ms > tokens / item 2,610 843 > agreement between them 84.8% > Same accuracy ballpark. 3x faster, 3x cheaper. But the interesting part is the error patterns are complementary: > 🔸 Jev almost never loses a real problem (93% recall). Where our cheap classifier says "noise 0.85, discard forever," Jev often finds the buried complaint — like the Trustpilot review that's 90% praise with one real grievance inside. That's the exact failure mode that hurts a product team most. > 🔸 When Jev says "noise," it's right (100% precision) — it just doesn't say it often enough to be the sole filter. > So we're not replacing anything. We're wiring Jev as a second-opinion gate: every time the cheap classifier votes "noise," Jev gets a l
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550553704770310227 (by Brian Ochoa)

5. **Built a tool for analyzing and optimizing AI usage, it finds potential wasted tokens/money and gives you actionable**
   - Built a tool for analyzing and optimizing AI usage, it finds potential wasted tokens/money and gives you actionable ways to fully improve your usage. It runs entirely locally. Feel free to try it: npm i -g optimaizr Web: https://optimaizr.com Linked projects: • Find where your LLM spend is wasted, then verify and apply the savings. — The primary number is potential savings, not token count. Findings ranked by money, each with its arithmetic, each verified on your own traffic. (optimaizr.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550548854321979405
   - [Find where your LLM spend is wasted, then verify and apply the savings.](https://optimaizr.com)
   - Source: https://optimaizr.com (by stich)

6. **Its best as a tool for other models or route between models e.g.**
   - Its best as a tool for other models or route between models e.g. https://github.com/luantak/is-malicious/ will output its findings and their source code ranges, these can then be used by an agent to investigate further Linked projects: • luantak/is-malicious — A codebase scanner that helps you not run malicous code - luantak/is-malicious (github.com/luantak/is-malicious) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550506055031595040
   - [luantak/is-malicious](https://github.com/luantak/is-malicious/)
   - Source: https://github.com/luantak/is-malicious/ (by Paul)

7. **A little update on Jev's poker playing capabilities...**
   - A little update on Jev's poker playing capabilities... he/she/it/they have gone from a buy in of $1,000 to now having around $29k (won more just after I took this screenshot) a real shame this is not real money! Linked projects: • image.png — image/png · 261 KB (cdn.discordapp.com/attachments/1483217545040232493/1550440827287904296)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550440827287904296/image.png?ex=6aae580b&is=6aad068b&hm=b8f70171ee969d04db7e7d2e11a76d473940727a79d2f364ffc9027c6b24a946&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550440827673640980 (by AccidentallySober)

8. **Fully automated systems.**
   - Fully automated systems. For Money making. turning game currency into Real money. Linked projects: • image.png — image/png · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550425426478768238)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550425426478768238/image.png?ex=6aae49b3&is=6aacf833&hm=f52bbce5dcc99780809ef0d00f4c81d837127dbdf9d78149c3d35175f64cb54f&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550425426906710016 (by ETHAN WORK)

9. **I've been training models using SFT/RL and then measuring the training methods using benchmark evaluations.**
   - I've been training models using SFT/RL and then measuring the training methods using benchmark evaluations. One of the tedious and costly parts of the research is breaking down the taxonomy of failures when the models get things wrong. Using Fable to do perform the failure taxonomy on 40 samples, it takes about 11 minutes of wall clock time and roughly 102k context tokens. Typesafe did the same work with over 80% accuracy in 9 sec for 77k tokens. It's totally saving me time and money on this part of the iterative cycle of research.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550311909377581147 (by Karmastic)

10. **Failure mode report: a Choice with no escape hatch answers at confidence 1.00 The jaggedness page asks for failure**
   - Failure mode report: a Choice with no escape hatch answers at confidence 1.00 The jaggedness page asks for failure modes, so here's one — though it's a request-design failure rather than a model one, and I think that's what makes it worth flagging. A Choice whose options don't cover the input still has to pick something, and it does so at maximum confidence: ``` options: [meeting request, pricing question, support issue, introduction] state: "Please remove me from this mailing list. I never signed up." no escape hatch -> "support issue" confidence 1.00 + {"other": ...} -> "other" confidence 0.93 ``` Reproduced in a second domain — a rental listing reading "No pets of any kind" came back as "cats and dogs" at 0.65. Exact inverse of the truth. What makes this one sharp: the usual mitigation is to threshold on confidence and route the uncertain cases to a human. That's structurally blind he
   - [suraj-phanindra/wellposed](https://github.com/suraj-phanindra/wellposed)
   - Source: https://github.com/suraj-phanindra/wellposed (by Suraj Phanindra)

11. **States: ``` { "text": "Buzz settled into the recliner like it was the only piece of his life that hadn’t been**
   - States: ``` { "text": "Buzz settled into the recliner like it was the only piece of his life that hadn’t been outsourced to chaos, chaos goggles already spinning and clicking as they hunted for alignment. This was the old Buzz Bin—his first haunt, the one they’d moved out of when Star and he upgraded to the Big, Heavily-Warded House (yes, with extra wards; yes, with a moat of polite electricity). The place now functioned as a public face: doors opened here, and if Buzz was feeling theatrical, they fed to the other address like a polite one-way glamour. The basement itself was absurdly tidy for the Buzz name: swept concrete, no humming machinery, no clandestine Tesla chorus—only a mattress on the floor and the recliner under the single bare bulb. Le Fou lay on the mattress, suit still scabby with grit but his face clean enough that the light didn’t spit on it. Buzz regarded him with that 
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550169173491974215 (by Scott O’Bryan)

12. **Phrasing of intent seems to make a big difference.**
   - https://console.typesafe.ai/playground?share=shr_123d2f855e843ed4d379bcbce56975845a8 Phrasing of intent seems to make a big difference. I'm getting opposite answers if I ask it "Should I go skateboarding indoors or outdoors if I want to save money?" vs "Should I go skateboarding indoors or outdoors if I want to save money long term?" **State** ``` { "weather_forecast": "heavy rain in the evening", "indoor_skatepark_cost": "$7", "outdoor_skatepark_cost": "$0", "skateboard": { "board": "$95", "bearings": "$30", "wheels": "$75", "trucks": "$90", "hardware": "$6", "griptape": "$0" }, "fact": "rain is bad for the skateboard" } ``` **Question** ``` { "skateboarding": { "type": "choice", "instructions": "Should I go skateboarding indoors or outdoors if I want to save money long term?", "criteria": { "outdoors": "Go outdoor and face the weather", "indoors": "Pay the indoor Linked projects: • Typ
   - [TypeSafe](https://console.typesafe.ai/playground?share=shr_123d2f855e843ed4d379bcbce56975845a8)
   - Source: https://console.typesafe.ai/playground?share=shr_123d2f855e843ed4d379bcbce56975845a8 (by Eddy Vinck)

13. **Introducing , having run AI content generators since 2020, understanding that sometimes users may create things you**
   - Introducing https://getvindex.com , having run AI content generators since 2020, understanding that sometimes users may create things you wish they didn't can be a problem for your brand. A journalist, policeman or payment processor may see something and put your business at risk. Using classifiers like jev make it so you can sleep easy at night and ensure problems like CSAM are a thing of the past. I ran through thousands of prompts from an older moderation system and saw the incredible way that Jev was able to handle it. The classifier is only half the solution though, what happens when the classifier comes back as positive, or when a 'hmmm' appears. The connectors are the other side so Vindex is your guardian tool when it comes to policy creation and execution. Sleep easy in the knowledge that moderation is taken care of before it even happens with AI generation, fraud detection and m
   - [Vindex · Your content policy. Enforced in 100 ms.](https://getvindex.com)
   - Source: https://getvindex.com (by Mr. Incredible)

14. **We just swapped a chunk of freeform LLM reasoning in our lead classification pipeline for Jev, and it's a clean**
   - We just swapped a chunk of freeform LLM reasoning in our lead classification pipeline for Jev, and it's a clean pattern worth sharing. The old setup: a lead comes in with a raw signal (a hiring post, a funding raise, a shipping stall), and a subagent read a rubric and reasoned in prose to land on a fit band: vertical match, signal strength, geography fit, stage/budget fit, offer fit, then High/Medium/Low. It worked, but every lead cost a full agentic pass, and the reasoning was a paragraph you had to re-read to trust. Now the five dimensions go out as one Jev call: a Choice for vertical match, a Noul for "is this signal actually fresh and specific," a Choice for geography fit, a Score for stage/budget fit, a Choice for offer fit. They run in parallel over the same state and come back typed, with probabilities: "vertical_match": {"choice": "in_vertical", "confidence": 0.94} "signal_streng
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550076349094305895 (by fimparatta)

15. **Hey everyone! I created printara.co, my own 3D model generation platform from images. I believe that for certain**
   - Hey everyone! I created printara.co, my own 3D model generation platform from images. I believe that for certain types of models, we are the best on the market. It took me 6 months of coding to build it. It’s a platform where you can sell your models across all major global marketplaces and earn a passive income from selling digital products. We even have features that much larger companies with million-dollar budgets don't have. Here is the link : https://printara.co/ Linked projects: • Printara: AI 3D models and laser-cut designs, ready to print and sell — Create 3D models and laser-cut designs, prepare print files and product photos, then sell them on the marketplaces your customers already use. (printara.co) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550064769904418837
   - [Printara: AI 3D models and laser-cut designs, ready to print and sell](https://printara.co/)
   - Source: https://printara.co/ (by OndrejBX)

16. **i dont have a video or anything yet maybe later but vibe coded a harness with claude for Jev and forced it to play**
   - i dont have a video or anything yet maybe later but vibe coded a harness with claude for Jev and forced it to play against stockfish... not bad at chess! Ive tested it all the way up to 3190 which it cannot beat but makes good decisions for its stated goals still... I think with harness improvements you could probably get ~2200 ish, maybe higher Linked projects: • image.png — image/png · 351 KB (cdn.discordapp.com/attachments/1483217545040232493/1550053616071614505)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550053616071614505/image.png?ex=6aae40ec&is=6aacef6c&hm=f38cb627529bd2a673e8c59defac568780336a30472a3d17ec0fd93ce6faddd6&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550053617392681071 (by Wisemode)

17. **Wrote up something I've been working on for a while: profiling Stable Diffusion 3 inference with nsys.**
   - Wrote up something I've been working on for a while: profiling Stable Diffusion 3 inference with nsys. It covers how the SD3 pipeline works end to end (text encoders, scheduler, DiT, VAE), how diffusion inference differs from autoregressive LLM inference, and what the nsys traces reveal at a deeper level about how the CPU and GPU split the work. Full post here if you're into inference internals: https://shivamguptaxia2.substack.com/p/understanding-diffusion-inference Linked projects: • Understanding Diffusion Inference, from Code to Kernels — A ground-up look at Diffusion Transformers’ inference pipeline, how a prompt becomes an image, how the CPU and GPU divide the work, and what Nsys reveals. (shivamguptaxia2.substack.com/p/understanding-diffusion-inference) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550052412268613672
   - [Understanding Diffusion Inference, from Code to Kernels](https://shivamguptaxia2.substack.com/p/understanding-diffusion-inference)
   - Source: https://shivamguptaxia2.substack.com/p/understanding-diffusion-inference (by Shivam)

18. **Hi all, I built a small POC using TypeSafe’s Choice primitive for Waitless, a Selenium UI-stabilization library.**
   - Hi all, I built a small POC using TypeSafe’s Choice primitive for Waitless, a Selenium UI-stabilization library. After a stabilization timeout, TypeSafe examines an allowlisted diagnostic snapshot and recommends the first investigation :network activity, DOM churn, animations, WebSockets, etc. In the 10 cases evaluation, the corrected deterministic baseline scored 90%, while TypeSafe scored 100% and correctly resolved the ambiguous mixed-signal case. Still early but promising as an optional post-timeout debugging advisor. Feedback welcome! https://github.com/godhiraj-code/waitless/tree/poc/typesafe-smart-doctor Linked projects: • godhiraj-code/waitless — Automatic UI stabilization for Selenium using DOM, network, animation, and layout signals. - godhiraj-code/waitless (github.com/godhiraj-code/waitless/tree/poc/typesafe-smart-doctor) Discussion: https://discord.com/channels/1483217544214
   - [godhiraj-code/waitless](https://github.com/godhiraj-code/waitless/tree/poc/typesafe-smart-doctor)
   - Source: https://github.com/godhiraj-code/waitless/tree/poc/typesafe-smart-doctor (by Dhiraj)

19. **Completed: **three fresh agents, identical 15 routing judgments, medium reasoning, one run each.** | Model | Elapsed |**
   - Completed: **three fresh agents, identical 15 routing judgments, medium reasoning, one run each.** | Model | Elapsed | Input tokens | Cached input¹ | Output² | Estimated cost: standard / fast | |---|---:|---:|---:|---:|---:| | **Jev** | **0.267 s** | **15,086** | — | **233** | **$0.000634** | | Terra | 37.2 s | 198,306 | 140,544 | 1,637 | $0.163 / $0.327 | | Sol | 79.5 s | 146,323 | 87,936 | 3,132 | $0.331 / $0.663 | | Astra | 28.2 s | 138,473 | 82,432 | 490 | $0.667 / $1.335 | ¹ Already included in input; charged at discounted rates. ² Includes reasoning tokens. The current **standard prices per million tokens** are: | Model | Input | Cached input | Output | |---|---:|---:|---:| | Jev | $0.042 | — | $0 | | Terra | $2 | $0.20 | $12 | | Sol | $4 | $0.40 | $20 | | Astra | $10 | $1 | $50 | GPT Fast API rates are twice these standard rates. These are **API-equivalent estimates, not measured 
   - [Pricing | OpenAI API](https://developers.openai.com/api/docs/pricing)
   - [Pricing | ChatGPT Learn](https://learn.chatgpt.com/docs/pricing)
   - [Parallel questions - TypeSafe AI](https://docs.typesafe.ai/cookbooks/parallel_questions)
   - Source: https://developers.openai.com/api/docs/pricing (by dreliq9)

20. **How Jev is already saving us money (just a little)**
   - How Jev is already saving us money (just a little) https://claude.ai/code/artifact/fc8bfe14-470c-4bd2-865c-8a28fb497f66 Linked projects: • Claude Artifact — Try out Artifacts created by Claude users (claude.ai/code/artifact/fc8bfe14-470c-4bd2-865c-8a28fb497f66) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549948207960952884
   - [Claude Artifact](https://claude.ai/code/artifact/fc8bfe14-470c-4bd2-865c-8a28fb497f66)
   - Source: https://claude.ai/code/artifact/fc8bfe14-470c-4bd2-865c-8a28fb497f66 (by nathanwells)

21. **Summary Jev Rerank Experiment for code context The eval: ReadyBase ( - my tool to provide meaningfully viable per turn**
   - Summary Jev Rerank Experiment for code context The eval: ReadyBase (https://www.promptforce.ai/readybase - my tool to provide meaningfully viable per turn context to coding agents) already has a 28-scenario gold-labeled regression harness each scenario is a real file + a real task description, with a hand-authored list of which facts (dependencies, size/fragility warnings,ownership, tests, etc.) an engineer would actually need to see before making that change, some marked critical. We reused it as-is: no new labels, no synthetic data. Baseline = readybase context builds a candidate pool of structural facts about the file, then its hand-tuned ranker (weightScaleByKind) scores and picks which ones fit the token budget. This is what ships in production. On the 28 scenarios: 72.6% recall, 95.2% critical-fact retention. Plain Jev (as a reranker): same candidate pool, but ranked by one TypeSaf
   - [ReadyBase: confidence to let AI touch production code](https://www.promptforce.ai/readybase)
   - Source: https://www.promptforce.ai/readybase (by PromptForcePrime)

22. **I'm not using Jev yet (I'm on the waitlist), but I'm working on a programming language that I'd love to try to use Jev**
   - I'm not using Jev yet (I'm on the waitlist), but I'm working on a programming language that I'd love to try to use Jev for spec/program/proof synthesis in (old exploratory repo https://github.com/rokopt/geb ; new more "real" repo into which I'm distilling what I want to keep from the former at https://github.com/rokopt/geb-mathlib). One of its properties is a small and highly regular syntax, which I hypothesize/hope would be much easier to teach machines to speak than natural language, but I've been expecting that LLMs would still be monumentally inefficient because of all the baggage they carry to allow them to speak natural language, make videos, and so on. I'd thought some LLM or SLM tuned to highly regular programming languages would be vastly preferable (in the ethics of how its training data would be obtained, as well as its engineering qualities), but I hadn't found anything that 
   - [rokopt/geb](https://github.com/rokopt/geb)
   - [rokopt/geb-mathlib](https://github.com/rokopt/geb-mathlib)
   - Source: https://github.com/rokopt/geb (by Zlatohrbitek)

23. **Hi there! MARISCO. Portfolio tracker connected to your bank, broker, house, car... usable from MCP. Wanna explore**
   - Hi there! MARISCO. Portfolio tracker connected to your bank, broker, house, car... usable from MCP. Wanna explore TypeSafe to make better financial decisions based on your portfolio and ton of finantial data. Invitation only: https://trymarisco.com/ Linked projects: • Marisco | Portfolio tracker that explains what you own — Track every broker, bank and exchange in one place. Marisco explains your real returns, ETF overlap, dividends and fees, so you learn as you invest. (trymarisco.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549781646994309183
   - [Marisco | Portfolio tracker that explains what you own](https://trymarisco.com/)
   - Source: https://trymarisco.com/ (by Manu)

24. **Hey guys! I wanted to show off NexusTrade: NexusTrade is a tool for developers, retail investors, and finance**
   - Hey guys! I wanted to show off NexusTrade: https://nexustrade.io/ NexusTrade is a tool for developers, retail investors, and finance professionals to automate their trading using artificial intelligence. You can connect it to your favorite AI agent and use it to automate financial research and deploy algorithmic trading strategies. Jev seems like an awesome fit to replace my tool calling loop. If it's as fast as advertised, then I'm extremely excited to see it in action. Check out NexusTrade and DM me your feedback! Linked projects: • NexusTrade | Find & Build AI Trading Bots — An AI-native algorithmic trading platform for building, validating, and operating trading systems with Aurora or real community trading bots. (nexustrade.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549720979654320188
   - [NexusTrade | Find & Build AI Trading Bots](https://nexustrade.io/)
   - Source: https://nexustrade.io/ (by Austin)

25. **Stock price predictor based on the news article.**
   - Stock price predictor based on the news article. Current tools on the market are called Systematic Alternative Data Processing. But they lack semantic depth definetely, also traditional quant models have to be retrained and cost a lot. This one is basically free. Jev has a good future in finance. Linked projects: • image.png — image/png · 139 KB (cdn.discordapp.com/attachments/1483217545040232493/1549615712165691392) • image.png — image/png · 150 KB (cdn.discordapp.com/attachments/1483217545040232493/1549615712589447169) • image.png — image/png · 154 KB (cdn.discordapp.com/attachments/1483217545040232493/1549615712883056650)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549615712165691392/image.png?ex=6aaea358&is=6aad51d8&hm=134f5185765f1c1919bc3be1c54d1efad4df64098aa5dd17b37fd95871267188&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549615712589447169/image.png?ex=6aaea358&is=6aad51d8&hm=d0fb07fe9a84730fea5624e342dece9674a48d641d1e4e0ab70dfa409236c9df&)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549615712883056650/image.png?ex=6aaea358&is=6aad51d8&hm=dd439b29ed5b881f3e43ffb28505ce02005d05b1d8fa2880c6412afc67f4c949&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549615713193562143 (by thodoh)

26. **idk what Eliza is, this is my own WIP thing which consumes all the data you give it and classifies it as needs human**
   - idk what Eliza is, this is my own WIP thing which consumes all the data you give it and classifies it as needs human input vs. ignore, then if the former, classify into a category, then that is fed to a (relatively) more advanced LLM which generates the chip and decision actions to click on (and notifies you) The last part is cheap, because it's the equivalent of <100 Luna/Sonnet calls a day, trivial cost. The expensive part is sifting through unfathomable amounts of garbage data of indeterminate format. Emails and chat messages aside it consumes raw sensor outputs from IoT/smart home devices, health/fitness trackers that have different APIs, location trackers for belongings/pets, banking, going through massive camera rolls There are no standard APIs that cover all possible consumer data stream combinations and so this must be LLM-routed, which was always the most expensive part (with cl
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549609407611142155 (by Cleista)

27. **Jake, commercial GC in Texas.**
   - Jake, commercial GC in Texas. Not an AI company, I build buildings. Caught the tail of the AMA today. The use case I care about is the Covey Law one, checking every turn an LLM produces against the source it came from. My agents summarize client calls and vendor bills, and a summary claiming a payment cleared when it didn't costs me real money. Built that check tonight on a cheap generic model, questions written in the System One format so it swaps to Jev when access opens. Would like to find out whether the confidence holds up on construction data.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549598176833568922 (by Jake Mauldin)

28. **I'm interested as I have newer project I started to get Claude to play a complicated MMO as a way to understand how**
   - I'm interested as I have newer project I started to get Claude to play a complicated MMO as a way to understand how LLMs "see" games in real time and experimenting with modeling that vision between humans and AI, as well as how to make instantaneous decisions in a 4d world (combat, movement, etc). I'm also interested in understanding how much better this sort of AI would perform for automated investment research and trading systems
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549513223374508163 (by Lord Vomitron)

29. **jev-trader: Jev buy/sell bot on Monad, dry-run by default**
   - A trading bot using Jev for buy/sell decisions targeting Kuru MON-USDC on Monad. Defaults to dry-run/mock mode; does not prove or guarantee profitability. Linked projects: • jarrodwatts/jev-trader — One AI trade decision every Monad block. Jev on Kuru MON-USDC. — 840★ · TypeScript (github.com/jarrodwatts/jev-trader)
   - [jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader)
   - Source: https://github.com/jarrodwatts/jev-trader (by @jarrodwatts)

### Social (20)

1. **Hey, made a post on X listing best Jev projects**
   - Hey, made a post on X listing best Jev projects https://x.com/valentynkit/status/2101014650624028997?s=20 Linked projects: • Post by @valentynkit — Nobody has shipped 400 projects on a 3-day-old model before. This one can't write a sentence. Jev (@typesafeai) launched Tuesday. State in, probabilities out, 100 ms, no text. Went through all 400, kept the ones worth yo (x.com/valentynkit/status/2101014650624028997) • Post by @valentynkit — Nobody has shipped 400 projects on a 3-day-old model before. This one can't write a sentence. Jev (@typesafeai) launched Tuesday. State in, probabilities out, 100 ms, no text. Went through all 400, kept the ones worth yo (twitter.com/valentynkit/status/2101014650624028997) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550574613711290500
   - [Post by @valentynkit](https://x.com/valentynkit/status/2101014650624028997?s=20)
   - Source: https://x.com/valentynkit/status/2101014650624028997?s=20 (by valentynkit)

2. **I used Jev to power my Bookmark management App and got few more good ideas for use cases for this model**
   - I used Jev to power my Bookmark management App and got few more good ideas for use cases for this model https://www.linkedin.com/feed/update/urn:li:activity:7506672882857574400/ Linked projects: • #ai #copilotstudio #powerplatform #aiarchitecture #llm #automation #artificialintelligence #jev | Sebastian Sochacki — I’ve been experimenting with TypeSafe AI Jev recently, and I’m finding more and more interesting use cases for it. One of my latest projects is a custom bookmark management app I built for myself. It connects to my brows (linkedin.com/feed/update/urn:li:activity:7506672882857574400) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550470783795593237
   - [#ai #copilotstudio #powerplatform #aiarchitecture #llm #automation #artificialintelligence #jev | Sebastian Sochacki](https://www.linkedin.com/feed/update/urn:li:activity:7506672882857574400/)
   - Source: https://www.linkedin.com/feed/update/urn:li:activity:7506672882857574400/ (by Crazy5murf)

3. **Put together a walkthrough and dynamic simulation u can tinker with showing when to use Jev before, after, or instead**
   - https://protrailblazer.com/posts/ Put together a walkthrough and dynamic simulation u can tinker with showing when to use Jev before, after, or instead of Claude Code. Started posting examples and guides on X yesterday - Follow for more: https://x.com/ProTrailblazer Linked projects: • Posts | Pro Trailblazer — Posts, guides, and insights from Pro Trailblazer. Deep dives on tools, strategy, and practice. (protrailblazer.com/posts) • Screenshot_2026-09-17_at_1.21.17_PM.jpg — image/jpeg · 356 KB (cdn.discordapp.com/attachments/1483217545040232493/1550467067222954104) • typesafe-after-claude-code.png — image/png · 345 KB (cdn.discordapp.com/attachments/1483217545040232493/1550467067726135446) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550467068279787560
   - [Posts | Pro Trailblazer](https://protrailblazer.com/posts/)
   - [@ProTrailblazer](https://x.com/ProTrailblazer)
   - [Screenshot_2026-09-17_at_1.21.17_PM.jpg](https://cdn.discordapp.com/attachments/1483217545040232493/1550467067222954104/Screenshot_2026-09-17_at_1.21.17_PM.jpg?ex=6aae707b&is=6aad1efb&hm=c328381d5f5a37d5039e553332ba594bd7da611abc4b06cb735eddfcc926a319&)
   - [typesafe-after-claude-code.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550467067726135446/typesafe-after-claude-code.png?ex=6aae707b&is=6aad1efb&hm=087268abba4fd5fa7cc6ea955459ccd607b119ffd1e76a35d48d413761343924&)
   - Source: https://protrailblazer.com/posts/ (by 3200.Pro)

4. **I run 10k record by both Sol Luna and Jev here is how it come up**
   - I run 10k record by both Sol Luna and Jev here is how it come up https://www.linkedin.com/feed/update/urn:li:activity:7506507049023840256/ Linked projects: • #ai #artificialintelligence #typesafeai #jev #llm #aiagents #automation #powerplatform #enterpriseai | Sebastian Sochack — I just tested System Two’s TypeSafe AI Jev against GPT-5.6 Luna, and the results were interesting. I built a classification test using 10,000 synthetic claims, with a known expected outcome: 51% should follow the automat (linkedin.com/feed/update/urn:li:activity:7506507049023840256) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550421360445104198
   - [#ai #artificialintelligence #typesafeai #jev #llm #aiagents #automation #powerplatform #enterpriseai | Sebastian Sochack](https://www.linkedin.com/feed/update/urn:li:activity:7506507049023840256/)
   - Source: https://www.linkedin.com/feed/update/urn:li:activity:7506507049023840256/ (by Crazy5murf)

5. **I found this on Twitter.**
   - I found this on Twitter. https://x.com/jackcheng/status/2100729670991802386 Linked projects: • Post by @jackcheng — Jev is the future (x.com/jackcheng/status/2100729670991802386) • Post by @jackcheng — Jev is the future (twitter.com/jackcheng/status/2100729670991802386) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550351309478035539
   - [Post by @jackcheng](https://x.com/jackcheng/status/2100729670991802386)
   - Source: https://x.com/jackcheng/status/2100729670991802386 (by Belligerent428)

6. **uses Jev for detecting if a post should be moderated 😄**
   - https://fixupx.com/just_some_dev/status/2100757839056634080 uses Jev for detecting if a post should be moderated 😄 Linked projects: • Post by @just_some_dev — Introducing Jeeves - A plain text moderation tool for Discord Jeeves is a Discord bot with on its face simple but powerful primitives powered by @typesafeai's Jev, Gemini, and Neon. There are just 5 commands: invite, add (fixupx.com/just_some_dev/status/2100757839056634080) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550317577190899742
   - [Post by @just_some_dev](https://fixupx.com/just_some_dev/status/2100757839056634080)
   - Source: https://fixupx.com/just_some_dev/status/2100757839056634080 (by JustSomeDev)

7. **I wrote an article about how I want to use Jev in mz marketing workflows.**
   - I wrote an article about how I want to use Jev in mz marketing workflows. I would like someone to check it and maybe let's build something together. Also I'm still waiting on a waitlist so maybe someone from TypeSafe provides me with access https://www.linkedin.com/pulse/jev-wont-replace-llms-its-fast-cheap-typed-much-less-magical-fisera-5bx4f/ Linked projects: • Jev Won’t Replace LLMs. It’s Fast, Cheap, Typed, and Much Less Magical Than the Launch Suggests — Earlier this week another AI launch got a lot of attention. It’s called Jev, a product built by TypeSafe AI, founded by former OpenAI researcher Diogo Almeida. (linkedin.com/pulse/jev-wont-replace-llms-its-fast-cheap-typed-much-les) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550241235208507564
   - [Jev Won’t Replace LLMs. It’s Fast, Cheap, Typed, and Much Less Magical Than the Launch Suggests](https://www.linkedin.com/pulse/jev-wont-replace-llms-its-fast-cheap-typed-much-less-magical-fisera-5bx4f/)
   - Source: https://www.linkedin.com/pulse/jev-wont-replace-llms-its-fast-cheap-typed-much-less-magical-fisera-5bx4f/ (by marekario)

8. **Works pretty nicely to classify issues!**
   - Works pretty nicely to classify issues! Did a quick proof of concept, it takes posts from a forum channel in my radio simulator's discord, decides whether it is actually worthy of being tracked, and the severity, and the labels to give it.. then IF it is considered worthy, it is passed to an LLM to generate the title and description of the issue in a more... understandable to me language instead of the half sentence people usually write Linked projects: • image.png — image/png · 169 KB (cdn.discordapp.com/attachments/1483217545040232493/1550216887139442849)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550216887139442849/image.png?ex=6aaed8fb&is=6aad877b&hm=76c06ac0d8721c3257593f1c7bb2ca7d241e17a961145aff02d848c2e38ef200&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550216887512604732 (by qrmcat)

9. **Shared by **MatrixMaven: posts raghuvadapally_ F0 9D 97 A7 F0 9D 97 B5 F0 9D 97 B2 F0**
   - https://www.linkedin.com/posts/raghuvadapally_%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%97%A4%F0%9D%98%82%F0%9D%97%B2%F0%9D%98%80%F0%9D%98%81%F0%9D%97%B6%F0%9D%97%BC%F0%9D%97%BB-%F0%9D%97%A6%F0%9D%97%B5%F0%9D%97%AE%F0%9D%97%BD%F0%9D%97%B2-%F0%9D%97%9C%F0%9D%98%80-%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2-activity-7506415829442424832-95UB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAC35IoB5xF9GSZM4IPL1dUi1CSkUPeBLSU Linked projects: • 𝗧𝗵𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗦𝗵𝗮𝗽𝗲 𝗜𝘀 𝘁𝗵𝗲 𝗣𝗿𝗼𝗱𝘂𝗰𝘁 The interesting promise here is simple: AI systems may be — 𝗧𝗵𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗦𝗵𝗮𝗽𝗲 𝗜𝘀 𝘁𝗵𝗲 𝗣𝗿𝗼𝗱𝘂𝗰𝘁 The interesting promise here is simple: AI systems may be able to get much cheaper and faster without getting dumber. A lot of production work does not need a (linkedin.com/posts/raghuvadapally_%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2) Discussion: https://disco
   - [𝗧𝗵𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗦𝗵𝗮𝗽𝗲 𝗜𝘀 𝘁𝗵𝗲 𝗣𝗿𝗼𝗱𝘂𝗰𝘁 The interesting promise here is simple: AI systems may be ](https://www.linkedin.com/posts/raghuvadapally_%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%97%A4%F0%9D%98%82%F0%9D%97%B2%F0%9D%98%80%F0%9D%98%81%F0%9D%97%B6%F0%9D%97%BC%F0%9D%97%BB-%F0%9D%97%A6%F0%9D%97%B5%F0%9D%97%AE%F0%9D%97%BD%F0%9D%97%B2-%F0%9D%97%9C%F0%9D%98%80-%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2-activity-7506415829442424832-95UB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAC35IoB5xF9GSZM4IPL1dUi1CSkUPeBLSU)
   - Source: https://www.linkedin.com/posts/raghuvadapally_%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%97%A4%F0%9D%98%82%F0%9D%97%B2%F0%9D%98%80%F0%9D%98%81%F0%9D%97%B6%F0%9D%97%BC%F0%9D%97%BB-%F0%9D%97%A6%F0%9D%97%B5%F0%9D%97%AE%F0%9D%97%BD%F0%9D%97%B2-%F0%9D%97%9C%F0%9D%98%80-%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2-activity-7506415829442424832-95UB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAC35IoB5xF9GSZM4IPL1dUi1CSkUPeBLSU (by **MatrixMaven)

10. **In Case you were wondering too...**
   - In Case you were wondering too... I put together a few explanation simulations for myself so I could get a good idea of how/when to use Jev. Here's the before cowork simulation and explanation: https://x.com/ProTrailblazer/status/2100644635924185449?s=20 (just started posting on x... don't know nobody.) Linked projects: • Post by @ProTrailblazer — I'm @claudeai Code + @herdrdev all day. I wondered how @typesafeai Jev could be integrated before I got into Claude Code. Put together an interactive simulation and general guide that helped. https://protrailblazer.com/p (x.com/ProTrailblazer/status/2100644635924185449) • Post by @ProTrailblazer — I'm @claudeai Code + @herdrdev all day. I wondered how @typesafeai Jev could be integrated before I got into Claude Code. Put together an interactive simulation and general guide that helped. https://protrailblazer.com/p (twitter.com/ProTrailblazer/st
   - [Post by @ProTrailblazer](https://x.com/ProTrailblazer/status/2100644635924185449?s=20)
   - Source: https://x.com/ProTrailblazer/status/2100644635924185449?s=20 (by 3200.Pro)

11. **Shared by Bonadio: posts cesarbonadio_ai artificialintelligence typesafe activi**
   - https://www.linkedin.com/posts/cesarbonadio_ai-artificialintelligence-typesafe-activity-7506387402157088768-A5uP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFNzvoB4_yNm_fowJ0EOS7QudCE_rnRLJw Linked projects: • #ai #artificialintelligence #typesafe #tetris #softwareengineering #machinelearning | Cesar Bonadio — Muita diversão hoje testando o novo modelo de IA da TypeSafe — o novo “new kid on the block” no mundo da IA. 🤖🎮 A proposta é bem diferente dos LLMs que estamos acostumados a usar: o modelo é voltado para classificações (linkedin.com/posts/cesarbonadio_ai-artificialintelligence-typesafe-act) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550181630369472724
   - [#ai #artificialintelligence #typesafe #tetris #softwareengineering #machinelearning | Cesar Bonadio](https://www.linkedin.com/posts/cesarbonadio_ai-artificialintelligence-typesafe-activity-7506387402157088768-A5uP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFNzvoB4_yNm_fowJ0EOS7QudCE_rnRLJw)
   - Source: https://www.linkedin.com/posts/cesarbonadio_ai-artificialintelligence-typesafe-activity-7506387402157088768-A5uP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFNzvoB4_yNm_fowJ0EOS7QudCE_rnRLJw (by Bonadio)

12. **repost to support 🙏**
   - https://x.com/meliwat93/status/2100404711283188181?s=46 repost to support 🙏 Linked projects: • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (x.com/meliwat93/status/2100404711283188181) • Post by @Meliwat93 — I got access to Jev! I had it play NES tetris! (twitter.com/meliwat93/status/2100404711283188181) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550128338947940484
   - [Post by @Meliwat93](https://x.com/meliwat93/status/2100404711283188181?s=46)
   - Source: https://x.com/meliwat93/status/2100404711283188181?s=46 (by Meliwat)

13. **Shared by Neo: marcus_lowe status 2100315518930661861**
   - https://fxtwitter.com/marcus_lowe/status/2100315518930661861?s=20 Linked projects: • Post by @marcus_lowe — I got early access to @typesafeai's new Jev model and built a demo of it playing tetris The generation speed is so fast that it's pushing blocks down This feels like another "this changes everything" moment (fxtwitter.com/marcus_lowe/status/2100315518930661861) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550046219974221834
   - [Post by @marcus_lowe](https://fxtwitter.com/marcus_lowe/status/2100315518930661861?s=20)
   - Source: https://fxtwitter.com/marcus_lowe/status/2100315518930661861?s=20 (by Neo)

14. **I did a thing!**
   - I did a thing! https://bsky.app/profile/leo.sylin.org/post/3mvp2qbuumk2s Linked projects: • Leo Botinelly (@leo.sylin.org) — A little toy made to test #TypeSafe JEV. Visuals by Astra, logic by GLM 5.3. Each airplane only has information about itself and its surroundings (plus ATC info if near a tower) and all decisions are made by Jev, calibra (bsky.app/profile/leo.sylin.org/post/3mvp2qbuumk2s) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550036232149401761
   - [Leo Botinelly (@leo.sylin.org)](https://bsky.app/profile/leo.sylin.org/post/3mvp2qbuumk2s)
   - Source: https://bsky.app/profile/leo.sylin.org/post/3mvp2qbuumk2s (by OnoSendai)

15. **found me the one comment in this reddit post that was relevant to my query nice - open to more ideas in this direction**
   - found me the one comment in this reddit post that was relevant to my query nice - open to more ideas in this direction lol Linked projects: • image.png — image/png · 271 KB (cdn.discordapp.com/attachments/1483217545040232493/1549972535905488927)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549972535905488927/image.png?ex=6aae9e29&is=6aad4ca9&hm=2ea719d77bbc1bf4a42f7c046fa0880b6e26763df3c3731d03d552ce241a79ec&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549972537780215808 (by hawkyre)

16. **here is the thread if anyone wanna comment**
   - here is the thread if anyone wanna comment https://x.com/anessbelbati/status/2100398911911248050?s=20 Linked projects: • Post by @anessbelbati — i gave jev a reranker's job. 8 datasets, 2,327 questions, 30 results each, vs cohere rerank 4 pro and zerank-2 ndcg@10 averaged per dataset: jev 0.692, cohere 0.691 averaged per question: cohere 0.756, jev 0.738 no clean (x.com/anessbelbati/status/2100398911911248050) • Post by @anessbelbati — i gave jev a reranker's job. 8 datasets, 2,327 questions, 30 results each, vs cohere rerank 4 pro and zerank-2 ndcg@10 averaged per dataset: jev 0.692, cohere 0.691 averaged per question: cohere 0.756, jev 0.738 no clean (twitter.com/anessbelbati/status/2100398911911248050) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549958210700443670
   - [Post by @anessbelbati](https://x.com/anessbelbati/status/2100398911911248050?s=20)
   - Source: https://x.com/anessbelbati/status/2100398911911248050?s=20 (by nss)

17. **posted on x guys about jev**
   - https://x.com/ayaankhan_x/status/2100322283407700308?s=20 posted on x guys about jev Linked projects: • Post by @ayaankhan_x — An ai lab just built a model that cannot write a sentence. on purpose. jev by typesafe makes only structured decisions no hallucination, 200x faster, 400x cheaper. would you trade free text for speed and reliability? (x.com/ayaankhan_x/status/2100322283407700308) • Post by @ayaankhan_x — An ai lab just built a model that cannot write a sentence. on purpose. jev by typesafe makes only structured decisions no hallucination, 200x faster, 400x cheaper. would you trade free text for speed and reliability? (twitter.com/ayaankhan_x/status/2100322283407700308) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549882064663224381
   - [Post by @ayaankhan_x](https://x.com/ayaankhan_x/status/2100322283407700308?s=20)
   - Source: https://x.com/ayaankhan_x/status/2100322283407700308?s=20 (by ayaan)

18. **Jev thread inspired me to build I turned the replies into an idea board where people can browse, vote, and discuss**
   - Jev thread inspired me to build https://jevboard.com. I turned the replies into an idea board where people can browse, vote, and discuss what should get built or partner up Linked projects: • Jev Board — What should we build next? — Discover product ideas for Jev. Heart the ideas you want someone to build. An independent, community-ranked directory. (jevboard.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549850389661351978
   - [Jev Board — What should we build next?](https://jevboard.com)
   - Source: https://jevboard.com (by BlissF00l)

19. **I made the Doom demo from our launch thread on Twitter.**
   - I made the Doom demo from our launch thread on Twitter. It's been one of my favorite silly projects ever https://x.com/CompleteSkeptic/status/2099925687465570372 Linked projects: • Post by @CompleteSkeptic — We love how this doomo doomonstrates real-time intelligence and what can be doone with code + AI! ~10 calls/sec = ~$7/hour (x.com/CompleteSkeptic/status/2099925687465570372) • Post by @CompleteSkeptic — We love how this doomo doomonstrates real-time intelligence and what can be doone with code + AI! ~10 calls/sec = ~$7/hour (twitter.com/CompleteSkeptic/status/2099925687465570372) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549486851969257652
   - [Post by @CompleteSkeptic](https://x.com/CompleteSkeptic/status/2099925687465570372)
   - Source: https://x.com/CompleteSkeptic/status/2099925687465570372 (by AllieTheIcon)

20. **Realtime LinkedIn filter removes cringe, clickbait and low-value posts with Jev**
   - Pankaj built a realtime tool that filters cringe content out of LinkedIn with Jev. It checks every post, classifies it as cringe or non-cringe, and automatically filters cringe, clickbait and low-value posts — it filtered out almost his entire LinkedIn feed. Next up: engagement-bait filters for YouTube and Twitter. — @the2ndfloorguy (86 likes) Linked projects: • Post by @the2ndfloorguy — I built a realtime tool to filter out cringe content on linkedin with typesafe. It checks every post and classifies as cringe content or non-cringe. automatically filters cringe, clickbait & low-value posts. (x.com/the2ndfloorguy/status/2100954932799328766)
   - [Post by @the2ndfloorguy](https://x.com/the2ndfloorguy/status/2100954932799328766)
   - Source: https://x.com/the2ndfloorguy/status/2100954932799328766 (by @the2ndfloorguy)

### Food (14)

1. **Shared my first experiences with Jev in my newsletter here.**
   - Shared my first experiences with Jev in my newsletter here. Some interesting findings and a proof for the origins of the Jev name. https://www.linkedin.com/pulse/sandbox-side-quest-1-jev-system-one-model-ryan-bruins-rpesc/ I replicated the "Line-by-line Search" cookbook example and benchmarked it against an LLM, proving the claimed performance gains, but also showing the massive input token count for using this search approach with the API. I tried a binary search approach (Branch & Bound), and sadly that took even more input tokens than the brute-force line-by-line for my use case. Anyone know of a more efficient approach that would result in significantly less input tokens? I would be happy to learn. 😁 Linked projects: • Sandbox Side Quest 1: Jev System One Model — Jev processed my document 23 times faster than a cheap LLM and caught a false positive the LLM missed. Then I looked at t
   - [Sandbox Side Quest 1: Jev System One Model](https://www.linkedin.com/pulse/sandbox-side-quest-1-jev-system-one-model-ryan-bruins-rpesc/)
   - Source: https://www.linkedin.com/pulse/sandbox-side-quest-1-jev-system-one-model-ryan-bruins-rpesc/ (by sh0rtythegreat)

2. **hey guys was cooking this cli in rust to substitue my old gate checks, you can run in watch mode, so during dev is**
   - https://github.com/Tech-Byte-Frontier/jevgate hey guys was cooking this cli in rust to substitue my old gate checks, you can run in watch mode, so during dev is very fast for jev to identify these 3 classifications: File organization: would separating unrelated responsibilities help? Function simplification: is there a useful task to extract or control flow to simplify? Shared logic: should repeated implementations share a helper? its already on crates.io try it in your codebase is very fast i would love feedbacks Linked projects: • Tech-Byte-Frontier/jevgate — File-scoped maintainability review with TypeSafe Jev - Tech-Byte-Frontier/jevgate (github.com/Tech-Byte-Frontier/jevgate) • image.png — image/png · 54 KB (cdn.discordapp.com/attachments/1483217545040232493/1550560835368259794) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550560835838017666
   - [Tech-Byte-Frontier/jevgate](https://github.com/Tech-Byte-Frontier/jevgate)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550560835368259794/image.png?ex=6aaec7cf&is=6aad764f&hm=69a90dfdd38952d1c03ba42f8b08734f3dae5535cccc1c82cb470852ee38aafa&)
   - Source: https://github.com/Tech-Byte-Frontier/jevgate (by Binatof)

3. **> We benchmarked TypeSafe's Jev against our production LLM classifier — with real customer data and human ground truth.**
   - > We benchmarked TypeSafe's Jev against our production LLM classifier — with real customer data and human ground truth. Here's what happened. 🧵 > > Hey! I'm Brian, building Atisbo — a product intelligence platform that turns raw customer feedback (support chats, reviews, social, calls) into a ranked list of what to build next. Evidence comes in, clusters into problems, gets scored, and PMs decide from there. We dogfood it on ourselves daily. > https://www.atisbo.dev > > Every piece of feedback entering Atisbo gets classified (problem / idea / question / noise) by a generative LLM. > High-confidence noise gets auto-filtered; the rest goes to human triage. > That classification decision is load-bearing: a false "noise" silently deletes a real customer pain from the roadmap. > So when I found TypeSafe, the question wasn't "is this cool" — it was "can a System One model beat or complement o
   - [Atisbo — Product evidence and decisions for teams and agents](https://www.atisbo.dev)
   - Source: https://www.atisbo.dev (by Brian Ochoa)

4. **I've been working for a while on a mobile-first persistent agent harness where 90% of it is about classification of**
   - I've been working for a while on a mobile-first persistent agent harness where 90% of it is about classification of task and routing to the appropriate shortcut (apple)/ intent (android) I think a tool like Jev would be perfect for this. Is there anybody I can send cookies to, beg, or plead with to get included in the access? Upstream = https://github.com/GreyssonEnterprises/munin , opinionated commercial downtream product (https://heysolvi.com/ - Apologies for the default AI slop Tailwind theme. We're focused more on getting the product functional than the marketing side at the moment ) Linked projects: • GreyssonEnterprises/munin — The open-source mobile AI agent runtime. Build voice-enabled AI assistants that run natively on phones — with tools, memory, and extensibility. - GreyssonEnterprises/munin (github.com/GreyssonEnterprises/munin) • Solvi — A More Practical Way to Use Your Phon
   - [GreyssonEnterprises/munin](https://github.com/GreyssonEnterprises/munin)
   - [Solvi — A More Practical Way to Use Your Phone](https://heysolvi.com/)
   - Source: https://github.com/GreyssonEnterprises/munin (by Grimm)

5. **play against jev in chess with a twist: bonechess: inscryption-inspired simple chess+card game hybrid: - sacrifice**
   - play against jev in chess with a twist: https://bonechess.acadine.dev bonechess: inscryption-inspired simple chess+card game hybrid: - sacrifice pieces to get cards in the lanes - test jev's adaptability with strange new game rules. Shows some of jev's noul, choice and score for each move. i must admit, it cooked me a few times. built using hermes, fable and jev! Linked projects: • Bonechess (bonechess.acadine.dev) • bonechess.png — image/png · 357 KB (cdn.discordapp.com/attachments/1483217545040232493/1550407292753551380) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550407293022240809
   - [Bonechess](https://bonechess.acadine.dev)
   - [bonechess.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550407292753551380/bonechess.png?ex=6aaee18f&is=6aad900f&hm=fd9d0746364af5c0b614196b4787c21af4ce54f3bacb073789bd587ced642a4a&)
   - Source: https://bonechess.acadine.dev (by Jonathan Bylos)

6. ****My first Jev result!** Recreated the example "Line-by-line search" ( ) to process real Terms of Service (ToS) docs,**
   - **My first Jev result!** Recreated the example "Line-by-line search" (https://docs.typesafe.ai/cookbooks/semantic_find) to process real Terms of Service (ToS) docs, and identifying the specific lines of the ToS that were related to user or vendor ownership of input/output content (AI Vendor ToS'), and then compared that to the same function being run by an LLM (DeepSeek V4 Flash)... the results were immediate **23x faster with Jev!** Also the LLM had a false positive (identifying a line about software intellectual property) which **Jev did not! ** However the token count seems high, really high, on the Jev side, need to look into if this is an error, or if the Line-by-Line search is just that inefficient, if it is right the token cost might actually be higher with Jev even with the super low input-only pricing. I'll share more after some debugging and my full POC is running. 😁 Linked pr
   - [Line-by-line search - TypeSafe AI](https://docs.typesafe.ai/cookbooks/semantic_find)
   - [Jev_SmokeTest1.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550399686911860786/Jev_SmokeTest1.png?ex=6aaeda7a&is=6aad88fa&hm=b672141989b45fa2d9cfd75d426b5feb10092144d5b31b1c037763ea2a6419e8&)
   - Source: https://docs.typesafe.ai/cookbooks/semantic_find (by sh0rtythegreat)

7. **hi folks! just cooked up a fun use case where the model crushed it 👀**
   - hi folks! just cooked up a fun use case where the model crushed it 👀 https://x.com/atomic_chat_hq/status/2100644221279424925?s=46 Linked projects: • Post by @atomic_chat_hq — Jev v1.13 dodges rockets with probability calculation 🚀 @typesafeai's new non-LLM model returns decisions instead of text so we had it calculate a safe tile every 330 ms while rockets fell and it survived 25 of 26 for u (x.com/atomic_chat_hq/status/2100644221279424925) • Post by @atomic_chat_hq — Jev v1.13 dodges rockets with probability calculation 🚀 @typesafeai's new non-LLM model returns decisions instead of text so we had it calculate a safe tile every 330 ms while rockets fell and it survived 25 of 26 for u (twitter.com/atomic_chat_hq/status/2100644221279424925) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550246459444826224
   - [Post by @atomic_chat_hq](https://x.com/atomic_chat_hq/status/2100644221279424925?s=46)
   - Source: https://x.com/atomic_chat_hq/status/2100644221279424925?s=46 (by danny)

8. **Built a grocery shopping agent for myself using jev, it's super fast:**
   - Built a grocery shopping agent for myself using jev, it's super fast: https://x.com/heykathan/status/2100680287042814326?s=20 Linked projects: • Post by @heykathan — Jev is fast. ⚡ Got Jev to do my grocery shopping in ~1 minute 🤯 Videomemory + Jev (@typesafeai) figured out everything I needed to make mushroom toast and got my cart ready. > visual + transcription understanding > figu (x.com/heykathan/status/2100680287042814326) • Post by @heykathan — Jev is fast. ⚡ Got Jev to do my grocery shopping in ~1 minute 🤯 Videomemory + Jev (@typesafeai) figured out everything I needed to make mushroom toast and got my cart ready. > visual + transcription understanding > figu (twitter.com/heykathan/status/2100680287042814326) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550241116899508316
   - [Post by @heykathan](https://x.com/heykathan/status/2100680287042814326?s=20)
   - Source: https://x.com/heykathan/status/2100680287042814326?s=20 (by Kathan Desai)

9. **Tried the **semantic-find cookbook** on supplier replies for Factory Twelve, an apparel sourcing platform, using**
   - Tried the **semantic-find cookbook** on supplier replies for Factory Twelve, an apparel sourcing platform, using `jev-1.13.0`. Three questions over the same state in one System One request: - **Choice — `where`:** select the most relevant clause ID. - **Noul — `exists`:** probability the reply supplies at least one requested detail. - **Choice — `coverage`:** classify the answer as `complete`, `partial`, or `absent`. Existence is separate because clause Choice always produces a winner. Coverage is separate because Noul near 0.5 means uncertainty—not a partially complete answer. Code preserves source IDs, versions, hashes and character offsets, then copies the selected text verbatim. No generated quotations. **First run: 12 synthetic development cases** - Existence: **12/12** correct at a 0.5 threshold. - Clause selection: **8/8** on answer-bearing cases. - Highlights suppressed for all *
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550128168437030983 (by Jeff)

10. **Made a little Sudoku playground with Jev.**
   - Made a little Sudoku playground with Jev. Give it a difficulty brief, then watch each move live or slow it down. Jev chooses the puzzle recipe and digits; a local engine checks uniqueness and validates each move. Here's the demo: https://x.com/alexpsouthwell/status/2100543705694560657 Linked projects: • Post by @alexpsouthwell — Built a little Sudoku playground for TypeSafe AI's Jev. Give it a difficulty brief, watch each move live, or slow it down to follow along. Jev chooses; a local engine checks every move and keeps puzzles uniquely solvable (x.com/alexpsouthwell/status/2100543705694560657) • Post by @alexpsouthwell — Built a little Sudoku playground for TypeSafe AI's Jev. Give it a difficulty brief, watch each move live, or slow it down to follow along. Jev chooses; a local engine checks every move and keeps puzzles uniquely solvable (twitter.com/alexpsouthwell/status/21005437056945
   - [Post by @alexpsouthwell](https://x.com/alexpsouthwell/status/2100543705694560657)
   - Source: https://x.com/alexpsouthwell/status/2100543705694560657 (by saphid (he/him) 🇦🇺)

11. **[it has something on this specifically ]( )**
   - [it has something on this specifically ](https://docs.typesafe.ai/cookbooks/hierarchical_classification) Linked projects: • Hierarchical classification - TypeSafe AI — Classifies documents through deep patent, retail product, biomedical, and source-code hierarchies using parallel beam search over TypeSafe Choice probabilities. (docs.typesafe.ai/cookbooks/hierarchical_classification) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549872293482733638
   - [Hierarchical classification - TypeSafe AI](https://docs.typesafe.ai/cookbooks/hierarchical_classification)
   - Source: https://docs.typesafe.ai/cookbooks/hierarchical_classification (by stanfordmanvandysavage)

12. **👋 Been building Agentmatica — an AI sales + support agent for websites.**
   - 👋 Been building Agentmatica — an AI sales + support agent for websites. The idea is to go beyond the usual “AI chatbot”: it learns the business, connects to platforms like Shopify/WordPress, answers customer questions, helps with product discovery, and can eventually take actions through integrations. We’ve been dogfooding it across our own sites/apps for the past month+ and just started onboarding external customers. Still early and shipping constantly, so would love any brutal feedback 😄 https://agentmatica.com/ Linked projects: • Agentmatica — Step away without letting your customers down — AI website chat for owner-led ecommerce teams. Step away from routine customer conversations without giving up control. Answers from your own pages with sources, private coaching, and human takeover when it matters. (agentmatica.com) Discussion: https://discord.com/channels/1483217544214085663/14
   - [Agentmatica — Step away without letting your customers down](https://agentmatica.com/)
   - Source: https://agentmatica.com/ (by robincingh)

13. **============================================================ [04:10:12.342] COGNITION Trigger: periodic Revision: 39**
   - ============================================================ [04:10:12.342] COGNITION Trigger: periodic Revision: 39 Current situation: Health: 20/20 Hunger: 20/20 Current action: SEEK_SHELTER Current goal: Explore the world while prioritizing your survival. Nearby hostiles: 0 Nearest threat: None Covered: No Day/night: Day Food available: No What changed: No semantic wake event occurred; this is the scheduled periodic evaluation. Jev considered: 51% SEEK_SHELTER 19% COLLECT dropped dropped_item (dropped item, 3.3m) (3.3m) 15% COLLECT dropped dropped_item (dropped item, 3.4m) (3.4m) 8% COLLECT dropped dropped_item (dropped item, 4.8m) (4.8m) Decision: SEEK_SHELTER Target: NONE Confidence: 0.44 Danger: 0 / 4 (Safe) Interrupt current action: No / probability 0.30 Readable interpretation: With danger rated 0/4 and hostile conditions present, Jev selected navigating to a covered shelter cand
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549635576700080239 (by Hyperion)

14. **If you have food allergies or religious dietary restrictions**
   - https://allergenmeds.com/ If you have food allergies or religious dietary restrictions Linked projects: • AllergenMeds | Find out what’s in your medication — Did you know your medication could contain common food allergens? AllergenMeds checks any medication against 100+ allergens and dietary restrictions, in seconds. Free on the App Store and Google Play. (allergenmeds.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549612226875232328
   - [AllergenMeds | Find out what’s in your medication](https://allergenmeds.com/)
   - Source: https://allergenmeds.com/ (by Cure)

### Travel (13)

1. **Pick a Zurich–London flight in 7.1 seconds of browser control**
   - Browser-use drives a real browser with Jev making each micro-decision — dates, options, cheapest fit — and lands a flight in 7.1 seconds real time, versus minutes for a classic agent loop.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **yeah no I agree, it will need a lot of beforehand set up to work correctly, something with future support of**
   - yeah no I agree, it will need a lot of beforehand set up to work correctly, something with future support of multimodal inputs would be much easier. For reference this is the demo that peaked my interest: https://github.com/browser-use/jev-ultrafast. A harness is deployed with a discrete action space and a discrete set of observations in a loop, with a final goal of finding a flight with certain params. Linked projects: • browser-use/jev-ultrafast — i. am. speed. Contribute to browser-use/jev-ultrafast development by creating an account on GitHub. (github.com/browser-use/jev-ultrafast) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550488211317329960
   - [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
   - Source: https://github.com/browser-use/jev-ultrafast (by ABKDR)

3. **Spent a day building tenet, a review gate for code that agents write.**
   - Spent a day building tenet, a review gate for code that agents write. It judges each commit, commit message and PR against rules written in plain English, using Jev. The rules come from poteto's unslop skill, hvpandya's stop-slop, dillon_mulroy's anti-slop and mattpocockuk's new /pr skill. It also generates rules from your AGENTS.md or CLAUDE.md, and you can write your own rules and presets. Here an agent trips four of them, gets blocked in 1.07 s for $0.0003, and fixes its own findings. https://github.com/zoidsh/tenetlint Linked projects: • zoidsh/tenetlint — The review gate for code that agents write: rules in plain language, judged on every commit - zoidsh/tenet (github.com/zoidsh/tenetlint) • EhJRxt-nMp6WJaGA.mp4 — video/mp4 · 6 MB (cdn.discordapp.com/attachments/1483217545040232493/1550462638809554944) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/
   - [zoidsh/tenetlint](https://github.com/zoidsh/tenetlint)
   - [EhJRxt-nMp6WJaGA.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550462638809554944/EhJRxt-nMp6WJaGA.mp4?ex=6aae6c5b&is=6aad1adb&hm=c443719bec1e5dd29224fb8cf56c632744c3290d89226e844a23fa3bebe95185&)
   - Source: https://github.com/zoidsh/tenetlint (by timche)

4. **Hey everyone 👋 I've been collecting public demos of what people are building with Jev, and I finally put them**
   - Hey everyone 👋 I've been collecting public demos of what people are building with Jev, and I finally put them together into a directory: https://typesafeai.app To be clear up front: it's unofficial and independent — I'm not affiliated with TypeSafe. Every entry links back to the original repo or write-up, and lists the claimed metric, known limitations, and an evidence grade, so you can see exactly what's verifiable vs. author-reported. 13 cases on it right now, for example: 🎮 Playing Super Mario from raw emulator state 🛫 Searching Google Flights in ~7s (browser-use's jev-ultrafast) 🖥️ Driving macOS from OCR + accessibility state 🐝 Completing a StarCraft shareware mission 🚁 Choosing drone tactics from camera feed …plus code-review routing, supervising/gating coding agents, MCP integrations, Home Assistant automation, and more Two things I'd love from this community: What's missing?
   - [What can Jev actually do?](https://typesafeai.app)
   - [What can Jev actually do?](https://typesafeai.app/submit)
   - [What can Jev actually do?](https://typesafeai.app/corrections)
   - Source: https://typesafeai.app (by gerrad_k)

5. **Hi TypeSafe Team, ​Here is my initial feedback after integrating the jev-latest (SystemOne) API into an automated**
   - Hi TypeSafe Team, ​Here is my initial feedback after integrating the jev-latest (SystemOne) API into an automated event-driven processing pipeline evaluating real-time public feeds (SEC filings, global supply chain events, and news wires). ​What Impressed Me (Core Strengths) ​Deterministic Type Constraints: The strict adherence to noul and choice schemas completely solves the output instability and hallucination issues common to standard generative LLMs. Parsing never broke across hundreds of automated cycles. ​Semantic Precision on Nuance: The engine accurately distinguished material operational bottlenecks from empty political rhetoric, and hostile accounting disputes from routine corporate transitions. Double negations and resolution clauses (e.g., "strike ended / averted") were correctly classified. ​Low Latency: API roundtrips consistently clocked between 600 ms and 900 ms per query
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550304417218044016 (by Hugo)

6. **I've built a drone autopilot using Jev.**
   - I've built a drone autopilot using Jev. - It flies from point A to point B, avoiding obstacles along the way. - One trip costs $0.01. - Uses Vercel AI SDK. - Code is on GitHub. https://x.com/arielweinberger/status/2100687687057285215?s=20 Linked projects: • Post by @arielweinberger — I've built a drone autopilot using Jev @typesafeai. It flies from point A to point B, avoiding obstacles along the way. One trip costs $0.01. Uses @vercel @aisdk. Code is on GitHub: https://github.com/arielweinberger/jev (x.com/arielweinberger/status/2100687687057285215) • Post by @arielweinberger — I've built a drone autopilot using Jev @typesafeai. It flies from point A to point B, avoiding obstacles along the way. One trip costs $0.01. Uses @vercel @aisdk. Code is on GitHub: https://github.com/arielweinberger/jev (twitter.com/arielweinberger/status/2100687687057285215) Discussion: https://discord.com/chan
   - [Post by @arielweinberger](https://x.com/arielweinberger/status/2100687687057285215?s=20)
   - Source: https://x.com/arielweinberger/status/2100687687057285215?s=20 (by Ariel Weinberger)

7. **Shared by Joseph: mslearn ai studio data travel finetune hotel jsonl**
   - https://microsoftlearning.github.io/mslearn-ai-studio/data/travel-finetune-hotel.jsonl Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550160257152589828
   - [https://microsoftlearning.github.io/mslearn-ai-studio/data/travel-finetune-hotel.jsonl](https://microsoftlearning.github.io/mslearn-ai-studio/data/travel-finetune-hotel.jsonl)
   - Source: https://microsoftlearning.github.io/mslearn-ai-studio/data/travel-finetune-hotel.jsonl (by Joseph)

8. **was anyone thinking about using TypeSafe as a tool caller/selector instead of usual tool call mechanism?**
   - was anyone thinking about using TypeSafe as a tool caller/selector instead of usual tool call mechanism? It can significaly reduce the round trips, for example! Super cool would be to have a capability in https://github.com/pydantic/pydantic-ai-harness/tree/main/pydantic_ai_harness (for example). This could change the whole way we all work with AI tool calls processing! What do u guys think? Linked projects: • pydantic/pydantic-ai-harness — Your agent's favorite harness, built on Pydantic AI - pydantic/pydantic-ai-harness (github.com/pydantic/pydantic-ai-harness/tree/main/pydantic_ai_harness) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550143423468670987
   - [pydantic/pydantic-ai-harness](https://github.com/pydantic/pydantic-ai-harness/tree/main/pydantic_ai_harness)
   - Source: https://github.com/pydantic/pydantic-ai-harness/tree/main/pydantic_ai_harness (by solovieff)

9. **Typesafe AI is still inconsistent when it comes to dimensional reasoning.**
   - Typesafe AI is still inconsistent when it comes to dimensional reasoning. > from typesafe_sdk import Choice, Noul, Score, TypeSafeClient, RetryPolicy > > scenario = """ > Imagine this. In the world where people have practically instant reflex and can dodge, the only way to hit the enemy is to saturate the battlefield with enough bullet such that there is nowhere to run. You can move in any direction. > > Let C be a constant, a be defender acceleration, d be distance, v be bullet velocity, H be hitbox size. > > Which equation most accurately describes the number of bullet required per hit? > > """ > > choices = """ > Cad/vH > C a^2 (d/v)^4/H > C a^2 H (d/v)^2 > C a H d / v > C a^2 (d/v)^3/H > C a (d/v)^3/H > C a (d/v)^4/H > None of the above > """.strip().split("\n") > > scenario = scenario.strip().replace("\n"," ") > > with TypeSafeClient(retry=RetryPolicy(max_retries=3, backoff_max=0.2,
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550103134053867543 (by Dreamlight Glitter)

10. **Hi everyone! Building Orfeo — a live sheet music app that follows pianists directly through the microphone. Live**
   - Hi everyone! Building Orfeo — a live sheet music app that follows pianists directly through the microphone. Live acoustic score following is notoriously noisy: room acoustics, mic placement, and physical dynamics create an unpredictable audio signal where traditional DSP struggles with edge cases (taking repeats, skipping bars, restarting). While standard LLMs could help arbitrate these messy ambiguities, they are far too slow and costly to run inside a live 50 ms loop. I want to plug Jev into my automated testing harness. Because I play on an acoustic Yamaha Silent piano, my bench captures the exact real-world acoustic environment alongside the mechanical ground truth: Raw iPad mic audio (the noisy acoustic reality in the room) Yamaha Silent optical MIDI strip (ground truth of physical keys pressed on the acoustic action) MusicXML score (ground truth of written notation) Benchmarking fa
   - [Orfeo — Your score, following along](https://orfeo-score.com)
   - Source: https://orfeo-score.com (by Fizbo)

11. **Analyzing logical relationships between sentences without using an LLM: - sentence segmentation is done with**
   - Analyzing logical relationships between sentences without using an LLM: - sentence segmentation is done with `Intl.Segmenter` in JS - determining the domain of the entire text, tagging sentence classes according to the domain, and connecting relationships between sentences are done with 3 calls to the Jev model. All of this takes 0.5 seconds (mostly network roundtrip) and the cost is nearly free. https://jev-demo.corca.ai/ Linked projects: • Argument Mapper (jev-demo.corca.ai) • image.png — image/png · 218 KB (cdn.discordapp.com/attachments/1483217545040232493/1549694052662902784) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549694052805513310
   - [Argument Mapper](https://jev-demo.corca.ai/)
   - [image.png](https://cdn.discordapp.com/attachments/1483217545040232493/1549694052662902784/image.png?ex=6aae438e&is=6aacf20e&hm=d143e07cf6dcf4c726b74ca6faba08eed0238e91617f6ad61af1a755286f15e1&)
   - Source: https://jev-demo.corca.ai/ (by gunggme)

12. **> Roughly 800ms per decision with 5 questions in one call, versus 10-30s of LLM round-trips before.**
   - > Roughly 800ms per decision with 5 questions in one call, versus 10-30s of LLM round-trips before. That's useful... I need that kind of speed, I've tried the smaller models that have lower latency on openrouter, and the ones tied with cerebras, or groq, but those are all unstable... really hoping for jev to be better
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549693529545252895 (by redwood)

13. **I've got a hermes agent that plays a interactive Telegram game (lootgamebot), and I got tired of burning LLM calls**
   - I've got a hermes agent that plays a interactive Telegram game (lootgamebot), and I got tired of burning LLM calls (and tokens) on decisions that are really just yes/no questions with known rules. So I wired Jev in as the judgment layer. Instead of prompting an LLM and parsing free text, my Python code now composes the game state (inventory, coins, odds, history) plus typed questions, and gets back calibrated probabilities it can branch on directly. Examples from today's logs (since I got access today lol): - Dice minigame (one reroll): 5 Noul questions, "keep die N?" -> {keep_1: 0.76, keep_2: 0.26, ...} -> reroll positions 2, 4, 5. One API call, ~700ms. - Risky PvP inspection, historically 0/8 wins in this pool, costs 8k coins: accept: 0.19 -> skip. 697ms. - Fragments: craft vs sell vs hold -> Choice, craft with 0.71 confidence, matched the strategy I'd hand-derived from two weeks of lo
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549693064770097183 (by casungo)

### Shopping (11)

1. **Match a service request to the best-fit company live**
   - A services aggregator takes "powerwash my driveway" plus area business profiles and returns best-fit percentages per company — a genuinely instant quote instead of "we will email you by end of day". Speed becomes the virtue signal.
   - Source: https://youtu.be/4mTLpuQpB80 (by Jev launch video)

2. **thanks! this is what my gpt gave after seeing ur site Design it in a playful neo-brutalist style:**
   - thanks! this is what my gpt gave after seeing ur site Design it in a playful neo-brutalist style: chunky bold text, thick black borders, offset shadows, rounded cards and buttons, flat pastel colors, dotted cream background, simple cartoonish shapes, and a fun sticker-like web interface aesthetic.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550565211616968727 (by lamp)

3. **Guys, stop watching Jev from the sidelines.**
   - Guys, stop watching Jev from the sidelines. Just BYOK ➡️ http://jevrouter.co Experience Jev models in your own agent with one click, no orchestration required. JevRouter is continuously improving and fully open source. Contributions welcome. Let’s build the best Jev Harness together. GitHub: https://github.com/BillionsBobby/JevRouter How it works: 1️⃣ Get a Jev API key. Official access is still waitlisted; OpenRouter works now. 2️⃣ Visit http://jevrouter.co and copy the instruction. 3️⃣ Add your Jev key and send it to your agent ✅ Supports Codex, Claude Code, and other popular agents. Jev helps agents make faster decisions with fewer tokens and lower costs. On 10 Toolathlon tasks, Jev’s serial mode achieved 38% top-5 tool-call position accuracy vs. 24% for DeepSeek V4.1 Flash—while running ~5.5× faster and costing ~7× less. Jev is built for fast, cost-efficient tool routing when executio
   - [JevRouter — Faster Agent Decisions](http://jevrouter.co)
   - [BillionsBobby/JevRouter](https://github.com/BillionsBobby/JevRouter)
   - [EE231899-4C0B-4AB1-AFBC-0044D49B401C.PNG](https://cdn.discordapp.com/attachments/1483217545040232493/1550526281148272732/EE231899-4C0B-4AB1-AFBC-0044D49B401C.PNG?ex=6aaea7a0&is=6aad5620&hm=650ac1d356cb588d37513511f541fd26929c08fef4ab59936778edf8a071f733&)
   - Source: https://github.com/BillionsBobby/JevRouter (by Bobby)

4. **Generating levels in real time with Jev 😄 Pretty cool thing!**
   - Generating levels in real time with Jev 😄 Pretty cool thing! It's just a buffed classifier at the end, but for games low latency and low costs are a big deal! https://x.com/HugoDuprez/status/2100953089003921543?s=20 Linked projects: • Post by @HugoDuprez — Jev can generate game levels in real time. Faster and cheaper structured output could be a big deal for game dev! (x.com/HugoDuprez/status/2100953089003921543) • sf_jev.mp4 — video/mp4 · 2 MB (cdn.discordapp.com/attachments/1483217545040232493/1550512801963970651) • Post by @HugoDuprez — Jev can generate game levels in real time. Faster and cheaper structured output could be a big deal for game dev! (twitter.com/HugoDuprez/status/2100953089003921543) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550512802370949150
   - [Post by @HugoDuprez](https://x.com/HugoDuprez/status/2100953089003921543?s=20)
   - [sf_jev.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1550512801963970651/sf_jev.mp4?ex=6aae9b13&is=6aad4993&hm=447e45274a01ed36fb120de944f90fdc258b110e3480679c2e26c25ac24509fd&)
   - Source: https://x.com/HugoDuprez/status/2100953089003921543?s=20 (by Hugo)

5. **We’re building a real-time decision engine for financial and prediction markets.**
   - We’re building a real-time decision engine for financial and prediction markets. We’d like to test TypeSafe on low-latency, structured decisions such as whether to enter, exit, hold, or cancel an order based on live market state, and benchmark it against general-purpose LLMs and quantitative models.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550374688327213079 (by mmx)

6. **Round 2: Jev early-access evaluation — some reproducible findings I've been running a preregistered synthetic**
   - Round 2: Jev early-access evaluation — some reproducible findings I've been running a preregistered synthetic evaluation of Jev for typed advisory-decision use. No proprietary/live data involved. Initial 32-case R1: 100% schema-valid; Choice 11/12 exact; Noul 9/10 at 0.50 with Brier 0.058; Score MAE 0.569. Follow-up adversarial testing surfaced a few behaviors that may be useful: 1. Primitive/task framing matters. A state with exit_code=9 conflicting with positive "success" prose was classified correctly as failure under Choice, but an identical Noul escalation task consistently returned only ~42–46% true. 2. Input-surface sensitivity exists near that boundary. Semantically equivalent Noul variants ranged from 36–62%, including field-order and irrelevant-field perturbations. 3. Byte-identical calls were much more stable. Six identical Noul requests returned 42–46% with no threshold flips
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550309311828332576 (by CreditProQuo)

7. **it is little bit out of reach for most people, but I have access too 1000 + riscv cores SoC, I was building this**
   - it is little bit out of reach for most people, but I have access too 1000 + riscv cores SoC, I was building this Parallel terraced scan programs since they fit great in this MIMD arhitecture and was fun thing to build. Very cool copycat can solve analogy problems in insane time with all parallel compute. But it is a bit silly you have to write domain yourself. Tried to use embedding models actually to just generate domains without success. So I got access few hours ago to jev and great results. In general channel <@705561973571452938> suggested solution to reviewing spreadshits, well I am sure I can do more actually generate correct ordering. I bet I can make copycat play doom haha. Its a bit silly, I dont know if it can have some real usecase but had fun since getting access. And maybe someone can build something on top of this info. Of course you can find copycat and run it on normal P
   - [slika.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550071074509824071/slika.png?ex=6aae512f&is=6aacffaf&hm=9976ccdd3c7cec3f069773092fc715033f37bf6ba1e8a9f5440aaadce51faf6b&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550071075675701248 (by ivanchernobyl)

8. **I gave Jev full access to it's own coffee shop and instructed it to serve locals first**
   - I gave Jev full access to it's own coffee shop and instructed it to serve locals first https://x.com/soya_da_yoot/status/2100451279222755616 Linked projects: • Post by @soya_da_yoot — I gave Jev $500 and a coffee shop. Then let it run the business. ☕️ Jev sets prices, hires staff, buys supplies, and picks upgrades. You choose the philosophy. It makes the decisions. 4 minutes. Profit or bankruptcy. Wou (x.com/soya_da_yoot/status/2100451279222755616) • Post by @soya_da_yoot — I gave Jev $500 and a coffee shop. Then let it run the business. ☕️ Jev sets prices, hires staff, buys supplies, and picks upgrades. You choose the philosophy. It makes the decisions. 4 minutes. Profit or bankruptcy. Wou (twitter.com/soya_da_yoot/status/2100451279222755616) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550010197349498980
   - [Post by @soya_da_yoot](https://x.com/soya_da_yoot/status/2100451279222755616)
   - Source: https://x.com/soya_da_yoot/status/2100451279222755616 (by soyaclawdaw)

9. **``` # Avoid O(n^2) operations on large collections Nested iteration over the same large collection (e.g.**
   - ``` # Avoid O(n^2) operations on large collections Nested iteration over the same large collection (e.g. `.find()` inside a `.map()` over the same array) should be replaced with a lookup structure (e.g. a `Map`) when a linear-time approach is available. const byId = new Map(orders.map((o) => [o.id, o])); const enriched = ids.map((id) => byId.get(id)); Bad: const enriched = ids.map((id) => orders.find((o) => o.id === id)); ```
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549998092680433697 (by Patrick)

10. **Yeah this is the issue - multimodality would be huge but probably suffer a lot of information loss, plus be a lot more**
   - Yeah this is the issue - multimodality would be huge but probably suffer a lot of information loss, plus be a lot more expensive - extrapolating game state requires a looooot of work, you have to map out all the types with reverse engineering, figure out where they live in memory, then define a structure and make sure you have enough information to make good decisions, as well as dealing with the latency of doing all that expensive work
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549827883491401930 (by ffsx)

11. **yours is definitely specialized for a real coding workflow kinda like [river]( ), mine is supposed to be an edgelord**
   - yours is definitely specialized for a real coding workflow kinda like [river](https://shopify.engineering/under-the-river), mine is supposed to be an edgelord robot which means I don't have nearly as much code surface around things like [watching PRs](https://github.com/sf8193/hydra/blob/main/daemon/pr-watch.ts) for mine, the idea behind the vibe coding feature is just "oneshot some websites" like someone asked it to "make a battleship clone" and therefore the code is actually stored in bare git repos on the box which hosts chudbot Linked projects: • Under the River (2026) - Shopify — What it took to ship our Slack-native agent River, lessons learned, and the substrate that runs beneath it. Co-authored by River. (shopify.engineering/under-the-river) • sf8193/hydra — A new interface to building — run coding agents over Discord/Slack - sf8193/hydra (github.com/sf8193/hydra/blob/main/daemon
   - [Under the River (2026) - Shopify](https://shopify.engineering/under-the-river)
   - [sf8193/hydra](https://github.com/sf8193/hydra/blob/main/daemon/pr-watch.ts)
   - Source: https://github.com/sf8193/hydra/blob/main/daemon/pr-watch.ts (by Robert)

### Health (7)

1. **Clinirise was my opensource project where I used jev for decisions with main llm -where I had used llm powered**
   - Clinirise was my opensource project where I used jev for decisions with main llm -where I had used llm powered whatsapp automation crm solution for clinics like an AI booking and customer service setup https://gen-lang-client-0155046437.web.app/ Profile -https://satyabhan007.github.io LinkedIn - https://www.linkedin.com/in/satyabhan-bhadoriya-777b28239?utm_source=share_via&utm_content=profile&utm_medium=member_android Linked projects: • CLINIRISE - AI-Powered Clinic Operations (gen-lang-client-0155046437.web.app) • Satyabhan Bhadoriya — Systems, AI/ML & Cloud Engineer — 8+ years bridging industrial automation, Linux infrastructure, and AI/ML engineering. Building production-depth curricula across AI/ML, Cloud & DevOps, and Security. (satyabhan007.github.io) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550561834149486652
   - [CLINIRISE - AI-Powered Clinic Operations](https://gen-lang-client-0155046437.web.app/)
   - [Satyabhan Bhadoriya — Systems, AI/ML &amp; Cloud Engineer](https://satyabhan007.github.io)
   - [https://www.linkedin.com/in/satyabhan-bhadoriya-777b28239?utm_source=share_via&utm_content=profile&utm_medium=member_and](https://www.linkedin.com/in/satyabhan-bhadoriya-777b28239?utm_source=share_via&utm_content=profile&utm_medium=member_android)
   - Source: https://gen-lang-client-0155046437.web.app/ (by satya)

2. **I’m building an AI-assisted chart-audit workflow for home-based care in Japan.**
   - I’m building an AI-assisted chart-audit workflow for home-based care in Japan. One task I’d like to test with Jev is: given a Japanese clinical note, classify whether there is a meaningful documentation gap or inconsistency, return calibrated confidence, and escalate uncertain cases to physician review. I’m especially interested in whether this can work reliably on real-world Japanese clinical text. Happy to share examples or a small synthetic test set if useful.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550511545736241153 (by 八森　淳)

3. **jev as the combat AI for ultima online.**
   - https://www.youtube.com/watch?v=cP-GWKteHKo jev as the combat AI for ultima online. Jev is determining the position the player should be in at all times, we only move where Jev says to be based on tilePriority question we feed to Jev. Jev decides to escape enemies when we are low on health, pursue enemies when they flee and we have the upper-hand, or venture deeper into the dungeon to find new targets when none are available. Jev decides if we should be looting, or fighting, or looking for a new target, or giving up when looting it chooses what to loot Linked projects: • Jev as the combat AI for Ultima Online — I was granted access to TypeSafe's "System One" Model, Jev. I let drive combat and make real-time combat decisions. No more deterministic combat scripting l... (youtube.com/watch) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549978624466362520
   - [Jev as the combat AI for Ultima Online](https://www.youtube.com/watch?v=cP-GWKteHKo)
   - Source: https://www.youtube.com/watch?v=cP-GWKteHKo (by autorokk)

4. **Hello at Lemma Ventures we build agentic compliance solutions and protocols.**
   - Hello at Lemma Ventures we build agentic compliance solutions and protocols. We open sourced the Agentic Determinism Index, an harness to score LLM providers and ensure reproducible, verifiable inference (pinned images, exact weights, and cryptographic receipts) that any auditor can replay. Check it out, contributions welcome! https://lemma-ventures.github.io/agentic-determinism-index/. This is critical infrastructure for regulated and mission-critical systems that need replayability: financial services, healthcare, defense, and safety-critical software where every inference must be provably reproducible and independently auditable, not just "probably correct." Linked projects: • Agentic Determinism Index (ADI) (lemma-ventures.github.io/agentic-determinism-index) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549795162597752915
   - [Agentic Determinism Index (ADI)](https://lemma-ventures.github.io/agentic-determinism-index/)
   - Source: https://lemma-ventures.github.io/agentic-determinism-index/ (by Romain)

5. **Hey, eager to see what will happen next.**
   - Hey, eager to see what will happen next. I want to use this AI to incorporate into my loops and understand how it can automate and catch issues faster and effectively. and with my marketing agency score leads better cofounder of Siloh: nutrition and fitness app [getsiloh.com](https://getsiloh.com/) founder of ITF: working on science based AI that increase human Linked projects: • Your diet and your training shouldn — Siloh is the first platform that treats nutrition and training as one system. Training days fuel performance. Rest days support recovery. (getsiloh.com) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549770165313343609
   - [Your diet and your training shouldn](https://getsiloh.com/)
   - Source: https://getsiloh.com/ (by Kendall Reid)

6. **Shared by Prayer: Dropgunner Mental Health in the AI Industry The Conversation**
   - https://github.com/Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having/tree/Clawinvaders Linked projects: • Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having — A guide for AI developers, researchers, and anyone building with AI* - Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having (github.com/Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversatio) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549724331565776906
   - [Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having](https://github.com/Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having/tree/Clawinvaders)
   - Source: https://github.com/Dropgunner/Mental-Health-in-the-AI-Industry-The-Conversation-We-re-Not-Having/tree/Clawinvaders (by Prayer)

7. **Hello everyone!**
   - Hello everyone! Im building https://vidar.fit. its a fitness platform that respects your time. Linked projects: • VidarFit — VidarFit writes every training session for you — adapting to your equipment, recovery, and history — so you just show up. One athlete, one algorithm. (vidar.fit) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549552801997131778
   - [VidarFit](https://vidar.fit)
   - Source: https://vidar.fit (by VidarFit)

### Productivity (7)

1. **gotta stay focused on my day job, but i kicked off a claude dynamic workflow this morning, and 5 hours later i had**
   - gotta stay focused on my day job, but i kicked off a claude dynamic workflow this morning, and 5 hours later i had this...will hack on it when i can... https://x.com/pj4533/status/2100624540938260919?s=20 Linked projects: • Post by @pj4533 — @typesafeai Well the one shot actually works...needs a lot of tweaking tho. Will work on it tonight/this weekend. Seems to get stuck quite a bit. (x.com/pj4533/status/2100624540938260919) • Post by @pj4533 — @typesafeai Well the one shot actually works...needs a lot of tweaking tho. Will work on it tonight/this weekend. Seems to get stuck quite a bit. (twitter.com/pj4533/status/2100624540938260919) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550184776970010676
   - [Post by @pj4533](https://x.com/pj4533/status/2100624540938260919?s=20)
   - Source: https://x.com/pj4533/status/2100624540938260919?s=20 (by pj4533)

2. **Hi everyone, I’m Ashish, the maker of Shelvr.**
   - Hi everyone, I’m Ashish, the maker of Shelvr. It’s an iPhone app that brings saved links, screenshots, and notes into one searchable library and organizes them into Spaces. I’m building with React Native + Expo and Convex, and using PostHog for product analytics. My focus is understanding whether people get from onboarding to their first useful save, then come back to find it. Shelvr Pro is required for new saves. The monthly plan bills immediately; the annual plan includes a 7-day free trial, then renews annually unless cancelled. Prices and terms are shown before purchase; existing saves remain readable after Pro expires. https://apps.apple.com/app/id6798143550 Glad to meet other people building and improving their products here! Linked projects: • Shelvr: Save & Organize Later App - App Store — Download Shelvr: Save & Organize Later by Ashish Huddar on the App Store. See screenshots, 
   - [Shelvr: Save &amp; Organize Later App - App Store](https://apps.apple.com/app/id6798143550)
   - Source: https://apps.apple.com/app/id6798143550 (by Ashish)

3. **ahhhh yes of course, slop is just my shorthand in my chat; the actual questions are per symptom each a Noul with a**
   - ahhhh yes of course, slop is just my shorthand in my chat; the actual questions are per symptom each a Noul with a concrete yes/no criteria: stub/placeholder where the task needs a working implementation, comments that restate the code, dead/duplicated code, hedging notes; for replies, wordy, assistant cliches, jargon. the steer to the agent names the symptom and the fix, not just slop the questions lives in src/guard.ts and src/prose.ts and there's like 22-case tuning set in slop-cases.mjs you guys might have a better criteria so PRs welcome
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549690907534688341 (by devmortimer24)

4. **Hi all, I mostly mess around building my collaboration harness, that started out years ago as a TODO list and got**
   - Hi all, I mostly mess around building my collaboration harness, that started out years ago as a TODO list and got badly, tragically carried away. https://www.visionflow.info Linked projects: • VisionFlow: Coordination Engineering — Federated coordination, self-sovereign data, formal reasoning, cryptographic provenance, human-in-the-loop governance. (visionflow.info) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549498502189555772
   - [VisionFlow: Coordination Engineering](https://www.visionflow.info)
   - Source: https://www.visionflow.info (by biscuits)

5. **Claude session 1M to 86K tokens in 1 second with a Jev plugin**
   - This uses @typesafeai Jev model as a plugin in Claude to review all the unnecessary tool calls, and it takes 1s to run! Literally 1 second to take a Claude session from nearly 1M to 86K tokens. Install prompt: Install, and configure: https://github.com/tamaratran/fast-jev-compaction — @altryne (7.2K likes) Linked projects: • Post by @altryne — This is actually insane. This uses @typesafeai Jev model, as a plugin in Claude to review all the un-nesseasary tool calls, and it takes 1s to run! Like, literally, 1 second to take my Claude session from nearly 1M to .. (x.com/altryne/status/2100739055923425589) • tamaratran/fast-jev-compaction — Claude Code plugin that replaces the compaction summary with Jev decisions: every tool call and result is scored in one fast request, stale ones are dropped or truncated, everything kept stays verbatim. — 3031★ · TypeScr (github.com/tamaratran/fast-jev-co
   - [Post by @altryne](https://x.com/altryne/status/2100739055923425589)
   - [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)
   - Source: https://x.com/altryne/status/2100739055923425589 (by @altryne)

6. **Instant compaction: score every tool call, drop the irrelevant**
   - Found the perfect use case for @typesafeai Jev: instant compaction. In 2026, why is compaction still a summarization prompt? Jev can make it instant by scoring every tool call and dropping what is irrelevant. — @tamarajtran (9.4K likes) Linked projects: • Post by @tamarajtran — found the perfect use case for @typesafeai Jev: instant compaction in 2026, why is compaction still a summarization prompt? Jev can make it instant by scoring every tool call and dropping what’s irrelevant (x.com/tamarajtran/status/2100694549362553153)
   - [Post by @tamarajtran](https://x.com/tamarajtran/status/2100694549362553153)
   - Source: https://x.com/tamarajtran/status/2100694549362553153 (by @tamarajtran)

7. **jev-router: route easy turns to fast models, hard ones up**
   - A router that, for each turn in Claude Code or OpenAI Codex, directs simple tasks to fast models and tough tasks to strong models. Linked projects: • gargpratyush/jev-router — Route to the cheapest model in claude code for your task using jev-router — 130★ · JavaScript (github.com/gargpratyush/jev-router)
   - [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router)
   - Source: https://github.com/gargpratyush/jev-router (by @gargpratyush)

### Family (5)

1. **Auteur Intelligence is entering public beta in a few days.**
   - https://auteurintelligence.com/ Auteur Intelligence is entering public beta in a few days. I've been building it for a year and although it is awesome as a tool of alignment between any model family open source frontier or otherwise, it also takes more time to make more accurate code and uses local classifier/routers like Gemma to make sure the trains run on time. I woke up this morning after spending most of the evening figuring out how to make the process of creation using Auteur faster for my commercial release, and saw Jev. This is an absolute gamechanger for my product. To say I'm stoked about it, is an understatement. I'm starting A/B testing today running Jev through its paces with the Vercel API, and i would love to have it natively from TypeSafe as well. Linked projects: • The Persistent AI Production Studio — Auteur Intelligence turns the AI models and tools you already use int
   - [The Persistent AI Production Studio](https://auteurintelligence.com/)
   - Source: https://auteurintelligence.com/ (by Lance Universe)

2. **State: ``` { "text": "\"I would rather go back to the realm, than face Boston.**
   - State: ``` { "text": "\"I would rather go back to the realm, than face Boston. I can't imagine he would want to see me...\" There is a tone in that sentence... That carries decades of shame.. \"I was... A total failure as a brother and a coward...\" \"My apologies... I can't imagine you care about that.. with your fiance in danger.. I'm so sorry.... I couldn't stop her. I wish I could have. - but I will help you however I can to make sure that you and your family are safe... And ending her... Will be my unlife goal. She's so dangerous..\"" } ``` Result: ``` level_of_post How good is this post from discord `text` Somewhat Detailed 65% Simple Post 30% Very Detailed 5% Confidence: 47% } ``` This took me a fraction of the time and no training. It shows a LOT of promise. Well done.
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550169183034024118 (by Scott O’Bryan)

3. **Built a tiny flood simulation with Jev 🌊 24 people, separate memories, family relationships, and limited sight/hearing.**
   - Built a tiny flood simulation with Jev 🌊 24 people, separate memories, family relationships, and limited sight/hearing. Each person gets their own API request containing only what they know. Jev selects an action; the game handles movement and consequences. Some helped strangers. Some prioritized escape. The 92-second video shows individual decisions, actual probabilities and request timings, plus the whole town’s outcome. Edited replay of 237 real calls. Linked projects: • jev-town.mp4 — video/mp4 · 15 MB (cdn.discordapp.com/attachments/1483217545040232493/1549721696309878784)
   - [jev-town.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549721696309878784/jev-town.mp4?ex=6aae5d4c&is=6aad0bcc&hm=ac90d55e02f3b32acf1879bd40cd32e7c496a49f95321e0e6685fd4f7ff57f20&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549721698482520195 (by arifdogan)

4. **Hey folks! Working on Leviath, providing structure for agents (think old-school GBA VRAM layouts for the context window**
   - Hey folks! Working on Leviath, providing structure for agents (think old-school GBA VRAM layouts for the context window for example). Will be testing TypeSafe AI as a provider to speed up some agents and try out some wild new types of agents that run faster 😄 https://leviath.dev/ Linked projects: • Leviath: structured context, structured flows, structured agents — Structure for agents that do real work: a model, a toolset and a context budget per stage, described in one file, with thousands of agents in one 49 MB binary. (leviath.dev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549566309367283762
   - [Leviath: structured context, structured flows, structured agents](https://leviath.dev/)
   - Source: https://leviath.dev/ (by GEMISIS)

5. **x86 Linux VM via WASM with Agentic LLM with native tool calling via WebGPU, all client side.**
   - x86 Linux VM via WASM with Agentic LLM with native tool calling via WebGPU, all client side. No inference server: https://remyhax.xyz/posts/smolbox/ Also just reimplemented and ported 16 production VPN protocol stacks to Golang, and then leveraged Go 1.27.0 to backport Post-Quantum cryptography support to all of them. Etc… check blog for other toy problems. Interested in Typesafe AI for speed and availability reasons, which go hand in hand. Care a lot about availability and price point for AI to ensure that the next generation of students have access, instead of getting sandbagged behind 18+ access requirements. I can do cool stuff for sure, but kids will “wow” ya if you let them, and that’s something I truly believe in. Linked projects: • Agentic AI in a Smolbox — Smolbox runs entirely in a browser tab. It is a full x86_64 virtual machine (VM) sandbox based on Alpine linux that runs und
   - [Agentic AI in a Smolbox](https://remyhax.xyz/posts/smolbox/)
   - Source: https://remyhax.xyz/posts/smolbox/ (by remy)

### Events (5)

1. **I catalogued seventeen years of work as 743 skills and asked Jev, once per skill, whether a given job posting calls**
   - https://iambraun.com/jev/ I catalogued seventeen years of work as 743 skills and asked Jev, once per skill, whether a given job posting calls for it. The whole sweep takes 9.3 seconds. Linked projects: • Skill Selection, Measured — Five arms, 8,916 decisions. Jev is 7x faster, 16.8x cheaper than Haiku, cannot drop an answer, and ranks 0.793 on adjudicated pairs where Haiku ranks below chance. (iambraun.com/jev) Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1550324060263817308
   - [Skill Selection, Measured](https://iambraun.com/jev/)
   - Source: https://iambraun.com/jev/ (by DGB@workflowtech.ai)

2. **Hello. Building an operating system by-the-way. Aiming to run Windows games eventually.**
   - Hello. Building an operating system by-the-way. Aiming to run Windows games eventually. Linked projects: • 636e9528fa4ebeb9.png — image/png · 81 KB (cdn.discordapp.com/attachments/1483217545040232493/1550213626139377815)
   - [636e9528fa4ebeb9.png](https://cdn.discordapp.com/attachments/1483217545040232493/1550213626139377815/636e9528fa4ebeb9.png?ex=6aaed5f2&is=6aad8472&hm=61ab3442241e1bac4256369d834d7ede753dbe77e29a16ff965128b50f15d4b1&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550213626705485894 (by Kot Vzatochnik || Stalker UM)

3. **This is a lot of fun...my results from the first few tests: The hard limits Where it's excellent (95 to 100% right) -**
   - This is a lot of fun...my results from the first few tests: The hard limits Where it's excellent (95 to 100% right) - Logic: reasoning tests using made-up words, so memory can't help. - Reading other languages: Chinese, Arabic, Hindi, Japanese, Swahili and mixed-language slang all scored 100%. - Tricks in the text: it ignored every attempt to force its answer, such as "ignore your instructions". - Long documents: it found a buried fact every time, and used a later correction over the original. - Routing: it picked the right handler out of 255, even when requests were reworded. - Checking claims: it caught "proposed" vs "enacted", "most" vs "all", and "pending approval" vs "approved". - Duplicate news and sarcasm: it could tell when two headlines described the same event, and when a comment was sarcastic. Where it breaks - Arithmetic: it gets simple sums wrong 25% of the time and totals o
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1550073985180508253 (by ben)

4. **Well I took the whole "Jev is a computer" thing a lot further lol.**
   - Well I took the whole "Jev is a computer" thing a lot further lol. Need to do a better recording, just used the mac screenshot recorder for quick grab but will do it with obs here in a few min Summary: ``` An 8-bit Ben Eater computer where all 114 combinational gates (instruction decoder 28, control matrix 31, ALU 48, zero-flag 7) are Jev judgments, evaluated in 23 topological layers per clock via the batch endpoint, upstream probabilities fed forward as analog levels. Registers/RAM/microcode are code, as designed. add → 42 in 18 clocks, 2,052 judgments. (The program that I run in this demo though it can run arbitrary ones) The page: full schematic (PC/MAR/RAM/IR/A/ALU/B/OUT around the bus), every gate chip glowing with its P, control-word LEDs, RAM with instruction disassembly, seven-segment OUT (showing 89 with the sequence beneath), the microcode ROM as a table, events log, and an ins
   - [sap1-typesafe-discord.mp4](https://cdn.discordapp.com/attachments/1483217545040232493/1549998789123772507/sap1-typesafe-discord.mp4?ex=6aaeb69c&is=6aad651c&hm=2a1aeee56d88ce48a203e0cc0af761a1e30813f82075d1186249476a2a1472f9&)
   - Source: https://discord.com/channels/1483217544214085663/1483217545040232493/1549998790109569044 (by Dustin)

5. **Near Here got early access to TypeSafe Jev, so we tested it against Mistral Small 4 and Gemini 3.5 Flash-Lite for**
   - Near Here got early access to TypeSafe Jev, so we tested it against Mistral Small 4 and Gemini 3.5 Flash-Lite for local event validation, tuning each model’s prompt individually. In our tests, Jev delivered up to 5.7× faster responses, 98% lower cost and 12 percentage points higher accuracy - see the results, methodology and limitations - https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation Discussion: https://discord.com/channels/1483217544214085663/1483217545040232493/1549693952112992298
   - [https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation)
   - Source: https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation (by Jon)

---

Pack generated 2026-09-19 from the Jev evaluation guide and 726 Discord community posts. Community content is user-generated and unverified — read before you run. Not affiliated with TypeSafe AI. Directory + data: https://github.com/everyai-com/jev-directory
