import { ICategory } from "../model";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {
    return(
        <h1>{category}{deleteFeature}/h1>
    )
}