import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Clients & Appointments',
  type: 'document',
  fields: [
    defineField({ 
      name: 'fullName', 
      title: 'Client Name', 
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({ 
      name: 'phone', 
      title: 'Phone', 
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'email', 
      title: 'Email (Optional)', 
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({ 
      name: 'address', 
      title: 'Home Address', 
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'appointmentDate', 
      title: 'Requested Date', 
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'status', 
      title: 'Appointment Status', 
      type: 'string',
      options: {
        list: [
          { title: '🆕 New Request', value: 'New Request' },
          { title: '✅ Confirmed', value: 'Confirmed' },
          { title: '🏠 In Progress', value: 'In Progress' },
          { title: '✔️ Completed', value: 'Completed' },
          { title: '❌ Cancelled', value: 'Cancelled' }
        ]
      },
      initialValue: 'New Request'
    }),
    defineField({
      name: 'interestedFrame',
      title: 'Interested Frame',
      type: 'reference',
      to: [{ type: 'frame' }],
      description: 'Frame the client is interested in (if any)'
    }),
    // THIS IS YOUR CREDIT TRACKER
    defineField({
      name: 'creditBalance',
      title: 'Credit Balance (Owed to you)',
      type: 'number',
      description: 'Positive number means they owe you money.',
      initialValue: 0
    }),
    defineField({
      name: 'creditHistory',
      title: 'Credit History',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'date', type: 'datetime', title: 'Date' },
          { name: 'amount', type: 'number', title: 'Amount' },
          { name: 'description', type: 'string', title: 'Description' },
          { name: 'type', type: 'string', title: 'Type', options: {
            list: ['charge', 'payment']
          }}
        ]
      }]
    }),
    defineField({
      name: 'notes',
      title: 'Optic Notes (Graduation & Details)',
      type: 'text',
      rows: 5
    }),
    defineField({
      name: 'prescriptionDetails',
      title: 'Prescription Details',
      type: 'object',
      fields: [
        { name: 'rightEye', type: 'string', title: 'Right Eye (OD)' },
        { name: 'leftEye', type: 'string', title: 'Left Eye (OS)' },
        { name: 'pd', type: 'string', title: 'Pupillary Distance (PD)' },
        { name: 'add', type: 'string', title: 'Addition (ADD)' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'phone',
      status: 'status',
      date: 'appointmentDate'
    },
    prepare({ title, subtitle, status, date }) {
      return {
        title: title,
        subtitle: `${status} | ${subtitle} | ${date ? new Date(date).toLocaleDateString() : 'No date'}`
      }
    }
  }
})