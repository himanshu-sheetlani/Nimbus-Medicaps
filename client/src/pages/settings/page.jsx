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
    <div className="flex items-center justify-between p-4 border-b border-zinc-400/20 last:border-b-0 hover:bg-purple-950/20 transition-colors">
      <div className="flex items-center gap-3">
        <Icon
          className={`h-5 w-5 ${danger ? "text-red-400" : "text-purple-400"}`}
        />
        <div>
          <h3
            className={`font-inter-medium ${danger ? "text-red-300" : "text-purple-100"}`}
          >
            {title}
          </h3>
          <p className="text-sm text-purple-300 font-inter-regular">{description}</p>
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
        <ToggleRight className="h-6 w-6 text-green-400" />
      ) : (
        <ToggleLeft className="h-6 w-6 text-zinc-500" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen w-full">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
         
            <div>
              <h1 className="text-4xl font-inter-bold text-purple-100">Settings </h1>
              <p className="text-purple-300 font-inter-regular mt-1">
                Manage your account and app preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Settings Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl sticky top-6">
                <div className="p-6 border-b border-zinc-400/20">
                  <h2 className="text-xl font-inter-semibold text-purple-100">Categories</h2>
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
                        className="flex items-center justify-between p-3 hover:bg-purple-950/40 cursor-pointer rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-100 text-sm font-inter-medium">
                            {category.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {category.count > 0 && (
                            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700/50 text-xs">
                              {category.count}
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4 text-purple-500" />
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
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-400" />
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
                        <SelectItem value="friends" className="text-purple-100">
                          Friends
                        </SelectItem>
                        <SelectItem value="private" className="text-purple-100">
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
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-400" />
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
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
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
                      className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50 font-inter-medium"
                    >
                      Change
                    </Button>
                  </SettingItem>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-400" />
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
                      <SelectTrigger className="w-24 bg-purple-950/50 border-purple-800/30 text-purple-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="dark" className="text-purple-100">
                          Dark
                        </SelectItem>
                        <SelectItem value="light" className="text-purple-100">
                          Light
                        </SelectItem>
                        <SelectItem value="auto" className="text-purple-100">
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
                      <SelectTrigger className="w-32 bg-purple-950/50 border-purple-800/30 text-purple-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="english" className="text-purple-100">
                          English
                        </SelectItem>
                        <SelectItem value="spanish" className="text-purple-100">
                          Spanish
                        </SelectItem>
                        <SelectItem value="french" className="text-purple-100">
                          French
                        </SelectItem>
                        <SelectItem value="hindi" className="text-purple-100">
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
                      <SelectTrigger className="w-20 bg-purple-950/50 border-purple-800/30 text-purple-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="inr" className="text-purple-100">
                          INR
                        </SelectItem>
                        <SelectItem value="usd" className="text-purple-100">
                          USD
                        </SelectItem>
                        <SelectItem value="eur" className="text-purple-100">
                          EUR
                        </SelectItem>
                        <SelectItem value="gbp" className="text-purple-100">
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
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-400" />
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
                      className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50 font-inter-medium"
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
                      className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50 font-inter-medium"
                    >
                      Import
                    </Button>
                  </SettingItem>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-400" />
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
                      className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50 font-inter-medium"
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
                      className="bg-red-600 hover:bg-red-700 text-white font-inter-medium"
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