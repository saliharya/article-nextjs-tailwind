import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-4">
            <h1 className="text-7xl font-extrabold animate-pulse">403</h1>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-center">
                Ups! Kamu tidak punya akses ke halaman ini.
            </p>
            <p className="mt-2 text-center max-w-md">
                Sepertinya kamu perlu login atau meminta izin untuk mengakses halaman ini.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
