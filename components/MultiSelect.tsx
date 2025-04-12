// components/ui/multi-select.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

type Option = { value: string; label: string };

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  onClear,
}: {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    onClear?.();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn("w-full justify-between group relative", className)}>
          <div className='flex gap-1 flex-wrap pr-6'>
            {selected.length > 0 ? (
              options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => (
                  <Badge
                    key={opt.value}
                    variant='secondary'
                    className='mr-1 mb-1'>
                    {opt.label}
                  </Badge>
                ))
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
          </div>

          <div className='absolute right-2 flex items-center gap-1'>
            {selected.length > 0 && (
              <X
                className='h-4 w-4 text-muted-foreground hover:text-foreground transition-colors'
                onClick={handleClear}
                aria-label='Clear selection'
              />
            )}
            <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-full p-0' align='start'>
        <Command>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.value}
                onSelect={() => {
                  const newSelected = selected.includes(opt.value)
                    ? selected.filter((v) => v !== opt.value)
                    : [...selected, opt.value];
                  onChange(newSelected);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(opt.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
