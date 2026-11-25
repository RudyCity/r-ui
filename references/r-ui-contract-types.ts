/**
 * r-ui Contract Types & Variant Engine (v3.6.0)
 * Namespace: r-ui-*
 * Principles: Zero-Dependency, Type-Safe, Multi-Theme, Anti-Slop, 100% Componentized Forms
 */

export type RUiVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type RUiSize = 'xs' | 'sm' | 'md' | 'lg';
export type RUiControlSize = 'sm' | 'md' | 'lg';
export type RUiIntent = 'default' | 'info' | 'success' | 'warning' | 'error';
export type RUiValidationState = 'default' | 'error' | 'warning' | 'success';
export type RUiState = 'idle' | 'loading' | 'disabled';

export type RUiCanvasTheme =
  | 'dark-nebula'
  | 'clean-light'
  | 'slate-obsidian'
  | 'warm-sepia'
  | 'high-contrast';

export type RUiColorAccent =
  | 'cyan'
  | 'emerald'
  | 'violet'
  | 'crimson'
  | 'amber'
  | 'monochrome'
  | 'frost'
  | 'coral';

export interface RUiComponentContract {
  variant?: RUiVariant;
  size?: RUiSize;
  intent?: RUiIntent;
  state?: RUiState;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Toast Notification Contracts (v3.5.0)
 * Actionable toasts with tactile copy button and spring transitions.
 */
export interface RUiToastItem {
  id: string;
  title?: string;
  message: string;
  intent?: RUiIntent;
  duration?: number; // ms before auto-dismiss (default 4000ms), 0 = permanent
  copyable?: boolean; // enable copy-to-clipboard button
  copyText?: string; // custom string to copy (defaults to message)
  onCopy?: (copiedText: string) => void;
  onDismiss?: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface RUiToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: RUiToastItem;
  unstyled?: boolean;
}

export type RUiAlertPosition = 'inline' | 'above-form';

/**
 * In-Page Notification / Alert Contracts (v3.5.0)
 * Contextual alerts positioned inline or anchored directly above forms.
 */
export interface RUiAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: RUiIntent;
  title?: string;
  position?: RUiAlertPosition;
  copyable?: boolean;
  copyText?: string;
  onCopy?: (copiedText: string) => void;
  onDismiss?: () => void;
  dismissible?: boolean;
  unstyled?: boolean;
}

/**
 * Unified Componentized Form Contracts (v3.6.0 - Law 9)
 * 100% zero raw native widgets (select, date, date-range, time, checkbox, radio, slider, file).
 */
export interface RUiSelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export interface RUiDateRangeValue {
  start: string | null; // ISO YYYY-MM-DD
  end: string | null;   // ISO YYYY-MM-DD
  preset?: string;
}

export interface RUiDatePreset {
  id: string;
  label: string;
  getRange: () => { start: string; end: string };
}

export interface RUiFormFieldBaseProps {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  successMessage?: string;
  required?: boolean;
  disabled?: boolean;
  controlSize?: RUiControlSize;
  unstyled?: boolean;
}

export interface RUiDropzoneFile {
  id: string;
  name: string;
  size: number;
  type?: string;
  status?: 'ready' | 'uploading' | 'done' | 'error';
}

export interface RUiDateTimeValue {
  date: string | null; // ISO YYYY-MM-DD
  time: string;        // HH:mm
}

export interface RUiInputWithSelectValue {
  text: string;
  selected: string;
}

export interface RUiColorSwatchOption {
  value: string;
  label: string;
}

export interface RUiKeyValuePair {
  id: string;
  key: string;
  value: string;
  secret?: boolean;
}

export interface RUiFormErrorItem {
  fieldId: string;
  label: string;
  message: string;
}

export interface RUiTreeNode {
  id: string;
  label: string;
  badge?: string;
  children?: RUiTreeNode[];
}

export interface RUiBreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface RUiDropdownItem {
  id: string;
  label: string;
  shortcut?: string;
  destructive?: boolean;
  dividerBefore?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export interface RUiTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  numeric?: boolean;
  render?: (row: T) => React.ReactNode;
}

/**
 * Zero-Dependency helper to generate structured r-ui class names.
 * Prevents magic strings and styling inconsistencies.
 */
export function buildRUiClasses(
  baseClass: string,
  modifiers: {
    variant?: RUiVariant;
    size?: RUiSize;
    intent?: RUiIntent;
    state?: RUiState;
    custom?: string;
  }
): string {
  const classes: string[] = [baseClass];

  if (modifiers.variant) classes.push(`${baseClass}--${modifiers.variant}`);
  if (modifiers.size) classes.push(`${baseClass}--${modifiers.size}`);
  if (modifiers.intent && modifiers.intent !== 'default') classes.push(`${baseClass}--intent-${modifiers.intent}`);
  if (modifiers.state && modifiers.state !== 'idle') classes.push(`is-${modifiers.state}`);
  if (modifiers.custom) classes.push(modifiers.custom.trim());

  return classes.filter(Boolean).join(' ');
}
