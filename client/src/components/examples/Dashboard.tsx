import Dashboard from '../Dashboard'

export default function DashboardExample() {
  return (
    <div className="p-6 bg-background">
      <Dashboard 
        onNavigateToSymptoms={() => console.log('Navigate to symptoms')}
        onNavigateToAppointments={() => console.log('Navigate to appointments')}
        onNavigateToEmergency={() => console.log('Navigate to emergency')}
        onNavigateToHistory={() => console.log('Navigate to history')}
      />
    </div>
  )
}