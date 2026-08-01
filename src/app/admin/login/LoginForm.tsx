"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "./style.css";

export function LoginForm() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!login || !password) {
      toast.error("Введіть логін та пароль");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        login,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Невірний логін або пароль");
        return;
      }

      toast.success("Успішний вхід!");

      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Сталася помилка. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-top">
          <p className="login-subtitle">SOFTH СТО</p>

          <h1>Адмін панель</h1>

          <span>Увійдіть у свій акаунт для керування контентом.</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="login">Логін</label>

            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введіть логін"
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Пароль</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Вхід...
              </>
            ) : (
              "Увійти"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
