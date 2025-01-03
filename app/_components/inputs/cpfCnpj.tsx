import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { maskCpfCnpj } from "@/app/_utils/helper";

interface InputCpfCnpjProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const InputCpfCnpj = <T extends FieldValues>({
  control,
  name,
}: InputCpfCnpjProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => {
        return (
          <FormItem>
            <FormLabel>CPF ou CNPJ</FormLabel>
            <FormControl>
              <Input
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  const truncatedValue = inputValue.substring(0, 14);
                  onChange(maskCpfCnpj(truncatedValue));
                }}
                {...rest}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
