import { ICategory } from "../model";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {

    const dataFromServer = category;
    
    return(
        <>
            {dataFromServer.map(() )}
        </>
        <h1>{deleteFeature}{updateFeature}</h1>
    )
}