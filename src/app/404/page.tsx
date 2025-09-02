import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-4">
            <h1 className="text-9xl font-extrabold animate-bounce">404</h1>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-center">
                Oops! Halaman yang kamu cari tidak ditemukan.
            </p>
            <p className="mt-2 text-center max-w-md">
                Mungkin kamu salah jalan, atau halaman ini sudah pindah ke dimensi lain.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
                Kembali ke Beranda
            </Link>

            <div className="relative w-full h-64 mt-12">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-70 animate-pulse"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
