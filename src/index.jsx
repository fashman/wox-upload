import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import Base from 'app/util/base';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
// import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

class WoxUpload extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value;
    this.state = {
      fileList: value ? [{
        uid: -1,
        name: 'logo',
        status: 'done',
        url: value
      }] : [],
      notSimple: this.props.notSimple ? true : false
    };
  }
  handlePicChange = (e) => {
    let list = e.fileList.map((val) => {
      const req = val.response;
      if ( req ) {
        if ( req.rs === 1 ) val.url = val.response.data.url
        else message.error(val.response.msg, 3);
      }
      return val;
    });
    
    if ( e.file.status ) {
      if (e.file.status === 'done'){
        list = list.filter(val => val.response ? val.response.rs === 1 : true);
        if(e.file.response.rs === 1){
          this.triggerChange(list);
        }
      } else if (e.file.status === 'removed') {
        this.triggerChange(list);
      }
      const { notSimple } = this.state;
      this.setState({ fileList: list.length ? (notSimple ? list : list.splice(-1)) : [] });
    }
  }

  beforeUpload = (file) => {
    const { imgType, imgSize } = this.props;
    const defaultType = ['jpeg', 'png', 'jpg', 'gif'];
    const isJPG = (imgType || defaultType).find(val=>{
      return file.type === `image/${val}`;
    });
    if (!isJPG) {
      message.error(`You can only upload ${(imgType || defaultType).join('/')} file!`, 3);
      return false;
    }
    const isLt100KB = file.size / 1024 < (imgSize || 1024);
    if (!isLt100KB) {
      message.error(`Image must smaller than ${imgSize || 1024}KB!`, 3);
      return false;
    }
    return isJPG && isLt100KB;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        fileList: value ? [{
          uid: -1,
          name: 'logo',
          status: 'done',
          url: value
        }] : []
      });
    }
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      const { notSimple } = this.state;
      onChange(changedValue.length ? notSimple ? changedValue : changedValue[changedValue.length - 1].url : '');
    }
  }

  render() {
    const { fileList, notSimple } = this.state;
    return(
      <Upload
        action={this.props.action || `${Base.img}/wximg/dpp/upload`} 
        listType="picture-card"
        beforeUpload={this.beforeUpload}
        fileList={fileList}
        onChange={this.handlePicChange}
        className={!notSimple && fileList.length ? cx('wox-reset-upload') : cx('wox-upload')}
      >
        {
          !notSimple && fileList.length ? (
            <span className={cx('reset-btn')}>重新上传</span>
          ) : (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          )
        }
      </Upload>
    )
  }
}

// WoxUpload.propTypes = {
//   value: PropTypes.string,
// };

// WoxUpload.defaultProps = {
//   status: 'off',
// };

export default WoxUpload;
