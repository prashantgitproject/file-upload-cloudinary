'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchAllImages();
  },[])

  async function onChangeHandler(e){
    if(e.target.files){
      setImage(e.target.files[0]);
    }
  }

  async function fetchAllImages(){
    try {
      const {data: {images}} = await axios.get('/api/upload');
      setImages(images)
    } catch (error) {
      console.log(error)
    }
  }


  async function onSubmitHandler(e){
    e.preventDefault();
    try {      
      if(!image){
        return
      }
  
      const formData = new FormData();
      formData.append('image', image)

      const response = await axios.post('/api/upload', formData);
      await fetchAllImages();
    } catch (error) {
      console.log(error)
    }

  }


  async function deleteImage(e){
    setLoading(true);
    try {
      const {data} = await axios.delete('/api/upload/' + e.replace('nextjs-imagegallary/', ''));
      await fetchAllImages();
      console.log({data})
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
    <div className="max-w-xs mx-auto mt-8 ">
      <form className="flex justify-center items-center gap-2" onSubmit={onSubmitHandler}>
        <Image className="rounded-lg" src={'/profile.png'} alt="photo" height={200} width={200}/>
        <label>
              <input onChange={onChangeHandler} type="file" className=''/>
              <button type="submit" className='block text-center font-semibold rounded-lg border-2 p-2 cursor-pointer'>
                  Change
              </button>
        </label>
      </form>
    </div>

      <div className="mt-8 px-10 flex flex-wrap gap-x-5">
        {images.map((cur, i) => (
        <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">
          <a className="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={cur.image_url}/>
          </a>
          <div className="mt-4">
            <button disabled={loading}
             onClick={() => deleteImage(cur.public_id)} className="text-white bg-black rounded-sm p-2 disabled:bg-gray-600">
              {loading? 'loading...': 'delete'}
            </button>
          </div>
        </div>
        ))}
      </div>
      </>
  );
}
