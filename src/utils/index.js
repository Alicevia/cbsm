
let utils = function (params) {
    function queryURLParameter(str){
        let link = document.createElement('a');
        link.href = str;
        return link
    }
    function checkLocalStorage() {
        return localStorage.getItem('user-token')
    }

    return {
        queryURLParameter
    }
}()

export default utils