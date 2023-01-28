class AppUrl {
  static BaseUrl = "http://localhost:8000/api";
  static login = this.BaseUrl + "/login";
  static logout = this.BaseUrl + "/logout";
  static fetchOrders = this.BaseUrl + "/order";
  static orderCreate = this.BaseUrl + "/order/store";
  static orderStatusUpate = this.BaseUrl + "/order/status-update";
  static orderIPNDetails = this.BaseUrl + "/order/ipn";
}

export default AppUrl;
