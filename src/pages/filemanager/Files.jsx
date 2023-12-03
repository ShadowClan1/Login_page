import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { visuallyHidden } from "@mui/utils";
import FolderIcon from "@mui/icons-material/Folder";

import { useDispatch, useSelector } from "react-redux";
import { openSmallDB } from "../../redux/DialogBoxes/smallDialogBox";
import {
  createFolderReducer,
  deleteFileReducer,
  fetchCurrentDirThunk,
  setParentId,
} from "../../redux/file_manager/fileSlice";
import BreadcrumbsComponent from "../../components/BreadCrums";
import { EnhancedTableToolbar } from "./Toolbar";

import PhotoIcon from "@mui/icons-material/Photo";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import moment from "moment/moment";

function createData(id, name, size, createdAt, carbs, protein) {
  return {
    id,
    name,
    size,
    createdAt,
    carbs,
    protein,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created At",
  },
];

function bytesToSize(bytes, precision = 2) {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (bytes < kilobyte) {
    return bytes + " B";
  } else if (bytes < megabyte) {
    return (bytes / kilobyte).toFixed(precision) + " KB";
  } else if (bytes < gigabyte) {
    return (bytes / megabyte).toFixed(precision) + " MB";
  } else {
    return (bytes / gigabyte).toFixed(precision) + " GB";
  }
}

function LabelHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

LabelHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const iconFromType = (mainType, type) => {
  if (mainType == "folder") return <FolderIcon sx={{ color: "grey" }} />;
  console.log(type, "mimetype");
  type = type?.split("/")[0];
  switch (type) {
    case "image":
      return <PhotoIcon sx={{ color: "grey" }} />;
    case "video":
      return <VideoFileIcon sx={{ color: "grey" }} />;
    case "application":
      return <PictureAsPdfIcon sx={{ color: "grey" }} />;

    default:
      return <InsertDriveFileIcon sx={{ color: "grey" }} />;
  }
};

const dateFormatter = (date) => moment(date).format("MMMM Do YYYY, h:mm:ss a");
const dateFormatterFromNow = (date) => moment(date).fromNow();

export default function Files() {
  const dispath = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("size");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowss, setRows] = React.useState([]);
  // const [parentId, setParentId] = React.useState(0);
  const rows = useSelector((state) => state.fileManager.current);
  const parentId = useSelector((state) => state.fileManager.parentId);
  const copy = useSelector(state=>state.fileManager.copy)
  const move = useSelector(state=>state.fileManager.move)
  React.useEffect(() => {
    dispath(fetchCurrentDirThunk(parentId));
  }, [parentId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
 const insideCopyMove = (id) => copy.findIndex(e=>e.id === id) === -1 && move.findIndex(e=>e.id === id) === -1


  const openFolder = (event, row) => {
    
    console.log(row?.type == "folder" , row, copy )
    if (row?.type == "folder" && insideCopyMove(row.id))
      dispath(setParentId({ id: row.id, name: row.name }));
    else if (row?.type == "file") {
      window.open(row.objectURL, "_blank");
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  console.log(rows, "these are rows");
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, px: 3 }} className="scrollCustom">
        <EnhancedTableToolbar
          numSelected={selected.length}
          // setRows={setRows}
          selected={selected}
          setSelected={setSelected}
        />

        <BreadcrumbsComponent />

        <TableContainer className="scrollCustom">
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            className="scrollCustom"
          >
            <LabelHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onDoubleClick={e=>openFolder(e,row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected || !insideCopyMove(row.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {iconFromType(row.type, row?.mimeType)}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{bytesToSize(row.size)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title={dateFormatter(row.createdAt)}>
                        {dateFormatterFromNow(row.createdAt)}
                      </Tooltip>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
