import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface FormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: string;
  country: string;
  city: string;
  gender: string;
  phone: string;
  remarks: string;
}

const AddStudenForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: FormValues) => {
    const formatedData = {
      ...data,
      birthDate: new Date(data.birthDate.$d).toISOString(),
    };
    console.log(formatedData);

    reset();
  };

  return (
    <Box sx={{ boxShadow: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
          <Typography variant="h4">Add Student</Typography>

          <Stack gap={3} direction={"row"}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.firstName ? "red" : undefined,
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.lastName ? "red" : undefined,
                      },
                    },
                  }}
                />
              )}
            />
          </Stack>

          <Stack gap={3} direction={"row"}>
            <Controller
              name="birthDate"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Date"
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: errors.birthDate ? "red" : undefined,
                            },
                          },
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="grade"
              control={control}
              rules={{ required: "Education Level is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Education Level"
                  fullWidth
                  variant="outlined"
                  error={!!errors.grade}
                  helperText={errors.grade?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.grade ? "red" : undefined,
                      },
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack gap={3} direction={"row"}>
            <Controller
              name="country"
              control={control}
              rules={{ required: "country is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.country}
                >
                  <InputLabel>County</InputLabel>
                  <Select
                    {...field}
                    label="Country"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.country ? "red" : undefined,
                        },
                      },
                    }}
                  >
                    <MenuItem value="18-25">18-25</MenuItem>
                    <MenuItem value="26-35">26-35</MenuItem>
                    <MenuItem value="36-45">36-45</MenuItem>
                    <MenuItem value="46+">46+</MenuItem>
                  </Select>
                  {errors.country && (
                    <Typography color="red">
                      {errors.country.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="city"
              control={control}
              rules={{ required: "city is required" }}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined" error={!!errors.city}>
                  <InputLabel>City</InputLabel>
                  <Select
                    {...field}
                    label="City"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.city ? "red" : undefined,
                        },
                      },
                    }}
                  >
                    <MenuItem value="18-25">18-25</MenuItem>
                    <MenuItem value="26-35">26-35</MenuItem>
                    <MenuItem value="36-45">36-45</MenuItem>
                    <MenuItem value="46+">46+</MenuItem>
                  </Select>
                  {errors.city && (
                    <Typography color="red">{errors.city.message}</Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>

          <Stack gap={3} direction={"row"}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Mobile is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.phone ? "red" : undefined,
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: "gender is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.gender}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    {...field}
                    label="Gender"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.gender ? "red" : undefined,
                        },
                      },
                    }}
                  >
                    <MenuItem value="18-25">18-25</MenuItem>
                    <MenuItem value="26-35">26-35</MenuItem>
                    <MenuItem value="36-45">36-45</MenuItem>
                    <MenuItem value="46+">46+</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="red">{errors.gender.message}</Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>
          <Controller
            name="remarks"
            control={control}
            rules={{ required: "Note is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Note"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.remarks ? "red" : undefined,
                    },
                  },
                }}
              />
            )}
          />

          {/* Submit Button */}
          <Stack direction={"row"} gap={3} justifyContent={"center"}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1f7bf4" }}
              color="primary"
            >
              Add
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={[
                {
                  backgroundColor: "white",
                  color: "#1f7bf4",
                  border: "1px solid #1f7bf4",
                },
                (theme) => ({
                  "&:hover": {
                    color: "white",
                  },
                }),
              ]}
              color="primary"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AddStudenForm;
