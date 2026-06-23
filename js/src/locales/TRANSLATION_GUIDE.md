# Translation Guide

Welcome to the translation guide for the **Simultaneous Equation Cannons Calculator**! This document explains the context of each string found in `translation.json`, both from a UI perspective and a **Yu-Gi-Oh! (YGO) Trading Card Game** perspective. 

When translating this app to a new language, it is highly recommended to use the **official YGO TCG/OCG terminology** for your region.

---

## 🃏 General Yu-Gi-Oh! Concepts in this App

This application is built around resolving a very specific and mathematically complex trap card in Yu-Gi-Oh! called **Simultaneous Equation Cannons (SEC)**.
To use SEC properly, players need to banish Fusion and Xyz monsters from their **Extra Deck**. The levels and ranks of those banished monsters must add up to match the level of an opponent's monster, multiplied by the total number of cards in all players' hands and fields.

### Key Vocabulary:
- **Extra Deck**: A secondary deck in YGO containing special monsters (Fusion, Synchro, Xyz, Link).
- **Banish / Banish Zone**: Removing a card from play. The "Banish Zone" (or Removed from Play zone) is where these cards go.
- **Level / Rank**: Numerical values printed on YGO monster cards (stars). Fusion monsters have Levels, Xyz monsters have Ranks.
- **Send / Return**: SEC requires you to *banish* (Send) monsters from the Extra Deck, and then *return* them later. 

---

## 🔤 Terminology Breakdown by Section

### 1. Navigation (`nav`)
These are the links found in the main navigation menu/sidebar.

* `main`: "Main Page" - The primary calculator view.
* `extra`: "Extra Deck" - The setup page where users input which Fusion and Xyz monsters they actually own in their Extra Deck.
* `banished`: "Banish Zone" - The page where users tell the app which Extra Deck monsters they have *already* banished earlier in the duel.
* `help`: "Help" - The tutorials and usage guide.
* `about`: "About us" - Open source credits and version info.
* `install`: "Install Offline App" - Prompt to install the PWA (Progressive Web App) to their device.

### 2. Extra Deck Setup (`deck`)
These strings appear on the **Extra Deck** and **Banish Zone** setup pages.

* `extra_title`: "Extra Deck Monsters" - Page header.
* `extra_sub`: "Select the levels/ranks available in your Extra Deck" - Instructions for the user.
* `banished_title`: "Banished Monsters" - Page header for the Banish Zone setup.
* `banished_sub`: "Select previously banished Levels/Ranks" - Instructions for selecting which cards are no longer available in the Extra Deck because they were used previously.
* `space`: "Extra Deck Space:" - A counter (usually out of 15, the max Extra Deck size) showing how many cards are selected.
* `done`: "Done" - Save/Close button.
* `share`: "Share Extra Deck Setup" - Button to copy the user's specific deck configuration to their clipboard.
* `copied`: "Copied!" - Tooltip that appears after clicking share.
* `reset`: "Reset Banished" - Button to clear all selections in the Banish Zone.
* `xyz_sel`: "Xyz Monster Rank Selection" - Header for the black Xyz cards section.
* `fusion_sel`: "Fusion Monster Level Selection" - Header for the purple Fusion cards section.
* `lvl_cards`: "Lvl \ Cards" - Table column header indicating "Level / Number of Cards".
* `lvl`: "Lvl" - Shorthand for Level.

### 3. Home / Calculator View (`home`)
These strings appear on the main calculator table, which does the math for the user.

* `title`: "Simultaneous Equation Cannons Calculator" - The name of the app.
* `total_cards`: "Total Cards" - The sum of all cards in both players' hands and fields.
* `opp_hand`: "Opponent hand" - Number of cards in the opponent's hand.
* `opp_field`: "Opponent field" - Number of cards on the opponent's field.
* `my_hand`: "My hand" - Number of cards in the user's hand.
* `my_field`: "My field" - Number of cards on the user's field.
* `opp_level`: "Opponent Monster Level" - The Level/Rank of the opponent's monster the user is targeting.
* `total_banish`: "Total Cards to Banish" - How many Extra Deck monsters the math requires the user to banish.
* `targets`: "Banish Targets" - The specific combination of Extra Deck monsters the app suggests banishing.
* `send_banish_zone`: "Banish:" - Label showing which monsters to banish.
* `return_extra`: "Return:" - Label showing which monsters to return to the Extra Deck (a specific mechanic of the SEC card).
* `reset`: "Reset Banished" - Button to quickly clear the Banish Zone.
* `switch_list`: "List View" - Toggle for mobile-friendly vertical layout.
* `switch_grid`: "Table View" - Toggle for desktop-friendly grid layout.
* `select_total`: "Select Total Number" - Placeholder text prompting the user to click a cell in the table.
* `get_more`: "to Get More Info" - Continuation of the placeholder above.
* `error`: "Extra Deck Monster Over 15! Reset" - Error message when the user configures more than the legal limit of 15 Extra Deck cards.
* `reset_extra`: "Reset Extra Deck" - Button to quickly clear the Extra Deck setup.

### 4. Help & Tutorials (`help`)
This section contains full sentences explaining how to use the app and play the card.

* `tut`: "Tutorials" - Section header.
* `usage`: "Usage" - Section header.
* `h1`: "Use the Extra Deck page to setup the available Levels/Ranks." - Instructs the user to configure their deck first.
* `h2` to `h7`: Explains how to calculate "Total Cards".
* `h8`: Explains what "Opponent Monster Level" means (Link monsters don't have levels, so they are excluded).
* `h9` to `h11`: Explains how to read the app's main data table.
* `h12` to `h15`: Explains the win-condition of the SEC card. If the board state matches the math, the opponent's board is wiped.
* `h16`: "If you click on the total cards button, you will see exactly what to send and what to return from the banish zone." - Explains the interactive popover feature.
* `h17`: Explains an advanced YGO ruling: if a player activates two SEC cards in the same chain, the combinations can differ.
* `h18`: Instructs the user to use the Banish Zone page to track monsters they've already banished.

### 5. About (`about`)
Standard application metadata.

* `title`: "About"
* `desc`: "This app is an open-source project."
* `github`: "Check out the code or contribute on GitHub:"
* `version`: "Version" (Currently unused in UI, kept for future-proofing)
* `created_by`: "Created by" - Author credit.
* `source_code`: "source code" - Link text for the GitHub repo.
