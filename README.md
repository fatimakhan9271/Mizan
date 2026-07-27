# Mizan — AI compliance copilot for Pakistani businesses

> میزان (Mizan) — "scale" or "balance." The word used across Urdu and Arabic for weighing
> something fairly, including justice itself.

## a. What it does, and who it's for

Pakistan's **Personal Data Protection Bill** has already been approved by the Federal Cabinet and
is headed to Parliament. Banks and fintechs already answer to the **State Bank of Pakistan's**
Enterprise Technology Governance Framework (2017) and its Framework for Risk Management in
Outsourcing (2019). None of this is optional once it lands — but almost no SME founder or fintech
operations team in Pakistan has a clear, affordable way to find out where their business actually
stands against these rules. The alternative today is either ignoring it, or paying a compliance
lawyer thousands of rupees for an audit just to get a first answer.

**Mizan** is a five-minute guided questionnaire that turns into:
1. A **risk-ranked compliance gap report**, specific to the business's own answers — not a generic
   checklist.
2. A set of **first-draft policy documents** (privacy notice, data retention policy,
   incident-response plan) generated from the business's own details, downloadable as Word files,
   ready for a lawyer to review rather than write from scratch.

It's built for:
- **SME founders** who collect customer data and have never had a compliance review.
- **Fintech and payments operators** who need a first pass at SBP's technology-governance and
  outsourcing requirements before an audit finds the gaps for them.
- **Anyone who wants a specific, honest answer before paying for a lawyer to tell them the same
  thing.**

## b. Live URL

**[Add your deployed Vercel URL here after deployment — e.g. https://mizan-yourname.vercel.app]**

## c. Features

- Guided, four-section onboarding questionnaire (business profile, data practices, existing
  controls, third parties) — no account required.
- AI-driven gap analysis that determines *which* regulatory frameworks apply to the business
  (general SME vs. SBP-regulated financial institution) before scoring anything.
- A compliance dashboard: overall compliance score, count of high-risk gaps, and a single
  "fix this first" priority.
- A filterable, risk-ranked list of every compliance gap, each with:
  - the specific requirement and which framework it comes from,
  - a met / partial / missing status,
  - a plain-language explanation of the real-world consequence,
  - a concrete next step.
- Automatic first-draft policy documents for any missing document-type requirement, generated
  from the business's own answers.
- One-click download of any drafted policy as a real `.docx` Word document.
- Fully responsive, dark, ledger-inspired interface with no template-default styling.

## d. The AI feature

The AI feature is the core of the product: an LLM-driven compliance analyst that reads a
company's questionnaire answers and produces a structured, risk-ranked gap analysis plus
first-draft policy documents — in one call, returned as strict JSON so the frontend can render it
as a real dashboard rather than a wall of AI text.

**Model used:** `openai/gpt-oss-120b` via the Groq API (OpenAI-compatible chat completions
endpoint), called server-side from `/api/analyze` so the API key never reaches the browser. Groq
was chosen for inference speed — the full gap analysis returns in a couple of seconds.

**What makes it more than a wrapper:** the system prompt embeds condensed, paraphrased summaries
of four real regulatory frameworks (the draft Personal Data Protection Bill, SBP's Enterprise
Technology Governance Framework, SBP's Framework for Risk Management in Outsourcing, and PECA
2016 as amended in 2025) and explicit rules for how to reason about them — which frameworks apply
to which kind of business, how to weight risk by what the company actually collects rather than a
flat score, and how to avoid treating the still-unenacted PDPB as if it were current law. The full
prompt lives in [`lib/systemPrompt.js`](./lib/systemPrompt.js) and the regulatory summaries in
[`lib/regulations.js`](./lib/regulations.js) — reproduced here in full since the prompt itself
*is* the AI feature:

<details>
<summary><strong>Click to expand the full system prompt</strong></summary>

```
You are Mizan, an AI compliance analyst for businesses operating in
Pakistan. Your job is to read a company's answers to a data-handling
questionnaire and produce an honest, specific gap analysis against the
regulatory frameworks below — the way an experienced compliance officer would,
not a keyword matcher.

[... four condensed regulatory frameworks: draft Personal Data Protection
Bill, SBP Enterprise Technology Governance Framework 2017, SBP Framework for
Risk Management in Outsourcing 2019, PECA 2016 as amended 2025 — full text in
lib/regulations.js ...]

HOW TO ANALYZE
1. Determine which frameworks apply based on the company's stated industry
   and whether it is SBP-regulated.
2. For each applicable requirement, compare it against what the company
   actually reported. Do not assume a control exists unless the company said
   so. Ambiguous or "not sure" answers are treated as partial/missing, never
   assumed compliant.
3. Assign a risk level based on real-world exposure — the amount and
   sensitivity of data the company actually collects drives the risk level,
   not a flat per-requirement score.
4. Write plain-language explanations a non-lawyer founder can understand.
5. State explicitly whether Mizan can draft the missing document directly or
   whether it needs a lawyer / the future Commission.
6. Never claim the draft Personal Data Protection Bill is currently
   enforceable law — frame its obligations as requirements to prepare for.
7. No generic filler advice — every line must be specific to what the
   company told Mizan.

OUTPUT FORMAT
Respond with ONLY a single JSON object — summary (compliance_percent,
high_risk_count, top_priority, applicable_frameworks), gaps[] (requirement,
source, status, risk, explanation, action, draftable, document_title), and
drafted_documents[] (title, content) — no prose, no markdown fences.
```

</details>

## e. Tools, services, and models used

- **Framework:** Next.js 14 (App Router), React 18
- **Styling:** Tailwind CSS, custom design tokens (no default UI kit)
- **AI model:** `openai/gpt-oss-120b` via the Groq API, called server-side
- **Document generation:** [`docx`](https://www.npmjs.com/package/docx) npm package, generating
  real `.docx` files server-side on demand
- **Hosting:** Vercel
- **Fonts:** Newsreader (display serif), Inter (body), IBM Plex Mono (data/labels) via Google Fonts
- **Regulatory research:** draft Personal Data Protection Bill status, SBP frameworks, and PECA
  2016/2025 amendments — summarized from publicly available legal and regulatory sources, not
  reproduced verbatim

## f. Screenshots

### Main screen

<img width="1920" height="1080" alt="main page" src="https://github.com/user-attachments/assets/cea79783-0e6a-40fb-a920-48dd4358dca4" />

The hero page introducing the problem and the "Start your assessment" call to action.

### Question screen

<img width="1020" height="1070" alt="questionare" src="https://github.com/user-attachments/assets/4b551da3-eb42-49fb-8bf2-903db5a1646b" />

One of the four onboarding sections (business profile, data practices, existing controls, or
third parties) mid-way through the questionnaire.

### Result screen

<img width="1076" height="885" alt="results -1" src="https://github.com/user-attachments/assets/5ccd5fd7-bb6c-43ec-91d0-8e2a93805174" />
<img width="1256" height="896" alt="results - 2" src="https://github.com/user-attachments/assets/8938dea3-e74e-4f33-8a6f-b8b228d4c703" />


The compliance score, high-risk gap count, applicable frameworks, the risk-ranked gap list, and
the drafted policy documents ready for download.

## g. How to run the project

### Run locally

```bash
git clone <your-repo-url>
cd mizan
npm install
cp .env.example .env.local
# edit .env.local and add your own GROQ_API_KEY from https://console.groq.com
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy to Vercel

1. Push this repo to your own **public** GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. In the project's **Environment Variables** settings, add:
   - `GROQ_API_KEY` = your own Groq API key
4. Deploy. Vercel will detect Next.js automatically — no build configuration needed.
5. Copy the live URL Vercel gives you into section **b** of this README.

**Never commit your API key.** It only ever lives in `.env.local` (already gitignored) locally,
and in Vercel's environment variable settings in production.

---

### Pre-submission checklist

- [ ] `GROQ_API_KEY` added in Vercel, not committed anywhere in the repo
- [ ] Live URL added to section (b) above and tested in an incognito window
- [ ] Repo set to **Public** and opened in an incognito window to confirm it doesn't ask for login
- [ ] Screenshots added under all three headings in section (f)
- [ ] Ran through the full flow once on the live URL: main screen → questions → result →
      docx download
