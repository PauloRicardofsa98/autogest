import { FieldValues, Control, Path } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";

interface InputEmailProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  format?: string;
}
export const InputField = <T extends FieldValues>({
  control,
  disabled,
  name,
  description,
  type = "text",
  format,
}: InputEmailProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{description}</FormLabel>
          <FormControl>
            {format ? (
              <PatternFormat
                format={format}
                customInput={Input}
                {...field}
                disabled={disabled}
              />
            ) : (
              <Input
                {...field}
                className={`${type === "number" ? "text-right" : ""}`}
                disabled={disabled}
                type={type}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
