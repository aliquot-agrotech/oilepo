**Task:** Replicate the exact UI/UX, visual language, and architectural layout of **https://oilepo.com/** within this Astro project.

**1. Design System & Theme (Tailwind Configuration)**
* **Colors:** Implement the exact palette.

* **Typography:** Import and configure:
    * **Serif (Headings):** Closest Google Font equivalent to Oilepo's brand (e.g., *Cormorant Garamond* or *Playfair Display*).
    * **Sans-Serif (Body):** Clean, high-readability font (e.g., *Montserrat* or *Inter*).


**2. Component Architecture (Plan Mode)**
* **Layout:** Create a `BaseLayout.astro` that includes the `ViewTransitions` API and global font imports.
* **Navigation:** BUse the same `<Header />`  as in the site
* **Hero Section:** Use the same hero layout as in the site images can be placeholders for now.
* **Content Sections:** Build alternating "Image & Text" components with precise padding and margin to replicate Oilepo’s spacious, breathable layout leave the images as place holders.
* **Footer:** Same as site with dynamic year.

**3. Animation & Interaction Logic**
* **Page Transitions:** Ensure seamless navigation using Astro's native View Transitions.

**4. Technical Constraints**
* **Images:** Use the `astro:assets` `<Image />` component for all image placeholders to ensure performance matches the original site.
* **Responsive:** Ensure the mobile version uses the same full-screen overlay menu and stacking logic as the live site.

**Execution Order:**
1. Update `src/styles/global.css` with the theme tokens for oilepo site.
2. Build the Hero and Navigation primitives.
3. Keep it simple and similar