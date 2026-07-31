import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omkar — Software Engineer",
  description:
    "Building AI-powered software and data-driven products that solve real business problems. Portfolio of Omkar Singh featuring software engineering, generative AI video workflows, and enterprise data analytics.",
  keywords: [
    "Omkar Singh",
    "Software Engineer",
    "Generative AI Engineer",
    "Data Analyst",
    "Python",
    "TypeScript",
    "Next.js",
    "Machine Learning",
    "Generative AI",
  ],
  authors: [{ name: "Omkar Singh" }],
  openGraph: {
    title: "Omkar — Software Engineer",
    description:
      "Building AI-powered software and data-driven products that solve real business problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="omkar-portfolio-theme"
          disableTransitionOnChange={false}
        >
          <TooltipProvider>
            {children}
            <Toaster position="bottom-left" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
