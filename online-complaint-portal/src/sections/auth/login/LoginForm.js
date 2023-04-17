import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Box, Stack, IconButton, InputAdornment, TextField, Checkbox, InputLabel, Select, MenuItem, FormControl, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { postRegisterForm } from '../../../api/Api';
import { AccountContext } from '../../../context/AccountProvider';

// ----------------------------------------------------------------------
const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
  
}

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    const temp = { ...errors }

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required."

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required."

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required."
      if (fieldValues.password)
        temp.password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(fieldValues.password)
          ? ""
          : "Set password with min 8 letter password, least a symbol, an upper, a lower case letters and a number"
    }
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required."
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid."
    }


    setErrors({
      ...temp
    });
  }


  const handleInputValue = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = values) => {

    const isValid =
      fieldValues.firstName &&
      fieldValues.lastName &&
      fieldValues.email &&
      fieldValues.password &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };
  

  return {
    handleInputValue,
    formIsValid,
    errors,
    values
  };
}

export default function LoginForm() {
  
  const {
    handleInputValue,
    formIsValid,
    errors,
    values
  } = useFormControls();

  const { account, setAccount } =   (AccountContext);
  
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setloginType] = useState('USER');
  
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    message: "Everything's Good",
  });
  
  const navigateTo = () => {
    navigate('/dashboard', { replace: true });
  };

  const changeLoginType = (event) => {
    setloginType(event.target.value);
    console.log(loginType);
  };


  const handleFormSubmit = async (event) => {

    event.preventDefault();
    if (formIsValid(values)) {
      console.log(values)
      const res = await postRegisterForm(values);

      if (res) {
        console.log(res);
        setSnackBarState({ open: true, message: res });
        const temp = { "id": "", "email": values.email, "firstName": values.firstName };
        console.log(temp);
        setAccount(temp);
        navigateTo("/");
        console.log(account);
      } else {
        console.log("postRegisterForm did not return val");
      }

    }
  };
  
  return (
    

    <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            onBlur={handleInputValue}
            onChange={handleInputValue}
            required
            fullWidth
            id="firstName"
            label="First Name" autoFocus
            {...(errors.firstName && { error: true, helperText: errors.firstName })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onBlur={handleInputValue}
            onChange={handleInputValue}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            {...(errors.lastName && { error: true, helperText: errors.lastName })}
          />
        </Grid>
        
        <TextField
          required
          onBlur={handleInputValue}
          onChange={handleInputValue}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          {...(errors.email && { error: true, helperText: errors.email })}
        />

        <TextField
          required
          onBlur={handleInputValue}
          onChange={handleInputValue}
          id="password"
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...(errors.password && { error: true, helperText: errors.password })}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Login Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={loginType}
            label="loginType"
            onChange={changeLoginType}
          >
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"ABMIN"}>ABMIN</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ width: "200px", mt: 3, mb: 2, backgroundColor: "black" }}
      >
        Create Account
      </LoadingButton>
    </Box>
  );
}
