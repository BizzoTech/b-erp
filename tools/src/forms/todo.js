export default {
  title: "Todo",
  fieldGroups: [
    {
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
          required: true
        },
        {
          label: "Status",
          name: "status",
          type: "select",
          options: ["Draft", "Done", "Archived"]
        }
      ]
    },
    {
      fields: [
        {
          label: "Description",
          name: "description",
          type: "textarea",
          large: true
        },
        {
          label: "Due Date",
          name: "due_date",
          type: "date"
        },
        {
          label: "Created At",
          name: "createdAt",
          type: "date",
          readOnly: true
        }
      ]
    }
  ]
};
