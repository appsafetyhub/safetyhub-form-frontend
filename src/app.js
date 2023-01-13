import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactFormBuilder, ElementStore, Registry } from "@appsafetyhub/safetyhub-form-creator";
import imageCompression from "browser-image-compression";

const UploadImage = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [state, setState] = useState(null);
  const [type, setType] = useState("file");

  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
      {defaultValue && defaultValue ? (
        <>
          <img
            src={defaultValue}
            style={{ width: "100px", height: "100px", borderRadius: "10px" }}
          />
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            onChange={async (e) => {
              setIsLoading(true);
              const options = {
                maxSizeMB: 0.5,
              };
              try {
                const compressedFile = await imageCompression(
                  e.target.files[0],
                  options
                );

                console.log(e.target.files);
                const formData = new FormData();
                formData.append("file", compressedFile);
                formData.append("upload_preset", "safetyhub-upload");

                const data = await fetch(
                  "https://api.cloudinary.com/v1_1/sanchez1321/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                ).then((r) => r.json());

                setType("text");
                setState(data.url);
                setIsLoading(false);
              } catch (error) {
                console.log(error);
              }
            }}
            style={{ opacity: isLoading || type === "text" ? "0" : "1" }}
            type={type}
            ref={ref}
            value={state}
            name={name}
            defaultValue={defaultValue}
            disabled={isLoading}
            accept="image/*"
          />
          {isLoading === true && (
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          {state !== null && !isLoading && (
            <div className="d-flex flex-column">
              <img
                src={state}
                style={{ width: "100px", height: "100px", borderRadius: "10px" }}
              />
              <button onClick={() => {
                setType("file");
                setState(null)
              }} className="btn btn-primary">Excluir arquivo</button>
            </div>
          )}
        </div>
      )}
    </>
  );
});

Registry.register("UploadImage", UploadImage);

var items = [
  {
    key: "UploadImage",
    element: "CustomElement",
    component: UploadImage,
    type: "custom",
    forwardRef: true,
    field_name: "upload_image_",
    name: "Upload Image",
    icon: "fa fa-cog",
    props: { test: "test_input" },
    label: "Label Input",
  },
  {
    key: "Header",
  },
  {
    key: "TextInput",
  },
  {
    key: "TextArea",
  },
  {
    key: "RadioButtons",
  },
  {
    key: "Checkboxes",
  },
  {
    key: "Image",
  },
  {
    key: "Signature",
  },
];

function App() {
  const { publicKey } = useParams();

  const [formData, setFormData] = useState("");

  const onPost = (data) => {
    setFormData(data.task_data);
  };

  const navigate = useNavigate();

  const handleSaveForm = (formData, company_publicKey) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/form/create`, {
        formData,
        company_publicKey,
      })
      .then(() => {
        navigate(`/created`);
      });
  };

  return (
    <div className="App" style={{ width: '100%' }}>
      <button
        className="btn"
        style={{ margin: "10px", backgroundColor: '#ff6816', color: 'white', borderRadius: '10px' }}
        onClick={() => {
          formData.length > 0 &&
            handleSaveForm(JSON.stringify(formData), publicKey);
        }}
      >
        Salvar formulario
      </button>
      <ReactFormBuilder
        onPost={onPost}
        toolbarItems={items}
      />
      ,
    </div>
  );
}

export default App;
