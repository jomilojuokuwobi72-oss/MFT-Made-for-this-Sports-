import React from "react";
import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    (
        { as: Comp = "section", className, children, ...restProps },
        ref
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = Comp as any;
        return (
            <Component
                ref={ref}
                className={clsx("px-4 first:pt-10 md:px-6", className)}
                {...restProps}
            >
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
                    {children}
                </div>
            </Component>
        );
    }
);

Bounded.displayName = "Bounded";
