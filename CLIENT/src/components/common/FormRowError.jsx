import React from "react";
import { ErrorIcon } from "./icons";

const FormRowError = ({ errors }) => {
  if (!errors) return null;
  return (
    <>
      {errors && (
        <div className="text-sm text-red-500 mt-2">
          <div className="flex gap-2 items-center">
            <ErrorIcon className="icon icon-sm" />
            {errors.message}
          </div>
        </div>
      )}
    </>
  );
};

export default FormRowError;
