"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-base";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.message || "Unable to verify email.");
        }
        setStatus("success");
        setMessage("Your email has been verified. You can now log in.");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Unable to verify email.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center space-y-4">
        {status === "loading" ? <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-600" /> : null}
        <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
        <p className="text-sm text-gray-600">{message}</p>
        <Link href="/login" className="text-sm font-semibold text-blue-600 hover:underline">
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-600" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
