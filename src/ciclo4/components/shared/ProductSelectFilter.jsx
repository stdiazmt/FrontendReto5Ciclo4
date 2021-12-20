
import ProductService from "../../services/ProductService"

function aplicarFiltroPalabra(e,setProducts){
    const getProductsByDescription=()=>{
        ProductService.getByWord(e.target.value).then((response)=>{
            if(response.data===null){
                setProducts([])
            }else{
                setProducts(response.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    getProductsByDescription();
}

function aplicarFiltroPrecio(e,setProducts){
    const getProductsByPrice=()=>{
        ProductService.getByLessOrEqualPrice(e.target.value).then((response)=>{
            if(response.data===null){
                setProducts([])
            }else{
                setProducts(response.data);
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    getProductsByPrice();
}
function ProductSelectFilter({status,setProducts,products}){
    switch(status){
        case "none":
        case "":
            function getAllProducts(){
                ProductService.getAll().then((response)=>{
                    if(products.length!==response.data.length){
                        setProducts(response.data);
                    }
                    
                }).catch((err)=>{
                    console.log(err);
                })
            }
            getAllProducts();
            return <></>
        case "description":
            return (
                <>
                  <label htmlFor="word">Escriba el producto a filtrar</label>
                  <input
                    className="form-control"
                    type="text"
                    name="word"
                    id="word"
                    onChange={(e)=>aplicarFiltroPalabra(e,setProducts)}
                  />
                </>
              );
        case "price":
            return (
                <>
                  <label htmlFor="price">Defina precio del filtro</label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    id="price"
                    onChange={(e)=>aplicarFiltroPrecio(e,setProducts)}
                  />
                </>
              );
        default:
            return <></>
    }
    
}
export default ProductSelectFilter;