import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactFormGenerator } from "@appsafetyhub/safetyhub-form-creator";
import { useNavigate, useParams } from "react-router-dom";

function ViewForm() {
  const { publicKey } = useParams();
  const { userPublicKey } = useParams();

  const [dataJSON, setData] = useState(undefined);

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/form/read/${publicKey}`)
      .then((res) => {
        setData(JSON.parse(res.data.data.formData));
      });
  }, []);

  const handleSubmitForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/form/reply`, {
        company_form_publicKey: publicKey,
        company_user_publicKey: userPublicKey,
        resultData: JSON.stringify(data),
      })
      .then(() => {
        navigate(`/`);
      });
  };

  return (
    <>
      {dataJSON !== undefined && (
        <ReactFormGenerator
          download_path=""
          back_action="/"
          back_name="Back"
          answer_data={{}}
          action_name="Save"
          form_action="/"
          form_method="POST"
          read_only={false}
          onSubmit={handleSubmitForm}
          hide_actions={false}
          data={dataJSON}
        />
      )}
    </>
  );
}

export default ViewForm;
