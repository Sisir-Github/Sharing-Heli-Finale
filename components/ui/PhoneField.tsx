"use client";

import { useId, useState } from "react";

import { COUNTRY_CODES, DEFAULT_DIAL_CODE, splitDialCode } from "@/lib/country-codes";

type PhoneFieldProps = {
  /** Field name submitted to the server, e.g. "customerPhone". */
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  defaultValue?: string;
  /** Receives the combined E.164 value, e.g. "+9779856028155". */
  onChange?: (value: string) => void;
};

/**
 * Country dial-code select plus a local number input. The two are combined into
 * a single hidden field so the server keeps receiving one E.164 string and the
 * existing validation rules stay unchanged.
 */
export function PhoneField({ name, label, hint, required = false, defaultValue = "", onChange }: PhoneFieldProps) {
  const initial = splitDialCode(defaultValue);
  const [dial, setDial] = useState(defaultValue ? initial.dial : DEFAULT_DIAL_CODE);
  const [local, setLocal] = useState(initial.local);
  const selectId = useId();
  const inputId = useId();

  // Strip everything the local part should never contain, including a pasted
  // country code, so "+977 985..." selected against +977 cannot double up.
  function normalizeLocal(raw: string) {
    return raw.replace(/[^\d\s-]/g, "").replace(/^0+/, "").trimStart();
  }

  function emit(nextDial: string, nextLocal: string) {
    const digits = nextLocal.replace(/\D/g, "");
    onChange?.(digits ? `${nextDial}${digits}` : "");
  }

  const combined = local.replace(/\D/g, "") ? `${dial}${local.replace(/\D/g, "")}` : "";

  return (
    <div>
      <span className="field-label">
        {label}
        {hint ? <span className="ml-1 normal-case text-slate-400">{hint}</span> : null}
      </span>

      <div className="mt-2 flex gap-2">
        <select
          id={selectId}
          aria-label="Country dial code"
          className="input min-h-11 w-[7.5rem] shrink-0 py-2.5 text-sm"
          value={dial}
          onChange={(event) => {
            setDial(event.target.value);
            emit(event.target.value, local);
          }}
        >
          {COUNTRY_CODES.map((country) => (
            <option key={country.iso} value={country.dial}>
              {country.iso} {country.dial}
            </option>
          ))}
        </select>

        <input
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          aria-label={label}
          placeholder="9856028155"
          className="input min-h-11 w-full py-2.5 text-sm"
          value={local}
          onChange={(event) => {
            const next = normalizeLocal(event.target.value);
            setLocal(next);
            emit(dial, next);
          }}
        />
      </div>

      {/* Single combined value for FormData-based submits. */}
      <input type="hidden" name={name} value={combined} />
    </div>
  );
}
