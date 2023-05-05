class DuplicatePromise {
  constructor(mainCallback) {
    this.promiseData;
    this.status = "pending";
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.mainCallback = mainCallback;
    mainCallback(this.resolve, this.reject);
  }

  then(callback) {
    if (this.status !== "resolve") return this;
    if (this.promiseData) {
      callback(this.promiseData);
      return this;
    }
    return this;
  }

  catch(callback) {
    if (this.status !== "reject") return;
    if (this.promiseData) {
      return callback(this.promiseData);
    }
  }

  resolve(data) {
    this.promiseData = data;
    this.status = "resolve";
    return this;
  }

  reject(data) {
    this.promiseData = data;
    this.status = "reject";
  }
}

const duplicatePromise = new DuplicatePromise((resolve, reject) => {
  //   reject("promise is rejected");
  resolve("promise is resolved");
})
  .then((data) => {
    console.log("data", data);
  })
  .catch((error) => {
    console.log("error", error);
  });
