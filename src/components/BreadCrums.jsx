import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { setParentId } from "../redux/file_manager/fileSlice";



export default function BreadcrumbsComponent() {
  const crums = useSelector((state) => state.fileManager.currentDir);
  const dispatch = useDispatch();
const handleClick = (id, name) =>{
dispatch(setParentId({id, name}))
}
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        {crums.map((ele,idx) => {
          return (
            <Link
              underline="hover"
              sx={{cursor : 'pointer'}}
            //   href="/material-ui/getting-started/installation/"
            variant="body2"
              color={idx === crums.length - 1 ? 'text.primary' : 'inherit'}
              onClick ={()=>handleClick(ele.id, ele.name)}
            >
             {ele?.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
