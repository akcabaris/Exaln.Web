import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsSubmitting(true);

        try {
            await register({
                firstName,
                lastName,
                email,
                password
            } as any);
            navigate("/login");
        } catch (err: any) {
            setError(
                err?.message || "Registration failed. Please check your information."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-6 shadow-lg ring-1 ring-slate-800 sm:p-8">
                <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                    Sign up
                </h1>
                <p className="mt-1 text-center text-sm text-slate-400">
                    Create a new account
                </p>

                {error && (
                    <div
                        className="mt-4 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                        role="alert"
                    >
                        <p className="font-semibold">Error</p>
                        <p className="mt-1">{error}</p>
                    </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-slate-200"
                            >
                                First name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="John"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Last name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {isSubmitting ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400 sm:text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-400 hover:text-indigo-300"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
