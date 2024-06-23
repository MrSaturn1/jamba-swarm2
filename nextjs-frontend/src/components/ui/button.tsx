import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

const Button: FC<ButtonProps> = ({ variant = "solid", children, ...props }) => {
  const className = variant === "outline"
    ? "border rounded px-4 py-2"
    : "bg-blue-500 text-white rounded px-4 py-2";

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
