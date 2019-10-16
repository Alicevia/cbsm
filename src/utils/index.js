
let utils = function (params) {
  function queryURLParameter(str) {
    let link = document.createElement('a');
    link.href = str;
    return link
  }

  function checkLocalStorage() {
    return localStorage.getItem('user-token')
  }

  function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  
  function blobToFile(blob, fileName){//blob转file
    blob.lastModifiedDate =new Date();
    blob.name = fileName;
    return blob;
}


  function getImgToBase64(url, callback) {//将js图片转换为Base64
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
      canvas = null;
    };
    img.src = url;

  }


  function dataURLtoBlob(dataurl) {//base64转为blob
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function blobToDataURL(blob, callback) { //blob转base64
    let a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
  }




  return {
    queryURLParameter, dataURLtoFile
  }
}()

export default utils