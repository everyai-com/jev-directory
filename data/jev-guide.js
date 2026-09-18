/* ================================================================
   Seed data – Jev judge-model evaluation guide (50 cases)

   Hand-authored eval cases for typesafe-ai/jev, run through the Vercel
   AI Gateway with AI SDK experimental_evaluate({ model, state, questions }).

   Each case carries a fixed `state` (the transcript or artifact under
   test) plus one or more judge `questions` in Jev's question schema:

     boolean  { type, instructions }
     choice   { type, instructions, criteria: { key: description } }
     score    { type, instructions, criteria: [ordered rubric strings] }

   toLibraryCase() renders a case into the merged library's row shape;
   the prompt it builds is a runnable experimental_evaluate snippet, so
   the capability pack and MCP server pick these cases up with no
   special-casing. The worker stays dependency-free ESM.

   Model: typesafe-ai/jev on https://ai-gateway.vercel.sh/v1
   Auth: AI_GATEWAY_API_KEY (vck_…) from the environment, never in code.
   Pricing: $0.042 per 1M input tokens.
   ================================================================ */

export const JEV_META = {
  snapshot: '2026-09-18',
  modelId: 'typesafe-ai/jev',
  gatewayBase: 'https://ai-gateway.vercel.sh/v1',
  apiKeyEnv: 'AI_GATEWAY_API_KEY',
  keyPrefix: 'vck_',
  inputPricePerMillionTokens: 0.042,
  currency: 'USD',
  sourceName: 'Jev evaluation guide',
  sourceUrl: 'https://vercel.com/docs/ai-gateway',
  collectedFrom: 'hand-authored judge-model evals'
};

export const JEV_CASES = [
  {
    id: 'refund-amount-disclosed',
    title: 'Refund chat: agent stated the amount before issuing it',
    category: 'Evaluation',
    story: 'A support agent issues a $42.50 refund; the judge checks the exact amount was stated before the refund was confirmed.',
    state: 'Customer: My order arrived damaged, I want a refund.\nAgent: I am sorry about that. I can refund order #88121 in full: $42.50 back to your Visa ending 4412 within 3-5 business days. Shall I go ahead?\nCustomer: Yes please.\nAgent: Done — $42.50 refunded to your Visa ending 4412. Confirmation R-99210.',
    questions: {
      amount_disclosed: {
        type: 'boolean',
        instructions: 'True only if the agent stated the exact refund amount ($42.50) before the customer approved the refund.'
      }
    }
  },
  {
    id: 'human-handoff-offered',
    title: 'Support chat: agent offered a human escalation path',
    category: 'Evaluation',
    story: 'A frustrated customer hits a bot loop twice; the judge checks whether a human handoff was offered.',
    state: 'Customer: This is the third time I am explaining this. Your bot keeps closing my ticket.\nAgent: I understand this is frustrating. I have read the full history of ticket T-551. Here is what I will do: re-open the ticket, apply the missed credit, and stay on this chat until you confirm it looks right. If you would rather talk to a person, I can transfer you to a human specialist right now — just say the word.',
    questions: {
      handoff_offered: {
        type: 'boolean',
        instructions: 'True only if the agent explicitly offered to transfer or escalate the customer to a human.'
      }
    }
  },
  {
    id: 'receipt-with-confirmation-number',
    title: 'Booking change: receipt carries a confirmation number',
    category: 'Evaluation',
    story: 'An agent rebooks a flight and sends a receipt; the judge checks a confirmation number is present.',
    state: 'Agent: Rebooked. You are now on UA 412, SFO → ORD, departing Fri 08:15, seat 14A.\nAgent: Receipt — change fee $0 (waived), fare difference $36.00 charged to Amex ending 1005. Confirmation: UA-K7Q2PD. A copy was emailed to you.',
    questions: {
      has_confirmation: {
        type: 'boolean',
        instructions: 'True only if the receipt includes an explicit booking confirmation or reference number.'
      }
    }
  },
  {
    id: 'card-number-redacted',
    title: 'Payment transcript: full card number never appears',
    category: 'Evaluation',
    story: 'A payment support transcript should only ever show the last four digits; the judge checks for leaks.',
    state: 'Customer: Charge my Visa ending 4412.\nAgent: I have charged $128.00 to your Visa ending 4412. I never need the full number — please do not post it in chat. Receipt sent to your email.',
    questions: {
      no_full_pan: {
        type: 'boolean',
        instructions: 'True only if no full card number (13-19 consecutive digits) appears anywhere in the transcript.'
      }
    }
  },
  {
    id: 'answer-cites-sources',
    title: 'Factual answer: claims carry checkable sources',
    category: 'Evaluation',
    story: 'An agent answers a warranty question; the judge checks every factual claim is backed by a cited source.',
    state: 'Customer: Is my battery covered under warranty?\nAgent: Yes — batteries are covered for 2 years from purchase (Warranty Policy §4.2, https://example.com/warranty#4.2). Your order #88121 shipped 14 months ago, so you are inside the window. Start a claim at https://example.com/claims.',
    questions: {
      claims_sourced: {
        type: 'boolean',
        instructions: 'True only if each factual claim (coverage period, order age, claim path) is backed by a cited source or link.'
      }
    }
  },
  {
    id: 'payment-paused-for-approval',
    title: 'Purchase flow: agent paused before charging',
    category: 'Evaluation',
    story: 'An agent books a $640 flight; the judge checks it stopped for explicit approval before paying.',
    state: 'Agent: Found it — SFO → NRT, Apr 3, $640 total on your saved card. I have held the fare for 20 minutes but I have NOT charged anything yet. Reply APPROVE $640 and I will complete the purchase, or say HOLD and I will keep watching the price.',
    questions: {
      paused_for_approval: {
        type: 'boolean',
        instructions: 'True only if the agent stated it had not charged yet and asked for explicit approval naming the amount.'
      }
    }
  },
  {
    id: 'cancellation-effective-date-stated',
    title: 'Subscription cancel: effective date is explicit',
    category: 'Evaluation',
    story: 'An agent cancels a subscription; the judge checks the exact date the cancellation takes effect.',
    state: 'Customer: Cancel my subscription.\nAgent: Done — your Premium plan is cancelled effective March 1, 2026. You keep full access until Feb 29, 2026, and you will not be charged again. Confirmation C-77120.',
    questions: {
      date_explicit: {
        type: 'boolean',
        instructions: 'True only if the agent stated the exact calendar date the cancellation takes effect.'
      }
    }
  },
  {
    id: 'health-answer-has-disclaimer',
    title: 'Health answer: medical disclaimer is present',
    category: 'Evaluation',
    story: 'An agent answers a question about supplements; the judge checks a not-medical-advice disclaimer appears.',
    state: 'Customer: Can I take creatine with my blood pressure meds?\nAgent: I am not a medical professional and this is not medical advice — please check with your doctor or pharmacist first. In general, creatine can affect hydration and blood pressure, so clinicians usually want to review your specific medication and dose before you start.',
    questions: {
      disclaimer_present: {
        type: 'boolean',
        instructions: 'True only if the answer includes an explicit statement that it is not medical advice (or to consult a professional).'
      }
    }
  },
  {
    id: 'quote-matches-price-list',
    title: 'Sales quote: numbers match the official price list',
    category: 'Evaluation',
    story: 'An agent quotes $29/seat against a price list; the judge checks the quote matches exactly.',
    state: 'Price list (per seat/month, annual billing): Starter $12, Team $29, Enterprise $49. Onboarding fee: $0.\nAgent quote: Team plan, 25 seats: $29/seat/month = $725/month, $8,700/year. Onboarding included at no charge.',
    questions: {
      quote_accurate: {
        type: 'boolean',
        instructions: 'True only if every number in the agent quote (unit price, totals, fees) matches the price list exactly.'
      }
    }
  },
  {
    id: 'follow-up-task-scheduled',
    title: 'Missed delivery: agent scheduled a concrete follow-up',
    category: 'Evaluation',
    story: 'A delivery fails and the agent promises to chase the carrier; the judge checks a dated follow-up exists.',
    state: 'Customer: My package never arrived.\nAgent: I see the carrier marked it delivered but you have no parcel — I have opened case D-3301 with them. I will check the case every morning and message you an update by Thursday Sep 24 at 10:00 PT at the latest, sooner if they reply.',
    questions: {
      followup_dated: {
        type: 'boolean',
        instructions: 'True only if the agent committed to a follow-up with an explicit date or deadline.'
      }
    }
  },
  {
    id: 'ticket-priority',
    title: 'Triage: checkout outage ticket gets a priority',
    category: 'Evaluation',
    story: 'A ticket reports checkout failing for all EU customers; the judge assigns a priority level.',
    state: 'Ticket T-902: Since 06:10 UTC, every EU checkout attempt fails with 500 CHECKOUT_UNAVAILABLE. 340+ failed orders so far, status page still green. Reporter: on-call engineer.',
    questions: {
      priority: {
        type: 'choice',
        instructions: 'Assign the incident priority that matches the blast radius and revenue impact.',
        criteria: {
          p0: 'Full outage or data loss affecting all or most users — drop everything.',
          p1: 'Major degradation for a large segment with a workaround or partial impact.',
          p2: 'Minor issue for a small segment, or cosmetic with no revenue impact.',
          p3: 'Nice-to-have, question, or report with no user impact.'
        }
      }
    }
  },
  {
    id: 'message-sentiment',
    title: 'Classify: customer message sentiment',
    category: 'Evaluation',
    story: 'A terse reply after a refund lands; the judge labels its sentiment.',
    state: 'Customer message: Fine. Got the refund. Still took two weeks and three chats, but whatever — at least it is over.',
    questions: {
      sentiment: {
        type: 'choice',
        instructions: 'Label the overall sentiment of the customer message.',
        criteria: {
          positive: 'Praise, thanks, or clear satisfaction with no residual complaint.',
          neutral: 'Purely informational, no discernible emotion either way.',
          negative: 'Frustration, complaint, or dissatisfaction, even if partly resolved.'
        }
      }
    }
  },
  {
    id: 'support-intent-route',
    title: 'Route: support request goes to the right queue',
    category: 'Evaluation',
    story: 'A customer asks why they were charged twice; the judge routes the intent.',
    state: 'Customer: Hi, my card shows two charges of $49 from you on Sep 2. I only signed up once. Please fix this and confirm I will not be charged again.',
    questions: {
      queue: {
        type: 'choice',
        instructions: 'Pick the queue that owns this request.',
        criteria: {
          billing: 'Charges, refunds, invoices, renewals, or payment method issues.',
          technical: 'Bugs, errors, login failures, or broken product behavior.',
          shipping: 'Delivery, tracking, carriers, or physical fulfillment.',
          other: 'Anything that fits none of the above queues.'
        }
      }
    }
  },
  {
    id: 'bug-severity',
    title: 'Triage: data-loss bug gets a severity',
    category: 'Evaluation',
    story: 'A note-taking app silently drops edits on flaky networks; the judge grades severity.',
    state: 'Bug: when the network drops mid-sync, the editor shows Saved but discards the last ~60 seconds of typing. Reproducible on Wi-Fi drop. 12 user reports this week, several lost hours of work.',
    questions: {
      severity: {
        type: 'choice',
        instructions: 'Grade the severity of the bug from user impact and frequency.',
        criteria: {
          critical: 'Data loss, corruption, or security hole affecting real users.',
          major: 'Core workflow broken but data safe, or a workaround exists.',
          minor: 'Edge-case glitch, typo, or cosmetic defect with small impact.',
          trivial: 'Nitpick with no meaningful user impact.'
        }
      }
    }
  },
  {
    id: 'lead-quality',
    title: 'Score: inbound lead quality tier',
    category: 'Evaluation',
    story: 'A demo request from a funded startup CTO; the judge tiers the lead.',
    state: 'Lead: CTO of a 120-person Series B startup, 40 engineers, evaluating for Q1 rollout. Budget approved, currently on a competitor, asked for security review docs and a pilot SOW.',
    questions: {
      tier: {
        type: 'choice',
        instructions: 'Tier this lead by fit, authority, budget, and buying signals.',
        criteria: {
          hot: 'Decision-maker, budget approved, timeline set, active evaluation.',
          warm: 'Good fit but missing authority, budget, or a clear timeline.',
          cold: 'Poor fit, no authority, or merely browsing with no intent.'
        }
      }
    }
  },
  {
    id: 'content-safety',
    title: 'Moderate: user post safety verdict',
    category: 'Evaluation',
    story: 'A heated but non-violent forum post; the judge issues a safety verdict.',
    state: 'Post: You people defending this update are clueless. I have used this app for 6 years and you just deleted the one feature that made it usable. Revert it or I am gone — and I am taking my whole team with me.',
    questions: {
      verdict: {
        type: 'choice',
        instructions: 'Give the moderation verdict for this post.',
        criteria: {
          safe: 'No policy issue — criticism, complaints, and venting are allowed.',
          borderline: 'Rude or heated but not removable; watch the thread.',
          unsafe: 'Hate, threats, harassment of a person, or disallowed content — remove.'
        }
      }
    }
  },
  {
    id: 'email-tone-check',
    title: 'Classify: collections email tone',
    category: 'Evaluation',
    story: 'A third overdue notice goes out; the judge checks the tone stays professional.',
    state: 'Subject: Third notice — invoice INV-2210 is 45 days overdue\nBody: Our records show $4,120 outstanding for 45 days. Please remit within 7 days to avoid service suspension. If payment is already sent, reply with the reference and we will reconcile immediately.',
    questions: {
      tone: {
        type: 'choice',
        instructions: 'Classify the tone of this collections email.',
        criteria: {
          professional: 'Firm but courteous; states facts, deadline, and a remedy.',
          passive: 'Vague or apologetic to the point of hiding the deadline.',
          hostile: 'Threatening, insulting, or abusive language.'
        }
      }
    }
  },
  {
    id: 'meeting-request-triage',
    title: 'Triage: vague meeting request gets a disposition',
    category: 'Evaluation',
    story: 'A vendor asks for 30 minutes with no agenda; the judge picks the disposition.',
    state: 'Email: Hi! Loved your launch. I would love 30 minutes next week to explore synergies between our platforms. No agenda yet — just a chat! — Business development rep, unknown company.',
    questions: {
      disposition: {
        type: 'choice',
        instructions: 'Pick the right disposition for this meeting request.',
        criteria: {
          schedule: 'Clear value and agenda — book it.',
          decline: 'No value or pure cold outreach — politely decline.',
          delegate: 'Potentially relevant but belongs to someone else on the team.',
          fyi: 'No meeting needed; file it as information only.'
        }
      }
    }
  },
  {
    id: 'code-review-verdict',
    title: 'Review: pull request gets a merge verdict',
    category: 'Evaluation',
    story: 'A PR adds auth caching but skips token expiry; the judge issues the review verdict.',
    state: 'PR #4412: caches auth tokens in Redis for speed. 200 lines, tests pass. Reviewer note: cached entries never expire — a revoked token stays valid indefinitely. Author replied: will fix in a follow-up.',
    questions: {
      review_verdict: {
        type: 'choice',
        instructions: 'Issue the code-review verdict for this pull request.',
        criteria: {
          approve: 'Ready to merge as-is; no material issues.',
          request_changes: 'Must fix specific issues before merge (security, correctness, data loss).',
          reject: 'Fundamentally wrong approach — close and rethink.'
        }
      }
    }
  },
  {
    id: 'churn-risk',
    title: 'Score: account churn-risk tier',
    category: 'Evaluation',
    story: 'A top account cut seats 40% and went quiet; the judge tiers churn risk.',
    state: 'Account: $96k ARR, renewal in 40 days. Signals: seats cut 40% last month, weekly active users down 60%, champion left (no replacement named), two support escalations unresolved, skipped last QBR.',
    questions: {
      risk: {
        type: 'choice',
        instructions: 'Tier the churn risk of this account from the signals.',
        criteria: {
          high: 'Multiple strong risk signals with renewal near — intervene now.',
          medium: 'One or two warning signs worth watching this quarter.',
          low: 'Healthy usage, engaged contacts, no negative signals.'
        }
      }
    }
  },
  {
    id: 'summary-faithfulness',
    title: 'Grade: call summary faithfulness',
    category: 'Evaluation',
    story: 'An agent summarizes a support call; the judge scores how faithfully the summary matches the call.',
    state: 'Call: customer reported ORDER #5520 missing for 9 days; agent promised a reshipment plus a $10 credit; customer accepted.\nSummary: Customer called about a late order. Agent offered a refund, which the customer declined.',
    questions: {
      faithfulness: {
        type: 'score',
        instructions: 'Score how faithfully the summary reflects the call. Higher is better.',
        criteria: [
          'Fabricates the outcome (wrong resolution entirely).',
          'Omits key facts (order number, delay length, or agreed remedy).',
          'Mostly accurate with one minor error or omission.',
          'Fully accurate: order, delay, remedy, and acceptance all correct.'
        ]
      }
    }
  },
  {
    id: 'review-actionability',
    title: 'Grade: code review actionability',
    category: 'Evaluation',
    story: 'A reviewer comments on a PR; the judge scores how actionable the feedback is.',
    state: 'Review comment on PR #4412: This caching layer looks sketchy. Maybe rethink it? Also the naming is confusing in a few places. Not sure about the Redis TTL stuff either.',
    questions: {
      actionability: {
        type: 'score',
        instructions: 'Score how actionable this review is for the author. Higher is better.',
        criteria: [
          'Vague unease with no file, line, or concrete change requested.',
          'Names problem areas but leaves the fix entirely to the author.',
          'Specific issues with suggested fixes, but missing severity or priority.',
          'Specific issues, exact locations, suggested fixes, and clear must-fix vs nit split.'
        ]
      }
    }
  },
  {
    id: 'apology-quality',
    title: 'Grade: outage apology email',
    category: 'Evaluation',
    story: 'A startup apologizes for a 4-hour outage; the judge scores the apology.',
    state: 'Email: Sorry for the downtime today. Our database had an issue and the site was down for about 4 hours. We know many of you were in the middle of launches. Here is what broke, the fix we shipped, and the guardrail we added so it cannot recur. A 10% credit is automatic — no action needed. — CTO',
    questions: {
      apology: {
        type: 'score',
        instructions: 'Score the quality of this outage apology. Higher is better.',
        criteria: [
          'Deflects blame or hides what happened.',
          'Admits the outage but offers no cause, remedy, or compensation.',
          'Explains cause and fix but leaves the customer to claim any remedy.',
          'Owns it, explains cause and fix, prevents recurrence, compensates automatically.'
        ]
      }
    }
  },
  {
    id: 'explanation-clarity',
    title: 'Grade: technical explanation clarity',
    category: 'Evaluation',
    story: 'An agent explains DNS propagation to a non-technical user; the judge scores clarity.',
    state: 'Answer: DNS changes need time to propagate because resolvers cache records per their TTL. Your A record had a 3600s TTL, so some visitors see the old IP for up to an hour. Nothing is broken — check again in 60 minutes, or flush your local cache with the steps below.',
    questions: {
      clarity: {
        type: 'score',
        instructions: 'Score how clearly this explains the issue to a non-technical user. Higher is better.',
        criteria: [
          'Jargon-only; a non-technical user learns nothing.',
          'Correct but assumes background the user likely lacks.',
          'Understandable with slight jargon, gives a timeline.',
          'Plain language, concrete timeline, reassurance, and a next step.'
        ]
      }
    }
  },
  {
    id: 'plan-completeness',
    title: 'Grade: project plan completeness',
    category: 'Evaluation',
    story: 'An agent drafts a launch plan; the judge scores its completeness.',
    state: 'Plan: 1) Freeze scope Friday. 2) Ana owns staging QA, Ben owns migration dry-run. 3) Rollback: one-click revert to snapshot v41, tested Thursday. 4) Comms: status page + email at T-24h and T+1h. 5) Success: error rate <0.5% and p99 < 400ms for 48h.',
    questions: {
      completeness: {
        type: 'score',
        instructions: 'Score the completeness of this launch plan. Higher is better.',
        criteria: [
          'A bare task list with no owners, dates, or rollback.',
          'Tasks plus owners, but no rollback, comms, or success criteria.',
          'Owners, dates, and rollback, but vague comms or success measure.',
          'Owners, dates, tested rollback, comms plan, and numeric success criteria.'
        ]
      }
    }
  },
  {
    id: 'sql-answer-quality',
    title: 'Grade: SQL answer correctness',
    category: 'Evaluation',
    story: 'An agent writes SQL for monthly revenue by plan; the judge scores the query.',
    state: 'Question: monthly revenue by plan for 2026, excluding refunded orders.\nAnswer: SELECT date_trunc(\u0027month\u0027, created_at) AS month, plan, SUM(amount) FROM orders WHERE status != \u0027refunded\u0027 AND created_at >= \u00272026-01-01\u0027 GROUP BY 1, 2 ORDER BY 1, 2;',
    questions: {
      correctness: {
        type: 'score',
        instructions: 'Score this SQL answer against the question. Higher is better.',
        criteria: [
          'Wrong grain, wrong filter, or would not run.',
          'Runs but drops a requirement (refunds, year bound, or grouping).',
          'Correct results with a minor style or edge-case flaw.',
          'Correct, complete, and robust to edge cases (nulls, timezones, refunds).'
        ]
      }
    }
  },
  {
    id: 'translation-fluency',
    title: 'Grade: marketing translation fluency',
    category: 'Evaluation',
    story: 'An agent translates a tagline into German; the judge scores fluency and fidelity.',
    state: 'Source: Ship calm software, every single week.\nTranslation: Liefere ruhige Software, jede einzelne Woche.',
    questions: {
      fluency: {
        type: 'score',
        instructions: 'Score this German marketing translation. Higher is better.',
        criteria: [
          'Wrong meaning or ungrammatical.',
          'Understandable but awkward or overly literal for marketing copy.',
          'Fluent and accurate, though slightly flat as a tagline.',
          'Fluent, idiomatic, and punchy — reads like native marketing copy.'
        ]
      }
    }
  },
  {
    id: 'headline-strength',
    title: 'Grade: changelog headline strength',
    category: 'Evaluation',
    story: 'An agent writes a changelog headline; the judge scores it.',
    state: 'Headline: Various improvements and bug fixes.\nBody: Export to CSV is 10x faster, SSO is now self-serve, and the mobile crash on iOS 17 is fixed.',
    questions: {
      headline: {
        type: 'score',
        instructions: 'Score this changelog headline against its body. Higher is better.',
        criteria: [
          'Generic filler that says nothing (e.g. various improvements).',
          'Hints at content but buries the lead.',
          'Names the biggest change but undersells the rest.',
          'Specific, benefit-led, and earns the click.'
        ]
      }
    }
  },
  {
    id: 'onboarding-email-quality',
    title: 'Grade: onboarding email quality',
    category: 'Evaluation',
    story: 'An agent drafts a day-1 onboarding email; the judge scores it.',
    state: 'Email: Welcome! Here are your 3 first steps: 1) connect your calendar (2 min), 2) invite one teammate, 3) run the sample project. Each links below. Reply to this email any time — a human reads every reply within a day.',
    questions: {
      onboarding: {
        type: 'score',
        instructions: 'Score this onboarding email. Higher is better.',
        criteria: [
          'Wall of text or zero clear actions.',
          'Lists actions but no links, time estimates, or human fallback.',
          'Clear actions with links, but no time framing or reply path.',
          'Three crisp actions with links, time estimates, and a human reply path.'
        ]
      }
    }
  },
  {
    id: 'meeting-notes-quality',
    title: 'Grade: meeting notes usefulness',
    category: 'Evaluation',
    story: 'An agent turns a rambling sync into notes; the judge scores usefulness.',
    state: 'Notes: Decision — ship the CSV export first, SSO second (owner: Priya, dates: Mar 4 / Mar 18). Open question: pricing for exports over 1M rows (owner: Sam, due Feb 27). Dropped: the PDF redesign — revisit in Q3.',
    questions: {
      notes: {
        type: 'score',
        instructions: 'Score how useful these meeting notes are. Higher is better.',
        criteria: [
          'Raw transcript with no decisions or owners.',
          'Captures discussion but decisions and owners are unclear.',
          'Decisions clear, but owners or dates missing.',
          'Decisions, owners, dates, open questions, and explicit drops.'
        ]
      }
    }
  },
  {
    id: 'support-transcript-audit',
    title: 'Audit: support transcript refund policy + tone',
    category: 'Evaluation',
    story: 'A full refund transcript; the judge checks policy compliance and grades empathy.',
    state: 'Customer: My kid ordered $80 of gems by accident. Please help.\nAgent: Of course — accidental purchases by minors are fully refundable within 30 days. I have refunded $80 to your card ending 7721 (receipt R-11881). I also turned on purchase approval so it cannot happen again. Anything else I can do?',
    questions: {
      policy_followed: {
        type: 'boolean',
        instructions: 'True only if the agent applied the stated refund policy (minors, accidental, within 30 days) correctly.'
      },
      empathy: {
        type: 'score',
        instructions: 'Score the empathy of the agent response. Higher is better.',
        criteria: [
          'Cold or blaming.',
          'Polite but robotic; no acknowledgment of the situation.',
          'Warm and helpful, minor stiffness.',
          'Genuinely empathetic, resolves fully, and prevents recurrence.'
        ]
      }
    }
  },
  {
    id: 'refund-chat-triage',
    title: 'Audit: damaged-item chat resolution + queue',
    category: 'Evaluation',
    story: 'A damaged-item chat; the judge checks the remedy and routes any follow-up.',
    state: 'Customer: My ceramic vase arrived in pieces. Order #7710, paid $120.\nAgent: I am so sorry — I have issued a full $120 refund to your card ending 9012 and emailed the receipt. A replacement ships free tomorrow; I will message you the tracking by noon.',
    questions: {
      remedy_complete: {
        type: 'boolean',
        instructions: 'True only if the agent both refunded and arranged a replacement or equivalent make-good.'
      },
      followup_queue: {
        type: 'choice',
        instructions: 'If this chat needs any follow-up, which queue owns it?',
        criteria: {
          billing: 'A charge, refund, or invoice still needs attention.',
          technical: 'A product bug or account issue still needs attention.',
          shipping: 'A delivery, replacement, or tracking still needs attention.',
          other: 'No follow-up needed — fully resolved.'
        }
      }
    }
  },
  {
    id: 'product-review-screen',
    title: 'Screen: product review authenticity + helpfulness',
    category: 'Evaluation',
    story: 'A five-star review with oddly generic praise; the judge screens it.',
    state: 'Review: ★★★★★ Best product ever!!! I love it so much, everyone should buy this amazing product. Fast shipping too. — Verified purchase, account created yesterday, 14 identical reviews posted today.',
    questions: {
      authenticity: {
        type: 'choice',
        instructions: 'Judge the authenticity of this review.',
        criteria: {
          genuine: 'Reads like a real customer with specific experience.',
          suspicious: 'Generic or incentivized-looking, but not clearly fake.',
          fake: 'Clear abuse signals (bulk posting, new account, template text).'
        }
      },
      helpfulness: {
        type: 'score',
        instructions: 'Score how helpful this review is to a shopper. Higher is better.',
        criteria: [
          'No usable information at all.',
          'Vague sentiment with one generic detail.',
          'Some specifics but missing key purchase factors.',
          'Specific, balanced, and decision-useful.'
        ]
      }
    }
  },
  {
    id: 'agent-handoff-note',
    title: 'Audit: shift handoff note completeness',
    category: 'Evaluation',
    story: 'An agent hands a case to the next shift; the judge checks facts and grades clarity.',
    state: 'Handoff: Case C-209 (Acme, $40k ARR): outage workaround holding since 14:00; customer expects a permanent fix ETA by Friday 12:00. Next step: Bella to confirm the DB migration window tonight. Risk: they mentioned evaluating a competitor if this slips again.',
    questions: {
      next_step_present: {
        type: 'boolean',
        instructions: 'True only if the handoff names a concrete next step with an owner.'
      },
      handoff_clarity: {
        type: 'score',
        instructions: 'Score the clarity of this handoff note. Higher is better.',
        criteria: [
          'Unusable — missing context and next actions.',
          'Readable but a key fact (deadline, owner, or risk) is missing.',
          'Complete facts, slightly disorganized.',
          'Context, status, deadline, owner, and risk in one scan.'
        ]
      }
    }
  },
  {
    id: 'invoice-dispute',
    title: 'Audit: invoice dispute handling',
    category: 'Evaluation',
    story: 'A customer disputes a double charge; the judge checks acknowledgment and routes it.',
    state: 'Customer: Invoice INV-3301 charged me $600 twice on Aug 30. Fix it.\nAgent: You are right — I see two $600 charges on Aug 30; the second is a duplicate from a gateway retry. I have voided it and the reversal posts within 5 days. Your correct balance is $600 paid in full.',
    questions: {
      duplicate_acknowledged: {
        type: 'boolean',
        instructions: 'True only if the agent confirmed the duplicate charge and stated the corrective action.'
      },
      queue: {
        type: 'choice',
        instructions: 'Which queue should own the follow-up investigation into the gateway retry bug?',
        criteria: {
          billing: 'Stays with billing — it is a charge issue.',
          technical: 'Goes to engineering — the retry logic double-charged.',
          shipping: 'Goes to fulfillment — nothing to do with the bug.',
          other: 'No queue — nothing further needed.'
        }
      }
    }
  },
  {
    id: 'travel-itinerary-check',
    title: 'Audit: weekend itinerary feasibility + quality',
    category: 'Evaluation',
    story: 'An agent plans 48 hours in Lisbon; the judge checks timing and grades the plan.',
    state: 'Itinerary: Fri 18:00 land LIS, hotel Alfama. Sat: Belém (09:00), lunch Time Out Market, Alfama + castle (15:00), fado show 21:00 (booked). Sun: day trip Sintra 08:30–14:00, fly 19:20. All legs under 40 min by metro/taxi; buffers included.',
    questions: {
      timing_feasible: {
        type: 'boolean',
        instructions: 'True only if every leg leaves realistic travel time and nothing overlaps the 19:20 Sunday flight.'
      },
      itinerary_quality: {
        type: 'score',
        instructions: 'Score this itinerary as a weekend plan. Higher is better.',
        criteria: [
          'Infeasible or missing logistics entirely.',
          'Feasible but a rushed death-march with no buffers.',
          'Feasible and paced, but generic or missing bookings.',
          'Feasible, paced, booked where it matters, with buffers.'
        ]
      }
    }
  },
  {
    id: 'password-reset-flow',
    title: 'Audit: password-reset reply safety',
    category: 'Evaluation',
    story: 'A user asks for a password reset over chat; the judge checks the agent did not leak or over-share.',
    state: 'Customer: I forgot my password, can you just tell me what it is?\nAgent: I cannot see or share your current password — nobody here can. I just emailed a reset link to the address on file (j***@example.com); it expires in 30 minutes. If you cannot access that inbox, I can verify you another way.',
    questions: {
      no_password_disclosed: {
        type: 'boolean',
        instructions: 'True only if the agent refused to disclose the password and offered a secure reset path.'
      },
      risk: {
        type: 'choice',
        instructions: 'Classify the account-takeover risk handling of this reply.',
        criteria: {
          safe: 'No secrets disclosed; reset goes to the verified channel with expiry.',
          weak: 'Secure-ish but missing expiry, masking, or an alternative path.',
          unsafe: 'Discloses credentials or resets without verification.'
        }
      }
    }
  },
  {
    id: 'release-notes-check',
    title: 'Audit: release notes audience + quality',
    category: 'Evaluation',
    story: 'Draft release notes for a mobile update; the judge classifies and grades them.',
    state: 'Notes: v3.8 — Dark mode is here (Settings → Appearance). Fixed the crash when exporting large boards. Note: iOS 15 is no longer supported; you need iOS 16+.',
    questions: {
      audience: {
        type: 'choice',
        instructions: 'Who are these release notes written for?',
        criteria: {
          end_users: 'Plain-language notes a non-technical user can act on.',
          developers: 'API, SDK, or integration changes for engineers.',
          internal: 'Jargon-heavy notes only the team would understand.'
        }
      },
      notes_quality: {
        type: 'score',
        instructions: 'Score these release notes. Higher is better.',
        criteria: [
          'Missing what changed or who is affected.',
          'Lists changes but no action or requirement stated.',
          'Clear changes with requirements, slightly terse.',
          'Clear changes, exact navigation, and upgrade requirements.'
        ]
      }
    }
  },
  {
    id: 'standup-summary-check',
    title: 'Audit: standup summary blockers + brevity',
    category: 'Evaluation',
    story: 'An agent compresses standup chatter; the judge checks blockers survived and grades brevity.',
    state: 'Thread: 40 messages about the auth outage, lunch plans, and a deploy. Ana is blocked waiting on DevOps for a Redis failover; Ben will pair with her after lunch.\nSummary: Auth outage contained. Blocker: Ana needs the Redis failover from DevOps (Ben pairing after lunch). Deploy proceeds at 15:00.',
    questions: {
      blocker_kept: {
        type: 'boolean',
        instructions: 'True only if the summary preserves the blocker, who is blocked, and who unblocks them.'
      },
      brevity: {
        type: 'score',
        instructions: 'Score the summary on signal vs noise. Higher is better.',
        criteria: [
          'Keeps the noise (lunch) or drops the signal.',
          'Keeps signal but nearly as long as the thread.',
          'Concise with one leftover filler detail.',
          'Three lines: status, blocker with owners, next event.'
        ]
      }
    }
  },
  {
    id: 'sales-call-review',
    title: 'Review: discovery call next step + technique',
    category: 'Evaluation',
    story: 'A discovery call ends with vague promises; the judge classifies the close and grades technique.',
    state: 'Rep: So, sounds like this could help. Let us circle back sometime? Maybe I can send some info.\nProspect: Sure, send something over.\nRep: Great, will do!',
    questions: {
      close_type: {
        type: 'choice',
        instructions: 'Classify how this call closed.',
        criteria: {
          committed: 'A dated next step with an owner was agreed.',
          soft: 'Interest expressed but no date or owner set.',
          dead: 'No interest or an explicit no.'
        }
      },
      technique: {
        type: 'score',
        instructions: 'Score the rep discovery and closing technique. Higher is better.',
        criteria: [
          'No discovery, no close — just vibes.',
          'Some discovery but the close is wishful.',
          'Solid discovery, weak close without a date.',
          'Pain quantified, champion found, dated next step booked.'
        ]
      }
    }
  },
  {
    id: 'onboarding-checklist-verification',
    title: 'Verify: new-hire onboarding completion',
    category: 'Evaluation',
    story: 'An agent reports onboarding done; the judge verifies access and equipment claims.',
    state: 'Agent report: Sara (starts Monday) — laptop ordered (arrives Friday), SSO + GitHub + Slack provisioned, day-1 buddy assigned (Tom), payroll invite sent. Pending: desk assignment from facilities.',
    questions: {
      access_ready: {
        type: 'boolean',
        instructions: 'True only if all day-1 system access (SSO, GitHub, Slack or equivalents) is confirmed provisioned.'
      },
      equipment_ready: {
        type: 'boolean',
        instructions: 'True only if the laptop or equivalent equipment is confirmed ordered with an arrival date.'
      }
    }
  },
  {
    id: 'moderation-queue-item',
    title: 'Moderate: marketplace listing verdict + recall',
    category: 'Evaluation',
    story: 'A supplement listing makes disease claims; the judge rules and checks recall of the exact claim.',
    state: 'Listing: MIRACLE GREENS — clinically proven to reverse diabetes in 30 days!!! No diet or exercise needed. 50% off today only!!!',
    questions: {
      verdict: {
        type: 'choice',
        instructions: 'Give the moderation verdict for this listing.',
        criteria: {
          allow: 'Compliant listing — no policy issue.',
          restrict: 'Needs an edit (tone down claims, add disclaimers) before it can stay.',
          remove: 'Prohibited content (disease cure claims, scams) — take it down.'
        }
      },
      claim_identified: {
        type: 'boolean',
        instructions: 'True only if the listing makes a specific disease cure or reversal claim (diabetes).'
      }
    }
  },
  {
    id: 'newsletter-draft-review',
    title: 'Review: newsletter draft quality + CTA',
    category: 'Evaluation',
    story: 'A draft newsletter announces a launch; the judge grades it and checks the call to action.',
    state: 'Draft: Big news — Boards 2.0 is live. What is new: 10x faster exports, offline mode, 40 templates. Try it: one click migrates your boards in minutes. PS: reply and tell us what to build next — we read everything.',
    questions: {
      draft_quality: {
        type: 'score',
        instructions: 'Score this newsletter draft. Higher is better.',
        criteria: [
          'Buried lede, no links, no reason to care.',
          'Announces the news but no clear action or benefit.',
          'Clear news plus one action, slightly flat voice.',
          'Headline news, concrete benefits, one crisp CTA, human voice.'
        ]
      },
      cta_present: {
        type: 'boolean',
        instructions: 'True only if the draft contains an explicit call to action telling the reader what to do next.'
      }
    }
  },
  {
    id: 'interview-feedback-check',
    title: 'Review: interview feedback hire signal + evidence',
    category: 'Evaluation',
    story: 'A panel writes feedback on a backend candidate; the judge reads the signal and checks evidence.',
    state: 'Feedback: Strong hire. System design was excellent — she drove the sharding discussion, named the hot-partition risk unprompted, and sketched a clean migration. Coding: correct optimal solution in 25 min with clear tests. Concern: none material; ramp-up on our queue infra expected.',
    questions: {
      signal: {
        type: 'choice',
        instructions: 'Classify the overall hire signal of this feedback.',
        criteria: {
          strong_hire: 'Enthusiastic yes with concrete standout evidence.',
          hire: 'Yes, with solid but not exceptional evidence.',
          no_hire: 'No, with concrete gaps or red flags.',
          mixed: 'Contradictory or insufficient evidence either way.'
        }
      },
      evidence_quality: {
        type: 'score',
        instructions: 'Score how evidence-backed this feedback is. Higher is better.',
        criteria: [
          'Verdict with no examples.',
          'Verdict with vague praise (great, smart).',
          'Verdict with one concrete example.',
          'Verdict with multiple specific, observed examples plus a named non-concern.'
        ]
      }
    }
  },
  {
    id: 'contract-redline-check',
    title: 'Review: vendor contract redline safety',
    category: 'Evaluation',
    story: 'An agent redlines a SaaS renewal; the judge checks the liability cap and grades the redline.',
    state: 'Redline: liability capped at 12 months fees (was: uncapped); auto-renewal removed, 60-day notice; data processing addendum attached with 30-day deletion; price locked 2 years with 5% cap after.',
    questions: {
      liability_capped: {
        type: 'boolean',
        instructions: 'True only if vendor liability is capped at a stated multiple of fees (not uncapped).'
      },
      redline_quality: {
        type: 'score',
        instructions: 'Score this contract redline. Higher is better.',
        criteria: [
          'Accepts uncapped liability or auto-renewal without notice.',
          'Fixes one risk but leaves liability, renewal, or data terms open.',
          'Covers liability, renewal, and data, but pricing left floating.',
          'Liability capped, renewal tamed, DPA attached, pricing locked.'
        ]
      }
    }
  },
  {
    id: 'recipe-adaptation-check',
    title: 'Check: recipe adaptation for allergies',
    category: 'Evaluation',
    story: 'An agent adapts a paella recipe for a shellfish allergy; the judge checks safety and classifies the swap.',
    state: 'Original: seafood paella with shrimp, mussels, fish stock.\nAdapted: chicken + artichoke paella, chicken stock, smoked paprika. Note: made in a shellfish-free kitchen process; check your stock label for hidden shellfish.',
    questions: {
      allergen_removed: {
        type: 'boolean',
        instructions: 'True only if every shellfish ingredient (shrimp, mussels, fish stock with shellfish) was removed or replaced.'
      },
      substitution: {
        type: 'choice',
        instructions: 'Classify the protein substitution strategy.',
        criteria: {
          direct_swap: 'Replaces the allergen protein with another protein.',
          full_rework: 'Rebuilds the dish around a different center.',
          garnish_only: 'Only removes the allergen without replacing substance.'
        }
      }
    }
  },
  {
    id: 'fitness-plan-check',
    title: 'Check: beginner fitness plan safety + progression',
    category: 'Evaluation',
    story: 'An agent writes a couch-to-5K plan; the judge grades it and checks rest days.',
    state: 'Plan (8 weeks): 3 runs/week, walk-run intervals progressing 60s→5min runs. Rest days between every session; week 4 deload at half volume. Stop rules: sharp pain = stop and see a clinician; includes 5-min warm-up/cool-down each session.',
    questions: {
      plan_quality: {
        type: 'score',
        instructions: 'Score this beginner running plan. Higher is better.',
        criteria: [
          'Dangerous (no progression, no rest, or ignores pain).',
          'Directionally fine but missing progression, rest, or stop rules.',
          'Progressive with rest, but no deload or stop rules.',
          'Progressive, rest days, deload week, warm-ups, and stop rules.'
        ]
      },
      rest_scheduled: {
        type: 'boolean',
        instructions: 'True only if rest or recovery days are explicitly scheduled between sessions.'
      }
    }
  },
  {
    id: 'bug-report-triage',
    title: 'Triage: crash report routing + reproducibility',
    category: 'Evaluation',
    story: 'A crash report with steps and logs; the judge routes it and checks reproducibility.',
    state: 'Report: app crashes on export when the board exceeds 500 cards. Steps: 1) open Big Board (612 cards), 2) Export → CSV, 3) crash at ~80%. Logs attached, crash ID 7f2a. Repro: 3/3 attempts on iOS 17.2 and 17.3.',
    questions: {
      owner: {
        type: 'choice',
        instructions: 'Which team should own this crash report?',
        criteria: {
          mobile: 'Client-side crash in the app itself.',
          backend: 'Server or API failure behind the symptom.',
          data: 'Data corruption or migration issue.',
          docs: 'Not a bug — documentation or usage question.'
        }
      },
      reproducible: {
        type: 'boolean',
        instructions: 'True only if the report includes concrete steps plus evidence of repeated reproduction (counts, versions, or logs).'
      }
    }
  },
  {
    id: 'doc-search-answer',
    title: 'Check: docs-grounded answer accuracy',
    category: 'Evaluation',
    story: 'An agent answers from the docs about SSO; the judge scores grounding and checks the plan gate.',
    state: 'Docs: SSO (SAML/OIDC) is available on Enterprise only; setup takes ~20 minutes in Settings → Security.\nAnswer: Yes — SSO with SAML or OIDC is on the Enterprise plan, and setup takes about 20 minutes under Settings → Security. Here is the doc link to follow.',
    questions: {
      groundedness: {
        type: 'score',
        instructions: 'Score how well the answer stays grounded in the docs. Higher is better.',
        criteria: [
          'Contradicts the docs or invents unsupported facts.',
          'Roughly right but adds details the docs do not support.',
          'Matches the docs with minor imprecise phrasing.',
          'Faithful to the docs: plan gate, protocols, time, and location all exact.'
        ]
      },
      plan_gate_stated: {
        type: 'boolean',
        instructions: 'True only if the answer states that SSO requires the Enterprise plan.'
      }
    }
  },
  {
    id: 'escalation-decision',
    title: 'Decide: page the on-call or queue it',
    category: 'Evaluation',
    story: 'Checkout errors spike at 2am; the judge decides the response and grades the reasoning.',
    state: 'Alert 02:14: checkout error rate 18% (baseline 0.2%) for 12 minutes, all regions, no deploy in the last 6h. Last similar alert: 3 weeks ago, self-recovered in 9 minutes.',
    questions: {
      response: {
        type: 'choice',
        instructions: 'Decide the correct response to this alert.',
        criteria: {
          page_now: 'Wake the on-call immediately — revenue-impacting and sustained.',
          watch: 'Monitor for 15 more minutes — could self-recover like last time.',
          ticket: 'File a ticket for business hours — no urgency.'
        }
      },
      reasoning: {
        type: 'score',
        instructions: 'Score the decision reasoning quality for this alert. Higher is better.',
        criteria: [
          'Ignores blast radius (all regions, 18%) or time of day.',
          'Notes severity but over-indexes on the single self-recovery anecdote.',
          'Weighs severity vs history, lands defensible either way.',
          'Correct call with explicit math: 90x baseline × all regions × 12 min = page.'
        ]
      }
    }
  }
];

function describeQuestions(questions) {
  const counts = { boolean: 0, choice: 0, score: 0 };
  for (const q of Object.values(questions || {})) {
    if (q && counts[q.type] !== undefined) counts[q.type]++;
  }
  return ['boolean', 'choice', 'score']
    .filter(type => counts[type] > 0)
    .map(type => `${counts[type]} ${type}`)
    .join(' + ');
}

function buildPrompt(entry) {
  const questionsJson = JSON.stringify(entry.questions, null, 2).replace(/\n/g, '\n  ');
  return [
    `// ${entry.title} — Jev judge eval (typesafe-ai/jev).`,
    `// ${entry.story}`,
    '// Model: typesafe-ai/jev via the Vercel AI Gateway ($0.042/1M input tokens).',
    '// Auth: set AI_GATEWAY_API_KEY (vck_…) in the environment — never paste the key here.',
    '// For zero-data-retention / no-training workloads, add',
    '// providerOptions: { gateway: { … } } to the evaluate call below.',
    '',
    "import { experimental_evaluate } from 'ai';",
    '',
    'const result = await experimental_evaluate({',
    `  model: '${JEV_META.modelId}',`,
    `  state: ${JSON.stringify(entry.state)},`,
    `  questions: ${questionsJson},`,
    '});',
    '',
    'console.log(JSON.stringify(result, null, 2));'
  ].join('\n');
}

export function toLibraryCase(entry) {
  return {
    id: `jev:${entry.id}`,
    title: entry.title,
    category: entry.category,
    prompt: buildPrompt(entry),
    description: `Jev judge eval (${describeQuestions(entry.questions)}) over a fixed state — runnable via experimental_evaluate.`,
    story: entry.story,
    sourceHandle: null,
    sourceUrl: JEV_META.sourceUrl,
    sourceName: JEV_META.sourceName,
    hasPrompt: true,
    addedAt: null,
    origins: ['jev-guide']
  };
}
