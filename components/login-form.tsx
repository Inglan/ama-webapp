"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

function Form({
  step,
  setStep,
  email,
  setEmail,
}: {
  step: "form" | "loading" | "otp";
  setStep: React.Dispatch<React.SetStateAction<"form" | "loading" | "otp">>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signIn } = useAuthActions();

  return (
    <>
      <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Continue with Google
      </Button>
      <div className="m-1 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          Or use an email
        </span>
      </div>
      <form
        className="w-full flex flex-row gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setStep("otp");
          const formData = new FormData(event.currentTarget);
          void signIn("resend-otp", formData).then(() => {
            setStep("otp");
          });
        }}
      >
        <Input
          required
          type="email"
          name="email"
          placeholder="me@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={step === "loading"}>
          Continue
        </Button>
      </form>
    </>
  );
}

function OTP({
  step,
  setStep,
  email,
  code,
  setCode,
}: {
  step: "form" | "loading" | "otp";
  setStep: React.Dispatch<React.SetStateAction<"form" | "loading" | "otp">>;
  email: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signIn } = useAuthActions();

  return (
    <>
      <div>A code has been sent to your email address</div>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={code}
        onChange={(value) => {
          setCode(value);
          if (value.length === 6) {
            const form = document.getElementById("otpform") as HTMLFormElement;
            form?.submit();
          }
        }}
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
      <form
        id="otpform"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          void signIn("resend-otp", formData).then(() => {
            toast.success("logged in");
          });
        }}
      >
        <input type="hidden" name="code" value={code} />
        <input type="hidden" name="email" value={email} />
      </form>
    </>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState<"form" | "loading" | "otp">("form");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-96">
        <CardContent className="flex flex-col gap-3 items-center">
          {step !== "otp" && (
            <Form
              step={step}
              setStep={setStep}
              email={email}
              setEmail={setEmail}
            />
          )}
          {step === "otp" && (
            <OTP
              step={step}
              setStep={setStep}
              code={code}
              setCode={setCode}
              email={email}
            />
          )}
          <Authenticated>your in</Authenticated>
        </CardContent>
      </Card>
    </div>
  );
}
