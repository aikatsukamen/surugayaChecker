import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { PhotoCamera, History } from '@material-ui/icons/';

const styles = {
  root: {
    width: '80vw'
  },
  button: {
    position: 'absolute',
    top: '5px',
    right: '0'
  }
};

const SimpleBottomNavigation = props => {
  const { classes } = props;

  const handleChange = (event, value) => {
    switch (value) {
    case 'qr':
      props.showQrModal();
      break;
    default:
      alert('その機能はまだ無いよ！');
      break;
    }
  };

  return (
    <div>
      <BottomNavigation onChange={handleChange} showLabels className={classes.root}>
        <BottomNavigationAction value="qr" label="カメラでQR読取" icon={<PhotoCamera />} />
        <BottomNavigationAction value="history" label="履歴" icon={<History />} />
      </BottomNavigation>
    </div>
  );
};

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  showQrModal: PropTypes.func.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);
