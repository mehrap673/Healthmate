import SymptomForm from '../SymptomForm'

export default function SymptomFormExample() {
  return (
    <div className="p-6 bg-muted/30">
      <SymptomForm 
        onSubmit={async (data) => {
          console.log('Symptoms submitted:', data);
        }}
      />
    </div>
  )
}