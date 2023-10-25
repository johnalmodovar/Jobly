import React from "react";


/** Renders error/success messages.
 *
 * Props:
 * - errors: [msg, msg, ....]
 *
 * {LoginForm, SignupForm} -> Alert
 */

export default function Alert({ alerts, type }) {

  return (
    <div className={`alert alert-${type} pb-0`}>
      {Array.isArray(alerts)
        ? alerts.map((a, i) => {
          return (
            <p key={i}>{a}</p>
          );
        })
        : <p>{alerts}</p>}
    </div>
  );
}
