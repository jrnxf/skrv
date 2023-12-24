import React from "react";
import { cn } from "~/lib/utils";

const Logo = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    width="100"
    height="19"
    viewBox="0 0 100 19"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={cn("", className)}
    {...props}
  >
    <path
      d="M35.3631 12.7837C33.0014 12.9057 30.1118 11.3908 28.9104 9.39974C30.1118 7.40899 33.0014 5.89346 35.3631 6.01604V12.7837ZM88.4582 5.36819e-05C83.3599 -0.0123847 79.0759 2.47574 76.916 6.01604V5.36819e-05H70.7597C65.7905 -0.0123847 61.3777 2.47574 59.2173 6.01604V5.36819e-05H53.0615C48.2426 -0.0123847 43.679 2.47574 41.5191 6.01604V5.36819e-05H35.3631C30.1964 -0.0123847 25.9808 2.47574 23.8207 6.01604V5.36819e-05H17.6648C12.0518 -0.0123847 7.24122 3.62367 5.88821 8.52261C5.21178 10.9719 2.59485 12.8659 0 12.7837V18.7994C5.18954 18.9637 10.4236 15.1759 11.7766 10.2772C12.453 7.828 15.0701 5.93407 17.6648 6.01604V18.7994H23.8207V12.7837C25.9808 16.3242 31.1507 19.0185 35.3631 18.7994H41.5191C42.2179 13.0601 46.5676 6.2801 53.0615 6.01604V18.7994H59.2173C59.9166 13.0601 64.2659 6.2801 70.7597 6.01604V18.7994H76.916C77.6146 13.0601 81.9644 6.2801 88.4582 6.01604V18.7994H94.614V6.01604H100V5.36819e-05H88.4582Z"
      fill="currentColor"
    />
  </svg>
));

Logo.displayName = "Logo";

export { Logo };
