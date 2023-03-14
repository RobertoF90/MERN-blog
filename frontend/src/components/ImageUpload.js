import { useState } from 'react';
import { API_URL } from '@/config';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({ postId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'api::post.post');
    formData.append('refId', postId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Post Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="Upload"></input>
        </div>
      </form>
    </div>
  );
}
