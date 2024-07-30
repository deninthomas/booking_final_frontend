import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { EntityList } from "../../components/EntityList";
import { getProductsLIst } from "../../serviceHandlers/services/productAccess";
import { setList } from "../../redux/productSlice";

export const Dashboard = () => {
  const { list } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const getProductsService = async () => {
    const response = await getProductsLIst();
    dispatch(setList(response.data));
  }
  React.useEffect(() => {
    getProductsService()
  }, []);
  
  return <EntityList list={list} />;
};
