import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddExpense from "./AddExpense";

export default (props) => (
    <AddExpense
        {...props}
        dispatch = {useDispatch()}
        params={useParams()}
    />
);