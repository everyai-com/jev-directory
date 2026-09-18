# Contributing

Two ways to grow the directory: add a runnable eval, or fix a community entry.

## Submit without a PR (easiest)

Built something with Jev? [Submit your build](https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml)
— a short form asking for a title, what it does, and your links. A maintainer
turns approved submissions into directory entries. No fork, no JSON, no build step.

## Add an eval by pull request

An eval is one object in `data/jev-guide.js`. Copy the shape — a fixed `state`
plus judge `questions` in Jev's question schema (`boolean`, `choice`, `score`):

```js
{
  id: 'refund-amount-disclosed',
  title: 'Refund chat: agent stated the amount before issuing it',
  category: 'Evaluation',
  story: 'A support agent issues a $42.50 refund; the judge checks the exact amount was stated first.',
  state: 'Customer: …\nAgent: …',
  questions: {
    amount_disclosed: {
      type: 'boolean',
      instructions: 'True only if the agent stated the exact refund amount before the customer approved.'
    }
  }
}
```

Then regenerate both artifacts so everything stays in step:

```bash
node scripts/build-jev-pack.mjs
node scripts/build-jev-directory.mjs
```

## Fix a community entry

Community builds are imported from Discord and carry resolved project links. If a
title, link, or description is wrong, edit `data/use-case-candidates.json` (and
`data/links.json` if the link itself changed), regenerate, and open the PR:

```bash
node scripts/build-jev-pack.mjs
node scripts/build-jev-directory.mjs
```

## What makes a good eval

- **It actually ran.** Paste the real state and the verdict you got.
- **One thing under test.** If the instructions say "and", split it into two questions.
- **Boolean first.** Reach for `choice`/`score` only when true/false can't express it.
- **Say what went wrong, too.** Evals that caught a real failure are more useful than green ones.

## Ground rules

Be accurate about what happened. Don't include anything private — no account numbers,
addresses, tokens or personal data belonging to someone else. Cases are read before they
ship; anything that can't be traced to a real run gets rejected.
