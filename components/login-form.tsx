"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState, useCallback } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

// Types for better type safety
type AuthStep = "form" | "loading" | "otp";

interface FormProps {
  step: AuthStep;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

interface OTPProps {
  email: string;
  code: string;
  onCodeChange: (code: string) => void;
  onVerify: (code: string, email: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * Email and Google sign-in form component
 * Handles the initial authentication step where users can either:
 * 1. Sign in with Google OAuth
 * 2. Enter their email to receive an OTP
 */
function EmailForm({
  step,
  email,
  onEmailChange,
  onSubmit,
  isLoading,
}: FormProps) {
  const { signIn } = useAuthActions();

  /**
   * Handle Google OAuth sign-in
   * Sets loading state and initiates Google authentication flow
   */
  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  }, [signIn]);

  /**
   * Handle email form submission
   * Validates email and initiates OTP flow
   */
  const handleEmailSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      try {
        await onSubmit(email);
      } catch (error) {
        console.error("Email submission failed:", error);
        toast.error("Failed to send verification code. Please try again.");
      }
    },
    [email, onSubmit],
  );

  return (
    <>
      {/* Google OAuth Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 mr-2"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Divider */}
      <span className="px-2 text-muted-foreground text-sm">
        Or continue with email
      </span>

      {/* Email Input Form */}
      <form className="w-full flex flex-row gap-3" onSubmit={handleEmailSubmit}>
        <Input
          required
          type="email"
          name="email"
          placeholder="me@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !email}>
          {isLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </>
  );
}

/**
 * OTP (One-Time Password) verification component
 * Handles the 6-digit code verification step after email submission
 */
function OTPVerification({
  email,
  code,
  onCodeChange,
  onVerify,
  isLoading,
}: OTPProps) {
  /**
   * Handle OTP code changes
   * Automatically submits when 6 digits are entered
   */
  const handleCodeChange = useCallback(
    async (value: string) => {
      onCodeChange(value);

      // Auto-submit when 6 digits are entered
      if (value.length === 6) {
        try {
          await onVerify(value, email);
        } catch (error) {
          console.error("OTP verification failed:", error);
          toast.error("Invalid verification code. Please try again.");
          // Reset the code on error
          onCodeChange("");
        }
      }
    },
    [email, onCodeChange, onVerify],
  );

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to
        </p>
        <p className="font-medium">{email}</p>
      </div>

      {/* OTP Input */}
      <form className="flex flex-col gap-4 items-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={handleCodeChange}
          disabled={isLoading}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="w-4 h-4 animate-spin" />
            Verifying code...
          </div>
        )}
      </form>

      <p className="text-xs text-muted-foreground text-center">
        Enter the 6-digit code from your email
      </p>
    </div>
  );
}

/**
 * Loading state component
 * Shows a centered loading spinner during authentication processes
 */
function LoadingState() {
  return (
    <div className="flex flex-col gap-3 items-center py-8">
      <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Signing you in...</p>
    </div>
  );
}

/**
 * Main LoginForm component
 * Manages the overall authentication flow including:
 * 1. Email/Google sign-in form
 * 2. Loading states
 * 3. OTP verification
 *
 * @param className - Optional CSS classes to apply to the container
 * @param props - Additional props to pass to the container div
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // State management
  const [step, setStep] = useState<AuthStep>("form");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthActions();

  /**
   * Handle email submission and OTP request
   * Transitions from form to OTP step
   */
  const handleEmailSubmit = useCallback(
    async (email: string) => {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("email", email);

        await signIn("resend-otp", formData);
        setStep("otp");
        toast.success("Verification code sent to your email");
      } catch (error) {
        console.error("Failed to send OTP:", error);
        toast.error("Failed to send verification code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [signIn],
  );

  /**
   * Handle OTP verification
   * Completes the authentication process
   */
  const handleOTPVerify = useCallback(
    async (code: string, email: string) => {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("code", code);
        formData.append("email", email);

        await signIn("resend-otp", formData);
        toast.success("Successfully signed in!");
      } catch (error) {
        console.error("OTP verification failed:", error);
        throw error; // Re-throw to be handled by the OTP component
      } finally {
        setIsLoading(false);
      }
    },
    [signIn],
  );

  /**
   * Handle email input changes
   */
  const handleEmailChange = useCallback((newEmail: string) => {
    setEmail(newEmail);
  }, []);

  /**
   * Handle OTP code changes
   */
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-6 items-center p-6">
          {step === "form" && (
            <EmailForm
              step={step}
              email={email}
              onEmailChange={handleEmailChange}
              onSubmit={handleEmailSubmit}
              isLoading={isLoading}
            />
          )}

          {step === "loading" && <LoadingState />}

          {step === "otp" && (
            <OTPVerification
              email={email}
              code={code}
              onCodeChange={handleCodeChange}
              onVerify={handleOTPVerify}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
