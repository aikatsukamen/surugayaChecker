import React from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { searchSurugayaFromQr } from '../actions';

const styles = theme => ({
  root: {
    justifyContent: 'center'
  },
  content: {
    width: '50vw',
    height: '80vh',
    backgroundColor: 'white',
    marginLeft: '25%',
    textAlign: 'center'
  }
});

const QrReaderModal = props => {
  /** スキャン時に発火する */
  const handleScan = data => {
    console.log(data);
    if (data) {
      searchSurugayaFromQr(data);
    }
  };
  const handleError = err => {
    console.error(err);
  };

  const handleClose = () => {
    props.closeModal();
  };

  return (
    <div className={props.classes.root}>
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={props.open} onClose={handleClose}>
        <div className={props.classes.content}>
          <p>アイカツカードのQRコードを読み込んでください。</p>
          <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
        </div>
      </Modal>
    </div>
  );
};

QrReaderModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  closeModal: PropTypes.function
};

export default withStyles(styles)(QrReaderModal);
