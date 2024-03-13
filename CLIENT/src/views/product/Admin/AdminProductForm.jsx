import React from "react";
import FormRowError from "../../../components/common/FormRowError";
import FormRow from "../../../components/common/FormRow";
import Loader from "../../../components/common/Loader";


const AdminProductForm = ({
  watch, //để check key trong state, xem preview ảnh
  onSubmit,
  register,
  isLoading,
  errors,
  btnLabel,
  isDirty = true,
}) => {
  return (
    <div>
      {/* container */}
      <div className="max-w-screen-md mx-auto px-4">
        {/* layout */}
        <div className="py-6">
          <form onSubmit={onSubmit}>
            {/* fields */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* title */}
              <FormRow label="Title" className="col-span-full">
                <input
                  type="text"
                  placeholder="Enter product name here..."
                  className="input input-bordered w-full"
                  // onChange={(e)=> setTitle(e.target.value)}
                  {...register("title")}
                />
                <FormRowError errors={errors.title} />
              </FormRow>
              {/* Category */}
              <FormRow label="Category">
                <select
                  className="select select-bordered w-full"
                  defaultValue="default"
                  {...register("category")}
                >
                  <option disabled value="default">
                    Choose a category
                  </option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Laptop">Laptop</option>
                </select>
                <FormRowError errors={errors.category} />
              </FormRow>
              {/* price */}
              <FormRow label="Price">
                <label className="input-group">
                  <input
                    type="text"
                    placeholder="0.01"
                    className="input input-bordered w-full"
                    step={0.01}
                    {...register("price")}
                  />
                  <span>USD</span>
                </label>

                <FormRowError errors={errors.price} />
              </FormRow>
              {/* Image */}
              <FormRow label="Image" className="col-span-full">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register("image")}
                />
                {/* Preview image */}
                {watch("imageUrl") && (
                  <img className="mt-4" src={watch("imageUrl")} />
                )}
                {/* nếu có image sẽ show img ra */}
                <FormRowError errors={errors.image} />
              </FormRow>
              {/* description */}
              <FormRow label="Description" className="col-span-full">
                <textarea
                  className="textarea textarea-bordered resize-none h-30"
                  placeholder="Write here..."
                  {...register("description")}
                ></textarea>
                <FormRowError errors={errors.description} />
              </FormRow>
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !isDirty}
            >
              <div className="flex items-center gap-2">
                {isLoading && <Loader />}
                <span>{btnLabel}</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
