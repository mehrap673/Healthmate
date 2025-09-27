import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Activity, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const commonSymptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Nausea", "Dizziness",
  "Chest Pain", "Shortness of Breath", "Abdominal Pain", "Back Pain",
  "Joint Pain", "Muscle Aches", "Insomnia", "Loss of Appetite"
];

const symptomFormSchema = z.object({
  selectedSymptoms: z.array(z.string()).min(1, "Please select at least one symptom"),
  additionalSymptoms: z.string().optional(),
  severity: z.enum(["mild", "moderate", "severe"]),
  duration: z.string().min(1, "Please specify duration"),
  notes: z.string().optional()
});

type SymptomFormData = z.infer<typeof symptomFormSchema>;

interface SymptomFormProps {
  onSubmit?: (data: SymptomFormData) => Promise<void>;
}

export default function SymptomForm({ onSubmit }: SymptomFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const form = useForm<SymptomFormData>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      selectedSymptoms: [],
      additionalSymptoms: "",
      severity: "mild",
      duration: "",
      notes: ""
    }
  });

  const handleSubmit = async (data: SymptomFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI suggestion based on symptoms
      const mockSuggestion = generateMockSuggestion(data.selectedSymptoms, data.severity);
      setSuggestion(mockSuggestion);
      
      console.log("Symptom log submitted:", data);
      onSubmit?.(data);
    } catch (error) {
      console.error("Error submitting symptoms:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateMockSuggestion = (symptoms: string[], severity: string) => {
    if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
      return "Based on your symptoms, you may have a respiratory infection. Consider rest, hydration, and monitor your temperature. Consult a healthcare provider if symptoms worsen.";
    }
    if (symptoms.includes("Headache") && severity === "severe") {
      return "Severe headaches require attention. Ensure adequate hydration, rest in a dark room, and consider over-the-counter pain relief. If persistent, please consult a healthcare provider.";
    }
    return "Monitor your symptoms and maintain good self-care. If symptoms persist or worsen, please consult with a healthcare professional for proper evaluation.";
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Log Your Symptoms
        </CardTitle>
        <CardDescription>
          Provide details about your current symptoms to receive personalized health insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Common Symptoms */}
            <FormField
              control={form.control}
              name="selectedSymptoms"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Common Symptoms</FormLabel>
                  <FormDescription>
                    Select all symptoms you're currently experiencing
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {commonSymptoms.map((symptom) => (
                      <FormField
                        key={symptom}
                        control={form.control}
                        name="selectedSymptoms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(symptom)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), symptom]
                                    : (field.value || []).filter((value) => value !== symptom);
                                  field.onChange(updatedValue);
                                }}
                                data-testid={`checkbox-symptom-${symptom.toLowerCase().replace(/\s+/g, '-')}`}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {symptom}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Additional Symptoms */}
            <FormField
              control={form.control}
              name="additionalSymptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Symptoms</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Describe any other symptoms..."
                      {...field}
                      data-testid="input-additional-symptoms"
                    />
                  </FormControl>
                  <FormDescription>
                    Include any symptoms not listed above
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Severity and Duration */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="w-full p-2 border border-input rounded-md bg-background"
                        data-testid="select-severity"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 2 days, 1 week"
                        {...field}
                        data-testid="input-duration"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional context about your symptoms..."
                      className="min-h-[100px]"
                      {...field}
                      data-testid="textarea-notes"
                    />
                  </FormControl>
                  <FormDescription>
                    Include any relevant details about when symptoms started, triggers, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              data-testid="button-submit-symptoms"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  Get Health Insights
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* AI Suggestion Display */}
        {suggestion && (
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">AI Health Insight</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <AlertTriangle className="w-3 h-3" />
                    This is not medical advice. Consult a healthcare provider for diagnosis.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}