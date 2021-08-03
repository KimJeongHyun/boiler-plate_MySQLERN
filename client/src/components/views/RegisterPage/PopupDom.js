import ReactDom from 'react-dom';
 
const PopupDom = ({ children }) => {
    const el = document.getElementById('post_content');
    return ReactDom.createPortal(children, el);
};
 
export default PopupDom;
