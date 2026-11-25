/**
 * r-ui Compound Components Boilerplate (Project-Adaptive Edition v3.6.0)
 * Supports Headless / Unstyled Mode (unstyled?: boolean) and 100% Componentized Forms (Law 9)
 * Zero native <select>, date, time, checkbox, radio, slider, or file widgets.
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  RUiComponentContract,
  buildRUiClasses,
  RUiToastItem,
  RUiAlertProps,
  RUiAlertPosition,
  RUiIntent,
  RUiSelectOption,
  RUiDateRangeValue,
  RUiDatePreset,
  RUiDateTimeValue,
  RUiInputWithSelectValue,
  RUiColorSwatchOption,
  RUiKeyValuePair,
  RUiFormErrorItem,
  RUiTreeNode,
  RUiBreadcrumbItem,
  RUiDropdownItem,
  RUiTableColumn,
  RUiControlSize,
  RUiDropzoneFile
} from './r-ui-contract-types';

function FieldEnvelope({
  id,
  label,
  required,
  hint,
  error,
  unstyled = false,
  className = '',
  children
}: {
  id?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (!label && !hint && !error && !className) return <>{children}</>;
  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}{required && <span className={unstyled ? '' : 'r-ui-field-required'}>*</span>}</span>
        </label>
      )}
      {children}
      {error && <span role="alert" className={unstyled ? '' : 'r-ui-field-error'}>{error}</span>}
      {!error && hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

/* ==========================================================================
   1. COMPOUND COMPONENT: CARD (ADAPTIVE & UNSTYLED-CAPABLE)
   ========================================================================== */
interface CardContextValue {
  variant: string;
  unstyled: boolean;
}
const CardContext = createContext<CardContextValue>({ variant: 'default', unstyled: false });

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, RUiComponentContract {
  /** Disable default styling for 100% customization freedom with Tailwind / custom CSS */
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

Modal.Close = function ModalClose({ className = '', children = 'Close', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
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

/* ==========================================================================
   4. COMPOUND COMPONENT: CUSTOM ACCESSIBLE SELECT (BANS RAW NATIVE <select>)
   ========================================================================== */
interface SelectContextValue {
  value: string;
  onChange: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  unstyled: boolean;
}
const SelectContext = createContext<SelectContextValue>({
  value: '',
  onChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
  unstyled: false
});

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Select({
  value,
  onChange,
  label,
  required,
  hint,
  error,
  unstyled = false,
  className = '',
  children
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FieldEnvelope label={label} required={required} hint={hint} error={error} unstyled={unstyled} className={className}>
      <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen, unstyled }}>
        <div
          className={unstyled ? className : `r-ui-custom-select ${isOpen ? 'is-open' : ''}`}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsOpen(false);
            }
          }}
        >
          {children}
        </div>
      </SelectContext.Provider>
    </FieldEnvelope>
  );
}

Select.Trigger = function SelectTrigger({
  placeholder = 'Select option...',
  className = '',
  children
}: {
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { value, isOpen, setIsOpen, unstyled } = useContext(SelectContext);

  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={unstyled ? className : `r-ui-select-trigger ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{children || value || placeholder}</span>
      <svg
        className={unstyled ? '' : 'r-ui-select-chevron'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
};

Select.Content = function SelectContent({
  className = '',
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { isOpen, unstyled } = useContext(SelectContext);
  if (!isOpen) return null;

  return (
    <div
      role="listbox"
      className={unstyled ? className : `r-ui-select-popover ${className}`}
    >
      {children}
    </div>
  );
};

Select.Option = function SelectOption({
  value: optValue,
  className = '',
  children
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value, onChange, setIsOpen, unstyled } = useContext(SelectContext);
  const isSelected = value === optValue;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={
        unstyled
          ? className
          : `r-ui-select-option ${isSelected ? 'is-selected' : ''} ${className}`
      }
      onClick={() => {
        onChange(optValue);
        setIsOpen(false);
      }}
    >
      <span>{children}</span>
      {isSelected && <span>✓</span>}
    </div>
  );
};

/* ==========================================================================
   5. UTILITY & MICRO-ACTION: TACTILE COPY BUTTON
   ========================================================================== */
export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onCopy?: (copiedText: string) => void;
  copiedDuration?: number;
  label?: string;
  copiedLabel?: string;
  showLabel?: boolean;
  unstyled?: boolean;
}

export function CopyButton({
  text,
  onCopy,
  copiedDuration = 2000,
  label = 'Copy',
  copiedLabel = 'Copied!',
  showLabel = false,
  unstyled = false,
  className = '',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (onCopy) onCopy(text);
      setTimeout(() => setCopied(false), copiedDuration);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [text, onCopy, copiedDuration]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : `${label}: ${text}`}
      title={copied ? copiedLabel : label}
      className={
        unstyled
          ? className
          : `r-ui-copy-btn ${copied ? 'is-copied' : ''} ${className}`
      }
      {...props}
    >
      {copied ? (
        <svg className="r-ui-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg className="r-ui-icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {showLabel && <span className="r-ui-copy-btn__label">{copied ? copiedLabel : label}</span>}
    </button>
  );
}

/* ==========================================================================
   6. COMPOUND COMPONENT: TOAST NOTIFICATIONS WITH ACTIONABLE COPY
   ========================================================================== */
interface ToastContextValue {
  toasts: RUiToastItem[];
  addToast: (toast: Omit<RUiToastItem, 'id'> & { id?: string }) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<RUiToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (toast: Omit<RUiToastItem, 'id'> & { id?: string }) => {
      const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      const newToast: RUiToastItem = {
        id,
        duration: 4000,
        copyable: true,
        ...toast
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function ToastStack({
  toasts,
  onDismiss,
  unstyled = false,
  className = ''
}: {
  toasts: RUiToastItem[];
  onDismiss: (id: string) => void;
  unstyled?: boolean;
  className?: string;
}) {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notification toasts"
      aria-live="polite"
      className={unstyled ? className : `r-ui-toast-container ${className}`}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} unstyled={unstyled} />
      ))}
    </aside>
  );
}

export function ToastItem({
  toast,
  onDismiss,
  unstyled = false,
  className = ''
}: {
  toast: RUiToastItem;
  onDismiss: () => void;
  unstyled?: boolean;
  className?: string;
}) {
  const intent = toast.intent || 'default';
  const copyTarget = toast.copyText || toast.message;

  return (
    <div
      role={intent === 'error' ? 'alert' : 'status'}
      className={
        unstyled
          ? className
          : `r-ui-toast r-ui-toast--${intent} ${className}`
      }
    >
      {/* Intent Status Icon */}
      <div className="r-ui-toast__icon" aria-hidden="true">
        {intent === 'success' && (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {intent === 'error' && (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
        {intent === 'warning' && (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
        {(intent === 'info' || intent === 'default') && (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="r-ui-toast__content">
        {toast.title && <div className="r-ui-toast__title">{toast.title}</div>}
        <div className="r-ui-toast__message">{toast.message}</div>
      </div>

      {/* Action Area */}
      <div className="r-ui-toast__actions">
        {toast.copyable !== false && (
          <CopyButton
            text={copyTarget}
            onCopy={toast.onCopy}
            className="r-ui-toast__copy-btn"
            title="Copy notification text"
          />
        )}
        {toast.action && (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="r-ui-toast__action-btn"
          >
            {toast.action.label}
          </button>
        )}
        <button
          type="button"
          onClick={onDismiss}
          className="r-ui-toast__close-btn"
          aria-label="Dismiss notification"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}



/* ==========================================================================
   7. COMPOUND COMPONENT: IN-PAGE NOTIFICATION / ALERT (ABOVE-FORM COMPLIANT)
   ========================================================================== */
interface AlertContextValue {
  intent: RUiIntent;
  unstyled: boolean;
  position: RUiAlertPosition;
}

const AlertContext = createContext<AlertContextValue>({
  intent: 'default',
  unstyled: false,
  position: 'inline'
});

export function Alert({
  intent = 'default',
  position = 'inline',
  copyable = false,
  copyText = '',
  onCopy,
  dismissible = false,
  onDismiss,
  unstyled = false,
  className = '',
  children,
  ...props
}: RUiAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  const isAboveForm = position === 'above-form';
  const finalClass = unstyled
    ? className
    : `r-ui-alert r-ui-alert--${intent} ${isAboveForm ? 'r-ui-alert--above-form' : ''} ${className}`;

  return (
    <AlertContext.Provider value={{ intent, unstyled, position }}>
      <div
        role={intent === 'error' ? 'alert' : 'status'}
        aria-live={intent === 'error' ? 'assertive' : 'polite'}
        className={finalClass}
        {...props}
      >
        <div className="r-ui-alert__inner">
          <div className="r-ui-alert__body">{children}</div>
          <div className="r-ui-alert__actions">
            {copyable && (
              <CopyButton
                text={copyText}
                onCopy={onCopy}
                className="r-ui-alert__copy-btn"
                title="Copy notification payload"
              />
            )}
            {dismissible && (
              <button
                type="button"
                onClick={handleDismiss}
                className="r-ui-alert__close-btn"
                aria-label="Dismiss alert"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </AlertContext.Provider>
  );
}

Alert.Title = function AlertTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { unstyled } = useContext(AlertContext);
  return <h4 className={unstyled ? className : `r-ui-alert__title ${className}`} {...props}>{children}</h4>;
};

Alert.Description = function AlertDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { unstyled } = useContext(AlertContext);
  return <p className={unstyled ? className : `r-ui-alert__description ${className}`} {...props}>{children}</p>;
};

/* ==========================================================================
   8. UNIFIED FORM ARCHITECTURE & COMPONENTIZED CONTROLS (LAW 9 v3.6.0)
   ========================================================================== */
export function Form({
  unstyled = false,
  className = '',
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement> & { unstyled?: boolean }) {
  return (
    <form className={unstyled ? className : `r-ui-form ${className}`} {...props}>
      {children}
    </form>
  );
}

export function FormSection({
  title,
  description,
  unstyled = false,
  className = '',
  children
}: {
  title?: string;
  description?: string;
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={unstyled ? className : `r-ui-form-section ${className}`}>
      {title && <h4 className={unstyled ? '' : 'r-ui-text-section-title'}>{title}</h4>}
      {description && <p className={unstyled ? '' : 'r-ui-field-hint'}>{description}</p>}
      {children}
    </section>
  );
}

export function FormGrid({
  unstyled = false,
  className = '',
  children
}: {
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={unstyled ? className : `r-ui-form-grid ${className}`}>{children}</div>;
}

export function FormActions({
  unstyled = false,
  className = '',
  children
}: {
  unstyled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={unstyled ? className : `r-ui-form-actions ${className}`}>{children}</div>;
}

/* 8.1 Textarea with Live Character Counter */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  unstyled?: boolean;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  maxLength,
  value,
  defaultValue,
  onChange,
  unstyled = false,
  className = '',
  ...props
}: TextareaProps) {
  const [internalVal, setInternalVal] = useState(String(defaultValue ?? ''));
  const currentVal = value !== undefined ? String(value) : internalVal;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setInternalVal(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && <label htmlFor={id} className={unstyled ? '' : 'r-ui-field-label'}>{label}</label>}
      <textarea
        id={id}
        value={currentVal}
        maxLength={maxLength}
        onChange={handleChange}
        aria-invalid={error ? 'true' : 'false'}
        className={unstyled ? '' : `r-ui-textarea ${error ? 'is-error' : ''}`}
        {...props}
      />
      <div className={unstyled ? '' : 'r-ui-textarea-meta'}>
        <span>{error ? <span className={unstyled ? '' : 'r-ui-field-error'}>{error}</span> : hint}</span>
        {maxLength !== undefined && (
          <span className={unstyled ? '' : 'r-ui-textarea-counter'}>
            {currentVal.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}



/* 8.2 Precision Number Stepper */
export interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unstyled?: boolean;
  className?: string;
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 999999,
  step = 1,
  label,
  unstyled = false,
  className = ''
}: NumberStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className={unstyled ? className : `r-ui-field-group ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div className={unstyled ? '' : 'r-ui-number-stepper'}>
        <button
          type="button"
          className={unstyled ? '' : 'r-ui-number-stepper__btn'}
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
          aria-label="Decrease value"
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            if (!Number.isNaN(parsed)) onChange(clamp(parsed));
          }}
          className={unstyled ? '' : 'r-ui-number-stepper__input'}
          aria-label={label || 'Numeric value'}
        />
        <button
          type="button"
          className={unstyled ? '' : 'r-ui-number-stepper__btn'}
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
          aria-label="Increase value"
        >
          +
        </button>
      </div>
    </div>
  );
}



/* 8.3 Searchable MultiSelect with Removable Chips */
export interface MultiSelectProps {
  options: RUiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  searchable?: boolean;
  unstyled?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
  label,
  required,
  hint,
  error,
  searchable = true,
  unstyled = false,
  className = ''
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggle = (val: string) => {
    onChange(
      selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val]
    );
  };

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <FieldEnvelope label={label} required={required} hint={hint} error={error} unstyled={unstyled} className={className}>
    <div
      className={unstyled ? className : `r-ui-multi-select ${isOpen ? 'is-open' : ''}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={unstyled ? '' : 'r-ui-multi-trigger'}
        onClick={() => setIsOpen((p) => !p)}
      >
        {selectedValues.length === 0 ? (
          <span className={unstyled ? '' : 'r-ui-field-hint'}>{placeholder}</span>
        ) : (
          selectedValues.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span key={val} className={unstyled ? '' : 'r-ui-chip'}>
                <span>{opt ? opt.label : val}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${opt ? opt.label : val}`}
                  className={unstyled ? '' : 'r-ui-chip__close'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(val);
                  }}
                >
                  ✕
                </span>
              </span>
            );
          })
        )}
      </button>
      {isOpen && (
        <div className={unstyled ? '' : 'r-ui-select-popover'} style={unstyled ? undefined : { display: 'flex' }} role="listbox">
          {searchable && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter options..."
              className={unstyled ? '' : 'r-ui-input r-ui-input--sm'}
            />
          )}
          {filtered.map((opt) => {
            const active = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={active}
                className={unstyled ? '' : `r-ui-select-option ${active ? 'is-selected' : ''}`}
                onClick={() => !opt.disabled && toggle(opt.value)}
              >
                <span>{opt.label}</span>
                {active && <span>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
    </FieldEnvelope>
  );
}

/* 8.4 Custom DatePicker & DateRangePicker (Bans native <input type="date">) */
function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const cells: Array<{ iso: string; day: number; outside: boolean }> = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthDays - i);
    cells.push({ iso: toIsoDate(d), day: d.getDate(), outside: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    cells.push({ iso: toIsoDate(d), day: i, outside: false });
  }
  while (cells.length < 42) {
    const nextIdx = cells.length - (firstDay + daysInMonth) + 1;
    const d = new Date(year, month + 1, nextIdx);
    cells.push({ iso: toIsoDate(d), day: d.getDate(), outside: true });
  }
  return cells;
}

export interface DatePickerProps {
  value: string | null;
  onChange: (isoDate: string | null) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  minDate?: string;
  maxDate?: string;
  size?: RUiControlSize;
  unstyled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date...',
  label,
  required,
  hint,
  error,
  minDate,
  maxDate,
  unstyled = false,
  className = ''
}: DatePickerProps) {
  const initial = value ? new Date(`${value}T00:00:00`) : new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const todayIso = toIsoDate(new Date());
  const cells = buildCalendarDays(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  return (
    <FieldEnvelope label={label} required={required} hint={hint} error={error} unstyled={unstyled} className={className}>
    <div
      className={unstyled ? className : `r-ui-date-picker ${isOpen ? 'is-open' : ''}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={unstyled ? '' : 'r-ui-date-trigger'}
        onClick={() => setIsOpen((p) => !p)}
      >
        <span className={unstyled ? '' : 'r-ui-date-trigger__value'}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{value || placeholder}</span>
        </span>
        <span aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div role="dialog" aria-label="Choose date" className={unstyled ? '' : 'r-ui-date-popover'}>
          <div className={unstyled ? '' : 'r-ui-calendar-header'}>
            <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
            <span className={unstyled ? '' : 'r-ui-calendar-title'}>{monthLabel}</span>
            <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => shiftMonth(1)} aria-label="Next month">›</button>
          </div>
          <div className={unstyled ? '' : 'r-ui-calendar-grid'}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
              <span key={w} className={unstyled ? '' : 'r-ui-calendar-weekday'}>{w}</span>
            ))}
            {cells.map((c) => {
              const disabled = Boolean((minDate && c.iso < minDate) || (maxDate && c.iso > maxDate));
              const selected = value === c.iso;
              const isToday = c.iso === todayIso;
              return (
                <button
                  key={c.iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(c.iso);
                    setIsOpen(false);
                  }}
                  className={
                    unstyled
                      ? ''
                      : `r-ui-calendar-day ${c.outside ? 'is-outside' : ''} ${isToday ? 'is-today' : ''} ${selected ? 'is-selected' : ''}`
                  }
                >
                  {c.day}
                </button>
              );
            })}
          </div>
          <div className={unstyled ? '' : 'r-ui-date-footer'}>
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} onClick={() => { onChange(null); setIsOpen(false); }}>Clear</button>
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--secondary r-ui-btn--xs'} onClick={() => { onChange(todayIso); setIsOpen(false); }}>Today</button>
          </div>
        </div>
      )}
    </div>
    </FieldEnvelope>
  );
}

export interface DateRangePickerProps {
  value: RUiDateRangeValue;
  onChange: (range: RUiDateRangeValue) => void;
  presets?: RUiDatePreset[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  unstyled?: boolean;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  presets,
  placeholder = 'Select date range...',
  label,
  required,
  hint,
  error,
  unstyled = false,
  className = ''
}: DateRangePickerProps) {
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [hoverIso, setHoverIso] = useState<string | null>(null);
  const cells = buildCalendarDays(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const defaultPresets: RUiDatePreset[] = presets || [
    {
      id: 'today',
      label: 'Today',
      getRange: () => { const t = toIsoDate(new Date()); return { start: t, end: t }; }
    },
    {
      id: '7d',
      label: 'Last 7D',
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        return { start: toIsoDate(start), end: toIsoDate(end) };
      }
    },
    {
      id: '30d',
      label: 'Last 30D',
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 29);
        return { start: toIsoDate(start), end: toIsoDate(end) };
      }
    }
  ];

  const handleDayClick = (iso: string) => {
    if (!value.start || (value.start && value.end)) {
      onChange({ start: iso, end: null, preset: 'custom' });
    } else if (iso < value.start) {
      onChange({ start: iso, end: value.start, preset: 'custom' });
    } else {
      onChange({ start: value.start, end: iso, preset: 'custom' });
    }
  };

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const displayRange = value.start && value.end
    ? `${value.start} → ${value.end}`
    : value.start
      ? `${value.start} → ...`
      : placeholder;

  return (
    <FieldEnvelope label={label} required={required} hint={hint} error={error} unstyled={unstyled} className={className}>
    <div
      className={unstyled ? className : `r-ui-date-range-picker ${isOpen ? 'is-open' : ''}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={unstyled ? '' : 'r-ui-date-trigger'}
        onClick={() => setIsOpen((p) => !p)}
      >
        <span className={unstyled ? '' : 'r-ui-date-trigger__value'}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{displayRange}</span>
        </span>
        <span aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div role="dialog" aria-label="Choose date range" className={unstyled ? '' : 'r-ui-date-popover'}>
          <div className={unstyled ? '' : 'r-ui-date-presets'}>
            {defaultPresets.map((p) => (
              <button
                key={p.id}
                type="button"
                className={unstyled ? '' : `r-ui-date-preset-btn ${value.preset === p.id ? 'is-active' : ''}`}
                onClick={() => {
                  const r = p.getRange();
                  onChange({ start: r.start, end: r.end, preset: p.id });
                  setIsOpen(false);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className={unstyled ? '' : 'r-ui-calendar-header'}>
            <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
            <span className={unstyled ? '' : 'r-ui-calendar-title'}>{monthLabel}</span>
            <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => shiftMonth(1)} aria-label="Next month">›</button>
          </div>

          <div className={unstyled ? '' : 'r-ui-calendar-grid'}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
              <span key={w} className={unstyled ? '' : 'r-ui-calendar-weekday'}>{w}</span>
            ))}
            {cells.map((c) => {
              const rangeEnd = value.end || hoverIso;
              const isStart = value.start === c.iso;
              const isEnd = value.end === c.iso;
              const inRange = Boolean(value.start && rangeEnd && c.iso > value.start && c.iso < rangeEnd);
              return (
                <button
                  key={c.iso}
                  type="button"
                  onMouseEnter={() => setHoverIso(c.iso)}
                  onMouseLeave={() => setHoverIso(null)}
                  onClick={() => handleDayClick(c.iso)}
                  className={
                    unstyled
                      ? ''
                      : `r-ui-calendar-day ${c.outside ? 'is-outside' : ''} ${inRange ? 'is-in-range' : ''} ${isStart ? 'is-range-start' : ''} ${isEnd ? 'is-range-end' : ''}`
                  }
                >
                  {c.day}
                </button>
              );
            })}
          </div>

          <div className={unstyled ? '' : 'r-ui-date-footer'}>
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} onClick={() => onChange({ start: null, end: null })}>Reset</button>
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--primary r-ui-btn--xs'} onClick={() => setIsOpen(false)}>Apply</button>
          </div>
        </div>
      )}
    </div>
    </FieldEnvelope>
  );
}

/* 8.5 RadioCardGroup (1px Uniform Perimeter, Zero Thick Left Border) */
export function RadioCardGroup({
  options,
  value,
  onChange,
  unstyled = false,
  className = ''
}: {
  options: RUiSelectOption[];
  value: string;
  onChange: (value: string) => void;
  unstyled?: boolean;
  className?: string;
}) {
  return (
    <div role="radiogroup" className={unstyled ? className : `r-ui-radio-cards ${className}`}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <div
            key={opt.value}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onClick={() => !opt.disabled && onChange(opt.value)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !opt.disabled) {
                e.preventDefault();
                onChange(opt.value);
              }
            }}
            className={unstyled ? '' : `r-ui-radio-card ${selected ? 'is-selected' : ''}`}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{opt.label}</div>
              {opt.description && <div className={unstyled ? '' : 'r-ui-field-hint'}>{opt.description}</div>}
            </div>
            <span className={unstyled ? '' : `r-ui-radio ${selected ? 'is-checked' : ''}`}>
              <span className={unstyled ? '' : 'r-ui-radio__circle'} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* 8.6 Accessible File Dropzone */
export function Dropzone({
  files = [],
  accept,
  onFilesAdded,
  onRemoveFile,
  unstyled = false,
  className = ''
}: {
  files?: RUiDropzoneFile[];
  accept?: string;
  onFilesAdded: (files: FileList) => void;
  onRemoveFile?: (id: string) => void;
  unstyled?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) onFilesAdded(e.dataTransfer.files);
        }}
        className={unstyled ? '' : `r-ui-dropzone ${dragOver ? 'is-dragover' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          hidden
          onChange={(e) => e.target.files && onFilesAdded(e.target.files)}
        />
        <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>Drop files here or click to browse</span>
        {accept && <span className={unstyled ? '' : 'r-ui-field-hint'}>Accepted formats: {accept}</span>}
      </div>
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
          {files.map((f) => (
            <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
              <span>{f.name} ({Math.max(1, Math.round(f.size / 1024))} KB)</span>
              {onRemoveFile && (
                <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} onClick={() => onRemoveFile(f.id)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 8.7 Integrated TextField & PasswordField (Label + Addons + Clear/Eye + Hint + Error) */
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  id: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  successMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  controlSize?: RUiControlSize;
  unstyled?: boolean;
}

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  successMessage,
  prefix,
  suffix,
  clearable = false,
  onClear,
  controlSize = 'md',
  unstyled = false,
  className = '',
  value,
  ...props
}: TextFieldProps) {
  const sizeClass = controlSize === 'sm' ? 'r-ui-input--sm' : controlSize === 'lg' ? 'r-ui-input--lg' : '';
  const hasAddons = Boolean(prefix || suffix || (clearable && value));

  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}{required && <span className={unstyled ? '' : 'r-ui-field-required'}>*</span>}</span>
        </label>
      )}
      {hasAddons ? (
        <div className={unstyled ? '' : `r-ui-input-group ${error ? 'is-error' : successMessage ? 'is-success' : ''}`}>
          {prefix && <span className={unstyled ? '' : 'r-ui-input-group__addon'}>{prefix}</span>}
          <input
            id={id}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            className={unstyled ? '' : `r-ui-input ${sizeClass}`}
            {...props}
          />
          {clearable && value && onClear && (
            <button type="button" onClick={onClear} className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} aria-label="Clear input">✕</button>
          )}
          {suffix && <span className={unstyled ? '' : 'r-ui-input-group__addon'}>{suffix}</span>}
        </div>
      ) : (
        <input
          id={id}
          value={value}
          aria-invalid={error ? 'true' : 'false'}
          className={unstyled ? '' : `r-ui-input ${sizeClass} ${error ? 'is-error' : successMessage ? 'is-success' : ''}`}
          {...props}
        />
      )}
      {error && <span role="alert" className={unstyled ? '' : 'r-ui-field-error'}>{error}</span>}
      {!error && successMessage && <span className={unstyled ? '' : 'r-ui-field-success'}>{successMessage}</span>}
      {!error && !successMessage && hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

export function PasswordField(props: Omit<TextFieldProps, 'type' | 'suffix'>) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      suffix={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className={props.unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'}
          aria-label={visible ? 'Hide secret' : 'Show secret'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      }
    />
  );
}

/* 8.8 InputWithSelect Combo (Unified 1px Input + Custom Select on Left or Right) */
export interface InputWithSelectProps {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  value: RUiInputWithSelectValue;
  onChange: (val: RUiInputWithSelectValue) => void;
  options: RUiSelectOption[];
  selectPosition?: 'left' | 'right';
  placeholder?: string;
  inputType?: 'text' | 'number' | 'tel' | 'url';
  unstyled?: boolean;
  className?: string;
}

export function InputWithSelect({
  id,
  label,
  hint,
  error,
  required,
  value,
  onChange,
  options,
  selectPosition = 'right',
  placeholder = '',
  inputType = 'text',
  unstyled = false,
  className = ''
}: InputWithSelectProps) {
  const [open, setOpen] = useState(false);
  const currentOpt = options.find((o) => o.value === value.selected);

  const selectEl = (
    <div
      className={unstyled ? '' : `r-ui-custom-select ${open ? 'is-open' : ''}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={unstyled ? '' : 'r-ui-select-trigger'}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{currentOpt ? currentOpt.label : value.selected}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="listbox" className={unstyled ? '' : 'r-ui-select-popover'} style={unstyled ? undefined : { display: 'flex', minWidth: '120px' }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value.selected}
              className={unstyled ? '' : `r-ui-select-option ${opt.value === value.selected ? 'is-selected' : ''}`}
              onClick={() => {
                onChange({ ...value, selected: opt.value });
                setOpen(false);
              }}
            >
              <span>{opt.label}</span>
              {opt.value === value.selected && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}{required && <span className={unstyled ? '' : 'r-ui-field-required'}>*</span>}</span>
        </label>
      )}
      <div className={unstyled ? '' : `r-ui-input-select-combo r-ui-input-select-combo--${selectPosition} ${error ? 'is-error' : ''}`}>
        {selectPosition === 'left' && selectEl}
        <input
          id={id}
          type={inputType}
          value={value.text}
          placeholder={placeholder}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          aria-invalid={error ? 'true' : 'false'}
          className={unstyled ? '' : 'r-ui-input'}
        />
        {selectPosition === 'right' && selectEl}
      </div>
      {error && <span role="alert" className={unstyled ? '' : 'r-ui-field-error'}>{error}</span>}
      {!error && hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

/* 8.9 SearchableSelect & SelectField (Label + Search Filter + Keyboard Support) */
export function SearchableSelect({
  id,
  label,
  hint,
  error,
  required,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  unstyled = false,
  className = ''
}: {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: RUiSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  unstyled?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const active = options.find((o) => o.value === value);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}{required && <span className={unstyled ? '' : 'r-ui-field-required'}>*</span>}</span>
        </label>
      )}
      <div
        className={unstyled ? '' : `r-ui-custom-select ${isOpen ? 'is-open' : ''}`}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
        }}
      >
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={unstyled ? '' : 'r-ui-select-trigger'}
          onClick={() => setIsOpen((o) => !o)}
        >
          <span>{active ? active.label : placeholder}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {isOpen && (
          <div role="listbox" className={unstyled ? '' : 'r-ui-select-popover'} style={unstyled ? undefined : { display: 'flex' }}>
            <div className={unstyled ? '' : 'r-ui-select-search'}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className={unstyled ? '' : 'r-ui-input r-ui-input--sm'}
              />
            </div>
            {filtered.length === 0 ? (
              <div className={unstyled ? '' : 'r-ui-field-hint'} style={{ padding: '6px 10px' }}>No matching options</div>
            ) : (
              filtered.map((opt) => {
                const selected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={selected}
                    className={unstyled ? '' : `r-ui-select-option ${selected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (!opt.disabled) {
                        onChange(opt.value);
                        setIsOpen(false);
                        setQuery('');
                      }
                    }}
                  >
                    <span>{opt.label}</span>
                    {selected && <span>✓</span>}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && <span role="alert" className={unstyled ? '' : 'r-ui-field-error'}>{error}</span>}
      {!error && hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

/* 8.10 TimePicker & DateTimePicker (Bans native <input type="time|datetime-local">) */
export function TimePicker({
  value,
  onChange,
  hours = ['00', '04', '08', '09', '12', '14', '16', '18', '20', '22'],
  minutes = ['00', '15', '30', '45'],
  unstyled = false,
  className = ''
}: {
  value: string;
  onChange: (hhmm: string) => void;
  hours?: string[];
  minutes?: string[];
  unstyled?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [curH = '09', curM = '00'] = (value || '09:00').split(':');

  return (
    <div
      className={unstyled ? className : `r-ui-time-picker ${isOpen ? 'is-open' : ''} ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button type="button" aria-haspopup="dialog" aria-expanded={isOpen} className={unstyled ? '' : 'r-ui-date-trigger'} onClick={() => setIsOpen((o) => !o)}>
        <span className={unstyled ? '' : 'r-ui-date-trigger__value'}>{value || 'Select time...'}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div role="dialog" aria-label="Choose time" className={unstyled ? '' : 'r-ui-date-popover'} style={unstyled ? undefined : { minWidth: '200px' }}>
          <div className={unstyled ? '' : 'r-ui-time-columns'}>
            <div className={unstyled ? '' : 'r-ui-time-col'}>
              {hours.map((h) => (
                <button key={h} type="button" className={unstyled ? '' : `r-ui-time-cell ${curH === h ? 'is-selected' : ''}`} onClick={() => onChange(`${h}:${curM}`)}>{h}h</button>
              ))}
            </div>
            <div className={unstyled ? '' : 'r-ui-time-col'}>
              {minutes.map((m) => (
                <button key={m} type="button" className={unstyled ? '' : `r-ui-time-cell ${curM === m ? 'is-selected' : ''}`} onClick={() => onChange(`${curH}:${m}`)}>{m}m</button>
              ))}
            </div>
          </div>
          <div className={unstyled ? '' : 'r-ui-date-footer'}>
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} onClick={() => setIsOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function DateTimePicker({
  label,
  hint,
  error,
  value,
  onChange,
  unstyled = false,
  className = ''
}: {
  label?: string;
  hint?: string;
  error?: string;
  value: RUiDateTimeValue;
  onChange: (val: RUiDateTimeValue) => void;
  unstyled?: boolean;
  className?: string;
}) {
  return (
    <div className={unstyled ? className : `r-ui-field-group ${error ? 'is-error' : ''} ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div className={unstyled ? '' : 'r-ui-form-grid'}>
        <DatePicker value={value.date} onChange={(date) => onChange({ ...value, date })} unstyled={unstyled} />
        <TimePicker value={value.time} onChange={(time) => onChange({ ...value, time })} unstyled={unstyled} />
      </div>
      {error && <span role="alert" className={unstyled ? '' : 'r-ui-field-error'}>{error}</span>}
      {!error && hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

/* 8.11 TagInput, SwitchField, CheckboxGroup, SliderField, ColorSwatchPicker, OtpInput */
export function TagInput({
  label,
  tags,
  onChange,
  placeholder = 'Add tag & press Enter...',
  unstyled = false,
  className = ''
}: {
  label?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  unstyled?: boolean;
  className?: string;
}) {
  const [draft, setDraft] = useState('');
  const addTag = (raw: string) => {
    const clean = raw.trim();
    if (clean && !tags.includes(clean)) onChange([...tags, clean]);
    setDraft('');
  };

  return (
    <div className={unstyled ? className : `r-ui-field-group ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div className={unstyled ? '' : 'r-ui-tag-input'}>
        {tags.map((t) => (
          <span key={t} className={unstyled ? '' : 'r-ui-chip'}>
            <span>{t}</span>
            <span role="button" tabIndex={0} className={unstyled ? '' : 'r-ui-chip__close'} onClick={() => onChange(tags.filter((x) => x !== t))}>✕</span>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(draft);
            } else if (e.key === 'Backspace' && !draft && tags.length > 0) {
              onChange(tags.slice(0, -1));
            }
          }}
          className={unstyled ? '' : 'r-ui-tag-input__field'}
        />
      </div>
    </div>
  );
}



export function SwitchField({
  title,
  description,
  checked,
  onChange,
  unstyled = false,
  className = ''
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  unstyled?: boolean;
  className?: string;
}) {
  return (
    <div className={unstyled ? className : `r-ui-switch-field ${className}`}>
      <div className={unstyled ? '' : 'r-ui-switch-field__meta'}>
        <span className={unstyled ? '' : 'r-ui-switch-field__title'}>{title}</span>
        {description && <span className={unstyled ? '' : 'r-ui-field-hint'}>{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={unstyled ? '' : `r-ui-switch ${checked ? 'is-active' : ''}`}
      >
        <span className={unstyled ? '' : 'r-ui-switch__thumb'} />
      </button>
    </div>
  );
}

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  direction = 'horizontal',
  unstyled = false,
  className = ''
}: {
  label?: string;
  options: RUiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  direction?: 'horizontal' | 'vertical';
  unstyled?: boolean;
  className?: string;
}) {
  const toggle = (v: string) => {
    onChange(selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v]);
  };
  return (
    <div className={unstyled ? className : `r-ui-field-group ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div className={unstyled ? '' : `r-ui-checkbox-group ${direction === 'vertical' ? 'r-ui-checkbox-group--vertical' : ''}`}>
        {options.map((opt) => {
          const checked = selectedValues.includes(opt.value);
          return (
            <label
              key={opt.value}
              className={unstyled ? '' : `r-ui-checkbox ${checked ? 'is-checked' : ''}`}
              onClick={() => !opt.disabled && toggle(opt.value)}
            >
              <span className={unstyled ? '' : 'r-ui-checkbox__box'}>{checked ? '✓' : ''}</span>
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}



export function ColorSwatchPicker({
  label,
  swatches,
  value,
  onChange,
  unstyled = false,
  className = ''
}: {
  label?: string;
  swatches: RUiColorSwatchOption[];
  value: string;
  onChange: (val: string) => void;
  unstyled?: boolean;
  className?: string;
}) {
  return (
    <div className={unstyled ? className : `r-ui-field-group ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div role="radiogroup" className={unstyled ? '' : 'r-ui-color-swatch-picker'}>
        {swatches.map((sw) => {
          const active = value === sw.value;
          return (
            <button
              key={sw.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={sw.label}
              title={sw.label}
              onClick={() => onChange(sw.value)}
              className={unstyled ? '' : `r-ui-color-swatch-btn ${active ? 'is-selected' : ''}`}
              style={{ backgroundColor: sw.value }}
            />
          );
        })}
      </div>
    </div>
  );
}



export function OtpInput({
  label,
  length = 6,
  value,
  onChange,
  unstyled = false,
  className = ''
}: {
  label?: string;
  length?: number;
  value: string;
  onChange: (val: string) => void;
  unstyled?: boolean;
  className?: string;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] || '');

  const updateAt = (idx: number, ch: string) => {
    const clean = ch.replace(/\D/g, '').slice(-1);
    const next = [...chars];
    next[idx] = clean;
    onChange(next.join(''));
    if (clean && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  return (
    <div className={unstyled ? className : `r-ui-field-group ${className}`}>
      {label && <span className={unstyled ? '' : 'r-ui-field-label'}>{label}</span>}
      <div className={unstyled ? '' : 'r-ui-otp-group'}>
        {chars.map((c, idx) => (
          <input
            key={idx}
            ref={(el) => { refs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={c}
            onChange={(e) => updateAt(idx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !chars[idx] && idx > 0) refs.current[idx - 1]?.focus();
            }}
            className={unstyled ? '' : 'r-ui-otp-cell'}
            aria-label={`Digit ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   9. EXTENDED FORM SUITE (SliderField, DualRangeSlider, Combobox, CheckboxCards, ToggleGroup, MonthPicker, CurrencyInput, KeyValueListInput, FormErrorSummary)
   ========================================================================== */
export function SliderField({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
  hint,
  unstyled = false,
  className = ''
}: {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  hint?: string;
  unstyled?: boolean;
  className?: string;
}) {
  return (
    <div className={unstyled ? className : `r-ui-slider-field ${className}`}>
      {label && (
        <div className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}</span>
          <strong className={unstyled ? '' : 'r-ui-mono'}>{value}{unit}</strong>
        </div>
      )}
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className={unstyled ? '' : 'r-ui-slider'} />
      {hint && <span className={unstyled ? '' : 'r-ui-field-hint'}>{hint}</span>}
    </div>
  );
}

export function DualRangeSlider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  unit = '',
  unstyled = false,
  className = ''
}: {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  unit?: string;
  unstyled?: boolean;
  className?: string;
}) {
  const [low, high] = value;
  const span = Math.max(1, max - min);
  const leftPct = ((low - min) / span) * 100;
  const widthPct = ((high - low) / span) * 100;

  return (
    <div className={unstyled ? className : `r-ui-slider-field ${className}`}>
      {label && (
        <div className={unstyled ? '' : 'r-ui-field-label'}>
          <span>{label}</span>
          <strong className={unstyled ? '' : 'r-ui-mono'}>{low}{unit} – {high}{unit}</strong>
        </div>
      )}
      <div className={unstyled ? '' : 'r-ui-dual-range'}>
        <div className={unstyled ? '' : 'r-ui-dual-range__track'}>
          <div className={unstyled ? '' : 'r-ui-dual-range__fill'} style={{ left: `${leftPct}%`, width: `${widthPct}%` }} />
        </div>
        <input type="range" min={min} max={max} step={step} value={low} aria-label="Minimum value" onChange={(e) => onChange([Math.min(Number(e.target.value), high - step), high])} className={unstyled ? '' : 'r-ui-dual-range__input'} />
        <input type="range" min={min} max={max} step={step} value={high} aria-label="Maximum value" onChange={(e) => onChange([low, Math.max(Number(e.target.value), low + step)])} className={unstyled ? '' : 'r-ui-dual-range__input'} />
      </div>
    </div>
  );
}

export function Combobox({
  id,
  label,
  hint,
  error,
  required,
  options,
  value,
  onChange,
  onCreateOption,
  placeholder = 'Select or type...',
  unstyled = false,
  className = ''
}: {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: RUiSelectOption[];
  value: string;
  onChange: (value: string) => void;
  onCreateOption?: (newValue: string) => void;
  placeholder?: string;
  unstyled?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const active = options.find((o) => o.value === value);
  const q = query.trim();
  const filtered = options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));
  const canCreate = Boolean(onCreateOption && q && !options.some((o) => o.label.toLowerCase() === q.toLowerCase()));

  return (
    <FieldEnvelope id={id} label={label} required={required} hint={hint} error={error} unstyled={unstyled} className={className}>
      <div className={unstyled ? '' : `r-ui-custom-select ${isOpen ? 'is-open' : ''}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false); }}>
        <button id={id} type="button" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" className={unstyled ? '' : 'r-ui-select-trigger'} onClick={() => setIsOpen((o) => !o)}>
          <span>{active ? active.label : (value || placeholder)}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {isOpen && (
          <div role="listbox" className={unstyled ? '' : 'r-ui-select-popover'} style={unstyled ? undefined : { display: 'flex' }}>
            <div className={unstyled ? '' : 'r-ui-select-search'}>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to filter or create..." className={unstyled ? '' : 'r-ui-input r-ui-input--sm'} />
            </div>
            {filtered.map((opt) => (
              <div key={opt.value} role="option" aria-selected={opt.value === value} className={unstyled ? '' : `r-ui-select-option ${opt.value === value ? 'is-selected' : ''}`} onClick={() => { onChange(opt.value); setQuery(''); setIsOpen(false); }}>
                <span>{opt.label}</span>
                {opt.value === value && <span>✓</span>}
              </div>
            ))}
            {canCreate && (
              <div role="option" aria-selected={false} className={unstyled ? '' : 'r-ui-select-option'} onClick={() => { onCreateOption?.(q); onChange(q); setQuery(''); setIsOpen(false); }}>
                <span>+ Create "{q}"</span>
              </div>
            )}
          </div>
        )}
      </div>
    </FieldEnvelope>
  );
}

export function CheckboxCardGroup({
  label,
  hint,
  error,
  options,
  selectedValues,
  onChange,
  unstyled = false,
  className = ''
}: {
  label?: string;
  hint?: string;
  error?: string;
  options: RUiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  unstyled?: boolean;
  className?: string;
}) {
  const toggle = (v: string) => onChange(selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v]);
  return (
    <FieldEnvelope label={label} hint={hint} error={error} unstyled={unstyled} className={className}>
      <div className={unstyled ? '' : 'r-ui-checkbox-cards'}>
        {options.map((opt) => {
          const checked = selectedValues.includes(opt.value);
          return (
            <div key={opt.value} role="checkbox" aria-checked={checked} tabIndex={0} onClick={() => !opt.disabled && toggle(opt.value)} onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !opt.disabled) { e.preventDefault(); toggle(opt.value); } }} className={unstyled ? '' : `r-ui-checkbox-card ${checked ? 'is-selected' : ''}`}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{opt.label}</div>
                {opt.description && <div className={unstyled ? '' : 'r-ui-field-hint'}>{opt.description}</div>}
              </div>
              <span className={unstyled ? '' : `r-ui-checkbox ${checked ? 'is-checked' : ''}`}><span className={unstyled ? '' : 'r-ui-checkbox__box'}>{checked ? '✓' : ''}</span></span>
            </div>
          );
        })}
      </div>
    </FieldEnvelope>
  );
}

export function ToggleGroup({ label, options, value, onChange, unstyled = false, className = '' }: { label?: string; options: RUiSelectOption[]; value: string; onChange: (val: string) => void; unstyled?: boolean; className?: string; }) {
  return (
    <FieldEnvelope label={label} unstyled={unstyled} className={className}>
      <div role="radiogroup" className={unstyled ? '' : 'r-ui-toggle-group'}>
        {options.map((opt) => (
          <button key={opt.value} type="button" role="radio" aria-checked={opt.value === value} onClick={() => !opt.disabled && onChange(opt.value)} className={unstyled ? '' : `r-ui-toggle-group__item ${opt.value === value ? 'is-selected' : ''}`}>
            {opt.label}
          </button>
        ))}
      </div>
    </FieldEnvelope>
  );
}

export function MonthPicker({ label, hint, error, value, onChange, placeholder = 'Select month...', unstyled = false, className = '' }: { label?: string; hint?: string; error?: string; value: string | null; onChange: (ym: string | null) => void; placeholder?: string; unstyled?: boolean; className?: string; }) {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(() => (value ? Number(value.slice(0, 4)) : new Date().getFullYear()));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <FieldEnvelope label={label} hint={hint} error={error} unstyled={unstyled} className={className}>
      <div className={unstyled ? '' : `r-ui-date-picker ${isOpen ? 'is-open' : ''}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false); }}>
        <button type="button" aria-haspopup="dialog" aria-expanded={isOpen} className={unstyled ? '' : 'r-ui-date-trigger'} onClick={() => setIsOpen((o) => !o)}>
          <span className={unstyled ? '' : 'r-ui-date-trigger__value'}>{value || placeholder}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {isOpen && (
          <div role="dialog" aria-label="Choose month" className={unstyled ? '' : 'r-ui-date-popover'}>
            <div className={unstyled ? '' : 'r-ui-calendar-header'}>
              <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => setYear((y) => y - 1)} aria-label="Previous year">‹</button>
              <span className={unstyled ? '' : 'r-ui-calendar-title'}>{year}</span>
              <button type="button" className={unstyled ? '' : 'r-ui-calendar-nav-btn'} onClick={() => setYear((y) => y + 1)} aria-label="Next year">›</button>
            </div>
            <div className={unstyled ? '' : 'r-ui-month-grid'}>
              {months.map((m, i) => {
                const ym = `${year}-${String(i + 1).padStart(2, '0')}`;
                return (<button key={ym} type="button" className={unstyled ? '' : `r-ui-month-cell ${value === ym ? 'is-selected' : ''}`} onClick={() => { onChange(ym); setIsOpen(false); }}>{m}</button>);
              })}
            </div>
            <div className={unstyled ? '' : 'r-ui-date-footer'}>
              <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--xs'} onClick={() => { onChange(null); setIsOpen(false); }}>Clear</button>
            </div>
          </div>
        )}
      </div>
    </FieldEnvelope>
  );
}

export function CurrencyInput({ id, label, currency = 'USD', value, onChange, hint, error, required, unstyled = false, className = '' }: { id: string; label?: string; currency?: string; value: string; onChange: (val: string) => void; hint?: string; error?: string; required?: boolean; unstyled?: boolean; className?: string; }) {
  return <TextField id={id} label={label} required={required} hint={hint} error={error} prefix={currency} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, ''))} unstyled={unstyled} className={className} />;
}

export function KeyValueListInput({ label, rows, onChange, keyPlaceholder = 'KEY', valuePlaceholder = 'VALUE', unstyled = false, className = '' }: { label?: string; rows: RUiKeyValuePair[]; onChange: (rows: RUiKeyValuePair[]) => void; keyPlaceholder?: string; valuePlaceholder?: string; unstyled?: boolean; className?: string; }) {
  const update = (id: string, patch: Partial<RUiKeyValuePair>) => onChange(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => onChange([...rows, { id: `kv-${Date.now()}`, key: '', value: '' }]);
  const removeRow = (id: string) => onChange(rows.filter((r) => r.id !== id));

  return (
    <FieldEnvelope label={label} unstyled={unstyled} className={className}>
      <div className={unstyled ? '' : 'r-ui-kv-editor'}>
        {rows.map((r) => (
          <div key={r.id} className={unstyled ? '' : 'r-ui-kv-editor__row'}>
            <input type="text" value={r.key} placeholder={keyPlaceholder} onChange={(e) => update(r.id, { key: e.target.value })} className={unstyled ? '' : 'r-ui-input r-ui-mono'} />
            <input type={r.secret ? 'password' : 'text'} value={r.value} placeholder={valuePlaceholder} onChange={(e) => update(r.id, { value: e.target.value })} className={unstyled ? '' : 'r-ui-input r-ui-mono'} />
            <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--ghost r-ui-btn--sm'} onClick={() => removeRow(r.id)} aria-label="Remove row">✕</button>
          </div>
        ))}
        <div><button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--secondary r-ui-btn--sm'} onClick={addRow}>+ Add Variable</button></div>
      </div>
    </FieldEnvelope>
  );
}

export function FormErrorSummary({ title = 'Please fix the following errors', errors, unstyled = false, className = '' }: { title?: string; errors: RUiFormErrorItem[]; unstyled?: boolean; className?: string; }) {
  if (!errors.length) return null;
  return (
    <div role="alert" className={unstyled ? className : `r-ui-form-error-summary ${className}`}>
      <div className={unstyled ? '' : 'r-ui-alert__title'}>{title} ({errors.length})</div>
      <ul className={unstyled ? '' : 'r-ui-form-error-summary__list'}>
        {errors.map((err) => (
          <li key={err.fieldId}><button type="button" className={unstyled ? '' : 'r-ui-form-error-summary__link'} onClick={() => document.getElementById(err.fieldId)?.focus()}>{err.label}: {err.message}</button></li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   10. OVERLAYS, NAVIGATION, FEEDBACK & DATA DISPLAY SUITE (Batch 2)
   ========================================================================== */
export function Tooltip({ content, placement = 'top', unstyled = false, children }: { content: string; placement?: 'top' | 'bottom'; unstyled?: boolean; children: React.ReactNode; }) {
  return (
    <span className={unstyled ? '' : 'r-ui-tooltip-wrap'}>
      {children}
      <span role="tooltip" className={unstyled ? '' : `r-ui-tooltip ${placement === 'bottom' ? 'r-ui-tooltip--bottom' : ''}`}>{content}</span>
    </span>
  );
}

export function DropdownMenu({ triggerLabel = 'Actions', items, unstyled = false, className = '' }: { triggerLabel?: React.ReactNode; items: RUiDropdownItem[]; unstyled?: boolean; className?: string; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={unstyled ? className : `r-ui-dropdown ${className}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button type="button" aria-expanded={open} aria-haspopup="menu" className={unstyled ? '' : 'r-ui-dropdown-trigger'} onClick={() => setOpen((o) => !o)}>
        <span>{triggerLabel}</span>
        <span className={unstyled ? '' : 'r-ui-dropdown-chevron'} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="menu" className={unstyled ? '' : 'r-ui-dropdown-menu'}>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {item.dividerBefore && <div className={unstyled ? '' : 'r-ui-dropdown-divider'} />}
              <button type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect(); setOpen(false); }} className={unstyled ? '' : `r-ui-dropdown-item ${item.destructive ? 'r-ui-dropdown-item--destructive' : ''}`}>
                <span>{item.label}</span>
                {item.shortcut && <span className={unstyled ? '' : 'r-ui-dropdown-shortcut'}>{item.shortcut}</span>}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export function DestructiveConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmPhrase, confirmLabel = 'Confirm Delete', unstyled = false }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; confirmPhrase: string; confirmLabel?: string; unstyled?: boolean; }) {
  const [typed, setTyped] = useState('');
  const canConfirm = typed === confirmPhrase;
  return (
    <Modal isOpen={isOpen} onClose={onClose} unstyled={unstyled}>
      <Modal.Header><Modal.Title>{title}</Modal.Title></Modal.Header>
      <Modal.Body>
        <div className={unstyled ? '' : 'r-ui-form'}>
          <p style={{ fontSize: '0.8125rem' }}>{description}</p>
          <TextField id="destructive-confirm-input" label={`Type "${confirmPhrase}" to confirm`} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={confirmPhrase} unstyled={unstyled} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className={unstyled ? '' : 'r-ui-btn r-ui-btn--secondary'} onClick={onClose}>Cancel</button>
        <button type="button" disabled={!canConfirm} className={unstyled ? '' : 'r-ui-btn r-ui-btn--destructive'} onClick={() => { if (canConfirm) { onConfirm(); setTyped(''); onClose(); } }}>{confirmLabel}</button>
      </Modal.Footer>
    </Modal>
  );
}

export function TreeView({ nodes, selectedId, onSelect, unstyled = false, className = '' }: { nodes: RUiTreeNode[]; selectedId?: string; onSelect: (id: string) => void; unstyled?: boolean; className?: string; }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const renderNodes = (list: RUiTreeNode[]) => (
    <div role="tree" className={unstyled ? '' : 'r-ui-tree'}>
      {list.map((node) => {
        const hasChildren = Boolean(node.children?.length);
        const isOpen = Boolean(expanded[node.id]);
        return (
          <div key={node.id} role="treeitem" aria-expanded={hasChildren ? isOpen : undefined}>
            <button type="button" className={unstyled ? '' : `r-ui-tree-node ${selectedId === node.id ? 'is-selected' : ''}`} onClick={() => { if (hasChildren) toggle(node.id); onSelect(node.id); }}>
              <span>{hasChildren ? (isOpen ? '▾' : '▸') : '•'}</span>
              <span>{node.label}</span>
              {node.badge && <span className={unstyled ? '' : 'r-ui-badge'} style={{ marginLeft: 'auto' }}>{node.badge}</span>}
            </button>
            {hasChildren && isOpen && node.children && <div className={unstyled ? '' : 'r-ui-tree-children'}>{renderNodes(node.children)}</div>}
          </div>
        );
      })}
    </div>
  );
  return <div className={className}>{renderNodes(nodes)}</div>;
}

export function Spinner({ size = 16, label = 'Loading...', unstyled = false }: { size?: number; label?: string; unstyled?: boolean }) {
  return <span role="status" aria-label={label} className={unstyled ? '' : 'r-ui-spinner'} style={{ width: size, height: size }} />;
}

export function ProgressBar({ value, max = 100, label, unstyled = false }: { value: number; max?: number; label?: string; unstyled?: boolean }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / Math.max(1, max)) * 100)));
  return (
    <div className={unstyled ? '' : 'r-ui-field-group'}>
      {label && <div className={unstyled ? '' : 'r-ui-field-label'}><span>{label}</span><span className={unstyled ? '' : 'r-ui-mono'}>{pct}%</span></div>}
      <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className={unstyled ? '' : 'r-ui-progress-track'}>
        <div className={unstyled ? '' : 'r-ui-progress-fill'} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action, unstyled = false }: { title: string; description?: string; action?: React.ReactNode; unstyled?: boolean }) {
  return (
    <div className={unstyled ? '' : 'r-ui-empty-state'}>
      <div className={unstyled ? '' : 'r-ui-empty-state__title'}>{title}</div>
      {description && <div className={unstyled ? '' : 'r-ui-empty-state__desc'}>{description}</div>}
      {action}
    </div>
  );
}

export function Skeleton({ width = '100%', height = 16, unstyled = false }: { width?: string | number; height?: string | number; unstyled?: boolean }) {
  return <div aria-hidden="true" className={unstyled ? '' : 'r-ui-skeleton'} style={{ width, height }} />;
}

export function Breadcrumb({ items, unstyled = false }: { items: RUiBreadcrumbItem[]; unstyled?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={unstyled ? '' : 'r-ui-breadcrumbs'}>
      {items.map((item, idx) => (
        <React.Fragment key={item.id}>
          {idx > 0 && <span className={unstyled ? '' : 'r-ui-breadcrumb-separator'}>/</span>}
          <span className={unstyled ? '' : `r-ui-breadcrumb-item ${idx === items.length - 1 ? 'is-current' : ''}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <button type="button" onClick={item.onClick} style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: item.onClick ? 'pointer' : 'default' }}>{item.label}</button>}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}

export function SegmentedControl({ options, value, onChange, unstyled = false }: { options: RUiSelectOption[]; value: string; onChange: (val: string) => void; unstyled?: boolean }) {
  return (
    <div role="tablist" className={unstyled ? '' : 'r-ui-segmented-control'}>
      {options.map((opt) => (
        <button key={opt.value} type="button" role="tab" aria-selected={opt.value === value} onClick={() => onChange(opt.value)} className={unstyled ? '' : `r-ui-segmented-btn ${opt.value === value ? 'is-active' : ''}`}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function FadeRail({ children, unstyled = false }: { children: React.ReactNode; unstyled?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div className={unstyled ? '' : 'r-ui-fade-rail'}>
      <button type="button" aria-label="Scroll left" className={unstyled ? '' : 'r-ui-fade-rail__btn r-ui-fade-rail__btn--prev'} onClick={() => trackRef.current?.scrollBy({ left: -140, behavior: 'smooth' })}>‹</button>
      <div ref={trackRef} className={unstyled ? '' : 'r-ui-fade-rail__track'}>{children}</div>
      <button type="button" aria-label="Scroll right" className={unstyled ? '' : 'r-ui-fade-rail__btn r-ui-fade-rail__btn--next'} onClick={() => trackRef.current?.scrollBy({ left: 140, behavior: 'smooth' })}>›</button>
    </div>
  );
}

export function DataTable<T extends { id: string }>({ columns, rows, sortKey, sortAsc = true, onSort, emptyState, unstyled = false }: { columns: RUiTableColumn<T>[]; rows: T[]; sortKey?: string; sortAsc?: boolean; onSort?: (key: string) => void; emptyState?: React.ReactNode; unstyled?: boolean; }) {
  return (
    <div className={unstyled ? '' : 'r-ui-table-container'}>
      <table className={unstyled ? '' : 'r-ui-table'}>
        <thead>
          <tr>{columns.map((col) => (<th key={col.key} onClick={() => col.sortable && onSort?.(col.key)} className={unstyled ? '' : col.sortable ? 'is-sortable' : ''}><span>{col.header}</span>{col.sortable && sortKey === col.key && <span> {sortAsc ? '↑' : '↓'}</span>}</th>))}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length}>{emptyState || <EmptyState title="No records found" />}</td></tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (<td key={col.key} className={unstyled ? '' : col.numeric ? 'is-number' : ''}>{col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}</td>))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ page, totalPages, onPageChange, summary, unstyled = false }: { page: number; totalPages: number; onPageChange: (next: number) => void; summary?: string; unstyled?: boolean; }) {
  return (
    <div className={unstyled ? '' : 'r-ui-pagination'}>
      <span>{summary || `Page ${page} of ${totalPages}`}</span>
      <div className={unstyled ? '' : 'r-ui-pagination-pages'}>
        <button type="button" disabled={page <= 1} className={unstyled ? '' : 'r-ui-page-btn'} onClick={() => onPageChange(page - 1)}>Prev</button>
        <button type="button" disabled={page >= totalPages} className={unstyled ? '' : 'r-ui-page-btn'} onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}



