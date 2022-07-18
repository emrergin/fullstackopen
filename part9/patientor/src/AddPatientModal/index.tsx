import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

// type patientSubmit=(values: PatientFormValues) => void;
// type entrySubmit=(values: EntryFormValues) => void;

type Props = {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
  message: "Add a new patient";
}|
{
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  message: "Add a new entry";
};


const AddPatientModal = ({ modalOpen, onClose, onSubmit, error,message }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>{message}</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      {message==="Add a new patient" &&
        <AddPatientForm onSubmit={onSubmit as (values: PatientFormValues) => void} onCancel={onClose} />
      }
      {message==="Add a new entry" &&
        <AddEntryForm onSubmit={onSubmit as (values: EntryFormValues) => void} onCancel={onClose} />
      }
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
