import { useGetCategoriesQuery } from '@/shared/api/categories'
import { useEffect, useState } from 'react';

export const CategoriesPage = () => {
    const [data,setData] = useState({})

    useEffect(() => {
      const fetchData = () = > {
        useGetCategoriesQuery
      }
    },[])

    return (
      <>
      <h1>Categories</h1>

      </>
    );
  };