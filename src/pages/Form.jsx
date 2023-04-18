import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import travelmobile from "../images/travelmobile.jpg";
import LocationCard from "../components/Card";
// import punjabimage from "../images/punjabimage.jpg";

// import MapComponent from "../components/Map";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

// theme for form
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

const validationSchema = Yup.object().shape({
  destination: Yup.string().required("Destination is required"),
  currentLocation: Yup.string().required("Current Location is required"),
  budget: Yup.number().required("Budget is required"),
  familyMembers: Yup.number()
    .required("Family Members is required")
    .integer("Family Members must be an integer")
    .max(50, "Maximum family members allowed is 50"),
  children: Yup.number()
    .required("Children is required")
    .integer("Children must be an integer")
    .max(20, "Maximum children allowed is 20")
    .test(
      "familyMembers",
      "No of Children must be less than or equal to family members",
      function (value) {
        const { familyMembers } = this.parent;
        if (value <= familyMembers) {
          return true;
        }
        return false;
      }
    ),
});

const Form = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [formData, setFormData] = useState(null);
  // const [days, setDays] = useState(0);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateRangeChange = (date) => {
    setSelectedDateRange(date);
  };

  const formik = useFormik({
    initialValues: {
      destination: "",
      currentLocation: "",
      budget: 0,
      familyMembers: 0,
      children: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsOpen(true);
      let startDate = selectedDateRange[0];
      let endDate = selectedDateRange[1];
      let day = endDate.diff(startDate, "day");
      // setDays(day);
      // console.log(values.destination);
      const { destination, budget, currentLocation, familyMembers, children } =
        values;
      axios
        .post("/api/planner", {
          destination,
          day,
          budget,
          familyMembers,
          children,
          currentLocation,
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data[0].coordinates[0]);
          // console.log(typeof res.data[0].coordinates[0]);
          setData(res.data);
          // console.log(data);
        })
        .catch((err) => console.log(err));
      setFormData({ formData, ...{ values, selectedDateRange } });
    },
  });

  // console.log(formData);

  return (
    <ThemeProvider theme={theme}>
      <h1>Your AI Trip Planner</h1>
      <div
        style={{
          flexGrow: 1,
          backgroundImage: `url(${travelmobile})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // filter: 'brightness(0.8)',
          padding: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          border="0px solid black"
          mt="50px"
        >
          <form
            style={{
              width: "65%",
              border: "1px solid black",
              padding: "20px",
              borderRadius: "9px",
              marginLeft: "40px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="destination"
                  name="destination"
                  label="Destination"
                  {...formik.getFieldProps("destination")}
                  fullWidth
                />
                {formik.touched.destination && formik.errors.destination ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.destination}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="currentLocation"
                  name="currentLocation"
                  label="Current Location"
                  {...formik.getFieldProps("currentLocation")}
                  fullWidth
                />
                {formik.touched.currentLocation &&
                formik.errors.currentLocation ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.currentLocation}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="budget"
                  name="budget"
                  label="Budget"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("budget")}
                  fullWidth
                />
                {formik.touched.budget && formik.errors.budget ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.budget}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateRangePicker
                    defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
                    value={selectedDateRange}
                    onChange={handleDateRangeChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="familyMembers"
                  name="familyMembers"
                  label="Family Members"
                  type="number"
                  {...formik.getFieldProps("familyMembers")}
                  fullWidth
                />
                {formik.touched.familyMembers && formik.errors.familyMembers ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.familyMembers}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="children"
                  name="children"
                  label="Children"
                  type="number"
                  {...formik.getFieldProps("children")}
                  fullWidth
                />
                {formik.touched.children && formik.errors.children ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.children}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: 24, display: "block" }}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {isOpen ? (
          !data ? (
            <div>
              <h2> Loading...</h2>
            </div>
          ) : (
            data.map((value) => {
              return (
                <div>
                  <LocationCard name = {value.name} location = {value.location} description = {value.description} price = {value.price} coordinates = {value.coordinates} />
                </div>
              );
            })
          )
        ) : (
          ""
        )}
      </div>
    </ThemeProvider>
  );
};

export default Form;
