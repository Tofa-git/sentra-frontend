//import component Navbar

export default function Layout({ children }) {
    return (
        <>
            <main className="d-flex justify-content-center align-items-center bg-primary" style={{height: '100vh'}}>{children}</main>
        </>
    )
}