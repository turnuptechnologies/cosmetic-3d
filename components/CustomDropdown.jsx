"use client"

import { useState } from "react"
import { ChevronDown, Globe, Smartphone, Zap, Target, ShoppingCart, Briefcase } from "lucide-react"

export function CustomDropdown({ dropdownValue, name, label }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)

  const handleSelect = (value) => {
    setSelectedType(value)
    setIsOpen(false)
  }

  const selectedProject = dropdownValue.find((type) => type.value === selectedType)
  const SelectedIcon = selectedProject?.icon

  return (
    <div className="relative w-full">
      {/* Dropdown Trigger */}
      <input type="hidden" name={name} value={selectedType || ""} />

      <button
        name={name}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`relative w-full px-6 py-3 rounded-4xl bg-[#161616] from-[#161616] to-[#161616] border border-neutral-800 text-left text-foreground font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-background ${isOpen ? "border-neutral-700 shadow-lg shadow-neutral-900/50" : ""
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {SelectedIcon && <SelectedIcon className="h-5 w-5 text-neutral-400" />}
            <span className={selectedProject ? "text-foreground" : "text-muted-foreground"}>
              {label}
            </span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu Content */}
          <div className="absolute z-20 w-full mt-2 bg-gradient-to-br from-[#161616] via-[#161616] to-[#161616] border border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-950/80 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="p-2">
              {dropdownValue.map((type, index) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => handleSelect(type.value)}
                    className={`w-full px-4 py-3.5 rounded-xl flex items-center gap-3 text-left transition-all duration-150 hover:bg-neutral-800/60 hover:translate-x-1 focus:outline-none focus:bg-neutral-800/60 animate-in fade-in-0 slide-in-from-left-1 group ${selectedType === type.value ? "bg-neutral-800/80" : ""
                      }`}
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    {/* <Icon className="h-5 w-5 text-neutral-400 transition-transform duration-200 group-hover:scale-110" /> */}
                    <span className="text-foreground font-medium">{type.label}</span>
                    {selectedType === type.value && (
                      <ChevronDown className="ml-auto h-4 w-4 text-neutral-400 -rotate-90" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Decorative gradient border at bottom */}
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          </div>
        </>
      )}
    </div>
  )
}
