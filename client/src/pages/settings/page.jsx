import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  Eye,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Database,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Palette,
  Languages,
  MapPin,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Camera,
  FileText,
  Calendar,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const Setting = () => {
  const { user, logout } = useAuthStore();

  // Settings state
  const [settings, setSettings] = useState({
    // Account settings
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    travelAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,

    // Privacy settings
    dataCollection: true,
    locationTracking: false,
    analyticsOptIn: true,

    // App preferences
    theme: "dark",
    language: "english",
    currency: "inr",
    units: "metric",

    // Communication
    soundEffects: true,
    autoSync: true,
    offlineMode: false,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    toast.success("Setting updated successfully");
  };

  const handleSelectChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
    toast.success("Setting updated successfully");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion feature coming soon");
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email shortly.");
  };

  const SettingItem = ({
    icon: Icon,
    title,
    description,
    children,
    danger = false,
  }) => (
    <div className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-3">
        <Icon
          className={`h-5 w-5 ${danger ? "text-destructive" : "text-accent"}`}
        />
        <div>
          <h3
            className={`font-inter-medium ${
              danger ? "text-destructive" : "text-foreground"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-inter-regular">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="p-0 h-auto hover:bg-transparent"
    >
      {enabled ? (
        <ToggleRight className="h-6 w-6 text-success" />
      ) : (
        <ToggleLeft className="h-6 w-6 text-muted" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen w-full bg-background">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div>
              <h1 className="text-4xl font-inter-bold text-foreground">
                Settings{" "}
              </h1>
              <p className="text-muted-foreground font-inter-regular mt-1">
                Manage your account and app preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Settings Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl sticky top-6">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-inter-semibold text-foreground">
                    Categories
                  </h2>
                </div>
                <div className="p-0">
                  <div className="space-y-1 p-4">
                    {[
                      { icon: User, label: "Account", count: 3 },
                      { icon: Bell, label: "Notifications", count: 5 },
                      { icon: Shield, label: "Privacy", count: 3 },
                      { icon: Palette, label: "Appearance", count: 4 },
                      { icon: Globe, label: "Language & Region", count: 2 },
                      { icon: Database, label: "Data Management", count: 2 },
                      { icon: HelpCircle, label: "Help & Support", count: 0 },
                    ].map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="h-4 w-4 text-primary" />
                          <span className="text-foreground text-sm font-inter-medium">
                            {category.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {category.count > 0 && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                              {category.count}
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Settings */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Account Settings
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={Eye}
                    title="Profile Visibility"
                    description="Control who can see your profile"
                  >
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) =>
                        handleSelectChange("profileVisibility", value)
                      }
                    >
                      <SelectTrigger className="w-32 bg-purple-950/50 border-purple-800/30 text-purple-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="public" className="text-purple-100">
                          Public
                        </SelectItem>
                        <SelectItem value="friends" className="text-foreground">
                          Friends
                        </SelectItem>
                        <SelectItem value="private" className="text-foreground">
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>

                  <SettingItem
                    icon={Mail}
                    title="Show Email"
                    description="Display email on your public profile"
                  >
                    <ToggleSwitch
                      enabled={settings.showEmail}
                      onToggle={() => handleToggle("showEmail")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={MapPin}
                    title="Show Location"
                    description="Display your hometown on profile"
                  >
                    <ToggleSwitch
                      enabled={settings.showLocation}
                      onToggle={() => handleToggle("showLocation")}
                    />
                  </SettingItem>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={Mail}
                    title="Email Notifications"
                    description="Receive notifications via email"
                  >
                    <ToggleSwitch
                      enabled={settings.emailNotifications}
                      onToggle={() => handleToggle("emailNotifications")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Smartphone}
                    title="Push Notifications"
                    description="Receive push notifications on your device"
                  >
                    <ToggleSwitch
                      enabled={settings.pushNotifications}
                      onToggle={() => handleToggle("pushNotifications")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Plane}
                    title="Travel Alerts"
                    description="Get notified about travel updates"
                  >
                    <ToggleSwitch
                      enabled={settings.travelAlerts}
                      onToggle={() => handleToggle("travelAlerts")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={FileText}
                    title="Weekly Digest"
                    description="Receive weekly summary emails"
                  >
                    <ToggleSwitch
                      enabled={settings.weeklyDigest}
                      onToggle={() => handleToggle("weeklyDigest")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Volume2}
                    title="Sound Effects"
                    description="Play sounds for app interactions"
                  >
                    <ToggleSwitch
                      enabled={settings.soundEffects}
                      onToggle={() => handleToggle("soundEffects")}
                    />
                  </SettingItem>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={Database}
                    title="Data Collection"
                    description="Allow data collection for better experience"
                  >
                    <ToggleSwitch
                      enabled={settings.dataCollection}
                      onToggle={() => handleToggle("dataCollection")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={MapPin}
                    title="Location Tracking"
                    description="Track location for personalized recommendations"
                  >
                    <ToggleSwitch
                      enabled={settings.locationTracking}
                      onToggle={() => handleToggle("locationTracking")}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Lock}
                    title="Change Password"
                    description="Update your account password"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted font-inter-medium"
                    >
                      Change
                    </Button>
                  </SettingItem>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Appearance
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={settings.theme === "dark" ? Moon : Sun}
                    title="Theme"
                    description="Choose your preferred theme"
                  >
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        handleSelectChange("theme", value)
                      }
                    >
                      <SelectTrigger className="w-24 bg-muted border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="dark" className="text-foreground">
                          Dark
                        </SelectItem>
                        <SelectItem value="light" className="text-foreground">
                          Light
                        </SelectItem>
                        <SelectItem value="auto" className="text-foreground">
                          Auto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>

                  <SettingItem
                    icon={Languages}
                    title="Language"
                    description="Select your preferred language"
                  >
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        handleSelectChange("language", value)
                      }
                    >
                      <SelectTrigger className="w-32 bg-muted border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="english" className="text-foreground">
                          English
                        </SelectItem>
                        <SelectItem value="spanish" className="text-foreground">
                          Spanish
                        </SelectItem>
                        <SelectItem value="french" className="text-foreground">
                          French
                        </SelectItem>
                        <SelectItem value="hindi" className="text-foreground">
                          Hindi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>

                  <SettingItem
                    icon={CreditCard}
                    title="Currency"
                    description="Default currency for pricing"
                  >
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        handleSelectChange("currency", value)
                      }
                    >
                      <SelectTrigger className="w-20 bg-muted border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="inr" className="text-foreground">
                          INR
                        </SelectItem>
                        <SelectItem value="usd" className="text-foreground">
                          USD
                        </SelectItem>
                        <SelectItem value="eur" className="text-foreground">
                          EUR
                        </SelectItem>
                        <SelectItem value="gbp" className="text-foreground">
                          GBP
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>

                  <SettingItem
                    icon={Wifi}
                    title="Auto Sync"
                    description="Automatically sync data across devices"
                  >
                    <ToggleSwitch
                      enabled={settings.autoSync}
                      onToggle={() => handleToggle("autoSync")}
                    />
                  </SettingItem>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data Management
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={Download}
                    title="Export Data"
                    description="Download a copy of your data"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      className="border-border text-foreground hover:bg-muted font-inter-medium"
                    >
                      Export
                    </Button>
                  </SettingItem>

                  <SettingItem
                    icon={Upload}
                    title="Import Data"
                    description="Import data from another account"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted font-inter-medium"
                    >
                      Import
                    </Button>
                  </SettingItem>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Account Actions
                  </h3>
                </div>
                <div className="p-0">
                  <SettingItem
                    icon={LogOut}
                    title="Logout"
                    description="Sign out of your account"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="border-border text-foreground hover:bg-muted font-inter-medium"
                    >
                      Logout
                    </Button>
                  </SettingItem>

                  <SettingItem
                    icon={Trash2}
                    title="Delete Account"
                    description="Permanently delete your account"
                    danger={true}
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/80 text-destructive-foreground font-inter-medium"
                    >
                      Delete
                    </Button>
                  </SettingItem>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Setting;
