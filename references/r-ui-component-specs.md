# r-ui: Complete Component Anatomy & Interaction Specifications (v3.6.0)

Comprehensive modular component specifications for production-grade Universal UI/UX Design System.
**Visual-first**, anti-slop, free of murky dark shadows, free of neon/glow effects, and 100% powered by native --r-ui-* tokens.

---

## 1. Action Button System & Precision Height Scale (Law 12 Compliance)
Interactive buttons with tactile spring physics, standardized height rhythm, zero-neon discipline, and strict visual precision.
**Strict Ban (Law 12)**: Never generate bloated/oversized buttons (>42px in dashboards/SaaS) or mismatched heights between sibling buttons in toolbars or modal action bars.

```css
.r-ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--r-ui-space-2);
  line-height: 1;
  font-family: inherit;
  font-weight: 600;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  touch-action: manipulation;
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring-snappy),
              background-color var(--r-ui-duration-fast) ease,
              border-color var(--r-ui-duration-fast) ease,
              box-shadow var(--r-ui-duration-fast) ease;
}
.r-ui-btn:active { transform: scale(0.97); }

/* STANDARDIZED HEIGHT TIERS (ANTI-BLOAT & STRICT SCALE HARMONY) */
.r-ui-btn--xs {
  height: 24px;
  min-height: 24px;
  padding: 0 8px;
  font-size: 0.6875rem; /* 11px */
  gap: 4px;
}
.r-ui-btn--sm {
  height: 30px;
  min-height: 30px;
  padding: 0 10px;
  font-size: 0.75rem; /* 12px */
  gap: 6px;
}
.r-ui-btn--md,
.r-ui-btn:not([class*="--xs"]):not([class*="--sm"]):not([class*="--lg"]) {
  height: 34px; /* Standard default */
  min-height: 34px;
  padding: 0 14px;
  font-size: 0.8125rem; /* 13px */
  gap: 6px;
}
.r-ui-btn--lg {
  height: 40px; /* Hard ceiling: max 42px */
  min-height: 40px;
  padding: 0 18px;
  font-size: 0.875rem; /* 14px */
  gap: 8px;
}

/* BUTTON GROUPS & ACTION BARS (STRICT HEIGHT HARMONY & BASELINE ALIGNMENT) */
.r-ui-btn-group {
  display: inline-flex;
  align-items: center;
  gap: var(--r-ui-space-2);
}
/* Ensure all sibling buttons in group share identical height */
.r-ui-btn-group > .r-ui-btn {
  flex-shrink: 0;
}

/* Attached Button Group (Segmented / Connected actions) */
.r-ui-btn-group--attached {
  gap: 0;
}
.r-ui-btn-group--attached > .r-ui-btn:not(:first-child) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.r-ui-btn-group--attached > .r-ui-btn:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.r-ui-btn-group--attached > .r-ui-btn:hover,
.r-ui-btn-group--attached > .r-ui-btn:focus {
  z-index: 1;
}

/* Variants */
.r-ui-btn--primary {
  background-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
  box-shadow: var(--r-ui-shadow-xs);
}
.r-ui-btn--primary:hover {
  filter: brightness(1.08);
  box-shadow: var(--r-ui-shadow-sm);
}
.r-ui-btn--secondary {
  background-color: var(--r-ui-color-surface-elevated);
  border-color: var(--r-ui-color-border-standard);
  color: var(--r-ui-color-text-primary);
  box-shadow: var(--r-ui-border-inner-glass);
}
.r-ui-btn--secondary:hover {
  background-color: var(--r-ui-color-surface-hover);
  border-color: var(--r-ui-color-border-strong);
}
.r-ui-btn--ghost {
  background: transparent;
  color: var(--r-ui-color-text-secondary);
}
.r-ui-btn--ghost:hover {
  background-color: var(--r-ui-color-surface-hover);
  color: var(--r-ui-color-text-primary);
}
.r-ui-btn--destructive {
  background: var(--r-ui-color-error-bg);
  border-color: rgba(244, 63, 94, 0.25);
  color: var(--r-ui-color-error);
}
.r-ui-btn--destructive:hover {
  background: rgba(244, 63, 94, 0.15);
  border-color: rgba(244, 63, 94, 0.4);
}
.r-ui-btn--outline {
  background: transparent;
  border-color: var(--r-ui-color-border-standard);
  color: var(--r-ui-color-text-primary);
}
.r-ui-btn--outline:hover {
  background-color: var(--r-ui-color-surface-hover);
  border-color: var(--r-ui-color-border-strong);
}
```

---

## 2. Unified Form Envelope & Accessible Form Controls (Zero Native Forms)
All form controls (`Input`, `Textarea`, `NumberStepper`, `Select`, `MultiSelect`, `DatePicker`, `DateRangePicker`, `TimePicker`, `Button`) share `--r-ui-control-h-sm` (30px), `--r-ui-control-h-md` (34px), and `--r-ui-control-h-lg` (40px) for 100% horizontal alignment.

```css
/* Form Envelope & Layout Grid */
.r-ui-form {
  display: flex;
  flex-direction: column;
  gap: var(--r-ui-space-4);
  width: 100%;
}
.r-ui-form-section {
  display: flex;
  flex-direction: column;
  gap: var(--r-ui-space-3);
  padding-top: var(--r-ui-space-3);
  border-top: 1px solid var(--r-ui-color-border-subtle);
}
.r-ui-form-section:first-child {
  padding-top: 0;
  border-top: none;
}
.r-ui-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--r-ui-space-3);
}
@media (max-width: 640px) {
  .r-ui-form-grid { grid-template-columns: 1fr; }
}
.r-ui-form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--r-ui-space-2);
  padding-top: var(--r-ui-space-3);
  border-top: 1px solid var(--r-ui-color-border-subtle);
}

/* Field Group Envelope */
.r-ui-field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.r-ui-field-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--r-ui-color-text-primary);
}
.r-ui-field-required {
  color: var(--r-ui-color-error);
  margin-left: 2px;
}
.r-ui-field-hint {
  font-size: 0.6875rem;
  color: var(--r-ui-color-text-tertiary);
}
.r-ui-field-error {
  font-size: 0.6875rem;
  color: var(--r-ui-color-error);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.r-ui-field-success {
  font-size: 0.6875rem;
  color: var(--r-ui-color-success);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Input, Prefix/Suffix Group & Textarea */
.r-ui-input-wrapper,
.r-ui-input-group {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--r-ui-control-h-md, 34px);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  transition: border-color var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              box-shadow var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              background-color var(--r-ui-duration-fast) ease;
}
.r-ui-input-group:focus-within {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
  background-color: var(--r-ui-color-surface);
}
.r-ui-input-group.is-error {
  border-color: var(--r-ui-color-error);
  box-shadow: 0 0 0 1px var(--r-ui-color-error);
}
.r-ui-input-group.is-success {
  border-color: var(--r-ui-color-success);
}
.r-ui-input-group__addon {
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  color: var(--r-ui-color-text-tertiary);
  font-size: 0.75rem;
  font-family: var(--r-ui-font-family-mono);
  white-space: nowrap;
  user-select: none;
}
.r-ui-input-group .r-ui-input {
  border: none;
  box-shadow: none;
  background: transparent;
  min-height: calc(var(--r-ui-control-h-md, 34px) - 2px);
}
.r-ui-input-group .r-ui-input:focus {
  border: none;
  box-shadow: none;
  background: transparent;
}
.r-ui-input {
  width: 100%;
  height: var(--r-ui-control-h-md, 34px);
  min-height: var(--r-ui-control-h-md, 34px);
  padding: 0 var(--r-ui-space-3);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  font-family: inherit;
  outline: none;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-input--sm { height: var(--r-ui-control-h-sm, 30px); min-height: var(--r-ui-control-h-sm, 30px); font-size: 0.75rem; }
.r-ui-input--lg { height: var(--r-ui-control-h-lg, 40px); min-height: var(--r-ui-control-h-lg, 40px); font-size: 0.875rem; }
.r-ui-input:focus {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
  background-color: var(--r-ui-color-surface);
}
.r-ui-input.is-error {
  border-color: var(--r-ui-color-error);
  box-shadow: 0 0 0 1px var(--r-ui-color-error);
}
.r-ui-input.is-success {
  border-color: var(--r-ui-color-success);
}

/* Textarea with Character Counter */
.r-ui-textarea {
  width: 100%;
  min-height: 84px;
  padding: 8px var(--r-ui-space-3);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  font-family: inherit;
  line-height: 1.45;
  resize: vertical;
  outline: none;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-textarea:focus {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
  background-color: var(--r-ui-color-surface);
}
.r-ui-textarea-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6875rem;
  color: var(--r-ui-color-text-tertiary);
}
.r-ui-textarea-counter {
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
}

/* Number Stepper */
.r-ui-number-stepper {
  display: inline-flex;
  align-items: center;
  height: var(--r-ui-control-h-md, 34px);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  background-color: var(--r-ui-color-surface-elevated);
  overflow: hidden;
}
.r-ui-number-stepper__btn {
  width: 32px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--r-ui-color-text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color var(--r-ui-duration-fast) ease, color var(--r-ui-duration-fast) ease;
}
.r-ui-number-stepper__btn:hover:not(:disabled) {
  background-color: var(--r-ui-color-surface-hover);
  color: var(--r-ui-color-text-primary);
}
.r-ui-number-stepper__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.r-ui-number-stepper__input {
  width: 64px;
  height: 100%;
  border: none;
  border-left: 1px solid var(--r-ui-color-border-subtle);
  border-right: 1px solid var(--r-ui-color-border-subtle);
  background: transparent;
  color: var(--r-ui-color-text-primary);
  text-align: center;
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
  font-size: 0.8125rem;
  outline: none;
}
```

---

## 3. Custom Accessible Select Component (BANS RAW NATIVE <select>)

Raw native <select> and <option> elements are **strictly banned** because OS popups break dark themes and CSS custom properties. Use -ui Custom Select Component:

```css
.r-ui-custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.r-ui-select-trigger {
  width: 100%;
  min-height: 34px;
  padding: 6px var(--r-ui-space-3);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  cursor: pointer;
  user-select: none;
  box-shadow: var(--r-ui-border-inner-glass);
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}

.r-ui-select-trigger:hover {
  border-color: var(--r-ui-color-border-strong);
  background-color: var(--r-ui-color-surface-overlay);
}

.r-ui-select-trigger:focus-visible,
.r-ui-custom-select.is-open .r-ui-select-trigger {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
  outline: none;
}

.r-ui-select-chevron {
  width: 14px;
  height: 14px;
  color: var(--r-ui-color-text-tertiary);
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring);
  flex-shrink: 0;
}

.r-ui-custom-select.is-open .r-ui-select-chevron {
  transform: rotate(180deg);
  color: var(--r-ui-color-accent-primary);
}

.r-ui-select-popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: var(--r-ui-z-dropdown);
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-xs);
  box-shadow: var(--r-ui-shadow-lg), var(--r-ui-border-inner-glass);
  max-height: 240px;
  overflow-y: auto;
  display: none;
  flex-direction: column;
  padding: 4px;
  gap: 2px;
  animation: r-ui-popover-in 0.16s var(--r-ui-ease-spring);
}

.r-ui-custom-select.is-open .r-ui-select-popover {
  display: flex;
}

.r-ui-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 2px;
  color: var(--r-ui-color-text-secondary);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) ease;
}

.r-ui-select-option:hover,
.r-ui-select-option.is-focused {
  background-color: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-primary);
}

.r-ui-select-option.is-selected {
  background-color: var(--r-ui-color-surface-overlay);
  color: var(--r-ui-color-accent-primary);
  font-weight: 600;
}
```

---

## 4. Tactile Spring Toggle / Switch
```css
.r-ui-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 22px;
  background-color: var(--r-ui-color-surface-overlay);
  border-radius: var(--r-ui-radius-full);
  border: 1px solid var(--r-ui-color-border-standard);
  cursor: pointer;
  transition: background-color var(--r-ui-duration-fast) ease;
}
.r-ui-switch.is-active {
  background-color: var(--r-ui-color-accent-primary);
  border-color: var(--r-ui-color-accent-primary);
}
.r-ui-switch__thumb {
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: var(--r-ui-shadow-xs);
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-switch.is-active .r-ui-switch__thumb {
  transform: translateX(18px);
  background-color: var(--r-ui-color-text-inverse);
}
```

---

## 5. Custom Checkbox & Radio
```css
.r-ui-checkbox, .r-ui-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--r-ui-space-2);
  cursor: pointer;
  font-size: 0.8125rem;
  user-select: none;
}
.r-ui-checkbox__box {
  width: 16px;
  height: 16px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-strong);
  background-color: var(--r-ui-color-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--r-ui-duration-fast) ease;
}
.r-ui-checkbox.is-checked .r-ui-checkbox__box {
  background-color: var(--r-ui-color-accent-primary);
  border-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
}
.r-ui-radio__circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--r-ui-color-border-strong);
  background-color: var(--r-ui-color-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
}
.r-ui-radio.is-checked .r-ui-radio__circle::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--r-ui-color-accent-primary);
}
```

---

## 6. Status Badges & Pulse Indicators
```css
.r-ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--r-ui-font-family-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid transparent;
}
.r-ui-badge--success { background: var(--r-ui-color-success-bg); color: var(--r-ui-color-success); border-color: rgba(16, 185, 129, 0.2); }
.r-ui-badge--warning { background: var(--r-ui-color-warning-bg); color: var(--r-ui-color-warning); border-color: rgba(245, 158, 11, 0.2); }
.r-ui-badge--error { background: var(--r-ui-color-error-bg); color: var(--r-ui-color-error); border-color: rgba(244, 63, 94, 0.2); }
.r-ui-badge--info { background: var(--r-ui-color-info-bg); color: var(--r-ui-color-info); border-color: rgba(14, 165, 233, 0.2); }
```

---

## 7. Avatars & Avatar Groups
```css
.r-ui-avatar {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--r-ui-color-surface-overlay);
  border: 1px solid var(--r-ui-color-border-standard);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}
.r-ui-avatar-group {
  display: flex;
  align-items: center;
}
.r-ui-avatar-group .r-ui-avatar {
  margin-left: -8px;
  border: 2px solid var(--r-ui-color-surface);
}
.r-ui-avatar-group .r-ui-avatar:first-child { margin-left: 0; }
```

---

## 8. Tabs & Accordions
```css
.r-ui-tabs-nav {
  display: flex;
  align-items: center;
  gap: var(--r-ui-space-2);
  border-bottom: 1px solid var(--r-ui-color-border-standard);
}
.r-ui-tab-btn {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--r-ui-color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 8px var(--r-ui-space-3);
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) ease;
}
.r-ui-tab-btn.is-active {
  color: var(--r-ui-color-accent-primary);
  border-bottom-color: var(--r-ui-color-accent-primary);
}
.r-ui-accordion-item {
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  overflow: hidden;
  background-color: var(--r-ui-color-surface);
}
.r-ui-accordion-header {
  padding: var(--r-ui-space-3) var(--r-ui-space-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  font-weight: 600;
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-accordion-content {
  padding: var(--r-ui-space-3) var(--r-ui-space-4);
  font-size: 0.8125rem;
  color: var(--r-ui-color-text-secondary);
  display: none;
}
.r-ui-accordion-item.is-open .r-ui-accordion-content {
  display: block;
}
```

---

## 9. Actionable Toast Notifications & Above-Form Page Alerts (v3.5.0)

```css
/* ==========================================================================
   TOAST NOTIFICATION STACK (ACTIONABLE WITH TACTILE COPY)
   ========================================================================== */
.r-ui-toast-container {
  position: fixed;
  bottom: var(--r-ui-space-5);
  right: var(--r-ui-space-5);
  display: flex;
  flex-direction: column;
  gap: var(--r-ui-space-2);
  z-index: var(--r-ui-z-toast);
  pointer-events: none;
  max-width: calc(100vw - 32px);
}

.r-ui-toast {
  pointer-events: auto;
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-sm);
  padding: var(--r-ui-space-3) var(--r-ui-space-4);
  box-shadow: var(--r-ui-shadow-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--r-ui-space-3);
  font-size: 0.8125rem;
  min-width: 300px;
  max-width: 440px;
  animation: r-ui-slide-toast 0.24s var(--r-ui-ease-spring-snappy);
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring-snappy),
              opacity var(--r-ui-duration-fast) ease,
              border-color var(--r-ui-duration-fast) ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.r-ui-toast--success {
  border-color: rgba(16, 185, 129, 0.4);
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-toast--success .r-ui-toast__icon {
  color: #10b981;
}

.r-ui-toast--error {
  border-color: rgba(239, 68, 68, 0.45);
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-toast--error .r-ui-toast__icon {
  color: #ef4444;
}

.r-ui-toast--warning {
  border-color: rgba(245, 158, 11, 0.45);
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-toast--warning .r-ui-toast__icon {
  color: #f59e0b;
}

.r-ui-toast--info {
  border-color: rgba(14, 165, 233, 0.45);
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-toast--info .r-ui-toast__icon {
  color: #0ea5e9;
}

.r-ui-toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  flex-shrink: 0;
}

.r-ui-toast__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.r-ui-toast__title {
  font-weight: 600;
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  line-height: 1.25;
}

.r-ui-toast__message {
  color: var(--r-ui-color-text-secondary);
  font-size: 0.75rem;
  line-height: 1.4;
  word-break: break-word;
}

.r-ui-toast__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-left: var(--r-ui-space-1);
}

/* ==========================================================================
   REUSABLE TACTILE COPY BUTTON (.r-ui-copy-btn)
   ========================================================================== */
.r-ui-copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface);
  color: var(--r-ui-color-text-secondary);
  cursor: pointer;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring-snappy);
}

.r-ui-copy-btn:hover {
  background-color: var(--r-ui-color-surface-hover);
  color: var(--r-ui-color-text-primary);
  border-color: var(--r-ui-color-border-strong);
  transform: translateY(-1px);
}

.r-ui-copy-btn:active {
  transform: scale(0.94);
}

.r-ui-copy-btn.is-copied {
  border-color: rgba(16, 185, 129, 0.5);
  background-color: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.r-ui-toast__copy-btn {
  padding: 4px;
}

.r-ui-toast__action-btn {
  padding: 3px 8px;
  font-size: 0.6875rem;
  font-weight: 600;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background: var(--r-ui-color-surface);
  color: var(--r-ui-color-text-primary);
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring-snappy);
}
.r-ui-toast__action-btn:hover {
  background: var(--r-ui-color-surface-hover);
  border-color: var(--r-ui-color-border-strong);
}

.r-ui-toast__close-btn,
.r-ui-alert__close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: var(--r-ui-radius-xs);
  border: none;
  background: transparent;
  color: var(--r-ui-color-text-muted);
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) ease;
}
.r-ui-toast__close-btn:hover,
.r-ui-alert__close-btn:hover {
  color: var(--r-ui-color-text-primary);
  background-color: var(--r-ui-color-surface-hover);
}

/* ==========================================================================
   IN-PAGE NOTIFICATIONS & ABOVE-FORM ALERTS
   (Strictly Enforces Anti-Slop Law 11: 100% Crisp 1px Perimeter Border)
   ========================================================================== */
.r-ui-alert {
  width: 100%;
  display: block;
  border-radius: var(--r-ui-radius-sm);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface-elevated);
  font-size: 0.8125rem;
  line-height: var(--r-ui-leading-normal);
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring-snappy);
}

/* Specific Above-Form Placement Hierarchy */
.r-ui-alert--above-form {
  margin-bottom: var(--r-ui-space-4);
  position: relative;
  z-index: 2;
  box-shadow: var(--r-ui-shadow-xs);
  animation: r-ui-fade-down 0.2s var(--r-ui-ease-spring-snappy);
}

.r-ui-alert__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--r-ui-space-3);
  padding: var(--r-ui-space-3) var(--r-ui-space-4);
}

.r-ui-alert__body {
  flex: 1;
  min-width: 0;
}

.r-ui-alert__title {
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--r-ui-color-text-primary);
}

.r-ui-alert__description {
  font-size: 0.75rem;
  color: var(--r-ui-color-text-secondary);
  line-height: 1.45;
}

.r-ui-alert__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: var(--r-ui-space-2);
}

/* Intent Theming (Crisp 1px border + Soft Tinted Surface, Zero border-l-4) */
.r-ui-alert--info {
  border-color: rgba(14, 165, 233, 0.35);
  background-color: rgba(14, 165, 233, 0.08);
}
.r-ui-alert--info .r-ui-alert__title {
  color: #0ea5e9;
}

.r-ui-alert--warning {
  border-color: rgba(245, 158, 11, 0.35);
  background-color: rgba(245, 158, 11, 0.08);
}
.r-ui-alert--warning .r-ui-alert__title {
  color: #f59e0b;
}

.r-ui-alert--error {
  border-color: rgba(239, 68, 68, 0.38);
  background-color: rgba(239, 68, 68, 0.08);
}
.r-ui-alert--error .r-ui-alert__title {
  color: #ef4444;
}

.r-ui-alert--success {
  border-color: rgba(16, 185, 129, 0.35);
  background-color: rgba(16, 185, 129, 0.08);
}
.r-ui-alert--success .r-ui-alert__title {
  color: #10b981;
}

@keyframes r-ui-slide-toast {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes r-ui-fade-down {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 10. High-Density Data Grid & Table Pagination
```css
.r-ui-table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-sm);
  background-color: var(--r-ui-color-surface);
}

.r-ui-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8125rem;
}

.r-ui-table th {
  padding: 10px 14px;
  background-color: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-secondary);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--r-ui-color-border-standard);
  user-select: none;
}

.r-ui-table th.is-sortable {
  cursor: pointer;
  transition: color var(--r-ui-duration-fast) ease;
}

.r-ui-table th.is-sortable:hover {
  color: var(--r-ui-color-text-primary);
}

.r-ui-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--r-ui-color-border-subtle);
  color: var(--r-ui-color-text-primary);
  vertical-align: middle;
}

.r-ui-table tr:hover td {
  background-color: var(--r-ui-color-surface-overlay);
}

.r-ui-table tr.is-selected td {
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.08);
}

.r-ui-table td.is-number {
  text-align: right;
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
}

.r-ui-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--r-ui-color-border-standard);
  font-size: 0.8125rem;
  color: var(--r-ui-color-text-secondary);
  background-color: var(--r-ui-color-surface-elevated);
}
```

---

## 11. Metric KPI Cards & Architectural Telemetry Ribbon
```css
/* Metric Stat Card */
.r-ui-stat-card {
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: var(--r-ui-border-inner-glass);
}

.r-ui-stat-card__label {
  font-size: 0.75rem;
  color: var(--r-ui-color-text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.r-ui-stat-card__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--r-ui-color-text-primary);
  font-family: var(--r-ui-font-family-mono);
  letter-spacing: -0.02em;
}

.r-ui-stat-card__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

/* Card & Workspace Item Active Selection (BANS THICK ASYMMETRICAL LEFT BORDERS) */
/* ❌ STRICTLY BANNED: .r-ui-card.is-active { border-left: 4px solid #10b981; } (Corner collision slop) */
/* ✅ R-UI APPROVED PATTERN 1: Crisp 1px perimeter + soft accent background tint */
.r-ui-stat-card.is-active,
.r-ui-card--active,
.r-ui-workspace-card.is-active {
  border: 1px solid rgba(var(--r-ui-color-accent-primary-rgb), 0.45);
  background-color: rgba(var(--r-ui-color-accent-primary-rgb), 0.08);
  box-shadow: 0 0 0 1px rgba(var(--r-ui-color-accent-primary-rgb), 0.2);
}

/* ✅ R-UI APPROVED PATTERN 2: Decoupled floating vertical indicator pill inside padding */
.r-ui-workspace-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--r-ui-space-3);
  padding: 10px 14px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface);
}
.r-ui-workspace-card.is-active .r-ui-workspace-card__pill {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  border-radius: var(--r-ui-radius-full);
  background-color: var(--r-ui-color-accent-primary);
}

/* Telemetry Ribbon (Anti-Card Overuse) */
.r-ui-telemetry-ribbon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-sm);
  overflow: hidden;
}

.r-ui-telemetry-item {
  padding: 12px 16px;
  border-right: 1px solid var(--r-ui-color-border-standard);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.r-ui-telemetry-item:last-child {
  border-right: none;
}
```

---

## 12. Modal Dialog & Slide-Over Inspector Drawer
```css
/* Modal Backdrop & Dialog */
.r-ui-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--r-ui-z-modal);
  padding: var(--r-ui-space-4);
  animation: r-ui-fade-in 0.18s ease;
}

.r-ui-modal {
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-md);
  box-shadow: var(--r-ui-shadow-lg);
  width: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: r-ui-modal-in 0.2s var(--r-ui-ease-spring);
}

.r-ui-modal-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--r-ui-color-border-standard);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.9375rem;
}

.r-ui-modal-body {
  padding: 18px;
  overflow-y: auto;
  max-height: 70vh;
}

.r-ui-modal-footer {
  padding: 12px 18px;
  border-top: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--r-ui-space-2);
}

/* Slide-Over Drawer */
.r-ui-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 460px;
  background-color: var(--r-ui-color-surface);
  border-left: 1px solid var(--r-ui-color-border-strong);
  box-shadow: var(--r-ui-shadow-lg);
  z-index: var(--r-ui-z-modal);
  display: flex;
  flex-direction: column;
  animation: r-ui-slide-in-right 0.22s var(--r-ui-ease-spring);
}
```

---

## 13. Command Palette (`Ctrl + K`)
```css
.r-ui-command-dialog {
  width: 100%;
  max-width: 600px;
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-md);
  box-shadow: var(--r-ui-shadow-lg);
  overflow: hidden;
}

.r-ui-command-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--r-ui-color-border-standard);
}

.r-ui-command-input {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--r-ui-color-text-primary);
  font-size: 0.9375rem;
  outline: none;
}

.r-ui-command-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 6px;
}

.r-ui-command-group-heading {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--r-ui-color-text-tertiary);
  padding: 8px 10px 4px;
  font-weight: 600;
}

.r-ui-command-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-secondary);
  font-size: 0.8125rem;
  cursor: pointer;
}

.r-ui-command-item:hover,
.r-ui-command-item.is-active {
  background-color: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-primary);
}
```

---

## 14. Floating Bulk Action Bar
```css
.r-ui-bulk-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--r-ui-z-toast);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-full);
  padding: 8px 18px;
  box-shadow: var(--r-ui-shadow-lg);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: r-ui-slide-up 0.2s var(--r-ui-ease-spring);
}

.r-ui-bulk-bar__count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--r-ui-color-text-primary);
  padding-right: 12px;
  border-right: 1px solid var(--r-ui-color-border-standard);
}
```

---

## 15. Single-Screen Viewport-Fit Cockpit Layout
Strict 100dvh zero-page-scroll architecture with independent bounded scroll zones.

```css
/* Root Cockpit Framework */
.r-ui-cockpit-viewport {
  width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--r-ui-color-canvas);
  color: var(--r-ui-color-text-primary);
}

/* Compact Top Header */
.r-ui-cockpit-header {
  height: var(--r-ui-header-compact-h, 48px);
  min-height: var(--r-ui-header-compact-h, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--r-ui-space-4);
  border-bottom: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface);
  z-index: var(--r-ui-z-sticky);
}

/* Main Split Workspace */
.r-ui-cockpit-workspace {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
  position: relative;
}

/* Collapsible Cockpit Sidebar */
.r-ui-cockpit-sidebar {
  width: var(--r-ui-sidebar-expanded-w, 240px);
  min-width: var(--r-ui-sidebar-expanded-w, 240px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface);
  transition: width var(--r-ui-duration-normal) var(--r-ui-ease-spring),
              min-width var(--r-ui-duration-normal) var(--r-ui-ease-spring);
  overflow: hidden;
}

.r-ui-cockpit-sidebar.is-rail {
  width: var(--r-ui-sidebar-rail-w, 60px);
  min-width: var(--r-ui-sidebar-rail-w, 60px);
}

/* Central Workspace & Split Panes */
.r-ui-cockpit-main {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Bounded Scroll Inner Container */
.r-ui-bounded-pane {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--r-ui-color-border-standard) transparent;
  padding: var(--r-ui-space-4);
}

.r-ui-bounded-pane::-webkit-scrollbar {
  width: 6px;
}
.r-ui-bounded-pane::-webkit-scrollbar-thumb {
  background: var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-full);
}
```

---

## 16. Horizontal Icon & Tab Scroll Rail (Fade-Masked)
Clean zero-wrap horizontal scrolling for category icons, filters, and toolbars.

```css
.r-ui-fade-rail {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.r-ui-fade-rail__track {
  display: flex;
  align-items: center;
  gap: var(--r-ui-space-2);
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px 2px;
  mask-image: linear-gradient(
    to right,
    transparent 0px,
    black 20px,
    black calc(100% - 20px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0px,
    black 20px,
    black calc(100% - 20px),
    transparent 100%
  );
}
.r-ui-fade-rail__track::-webkit-scrollbar {
  display: none;
}

.r-ui-fade-rail__item {
  flex-shrink: 0;
  scroll-snap-align: start;
}

/* Chevron scroll indicators */
.r-ui-fade-rail__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: var(--r-ui-radius-full);
  background: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  color: var(--r-ui-color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: var(--r-ui-shadow-xs);
  opacity: 0.9;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-fade-rail__btn:hover {
  opacity: 1;
  background: var(--r-ui-color-surface-overlay);
  border-color: var(--r-ui-color-accent-primary);
}
.r-ui-fade-rail__btn--prev { left: 2px; }
.r-ui-fade-rail__btn--next { right: 2px; }
```

---

## 17. Multi-Tier Optical Icon Size Utilities
Calibrated sizing classes with integer pixel grid snapping and proportional strokes.

```css
.r-ui-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  color: currentColor;
}

/* 12px Micro Icon */
.r-ui-icon--micro {
  width: var(--r-ui-icon-micro, 12px);
  height: var(--r-ui-icon-micro, 12px);
  stroke-width: var(--r-ui-icon-stroke-heavy, 2);
}

/* 16px Compact Icon */
.r-ui-icon--sm {
  width: var(--r-ui-icon-sm, 16px);
  height: var(--r-ui-icon-sm, 16px);
  stroke-width: var(--r-ui-icon-stroke-std, 1.5);
}

/* 20px Standard Icon */
.r-ui-icon--md {
  width: var(--r-ui-icon-md, 20px);
  height: var(--r-ui-icon-md, 20px);
  stroke-width: var(--r-ui-icon-stroke-std, 1.5);
}

/* 24px Prominent Icon */
.r-ui-icon--lg {
  width: var(--r-ui-icon-lg, 24px);
  height: var(--r-ui-icon-lg, 24px);
  stroke-width: var(--r-ui-icon-stroke-std, 1.5);
}

/* 32px Hero Icon */
.r-ui-icon--xl {
  width: var(--r-ui-icon-xl, 32px);
  height: var(--r-ui-icon-xl, 32px);
  stroke-width: var(--r-ui-icon-stroke-thin, 1.25);
}
```

---

## 18. Micro-Typography & Optical Scale Classes
High-density visual rhythm balancing bold metrics against legible micro-metadata.

```css
/* Big KPI Stat Metric */
.r-ui-text-kpi {
  font-size: clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem);
  line-height: var(--r-ui-leading-tight, 1.15);
  font-weight: 800;
  letter-spacing: var(--r-ui-tracking-hero, -0.035em);
  font-variant-numeric: tabular-nums;
}

/* Section Subhead */
.r-ui-text-section-title {
  font-size: 0.875rem; /* 14px */
  line-height: var(--r-ui-leading-snug, 1.35);
  font-weight: 600;
  letter-spacing: var(--r-ui-tracking-title, -0.02em);
  color: var(--r-ui-color-text-primary);
}

/* Standard UI Label */
.r-ui-text-ui {
  font-size: 0.8125rem; /* 13px */
  line-height: var(--r-ui-leading-snug, 1.35);
  font-weight: 500;
  color: var(--r-ui-color-text-primary);
}

/* Micro Metadata Label */
.r-ui-text-caption {
  font-size: var(--r-ui-font-caption, 0.6875rem); /* 11px */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: var(--r-ui-tracking-wide, 0.04em);
  text-transform: uppercase;
  color: var(--r-ui-color-text-tertiary);
}

/* Nano Status Timestamp */
.r-ui-text-nano {
  font-size: var(--r-ui-font-nano, 0.625rem); /* 10px */
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: var(--r-ui-tracking-wider, 0.08em);
  font-variant-numeric: tabular-nums;
  color: var(--r-ui-color-text-muted);
}
```

---

## 19. Searchable Custom Dropdown Popover
Accessible W3C compliant dropdown maintaining pristine screen real-estate.

```css
.r-ui-dropdown {
  position: relative;
  display: inline-block;
}

.r-ui-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  min-height: 32px;
  padding: 4px 10px;
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}

.r-ui-dropdown-trigger:hover {
  border-color: var(--r-ui-color-border-strong);
  background-color: var(--r-ui-color-surface-overlay);
}

.r-ui-dropdown-trigger[aria-expanded="true"] .r-ui-dropdown-chevron {
  transform: rotate(180deg);
}

.r-ui-dropdown-chevron {
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}

.r-ui-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  background-color: var(--r-ui-color-surface-overlay);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-sm);
  box-shadow: var(--r-ui-shadow-md);
  backdrop-filter: blur(12px);
  padding: 4px;
  z-index: var(--r-ui-z-dropdown);
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: r-ui-slide-down var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}

.r-ui-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--r-ui-space-2);
  padding: 6px 8px;
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-secondary);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all var(--r-ui-duration-instant) ease;
}

.r-ui-dropdown-item:hover,
.r-ui-dropdown-item.is-selected {
  background-color: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-primary);
}

.r-ui-dropdown-item.is-selected {
  color: var(--r-ui-color-accent-primary);
  font-weight: 600;
}
```

---

## 20. Componentized Date, Date-Range & Time Pickers (Law 9 Mandatory)
Replaces all native `<input type="date">`, `<input type="datetime-local">`, and `<input type="time">` with theme-reactive, accessible popovers.

```css
.r-ui-date-picker,
.r-ui-date-range-picker,
.r-ui-time-picker {
  position: relative;
  display: inline-block;
  width: 100%;
}

.r-ui-date-trigger {
  width: 100%;
  min-height: var(--r-ui-control-h-md, 34px);
  padding: 4px 10px;
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  cursor: pointer;
  user-select: none;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-date-trigger:hover {
  border-color: var(--r-ui-color-border-strong);
  background-color: var(--r-ui-color-surface-overlay);
}
.r-ui-date-trigger:focus-visible,
.r-ui-date-picker.is-open .r-ui-date-trigger,
.r-ui-date-range-picker.is-open .r-ui-date-trigger,
.r-ui-time-picker.is-open .r-ui-date-trigger {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
  outline: none;
}
.r-ui-date-trigger__value {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
  font-size: 0.75rem;
}

.r-ui-date-popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: var(--r-ui-z-popover, 60);
  min-width: 280px;
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-strong);
  border-radius: var(--r-ui-radius-sm);
  box-shadow: var(--r-ui-shadow-lg);
  padding: 12px;
  display: none;
  flex-direction: column;
  gap: 10px;
  animation: r-ui-popover-in 0.16s var(--r-ui-ease-spring);
}
.r-ui-date-range-picker .r-ui-date-popover {
  min-width: 320px;
}
.r-ui-date-picker.is-open .r-ui-date-popover,
.r-ui-date-range-picker.is-open .r-ui-date-popover,
.r-ui-time-picker.is-open .r-ui-date-popover {
  display: flex;
}

.r-ui-date-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--r-ui-color-border-subtle);
}
.r-ui-date-preset-btn {
  height: 24px;
  padding: 0 8px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-secondary);
  font-size: 0.6875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) ease;
}
.r-ui-date-preset-btn:hover {
  border-color: var(--r-ui-color-border-strong);
  color: var(--r-ui-color-text-primary);
}
.r-ui-date-preset-btn.is-active {
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.14);
  border-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-accent-primary);
}

.r-ui-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.r-ui-calendar-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--r-ui-color-text-primary);
}
.r-ui-calendar-nav-btn {
  width: 26px;
  height: 26px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.r-ui-calendar-nav-btn:hover {
  color: var(--r-ui-color-text-primary);
  border-color: var(--r-ui-color-border-strong);
}

.r-ui-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.r-ui-calendar-weekday {
  text-align: center;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--r-ui-color-text-tertiary);
  padding: 4px 0;
}
.r-ui-calendar-day {
  height: 30px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid transparent;
  background: transparent;
  color: var(--r-ui-color-text-primary);
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
  font-size: 0.75rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--r-ui-duration-instant) ease;
}
.r-ui-calendar-day:hover:not(:disabled) {
  background-color: var(--r-ui-color-surface-elevated);
  border-color: var(--r-ui-color-border-standard);
}
.r-ui-calendar-day.is-outside {
  color: var(--r-ui-color-text-muted);
}
.r-ui-calendar-day.is-today {
  border-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.45);
}
.r-ui-calendar-day.is-in-range {
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.14);
  color: var(--r-ui-color-text-primary);
  border-radius: 0;
}
.r-ui-calendar-day.is-selected,
.r-ui-calendar-day.is-range-start,
.r-ui-calendar-day.is-range-end {
  background-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
  font-weight: 700;
}
.r-ui-calendar-day:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.r-ui-date-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--r-ui-color-border-subtle);
}

/* Radio Card Selector (100% Uniform 1px Perimeter, Zero Thick Left Border) */
.r-ui-radio-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--r-ui-space-2);
}
.r-ui-radio-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  padding: 10px 12px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface-elevated);
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-radio-card:hover {
  border-color: var(--r-ui-color-border-strong);
}
.r-ui-radio-card.is-selected {
  border-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.5);
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.08);
  box-shadow: 0 0 0 1px rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.2);
}

/* Input + Custom Select Combo (.r-ui-input-select-combo) */
.r-ui-input-select-combo {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: var(--r-ui-control-h-md, 34px);
  min-height: var(--r-ui-control-h-md, 34px);
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  transition: border-color var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              box-shadow var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-input-select-combo:focus-within {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
}
.r-ui-input-select-combo.is-error {
  border-color: var(--r-ui-color-error);
  box-shadow: 0 0 0 1px var(--r-ui-color-error);
}
.r-ui-input-select-combo .r-ui-input {
  flex: 1 1 auto;
  min-width: 0;
  height: calc(var(--r-ui-control-h-md, 34px) - 2px);
  min-height: calc(var(--r-ui-control-h-md, 34px) - 2px);
  border: none;
  box-shadow: none;
  background: transparent;
}
.r-ui-input-select-combo .r-ui-input:focus {
  border: none;
  box-shadow: none;
  background: transparent;
}
.r-ui-input-select-combo .r-ui-custom-select {
  width: auto;
  flex-shrink: 0;
}
.r-ui-input-select-combo .r-ui-select-trigger {
  height: calc(var(--r-ui-control-h-md, 34px) - 2px);
  min-height: calc(var(--r-ui-control-h-md, 34px) - 2px);
  border: none;
  box-shadow: none;
  border-radius: 0;
  background: var(--r-ui-color-surface-overlay);
  padding: 0 10px;
  gap: 6px;
}
.r-ui-input-select-combo--left .r-ui-custom-select .r-ui-select-trigger {
  border-right: 1px solid var(--r-ui-color-border-standard);
  border-top-left-radius: var(--r-ui-radius-xs);
  border-bottom-left-radius: var(--r-ui-radius-xs);
}
.r-ui-input-select-combo--right .r-ui-custom-select .r-ui-select-trigger {
  border-left: 1px solid var(--r-ui-color-border-standard);
  border-top-right-radius: var(--r-ui-radius-xs);
  border-bottom-right-radius: var(--r-ui-radius-xs);
}

/* Searchable Select Input inside Popover */
.r-ui-select-search {
  position: sticky;
  top: 0;
  padding: 4px;
  background-color: var(--r-ui-color-surface);
  border-bottom: 1px solid var(--r-ui-color-border-subtle);
  margin-bottom: 2px;
}

/* Switch Field Row (Label + Description + Spring Switch) */
.r-ui-switch-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-ui-space-3);
  padding: 10px 12px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface-elevated);
}
.r-ui-switch-field__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.r-ui-switch-field__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--r-ui-color-text-primary);
}

/* Checkbox Group */
.r-ui-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-ui-space-3);
}
.r-ui-checkbox-group--vertical {
  flex-direction: column;
  gap: var(--r-ui-space-2);
}

/* Inline Tag Input */
.r-ui-tag-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  min-height: var(--r-ui-control-h-md, 34px);
  padding: 4px 8px;
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
}
.r-ui-tag-input:focus-within {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
}
.r-ui-tag-input__field {
  flex: 1 1 100px;
  min-width: 80px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--r-ui-color-text-primary);
  font-size: 0.8125rem;
  outline: none;
}

/* Color Swatch Picker (Bans native <input type="color">) */
.r-ui-color-swatch-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.r-ui-color-swatch-btn {
  width: 24px;
  height: 24px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-strong);
  cursor: pointer;
  padding: 0;
  transition: transform var(--r-ui-duration-instant) ease;
}
.r-ui-color-swatch-btn:hover { transform: scale(1.1); }
.r-ui-color-swatch-btn.is-selected {
  box-shadow: 0 0 0 2px var(--r-ui-color-canvas), 0 0 0 4px var(--r-ui-color-accent-primary);
}

/* Segmented OTP / PIN Input */
.r-ui-otp-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.r-ui-otp-cell {
  width: 34px;
  height: var(--r-ui-control-h-lg, 40px);
  text-align: center;
  font-family: var(--r-ui-font-family-mono);
  font-variant-numeric: tabular-nums;
  font-size: 0.9375rem;
  font-weight: 700;
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  color: var(--r-ui-color-text-primary);
  outline: none;
}
.r-ui-otp-cell:focus {
  border-color: var(--r-ui-color-accent-primary);
  box-shadow: 0 0 0 1px var(--r-ui-color-focus-ring);
}
```

---

## 21. Extended Form & Dashboard Suite (DualRangeSlider, Combobox, MonthPicker, CheckboxCardGroup, ToggleGroup, Tooltip, TreeView, ConfirmDialog, Spinner)
Completes full 9-Pillar parity across form controls, overlays, navigation, and feedback states.

```css
/* Dual-Thumb Range Slider */
.r-ui-slider-field { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.r-ui-dual-range {
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
}
.r-ui-dual-range__track {
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: var(--r-ui-radius-full);
  background-color: var(--r-ui-color-surface-overlay);
  border: 1px solid var(--r-ui-color-border-subtle);
}
.r-ui-dual-range__fill {
  position: absolute;
  top: -1px;
  bottom: -1px;
  border-radius: var(--r-ui-radius-full);
  background-color: var(--r-ui-color-accent-primary);
}
.r-ui-dual-range__input {
  position: absolute;
  inset: 0;
  width: 100%;
  margin: 0;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}
.r-ui-dual-range__input::-webkit-slider-thumb {
  pointer-events: auto;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--r-ui-color-accent-primary);
  border: 2px solid var(--r-ui-color-canvas);
  box-shadow: var(--r-ui-shadow-xs);
  cursor: pointer;
}

/* Month Picker Grid */
.r-ui-month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.r-ui-month-cell {
  height: 30px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background: var(--r-ui-color-surface-elevated);
  color: var(--r-ui-color-text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.r-ui-month-cell:hover { border-color: var(--r-ui-color-border-strong); color: var(--r-ui-color-text-primary); }
.r-ui-month-cell.is-selected {
  background-color: var(--r-ui-color-accent-primary);
  border-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
}

/* Checkbox Card Group & Toggle Group */
.r-ui-checkbox-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--r-ui-space-2);
}
.r-ui-checkbox-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--r-ui-space-2);
  padding: 10px 12px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid var(--r-ui-color-border-standard);
  background-color: var(--r-ui-color-surface-elevated);
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-checkbox-card:hover { border-color: var(--r-ui-color-border-strong); }
.r-ui-checkbox-card.is-selected {
  border-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.5);
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.08);
}

.r-ui-toggle-group {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xs);
  background-color: var(--r-ui-color-surface-elevated);
  padding: 2px;
  gap: 2px;
}
.r-ui-toggle-group__item {
  height: calc(var(--r-ui-control-h-md, 34px) - 6px);
  padding: 0 10px;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: var(--r-ui-color-text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--r-ui-duration-fast) ease;
}
.r-ui-toggle-group__item:hover { color: var(--r-ui-color-text-primary); }
.r-ui-toggle-group__item.is-selected {
  background-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
}

/* Key-Value List Editor & Form Error Summary */
.r-ui-kv-editor { display: flex; flex-direction: column; gap: 8px; }
.r-ui-kv-editor__row { display: grid; grid-template-columns: 1fr 1fr auto; gap: 6px; align-items: center; }
.r-ui-form-error-summary {
  border: 1px solid rgba(239, 68, 68, 0.38);
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--r-ui-radius-sm);
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.r-ui-form-error-summary__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
}
.r-ui-form-error-summary__link {
  background: transparent;
  border: none;
  padding: 0;
  color: var(--r-ui-color-error);
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
  text-decoration: underline;
}

/* Tooltip */
.r-ui-tooltip-wrap { position: relative; display: inline-flex; }
.r-ui-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(2px);
  padding: 4px 8px;
  border-radius: var(--r-ui-radius-xs);
  background-color: var(--r-ui-color-surface-overlay);
  border: 1px solid var(--r-ui-color-border-strong);
  color: var(--r-ui-color-text-primary);
  font-size: 0.6875rem;
  white-space: nowrap;
  box-shadow: var(--r-ui-shadow-md);
  opacity: 0;
  pointer-events: none;
  z-index: var(--r-ui-z-popover, 60);
  transition: opacity var(--r-ui-duration-fast) ease, transform var(--r-ui-duration-fast) var(--r-ui-ease-spring);
}
.r-ui-tooltip--bottom { bottom: auto; top: calc(100% + 6px); }
.r-ui-tooltip-wrap:hover .r-ui-tooltip,
.r-ui-tooltip-wrap:focus-within .r-ui-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Dropdown Menu Divider & Shortcut */
.r-ui-dropdown-divider {
  height: 1px;
  background-color: var(--r-ui-color-border-subtle);
  margin: 4px 0;
}
.r-ui-dropdown-item--destructive { color: var(--r-ui-color-error); }
.r-ui-dropdown-item--destructive:hover { background-color: var(--r-ui-color-error-bg); color: var(--r-ui-color-error); }
.r-ui-dropdown-shortcut {
  margin-left: auto;
  font-family: var(--r-ui-font-family-mono);
  font-size: 0.625rem;
  color: var(--r-ui-color-text-muted);
}

/* Hierarchical TreeView */
.r-ui-tree { display: flex; flex-direction: column; gap: 2px; }
.r-ui-tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 4px 8px;
  border-radius: var(--r-ui-radius-xs);
  border: 1px solid transparent;
  font-size: 0.8125rem;
  color: var(--r-ui-color-text-secondary);
  cursor: pointer;
  background: transparent;
  width: 100%;
  text-align: left;
}
.r-ui-tree-node:hover { background-color: var(--r-ui-color-surface-elevated); color: var(--r-ui-color-text-primary); }
.r-ui-tree-node.is-selected {
  border-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.35);
  background-color: rgba(var(--r-ui-color-accent-primary-rgb, 56, 189, 248), 0.08);
  color: var(--r-ui-color-text-primary);
  font-weight: 600;
}
.r-ui-tree-children {
  padding-left: 16px;
  margin-left: 8px;
  border-left: 1px solid var(--r-ui-color-border-subtle);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Spinner */
.r-ui-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--r-ui-color-border-strong);
  border-top-color: var(--r-ui-color-accent-primary);
  border-radius: 50%;
  animation: r-ui-spin 0.7s linear infinite;
}
@keyframes r-ui-spin { to { transform: rotate(360deg); } }
```

