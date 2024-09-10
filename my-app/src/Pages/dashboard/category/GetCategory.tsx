
import useSWR, { mutate } from 'swr'
// import { getCategory } from '../../../API/categoryApi'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'
import Button from '../../../component/reusable/button/button'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
// import { ICategory } from '../../../interface/product'
import axios from 'axios'
import { AppConfig } from '../../../config/app.config'
import { toast } from 'sonner'
import { errorMessage } from '../../../utils/helper'
import DeleteModal from './delete-modal'
import { getCategory } from '../../../api/categoryApi'
import { ICategory } from '../../../interface/Product'

type IModal = "update" | "delete"

const GetCategory = () => {
  const { data: categories } = useSWR('viewcategory', getCategory)
  const [modal, setModal] = useState<IModal | null>(null);

  const [category, setCategory] = useState<ICategory | null>(null);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      const { data } = await axios.delete(`${AppConfig.API_URL}/deletecategory/${id}`)

      const updateCategory = categories?.filter((p) => p._id !== category?._id);
      mutate('viewcategory', updateCategory)

      toast.message(data.message)
      setModal(null)
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }, [])

  return (
    <div>
      <div className='my-1 flex justify-between container'>
        <h1 className='text-2xl font-bold'>All Category</h1>
        <Link to={"/dashboard/add-category"}>
          <Button
            buttonType={'button'}
            buttonColor={{
              primary: true,
            }}>
            Add Category
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category, idx) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium text-center">{idx + 1}</TableCell>
              <TableCell className="font-medium">{category.categoryName}</TableCell>
              <TableCell className=''>
                <div className='flex items-center gap-2'>
                  <Link to={`/dashboard/update-category/${category._id}`}>
                    <Button
                      buttonType={'submit'}
                      buttonColor={{
                        primary: true,
                      }}>
                      Update
                    </Button>
                  </Link>

                  <Button
                    buttonType={'submit'}
                    buttonColor={{
                      secondary: true,
                    }}
                    onClick={() => { setModal("delete"); setCategory(category) }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* modal */}
      {
        category &&
        <DeleteModal
          open={modal === "delete"}
          onClose={() => setModal(null)}
          onDelete={() => deleteCategory(category._id)}
        />
      }


    </div>
  )
}

export default GetCategory