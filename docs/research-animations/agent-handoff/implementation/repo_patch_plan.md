# Suggested repo patch plan

## Phase 0: inspect

Inspect:

```bash
ls
sed -n '1,220p' README.md
sed -n '1,260p' public/index.html
sed -n '1,260p' public/static/js/figure1.js
sed -n '1,260p' public/static/css/socialtda.css
sed -n '1,120p' public/static/js/main.js
```

## Phase 1: add standalone animation infrastructure

Do not modify the current homepage first. Add dev pages and modules.

Use:

```text
public/static/js/animations/
public/static/css/animations.css
public/animations/dev/
docs/research-animations/qa/
```

## Phase 2: build first animation

Implement `signature-bin-animation.js` and dev page.

## Phase 3: export

Add a browser-capture script only after the dev page works.

## Phase 4: integrate into site

Add a section or replace static figure only after QA.

## Phase 5: refactor old Figure 1

Once modules are stable, consider porting existing `figure1.js` scenes to the new helper system.
