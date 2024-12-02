import { mapperCategories, mapperProducts } from "../../services/mappers/product.mapper";
import { fetchCategories, fetchProducts } from "../../services/api/product.service";
import { AppActions, AppDispatch } from "../../types/app-types";

export const loadProductsAndCategories = async (dispatch: AppDispatch) => {
    try {
        const products = await fetchProducts();
        const categories = await fetchCategories();

        const mappedProducts = mapperProducts(products);
        const mappedCategories = mapperCategories(categories);

        dispatch({ type: AppActions.SaveProducts, payload: mappedProducts });
        dispatch({ type: AppActions.SaveCategories, payload: mappedCategories });

    } catch (error) {
        console.error("Error al cargar productos y categorías:", error);
    }
};
