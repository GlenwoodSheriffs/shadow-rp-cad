# Shadow RP | Glenwood Shadow City CAD

This release converts the production Shadow RP CAD/MDT into the Glenwood Shadow City command and resident-services platform.

## Included systems

- Discord OAuth with mobile-safe login handoff
- Glenwood Metro AI police, fire, and EMS dispatch
- Live incidents, priority classification, ten-codes, assignments, notes, and dispositions
- Unit roster, duty states, panic alerts, and WebSocket telemetry
- BOLOs, name/vehicle lookup, reports, citations, arrests, and unified intelligence search
- Six Glenwood response districts: North Hills, Downtown, East Glenwood, Southside, Harbor District, and Industrial Park
- Fictional personas, licenses, vehicles, property, businesses, and city-service filings
- Persistent ATM-backed bank balance and Glenwood Exchange portfolio
- Administrator oversight, audit history, role management, and protected record controls
- Arma Reforger account linking and server bridge from the existing Shadow RP addon

## Production services

The existing GitHub Pages frontend, Railway backend, Discord application, SQLite volume, and Reforger API configuration remain compatible. Deploying this release does not reset accounts, links, incidents, reports, bank balances, portfolios, or audit history.

## Brand configuration

Edit `frontend/src/brand.js` to change city names or labels without searching through the interface. Replace `frontend/public/shadow-rp-logo.gif` if Glenwood receives a dedicated crest later.

## Verification

Run `npm test` from `backend`, then run `npm run build` from `frontend`. Both checks must pass before publishing.
