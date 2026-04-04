import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const statusClass = {
  Active: "text-primary",
  Pending: "text-warning",
  Rejected: "text-danger",
  Returned: "text-success",
  Overdue: "text-danger fw-bold",
};

export default function MyBorrowedBooks() {
  const [loans, setLoans] = useState([]);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
      if (!user) setLoading(false);
    });
    return () => u();
  }, []);

  useEffect(() => {
    if (!uid) {
      setLoans([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "loans"), where("userId", "==", uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          const ta = a.createdAt?.toMillis?.() ?? 0;
          const tb = b.createdAt?.toMillis?.() ?? 0;
          return tb - ta;
        });
        setLoans(list);
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [uid]);

  if (!uid) {
    return (
      <div className="container py-5 mt-5 text-center">
        <p className="brown">سجّل الدخول لعرض إعاراتك.</p>
        <Link to="/" className="btn bg-brown text-white">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="brown fw-bolder mb-2">My Borrowed Books</h1>
      <p className="text-muted mb-4">طلباتك وحالات الإعارة الحالية.</p>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : loans.length === 0 ? (
        <div className="border rounded-4 p-5 text-center text-muted">
          لا توجد طلبات بعد.{" "}
          <Link to="/home" className="brown fw-bold text-decoration-none">
            تصفح الكتب
          </Link>
        </div>
      ) : (
        <div className="table-responsive border rounded-4 shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>الكتاب</th>
                <th>تاريخ الطلب</th>
                <th>تاريخ الاستحقاق</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((row) => (
                <tr key={row.id}>
                  <td className="fw-semibold">{row.book}</td>
                  <td>{row.loanDate}</td>
                  <td>{row.dueDate || "—"}</td>
                  <td>
                    <span className={statusClass[row.status] || "text-secondary"}>
                      {row.status === "Pending" && "بانتظار الموافقة"}
                      {row.status === "Active" && "نشط"}
                      {row.status === "Rejected" && "مرفوض"}
                      {row.status === "Returned" && "مُعاد"}
                      {row.status === "Overdue" && "متأخر"}
                      {!["Pending", "Active", "Rejected", "Returned", "Overdue"].includes(
                        row.status,
                      ) && row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
