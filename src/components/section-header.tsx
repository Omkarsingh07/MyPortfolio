import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      } mb-16`}
    >
      {badge && (
        <Badge variant="outline" className="mb-4 gap-2 px-3.5 py-1.5 text-xs font-semibold">
          {badge}
        </Badge>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
