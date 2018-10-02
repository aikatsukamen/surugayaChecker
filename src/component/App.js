import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import { requestList, openQrModal, updateHaveList, closeQrModal, searchSurugayaFromQr, showHistory, closeNotify } from '../actions';
import GridList from './GridList';
import Navigation from './Navigation';
import QrReader from './QrReader';
import Snackbar from './SnackBar';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    top: '-60px'
  },
  icon: {}
});

class App extends React.Component {
  componentWillMount() {
    // 初期表示時、リスト取得
    this.props.requestList();
  }

  render() {
    return (
      <div className="App">
        <Navigation showQrModal={this.props.openQrModal} showHistory={this.props.showHistory} />
        <div style={{ textAlign: 'left', padding: '5px', fontSize: '8px' }}>
          status:
          {this.props.status}
        </div>
        <GridList list={this.props.list} />
        <QrReader open={this.props.isOpenQrModal} closeModal={this.props.closeQrModal} searchSurugayaFromQr={this.props.searchSurugayaFromQr} />
        <Snackbar open={this.props.notify.isOpen} message={this.props.notify.message} variant={this.props.notify.variant} onClose={this.props.closeNotify} />
      </div>
    );
  }
}

// state
function mapStateToProps(state) {
  return {
    status: state.reducer.status,
    list: state.reducer.list,
    isOpenQrModal: state.reducer.isShowQrReader,
    notify: state.reducer.notify
  };
}

// action
const mapDispatchToProps = {
  requestList,
  openQrModal,
  updateHaveList,
  closeQrModal,
  searchSurugayaFromQr,
  showHistory,
  closeNotify
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  isOpenQrModal: PropTypes.bool.isRequired,
  requestList: PropTypes.func.isRequired,
  openQrModal: PropTypes.func.isRequired,
  closeQrModal: PropTypes.func.isRequired,
  searchSurugayaFromQr: PropTypes.func.isRequired,
  showHistory: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired,
  closeNotify: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
