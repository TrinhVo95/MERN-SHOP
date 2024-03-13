import * as yup from "yup";

export const productSchema = yup
  .object({
    title: yup.string().required(), //Nếu mún hiện theo ý mún thì điền vào required
    category: yup
      .string()
      .oneOf(["Smartphones", "Laptop"], "Select a category"), //oneof chỉ nhận 2 giá trị
    price: yup.number().positive().required().typeError("Must be a number"),
    image: yup.mixed(),
    description: yup.string().required(),
  })
  .required();
