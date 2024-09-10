import { useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import Button from "../../../../component/reusable/button/button";
import { AppConfig } from "../../../../config/app.config";
import { errorMessage } from "../../../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../../../../interface/Product";
// import { ICategory } from "../../../../interface/product";

interface ICategoryForm {
  category_name: string;
}

interface Props {
  category: ICategory;
}

const UpdateCategoryForm = ({ category }: Props) => {
  const navigate = useNavigate();

  const categoryValidation = yup.object().shape({
    category_name: yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryForm>({
    resolver: yupResolver(categoryValidation),
    defaultValues: {
      category_name: category?.categoryName || "",
    },
  });

  const onUpdateCategory = useCallback(
    async (values: ICategoryForm) => {
      try {
        const categoryData = new FormData();
        categoryData.append("categoryName", values.category_name);

        const { data } = await axios.put(
          `${AppConfig.API_URL}/updatecategory/${category._id}`,
        {categoryName:values.category_name}
        );

        toast.success(data.response?.message || "Updated successfully");
        navigate("/dashboard/category");
      } catch (error: unknown) {
        toast.error(errorMessage(error));
      }
    },
    [category, navigate]
  );

  return (
    <div>
      <div className="my-2 flex justify-end">
        <Link to={"/dashboard/category"}>
          <Button
            buttonType={"button"}
            buttonColor={{
              primary: true,
            }}
          >
            Go Back
          </Button>
        </Link>
      </div>

      <form
        className="max-w-sm mx-auto border rounded-lg"
        onSubmit={handleSubmit(onUpdateCategory)}
      >
        <div className="m-5">
          <div className="mb-5">
            <label
              htmlFor="categoryname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryname"
              {...register("category_name")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.category_name && (
              <span className="text-red-600">
                {errors.category_name?.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Button
            buttonType={"submit"}
            buttonColor={{
              primary: true,
            }}
          >
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;