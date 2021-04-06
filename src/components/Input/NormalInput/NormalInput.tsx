import React from "react"
import { Field, FieldProps } from "formik"
import { FormControl, OutlinedInput, InputLabel, FormHelperText } from "@material-ui/core"




interface IProps {
  placeholder?: string;
  name: string;
  type?: "text" | "email";
  label?: string;
  showErrors?: boolean;
  className?: string;
  multiline?:boolean;
  rowsMax?:number
}

const NormalInput: React.FC<IProps> = ({
   placeholder, showErrors = true, className, 
   label, name, type,multiline,rowsMax, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <FormControl variant="outlined" className={className}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput id={name} type={type || "text"} rowsMax={rowsMax} multiline={multiline} {...field} label={label ? label : undefined} />
            { form.touched[name] &&
              form.errors[name] &&
              <FormHelperText className="text-error" >{form.errors[name]}</FormHelperText>
            }
          </FormControl>
        )
      }}
    </Field>
  );
}


export default React.memo(NormalInput)