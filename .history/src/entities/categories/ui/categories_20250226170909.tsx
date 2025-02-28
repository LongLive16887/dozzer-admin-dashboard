import { ICategory } from "../model";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {
    return(
        <h1>{deleteFeature}{updateFeature}</h1>
    )
}