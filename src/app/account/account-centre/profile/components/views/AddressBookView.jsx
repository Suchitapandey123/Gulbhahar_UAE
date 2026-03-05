"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, MapPin, X, Phone } from "lucide-react";
import Breadcrumb from "../Profile/Breadcrumb";
import profileAPI from "../../../../../api/profile/profile";

const BRAND = "#800000";

const getAddressKey = (address) => {
  const addr = address.shippingAddress || address;
  return [
    (addr.fullName || "").toLowerCase().trim(),
    (addr.addressLine1 || addr.address || "").toLowerCase().trim(),
    (addr.city || "").toLowerCase().trim(),
    (addr.state || addr.region || "").toLowerCase().trim(),
    (addr.postalCode || "").trim(),
    (addr.phone || "").trim(),
  ].join("|");
};

const deduplicateAddresses = (addresses) => {
  const seen = new Set();
  return addresses.filter((address) => {
    const key = getAddressKey(address);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/* ── Reusable labeled input ── */
const Field = ({ label, className = "", ...props }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-300 outline-none transition focus:border-[#800000]/40 focus:bg-white focus:ring-2 focus:ring-[#800000]/10"
    />
  </div>
);

const AddressBookView = ({ onNavigate, ProfileView }) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [form, setForm] = useState({
    fullName: "", phone: "", addressLine1: "",
    city: "", state: "", postalCode: "", country: "India",
  });

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await profileAPI.getUserAddresses();
      if (res.success && Array.isArray(res.data)) {
        setSavedAddresses(deduplicateAddresses(res.data));
      } else {
        setSavedAddresses([]);
      }
    } catch {
      setError("Failed to load addresses. Please try again.");
      setSavedAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadAddresses(); }, [loadAddresses]);

  const handleInput = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleDelete = (id) =>
    setSavedAddresses((prev) =>
      prev.filter((a) =>
        a.id !== id && a._id !== id && a.shippingAddress?.postalCode !== id
      )
    );

  return (
    <div className="w-full mt-2 sm:mt-4 pb-10">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Profile", onClick: () => onNavigate(ProfileView.MAIN) },
          { label: "Address Book" },
        ]}
      />

      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-5 sm:mb-7">
        <div>
          <h1 className="text-[16px] sm:text-xl font-bold text-gray-900 leading-tight">
            Address Book
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Manage your delivery addresses
          </p>
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl px-3.5 py-2 text-[11px] font-bold tracking-wide text-white shrink-0 transition-all active:scale-95"
          style={{
            background: showForm
              ? "#e5e7eb"
              : `linear-gradient(135deg, ${BRAND} 0%, #a01212 100%)`,
            color: showForm ? "#4b5563" : "#fff",
            boxShadow: showForm ? "none" : `0 4px 14px ${BRAND}40`,
          }}
        >
          {/* shimmer */}
          {!showForm && (
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          )}
          {showForm
            ? <><X className="w-3 h-3" strokeWidth={2.5} /> Cancel</>
            : <><Plus className="w-3 h-3" strokeWidth={2.5} /> Add Address</>
          }
        </button>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 py-16">
          <div
            className="h-7 w-7 animate-spin rounded-full border-2"
            style={{ borderColor: `${BRAND}25`, borderTopColor: BRAND }}
          />
          <p className="text-[11px] text-gray-400">Loading addresses…</p>
        </div>
      )}

      {/* ── Error ── */}
      {error && !isLoading && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-xs text-red-600">{error}</p>
          <button onClick={loadAddresses} className="shrink-0 text-[11px] font-bold text-red-800">
            Retry
          </button>
        </div>
      )}

      {/* ── Add Address Form ── */}
      {showForm && !isLoading && (
        <div className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
          {/* form title bar */}
          <div
            className="flex items-center gap-2.5 border-b px-4 sm:px-5 py-3.5"
            style={{ background: `${BRAND}08`, borderColor: `${BRAND}18` }}
          >
            <div
              className="flex h-6 w-6 items-center justify-center rounded-lg"
              style={{ background: `${BRAND}18` }}
            >
              <MapPin className="h-3 w-3" style={{ color: BRAND }} strokeWidth={2} />
            </div>
            <span className="text-[13px] font-bold text-gray-800">New Delivery Address</span>
          </div>

          {/* fields */}
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5">
            <Field label="Full Name" type="text" name="fullName"
              value={form.fullName} onChange={handleInput} placeholder="e.g. Priya Sharma" />
            <Field label="Phone" type="tel" name="phone"
              value={form.phone} onChange={handleInput} placeholder="+91 98765 43210" />
            <Field label="Address" type="text" name="addressLine1"
              value={form.addressLine1} onChange={handleInput}
              placeholder="House / Street / Colony" className="sm:col-span-2" />
            <Field label="City" type="text" name="city"
              value={form.city} onChange={handleInput} placeholder="Delhi" />
            <Field label="State" type="text" name="state"
              value={form.state} onChange={handleInput} placeholder="Delhi" />
            <Field label="Postal Code" type="text" name="postalCode"
              value={form.postalCode} onChange={handleInput} placeholder="110001" />

            <div className="flex gap-2.5 pt-1 sm:col-span-2">
              <button
                type="button"
                className="rounded-xl px-5 py-2.5 text-[12px] font-bold text-white transition active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, #a01212 100%)`,
                  boxShadow: `0 3px 10px ${BRAND}35`,
                }}
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl bg-gray-100 px-5 py-2.5 text-[12px] font-semibold text-gray-500 hover:bg-gray-200 transition active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Saved Addresses ── */}
      {!isLoading && !error && (
        <>
          {/* count */}
          {savedAddresses.length > 0 && (
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {savedAddresses.length} {savedAddresses.length === 1 ? "Address" : "Addresses"} Saved
            </p>
          )}

          {savedAddresses.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: `${BRAND}0d` }}
              >
                <MapPin className="h-6 w-6" style={{ color: `${BRAND}80` }} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-700">No saved addresses</p>
                <p className="mt-1 text-[11px] text-gray-400 max-w-[180px] mx-auto leading-relaxed">
                  Add a delivery address to speed up checkout
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[12px] font-bold text-white transition active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, #a01212 100%)`,
                  boxShadow: `0 3px 10px ${BRAND}35`,
                }}
              >
                <Plus className="h-3 w-3" strokeWidth={2.5} />
                Add First Address
              </button>
            </div>

          ) : (
            <div className="flex flex-col gap-3">
              {savedAddresses.map((address, index) => {
                const a = address.shippingAddress || {};
                const fullAddr = [a.city, a.state, a.postalCode].filter(Boolean).join(", ");

                return (
                  <div
                    key={address.id || address._id || index}
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.05)] transition-all hover:border-[#80000022] hover:shadow-[0_4px_18px_rgba(0,0,0,0.09)]"
                  >
                    {/* left accent bar for default */}
                    {index === 0 && (
                      <div
                        className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
                        style={{ background: BRAND }}
                      />
                    )}

                    <div className="flex items-start gap-3 p-4 sm:p-5 pl-5 sm:pl-6">
                      {/* icon */}
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${BRAND}0f` }}
                      >
                        <MapPin className="h-4 w-4" style={{ color: BRAND }} strokeWidth={1.75} />
                      </div>

                      {/* details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[13px] font-bold text-gray-900">
                            {a.fullName || "N/A"}
                          </p>
                          {index === 0 && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em]"
                              style={{ background: `${BRAND}14`, color: BRAND }}
                            >
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-1.5 text-[11px] leading-snug text-gray-500">
                          {a.addressLine1 || "N/A"}
                        </p>
                        {fullAddr && (
                          <p className="mt-0.5 text-[11px] text-gray-400">{fullAddr}</p>
                        )}

                        <div className="mt-2 flex items-center gap-1.5">
                          <Phone className="h-2.5 w-2.5 text-gray-300" strokeWidth={1.5} />
                          <p className="text-[11px] font-medium text-gray-400">
                            {a.phone || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* delete */}
                      <button
                        onClick={() =>
                          handleDelete(address.id || address._id || a.postalCode || index)
                        }
                        className="mt-0.5 shrink-0 rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddressBookView;
