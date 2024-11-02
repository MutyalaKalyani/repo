import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Test.css"
import Result from "./Result";
const Test = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [confidence,setConfidence]=useState(null)
  const File = useRef(null);
  useEffect(() => {
    const func = () => {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    };
    func();
  }, [file]);
  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
     try{
      const result = await axios.post(
        "https://breast-cancer-classification-z7h1.onrender.com/predict",
        formData,
      );
      setLoading(false);
      setData(result.data.class);
      setConfidence(result.data.confidence);
     }
     catch{
       return (<div class="alert alert-danger" role="alert">
        A simple danger alert with <a href="/test" class="alert-link">an example link</a>. Give it a click if you like.
      </div>)
     }
  };
  const clearHandler=()=>{
    setFile(null)
    if (File.current) {
       File.current.value = ''; // Clear the file input field
    }
    setData(null)
    setPreviewUrl(null);
    setLoading(false)
  }
  return (
    <>

      <div class="form-label d-flex justify-content-evenly align-items-center home_container row">
        <div className="form_container col-8 col-md-6 col-lg-4">
          <form onSubmit={upload}>
            <label for="formFile" class="form-label d-block home_label">
              select file
            </label>
            <small className="file_info">upload only jpg, jpeg or png</small>
            <div class="form_input">
              <input
                class="form-control"
                type="file"
                accept=".png, .jpg, .jpeg"
                id="formFile"
                ref={File}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <div className="d-flex justify-content-evenly">
            {loading ? (
              <button type="submit" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit">Upload</button>
            )}
            {file && (
          <button
            id="clearButton"
            className="btn btn-danger ml-3 clear"
            onClick={clearHandler}
          >
            <span>Clear</span>
          </button>
          
        )}
        </div>
          </form>
        </div>
        {previewUrl && (<div className="card" style={{ width: '450px'} } >
          <h5 className="card-title mt-2">Preview:</h5>
              <img src={previewUrl} className="card-img  mb-3" alt="Preview" style={{width:'424.4px',height:'242.512px'}}/>
              </div>
        )}
      </div>
      <Result data={data} confidence={confidence} />
    </>
  );
};
export default Test;
