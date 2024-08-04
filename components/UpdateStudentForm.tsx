/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  useAddStudentMutation,
  useEditStudentMutation,
  useGetAllGendersQuery,
  useGetAllGradesQuery,
  useGetStudentByIdQuery,
} from "../lib/redux/services/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
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
  studentId: string;
};

const UpdateStudentForm: React.FC = ({ formClose, studentId }: props) => {
  const { data: grades } = useGetAllGradesQuery();
  const { data: genders } = useGetAllGendersQuery();
  const {
    data: student,
    isLoading,
    refetch,
  } = useGetStudentByIdQuery(studentId);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "onTouched",
  });

  const [updateStudent] = useEditStudentMutation();
  const onSubmit = async (data: FormValues) => {
    console.log(data.birthDate.$d);
    const formatedData = {
      ...data,
      birthDate: new Date(data.birthDate.$d).toISOString(),
      id: studentId,
    };
    console.log(formatedData);
    await toast.promise(updateStudent(formatedData).unwrap(), {
      pending: "pending",
      success: "resolved ",
      error: "rejected ",
    });
  };

  useEffect(() => {
    if (student) {
      console.log(student);
      reset({
        firstName: student?.firstName,
        lastName: student?.lastName,
        birthDate: student.birthDate ? dayjs(student.birthDate) : null,
        grade: student?.grade.id,
        country: student?.country,
        city: student?.city,
        gender: student?.gender.id,
        phone: student?.phone,
        remarks: student?.remarks,
      });
    }
  }, [student, reset]);
  //defaultValue={}
  if (isLoading)
    return (
      <Box sx={{ textAlign: "center", paddingY: 20 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ boxShadow: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
          <Typography variant="h4">Update Student</Typography>

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
                  defaultValue={student?.lastName}
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
                    defaultValue={student?.grade.id}
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
                  <InputLabel>Country</InputLabel>
                  <Select
                    {...field}
                    label="Country"
                    defaultValue={student?.country}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: errors.country ? "red" : undefined,
                        },
                      },
                    }}
                  >
                    <MenuItem value="Syria">Syria</MenuItem>
                    <MenuItem value="Egypt">Egypt</MenuItem>
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
                    defaultValue={student?.city}
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
                  defaultValue={student?.phone}
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
                    defaultValue={student?.gender.id}
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
            //rules={{ required: "Note is required" }}
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
              Update
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

export default UpdateStudentForm;
