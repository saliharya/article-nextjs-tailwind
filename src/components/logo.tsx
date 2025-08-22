import Image from "next/image"
import React from "react"
import clsx from "clsx"

type LogoProps = {
    variant?: "black" | "white"
}

export default function Logo({ variant = "black" }: LogoProps) {
    const logoSrc = variant === "white" ? "/icons/logo-white.svg" : "/icons/Logo.svg"

    return (
        <a
            href="#"
            className="flex items-center gap-2 font-medium"
        >
            <div className="flex w-6 h-6 items-center justify-center rounded-md">
                <Image
                    src={logoSrc}
                    alt="Logo"
                    width={20.18}
                    height={22.33}
                />
            </div>
            <span
                className={clsx({
                    "text-black": variant === "black",
                    "text-white": variant === "white",
                })}
            >
                Logoipsum
            </span>
        </a>
    )
}
