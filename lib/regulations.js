// Condensed, paraphrased summaries of the regulatory frameworks Mizan checks
// businesses against. These are plain-language digests written for this
// project, not verbatim legal text, and are not a substitute for legal advice.
// Kept in one place so they can be updated as the law develops.

export const REGULATORY_FRAMEWORKS = `
FRAMEWORK 1: DRAFT PERSONAL DATA PROTECTION BILL (PAKISTAN)
Status: approved by the Federal Cabinet, pending passage by Parliament. Applies
to any organization that collects, stores, or processes the personal data of
people in Pakistan, regardless of sector.
Core obligations once enacted:
- Purpose limitation: collect personal data only for a specific, stated purpose.
- Data minimization: collect only what is necessary for that purpose.
- Lawful basis / consent: have a clear legal basis for collecting and using
  personal data, especially for marketing.
- Transparency: publish a privacy notice describing what is collected, why,
  and how it is used.
- Retention and deletion: define and document how long data is kept, and
  delete it when no longer needed.
- Data Protection Officer: appoint a person (formal title not required pre-
  enactment) responsible for data protection compliance.
- Third-party / vendor control: vendors and processors handling personal data
  on the company's behalf must be contractually bound to protect it.
- Breach awareness: have a way to detect and respond to a data breach.
- Regulatory registration: once the bill is enacted, register with the new
  Commission (NCPDP) as a data controller/processor.

FRAMEWORK 2: SBP ENTERPRISE TECHNOLOGY GOVERNANCE FRAMEWORK (2017)
Applies to: banks and financial institutions regulated by the State Bank of
Pakistan.
Core obligations:
- Board-level oversight of technology and data risk, not just IT-department
  ownership.
- Documented IT governance structure with clear accountability for data
  security decisions.
- Formal risk management process covering data confidentiality, integrity,
  and availability.
- Access control and authentication requirements (e.g. role-based access,
  MFA) for systems handling customer data.

FRAMEWORK 3: SBP FRAMEWORK FOR RISK MANAGEMENT IN OUTSOURCING (2019)
Applies to: banks and financial institutions that outsource any operation
involving customer data (e.g. cloud hosting, payment processing, customer
support).
Core obligations:
- Formal risk assessment before onboarding any vendor that touches customer
  data.
- Outsourcing contracts must include minimum security standards and data
  protection clauses.
- Ongoing monitoring of vendor security practices, not just at onboarding.

FRAMEWORK 4: PECA 2016 (AS AMENDED 2025)
Applies to: everyone. Sets criminal liability for unauthorized access to data
systems, identity theft, and unauthorized disclosure of personal data. The
National Cyber Crime Investigation Agency (NCCIA) is the investigating body.
Relevance for a compliance check: a company with weak access controls or no
breach-response process carries real legal exposure under this law, separate
from the PDPB.

NOTES ON APPLICABILITY
- If the business is a bank, fintech, or other SBP-regulated financial
  institution, Framework 2 and Framework 3 apply IN ADDITION to Framework 1.
- If the business is a general SME, e-commerce company, or service provider
  with no SBP license, only Framework 1 and Framework 4 apply.
- These frameworks are current as of mid-2026. The PDPB is still a draft
  bill, not enacted law — treat its obligations as "coming requirements to
  prepare for," not present-day legal mandates, and say so explicitly in any
  output.
`;
