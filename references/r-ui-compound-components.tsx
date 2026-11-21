/**
 * r-ui Compound Components Boilerplate (Project-Adaptive Edition)
 * Supports Headless / Unstyled Mode (unstyled?: boolean) so components can be freely adapted
 * to any project requirements without CSS class conflicts or rigid styling constraints.
 */

import React, { createContext, useContext } from 'react';
import { RUiComponentContract, buildRUiClasses } from './r-ui-contract-types';

/* ==========================================================================
   1. COMPOUND COMPONENT: CARD (ADAPTIVE & UNSTYLED-CAPABLE)
   ========================================================================== */
interface CardContextValue {
  variant: string;
  unstyled: boolean;
}
const CardContext = createContext<CardContextValue>({ variant: 'default', unstyled: false });

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, RUiComponentContract {
  /** Matikan styling bawaan untuk kebebasan kustomisasi 100% dengan Tailwind / CSS kustom */
  unstyled?: boolean;
}

export function Card({
  variant = 'primary',
  size = 'md',
  unstyled = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const finalClass = unstyled
    ? className
    : buildRUiClasses('r-ui-card', { variant, size, custom: className });

  return (
    <CardContext.Provider value={{ variant, unstyled }}>
      <div className={finalClass} {...props}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(CardContext);
  return <div className={unstyled ? className : `r-ui-card__header ${className}`} {...props}>{children}</div>;
};

Card.Title = function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { unstyled } = useContext(CardContext);
  return <h3 className={unstyled ? className : `r-ui-card__title ${className}`} {...props}>{children}</h3>;
};

Card.Body = function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(CardContext);
  return <div className={unstyled ? className : `r-ui-card__body ${className}`} {...props}>{children}</div>;
};

Card.Footer = function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(CardContext);
  return <div className={unstyled ? className : `r-ui-card__footer ${className}`} {...props}>{children}</div>;
};

/* ==========================================================================
   2. COMPOUND COMPONENT: FIELD GROUP (ACCESSIBLE FORM FIELD)
   ========================================================================== */
interface FieldGroupContextValue {
  id: string;
  hasError: boolean;
  unstyled: boolean;
}
const FieldGroupContext = createContext<FieldGroupContextValue>({ id: '', hasError: false, unstyled: false });

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  intent?: 'default' | 'error';
  unstyled?: boolean;
}

export function FieldGroup({
  id,
  intent = 'default',
  unstyled = false,
  className = '',
  children,
  ...props
}: FieldGroupProps) {
  const hasError = intent === 'error';
  const finalClass = unstyled
    ? className
    : `r-ui-field-group ${hasError ? 'is-error' : ''} ${className}`;

  return (
    <FieldGroupContext.Provider value={{ id, hasError, unstyled }}>
      <div className={finalClass} {...props}>
        {children}
      </div>
    </FieldGroupContext.Provider>
  );
}

FieldGroup.Label = function FieldLabel({ className = '', children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { id, unstyled } = useContext(FieldGroupContext);
  return (
    <label htmlFor={id} className={unstyled ? className : `r-ui-field-label ${className}`} {...props}>
      {children}
    </label>
  );
};

FieldGroup.Input = function FieldInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const { id, hasError, unstyled } = useContext(FieldGroupContext);
  return (
    <input
      id={id}
      aria-invalid={hasError ? 'true' : 'false'}
      className={unstyled ? className : `r-ui-input ${className}`}
      {...props}
    />
  );
};

FieldGroup.Hint = function FieldHint({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { unstyled } = useContext(FieldGroupContext);
  return <p className={unstyled ? className : `r-ui-field-hint ${className}`} {...props}>{children}</p>;
};

FieldGroup.Error = function FieldError({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { hasError, unstyled } = useContext(FieldGroupContext);
  if (!hasError) return null;
  return (
    <p role="alert" className={unstyled ? className : `r-ui-field-error ${className}`} {...props}>
      {children}
    </p>
  );
};

/* ==========================================================================
   3. COMPOUND COMPONENT: ADAPTIVE MODAL / BOTTOM SHEET
   ========================================================================== */
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  unstyled: boolean;
}
const ModalContext = createContext<ModalContextValue>({ isOpen: false, onClose: () => {}, unstyled: false });

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, unstyled = false, className = '', children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose, unstyled }}>
      <div
        className={unstyled ? 'fixed inset-0 z-50 flex items-center justify-center' : 'r-ui-overlay-backdrop'}
        onClick={onClose}
        role="presentation"
      >
        <div
          className={unstyled ? className : 'r-ui-modal-surface'}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

Modal.Header = function ModalHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(ModalContext);
  return <div className={unstyled ? className : `r-ui-modal__header ${className}`} {...props}>{children}</div>;
};

Modal.Title = function ModalTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { unstyled } = useContext(ModalContext);
  return <h2 className={unstyled ? className : `r-ui-modal__title ${className}`} {...props}>{children}</h2>;
};

Modal.Body = function ModalBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(ModalContext);
  return <div className={unstyled ? className : `r-ui-modal__body ${className}`} {...props}>{children}</div>;
};

Modal.Footer = function ModalFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { unstyled } = useContext(ModalContext);
  return <div className={unstyled ? className : `r-ui-modal__footer ${className}`} {...props}>{children}</div>;
};

Modal.Close = function ModalClose({ className = '', children = 'Tutup', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onClose, unstyled } = useContext(ModalContext);
  return (
    <button
      type="button"
      onClick={onClose}
      className={unstyled ? className : `r-ui-btn r-ui-btn--ghost ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
