import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import loginImage from "../assets/login.png";
import { useLoginMutation } from "../../lib/redux/services/Api";
import { useDispatch } from "react-redux";
import { setToken } from "../../lib/redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface FormValues {
  userName: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const userData = await toast.promise(login(data).unwrap(), {
        pending: "pending",
        success: "resolved ",
        error: "rejected ",
      });

      dispatch(setToken(userData.token));
      sessionStorage.setItem("token", userData.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to login: ", err);
    }
    reset();
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ height: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={loginImage}
          alt="Login"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "600px",
            marginTop: "20px",
          }}
        />
      </Box>

      <Box
        sx={{
          bgcolor: "#2148c0",
          padding: { sm: 2 },
          height: "95.7vh",
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            padding: 20,
            paddingTop: 30,
            paddingBottom: 30,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Typography color={"black"} variant="h4">
              Login
            </Typography>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
              direction={"column"}
            >
              <Controller
                name="userName"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User Name"
                    variant="outlined"
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.userName ? "red" : undefined,
                        },
                      },
                      width: "100%",
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.password ? "red" : undefined,
                        },
                      },
                      width: "100%",
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1f7bf4",
              width: "100%",
              marginTop: 2,
            }}
            color="primary"
          >
            Login
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
