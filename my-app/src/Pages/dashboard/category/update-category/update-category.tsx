
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
// import { getCategoryById} from '../../../../API/categoryApi';
import UpdateCategoryForm from './update-category-form';
import { getCategoryById } from '../../../../api/categoryApi';

const UpdateCategoryPage = () => {
  const {id} = useParams();
  const { data: category} = useSWR(`/findcategory/${id}`, getCategoryById)

  return (
    <div>
        {
        category &&
        <UpdateCategoryForm category={category} />
        }
    </div>
  )
}

export default UpdateCategoryPage
