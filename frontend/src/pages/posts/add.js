import { ToastContainer, toast } from 'react-toastify';
import { parseCookies } from '@/helpers/index';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout';
import { API_URL } from '@/config';
import styles from '@/styles/Form.module.css';

function AddPostPage({ token }) {
  const [values, setValues] = useState({
    title: '',
    text: '',
  });

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

    const res = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
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
        </div>

        <input type="submit" value="Add Post"></input>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}

export default AddPostPage;
