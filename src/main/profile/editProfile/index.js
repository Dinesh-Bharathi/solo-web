/* eslint-disable react/prop-types */
import React from "react";
import MuiDialog from "../../../components/muiDialog";

const EditProfile = ({ openEdit, setOpenEdit }) => {
  return (
    <MuiDialog
      open={openEdit}
      setOpen={setOpenEdit}
      title={""}
      size="xl"
    ></MuiDialog>
  );
};

export default EditProfile;
