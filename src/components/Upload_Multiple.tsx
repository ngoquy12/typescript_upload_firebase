import { Button } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { store } from "../firebase/firebase.config";

export default function Upload_Multiple() {
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [downloadUrls, setDownloadUrls] = useState<any>([]);

  // Upload hình ảnh
  const handleUploads = () => {
    Promise.all(
      imageUrls.map((file: any) => {
        // Tạo tham chiếu đến folder của firebase
        const imageRef = ref(store, `images/${file.name}`);

        // Upload hình ảnh lên firebase
        return uploadBytes(imageRef, file).then((value: any) => {
          // Lấy hình ảnh từ firebase về

          return getDownloadURL(value.ref);
        });
      })
    ).then((response: any) => {
      setDownloadUrls((prev: any) => [...prev, response]);
    });
  };

  // Chọn nhiều hình ảnh
  const handleChangeInput = (e: any) => {
    const files = Array.from(e.target.files);
    setImageUrls(files);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h3>UPLOAD MUTIPLE FILE</h3>
      <input onChange={handleChangeInput} multiple type="file" />
      <Button
        onClick={handleUploads}
        className="bg-blue-600 w-52"
        type="primary"
      >
        Upload
      </Button>
    </div>
  );
}
