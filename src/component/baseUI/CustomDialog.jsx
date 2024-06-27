import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

const CustomDialog = (props) => {
  const { children, title, cancelProps, okProps } = props;

  const onOkClick = (e) => {
    if (okProps?.onClick) okProps.onClick(e);
  };

  return (
    <Dialog open onClick={(e) => e.stopPropagation()}>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between'>
          <Box> {title}</Box>
          <Box>
            <IconButton
              onClick={(e) =>
                cancelProps?.crossIconAction
                  ? cancelProps?.crossIconAction(e)
                  : cancelProps?.onClick(e)
              }
              size='small'
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* <Box> */}
        <Button onClick={cancelProps?.onClick} variant='outlined'>
          {cancelProps?.label}
        </Button>
        <Button
          form={okProps?.formId}
          onClick={okProps?.type === 'submit' ? null : onOkClick}
          type={okProps?.type}
          variant='contained'
        >
          {okProps?.label}
        </Button>
        {/* </Box> */}
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  title: PropTypes.string.isRequired,
  cancelProps: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  okProps: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      type: PropTypes.oneOf(['submit']),
      formId: PropTypes.string,
    }).isRequired,
    PropTypes.shape({
      elem: PropTypes.node.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default CustomDialog;
