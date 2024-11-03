import React, { memo } from "react";
const Result = ({ data,confidence }) => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
     {data && <div class="toast show">
    <div class="toast-header text-secondary">
      <strong class="me-auto">Image Uploaded</strong>
    </div>
    <div class="toast-body">
      <span className="text-dark d-block">Prediction is {data}</span>
      <span className="text-dark d-block pt-1">Confidence is {confidence}</span>
    </div>  
  </div>}
</div>

  );
};

export default memo(Result);