import { CloudUploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { store } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

export default function Upload_Comp() {
  const [url, setUrl] = useState("");
  // Thư mục chưa các hình ảnh
  const imageRef: any = ref(store, "images/");

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        // Trả về đường dẫn cho mình
        const downloadUrl = info.file.response.url;

        setUrl(downloadUrl);
        message.success(`Tải hình ảnh thành công`);
      } else if (info.file.status === "error") {
        message.error("Tải hình ảnh thất bại.");
      }
    },

    customRequest: async ({ file, onSuccess, onError }) => {
      console.log("file", file);

      try {
        const rcFile: any = file as RcFile;
        // Tạo ra một tham chiếu đến store
        const imgRef = ref(imageRef, rcFile.name);

        // Tải hình ảnh lên firebase
        await uploadBytes(imgRef, rcFile);

        // Lấy url từ firebase về
        const getUrl = await getDownloadURL(imgRef);

        // Trả về cho dev
        onSuccess?.({ url: getUrl });
      } catch (error: any) {
        onError?.(error);
      }
    },
  };
  return (
    <div>
      <img src={url} alt="image" style={{ width: 300, height: 300 }} />
      <Upload {...props}>
        <Button icon={<CloudUploadOutlined />}>Tải lên hình ảnh</Button>
      </Upload>
    </div>
  );
}
