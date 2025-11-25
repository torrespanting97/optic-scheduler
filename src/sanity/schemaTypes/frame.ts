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
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'photo',
      title: 'Frame Photo',
      type: 'image',
      options: { hotspot: true }, // Allows you to center the photo
      validation: Rule => Rule.required()
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
          { title: 'Unisex', value: 'unisex' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck if temporarily unavailable'
    }),
    defineField({
      name: 'material',
      title: 'Material (Optional)',
      type: 'string',
      options: {
        list: ['Metal', 'Plastic', 'Acetate', 'Titanium', 'Mixed']
      }
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
      category: 'category',
      inStock: 'inStock'
    },
    prepare({ title, media, category, inStock }) {
      return {
        title: title,
        subtitle: `${category} ${inStock ? '✓ In Stock' : '✗ Out of Stock'}`,
        media
      }
    }
  }
})