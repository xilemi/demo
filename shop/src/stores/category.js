import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore("category", () => {
    const categoryList = ref(null)
    const cityInfo = ref(null)
    const updateCategory = (payload) => {
        categoryList.value = payload
    }
    const updateCity = (payload) => {
        cityInfo.value = payload
    }
    return {
        categoryList, updateCategory, updateCity, cityInfo
    }
},
    {
        persist: {
            paths: ["categoryList", "cityInfo"]
        }
    }

)