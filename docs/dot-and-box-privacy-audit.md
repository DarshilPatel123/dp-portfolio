# Dot-and-Box privacy-policy audit

Audit date: 27 September 2026

## Evidence reviewed

- `E:\Project\dot-and-box\GAME.md`
- `E:\Project\dot-and-box\docs\privacy-policy.html`
- `E:\Project\dot-and-box\project.godot`
- `E:\Project\dot-and-box\export_presets.cfg`
- `E:\Project\dot-and-box\MainMenu.gd`
- `E:\Project\dot-and-box\LegalModal.gd`

## Verified current practices

- The Android game is offline-only and provides local two-player and solo play.
- It does not create user accounts.
- It does not collect, store, transmit, sell, or share personal information or device data.
- It has no advertising, analytics, crash reporting, social login, cloud saves, online multiplayer, cookies, or tracking SDKs.
- Match state and theme preference exist only in memory during a running app session and are discarded when the app closes.
- Both Android export presets set every listed permission to `false`, including `INTERNET`.
- `user_data_backup/allow` is `false`.
- The in-app Legal Modal presents policy text consistent with these practices.

## Confirmed public policy details

- Google Play developer name: `Silent Gaming`
- Privacy contact: `dgp76210@gmail.com`
- Effective date: 27 September 2026

## Release requirements still open

1. Before Play submission, re-audit the exported AAB, Android permissions, in-app Legal Modal, hosted policy, and Data Safety form for consistency.
2. Confirm the deployed URL loads in a private browser without login or geo restrictions.

## Hosted route

`/privacy/dot-and-box/`

The portfolio homepage must not link to this route, and this route must not link back to the portfolio.
