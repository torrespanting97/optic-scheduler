import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | OpticHome",
  description: "Manage appointments and client information",
};

// Revalidate every 30 seconds to show fresh data
export const revalidate = 30;

async function getAppointments() {
  return client.fetch(`*[_type == "client"] | order(appointmentDate desc) {
    _id,
    fullName,
    phone,
    email,
    address,
    appointmentDate,
    status,
    creditBalance,
    notes,
    interestedFrame->{name},
    prescriptionDetails,
    _createdAt
  }`);
}

async function getStats() {
  const appointments = await getAppointments();
  
  const stats = {
    total: appointments.length,
    newRequests: appointments.filter((a: any) => a.status === 'New Request').length,
    confirmed: appointments.filter((a: any) => a.status === 'Confirmed').length,
    completed: appointments.filter((a: any) => a.status === 'Completed').length,
    totalCreditsOwed: appointments.reduce((sum: number, a: any) => sum + (a.creditBalance || 0), 0),
  };
  
  return stats;
}

export default async function AdminDashboard() {
  const appointments = await getAppointments();
  const stats = await getStats();

  // Group by status
  const newRequests = appointments.filter((a: any) => a.status === 'New Request');
  const confirmed = appointments.filter((a: any) => a.status === 'Confirmed' || a.status === 'In Progress');
  const completed = appointments.filter((a: any) => a.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/studio" className="text-sm underline hover:no-underline">
            Sanity Studio
          </Link>
          <Link href="/" className="text-sm underline hover:no-underline">
            Home
          </Link>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Total Appointments</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="text-sm text-yellow-800 uppercase tracking-wide">New Requests</p>
            <p className="text-3xl font-bold mt-2 text-yellow-900">{stats.newRequests}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <p className="text-sm text-blue-800 uppercase tracking-wide">Confirmed</p>
            <p className="text-3xl font-bold mt-2 text-blue-900">{stats.confirmed}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-sm text-green-800 uppercase tracking-wide">Total Credits Owed</p>
            <p className="text-3xl font-bold mt-2 text-green-900">${stats.totalCreditsOwed.toFixed(2)}</p>
          </div>
        </div>

        {/* New Requests Section */}
        {newRequests.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">🆕 New Requests ({newRequests.length})</h2>
            <div className="space-y-4">
              {newRequests.map((apt: any) => (
                <AppointmentCard key={apt._id} appointment={apt} isNew />
              ))}
            </div>
          </section>
        )}

        {/* Confirmed Appointments */}
        {confirmed.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">📅 Upcoming & In Progress ({confirmed.length})</h2>
            <div className="space-y-4">
              {confirmed.map((apt: any) => (
                <AppointmentCard key={apt._id} appointment={apt} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Appointments */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">✅ Completed ({completed.length})</h2>
            <div className="space-y-4">
              {completed.slice(0, 10).map((apt: any) => (
                <AppointmentCard key={apt._id} appointment={apt} isCompleted />
              ))}
            </div>
            {completed.length > 10 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Showing 10 of {completed.length} completed appointments
              </p>
            )}
          </section>
        )}

        {appointments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No appointments yet</p>
          </div>
        )}
      </main>
    </div>
  );
}

function AppointmentCard({ appointment, isNew = false, isCompleted = false }: any) {
  const date = new Date(appointment.appointmentDate);
  const createdDate = new Date(appointment._createdAt);
  
  return (
    <div className={`bg-white p-6 shadow-sm border-l-4 ${
      isNew ? 'border-yellow-500' : isCompleted ? 'border-green-500' : 'border-blue-500'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{appointment.fullName}</h3>
          <p className="text-sm text-gray-500">Requested: {createdDate.toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide ${
          appointment.status === 'New Request' ? 'bg-yellow-100 text-yellow-800' :
          appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
          appointment.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
          appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {appointment.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-600">Contact</p>
          <p className="font-mono text-sm">{appointment.phone}</p>
          {appointment.email && <p className="text-sm text-gray-600">{appointment.email}</p>}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Appointment</p>
          <p className="text-sm">{date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-1">Address</p>
        <p className="text-sm bg-gray-50 p-2">{appointment.address}</p>
      </div>

      {appointment.interestedFrame && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Interested Frame</p>
          <p className="text-sm bg-blue-50 p-2 font-semibold">{appointment.interestedFrame.name}</p>
        </div>
      )}

      {appointment.notes && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Notes</p>
          <p className="text-sm bg-gray-50 p-2 whitespace-pre-wrap">{appointment.notes}</p>
        </div>
      )}

      {appointment.creditBalance !== 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Credit Balance</p>
          <p className={`text-lg font-bold ${appointment.creditBalance > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(appointment.creditBalance).toFixed(2)} {appointment.creditBalance > 0 ? '(owed to you)' : '(credit)'}
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t">
        <Link 
          href={`/studio/structure/client;${appointment._id}`}
          className="flex-1 text-center bg-black text-white py-2 text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition"
        >
          Edit in Studio
        </Link>
      </div>
    </div>
  );
}
