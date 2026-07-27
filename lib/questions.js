export const SECTIONS = [
  {
    id: "profile",
    title: "Business profile",
    description: "Tells us which rules apply to you.",
    questions: [
      {
        id: "industry",
        label: "Which best describes your business?",
        type: "select",
        options: [
          "Bank or SBP-licensed financial institution",
          "Fintech / payments / wallet (not yet SBP-licensed)",
          "E-commerce or retail",
          "SaaS / software company",
          "Other services (not sector-regulated)",
        ],
      },
      {
        id: "size",
        label: "How many people work at your company?",
        type: "select",
        options: ["1-10", "11-50", "51-200", "200+"],
      },
    ],
  },
  {
    id: "data",
    title: "Data practices",
    description: "What you collect and where it lives.",
    questions: [
      {
        id: "dataTypes",
        label: "What personal data do you collect? (select all that apply)",
        type: "multiselect",
        options: [
          "Names and contact details",
          "CNIC / national ID numbers",
          "Financial or transaction data",
          "Biometric data",
          "Location data",
          "None of the above",
        ],
      },
      {
        id: "storageLocation",
        label: "Where is customer data primarily stored?",
        type: "select",
        options: [
          "Local servers in Pakistan",
          "Cloud provider, Pakistan region",
          "Cloud provider, outside Pakistan",
          "Not sure",
        ],
      },
      {
        id: "retentionDocumented",
        label: "Is there a written policy for how long you keep data?",
        type: "select",
        options: ["Yes, documented", "Informally, not written down", "No policy", "Not sure"],
      },
    ],
  },
  {
    id: "controls",
    title: "Existing controls",
    description: "What protections are already in place.",
    questions: [
      {
        id: "privacyNotice",
        label: "Do you have a published privacy notice?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "mfa",
        label: "Is multi-factor authentication enforced on core systems?",
        type: "select",
        options: ["Yes, everywhere", "Yes, partially", "No", "Not sure"],
      },
      {
        id: "accessControl",
        label: "Is access to customer data restricted by role?",
        type: "select",
        options: ["Yes", "Partially", "No", "Not sure"],
      },
      {
        id: "dpoAssigned",
        label: "Is anyone formally responsible for data protection, even informally?",
        type: "select",
        options: ["Yes, a named person", "No one specific", "Not sure"],
      },
      {
        id: "breachHistory",
        label: "Have you had a data breach or security incident before?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "incidentPlan",
        label: "Do you have a written incident-response plan?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
    ],
  },
  {
    id: "vendors",
    title: "Third parties",
    description: "Who else touches your data.",
    questions: [
      {
        id: "vendorSharing",
        label: "Do you share customer data with vendors (payment gateways, cloud hosts, marketing tools)?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "vendorContracts",
        label: "Do those vendor contracts include data-protection clauses?",
        type: "select",
        options: ["Yes, all of them", "Some of them", "No", "Not applicable / not sure"],
      },
    ],
  },
];

export function flattenAnswers(answers) {
  const lines = [];
  for (const section of SECTIONS) {
    for (const q of section.questions) {
      const val = answers[q.id];
      if (val === undefined || val === null || val === "") continue;
      lines.push(`${q.label} -> ${Array.isArray(val) ? val.join(", ") : val}`);
    }
  }
  return lines.join("\n");
}
