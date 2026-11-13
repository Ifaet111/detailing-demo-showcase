# AURUM — visual / responsive QA checklist

## Implemented (feature branch)
- Extra responsive typography and spacing across 320px–desktop widths.
- Visual motion for hero, service cards, process and final CTA.
- IntersectionObserver scroll reveals, with reduced-motion fallback.
- Accessible before/after drag control, including keyboard Arrow/Home/End.
- Mobile menu aria-expanded, Escape and close-on-navigation.
- Modal state reset on close; demo-only submission disclosure.
- Maintains all five visual concepts and RU/EN translation logic.

## Known limitations / go-live
- **Not yet device-tested** in actual mobile/desktop browsers; CSS and JS are reviewed from source. Manually test 320, 375, 390, 768, 1024 and 1440 px.
- The hero metrics (7+ years, 1840 vehicles, 4.9) and prices are **demo values**, not factual claims.
- “Before” uses a darkened grayscale version of the same hero photo, not an actual before/after customer pair.
- The inquiry form has no backend and does not submit or store data. Integrate CRM/email endpoint and privacy notice for real clients.
- Verify asset-loading, hover states, copy translation, concept switching, screen-reader announcements and Lighthouse performance on live site.
- Confirm images/fonts licensing and add real client consent for photos before commercial use.
