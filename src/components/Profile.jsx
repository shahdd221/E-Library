import { useEffect, useState } from "react";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
      if (!user) setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      try {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData({
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  const handleResetPassword = async () => {
    if (!userData?.email) return;
    await sendPasswordResetEmail(auth, userData.email);
    alert("تم إرسال رابط تغيير الباسورد على الإيميل 📩");
  };

  // 📸 اختيار صورة (preview فقط)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  if (!uid) {
    return (
      <div className="container py-5 mt-5 text-center">
        <p className="brown">سجّل الدخول الأول</p>
        <Link to="/" className="btn bg-brown text-white">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="brown fw-bolder mb-4">My Profile</h1>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="card p-4 rounded-4 shadow-sm text-center">

          {/* 👤 الصورة */}
          <img
            src={
              preview ||
              userData?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="profile-img mx-auto"
          />

          {/* 📸 input hidden */}
          <input
            type="file"
            id="upload"
            hidden
            onChange={handleImageChange}
          />

          {/* ➕ Add / Change */}
          <button
            className="photo-btn mt-2"
            onClick={() => document.getElementById("upload").click()}
          >
            {userData?.avatar || preview ? "Change Photo" : "Add Photo"}
          </button>

          {/* 🗑️ Remove */}
          {(userData?.avatar || preview) && (
            <button
              className="delete-photo-btn mt-2"
              onClick={() => setPreview(null)}
            >
              <i className="fa-solid fa-trash me-2"></i>
              Remove Photo
            </button>
          )}

          <hr />

          {/* 🧾 البيانات */}
          <h3 className="fw-bold mb-2">{userData?.name || "—"}</h3>

          <p className="mb-2">
            <strong>Email:</strong> {userData?.email || "—"}
          </p>

          <p className="mb-3">
            <strong>Role:</strong> {userData?.role || "user"}
          </p>

          {/* 🔐 Reset Password */}
          <button
            onClick={handleResetPassword}
            className="reset-btn"
          >
            <i className="fa-solid fa-lock me-2"></i>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}