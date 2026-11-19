"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) {
        dialog.showModal();
      }
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={cn(
        "fixed inset-0 m-auto w-[min(100%-1.5rem,36rem)] max-h-[min(90vh,40rem)] overflow-hidden rounded-sm border-0 bg-cream p-0 text-ink shadow-2xl open:flex open:flex-col",
        "backdrop:bg-navy/55 backdrop:backdrop-blur-[2px]",
        className,
      )}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-5 py-4 sm:px-6">
        <h3
          id={titleId}
          className="font-heading text-xl font-semibold text-navy sm:text-2xl"
        >
          {title}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1.5 text-ink transition-colors hover:bg-mist hover:text-navy"
          aria-label="Close dialog"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">{children}</div>
    </dialog>
  );
}
