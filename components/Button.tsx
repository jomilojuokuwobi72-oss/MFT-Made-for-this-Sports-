import clsx from "clsx";
import Link from "next/link";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function Button({ href, children, className }: Props) {
    return (
        <Link
            className={clsx(
                "rounded-xl bg-primary-violet px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-all duration-150 hover:opacity-90 hover:scale-105 active:scale-95 md:text-2xl",
                className,
            )}
            href={href}
        >
            {children}
        </Link>
    );
}
