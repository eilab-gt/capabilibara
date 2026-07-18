# Prompt: export social assets

Create or update export scripts for the selected animation.

Expected outputs:
- 16:9 MP4
- square MP4
- poster PNG
- optional GIF preview

Requirements:
- deterministic timeline state;
- no browser UI in capture;
- readable text at target resolution;
- no motion if `prefers-reduced-motion` mode is selected;
- export commands documented in the animation QA file.
- served exports placed under `public/static/animations/exports/` only when intended for the website;
- temporary frame sequences kept outside the repo or in ignored scratch space.

Use Playwright or a comparable browser automation tool, plus FFmpeg for conversion.
