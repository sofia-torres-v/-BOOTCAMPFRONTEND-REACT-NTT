// app-context.tsx (contexto)
import {createContext, PropsWithChildren, useReducer, useEffect, FC, useContext} from "react";
import {AppDispatch} from "../domain/app-store";
import {appReducer, AppState, initialState} from "./reducer";
import {AppActions} from "../domain/app-store";
import {fetchCategories, fetchProducts} from "../services/api/product.service";
import {mapperCategories, mapperProducts} from "../services/mappers/product.mapper";

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

const GlobalAppProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        // Llamamos a la API y actualizamos el estado con los datos obtenidos

        const loadProductsAndCategories = async () => {
            const products = await fetchProducts();
            const categories = await fetchCategories();

            // Aplicamos los mappers para transformar los datos
            const mappedProducts = mapperProducts(products);
            const mappedCategories = mapperCategories(categories);

            // Actualizamos el estado global con los datos mapeados
            dispatch({type: AppActions.SaveProducts, payload: mappedProducts});
            dispatch({type: AppActions.SaveCategories, payload: mappedCategories});
        };

        loadProductsAndCategories();
    }, []);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

const useGlobalAppState = (): AppState => {
    const context = useContext(AppStateContext) as AppState;

    if (context) {
        return context;
    }

    throw new Error("useGlobalAppState not used within AppStateContext");
};

const useGlobalAppDispatch = (): AppDispatch => {
    const context = useContext(AppDispatchContext) as AppDispatch;

    if (context) {
        return context;
    }

    throw new Error("useGlobalAppDispatch not used within AppDispatchContext");
};

export {GlobalAppProvider, useGlobalAppState, useGlobalAppDispatch};
