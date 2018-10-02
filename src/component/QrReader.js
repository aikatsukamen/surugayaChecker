import React from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    justifyContent: 'center'
  },
  content: {
    width: '80vw',
    height: '80vh',
    backgroundColor: 'white',
    marginLeft: '10%',
    textAlign: 'center'
  }
});

const QrReaderModal = props => {
  /** スキャン時に発火する */
  const handleScan = data => {
    if (data) {
      console.log(data);
      props.searchSurugayaFromQr(data);
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
  closeModal: PropTypes.func,
  searchSurugayaFromQr: PropTypes.func
};

export default withStyles(styles)(QrReaderModal);
