/* eslint-disable react-hooks/rules-of-hooks */
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
import {
  useAddStudentMutation,
  useGetAllGendersQuery,
  useGetAllGradesQuery,
} from "../lib/redux/services/Api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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

type props = {
  formClose: () => void;
};

const AddStudenForm: React.FC = ({ formClose }: props) => {
  const cultureCode = useSelector((state) => state.language.cultureCode);
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
  const { data: grades } = useGetAllGradesQuery();
  const { data: genders } = useGetAllGendersQuery();
  const [addStudent] = useAddStudentMutation();
  const onSubmit = async (data: FormValues) => {
    const formatedData = {
      ...data,
      birthDate: new Date(data.birthDate.$d).toISOString(),
    };
    console.log(formatedData);
    await toast.promise(addStudent(formatedData).unwrap(), {
      pending: "pending",
      success: "resolved ",
      error: "rejected ",
    });
    reset();
  };

  return (
    <Box sx={{ boxShadow: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
          <Typography
            sx={{ direction: cultureCode == "0" ? "ltr  " : "rtl" }}
            variant="h4"
          >
            {cultureCode == "0" ? "Add Student " : "  اضافة طالب"}
          </Typography>

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
              rules={{ required: "grade is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.grade}
                >
                  <InputLabel>grade</InputLabel>
                  <Select
                    {...field}
                    label="grade"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.grade ? "red" : undefined,
                        },
                      },
                    }}
                  >
                    {grades?.map((grade) => {
                      return (
                        <MenuItem value={grade.id}>
                          {grade.translations[0].name}
                        </MenuItem>
                      );
                    })}
                    {/* <MenuItem value="male-ذكر">male</MenuItem>
                    <MenuItem value="female-انثى">female</MenuItem> */}
                  </Select>
                  {errors.grade && (
                    <Typography color="red">{errors.grade.message}</Typography>
                  )}
                </FormControl>
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
                    <MenuItem value="syrie">syrie</MenuItem>
                    <MenuItem value="egypt">egypt</MenuItem>
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
                    <MenuItem value="Aleppo">Aleppo</MenuItem>
                    <MenuItem value="Alexandria">Alexandria</MenuItem>
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
                    {genders?.map((gender) => {
                      return (
                        <MenuItem value={gender.id}>
                          {gender.translations[1].name}
                        </MenuItem>
                      );
                    })}
                    {/* <MenuItem value="male-ذكر">male</MenuItem>
                    <MenuItem value="female-انثى">female</MenuItem> */}
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
              {cultureCode == "0" ? "Add" : "اضافة "}
            </Button>
            <Button
              onClick={formClose}
              fullWidth
              variant="contained"
              sx={[
                {
                  backgroundColor: "white",
                  color: "#1f7bf4",
                  border: "1px solid #1f7bf4",
                },
                () => ({
                  "&:hover": {
                    color: "white",
                  },
                }),
              ]}
              color="primary"
            >
              {cultureCode == "0" ? "Cancel" : "الغاء"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AddStudenForm;
