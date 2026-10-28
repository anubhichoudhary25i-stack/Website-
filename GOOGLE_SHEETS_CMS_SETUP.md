# Unified Google Sheets Live CMS (One Single Spreadsheet)

You now have a **single, unified Google Sheet** that controls **both the main website AND the portfolio showcase**!

Whenever you update this single spreadsheet, your changes appear live across both pages with zero redeployments.

---

## Your Master Spreadsheet File

File Name: **`Anubhi_Master_CMS_Template.xlsx`**  
Locations:
- `d:\Anubhi\latest_anu\Anubhi_Master_CMS_Template.xlsx` (Root project folder)
- `d:\Anubhi\latest_anu\Website\Anubhi_Master_CMS_Template.xlsx`

### All 11 Tabs Inside This Single Spreadsheet:
1. **`General`**: Name, titles, hero tagline, hero roles, credentials, "About Me" summary, contact info, and quotes (Shared by both Website & Showcase).
2. **`Experience`**: All career roles, companies, locations, dates, and detailed bullet points (Website).
3. **`Skills`**: All skills, percentage proficiencies, and categories (Website).
4. **`Education`**: Degrees, colleges, dates, and GPAs (Website).
5. **`Achievements`**: Research publications, awards, competition wins, and articles (Website).
6. **`Extracurricular`**: Committee leadership and campus reporter roles (Website).
7. **`Blogs`**: Articles, descriptions, and LinkedIn links (Website).
8. **`Portfolio`**: Portfolio teaser headline, description, chips, and button (Website).
9. **`Clients`**: Client brand accounts, sectors, and descriptions (Portfolio Showcase).
10. **`Events`**: Summits, expos, awards, and descriptions (Portfolio Showcase).
11. **`Testimonials`**: Client recommendations, quotes, and full endorsements (Portfolio Showcase).

---

## 3 Easy Steps to Connect Live (Under 2 Minutes)

### Step 1: Upload to Google Drive
1. Go to [Google Drive](https://drive.google.com/).
2. Click **+ New** (top-left) &rarr; **File upload**.
3. Select **`Anubhi_Master_CMS_Template.xlsx`**.
4. Once uploaded, right-click the file &rarr; **Open with** &rarr; **Google Sheets**.
   *(All 11 tabs will be visible, styled with terracotta headers, and pre-filled with your real data!)*

---

### Step 2: Share as Viewer
1. In your newly opened Google Sheet, click the blue/green **Share** button (top-right).
2. Under **General access**, change from **Restricted** to **"Anyone with the link"**.
3. Ensure the permission is set to **Viewer**.
4. Click **Done**.

---

### Step 3: Paste Sheet ID into `.env`
1. Look at the URL in your browser's address bar:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          This string between /d/ and /edit is your SHEET_ID
   ```
2. Copy that Sheet ID.
3. Open [`Website/.env`](file:///d:/Anubhi/latest_anu/Website/.env) and set:
   ```env
   VITE_GOOGLE_SHEET_ID=YOUR_COPIED_SHEET_ID
   ```
4. Save the file!

---

## Highlights

- **Single Source of Truth**: One spreadsheet controls everything.
- **Instant Fallback**: If offline or before the sheet ID is set, the website automatically displays your local profile data.
- **Shared across Showcase**: Clicking "View Full Portfolio Showcase" passes the same sheet ID automatically, keeping both pages 100% in sync.
