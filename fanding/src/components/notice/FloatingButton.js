import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(7),
    right: theme.spacing(3),
  },
});

function FloatingButton(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title="새로운 글 작성">
        <Button variant="fab" color="secondary" className={classes.absolute} onClick={props.handleClick}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

FloatingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingButton);