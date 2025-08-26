"use client";
import { Controller } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";
import { cn } from "@/utils";

const BooleanFormInput = ({
  control,
  id,
  name,
  label,
  className,
  labelClassName,
  containerClassName,
  noValidate,
  fullWidth,
  startInnerIcon,
  endButtonIcon,
  ...other
}) => {
  return (
    <Controller
      control={control}
      defaultValue={""}
      render={({ field, fieldState }) => (
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-default-600">
            {name}
          </h4>
          <div className="flex items-center gap-4">
            {label && (
              <label
                className={cn(
                  "block text-sm text-default-600",
                  labelClassName
                )}
                htmlFor={name}
              >
                {label}
              </label>
            )}
            <input
              {...other}
              {...field}
              id={id ?? name}
              className="relative h-7 w-[3.25rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-default-200 transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:transition before:duration-200 before:ease-in-out checked:!bg-primary checked:bg-none checked:before:translate-x-full focus:ring-0 focus:ring-transparent"
            />
          </div>
          {!noValidate && fieldState.error?.message && (
            <p className="mt-2 text-xs text-red-600">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
      name={name}
    />
  );
};

export default BooleanFormInput;
