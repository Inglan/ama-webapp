import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 sm:p-10">
      <div className="flex w-full sm:max-w-sm flex-col gap-6">
        <span className="flex items-center gap-2 self-center font-medium">
          Aranda Music and Arts Program
        </span>
        <LoginForm className="w-full sm:w-96 [&>div]:bg-transparent [&>div]:border-0 md:[&>div]:border md:[&>div]:bg-card" />
      </div>
    </div>
  );
}
