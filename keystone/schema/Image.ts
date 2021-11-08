import { list } from "@keystone-next/keystone";
import { image, relationship, text } from "@keystone-next/keystone/fields";
import { kebabCase } from "lodash";

export const Image = list({
  fields: {
    image: image(),
    alt: text(),
    label: text(),
  },
});
