import React from "react"
import {Field,FieldProps} from "formik"
import {makeStyles,createStyles} from "@material-ui/styles"
import {FormControl,OutlinedInput,InputLabel,FormHelperText} from "@material-ui/core"




interface IProps {
  placeholder?:string;
  name:string;
  type?:"text" | "email";
  label?:string;
  showErrors?:boolean;
  className?:string;
}

const NormalInput:React.FC<IProps> = ({placeholder,showErrors = true,className,label,name,type,...props}) => {  
    const [show, setShow] = React.useState(false);
    return (
      <Field name={name}>
        {({ field, form }:FieldProps) => {
          return(
            <FormControl className={className} variant="outlined">
              <InputLabel htmlFor={name}>{label}</InputLabel>
              <OutlinedInput id={name} type={type || "text"} {...field} label={label ? label : undefined} />
              { form.touched[name]  && 
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