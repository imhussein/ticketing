import Axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await Axios[method](url, body);
      onSuccess && onSuccess();
      return res.data;
    } catch (error) {
      setErrors(
        error.response.data.errors.map(({ message }, index) => (
          <div key={index} className="alert alert-danger">
            {message}
          </div>
        ))
      );
    }
  };

  return [doRequest, errors];
};
