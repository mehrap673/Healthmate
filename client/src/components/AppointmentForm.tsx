import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, MapPin, CheckCircle } from "lucide-react";

const specialties = [
  "General Practice", "Cardiology", "Dermatology", "Endocrinology",
  "Gastroenterology", "Neurology", "Orthopedics", "Pediatrics",
  "Psychiatry", "Pulmonology", "Urology", "Gynecology"
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const appointmentFormSchema = z.object({
  doctorName: z.string().min(2, "Doctor name is required"),
  specialty: z.string().min(1, "Please select a specialty"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  location: z.string().min(1, "Location is required"),
  reason: z.string().min(10, "Please provide a reason for your visit (minimum 10 characters)"),
  notes: z.string().optional()
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  onSubmit?: (data: AppointmentFormData) => Promise<void>;
}

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      date: "",
      time: "",
      location: "",
      reason: "",
      notes: ""
    }
  });

  const handleSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log("Appointment booked:", data);
      setIsBooked(true);
      onSubmit?.(data);
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Appointment Booked!</h3>
          <p className="text-muted-foreground mb-6">
            Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
          </p>
          <Button 
            onClick={() => setIsBooked(false)}
            data-testid="button-book-another"
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Book an Appointment
        </CardTitle>
        <CardDescription>
          Schedule a consultation with a healthcare professional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Doctor and Specialty */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Doctor Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Dr. John Smith"
                        {...field}
                        data-testid="input-doctor-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-specialty">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field}
                        min={new Date().toISOString().split('T')[0]}
                        data-testid="input-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location/Clinic
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Medical Center Name or Address"
                      {...field}
                      data-testid="input-location"
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the clinic name or address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason for Visit */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the reason for your appointment..."
                      className="min-h-[100px]"
                      {...field}
                      data-testid="textarea-reason"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your health concern or the purpose of the visit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information for the doctor..."
                      {...field}
                      data-testid="textarea-notes"
                    />
                  </FormControl>
                  <FormDescription>
                    Include any allergies, medications, or special requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              data-testid="button-book-appointment"
            >
              {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}