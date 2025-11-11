import React, { useState } from "react";
import styles from "./CancellationOptions.module.css";

const presets = [
  {
    id: "flexible",
    title: "Flexible",
    summary: "Full refund 24 hours before check-in. No refund for same-day cancellations.",
    refundWindow: "Full refund up to 24 hours before check-in",
    fee: "No fee",
  },
  {
    id: "moderate",
    title: "Moderate",
    summary: "50% refund up to 7 days before check-in. No refund after that.",
    refundWindow: "50% refund up to 7 days before check-in",
    fee: "50% after window",
  },
  {
    id: "strict",
    title: "Strict",
    summary: "25% refund up to 14 days before check-in. No refund thereafter.",
    refundWindow: "25% refund up to 14 days before check-in",
    fee: "25% after window",
  },
  {
    id: "custom",
    title: "Custom",
    summary: "Create your own cancellation window and fees.",
    refundWindow: "Custom",
    fee: "Custom",
  },
];

export default function CancellationOptions({ initial = "moderate" }) {
  const [selected, setSelected] = useState(initial);
  const [custom, setCustom] = useState({ daysBefore: 7, refundPercent: 50, feeNote: "" });
  const [savedPolicy, setSavedPolicy] = useState(null);

  function handlePresetPick(id) {
    setSelected(id);
  }

  function handleCustomChange(e) {
    const { name, value, type } = e.target;

    // For number inputs, convert to number and clamp sensible ranges
    if (type === "number") {
      let num = value === "" ? "" : Number(value);
      if (name === "daysBefore") {
        if (num !== "") num = Math.max(0, Math.floor(num));
      }
      if (name === "refundPercent") {
        if (num !== "") num = Math.min(100, Math.max(0, Math.floor(num)));
      }
      setCustom((s) => ({ ...s, [name]: num }));
    } else {
      setCustom((s) => ({ ...s, [name]: value }));
    }
  }

  function savePolicy() {
    let policy = presets.find((p) => p.id === selected);
    if (selected === "custom") {
      // convert possible empty strings to defaults
      const days = custom.daysBefore === "" ? 0 : custom.daysBefore;
      const pct = custom.refundPercent === "" ? 0 : custom.refundPercent;

      policy = {
        id: "custom",
        title: `Custom — ${pct}% refund ${days} days before`,
        summary: `Guests receive ${pct}% refund if they cancel at least ${days} days before check-in. ${custom.feeNote || ""}`.trim(),
        refundWindow: `${pct}% refund up to ${days} days before check-in`,
        fee: custom.feeNote || "Custom fee",
      };
    }

    setSavedPolicy(policy);
  }

  const selectedPreset = presets.find((p) => p.id === selected);

  // Validation for custom policy: require numeric values in range
  const customIsValid =
    selected !== "custom" ||
    (custom.daysBefore !== "" &&
      Number.isFinite(custom.daysBefore) &&
      custom.daysBefore >= 0 &&
      custom.refundPercent !== "" &&
      Number.isFinite(custom.refundPercent) &&
      custom.refundPercent >= 0 &&
      custom.refundPercent <= 100);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Cancellation Policies</h1>
        <p className={styles.lead}>
          Choose a policy that fits your property. Guests will see the selected policy on listings and at checkout.
        </p>
      </header>

      <section className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.presets}>
            {presets.map((p) => (
              <button
                key={p.id}
                className={`${styles.preset} ${selected === p.id ? styles.active : ""}`}
                onClick={() => handlePresetPick(p.id)}
                aria-pressed={selected === p.id}
                type="button"
              >
                <div>
                  <strong>{p.title}</strong>
                  <p className={styles.presetSummary}>{p.summary}</p>
                </div>
                <div className={styles.presetTag}>{p.refundWindow}</div>
              </button>
            ))}
          </div>

          {selected === "custom" && (
            <div className={styles.customBox}>
              <h3>Custom policy</h3>
              <label>
                Days before check-in for refund
                <input
                  type="number"
                  name="daysBefore"
                  min={0}
                  value={custom.daysBefore}
                  onChange={handleCustomChange}
                />
              </label>

              <label>
                Refund percent
                <input
                  type="number"
                  name="refundPercent"
                  min={0}
                  max={100}
                  value={custom.refundPercent}
                  onChange={handleCustomChange}
                />
              </label>

              <label>
                Fee note (optional)
                <input
                  name="feeNote"
                  value={custom.feeNote}
                  onChange={handleCustomChange}
                  placeholder="e.g. 10% processing fee"
                />
              </label>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.saveBtn}
              onClick={savePolicy}
              disabled={!customIsValid}
              type="button"
            >
              Save policy
            </button>

            <button
              className={styles.cancelBtn}
              onClick={() => {
                setSelected(initial);
                setCustom({ daysBefore: 7, refundPercent: 50, feeNote: "" });
              }}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>

        <aside className={styles.right}>
          <div className={styles.preview}>
            <h3>Guest-facing preview</h3>
            {selected !== "custom" ? (
              <div>
                <h4>{selectedPreset?.title}</h4>
                <p className={styles.previewSummary}>{selectedPreset?.summary}</p>
                <ul className={styles.previewList}>
                  <li>
                    <strong>Refund:</strong> {selectedPreset?.refundWindow}
                  </li>
                  <li>
                    <strong>Fee:</strong> {selectedPreset?.fee}
                  </li>
                  <li>
                    <strong>Displayed at:</strong> Listing page, Booking flow, Confirmation email
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <h4>Custom policy</h4>
                <p className={styles.previewSummary}>
                  {`Guests receive ${custom.refundPercent}% refund if they cancel at least ${custom.daysBefore} days before check-in.`}
                </p>
                {custom.feeNote && (
                  <p>
                    <strong>Fee note:</strong> {custom.feeNote}
                  </p>
                )}
              </div>
            )}

            <div className={styles.helpBox}>
              <strong>Tip:</strong>
              <p>
                Short, clear policies reduce disputes. Mention when the host processes refunds and whether taxes/fees are refunded.
              </p>
            </div>

            {savedPolicy && (
              <div className={styles.saved}>
                <strong>Saved policy:</strong>
                <p>{savedPolicy.title}</p>
                <p className={styles.savedSummary}>{savedPolicy.summary}</p>
              </div>
            )}
          </div>

          <div className={styles.faqBox}>
            <h4>Common questions</h4>
            <dl>
              <dt>When is a refund processed?</dt>
              <dd>Refunds are typically processed within 5–7 business days after approval, depending on the payment provider.</dd>

              <dt>Can I change policy later?</dt>
              <dd>Yes — policy changes apply to future reservations only. Existing bookings keep the policy that was in effect when they booked.</dd>
            </dl>
          </div>
        </aside>
      </section>
    </div>
  );
}
