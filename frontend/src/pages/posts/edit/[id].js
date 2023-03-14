import moment from 'moment/moment';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout';
import Modal from '@/components/Modal';
import { API_URL } from '@/config';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

export default function EditPostPage({ post }) {
  const [values, setValues] = useState({
    title: post.attributes.title,
    text: post.attributes.text,
    date: post.attributes.date,
  });

  const [imagePreview, setImagePreview] = useState(
    post.attributes.image.data
      ? post.attributes.image.data.attributes.url
      : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ data: { ...values } }),
    });

    if (!res.ok) {
      toast.error('Something Went Wrong');
    } else {
      const { data } = await res.json();
      router.push(`/posts/${data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/posts/${post.id}?populate=*`);
    const { data } = await res.json();
    setImagePreview(data.attributes.image.data.attributes.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Post">
      <Link href="/">Go Back</Link>
      <h1>Add Post</h1>
      <ToastContainer></ToastContainer>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="text">Post Text</label>
            <textarea
              type="text"
              id="text"
              name="text"
              value={values.text}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <input type="submit" value="Update Post"></input>
      </form>

      <h2>Post Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170}></Image>
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload postId={post.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/posts/${id}?populate=*`);
  const post = await res.json();

  return {
    props: {
      post: post.data,
    },
  };
}
