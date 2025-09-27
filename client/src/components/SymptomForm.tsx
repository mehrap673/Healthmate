import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Activity, AlertTriangle, CheckCircle, Loader2, X } from "lucide-react";

const commonSymptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Nausea", "Dizziness",
  "Chest Pain", "Shortness of Breath", "Abdominal Pain", "Back Pain",
  "Joint Pain", "Muscle Aches", "Insomnia", "Loss of Appetite"
];

interface SymptomFormData {
  selectedSymptoms: string[];
  additionalSymptoms: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  notes: string;
}

interface SymptomFormProps {
  onSubmit?: (data: SymptomFormData) => Promise<void>;
}

// AI Service for generating health suggestions
class HealthAIService {
    private apiKey: string;
    private apiEndpoint: string;

    constructor() {
        // 🛑 ACTION REQUIRED: REPLACE THIS LINE WITH YOUR REAL GEMINI API KEY!
        this.apiKey = 'AIzaSyD3SkiAAdDjUxRctTKfK4lOwNlxoTGVHig'; 

        if (this.apiKey.includes('AIzaSyD3SkiAAdDjUxRctTKfK4lOwNlxoTGVHig')) {
            console.error("CRITICAL: API Key is the public placeholder. Replace 'AIzaSyD3SkiAAdDjUxRctTKfK4lOwNlxoTGVHig' with your actual private key for live functionality.");
        }

        // Model is corrected to gemini-2.5-flash
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    }

    async generateHealthSuggestion(formData: SymptomFormData): Promise<string> {
        const prompt = this.buildPrompt(formData);
        
        const maxRetries = 3;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 300,
                        },
                    }),
                });

                if (!response.ok) {
                    const errorBody = await response.json().catch(() => ({}));
                    const errorMessage = errorBody.error?.message || `AI API error: ${response.status} ${response.statusText}.`;
                
                    // Check for recoverable errors (500, 503, 429 Rate Limit)
                    if (response.status === 503 || response.status === 500 || response.status === 429) {
                        if (attempt < maxRetries) {
                            const delay = 1000 * Math.pow(2, attempt - 1);
                            console.warn(`API unavailable (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue; // Retry
                        }
                    }
                    // Throw the error if it's not recoverable or we reached max retries
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                
                // Check for an API error structure within a 200 OK response (often due to bad API key)
                if (data.error) {
                    throw new Error(`Gemini API Error: ${data.error.message}`);
                }

                if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                    // Success! Return the text and break the loop
                    return data.candidates[0].content.parts[0].text.trim();
                } else if (data.candidates && data.candidates[0]?.finishReason === 'SAFETY') {
                    throw new Error('AI content was blocked due to safety settings. Please rephrase your symptoms.');
                }
                else {
                    // This is the error that triggers when the API key is invalid/unauthorized
                    throw new Error('Invalid response format or unhandled API error. No output generated.');
                }

            } catch (error) {
                // Catch network errors and retry them
                if (attempt < maxRetries) {
                    const delay = 1000 * Math.pow(2, attempt - 1);
                    console.warn(`Network/other error (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue; // Retry
                }
                // Throw the final error if all retries failed
                throw new Error(`AI API error: ${error instanceof Error ? error.message : "Unknown API service error"}`);
            }
        }
        throw new Error('AI API failed after all retries. The service is likely unavailable.'); 
    }

    private buildPrompt(formData: SymptomFormData): string {
        const { selectedSymptoms, additionalSymptoms, severity, duration, notes } = formData;
        
        return `As a health information assistant, provide general wellness suggestions based on the following symptoms. Always include a disclaimer that this is not medical advice.

Symptoms reported: ${selectedSymptoms.join(', ')}
${additionalSymptoms ? `Additional symptoms: ${additionalSymptoms}` : ''}
Severity: ${severity}
Duration: ${duration}
${notes ? `Additional notes: ${notes}` : ''}

Please provide:
1. General self-care suggestions
2. When to seek medical attention
3. Important disclaimer about not being medical advice

Keep response under 250 words and be supportive but cautious.`;
    }

    public getFallbackSuggestion(formData: SymptomFormData): string {
        const { selectedSymptoms, severity } = formData;
        
        if (selectedSymptoms.includes("Fever") && selectedSymptoms.includes("Cough")) {
            return "Based on your symptoms, consider rest, adequate hydration, and monitoring your temperature. These symptoms may indicate a respiratory condition. Please consult a healthcare provider for proper evaluation and treatment, especially if symptoms persist or worsen.\n\nThis is not medical advice. Always consult healthcare professionals for proper diagnosis and treatment.";
        }
        if (selectedSymptoms.includes("Headache") && severity === "severe") {
            return "Severe headaches require attention. Try resting in a quiet, dark room and ensure you're well-hydrated. Consider consulting a healthcare provider, especially if headaches are frequent, severe, or accompanied by other concerning symptoms.\n\nThis is not medical advice. Always consult healthcare professionals for proper diagnosis and treatment.";
        }
        return "Monitor your symptoms and maintain good self-care practices including adequate rest, hydration, and nutrition. If symptoms persist, worsen, or cause concern, please consult with a healthcare professional for proper evaluation and personalized advice.\n\nThis is not medical advice. Always consult healthcare professionals for proper diagnosis and treatment.";
    }
}

export default function SymptomForm({ onSubmit }: SymptomFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<SymptomFormData>({
        selectedSymptoms: [],
        additionalSymptoms: "",
        severity: "mild",
        duration: "",
        notes: ""
    });
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
    
    // Initialize healthAI here (note: for larger apps, consider lazy initialization with useEffect/useState)
    const healthAI = new HealthAIService();

    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};
        
        if (formData.selectedSymptoms.length === 0) {
            errors.selectedSymptoms = "Please select at least one symptom";
        }
        
        if (!formData.duration.trim()) {
            errors.duration = "Please specify duration";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSymptomChange = (symptom: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            selectedSymptoms: checked 
                ? [...prev.selectedSymptoms, symptom]
                : prev.selectedSymptoms.filter(s => s !== symptom)
        }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuggestion(null);
        
        try {
            // Generate AI suggestion
            const aiSuggestion = await healthAI.generateHealthSuggestion(formData);
            setSuggestion(aiSuggestion);
            
            console.log("Symptom log submitted:", formData);
            await onSubmit?.(formData);
        } catch (err) {
            // Catch the error thrown by HealthAIService
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred with the AI service.";
            console.error("Error submitting symptoms:", err);

            // Set the detailed error message for display
            setError(errorMessage);
            
            // Always provide a basic fallback suggestion in the suggestion box when the AI fails
            let fallbackText = healthAI.getFallbackSuggestion(formData);
            setSuggestion(fallbackText);

        } finally {
            setIsSubmitting(false);
        }
    };

    const clearSuggestion = () => {
        setSuggestion(null);
        setError(null);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Log Your Symptoms
                    </CardTitle>
                    <CardDescription>
                        Provide details about your current symptoms to receive AI-powered health insights.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Common Symptoms */}
                    <div>
                        <label className="text-base font-medium">Common Symptoms</label>
                        <p className="text-sm text-muted-foreground mb-3">
                            Select all symptoms you're currently experiencing
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {commonSymptoms.map((symptom) => (
                                <div key={symptom} className="flex items-start space-x-3">
                                    <Checkbox
                                        checked={formData.selectedSymptoms.includes(symptom)}
                                        onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                                        data-testid={`checkbox-symptom-${symptom.toLowerCase().replace(/\s+/g, '-')}`}
                                    />
                                    <label className="text-sm font-normal cursor-pointer">
                                        {symptom}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {validationErrors.selectedSymptoms && (
                            <p className="text-sm text-destructive mt-2">{validationErrors.selectedSymptoms}</p>
                        )}
                    </div>

                    <Separator />

                    {/* Additional Symptoms */}
                    <div>
                        <label className="text-sm font-medium">Additional Symptoms</label>
                        <Input 
                            placeholder="Describe any other symptoms..."
                            value={formData.additionalSymptoms}
                            onChange={(e) => setFormData(prev => ({...prev, additionalSymptoms: e.target.value}))}
                            data-testid="input-additional-symptoms"
                            className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Include any symptoms not listed above
                        </p>
                    </div>

                    {/* Severity and Duration */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Severity Level</label>
                            <select 
                                value={formData.severity}
                                onChange={(e) => setFormData(prev => ({...prev, severity: e.target.value as 'mild' | 'moderate' | 'severe'}))}
                                className="w-full p-2 border border-input rounded-md bg-background mt-2"
                                data-testid="select-severity"
                            >
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Duration</label>
                            <Input 
                                placeholder="e.g., 2 days, 1 week"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
                                data-testid="input-duration"
                                className="mt-2"
                            />
                            {validationErrors.duration && (
                                <p className="text-sm text-destructive mt-1">{validationErrors.duration}</p>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="text-sm font-medium">Additional Notes</label>
                        <Textarea 
                            placeholder="Any additional context about your symptoms..."
                            className="min-h-[100px] mt-2"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                            data-testid="textarea-notes"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Include any relevant details about when symptoms started, triggers, etc.
                        </p>
                    </div>

                    <Button 
                        onClick={handleSubmit}
                        className="w-full" 
                        disabled={isSubmitting}
                        data-testid="button-submit-symptoms"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Getting AI Health Insights...
                            </>
                        ) : (
                            <>
                                <Activity className="w-4 h-4 mr-2" />
                                Get AI Health Insights
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
                <Card className="border-destructive/20 bg-destructive/5">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-destructive/10 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-foreground mb-2">AI Service Error</h4>
                                <p className="text-sm text-muted-foreground">
                                    {error}
                                </p>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearSuggestion}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI Suggestion Display (Now also displays fallback on error) */}
            {suggestion && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-foreground mb-2">{error ? 'Fallback Health Tip' : 'AI Health Insight'}</h4>
                                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {suggestion}
                                </div>
                                <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    <p className="text-xs text-amber-800">
                                        <strong>Important:</strong> This {error ? 'fallback' : 'AI-generated'} information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.
                                    </p>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearSuggestion}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}