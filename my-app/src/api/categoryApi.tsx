import { toast } from "sonner"
import { errorMessage } from "../utils/helper"
import axios from "axios"
import { AppConfig } from "../config/app.config"
import { ICategory } from "../interface/Product"
// import { ICategory } from "../interface/producT"

export const getCategory = async (url:string) => {
    try {
        const { data } = await axios.get(`${AppConfig.API_URL}/${url}`)
        return data as ICategory[]
    } catch (error) {
        toast.error(errorMessage(error))
    }
}


export const getCategoryById = async (url: string) => {
    try {
        const { data } = await axios.get(`${AppConfig.API_URL}/${url}`)
        return data as ICategory
    } catch (error) {
        toast.error(errorMessage(error))
    }
}