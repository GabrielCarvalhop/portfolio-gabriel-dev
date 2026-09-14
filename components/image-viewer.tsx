'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import './image-viewer.css';

export function ImageViewer({
  src,
  alt,
  caption,
  className = '',
  children,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`image-viewer-trigger ${className}`}
        aria-label={`Abrir imagem: ${caption}`}
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className="image-viewer"
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="image-viewer-toolbar">
          <button type="button" onClick={close} className="image-viewer-back">
            <ArrowLeft size={18} aria-hidden="true" /> Voltar ao projeto
          </button>
          <button
            type="button"
            onClick={close}
            className="image-viewer-close"
            aria-label="Fechar imagem"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="image-viewer-canvas">
          {open && (
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              sizes="100vw"
              style={{ objectFit: 'contain', height: '100%', width: '100%' }}
            />
          )}
        </div>
        <p id={titleId} className="image-viewer-caption">
          {caption}
        </p>
      </dialog>
    </>
  );
}
