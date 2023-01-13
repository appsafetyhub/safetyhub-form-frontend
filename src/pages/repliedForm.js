import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactFormGenerator } from "@appsafetyhub/safetyhub-form-creator";
import { useNavigate, useParams } from "react-router-dom";

function RepliedForm() {
    const { publicKey } = useParams();

    const [resultData, setResultData] = useState(null)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/form/result-single-form/${publicKey}`)
            .then((res) => {
                setResultData(JSON.parse(res.data.data.resultData));
                setFormData(JSON.parse(res.data.data.formData));
            });
    }, []);

    return (
        <>
            {resultData !== null && formData !== null ? (
                <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={resultData}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    read_only={true}
                    hide_actions={true}
                    data={formData}
                />
            ) :
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>}


        </>
    );
}

export default RepliedForm;
