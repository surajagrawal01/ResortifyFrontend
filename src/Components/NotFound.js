import NotFoundImage from '../Images/404.jpg'
export default function NotFound() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <img src={NotFoundImage} alt="Page Not Found" className="img-fluid" style={{"width":"60%"}}/>
            </div>
        </>
    )
}