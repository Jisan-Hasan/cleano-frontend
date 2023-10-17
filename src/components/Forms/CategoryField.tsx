import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import React from 'react';
import FormSelectField, { SelectOptions } from './FormSelectField';

type CategoryFieldProps = {
    name: string;
    label: string;
  };

const CategoryField = ({name,label}: CategoryFieldProps) => {
    const {data, isLoading} = useGetCategoriesQuery({limit: 100, page: 1});

    const categories: any = data?.categories;
    const categoryOptions = categories?.map((item: any)=>{
        return {
            label: item?.title,
            value: item?.id
        }
    })
    return (
        <FormSelectField
      name={name}
      label={label}
      options={categoryOptions as SelectOptions[]}
    />
    );
};

export default CategoryField;