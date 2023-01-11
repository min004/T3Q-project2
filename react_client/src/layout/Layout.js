import Header from "./header/Header"

const Layout = (props) => {
  return (
    <div>
      <Header />
      
      <main>
        {props.children}
      </main>

    </div>
  )
}

export default Layout