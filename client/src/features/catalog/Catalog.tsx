import { Fragment, useEffect } from "react";
// import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
// import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchProductsAsync, productSelector } from "./catalogSlice";





export default function Catalog() {
      
    // const [products, setProducts] = useState<Product[]>([]);
    const product = useAppSelector(productSelector.selectAll);
    const{productLoaded,status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    // const [loading,setLoading]=useState(true); 

    useEffect(() => {
              // agent.Catalog.list().then(products => setProducts(products))
              // .catch(error => console.log(error))
              // .finally(()=>setLoading(false));

              if(!productLoaded) dispatch(fetchProductsAsync());

            
    },[productLoaded,dispatch])

   if(status.includes("pending")) return <LoadingComponent message="Loading Products" />

    return (
        <Fragment>
          <ProductList products={product}/>
        </Fragment>
    )
}