import React from "react"
import { Field, FieldProps } from "formik"
import { FormControl, OutlinedInput, InputLabel,InputProps,FilledInput,Input, FormHelperText, IconButton, InputAdornment } from "@material-ui/core"
import {AiFillEyeInvisible} from "react-icons/ai"
import {BiShow} from "react-icons/bi"



interface IProps extends InputProps {
  placeholder?: string;
  name: string;
  type?: "text" | "email" | "password";
  label?: string;
  showErrors?: boolean;
  className?: string;
  multiline?:boolean;
  rowsMax?:number;
  variant?:"Filled" | "Outlined" | "Standard";
}

const NormalInput: React.FC<IProps> = ({
   placeholder, showErrors = true, className, 
   label, name, type,variant="Outlined",multiline,rowsMax,ref, ...props }) => {
     const [showPassword,setShowPassword] = React.useState(false)
     const handleToggle = () => {
       setShowPassword(!showPassword)
     }
     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <FormControl variant="outlined" className={className}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
             {variant === "Outlined" ? 
              <OutlinedInput id={name} type={type || "text"} rowsMax={rowsMax} multiline={multiline}
               {...field} label={label ? label : undefined} /> 
              : variant === "Filled" ?
              <FilledInput id={name} type={type || "text"} rowsMax={rowsMax} multiline={multiline} {...field} />  :
              <Input id={name} type={type === "password" ? showPassword ? "password" : "text" : "text"}
                multiline={multiline} {...field} rowsMax={rowsMax} ref={ref}
                endAdornment={ type === "password" ? 
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggle}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <BiShow /> : <AiFillEyeInvisible />}
                    </IconButton>
                  </InputAdornment> : undefined
                }
              /> 

             }
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