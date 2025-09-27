import AppointmentForm from '../AppointmentForm'

export default function AppointmentFormExample() {
  return (
    <div className="p-6 bg-muted/30">
      <AppointmentForm 
        onSubmit={async (data) => {
          console.log('Appointment booked:', data);
        }}
      />
    </div>
  )
}