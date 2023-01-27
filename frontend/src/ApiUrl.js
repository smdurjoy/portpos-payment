class AppUrl {
  static BaseUrl = "http://localhost:8000/api";
  static login = this.BaseUrl + "/login";
  static logout = this.BaseUrl + "/logout";
  static fetchOrders = this.BaseUrl + "/order";
  static orderCreate = this.BaseUrl + "/order/store";
}

export default AppUrl;
