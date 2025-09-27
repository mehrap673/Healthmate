import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Droplets, 
  Activity, 
  Bell, 
  Shield, 
  Moon,
  Save,
  Camera
} from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Age is required"),
  bloodGroup: z.string().min(1, "Please select your blood group"),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  allergies: z.string().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Mock user data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: "32",
  bloodGroup: "O+",
  phone: "+1 (555) 123-4567",
  emergencyContact: "+1 (555) 987-6543",
  allergies: "Peanuts, Shellfish",
  avatar: "",
  // Preferences
  emailNotifications: true,
  pushNotifications: false,
  darkMode: false,
  dataSharing: true
};

// Mock statistics
const mockStats = {
  totalSymptomLogs: 47,
  totalAppointments: 12,
  resolvedIssues: 38,
  joinDate: "2023-06-15"
};

interface UserProfileProps {
  onSaveProfile?: (data: ProfileFormData) => Promise<void>;
  onUploadAvatar?: (file: File) => void;
}

export default function UserProfile({ onSaveProfile, onUploadAvatar }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: mockUserData.emailNotifications,
    pushNotifications: mockUserData.pushNotifications,
    darkMode: mockUserData.darkMode,
    dataSharing: mockUserData.dataSharing
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUserData
  });

  const handleSaveProfile = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Profile updated:", data);
      setIsEditing(false);
      onSaveProfile?.(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Avatar uploaded:", file.name);
      onUploadAvatar?.(file);
    }
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    console.log(`${key} updated to:`, value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
                <AvatarFallback className="text-2xl">
                  {mockUserData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full cursor-pointer hover-elevate">
                <Camera className="w-4 h-4 text-primary-foreground" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  data-testid="input-avatar-upload"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2" data-testid="text-user-name">
                {mockUserData.name}
              </CardTitle>
              <CardDescription className="text-base mb-4">
                Member since {new Date(mockStats.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </CardDescription>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary" data-testid="text-symptom-logs">
                    {mockStats.totalSymptomLogs}
                  </p>
                  <p className="text-xs text-muted-foreground">Symptom Logs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-2" data-testid="text-appointments">
                    {mockStats.totalAppointments}
                  </p>
                  <p className="text-xs text-muted-foreground">Appointments</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-3" data-testid="text-resolved-issues">
                    {mockStats.resolvedIssues}
                  </p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-success-rate">
                    {Math.round((mockStats.resolvedIssues / mockStats.totalSymptomLogs) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              data-testid="button-edit-profile"
            >
              <User className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details and medical information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-profile-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-profile-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-profile-age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        Blood Group
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                        <FormControl>
                          <SelectTrigger data-testid="select-blood-group">
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-profile-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+1 (555) 987-6543"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-emergency-contact"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Known Allergies</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="List any known allergies..."
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-allergies"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  data-testid="button-save-profile"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Preferences & Settings
          </CardTitle>
          <CardDescription>
            Customize your SymptoCare experience and privacy settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notifications */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive appointment reminders and health tips via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => updatePreference('emailNotifications', checked)}
                  data-testid="switch-email-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Get real-time health alerts and reminders
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => updatePreference('pushNotifications', checked)}
                  data-testid="switch-push-notifications"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Privacy & Data</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Use dark theme for reduced eye strain
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => updatePreference('darkMode', checked)}
                  data-testid="switch-dark-mode"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Anonymous Data Sharing</p>
                    <p className="text-xs text-muted-foreground">
                      Help improve SymptoCare by sharing anonymized health insights
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.dataSharing}
                  onCheckedChange={(checked) => updatePreference('dataSharing', checked)}
                  data-testid="switch-data-sharing"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}