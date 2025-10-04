function CaseResults({ data }) {
  if (!data) return null;

  const { caseDetails, judgments, caseHistory } = data;

  return (
    <div className="results">
      <div className="case-header">
        <div className="case-title">{caseDetails.petitioner} vs {caseDetails.respondent}</div>
        <div className="case-number">{caseDetails.caseNumber}</div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            <strong>Court:</strong> {caseDetails.court}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            <strong>District:</strong> {caseDetails.district}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            <strong>Case Type:</strong> {caseDetails.caseType}
          </span>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <div className="detail-label">Filing Date</div>
          <div className="detail-value">{caseDetails.filingDate || 'N/A'}</div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Next Hearing</div>
          <div className="detail-value">{caseDetails.nextHearing || 'N/A'}</div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Court Number</div>
          <div className="detail-value">{caseDetails.courtNumber || 'N/A'}</div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Status</div>
          <div className="detail-value">
            <span className={`status-badge ${caseDetails.status === 'Active' ? 'status-active' : 'status-pending'}`}>
              {caseDetails.status}
            </span>
          </div>
        </div>

        {caseDetails.judge && (
          <div className="detail-card">
            <div className="detail-label">Judge</div>
            <div className="detail-value">{caseDetails.judge}</div>
          </div>
        )}

        <div className="detail-card">
          <div className="detail-label">State</div>
          <div className="detail-value">{caseDetails.state || 'N/A'}</div>
        </div>
      </div>

      {judgments && judgments.length > 0 && (
        <div className="judgments-section">
          <h2 className="section-title">Judgments & Orders</h2>
          <div className="judgment-list">
            {judgments.map((judgment, index) => (
              <div key={index} className="judgment-item">
                <div className="judgment-info">
                  <div className="judgment-type">{judgment.type}</div>
                  <div className="judgment-date">{judgment.date}</div>
                </div>
                <a
                  href={judgment.url}
                  className="download-btn"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!judgments || judgments.length === 0) && (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p>No judgments or orders available for this case</p>
        </div>
      )}

      {caseHistory && caseHistory.length > 0 && (
        <div className="judgments-section">
          <h2 className="section-title">Case History</h2>
          <div className="case-history-timeline">
            {caseHistory.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-event">{item.event}</div>
                  <div className="timeline-description">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseResults;
