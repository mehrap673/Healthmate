import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Calendar, 
  Heart, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Plus,
  ArrowRight,
  Phone
} from "lucide-react";

// Mock data - in real app this would come from API
const mockDashboardData = {
  totalSymptomLogs: 47,
  upcomingAppointments: 2,
  recentSuggestions: 12,
  healthScore: 78,
  recentSymptoms: [
    { symptom: "Headache", date: "2024-01-15", severity: "mild" },
    { symptom: "Fatigue", date: "2024-01-12", severity: "moderate" },
    { symptom: "Cough", date: "2024-01-10", severity: "severe" }
  ],
  upcomingEvents: [
    {
      id: 1,
      type: "appointment",
      title: "Dr. Smith - General Checkup",
      date: "2024-01-20",
      time: "10:00 AM"
    },
    {
      id: 2,
      type: "medication",
      title: "Blood Pressure Medication",
      date: "2024-01-18",
      time: "8:00 AM"
    }
  ],
  healthTrends: [
    { metric: "Blood Pressure", status: "normal", trend: "stable" },
    { metric: "Sleep Quality", status: "good", trend: "improving" },
    { metric: "Stress Level", status: "elevated", trend: "increasing" }
  ]
};

interface DashboardProps {
  onNavigateToSymptoms?: () => void;
  onNavigateToAppointments?: () => void;
  onNavigateToEmergency?: () => void;
  onNavigateToHistory?: () => void;
}

export default function Dashboard({ 
  onNavigateToSymptoms, 
  onNavigateToAppointments, 
  onNavigateToEmergency,
  onNavigateToHistory 
}: DashboardProps) {
  const [userName] = useState("John"); // Would come from auth context

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'good': return 'text-primary';
      case 'elevated': case 'high': return 'text-destructive';
      case 'moderate': return 'text-chart-3';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'increasing': return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
      case 'stable': return <div className="w-4 h-4 bg-muted-foreground rounded-full" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-primary/10 text-primary border-primary/20';
      case 'moderate': return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'severe': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your health overview for today
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onNavigateToSymptoms}
            data-testid="button-log-symptoms"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Symptoms
          </Button>
          <Button 
            variant="outline"
            onClick={onNavigateToEmergency}
            data-testid="button-emergency"
          >
            <Phone className="w-4 h-4 mr-2" />
            Emergency
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-elevate cursor-pointer" onClick={onNavigateToHistory}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Symptom Logs</p>
                <p className="text-3xl font-bold text-foreground" data-testid="text-dashboard-symptom-logs">
                  {mockDashboardData.totalSymptomLogs}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  +3 this week
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate cursor-pointer" onClick={onNavigateToAppointments}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                <p className="text-3xl font-bold text-foreground" data-testid="text-dashboard-appointments">
                  {mockDashboardData.upcomingAppointments}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Next: Jan 20
                </p>
              </div>
              <div className="p-3 bg-chart-2/10 rounded-full">
                <Calendar className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Insights</p>
                <p className="text-3xl font-bold text-foreground" data-testid="text-dashboard-suggestions">
                  {mockDashboardData.recentSuggestions}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This month
                </p>
              </div>
              <div className="p-3 bg-chart-3/10 rounded-full">
                <Heart className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-3xl font-bold text-foreground" data-testid="text-dashboard-health-score">
                  {mockDashboardData.healthScore}%
                </p>
                <p className="text-xs text-primary mt-1">
                  ↑ +5% from last month
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Symptoms */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Symptoms
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onNavigateToHistory}
                  data-testid="button-view-all-symptoms"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDashboardData.recentSymptoms.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover-elevate"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div>
                        <p className="font-medium text-sm" data-testid={`text-recent-symptom-${index}`}>
                          {item.symptom}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Health Trends
              </CardTitle>
              <CardDescription>
                Key health metrics and their recent trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardData.healthTrends.map((trend, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(trend.trend)}
                        <span className="font-medium text-sm" data-testid={`text-trend-metric-${index}`}>
                          {trend.metric}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getStatusColor(trend.status)}`}>
                        {trend.status}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {trend.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardData.upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="p-3 border rounded-lg hover-elevate"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {event.type === 'appointment' ? (
                          <Calendar className="w-4 h-4 text-primary" />
                        ) : (
                          <Activity className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm" data-testid={`text-upcoming-${event.id}`}>
                          {event.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onNavigateToSymptoms}
                data-testid="button-quick-log-symptoms"
              >
                <Plus className="w-4 h-4 mr-2" />
                Log New Symptoms
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onNavigateToAppointments}
                data-testid="button-quick-book-appointment"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={onNavigateToEmergency}
                data-testid="button-quick-emergency"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Contacts
              </Button>
            </CardContent>
          </Card>

          {/* Health Tip of the Day */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">💡 Health Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stay hydrated! Aim for 8 glasses of water daily to support your immune system and maintain energy levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}