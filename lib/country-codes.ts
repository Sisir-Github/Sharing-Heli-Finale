export type CountryCode = {
  /** ISO 3166-1 alpha-2 — used only as a React key, dial codes are not unique. */
  iso: string;
  name: string;
  /** International dial prefix, including the leading "+". */
  dial: string;
};

/**
 * Dial codes for the markets the flight desk actually receives enquiries from,
 * plus full global coverage for everything else. Nepal leads the list because
 * it is the default selection.
 */
export const COUNTRY_CODES: CountryCode[] = [
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "AR", name: "Argentina", dial: "+54" },
  { iso: "AT", name: "Austria", dial: "+43" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "BT", name: "Bhutan", dial: "+975" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "CL", name: "Chile", dial: "+56" },
  { iso: "CO", name: "Colombia", dial: "+57" },
  { iso: "CZ", name: "Czechia", dial: "+420" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "FI", name: "Finland", dial: "+358" },
  { iso: "GR", name: "Greece", dial: "+30" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "HU", name: "Hungary", dial: "+36" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "IL", name: "Israel", dial: "+972" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "MM", name: "Myanmar", dial: "+95" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "RO", name: "Romania", dial: "+40" },
  { iso: "RU", name: "Russia", dial: "+7" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "TR", name: "Türkiye", dial: "+90" },
  { iso: "TW", name: "Taiwan", dial: "+886" },
  { iso: "UA", name: "Ukraine", dial: "+380" },
  { iso: "VN", name: "Vietnam", dial: "+84" },
  { iso: "ZA", name: "South Africa", dial: "+27" }
];

export const DEFAULT_DIAL_CODE = "+977";

/**
 * Splits a stored number such as "+9779856028155" back into a dial code and the
 * local part so a saved value can repopulate the field. Longest dial code wins,
 * because "+1" is a prefix of nothing but "+97" is a prefix of "+977".
 */
export function splitDialCode(value: string): { dial: string; local: string } {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) return { dial: DEFAULT_DIAL_CODE, local: trimmed };

  const match = [...COUNTRY_CODES]
    .map((country) => country.dial)
    .sort((a, b) => b.length - a.length)
    .find((dial) => trimmed.startsWith(dial));

  if (!match) return { dial: DEFAULT_DIAL_CODE, local: trimmed.replace(/^\+/, "") };
  return { dial: match, local: trimmed.slice(match.length).trim() };
}
