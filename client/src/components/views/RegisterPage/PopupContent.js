import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupContent = (props) => {

    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소
   
  
    const onCompletePost = (data) => {
      let fullAddr = data.address;
      let extraAddr = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
      }
  
      setAddress(data.zonecode);
      setAddressDetail(fullAddr);
      props.setAddress(fullAddr);
      props.setZipCode(data.zonecode);
      props.closeDiv();
      document.getElementById('post_content').setAttribute('hidden','true');
    };

    const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '0%',
        width: '400px',
        height: '400px',
        padding: '7px',
    };


    return(
        <div className="dimmed_layer_wrapper">
            <div className="full_layer">
                <div className="common_alert"> 
                    <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
                </div>
            </div>
        </div>
    );
}


 
export default PopupContent;