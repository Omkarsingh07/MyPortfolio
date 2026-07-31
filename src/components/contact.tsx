"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "omkarssingh26@gmail.com",
    href: "mailto:omkarssingh26@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-8619268050",
    href: "tel:+918619268050",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Response SLA",
    value: "Within 24 Hours",
    href: null,
  },
];

export function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const nameVal = nameInput?.value.trim();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      form.reset();
      toast.success(
        `Thank you, ${nameVal || "Friend"}. Your message has been sent successfully.`
      );
    }, 1200);
  };

  return (
    <section
      className="py-24 sm:py-32 bg-gradient-to-b from-background via-muted/30 to-background border-t border-border/80 relative overflow-hidden"
      id="contact"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (lg:col-span-6) */}
          <ScrollReveal className="lg:col-span-6 space-y-8">
            {/* Availability Badge */}
            <Badge
              variant="outline"
              className="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Available for Software Engineering & AI Opportunities
            </Badge>

            {/* Apple SF Headline 40-48px */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12]">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Meaningful Together.
              </span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Whether you have an upcoming full-time software role, a custom generative
              AI project, or an enterprise data analytics requirement, I'm ready to bring
              technical rigour and business value to your organization.
            </p>

            {/* Status Card */}
            <Card className="border border-border/80 shadow-sm bg-card/80 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Briefcase className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Open for Engagement
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Full-Time Roles · Generative AI Projects · Data Analytics Consulting
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3.5 border-t border-border/60">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Expected Response: Within 24 hours
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Priority Channel
                </span>
              </div>
            </Card>

            {/* Floating Info Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card) => (
                <Card
                  key={card.label}
                  className="border border-border/80 shadow-sm hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300 bg-card rounded-2xl"
                >
                  <CardContent className="p-5 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {card.label}
                      </p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="font-semibold text-foreground hover:text-primary transition-colors text-sm truncate block"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <span className="font-semibold text-foreground text-sm truncate block">
                          {card.value}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/in/omkar-singh9192"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "rounded-full h-11 w-11 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                )}
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/Omkarsingh07?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "rounded-full h-11 w-11 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                )}
              >
                <GithubIcon className="h-5 w-5" />
              </a>

              <a
                href="mailto:omkarssingh26@gmail.com"
                aria-label="Send Email"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "rounded-full h-11 w-11 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                )}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Sticky Contact Form Card (lg:col-span-6) */}
          <ScrollReveal delay={0.15} className="lg:col-span-6">
            <Card className="sticky top-28 border border-border/80 shadow-xl shadow-black/[0.03] bg-card rounded-3xl p-8 sm:p-10">
              <CardContent className="p-0 space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-1.5 flex items-center gap-2">
                    Start a Conversation <Sparkles className="w-5 h-5 text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="form-name" className="text-xs font-semibold">
                        Full Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="form-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="rounded-xl h-11 px-4 text-sm bg-background border-border/80 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-email" className="text-xs font-semibold">
                        Work Email Address <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="form-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="rounded-xl h-11 px-4 text-sm bg-background border-border/80 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="form-company" className="text-xs font-semibold">
                        Company / Organization
                      </Label>
                      <Input
                        id="form-company"
                        name="company"
                        type="text"
                        placeholder="Acme Corp (Optional)"
                        className="rounded-xl h-11 px-4 text-sm bg-background border-border/80 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-subject" className="text-xs font-semibold">
                        Inquiry Subject
                      </Label>
                      <Input
                        id="form-subject"
                        name="subject"
                        type="text"
                        placeholder="Software Role / AI Project"
                        className="rounded-xl h-11 px-4 text-sm bg-background border-border/80 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="form-message" className="text-xs font-semibold">
                      Message Details <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="form-message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project requirements, role details, or timeline..."
                      required
                      className="rounded-xl p-4 text-sm bg-background border-border/80 focus:border-primary min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full rounded-full font-semibold shadow-md shadow-primary/25 hover:shadow-lg transition-all duration-300 text-base py-3.5 mt-2 gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Start a Conversation</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
