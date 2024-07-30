import React from 'react'
import {  useSelector } from "react-redux";
import { EntityList } from "../EntityList";


export const WishList = () => {
    const { wishList } = useSelector((state) => state.productReducer);

    return (
      <EntityList list={wishList}/>
    );
}
