import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, AlertTriangle } from "lucide-react";

const emergencyContacts = [
  {
    id: 1,
    name: "Emergency Services",
    type: "Emergency",
    phone: "911",
    description: "For life-threatening emergencies",
    available: "24/7",
    priority: "high"
  },
  {
    id: 2,
    name: "City General Hospital",
    type: "Hospital",
    phone: "(555) 123-4567",
    address: "123 Medical Center Dr",
    description: "Full-service emergency department",
    available: "24/7",
    priority: "high"
  },
  {
    id: 3,
    name: "Urgent Care Center",
    type: "Urgent Care",
    phone: "(555) 234-5678",
    address: "456 Health Plaza",
    description: "Non-emergency urgent medical care",
    available: "7 AM - 10 PM",
    priority: "medium"
  },
  {
    id: 4,
    name: "Poison Control Center",
    type: "Specialized",
    phone: "1-800-222-1222",
    description: "24-hour poison emergency helpline",
    available: "24/7",
    priority: "high"
  },
  {
    id: 5,
    name: "Mental Health Crisis Line",
    type: "Crisis Support",
    phone: "988",
    description: "24/7 mental health crisis support",
    available: "24/7",
    priority: "high"
  },
  {
    id: 6,
    name: "Family Practice Clinic",
    type: "Primary Care",
    phone: "(555) 345-6789",
    address: "789 Wellness Blvd",
    description: "General family medicine",
    available: "8 AM - 6 PM",
    priority: "low"
  }
];

interface EmergencyContactsProps {
  onCallContact?: (contactId: number, phone: string) => void;
}

export default function EmergencyContacts({ onCallContact }: EmergencyContactsProps) {
  const handleCall = (contact: any) => {
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    onCallContact?.(contact.id, contact.phone);
    
    // Simulate opening phone dialer
    if (typeof window !== 'undefined') {
      window.open(`tel:${contact.phone}`, '_self');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive/20 bg-destructive/5';
      case 'medium': return 'border-chart-3/20 bg-chart-3/5';
      case 'low': return 'border-primary/20 bg-primary/5';
      default: return '';
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === 'high' ? 
      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
      <Phone className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
          <AlertTriangle className="w-8 h-8 text-destructive" />
          Emergency Contacts
        </h2>
        <p className="text-lg text-muted-foreground">
          Quick access to essential healthcare contacts and emergency services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyContacts.map((contact) => (
          <Card 
            key={contact.id} 
            className={`hover-elevate transition-all ${getPriorityColor(contact.priority)}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span data-testid={`text-contact-name-${contact.id}`}>
                  {contact.name}
                </span>
                {getPriorityIcon(contact.priority)}
              </CardTitle>
              <CardDescription className="text-sm font-medium text-primary">
                {contact.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {contact.description}
              </p>
              
              {contact.address && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{contact.address}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{contact.available}</span>
              </div>
              
              <Button 
                variant={contact.priority === 'high' ? 'destructive' : 'default'}
                className="w-full mt-4"
                onClick={() => handleCall(contact)}
                data-testid={`button-call-${contact.id}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call {contact.phone}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-destructive/20">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h3 className="font-semibold text-destructive">Important Notice</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          In case of a life-threatening emergency, call 911 immediately. 
          These contacts are provided for convenience and may not be available 24/7 unless specified.
        </p>
      </div>
    </div>
  );
}