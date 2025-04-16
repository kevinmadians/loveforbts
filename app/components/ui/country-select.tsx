"use client"

import React, { useMemo } from "react"
import Image from "next/image"
import { countries, getCountryCode } from "../../lib/country-codes"

interface CountrySelectProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
  id: string
  hasError?: boolean
  className?: string
}

export function CountrySelect({
  value,
  onChange,
  name,
  id,
  hasError = false,
  className = ""
}: CountrySelectProps) {
  const selectedCountryCode = useMemo(() => getCountryCode(value), [value])
  
  return (
    <div className="relative">
      {value && selectedCountryCode && (
        <div 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 w-6 h-4 flex items-center justify-center" 
          aria-hidden="true"
        >
          <Image 
            src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`}
            alt={`Flag of ${value}`}
            width={24}
            height={16}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${value ? 'pl-12' : 'pl-4'} py-2 border-2 ${
          hasError ? "border-red-500" : "border-black"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      >
        <option value="">Select your country</option>
        {countries.map(({ name, code }) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
} 