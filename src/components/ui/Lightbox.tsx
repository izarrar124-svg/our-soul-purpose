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
        "fixed inset-0 m-auto w-[min(100%-1rem,56rem)] max-h-[min(92vh,48rem)] overflow-hidden rounded-sm border-0 bg-cream p-0 text-ink shadow-2xl open:flex open:flex-col",
        "backdrop:bg-navy/70 backdrop:backdrop-blur-[2px]",
      )}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-ocean uppercase">
            {item?.categoryLabel}
          </p>
          <h3
            id={titleId}
            className="mt-1 truncate font-heading text-lg font-semibold text-navy sm:text-xl"
          >
            {item?.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1.5 text-ink transition-colors hover:bg-mist hover:text-navy"
          aria-label="Close lightbox"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 bg-navy/5">
        {item ? (
          <div className="relative mx-auto h-[min(58vh,28rem)] w-full sm:h-[min(62vh,32rem)]">
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 896px) 100vw, 56rem"
              className="object-contain"
              priority
            />
          </div>
        ) : null}

        {hasPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-navy shadow-sm hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : null}
        {hasNext ? (
          <button
            type="button"
            onClick={onNext}
            className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-navy shadow-sm hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        ) : null}
      </div>

      {item?.description ? (
        <p className="border-t border-navy/10 px-4 py-3 text-sm leading-relaxed text-ink sm:px-5">
          {item.description}
        </p>
      ) : null}
    </dialog>
  );
}
