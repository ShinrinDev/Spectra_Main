







export const platformSettingsData = [
  {
    title: "account",
    options: [
      {
        checked: true,
        label: "Email me when a client emails a lead ",
      },
      {
        checked: false,
        label: "Email me weekly invoices ",
      },
      {
        checked: true,
        label: "Email me when a lead respond",
      },
    ],
  },
  {
    title: "application",
    options: [
      {
        checked: false,
        label: "Client emails lead web notification",
      },
      {
        checked: true,
        label: "Weekly invoice web notification",
      },
      {
        checked: false,
        label: "Lead response web notification",
      },
    ],
  },
];

export default platformSettingsData;
