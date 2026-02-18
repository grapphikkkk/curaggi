import { useState } from "react";
import { useNavigate } from "react-router";

export function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server
    console.log("Form submitted:", formData);
    navigate("/thank-you");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "640px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--space-12)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: 700,
              color: "var(--neutral-900)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-4)",
            }}
          >
            Contact
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "var(--text-base)",
              color: "var(--neutral-600)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            お問い合わせはこちらのフォームからお送りください。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-10)",
            border: "1px solid var(--neutral-200)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
            }}
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="label">
                お名前 <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">
                メールアドレス <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@curaggi.com"
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="label">
                お問い合わせ種別 <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <select
                id="type"
                name="type"
                className="select"
                required
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                <option value="consultation">相談</option>
                <option value="request">依頼</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="label">
                お問い合わせ内容 <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="textarea"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn--coral btn--lg" style={{ width: "100%" }}>
              送信する
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}