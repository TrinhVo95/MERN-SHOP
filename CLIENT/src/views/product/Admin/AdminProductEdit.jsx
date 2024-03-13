import React, { useEffect, useState } from "react";
// import FormRow from "../../../components/common/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { toast } from "react-toastify";
// import Loader from "../../../components/common/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import FormRowError from "../../../components/common/FormRowError";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { useNavigate, useParams } from "react-router-dom";
import AdminProductForm from "./AdminProductForm";
import { productSchema } from "../../../validation/productSchema";
// import { getProductById } from "../../../services/productServices";
import useProduct from "../../../hooks/products/useProduct";
import { updateProductById } from "../../../services/productServices";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/firebase";

// const schema = yup
//   .object({
//     title: yup.string().required(), //Nếu mún hiện theo ý mún thì điền vào required
//     category: yup
//       .string()
//       .oneOf(["Smartphones", "Laptop"], "Select a category"), //oneof chỉ nhận 2 giá trị
//     price: yup.number().positive().required().typeError("Must be a number"),
//     imageUrl: yup.string().url().required(),
//     description: yup.string().required(),
//   })
//   .required();

const AdminProductEdit = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  //Fetch product by Id
  const { data, isLoading } = useProduct(productId);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ resolver: yupResolver(productSchema) });

  //Reset data form after fetching from server
  useEffect(() => {
    reset(data?.data);
  }, [data]); // chọc vô data của thằng axios

  //update product
  const mutation = useMutation({
    mutationFn: (newProduct) => updateProductById(productId, newProduct),
    onSuccess: () => {
      navigate("/admin/products");
      toast.success("Successful!");
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
    // if (dirtyFields.image) {
    //   const file = data.image[0];
    //   const category = data.category;
    //   // Upload file and metadata to the object 'products/laptop/mountains.jpg'
    //   const storageRef = ref(storage, `products/${category}/${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       switch (snapshot.state) {
    //         case "running":
    //           setIsFileUploading(true);
    //           break;
    //       }
    //     },
    //     (error) => {
    //       //handle successful upload
    //     },
    //     () => {
    //       // Upload completed successfully, now we can get the download URL
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setIsFileUploading(false);
    //         // console.log("File available at", downloadURL);
    //         mutation.mutate({ ...data, imageUrl: downloadURL });
    //       });
    //     }
    //   );
    // } else {
    //   mutation.mutate(data);
    // }
  };
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  if (isLoading) return <GlobalSpinner />;
  // const { data: product } = data;

  return (
    <AdminProductForm
      watch={watch}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Save Product"
      isDirty={isDirty}
    />
  );
};

export default AdminProductEdit;
