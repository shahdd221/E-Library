import { useState } from "react";

const initialLoans = [];

const statusStyle = {
  Overdue: { background: "#FEE2E2", color: "#DC2626" },
  Active: { background: "#DBEAFE", color: "#2563EB" },
  Returned: { background: "#D1FAE5", color: "#059669" },
  Pending: { background: "#FEF3C7", color: "#B45309" },
};

function calcDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

export default function BorrowingLog() {
  const [activeTab, setActiveTab] = useState("All");
  const [loans, setLoans] = useState(initialLoans);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = loans.filter((l) => {
    const matchTab =
      activeTab === "All" ? l.status !== "Pending" : l.status === activeTab;
    const matchSearch =
      l.borrower.toLowerCase().includes(search.toLowerCase()) ||
      l.book.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleReceive = (id) => {
    setLoans((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "Returned" } : l)),
    );
    showToast("✅ Book marked as Returned", "#059669");
  };

  const handleAccept = (id) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "Active", dueDate: calcDueDate() } : l,
      ),
    );
    showToast("✅ Request Accepted — Loan is now Active", "#2563EB");
  };

  const handleReject = (id) => {
    setLoans((prev) => prev.filter((l) => l.id !== id));
    showToast("❌ Request Rejected", "#DC2626");
  };

  const stats = {
    active: loans.filter((l) => l.status === "Active").length,
    overdue: loans.filter((l) => l.status === "Overdue").length,
    returned: loans.filter((l) => l.status === "Returned").length,
    pending: loans.filter((l) => l.status === "Pending").length,
  };

  const tabs = ["All", "Active", "Overdue", "Returned", "Pending"];

  return (
    <div style={s.page}>
      {toast && (
        <div style={{ ...s.toast, background: toast.color }}>{toast.msg}</div>
      )}

      <div style={s.topBar}>
        <input
          style={s.search}
          placeholder="🔍  Search for borrower or book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={s.registerBtn}>+ Register New Loan</button>
      </div>

      <h1 style={s.pageTitle}>Lending Operations Log</h1>
      <p style={s.pageSubtitle}>
        Track and manage all current and archived book loans.
      </p>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div>
            <div style={s.statLabel}>Currently Active</div>
            <div style={s.statNumber}>{stats.active}</div>
          </div>
          <span style={{ fontSize: 28 }}>🔄</span>
        </div>
        <div style={s.statCard}>
          <div>
            <div style={s.statLabel}>Overdue</div>
            <div style={{ ...s.statNumber, color: "#DC2626" }}>
              {stats.overdue}
            </div>
          </div>
          <span style={{ fontSize: 28 }}>⚠️</span>
        </div>
        <div style={s.statCard}>
          <div>
            <div style={s.statLabel}>Returned Today</div>
            <div style={{ ...s.statNumber, color: "#059669" }}>
              {stats.returned}
            </div>
          </div>
          <span style={{ fontSize: 28 }}>✅</span>
        </div>
        <div style={{ ...s.statCard, border: "2px solid #FDE68A" }}>
          <div>
            <div style={s.statLabel}>Pending Requests</div>
            <div style={{ ...s.statNumber, color: "#B45309" }}>
              {stats.pending}
            </div>
          </div>
          <span style={{ fontSize: 28 }}>⏳</span>
        </div>
      </div>

      {/* Table */}
      <div style={s.tableCard}>
        <div style={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              style={activeTab === tab ? s.tabActive : s.tab}
              onClick={(e) => {
                setActiveTab(tab);
                e.currentTarget.blur();
              }}
            >
              {tab}
              {tab === "Pending" && stats.pending > 0 && (
                <span style={s.tabBadge}>{stats.pending}</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "Pending" && (
          <div style={s.pendingBanner}>
            ⏳ These requests are awaiting your approval — press{" "}
            <strong>Accept</strong> to approve or <strong>Reject</strong> to
            decline.
          </div>
        )}

        <table style={s.table}>
          <thead>
            <tr>
              {[
                "Borrower Name",
                "Book Title",
                "Request Date",
                "Due Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} style={s.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: 32,
                    color: "#9CA3AF",
                  }}
                >
                  No records found
                </td>
              </tr>
            )}
            {filtered.map((loan) => (
              <tr key={loan.id} style={s.tr}>
                <td style={s.td}>
                  <div style={s.borrowerCell}>
                    <div style={{ ...s.avatar, background: loan.color }}>
                      {loan.initials}
                    </div>
                    <span style={loan.status === "Returned" ? s.strike : {}}>
                      {loan.borrower}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    ...s.td,
                    ...(loan.status === "Returned" ? s.strike : {}),
                  }}
                >
                  {loan.book}
                </td>
                <td style={s.td}>{loan.loanDate}</td>
                <td
                  style={{
                    ...s.td,
                    color: loan.status === "Overdue" ? "#DC2626" : "inherit",
                    fontWeight: loan.status === "Overdue" ? 600 : 400,
                  }}
                >
                  {loan.dueDate}
                </td>
                <td style={s.td}>
                  <span style={{ ...s.badge, ...statusStyle[loan.status] }}>
                    {loan.status}
                  </span>
                </td>
                <td style={s.td}>
                  {loan.status === "Pending" && (
                    <div style={s.actionBtns}>
                      <button
                        style={s.acceptBtn}
                        onClick={() => handleAccept(loan.id)}
                      >
                        ✓ Accept
                      </button>
                      <button
                        style={s.rejectBtn}
                        onClick={() => handleReject(loan.id)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                  {(loan.status === "Active" || loan.status === "Overdue") && (
                    <div style={s.actionBtns}>
                      <button style={s.extendBtn}>Extend</button>
                      <button
                        style={s.receiveBtn}
                        onClick={() => handleReceive(loan.id)}
                      >
                        Receive
                      </button>
                    </div>
                  )}
                  {loan.status === "Returned" && (
                    <span style={{ color: "#059669", fontSize: 20 }}>✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={s.pagination}>
          <span>
            Showing {filtered.length} of {loans.length} loans
          </span>
          <div style={s.pages}>
            {["‹", 1, 2, 3, "›"].map((p, i) => (
              <button
                key={i}
                style={
                  p === 1 ? { ...s.pageBtn, ...s.pageBtnActive } : s.pageBtn
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div style={s.infoRow}>
        <div style={s.infoCard}>
          <span style={s.infoIcon}>⚠️</span>
          <div>
            <div style={{ ...s.infoTitle, color: "#B45309" }}>Fines Alert</div>
            <div style={s.infoText}>
              A late fine of 5 Riyals is calculated for each day past the
              specified due date. Please review the overdue students list
              regularly to send notifications.
            </div>
          </div>
        </div>
        <div style={s.infoCard}>
          <span style={s.infoIcon}>🔄</span>
          <div>
            <div style={s.infoTitle}>Extension Policy</div>
            <div style={s.infoText}>
              Loan extensions are allowed only once for an additional 7 days,
              provided there are no prior bookings for the same book by another
              borrower.
            </div>
          </div>
        </div>
      </div>

      <footer style={s.footer}>
        © 2023 University Library Management System. All Rights Reserved.
      </footer>
    </div>
  );
}

const s = {
  page: {
    padding: "32px 40px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#F9FAFB",
    color: "#111827",
    minHeight: "100vh",
  },
  toast: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 999,
    color: "#fff",
    padding: "12px 22px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  search: {
    width: 340,
    padding: "8px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
  },
  pageTitle: { fontSize: 26, fontWeight: 700, margin: 0, textAlign: "center" },
  pageSubtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 6,
  },
  registerBtn: {
    background: "#92400E",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  statsRow: { display: "flex", gap: 16, marginBottom: 24 },
  statCard: {
    flex: 1,
    background: "#fff",
    borderRadius: 12,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  statLabel: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
  statNumber: { fontSize: 28, fontWeight: 700 },
  tableCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    marginBottom: 20,
  },
  tabs: {
    display: "flex",
    gap: 4,
    marginBottom: 20,
    borderBottom: "1px solid #E5E7EB",
  },
  tab: {
    background: "none",
    border: "none",
    outline: "none",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    color: "#6B7280",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  tabActive: {
    background: "none",
    border: "none",
    outline: "none",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    color: "#B45309",
    fontWeight: 600,
    borderBottom: "2px solid #B45309",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  tabBadge: {
    background: "#B45309",
    color: "#fff",
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    padding: "1px 6px",
  },
  pendingBanner: {
    background: "#FFFBEB",
    border: "1px solid #FDE68A",
    borderRadius: 8,
    padding: "10px 16px",
    marginBottom: 16,
    fontSize: 13,
    color: "#92400E",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    padding: "8px 12px",
    letterSpacing: "0.05em",
  },
  tr: { borderTop: "1px solid #F3F4F6" },
  td: { padding: "14px 12px", fontSize: 14, verticalAlign: "middle" },
  borrowerCell: { display: "flex", alignItems: "center", gap: 10 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
  strike: { textDecoration: "line-through", color: "#9CA3AF" },
  badge: {
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  actionBtns: { display: "flex", gap: 6 },
  extendBtn: {
    background: "#fff",
    border: "1px solid #D1D5DB",
    outline: "none",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    cursor: "pointer",
  },
  receiveBtn: {
    background: "#92400E",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    cursor: "pointer",
  },
  acceptBtn: {
    background: "#059669",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: 6,
    padding: "5px 12px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  rejectBtn: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: 6,
    padding: "5px 12px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    fontSize: 13,
    color: "#6B7280",
  },
  pages: { display: "flex", gap: 6 },
  pageBtn: {
    width: 32,
    height: 32,
    border: "1px solid #E5E7EB",
    outline: "none",
    borderRadius: 6,
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
  },
  pageBtnActive: { background: "#92400E", color: "#fff", border: "none" },
  infoRow: { display: "flex", gap: 16, marginBottom: 24 },
  infoCard: {
    flex: 1,
    background: "#FFFBEB",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
  },
  infoIcon: { fontSize: 22, flexShrink: 0 },
  infoTitle: { fontWeight: 700, fontSize: 14, marginBottom: 6 },
  infoText: { fontSize: 13, color: "#6B7280", lineHeight: 1.5 },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    paddingTop: 8,
  },
};
