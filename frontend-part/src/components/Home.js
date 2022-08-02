import Products  from "./Products"

export const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
        
        <Products showAlert={showAlert}/>
        
    </div>
  )
}