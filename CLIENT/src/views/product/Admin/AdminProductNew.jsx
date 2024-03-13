// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminProductForm from "./AdminProductForm";
import { productSchema } from "../../../validation/productSchema";
import { createProduct } from "../../../services/productServices";
// import FormRowError from "../../../components/common/FormRowError";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useState } from "react";

const AdminProductNew = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("Successful!");
    },
  });

  const onSubmit = (data) => {
    // mutation.mutate(data);
    const file = data.image[0];
    const category = data.category;
    // Upload file and metadata to the object 'products/laptop/mountains.jpg'
    const storageRef = ref(storage, `products/${category}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "running":
            setIsFileUploading(true);
            break;
        }
      },
      (error) => {
        //handle successful upload
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsFileUploading(false);
          // console.log("File available at", downloadURL);
          mutation.mutate({ ...data, imageUrl: downloadURL });
        });
      }
    );
  };

  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  return (
    <AdminProductForm
      watch={watch}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Create Product"
    />
  );
};

export default AdminProductNew;
