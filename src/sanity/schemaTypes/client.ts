import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Clients & Appointments',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Client Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Home Address', type: 'text' }),
    defineField({ name: 'appointmentDate', title: 'Requested Date', type: 'datetime' }),
    defineField({ 
      name: 'status', 
      title: 'Appointment Status', 
      type: 'string',
      options: {
        list: ['New Request', 'Confirmed', 'Completed', 'Cancelled']
      },
      initialValue: 'New Request'
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
      name: 'notes',
      title: 'Optic Notes (Graduation)',
      type: 'text'
    })
  ],
})