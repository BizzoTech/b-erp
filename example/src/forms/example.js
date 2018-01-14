export default {
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
          label: "Email",
          name: "email",
          type: "email"
        }
      ]
    },
    {
      fields: [
        {
          label: "Address",
          name: "address",
          type: "text"
        },
        {
          label: "Items",
          name: "items",
          type: "table",
          large: true,
          fields: [
            {
              label: "Name",
              name: "name",
              type: "text"
            },
            {
              label: "Price",
              name: "price",
              type: "text"
            }
          ]
        },
        {
          label: "Items 2",
          name: "items2",
          type: "table",
          large: true,
          fields: [
            {
              label: "Name",
              name: "name",
              type: "text"
            },
            {
              label: "Qty",
              name: "qty",
              type: "number"
            }
          ]
        }
      ]
    }
  ]
}