# Step 1 - Situation

Nothing is proposed before the situation is written. One or two questions
at a time; confirm in one line what the brief or the repo already answers.

## Questions

1. Which of the three: a new product, a repo taken over (whose
   conventions already exist), a study or POC (what will it become if it
   succeeds, and when would we know)?
2. Who else touches the code: only Hedi, a client team later, reviewers
   who expect a familiar pattern? A joined team's existing pattern is a
   constraint, not an option.
3. Lifetime: weeks, a year, several years. A throwaway deserves a written
   "simple, no re-evaluation" rule, not no rule.
4. Platforms now and plausibly later: iOS only, macOS, Android port, web
   companion, backend. A second platform within a year is a trigger.
5. What already exists: mockups, a design system, a backend contract, an
   older codebase to reuse, a product spec. Point to the files.
6. Client constraints: imposed stack, store account, deadline, budget
   frame, code handed over at the end or kept.

## Output

Section "Situation" of `docs/architecture-study.md`:

```
Type: new | taken over | study/POC (becomes: ...)
People: ...
Lifetime: ...
Platforms: now ..., later (likely) ...
Existing: ...
Constraints: ...
```

## Stop

Read it back in three sentences. Ask what is wrong or missing. Step 2
after an explicit go.
