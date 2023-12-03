import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {
  copyFileReducer,
  createFolderReducer,
  deleteFileOrDirThunk,
  deleteFileReducer,
  moveFileReducer,
  pasteItemsThunk,
  uploadFileReducerThunk,
} from "../../redux/file_manager/fileSlice";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { openSmallDB } from "../../redux/DialogBoxes/smallDialogBox";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export function EnhancedTableToolbar(props) {
  const dispath = useDispatch();
  const fileRef = useRef(null);
  // states -------------
  const { numSelected, setRows, selected, setSelected } = props;
  // const [move, setMove] = React.useState({ display: false, selected: [] });
  // const [copy, setCopy] = React.useState({ display: false, selected: [] });
  const move = useSelector((state) => state.fileManager.move);
  const copy = useSelector((state) => state.fileManager.copy);
  const current = useSelector((state) => state.fileManager.current);

  const [optionsMenu, setOptionsMenu] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  const optionsOpened = Boolean(optionsMenu);

  const handleCloseOptions = () => setOptionsMenu(null);
  const deleteItems = () => {
    dispath(deleteFileOrDirThunk(selected));
    // setRows(prev=>prev.filter(e=>!selected.includes(e.id)))
    // setRows((prev) => prev.filter((e) => !selected.includes(e.id)));
    setSelected([]);
  };
  const moveItems = () => {
    // setMove((prev) => {
    //   return { ...prev, display: true, selected: selected };
    // });
    // setCopy({ display: false, selected: [] });
    const arr = selected.map((e) => current.find((ele) => ele.id === e));
    dispath(moveFileReducer(arr));
    dispath(copyFileReducer([]));
    setSelected([]);
  };
  const copyItems = () => {
    // setCopy((prev) => {
    //   return { ...prev, display: true, selected: selected };
    // });
    // setMove({ display: false, selected: [] });
    const arr = selected.map((e) => current.find((ele) => ele.id === e));

    dispath(moveFileReducer([]));
    dispath(copyFileReducer(arr));
    setSelected([]);
  };
  const pasteItems = (From) => {
    if (From === "COPY") {
      dispath(pasteItemsThunk({files :copy, type : From}))
    } else {
      dispath(pasteItemsThunk({files :move , type : From}))

    }
  };
  const createFolder = () => {
    dispath(
      openSmallDB({
        title: "Create Folder",
        contentText: "Enter Folder Name Here",
        name: "Folder Name",
        noButtonText: "Cancel",
        yesButtonText: "Create",
      })
    );
  };

  const rename = () =>  {
    const file = current.find(e=>e.id === selected[0]);
    console.log(file, 'renaming this file')
    dispath(
    openSmallDB({
      title: "Rename File",
      contentText: "Enter new Name Here",
      name: "Folder Name",
      noButtonText: "Cancel",
      yesButtonText: "Rename",
      file ,
      textFieldValue : file.name
    })
  );}


  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const submit = async () => {
    if (files?.length > 0)
      dispath(uploadFileReducerThunk(files)).then(setFiles([]));
  };

  const iconFromType = (type) => {
    type = type.split("/")[0];
    switch (type) {
      case "image":
        return <PhotoIcon />;
      case "video":
        return <VideoFileIcon />;
      case "application":
        return <PictureAsPdfIcon />;

      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          File Manager
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          {numSelected === 1 && (
            <>
              <Tooltip title="Rename">
                <IconButton onClick={rename}>
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

          {move.length > 0 ? (
            <Tooltip title="Paste">
              <IconButton onClick={pasteItems}>
                <ContentPasteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Move">
              <IconButton>
                <DriveFileMoveIcon onClick={moveItems} />
              </IconButton>
            </Tooltip>
          )}

          {copy.length > 0 ? (
            <Tooltip title="Paste">
              <IconButton onClick={() => pasteItems("COPY")}>
                <ContentPasteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Copy">
              <IconButton onClick={copyItems}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <IconButton onClick={deleteItems}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          {copy.length > 0 && (
            <Tooltip title="Paste">
              <IconButton onClick={() => pasteItems("COPY")}>
                <ContentPasteIcon />
              </IconButton>
            </Tooltip>
          )}
          {move.length > 0 && (
            <Tooltip title="Paste">
              <IconButton onClick={() => pasteItems("MOVE")}>
                <ContentPasteIcon />
              </IconButton>
            </Tooltip>
          )}

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileRef}
          />
          {files?.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ overflowX: "scroll", width: "100%", pt: 2 }}
              className="scrollCustom"
            >
              {files.map((e, i) => {
                const removeFile = (index) => {
                  console.log(files);
                  setFiles((prev) =>
                    prev.filter((element, ind) => ind != index)
                  );
                };

                return (
                  <Tooltip title={e?.name} onClick={(d) => removeFile(i)}>
                    <IconButton>
                      <Badge
                        badgeContent={"x"}
                        color="primary"
                        componentsProps={{
                          onClick: () => {
                            removeFile(i);
                          },
                        }}
                      >
                        {iconFromType(e.type)}
                      </Badge>
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Stack>
          )}

          {files?.length > 0 ? (
            <Tooltip title="Upload File">
              <IconButton onClick={submit} style={{ color: "#3498db" }}>
                <UploadFileIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Upload File">
              <IconButton onClick={(e) => fileRef.current.click()}>
                <UploadFileIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="options" onClick={(e) => setOptionsMenu(e.target)}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={optionsMenu}
            open={optionsOpened}
            onClick={handleCloseOptions}
            onClose={handleCloseOptions}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={createFolder}>
              <CreateNewFolderIcon sx={{ mx: 1 }} />
              Create Folder
            </MenuItem>
            <MenuItem onClick={handleCloseOptions}>My account</MenuItem>
            <MenuItem onClick={handleCloseOptions}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
