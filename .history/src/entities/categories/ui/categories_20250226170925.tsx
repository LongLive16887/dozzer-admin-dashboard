import { ICategory } from "../model";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {

    const dataFromServer = category
    
    return(
        <h1>{deleteFeature}{updateFeature}</h1>
    )
}