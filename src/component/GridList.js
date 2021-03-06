import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '90vw',
    height: '80vh'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  gridListRoot: {
    height: '50px'
  },
  gridListTitle: {
    fontSize: '10px'
  },
  gridListSubTitle: {
    fontSize: '10px'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  image: {
    maxHeight: '100px',
    maxWidth: '70px'
  }
});

const TitlebarGridList = props => {
  const { classes } = props;

  const openItem = url => {
    window.open(url);
  };

  return (
    <div className={classes.root}>
      <List>
        {props.list.map(item => (
          <ListItem key={item.name}>
            <img className={classes.image} alt={item.name} src={item.imageUrl} />
            <ListItemText primary={item.name} secondary={item.price} />
            <IconButton
              color="primary"
              className={classes.button}
              onClick={() => {
                openItem(item.itemUrl);
              }}
            >
              <ShopIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

export default withStyles(styles)(TitlebarGridList);
