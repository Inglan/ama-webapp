import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music, ArrowLeft, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Aranda Music and Arts Program account to access your dashboard and manage your classes.",
};

export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center p-8 lg:p-12 h-screen">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sign In</h2>
        </div>

        <LoginForm />

        {/* Help section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help accessing your account?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
