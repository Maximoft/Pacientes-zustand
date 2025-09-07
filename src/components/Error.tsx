import type { ReactNode } from "react";

export default function Error({children}:{children: ReactNode}) {
  return (
    <p className="bg-red-400/88 rounded-lg p-0.5 text-center text-white my-4  ">
      {children}
    </p>
  )
}
