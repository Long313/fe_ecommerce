import React from "react"

export default function FormField({ children, error }: { children: React.ReactNode, error?: string }) {
  return (
    <>
      {children}
      <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px]">
        {error || "\u00A0"}
      </p>
    </>
  )
};