import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ShowGroup from "./ShowGroup";

export default (props) => (
    <ShowGroup
        {...props}
        dispatch = {useDispatch()}
        params={useParams()} 
    />
);