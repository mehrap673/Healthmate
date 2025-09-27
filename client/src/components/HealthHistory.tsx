import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  Calendar, 
  Activity, 
  Search, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  TrendingUp 
} from "lucide-react";

// Mock data for demonstration
const mockHealthHistory = [
  {
    id: 1,
    date: "2024-01-15",
    symptoms: ["Headache", "Fatigue", "Dizziness"],
    severity: "moderate",
    suggestion: "Consider hydration and rest. Monitor symptoms for 24 hours.",
    status: "resolved"
  },
  {
    id: 2,
    date: "2024-01-10",
    symptoms: ["Cough", "Fever", "Shortness of Breath"],
    severity: "severe",
    suggestion: "Symptoms suggest respiratory infection. Recommend consulting healthcare provider.",
    status: "ongoing"
  },
  {
    id: 3,
    date: "2024-01-05",
    symptoms: ["Back Pain", "Muscle Aches"],
    severity: "mild",
    suggestion: "Likely muscle strain. Apply heat/cold therapy and gentle stretching.",
    status: "resolved"
  },
  {
    id: 4,
    date: "2024-01-02",
    symptoms: ["Nausea", "Abdominal Pain"],
    severity: "moderate",
    suggestion: "May be related to diet. Consider bland foods and adequate hydration.",
    status: "resolved"
  },
  {
    id: 5,
    date: "2023-12-28",
    symptoms: ["Insomnia", "Anxiety"],
    severity: "mild",
    suggestion: "Practice relaxation techniques and maintain consistent sleep schedule.",
    status: "improving"
  }
];

interface HealthHistoryProps {
  onRerunAnalysis?: (entryId: number) => void;
}

export default function HealthHistory({ onRerunAnalysis }: HealthHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState(mockHealthHistory);

  const filteredHistory = history.filter(entry => 
    entry.symptoms.some(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    ) || entry.suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-primary/10 text-primary border-primary/20';
      case 'moderate': return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'severe': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-primary/10 text-primary';
      case 'ongoing': return 'bg-destructive/10 text-destructive';
      case 'improving': return 'bg-chart-3/10 text-chart-3';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-3 h-3" />;
      case 'ongoing': return <AlertCircle className="w-3 h-3" />;
      case 'improving': return <TrendingUp className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const handleRerunAnalysis = (entryId: number) => {
    console.log(`Rerunning analysis for entry ${entryId}`);
    onRerunAnalysis?.(entryId);
    
    // Simulate reanalysis with a slight delay
    setTimeout(() => {
      setHistory(prev => prev.map(entry => 
        entry.id === entryId 
          ? { ...entry, suggestion: "Updated analysis: " + entry.suggestion }
          : entry
      ));
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Health History</h2>
          <p className="text-muted-foreground">
            Track your health journey and symptom patterns over time.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search symptoms or suggestions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-history"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground" data-testid="text-total-logs">
                  {history.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Logs</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground" data-testid="text-resolved-count">
                  {history.filter(h => h.status === 'resolved').length}
                </p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground" data-testid="text-ongoing-count">
                  {history.filter(h => h.status === 'ongoing').length}
                </p>
                <p className="text-sm text-muted-foreground">Ongoing</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground" data-testid="text-improving-count">
                  {history.filter(h => h.status === 'improving').length}
                </p>
                <p className="text-sm text-muted-foreground">Improving</p>
              </div>
              <TrendingUp className="w-8 h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Timeline */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No matching entries found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Start logging symptoms to see your health history"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((entry) => (
            <Card key={entry.id} className="hover-elevate">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg" data-testid={`text-entry-date-${entry.id}`}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(entry.severity)}>
                      {entry.severity}
                    </Badge>
                    <Badge className={getStatusColor(entry.status)}>
                      {getStatusIcon(entry.status)}
                      <span className="ml-1 capitalize">{entry.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Symptoms */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Symptoms Reported</h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.symptoms.map((symptom, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          data-testid={`badge-symptom-${entry.id}-${index}`}
                        >
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Health Insight</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                      {entry.suggestion}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRerunAnalysis(entry.id)}
                      data-testid={`button-rerun-${entry.id}`}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Re-run Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}