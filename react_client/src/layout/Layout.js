import React, {useState, useEffect} from "react";
import Header from "./header/Header"

const Layout = (props) => {
  const [name, setName] = useState(props.name)
  const [isLogin, setIsLogin] = useState(props.isLogin)
  useEffect(() => {
    // console.log('새로고침');
    if (name !== null){
      // console.log('새로고침 안함');
    } else {setName(props.name); }
  })
  


  return (
    <div>
      <Header name={name}/>
      
      <main>
        {props.children}
      </main>

    </div>
  )
}

export default Layout