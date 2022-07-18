import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form  } from "formik";
import { TextField, DiagnosisSelection,HealthOption,SelectField,TypeOption } from "./FormField";
import { HealthCheckEntry,OccupationalHealthcareEntry,HospitalEntry } from "../types";
import { useStateValue } from "../state";

export interface EntryFormValues extends  Omit<HealthCheckEntry, "id"| "type">
                              ,Omit<OccupationalHealthcareEntry, "id"| "type">
                              ,Omit<HospitalEntry, "id"| "type">
{
     type:"Hospital"|"OccupationalHealthcare"|"HealthCheck"  ;
    //  type:string;      
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" },
];

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Check" },
  { value: "OccupationalHealthcare", label: "Occupation" },
  { value: "Hospital", label: "Hospital" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [""],
        type: "HealthCheck",
        healthCheckRating: 0,
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!Date.parse(values.date)){
          errors.date = "That is not a date";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type==="OccupationalHealthcare"){
          if (values.sickLeave){
            if (!Date.parse(values.sickLeave?.startDate)){
              errors['sickLeave.startDate'] = "Start date is misformatted.";
            }
            if (!Date.parse(values.sickLeave?.endDate)){
              errors['sickLeave.endDate'] = "End date is misformatted.";
            }
          }
        }
        if (values.type==="Hospital"){
          if (values.discharge){
            if (!Date.parse(values.discharge?.date)){
              errors['discharge.date'] = "That is not a date.";
            }
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue,setFieldTouched, values}) => {

        return (
          <Form className="form ui">
            <SelectField label="Category" name="type" options={typeOptions} />   
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Dr. Name Surname"
              name="specialist"
              component={TextField}
            />
            {values.type==="HealthCheck" && <SelectField label="Rating" name="healthCheckRating" options={healthOptions} />}
            {values.type==="Hospital" &&
            <Field
              label="Reason"
              placeholder="Reason"
              name="['discharge.criteria']"
              component={TextField}
            />  }
            {values.type==="Hospital" &&
              <Field
              label="Release Date"
              placeholder="YYYY-MM-DD"
              name="['discharge.date']"
              component={TextField}
            />  }
            {values.type==="OccupationalHealthcare" &&
              <Field
              label="Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="['sickLeave.startDate']"
              component={TextField}
            />  }
            {values.type==="OccupationalHealthcare" &&
              <Field
              label="Leave End Date"
              placeholder="YYYY-MM-DD"
              name="['sickLeave.endDate']"
              component={TextField}
            />  }   
            {values.type==="OccupationalHealthcare" &&
            <Field
              label="Employer"
              placeholder="Company Name"
              name="employerName"
              component={TextField}
            />  }              
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

 
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
