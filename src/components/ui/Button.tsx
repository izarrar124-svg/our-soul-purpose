import Link from "next/link";
import { cn } from "@/lib/cn";

const variantStyles: Record<
  "primary" | "secondary" | "outline" | "ghost",
  React.CSSProperties
> = {
  primary: {
    backgroundColor: "#C8871F",
    color: "#FFFFFF",
    border: "1px solid #C8871F",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.85)",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#163A5C",
    border: "1px solid rgba(22,58,92,0.25)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#163A5C",
    border: "1px solid transparent",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

type ButtonBase = {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBase &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBase & {
  href: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55",
    sizes[size],
    className,
  );
  const style = variantStyles[variant];

  if ("href" in props && props.href) {
    const { href, disabled, onClick } = props;
    if (disabled) {
      return (
        <span className={classes} style={style} aria-disabled="true">
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} style={style} {...buttonProps}>
      {children}
    </button>
  );
}
