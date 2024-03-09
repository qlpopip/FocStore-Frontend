import axios from "axios";

interface APIprops {
  protocol?: string;
  url: string;
  token?: string;
  payload?: any; //
}

interface HttpProps {
  status?: any;
  msg?: string | null;
}

class HttpError {
  status_code: any;
  msg: any;
  constructor({ status, msg = null }: HttpProps) {
    const msgObj: any = {
      301: "Moved Permanently",
    };
    this.status_code = status;
    this.msg = msg !== null ? msg : msgObj[status];
  }
}

class API {
  protocol: string;
  serverUrl: any;
  payload: any;
  url: string;
  option: any = {};

  constructor({ url, payload }: APIprops) {
    this.protocol = "http";
    this.serverUrl = process.env.REACT_APP_BACKEND_URL;
    this.option = {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    this.url = url;
    this.payload = payload;
  }
  validate() { }

  async get() {
    this.validate();

    return await axios
      .get(this.serverUrl + this.url, {
        ...this.option,
        params: this.payload,
      })
      .then((res) => {
        const { data, status } = res;
        return [data, null, status];
      })
      .catch((err) => {
        return [
          null,
          new HttpError({
            status: err.response.data.statusCode,
            msg: err.response.data.message,
          }),
        ];
      });
  }

  async post() {
    this.validate();
    return await axios
      .post(this.serverUrl + this.url, this.payload, this.option)
      .then((res) => {
        const { data, status } = res;
        return [data, null, status];
      })
      .catch((err) => {
        return [
          null,
          new HttpError({
            status: err.response.data.statusCode,
            msg: err.response.data.message,
          }),
        ];
      });
  }

  async patch() {
    this.validate();
    return await axios
      .patch(this.serverUrl + this.url, this.payload, this.option)
      .then((res) => {
        const { data, status } = res;
        return [data, null, status];
      })
      .catch((err) => {
        return [
          null,
          new HttpError({
            status: err.response.data.statusCode,
            msg: err.response.data.message,
          }),
        ];
      });
  }

  async delete() {
    this.validate();
    return await axios
      .delete(this.serverUrl + this.url, this.option)
      .then((res) => {
        const { data, status } = res;
        return [data, null, status];
      })
      .catch((err) => {
        return [
          null,
          new HttpError({
            status: err.response.data.statusCode,
            msg: err.response.data.message,
          }),
        ];
      });
  }

  async put() {
    this.validate();
    return await axios
      .put(this.serverUrl + this.url, this.payload, this.option)
      .then((res) => {
        const { data, status } = res;
        return [data, null, status];
      })
      .catch((err) => {
        return [
          null,
          new HttpError({
            status: err.response.data.statusCode,
            msg: err.response.data.message,
          }),
        ];
      });
  }
}

export { API };
