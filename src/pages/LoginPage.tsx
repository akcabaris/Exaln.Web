import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError(null);

        if (!email || !password) {
            setLoginError("Please fill in email and password fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            await login({ email, password });
        } catch (err: any) {
            setLoginError(
                err?.message || "Login failed, email or password incorrect."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-6 shadow-lg ring-1 ring-slate-800 sm:p-8">
                <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                    Log in
                </h1>
                <p className="mt-1 text-center text-sm text-slate-400">
                    Access your account
                </p>

                {loginError && (
                    <div
                        className="mt-4 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                        role="alert"
                    >
                        <p className="font-semibold">Error</p>
                        <p className="mt-1">{loginError}</p>
                    </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-200"
                        >
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="example@exaling.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400 sm:text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-400 hover:text-indigo-300"
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
