import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import { requestList, openQrModal, updateHaveList, closeQrModal, searchSurugayaFromQr } from '../actions';
import GridList from './GridList';
import Navigation from './Navigation';
import QrReader from './QrReader';

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
        <Navigation showQrModal={this.props.openQrModal} />
        <div style={{ textAlign: 'left', padding: '5px', fontSize: '8px' }}>
          status:
          {this.props.status}
        </div>
        <GridList list={this.props.list} />
        <QrReader open={this.props.isOpenQrModal} closeModal={this.props.closeQrModal} searchSurugayaFromQr={this.props.searchSurugayaFromQr} />
      </div>
    );
  }
}

// state
function mapStateToProps(state) {
  return {
    status: state.reducer.status,
    list: state.reducer.list,
    isOpenQrModal: state.reducer.isShowQrReader
  };
}

// action
const mapDispatchToProps = {
  requestList,
  openQrModal,
  updateHaveList,
  closeQrModal,
  searchSurugayaFromQr
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  isOpenQrModal: PropTypes.bool.isRequired,
  requestList: PropTypes.func.isRequired,
  openQrModal: PropTypes.func.isRequired,
  closeQrModal: PropTypes.func.isRequired,
  searchSurugayaFromQr: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
