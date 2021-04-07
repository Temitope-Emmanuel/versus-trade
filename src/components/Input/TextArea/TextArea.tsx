import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField,{TextFieldProps,BaseTextFieldProps} from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { Field, FieldProps } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }),
);


interface IProps extends BaseTextFieldProps {
    name:string
}

const MultilineTextFields:React.FC<IProps> = ({name,label,variant,...props}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FormControl variant="outlined" className={classes.root}>
                        <TextField className={classes.root}
                            id={name}
                            label={label}
                            multiline
                            rows={4}
                            variant={variant || "outlined"}
                            helperText={form.touched[name] && form.errors[name] ? form.errors[name] : undefined }
                            {...props} {...field}
                        />
                    </FormControl>
                )
            }}
        </Field>
    );
}

export default MultilineTextFields