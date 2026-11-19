import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase",
            !isLight && "text-ocean",
          )}
          style={isLight ? { color: "rgba(255,255,255,0.78)" } : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl tracking-tight sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-white" : "text-navy",
        )}
        style={{
          fontWeight: 700,
          ...(isLight ? { color: "#ffffff" } : {}),
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 font-sans text-base leading-relaxed sm:text-lg",
            !isLight && "text-ink",
          )}
          style={isLight ? { color: "rgba(255,255,255,0.9)" } : undefined}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
