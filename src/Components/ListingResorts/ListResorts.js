import ResortsData from "./ResortsData"
import FilterComponent from "./FilterComponent"
export default function ListResorts() {
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <FilterComponent/>
                </div>
                <div className="col-md-8">
                    <ResortsData />
                </div>
            </div>
        </>
    )
}