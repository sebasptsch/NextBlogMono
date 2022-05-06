import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { kebabCase } from "lodash";

export const Tag = list({
  ui: {
    isHidden: true,
  },
  fields: {
    name: text({ isFilterable: true, isIndexed: "unique" }),
    posts: relationship({ ref: "Post.tags", many: true }),
    description: text(),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { name } = resolvedData;
      if (name) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(name);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});
