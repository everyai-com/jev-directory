# Jev, explained like you're 10

> Markdown alternate of [jev-like-im-10.html](./jev-like-im-10.html) on the [Jev Directory](https://jev.magicteams.ai). Agent index: [llms.txt](./llms.txt).

Imagine your school hires a robot to run the pizza stall. The robot is fast — but sometimes it forgets to say the price before taking your money. Grown-ups are too busy to watch every single order. So they hire a referee.

- **The robot does the job** — Answers customers, takes orders, moves money. Fast and usually right — but it's a robot, so sometimes it isn't.
- **The referee checks the job** — That's Jev. It doesn't sell pizza. It watches what the robot did and answers the coach's questions about it.
- **The tape writes it down** — Every answer is saved, so when something goes wrong there's a replay to rewind instead of an argument.

## The three whistles

Jev can only blow three kinds of whistle. That is the entire vocabulary — and it turns out to be enough:

- **Yes or no** — "Did it say the price first?" You get `true` or `false` — no "well, kind of".
- **Pick one** — "Pizza problem, money problem, or lost-driver problem?" You get exactly one of the labels you listed. Never two, never a brand-new one it invented.
- **Stars** — "How nice was the apology?" You get a number, like a game review. 1 is rude, 5 is "they owned it and fixed it".

## One order, start to finish

- **The robot did this:** "Sorry your pizza is cold! I'll refund your $12 right now. Shall I go ahead?" — and then sent the refund before the customer answered.
- **The coach asks Jev:** true or false — did the robot wait for a yes before refunding?
- **Jev says:** `false`.

Notice what Jev did **not** do. It didn't decide whether the pizza was actually cold, and it didn't fix anything. It answered one question about what happened — and it answers the tenth time exactly the way it answered the first.

## Why anyone bothers

Because there are too many orders to check by hand. One busy shop can take thousands of chats a day, and nobody can re-read them. Jev reads all of them in seconds, for less than the price of a gumball, and writes down what it found.

## What the referee can't do

- **Serve the pizza** — Jev doesn't do the job, it only judges whatever did. Ask it to talk to your customers and you've hired the wrong robot.
- **Guess your rules** — Jev has no idea what "good" means until you say it out loud. Vague question in, wobbly answer out.
- **Remember yesterday** — Every call starts fresh. Give it the state, ask the questions — that's the whole deal.

## Go deeper

- [The grown-up version](./what-is-jev.md) — the same three whistles with code attached.
- [50 runnable tests](./index.html#evals-section) — and the real builds behind them.
- [Connect your agent over MCP](./index.html#connect) — `https://jev.magicteams.ai/mcp`.
