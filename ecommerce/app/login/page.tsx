"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: call your auth provider here (Auth.js, Clerk, Supabase, ...).
    setTimeout(() => setStatus("done"), 1200);


  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="nebula relative m-4 hidden flex-col justify-between overflow-hidden rounded-3xl p-10 lg:flex">
        <div className="orbit absolute -right-24 -top-24 size-[28rem] rounded-full border border-dashed border-white/20">
          <span className="absolute left-1/2 top-0 size-3 rounded-full bg-white shadow-[0_0_16px_#fff]" />
        </div>
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full border border-white/15" />
        <p className="relative flex items-center gap-2 text-xl font-bold"><Orbit className="size-5" /> Circuit</p>
        <div className="relative">
          <p className="text-3xl font-semibold leading-tight">Welcome back. Your next device is waiting.</p>
          <p className="mt-3 max-w-sm opacity-70">Track orders, manage returns and pick up right where you left off.</p>
        </div>
      </aside>

      {/* Form */}
      <main className="flex flex-col px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to store
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-12">
          {status === "done" ? (
            <div className="max-w-sm text-center">
              <CheckCircle2 className="mx-auto size-14 text-primary" strokeWidth={1.5} />
              <h1 className="mt-6 text-3xl font-semibold tracking-tight">You are signed in</h1>
              <p className="mt-3 text-muted-foreground">Welcome back to Circuit.</p>
              <Button size="lg" className="mt-8"><Link href="/">Continue shopping</Link></Button>
            </div>
          ) : (
            <form onSubmit={submit} className="w-full max-w-sm space-y-6">
              <div>
                <Link href="/">
                <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
                </Link>
                <p className="mt-2 text-muted-foreground">Enter your details to access your account.</p>
              </div>

              <Button type="button" variant="outline" className="w-full">Continue with Google</Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" autoComplete="email" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input id="password" type={show ? "text" : "password"} required minLength={8} className="pr-10" autoComplete="current-password" />
                  <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 grid size-9 place-items-center text-muted-foreground hover:text-foreground">
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="size-4 accent-primary" /> Keep me signed in
              </label>

              <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Signing in..." : "Sign in"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                New to Circuit?{" "}
                <Link href="#" className="font-medium text-foreground underline-offset-4 hover:underline">Create an account</Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
