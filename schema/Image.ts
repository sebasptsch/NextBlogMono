import { list } from "@keystone-6/core";
import { image, relationship, text } from "@keystone-6/core/fields";
import { kebabCase } from "lodash";

export const Image = list({
  fields: {
    image: image(),
    alt: text(),
    label: text(),
  },
});
