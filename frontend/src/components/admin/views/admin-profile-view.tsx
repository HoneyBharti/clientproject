import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/lib/api-base";
import { useAuth } from "@/contexts/AuthContext";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function AdminProfileView() {
  const { user, checkAuth } = useAuth();
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    setProfileForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleProfileSave = async () => {
    setProfileMessage("");
    setProfileError("");

    const payload = {
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim(),
    };

    if (!payload.name && !payload.email && !payload.phone) {
      setProfileError("Please provide at least one field to update.");
      return;
    }

    setIsSavingProfile(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to update profile.");
      }

      await checkAuth();

      if (data?.verificationRequired) {
        setProfileMessage("Profile updated. Please verify your new email address.");
      } else {
        setProfileMessage("Profile updated successfully.");
      }
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Unable to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSave = async () => {
    setPasswordMessage("");
    setPasswordError("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setIsSavingPassword(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to update password.");
      }

      setPasswordMessage("Password updated successfully.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Unable to update password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your admin name, email, and phone number.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-name">Name</Label>
            <Input
              id="admin-name"
              value={profileForm.name}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Admin name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={profileForm.email}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="admin@yourlegal.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-phone">Phone</Label>
            <Input
              id="admin-phone"
              value={profileForm.phone}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="+1 555 123 4567"
            />
          </div>

          {profileError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {profileError}
            </div>
          ) : null}
          {profileMessage ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {profileMessage}
            </div>
          ) : null}

          <Button onClick={handleProfileSave} disabled={isSavingProfile} className="w-full sm:w-auto">
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your admin password securely.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              placeholder="Confirm new password"
            />
          </div>

          {passwordError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {passwordError}
            </div>
          ) : null}
          {passwordMessage ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {passwordMessage}
            </div>
          ) : null}

          <Button onClick={handlePasswordSave} disabled={isSavingPassword} className="w-full sm:w-auto">
            {isSavingPassword ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
