import EmergencyContacts from '../EmergencyContacts'

export default function EmergencyContactsExample() {
  return (
    <div className="p-6 bg-background">
      <EmergencyContacts 
        onCallContact={(contactId, phone) => {
          console.log(`Contact ${contactId} called: ${phone}`);
        }}
      />
    </div>
  )
}