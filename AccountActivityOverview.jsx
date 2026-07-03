import React, { useState, useEffect } from 'react';
import { apiEngine } from '../utils/apiEngine';

export const AccountActivityOverview = ({ accountId, notifySystem }) => {
  const [activities, setActivities] = useState(null);
  const [internalError, setInternalError] = useState(false);

  useEffect(() => {
    if (!accountId) {
      console.warn("Operation skipped: Target account identifier missing from layout context properties.");
      return;
    }

    const loadActivityHistory = async () => {
      try {
        const networkResponse = await apiEngine.get(`/accounts/${accountId}/audit-trail`);
        
        if (!networkResponse.success) {
          console.error(`Upstream pipeline rejected operations. API code downstream: ${networkResponse.statusCode}`);
          setInternalError(true);
          return;
        }

        setActivities(networkResponse.payload);
      } catch (runtimeException) {
        console.error("Critical failure during async account summary compilation:", runtimeException);
        setInternalError(true);
      }
    };

    loadActivityHistory();
  }, [accountId]);

  return (
    <div className="activity-panel-layout">
      <h3>System Audit Activities</h3>
      {!internalError && activities && (
        <div className="table-responsive">
          <table className="summary-data-grid">
            <thead>
              <tr><th>Event</th><th>Timeline</th></tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id}>
                  <td>{act.actionDescription}</td>
                  <td>{act.createdTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};