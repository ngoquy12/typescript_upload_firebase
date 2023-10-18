import { CloudUploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export default function Form() {
  return (
    <div>
      <form>
        <h3>UPLOAD FILE</h3>
        <label htmlFor="file">
          <CloudUploadOutlined />
        </label>
        <input id="file" type="file" hidden />
        <Button>Upload</Button>
      </form>
    </div>
  );
}
