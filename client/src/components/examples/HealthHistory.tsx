import HealthHistory from '../HealthHistory'

export default function HealthHistoryExample() {
  return (
    <div className="p-6 bg-background">
      <HealthHistory 
        onRerunAnalysis={(entryId) => {
          console.log(`Rerunning analysis for entry ${entryId}`);
        }}
      />
    </div>
  )
}