"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandList,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { log } from "console";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Filter Button */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[230px] w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white text-lg font-bold py-6 px-6 rounded-[8px]"
        >
          {
            value
              ? categories.find((category) => category._id === value)?.title
              : "Filter by Category" /*title*/
          }

          {/* Icon */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="sm:w-full sm:max-w-[220px]  p-0 bg-white rounded-[8px] shadow-xl">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />

          <CommandList >
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  {category.title}


                  {/* Check Icon */}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-100"
                    )}
                  />
                  {console.log}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
