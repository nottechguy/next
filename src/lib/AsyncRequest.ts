export type ResponseEvent = {
  data: string,
  timestampt: number
};

function getInstance() : XMLHttpRequest {
  return new XMLHttpRequest();
}

export class RequestPayload {

  private data;

  constructor(data: {[key : string] : any}) {
    this.data = data;
  }

  toFormData() : FormData {
    var fd = new FormData();
    Object.keys(this.data).forEach((key) => {
      fd.append(key, this.data[key]);
    });
    return fd;
  }
  toQueryString(encoded?: boolean) {
    let s = "";
    let length: number = Object.keys(this.data).length;
    for (let key in this.data) {
      s += `${encoded ? encodeURIComponent(key) : key}=${encoded ? encodeURIComponent(this.data[key]) : this.data[key]}`;
      if (length > 1) {
        s += `&`;
      }
    }
    return `?${s}`.replace(/\&$/g, "");
  }
}

const RequestBuilder = {
  openRequest: function(request: AsyncRequest, builder: XMLHttpRequest) {
    builder.open(request.getMethod(), request.getURI(), true);
    //builder.withCredentials = true;
  },
  setRequestHeaders: function(headers: {[key: string] : string}, builder : XMLHttpRequest) {
    for (let h in headers) {
      builder.setRequestHeader(h, headers[h]);
    }
    builder.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  },
  callEventStateCallback: function(request: AsyncRequest, callback: Function | null, event: any) {
    if (typeof callback == "function") {
      let target = event.target;
      callback.apply(request, [event]);
    }
  },
  handleUpload: function(event: ProgressEvent<XMLHttpRequestEventTarget>) {
  },
  sendRequest: function(request: AsyncRequest, builder: XMLHttpRequest) {
    let payload = null;
    builder.send(payload);
  },
  send: function(request: AsyncRequest) {
    const builder = getInstance();
    builder.addEventListener('readystatechange', function(event: Event) {

      if (builder.readyState < 3) {
        RequestBuilder.callEventStateCallback(request, request.onLoadingCallback, event);
      }

      if (builder.readyState === 4) {

        if (builder.status === 200) {
          RequestBuilder.callEventStateCallback(request, request.onSuccessCallback, event);
          return;
        }

        if (builder.status >= 400 || builder.status <= 499) {
          RequestBuilder.callEventStateCallback(request, request.onNotFoundCallback, event);
          return;
        }

        if (builder.status >= 500 || builder.status <= 599) {
          RequestBuilder.callEventStateCallback(request, request.onErrorCallback, event);
          return;
        }
      }
    });

    if (request.withFiles) {
      builder.upload.addEventListener('loadstart' , this.handleUpload);
      builder.upload.addEventListener('load'      , this.handleUpload);
      builder.upload.addEventListener('loadend'   , this.handleUpload);
      builder.upload.addEventListener('progress'  , this.handleUpload);
      builder.upload.addEventListener('abort'     , this.handleUpload);
      builder.upload.addEventListener('error'     , this.handleUpload);
      builder.upload.addEventListener('timeout'   , this.handleUpload);
    }

    this.openRequest(request, builder);
    this.setRequestHeaders(request.getHeaders(), builder);
    this.sendRequest(request, builder);
  }
};

class AsyncRequest {
  protected uri       : string;
  protected method    : string;
  protected headers   : {[key : string] : string};
  protected data      : RequestPayload | null;
  public withFiles    : boolean;

  public onUploadProgressCallback: Function | null;
  public onSuccessCallback : Function | null;
  public onLoadingCallback : Function | null;
  public onLoadCallback    : Function | null;
  public onNotFoundCallback: Function | null;
  public onErrorCallback   : Function | null;
  private allowedMethods = ['POST', 'GET', 'PUT', 'DELETE', 'HEAD'];

  constructor(uri: string, options?: []) {
    this.uri        = uri;
    this.method     = "GET";
    this.headers    = {};
    this.data       = null;
    this.withFiles  = false;

    this.onUploadProgressCallback = null;
    this.onSuccessCallback = null;
    this.onLoadingCallback = null;
    this.onLoadCallback    = null;
    this.onNotFoundCallback= null;
    this.onErrorCallback   = null;
  }

  setMethod(method: string) : AsyncRequest {
    if (!this.allowedMethods.includes(method.toUpperCase())) {
      throw new Error(`Argument method must be ${this.allowedMethods.join(", ").replace(/\, ([^,]*)$/g, "or $1")}`)
    }
    this.method = method;
    return this;
  }

  getMethod() : string {
    return this.method;
  }

  setHeaders(headers: { [key: string] : string}) : AsyncRequest {
    this.headers = headers;
    return this;
  }

  getHeaders() : {} {
    return this.headers;
  }

  getURI() {
    return this.uri;
  }

  setData(data: RequestPayload) : AsyncRequest {
    this.data = data;
    return this;
  }

  getData() {
    return this.data;
  }

  onUploadProgress(callback: Function) : AsyncRequest {
    this.onUploadProgressCallback = callback;
    return this;
  }

  onSuccess(callback: Function) : AsyncRequest {
    this.onSuccessCallback = callback;
    return this;
  }

  onNotFound(callback: Function) : AsyncRequest {
    this.onNotFoundCallback = callback;
    return this;
  }

  onLoading(callback: Function) : AsyncRequest {
    this.onLoadingCallback = callback;
    return this;
  }

  onLoad(callback: Function) : AsyncRequest {
    this.onLoadCallback = callback;
    return this;
  }

  onError(callback: Function) : AsyncRequest {
    this.onErrorCallback = callback;
    return this;
  }

  send() {
    RequestBuilder.send(this);
  }
}

export default AsyncRequest;
