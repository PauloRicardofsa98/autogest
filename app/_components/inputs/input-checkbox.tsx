import { FieldValues, Control, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/app/_lib/utils";
import { Checkbox } from "../ui/checkbox";

interface InputCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  format?: string;
  className?: string;
  onBlur?: () => void;
}
export const InputCheckbox = <T extends FieldValues>({
  control,
  disabled,
  name,
  description,
  className,
}: InputCheckboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "mt-4 flex flex-row items-start space-x-3 space-y-0",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>

          <FormLabel>{description}</FormLabel>
        </FormItem>
      )}
    />
  );
};
