import UnAuthorizedPhoto from "../Images/401.jpg"
export default function UnAuthorized(){
    return(
        <>
            <div className="d-flex justify-content-center align-items-center">
                <img src={UnAuthorizedPhoto} alt="Page Not Found" className="img-fluid" style={{"width":"60%"}}/>
            </div>
        </>
    )
}