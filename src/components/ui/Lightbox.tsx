"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

type LightboxItem = {
  src: string;
  title: string;
  description: string;
  categoryLabel: string;
};

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  item: LightboxItem | null;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export function Lightbox({
  open,
  onClose,
  item,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onPrev, onNext]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={cn(
        "fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-navy/95 p-0 text-white open:flex open:flex-col",
        "backdrop:bg-navy/80",
      )}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p
            className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "rgba(95,164,193,0.95)" }}
          >
            {item?.categoryLabel}
          </p>
          <h3
            id={titleId}
            className="mt-1 truncate font-heading text-lg font-semibold sm:text-xl"
            style={{ color: "#ffffff" }}
          >
            {item?.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close lightbox"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 sm:px-10">
        {item ? (
          <div className="relative mx-auto h-[min(72vh,40rem)] w-full max-w-5xl">
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        ) : null}

        {hasPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : null}
        {hasNext ? (
          <button
            type="button"
            onClick={onNext}
            className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        ) : null}
      </div>

      {item?.description ? (
        <p
          className="mx-auto max-w-3xl px-4 py-5 text-center text-sm leading-relaxed sm:px-6"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {item.description}
        </p>
      ) : null}
    </dialog>
  );
}
