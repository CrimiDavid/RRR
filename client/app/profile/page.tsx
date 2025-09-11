"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SessionData {
  user?: {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: string;
  };
}

export default function ProfilePage() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSessionData(data);

      // If no session, redirect to login
      if (!data.user) {
        router.push("/users/login");
      }
    } catch (err) {
      console.error("Error fetching session:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch session data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/users/login");
      }
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchSessionData} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sessionData?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              You need to be logged in to view this page.
            </p>
            <Button
              onClick={() => router.push("/users/login")}
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                User ID
              </label>
              <p className="text-sm font-monop-2 rounded">
                {sessionData.user.id}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{sessionData.user.email}</p>
            </div>

            {sessionData.user.name && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <p className="text-sm">{sessionData.user.name}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-500">
                Account Created
              </label>
              <p className="text-sm">
                {new Date(sessionData.user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {sessionData.session && (
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Session ID
                </label>
                <p className="text-sm font-mono p-2 rounded">
                  {sessionData.session.id}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Expires At
                </label>
                <p className="text-sm">
                  {new Date(sessionData.session.expiresAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button onClick={fetchSessionData} variant="outline">
            Refresh Session
          </Button>
          <Button onClick={handleSignOut} variant="destructive">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
