import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "cream" | "mist" | "navy" | "white";
};

const tones = {
  cream: "bg-cream",
  mist: "bg-mist",
  navy: "bg-navy text-white",
  white: "bg-white",
} as const;

export function Section({
  id,
  children,
  className,
  containerClassName,
  tone = "cream",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
