"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface listComboboxElements{
  value: string,
  label: string,
}

interface comboboxProps {
  dataList: Array<listComboboxElements>,
  externalPlaceholder?: string,
  searchPlaceholder?: string,
  defaultValue?: string,
  onChange?: (event: { 
    target: { name?: string; value: string } 
  }) => void;  
  name?: string
}

export function Combobox({
  dataList,
  externalPlaceholder = "",
  searchPlaceholder = "",
  defaultValue = "",
  name,
  onChange,
}: comboboxProps) {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    
    setValue(newValue)
    setOpen(false)

    // 🔥 Simulamos un evento de input para reusar handleInputChange()
    onChange?.({
      target: {
        name,
        value: newValue,
      }
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? dataList.find((element) => element.value === value)?.label
            : externalPlaceholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup>
              {dataList.map((element) => (
                <CommandItem
                  key={element.value}
                  value={element.value}
                  onSelect={handleSelect}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === element.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {element.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}