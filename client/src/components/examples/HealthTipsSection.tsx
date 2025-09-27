import HealthTipsSection from '../HealthTipsSection'

export default function HealthTipsSectionExample() {
  return (
    <HealthTipsSection 
      onTipClick={(tipId) => console.log(`Tip ${tipId} clicked`)}
    />
  )
}