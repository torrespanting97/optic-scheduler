import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'frame',
  title: 'Glasses Catalog',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Frame Name',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Frame Photo',
      type: 'image',
      options: { hotspot: true }, // Allows you to center the photo
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Kids', value: 'kids' },
        ],
      },
    }),
  ],
})